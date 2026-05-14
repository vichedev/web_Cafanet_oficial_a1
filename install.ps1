# =============================================================
#  Cafanet ISP Web - Instalador universal (Windows / PowerShell)
# =============================================================
#  Pensado para servidores donde ya hay otras webs corriendo:
#  elige un puerto libre y Cafanet queda detrás de tu reverse-
#  proxy apuntando con tu dominio a IP_DEL_SERVER : PUERTO.
#
#  Uso rapido:
#    .\install.ps1                          # primera vez, te pregunta puerto
#    .\install.ps1 -Port 9000               # instala forzando puerto 9000
#    .\install.ps1 -Port 9000 -Yes          # sin preguntar nada
#    .\install.ps1 -Action info             # ver URLs y estado
#    .\install.ps1 -Action port -Port 9100  # cambia el puerto
# =============================================================

[CmdletBinding()]
param(
    [ValidateSet('install','start','up','stop','down','restart','rebuild','update','logs','status','info','port','uninstall','help')]
    [string]$Action = 'install',

    [int]$Port = 0,

    [Alias('y','NonInteractive')]
    [switch]$Yes
)

$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

$PortDefault = 8384
$EnvFile     = Join-Path $PSScriptRoot '.env'
$ProjectName = 'cafanet'

function Write-Info($msg)    { Write-Host "[INFO]   $msg" -ForegroundColor Cyan }
function Write-Success($msg) { Write-Host "[OK]     $msg" -ForegroundColor Green }
function Write-Warn($msg)    { Write-Host "[WARN]   $msg" -ForegroundColor Yellow }
function Write-Err($msg)     { Write-Host "[ERROR]  $msg" -ForegroundColor Red }
function Write-Title($msg)   {
    Write-Host ''
    Write-Host "═══ $msg ═══" -ForegroundColor Magenta
    Write-Host ''
}

function Test-Cmd($name) { [bool](Get-Command $name -ErrorAction SilentlyContinue) }

function Get-ComposeCmd {
    if (Test-Cmd 'docker') {
        $null = & docker compose version 2>$null
        if ($LASTEXITCODE -eq 0) { return @('docker','compose') }
    }
    if (Test-Cmd 'docker-compose') { return @('docker-compose') }
    throw 'No se encontró Docker Compose. Instala Docker Desktop.'
}

function Invoke-Compose {
    param([Parameter(ValueFromRemainingArguments=$true)][string[]]$ComposeArgs)
    $cmd = Get-ComposeCmd
    & $cmd[0] $cmd[1..($cmd.Length-1)] @ComposeArgs
    if ($LASTEXITCODE -ne 0) { throw "docker compose falló con código $LASTEXITCODE" }
}

function Assert-Docker {
    if (-not (Test-Cmd 'docker')) {
        Write-Err 'Docker no está instalado o no está en PATH.'
        Write-Host 'Descárgalo en: https://www.docker.com/products/docker-desktop/'
        exit 1
    }
    & docker info 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Err 'Docker no está corriendo. Inicia Docker Desktop y vuelve a intentarlo.'
        exit 1
    }
    Write-Success 'Docker detectado y operativo.'
}

function Load-Env {
    $script:HostPort = $null
    if (Test-Path $EnvFile) {
        Get-Content $EnvFile | ForEach-Object {
            if ($_ -match '^\s*HOST_PORT\s*=\s*(\d+)\s*$') {
                $script:HostPort = [int]$Matches[1]
            }
        }
    }
}

function Save-Env {
    @(
        '# Cafanet web — generado por install.ps1. No edites a mano salvo que sepas',
        "HOST_PORT=$script:HostPort",
        "COMPOSE_PROJECT_NAME=$ProjectName"
    ) | Set-Content -Path $EnvFile -Encoding utf8
}

function Test-Port([int]$p) {
    return ($p -ge 1 -and $p -le 65535)
}

function Test-PortInUse([int]$p) {
    # Si el contenedor cafanet-web ya usa ese puerto, no es conflicto
    if (Test-Cmd 'docker') {
        $usedByCafa = & docker ps --filter 'name=^cafanet-web$' --format '{{.Ports}}' 2>$null
        if ($usedByCafa -and $usedByCafa -match ":$p->") { return $false }
    }
    try {
        $conns = Get-NetTCPConnection -State Listen -LocalPort $p -ErrorAction SilentlyContinue
        return [bool]$conns
    } catch {
        return $false
    }
}

