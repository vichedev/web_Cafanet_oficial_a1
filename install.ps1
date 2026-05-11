# =============================================================
#  Instalador / Deployer para Cafanet ISP Web (Windows)
#  Uso:
#    .\install.ps1                  -> build + up
#    .\install.ps1 -Action up       -> levantar
#    .\install.ps1 -Action down     -> bajar
#    .\install.ps1 -Action rebuild  -> rebuild sin caché + up
#    .\install.ps1 -Action logs     -> mostrar logs en vivo
#    .\install.ps1 -Action status   -> estado del contenedor
#    .\install.ps1 -Port 9000       -> levantar en un puerto distinto
# =============================================================

param(
    [ValidateSet('install','up','down','rebuild','logs','status')]
    [string]$Action = 'install',
    [int]$Port = 8384
)

$ErrorActionPreference = 'Stop'

function Write-Info($msg)    { Write-Host "[INFO]    $msg" -ForegroundColor Cyan }
function Write-Success($msg) { Write-Host "[OK]      $msg" -ForegroundColor Green }
function Write-Warn($msg)    { Write-Host "[WARN]    $msg" -ForegroundColor Yellow }
function Write-Err($msg)     { Write-Host "[ERROR]   $msg" -ForegroundColor Red }

function Test-Command($name) {
    return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

function Get-ComposeCmd {
    if (Test-Command 'docker') {
        # Probar plugin v2: "docker compose"
        $null = & docker compose version 2>$null
        if ($LASTEXITCODE -eq 0) { return @('docker','compose') }
    }
    if (Test-Command 'docker-compose') { return @('docker-compose') }
    throw "No se encontro Docker Compose. Instala Docker Desktop."
}

function Invoke-Compose {
    param([Parameter(ValueFromRemainingArguments=$true)][string[]]$Args)
    $cmd = Get-ComposeCmd
    & $cmd[0] $cmd[1..($cmd.Length-1)] @Args
    if ($LASTEXITCODE -ne 0) { throw "docker compose fallo con codigo $LASTEXITCODE" }
}

function Assert-Docker {
    if (-not (Test-Command 'docker')) {
        Write-Err "Docker no esta instalado o no esta en PATH."
        Write-Host "Descargalo en: https://www.docker.com/products/docker-desktop/"
        exit 1
    }
    & docker info 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Err "Docker no esta corriendo. Inicia Docker Desktop y vuelve a intentarlo."
        exit 1
    }
    Write-Success "Docker detectado y operativo."
}

function Set-PortEnv {
    $env:HOST_PORT = "$Port"
    Write-Info "Puerto host: $Port -> 80 (contenedor)"
}

Set-Location -Path $PSScriptRoot

Write-Host ""
Write-Host "=== Cafanet ISP Web - Deployer (Windows) ===" -ForegroundColor Magenta
Write-Host ""

Assert-Docker
Set-PortEnv

switch ($Action) {
    'install' {
        Write-Info "Construyendo imagen e iniciando contenedor..."
        Invoke-Compose up -d --build
        Write-Success "Despliegue completado."
        Write-Host ""
        Write-Host "  Abre: http://localhost:$Port" -ForegroundColor Green
        Write-Host ""
    }
    'up' {
        Write-Info "Levantando contenedor..."
        Invoke-Compose up -d
        Write-Success "Contenedor activo en http://localhost:$Port"
    }
    'down' {
        Write-Info "Deteniendo y removiendo contenedor..."
        Invoke-Compose down
        Write-Success "Contenedor detenido."
    }
    'rebuild' {
        Write-Info "Reconstruccion forzada (sin cache)..."
        Invoke-Compose build --no-cache
        Invoke-Compose up -d
        Write-Success "Rebuild + deploy completado en http://localhost:$Port"
    }
    'logs' {
        Write-Info "Mostrando logs (Ctrl+C para salir)..."
        Invoke-Compose logs -f --tail=200
    }
    'status' {
        Invoke-Compose ps
    }
}
