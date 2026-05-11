#!/usr/bin/env bash
# =============================================================
#  Instalador / Deployer para Cafanet ISP Web (Linux / macOS)
#  Uso:
#    ./install.sh                # build + up
#    ./install.sh up             # levantar
#    ./install.sh down           # detener
#    ./install.sh rebuild        # rebuild sin cache + up
#    ./install.sh logs           # logs en vivo
#    ./install.sh status         # estado del contenedor
#    PORT=9000 ./install.sh      # cambiar puerto host
# =============================================================
set -euo pipefail

ACTION="${1:-install}"
PORT="${PORT:-8384}"
export HOST_PORT="${PORT}"

C_RED='\033[0;31m'
C_GRN='\033[0;32m'
C_YEL='\033[1;33m'
C_CYN='\033[0;36m'
C_MAG='\033[0;35m'
C_RST='\033[0m'

info()    { printf "${C_CYN}[INFO]    %s${C_RST}\n" "$*"; }
ok()      { printf "${C_GRN}[OK]      %s${C_RST}\n" "$*"; }
warn()    { printf "${C_YEL}[WARN]    %s${C_RST}\n" "$*"; }
err()     { printf "${C_RED}[ERROR]   %s${C_RST}\n" "$*" >&2; }

cd "$(dirname "$0")"

printf "\n${C_MAG}=== Cafanet ISP Web - Deployer ===${C_RST}\n\n"

# ---- Detectar docker --------------------------------------------------
if ! command -v docker >/dev/null 2>&1; then
    err "Docker no esta instalado."
    echo  "  Instalalo desde: https://docs.docker.com/engine/install/"
    exit 1
fi

if ! docker info >/dev/null 2>&1; then
    err "Docker daemon no esta corriendo o el usuario no tiene permisos."
    echo  "  Inicia el servicio:  sudo systemctl start docker"
    echo  "  O agrega tu usuario al grupo docker:  sudo usermod -aG docker \$USER"
    exit 1
fi
ok "Docker detectado y operativo."

# ---- Detectar docker compose v1 / v2 ----------------------------------
if docker compose version >/dev/null 2>&1; then
    COMPOSE=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE=(docker-compose)
else
    err "Docker Compose no esta disponible."
    echo  "  Instala el plugin v2:  https://docs.docker.com/compose/install/"
    exit 1
fi

info "Puerto host: ${PORT} -> 80 (contenedor)"

run_compose() {
    "${COMPOSE[@]}" "$@"
}

case "$ACTION" in
    install)
        info "Construyendo imagen e iniciando contenedor..."
        run_compose up -d --build
        ok "Despliegue completado."
        echo
        printf "  ${C_GRN}Abre: http://localhost:%s${C_RST}\n\n" "$PORT"
        ;;
    up)
        info "Levantando contenedor..."
        run_compose up -d
        ok  "Contenedor activo en http://localhost:${PORT}"
        ;;
    down)
        info "Deteniendo y removiendo contenedor..."
        run_compose down
        ok  "Contenedor detenido."
        ;;
    rebuild)
        info "Reconstruccion forzada (sin cache)..."
        run_compose build --no-cache
        run_compose up -d
        ok  "Rebuild + deploy completado en http://localhost:${PORT}"
        ;;
    logs)
        info "Mostrando logs (Ctrl+C para salir)..."
        run_compose logs -f --tail=200
        ;;
    status)
        run_compose ps
        ;;
    *)
        err "Accion desconocida: $ACTION"
        echo "  Acciones validas: install | up | down | rebuild | logs | status"
        exit 1
        ;;
esac