function Get-LanIp {
    try {
        $ip = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
            Where-Object {
                $_.IPAddress -ne '127.0.0.1' -and
                $_.PrefixOrigin -ne 'WellKnown' -and
                $_.IPAddress -notlike '169.*'
            } |
            Sort-Object -Property InterfaceMetric |
            Select-Object -First 1 -ExpandProperty IPAddress)
        if ($ip) { return $ip }
    } catch {}
    return '127.0.0.1'
}

function Ask-Port {
    $current = if ($script:HostPort) { $script:HostPort } else { $PortDefault }
    while ($true) {
        $input = Read-Host -Prompt "? Puerto host para Cafanet [$current]"
        if ([string]::IsNullOrWhiteSpace($input)) { $input = "$current" }
        if (-not ($input -match '^\d+$') -or -not (Test-Port ([int]$input))) {
            Write-Err "Puerto inválido: $input (1-65535)"
            if ($Yes) { exit 1 }
            continue
        }
        $p = [int]$input
        if ($p -lt 1024) { Write-Warn 'Puerto privilegiado (<1024) — puede requerir permisos elevados.' }
        if (Test-PortInUse $p) {
            Write-Warn "El puerto $p parece estar en uso por otro servicio."
            if ($Yes) { exit 1 }
            $cont = Read-Host -Prompt '? ¿Continuar igualmente? [s/N]'
            if ($cont -match '^[sSyY]') { $script:HostPort = $p; return }
            $current = $p
            continue
        }
        $script:HostPort = $p
        return
    }
}

function Wait-Healthy {
    Write-Info 'Esperando que el contenedor esté listo...'
    for ($i = 0; $i -lt 30; $i++) {
        $state = & docker inspect --format='{{.State.Health.Status}}' cafanet-web 2>$null
        if ($state -eq 'healthy') { Write-Success 'Contenedor saludable.'; return $true }
        if ($state -eq 'unhealthy') { Write-Warn 'Contenedor unhealthy. Revisa con: .\install.ps1 -Action logs'; return $false }
        Start-Sleep -Seconds 1
    }
    Write-Warn 'Healthcheck no respondió a tiempo. Revisa con: .\install.ps1 -Action logs'
    return $false
}

function Show-Summary {
    $ip = Get-LanIp
    Write-Host ''
    Write-Host '╔══════════════════════════════════════════════════════╗' -ForegroundColor Green
    Write-Host '║         Cafanet ISP Web está corriendo 🚀            ║' -ForegroundColor Green
    Write-Host '╠══════════════════════════════════════════════════════╣' -ForegroundColor Green
    Write-Host ("║  Local:   http://localhost:{0,-5}                    ║" -f $script:HostPort) -ForegroundColor Green
    Write-Host ("║  LAN:     http://{0,-15}:{1,-5}              ║" -f $ip, $script:HostPort) -ForegroundColor Green
    Write-Host ("║  Puerto:  {0,-5} -> 80 (contenedor)                  ║" -f $script:HostPort) -ForegroundColor Green
    Write-Host '╚══════════════════════════════════════════════════════╝' -ForegroundColor Green
    Write-Host ''
    Write-Host 'Tip: ' -ForegroundColor Yellow -NoNewline
    Write-Host "apunta tu dominio a la IP del servidor y en tu reverse-proxy redirige al puerto $script:HostPort." -ForegroundColor White
    Write-Host ''
}

function Show-Help {
    @'
Cafanet ISP Web - Instalador universal (Windows)

Uso:
  .\install.ps1 [-Action <cmd>] [-Port N] [-Yes]

Acciones (-Action):
  install     Build + up con healthcheck (por defecto)
  start, up   Levanta el contenedor
  stop, down  Detiene el contenedor
  restart     Reinicia
  rebuild     Reconstruye sin caché
  update      git pull (si aplica) + rebuild + up
  logs        Logs en vivo
  status      Estado del contenedor
  info        URL, IPs y puerto actual
  port        Cambia el puerto (usa -Port N)
  uninstall   Borra contenedor + imagen + .env
  help        Esta ayuda

Flags:
  -Port <N>   Puerto host (1-65535). Persiste en .env
  -Yes        Modo no-interactivo (no pregunta)

Ejemplos:
  .\install.ps1
  .\install.ps1 -Port 9000 -Yes
  .\install.ps1 -Action port -Port 9100
  .\install.ps1 -Action update
  .\install.ps1 -Action info
'@ | Write-Host
}

#======================================================================
# Main
#======================================================================
Write-Title 'Cafanet ISP Web - Deployer (Windows)'

if ($Action -eq 'help') { Show-Help; exit 0 }

Assert-Docker
$compose = Get-ComposeCmd
Write-Success "Compose: $($compose -join ' ')"

