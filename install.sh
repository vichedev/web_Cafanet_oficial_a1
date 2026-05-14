#!/usr/bin/env bash
# =============================================================
#  Cafanet ISP Web - Instalador universal (Linux / macOS)
# =============================================================
#  Pensado para servidores donde ya hay otras webs corriendo:
#  elige un puerto libre y Cafanet queda detrás de tu reverse-
#  proxy (Nginx Proxy Manager, Traefik, Caddy, etc) apuntando
#  con tu dominio a la IP del server : PUERTO.
#
#  Uso rapido:
#    ./install.sh                  # instala con el puerto guardado o 8384
#    ./install.sh -p 9000          # instala forzando el puerto 9000
#    ./install.sh --port 9000 -y   # instala sin preguntar nada
#
#  Comandos:
#    install     Build + up + healthcheck (default si no pasas comando)
#    start|up    Levantar el contenedor
#    stop|down   Detener el contenedor
#    restart     Reiniciar
#    rebuild     Reconstruir desde cero (--no-cache) y levantar
#    update      Si es repo git: git pull, rebuild y up
#    logs        Seguir logs en vivo (Ctrl+C para salir)
#    status      Estado del contenedor
#    info        Mostrar URLs, IPs y puerto
#    port <N>    Cambiar puerto persistido y reiniciar
#    uninstall   Detener y borrar contenedor + imagen + .env
#    help        Esta ayuda
#
#  Flags:
#    -p, --port <N>     Puerto host (1-65535). Persiste en .env
#    -y, --yes          No preguntar (modo no-interactivo)
#    -h, --help         Ayuda
# =============================================================
set -euo pipefail

#----- Constantes ------------------------------------------------------
readonly PORT_DEFAULT=8384
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly ENV_FILE="${SCRIPT_DIR}/.env"
readonly PROJECT_NAME="cafanet"

#----- Colores ---------------------------------------------------------
if [[ -t 1 ]]; then
    C_RED='\033[0;31m'
    C_GRN='\033[0;32m'
    C_YEL='\033[1;33m'
    C_CYN='\033[0;36m'
    C_MAG='\033[0;35m'
    C_BLD='\033[1m'
    C_RST='\033[0m'
else
    C_RED= C_GRN= C_YEL= C_CYN= C_MAG= C_BLD= C_RST=
fi

info()    { printf "${C_CYN}[INFO]   %s${C_RST}\n" "$*"; }
ok()      { printf "${C_GRN}[OK]     %s${C_RST}\n" "$*"; }
warn()    { printf "${C_YEL}[WARN]   %s${C_RST}\n" "$*"; }
err()     { printf "${C_RED}[ERROR]  %s${C_RST}\n" "$*" >&2; }
title()   { printf "\n${C_MAG}${C_BLD}═══ %s ═══${C_RST}\n\n" "$*"; }

#----- Parseo de flags y comando --------------------------------------
ACTION=""
PORT_FLAG=""
NON_INTERACTIVE=0
EXTRA_ARGS=()

while [[ $# -gt 0 ]]; do
    case "$1" in
        -p|--port)
            PORT_FLAG="${2:-}"
            shift 2
            ;;
        -y|--yes|--non-interactive)
            NON_INTERACTIVE=1
            shift
            ;;
        -h|--help|help)
            ACTION="help"
            shift
            ;;
        install|start|up|stop|down|restart|rebuild|update|logs|status|info|port|uninstall)
            ACTION="$1"
            shift
            ;;
        *)
            EXTRA_ARGS+=("$1")
            shift
            ;;
    esac
done

ACTION="${ACTION:-install}"
cd "$SCRIPT_DIR"

#----- Helpers --------------------------------------------------------
load_env() {
    if [[ -f "$ENV_FILE" ]]; then
        # shellcheck disable=SC1090
        set -a; source "$ENV_FILE"; set +a
    fi
}

save_env() {
    cat > "$ENV_FILE" <<EOF
# Cafanet web — generado por install.sh. No edites a mano salvo que sepas
HOST_PORT=${HOST_PORT}
COMPOSE_PROJECT_NAME=${PROJECT_NAME}
EOF
}

