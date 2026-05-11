# syntax=docker/dockerfile:1.6

############################
# Etapa 1: build
############################
FROM node:20-alpine AS build

WORKDIR /app

# Instalar dependencias (capa cacheable)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copiar el resto del código y construir
COPY . .
RUN npm run build

############################
# Etapa 2: runtime (nginx)
############################
FROM nginx:alpine AS runtime

# Configuración nginx personalizada
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Artefactos estáticos generados por Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Healthcheck básico
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