Load-Env

if ($Port -gt 0) {
    if (-not (Test-Port $Port)) { Write-Err "Puerto inválido: $Port"; exit 1 }
    $script:HostPort = $Port
}

if ($Action -eq 'install' -and -not $script:HostPort) {
    if ($Yes) {
        $script:HostPort = $PortDefault
        Write-Info "Usando puerto por defecto: $script:HostPort (no-interactivo)"
    } else {
        Ask-Port
    }
}

if (-not $script:HostPort) { $script:HostPort = $PortDefault }

$env:HOST_PORT = "$script:HostPort"
$env:COMPOSE_PROJECT_NAME = $ProjectName

switch ($Action) {
    'install' {
        Save-Env
        Write-Info "Construyendo imagen y levantando (puerto $script:HostPort)..."
        Invoke-Compose up -d --build
        Wait-Healthy | Out-Null
        Show-Summary
    }
    { $_ -in 'start','up' } {
        Save-Env
        Write-Info "Levantando contenedor en puerto $script:HostPort..."
        Invoke-Compose up -d
        Wait-Healthy | Out-Null
        Show-Summary
    }
    { $_ -in 'stop','down' } {
        Write-Info 'Deteniendo contenedor...'
        Invoke-Compose down
        Write-Success 'Contenedor detenido.'
    }
    'restart' {
        Write-Info 'Reiniciando contenedor...'
        Invoke-Compose restart
        Wait-Healthy | Out-Null
        Show-Summary
    }
    'rebuild' {
        Save-Env
        Write-Info 'Reconstrucción forzada (sin caché)...'
        Invoke-Compose build --no-cache
        Invoke-Compose up -d
        Wait-Healthy | Out-Null
        Show-Summary
    }
    'update' {
        if ((Test-Path '.git') -and (Test-Cmd 'git')) {
            Write-Info 'Actualizando desde git...'
            & git pull --rebase
            if ($LASTEXITCODE -ne 0) { Write-Warn 'git pull falló, continuando con el código local.' }
        } else {
            Write-Warn 'No es un repo git o git no está instalado. Solo se rebuilderá la imagen.'
        }
        Save-Env
        Write-Info 'Reconstruyendo y desplegando...'
        Invoke-Compose build --no-cache
        Invoke-Compose up -d
        Wait-Healthy | Out-Null
        Show-Summary
    }
    'logs' {
        Write-Info 'Logs en vivo (Ctrl+C para salir)...'
        Invoke-Compose logs -f --tail=200
    }
    'status' {
        Invoke-Compose ps
    }
    'info' {
        $ip = Get-LanIp
        Write-Info 'Estado del contenedor:'
        Invoke-Compose ps
        Write-Host ''
        Write-Host "  Puerto host:   $script:HostPort"
        Write-Host "  URL local:     http://localhost:$script:HostPort" -ForegroundColor Cyan
        Write-Host "  URL LAN:       http://$ip:$script:HostPort" -ForegroundColor Cyan
        Write-Host "  Archivo env:   $EnvFile"
        Write-Host ''
    }
    'port' {
        if ($Port -le 0) {
            Write-Err 'Falta el puerto. Uso: .\install.ps1 -Action port -Port <N>'
            exit 1
        }
        if (-not (Test-Port $Port)) { Write-Err "Puerto inválido: $Port"; exit 1 }
        if (Test-PortInUse $Port) {
            Write-Warn "El puerto $Port parece estar en uso por otro servicio."
            if (-not $Yes) {
                $cont = Read-Host -Prompt '? ¿Continuar igualmente? [s/N]'
                if ($cont -notmatch '^[sSyY]') { Write-Info 'Cancelado.'; exit 0 }
            }
        }
        $script:HostPort = $Port
        $env:HOST_PORT = "$Port"
        Save-Env
        Write-Info "Aplicando nuevo puerto $Port..."
        Invoke-Compose up -d
        Wait-Healthy | Out-Null
        Show-Summary
    }
    'uninstall' {
        if (-not $Yes) {
            $cont = Read-Host -Prompt '? Esto detendrá el contenedor y borrará la imagen. ¿Continuar? [s/N]'
            if ($cont -notmatch '^[sSyY]') { Write-Info 'Cancelado.'; exit 0 }
        }
        Write-Info 'Eliminando contenedor e imagen...'
        try { Invoke-Compose down --rmi local --volumes --remove-orphans } catch {}
        if (Test-Path $EnvFile) {
            Remove-Item $EnvFile -Force
            Write-Success '.env eliminado.'
        }
        Write-Success 'Desinstalación completada.'
    }
}