validate_port() {
    local p="${1:-}"
    if ! [[ "$p" =~ ^[0-9]+$ ]] || (( p < 1 || p > 65535 )); then
        return 1
    fi
    return 0
}

port_in_use() {
    local p="$1"
    # Si Cafanet ya usa ese puerto, no contamos como conflicto
    if command -v docker >/dev/null 2>&1; then
        local current
        current=$(docker ps --filter "name=^cafanet-web$" --format '{{.Ports}}' 2>/dev/null || true)
        if [[ "$current" == *":${p}->"* ]]; then
            return 1
        fi
    fi
    if command -v ss >/dev/null 2>&1; then
        ss -tln 2>/dev/null | awk '{print $4}' | grep -qE "[:.]${p}\$" && return 0
    elif command -v netstat >/dev/null 2>&1; then
        netstat -tln 2>/dev/null | awk '{print $4}' | grep -qE "[:.]${p}\$" && return 0
    fi
    return 1
}

ask_port_interactive() {
    local current="${HOST_PORT:-$PORT_DEFAULT}"
    while true; do
        printf "${C_CYN}?${C_RST} Puerto host para Cafanet [${C_BLD}%s${C_RST}]: " "$current"
        local input=""
        if (( NON_INTERACTIVE )); then
            input=""
        else
            read -r input || input=""
        fi
        input="${input:-$current}"
        if ! validate_port "$input"; then
            err "Puerto inválido: $input (1-65535)"
            (( NON_INTERACTIVE )) && exit 1
            continue
        fi
        if (( input < 1024 )); then
            warn "Puerto privilegiado (<1024) — necesitará permisos elevados o capabilities."
        fi
        if port_in_use "$input"; then
            warn "El puerto $input parece estar en uso por otro servicio."
            if (( NON_INTERACTIVE )); then
                exit 1
            fi
            printf "${C_YEL}?${C_RST} ¿Continuar igualmente? [s/N]: "
            local cont
            read -r cont || cont=""
            [[ "$cont" =~ ^[sSyY] ]] && { HOST_PORT="$input"; return; }
            current="$input"
            continue
        fi
        HOST_PORT="$input"
        return
    done
}

get_lan_ip() {
    local ip=""
    if command -v ip >/dev/null 2>&1; then
        ip=$(ip -4 route get 1.1.1.1 2>/dev/null | awk '{for(i=1;i<=NF;i++) if($i=="src"){print $(i+1); exit}}')
    fi
    if [[ -z "$ip" ]] && command -v hostname >/dev/null 2>&1; then
        ip=$(hostname -I 2>/dev/null | awk '{print $1}')
    fi
    if [[ -z "$ip" ]] && command -v ifconfig >/dev/null 2>&1; then
        ip=$(ifconfig 2>/dev/null | awk '/inet / && $2 !~ /^127/ {print $2; exit}')
    fi
    echo "${ip:-127.0.0.1}"
}

require_docker() {
    if ! command -v docker >/dev/null 2>&1; then
        err "Docker no está instalado."
        echo  "  Instalación rápida: curl -fsSL https://get.docker.com | sh"
        echo  "  Documentación:      https://docs.docker.com/engine/install/"
        exit 1
    fi
    if ! docker info >/dev/null 2>&1; then
        err "Docker daemon no responde o no tienes permisos."
        echo  "  Inicia el servicio:  sudo systemctl start docker"
        echo  "  Agrega tu usuario:   sudo usermod -aG docker \$USER  (y vuelve a iniciar sesión)"
        exit 1
    fi
}

detect_compose() {
    if docker compose version >/dev/null 2>&1; then
        COMPOSE=(docker compose)
    elif command -v docker-compose >/dev/null 2>&1; then
        COMPOSE=(docker-compose)
    else
        err "Docker Compose no está disponible."
        echo  "  Instala el plugin v2: https://docs.docker.com/compose/install/"
        exit 1
    fi
}

compose() { "${COMPOSE[@]}" "$@"; }

wait_healthy() {
    info "Esperando que el contenedor esté listo..."
    local tries=30
    while (( tries-- > 0 )); do
        local state
        state=$(docker inspect --format='{{.State.Health.Status}}' cafanet-web 2>/dev/null || echo "")
        if [[ "$state" == "healthy" ]]; then
            ok "Contenedor saludable."
            return 0
        fi
        if [[ "$state" == "unhealthy" ]]; then
            warn "Contenedor reporta unhealthy. Revisa los logs:  ./install.sh logs"
            return 1
        fi
        sleep 1
    done
    warn "El healthcheck no respondió a tiempo. Revisa con:  ./install.sh logs"
}

show_summary() {
    local ip
    ip="$(get_lan_ip)"
    printf "\n${C_GRN}${C_BLD}╔══════════════════════════════════════════════════════╗${C_RST}\n"
    printf "${C_GRN}${C_BLD}║         Cafanet ISP Web está corriendo 🚀            ║${C_RST}\n"
    printf "${C_GRN}${C_BLD}╠══════════════════════════════════════════════════════╣${C_RST}\n"
    printf "${C_GRN}║${C_RST}  Local:   ${C_CYN}http://localhost:%-5s${C_RST}                    ${C_GRN}║${C_RST}\n" "$HOST_PORT"
    printf "${C_GRN}║${C_RST}  LAN:     ${C_CYN}http://%-15s:%-5s${C_RST}              ${C_GRN}║${C_RST}\n" "$ip" "$HOST_PORT"
    printf "${C_GRN}║${C_RST}  Puerto:  ${C_BLD}%-5s${C_RST} -> 80 (contenedor)                  ${C_GRN}║${C_RST}\n" "$HOST_PORT"
    printf "${C_GRN}${C_BLD}╚══════════════════════════════════════════════════════╝${C_RST}\n"
    printf "\n${C_YEL}Tip:${C_RST} apunta tu dominio (DNS A) a la IP del servidor y\n"
    printf "      en tu reverse-proxy redirige al puerto ${C_BLD}%s${C_RST}.\n\n" "$HOST_PORT"
}

show_help() {
    cat <<EOF
${C_BLD}Cafanet ISP Web - Instalador universal${C_RST}

${C_BLD}Uso:${C_RST}
  ./install.sh [comando] [flags]

${C_BLD}Comandos:${C_RST}
  install     Build + up con healthcheck (por defecto)
  start|up    Levanta el contenedor
  stop|down   Detiene el contenedor
  restart     Reinicia
  rebuild     Reconstruye sin caché
  update      git pull (si aplica) + rebuild + up
  logs        Logs en vivo
  status      Estado del contenedor
  info        URL, IPs y puerto actual
  port <N>    Cambia el puerto y reinicia
  uninstall   Borra contenedor + imagen + .env
  help        Esta ayuda

${C_BLD}Flags:${C_RST}
  -p, --port <N>     Puerto host (1-65535)
  -y, --yes          Modo no-interactivo
  -h, --help         Ayuda

${C_BLD}Ejemplos:${C_RST}
  ./install.sh                       # primera vez, te pregunta el puerto
  ./install.sh -p 9000 -y            # instalación silenciosa en puerto 9000
  ./install.sh port 9100             # cambia al puerto 9100
  ./install.sh update                # actualiza desde git y redespliega
  ./install.sh info                  # ver estado y URLs
EOF
}

#======================================================================
# Inicio
#======================================================================
title "Cafanet ISP Web - Deployer"

if [[ "$ACTION" == "help" ]]; then
    show_help
    exit 0
fi

require_docker
ok "Docker detectado y operativo."
detect_compose
ok "Compose: ${COMPOSE[*]}"

load_env

# Si vino --port, validar y usar (no interactivo en esa dimensión)
if [[ -n "$PORT_FLAG" ]]; then
    if ! validate_port "$PORT_FLAG"; then
        err "Puerto inválido: $PORT_FLAG"
        exit 1
    fi
    HOST_PORT="$PORT_FLAG"
fi

# Para 'install' o 'port', si aún no hay HOST_PORT, preguntar (o tomar default si -y)
if [[ "$ACTION" == "install" && -z "${HOST_PORT:-}" ]]; then
    if (( NON_INTERACTIVE )); then
        HOST_PORT="$PORT_DEFAULT"
        info "Usando puerto por defecto: $HOST_PORT (modo no-interactivo)"
    else
        ask_port_interactive
    fi
fi

# Para los demás comandos, si no hay HOST_PORT, asumir default
HOST_PORT="${HOST_PORT:-$PORT_DEFAULT}"
export HOST_PORT
export COMPOSE_PROJECT_NAME="$PROJECT_NAME"

case "$ACTION" in
    install)
        save_env
        info "Construyendo imagen y levantando (puerto ${HOST_PORT})..."
        compose up -d --build
        wait_healthy || true
        show_summary
        ;;
    start|up)
        save_env
        info "Levantando contenedor en puerto ${HOST_PORT}..."
        compose up -d
        wait_healthy || true
        show_summary
        ;;
    stop|down)
        info "Deteniendo contenedor..."
        compose down
        ok "Contenedor detenido."
        ;;
    restart)
        info "Reiniciando contenedor..."
        compose restart
        wait_healthy || true
        show_summary
        ;;
    rebuild)
        save_env
        info "Reconstrucción forzada (sin caché)..."
        compose build --no-cache
        compose up -d
        wait_healthy || true
        show_summary
        ;;
    update)
        if [[ -d ".git" ]] && command -v git >/dev/null 2>&1; then
            info "Actualizando desde git..."
            git pull --rebase || warn "git pull falló, continuando con el código local."
        else
            warn "No es un repo git o git no está instalado. Solo se rebuilderá la imagen."
        fi
        save_env
        info "Reconstruyendo y desplegando..."
        compose build --no-cache
        compose up -d
        wait_healthy || true
        show_summary
        ;;
    logs)
        info "Logs en vivo (Ctrl+C para salir)..."
        compose logs -f --tail=200
        ;;
    status)
        compose ps
        ;;
    info)
        ip="$(get_lan_ip)"
        info "Estado del contenedor:"
        compose ps
        echo
        printf "  Puerto host:   ${C_BLD}%s${C_RST}\n" "$HOST_PORT"
        printf "  URL local:     ${C_CYN}http://localhost:%s${C_RST}\n" "$HOST_PORT"
        printf "  URL LAN:       ${C_CYN}http://%s:%s${C_RST}\n" "$ip" "$HOST_PORT"
        printf "  Archivo env:   %s\n" "$ENV_FILE"
        echo
        ;;
    port)
        new_port="${EXTRA_ARGS[0]:-${PORT_FLAG:-}}"
        if [[ -z "$new_port" ]]; then
            err "Falta el puerto. Uso:  ./install.sh port <N>"
            exit 1
        fi
        if ! validate_port "$new_port"; then
            err "Puerto inválido: $new_port"
            exit 1
        fi
        if port_in_use "$new_port"; then
            warn "El puerto $new_port parece ocupado por otro servicio."
            if ! (( NON_INTERACTIVE )); then
                printf "${C_YEL}?${C_RST} ¿Continuar igualmente? [s/N]: "
                read -r cont || cont=""
                [[ "$cont" =~ ^[sSyY] ]] || { info "Cancelado."; exit 0; }
            fi
        fi
        HOST_PORT="$new_port"
        export HOST_PORT
        save_env
        info "Aplicando nuevo puerto ${HOST_PORT}..."
        compose up -d
        wait_healthy || true
        show_summary
        ;;
    uninstall)
        if ! (( NON_INTERACTIVE )); then
            printf "${C_YEL}?${C_RST} Esto detendrá el contenedor y borrará la imagen. ¿Continuar? [s/N]: "
            read -r cont || cont=""
            [[ "$cont" =~ ^[sSyY] ]] || { info "Cancelado."; exit 0; }
        fi
        info "Eliminando contenedor e imagen..."
        compose down --rmi local --volumes --remove-orphans || true
        if [[ -f "$ENV_FILE" ]]; then
            rm -f "$ENV_FILE"
            ok ".env eliminado."
        fi
        ok "Desinstalación completada."
        ;;
    *)
        err "Acción desconocida: $ACTION"
        echo  "  Usa:  ./install.sh help"
        exit 1
        ;;
esac
