# --- ETAP 1: Budowanie (Kompilacja TypeScript) ---
# Używamy oficjalnego obrazu Node.js (w lekkiej wersji alpine) jako "buildera"
FROM node:18-alpine AS builder

# Ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /app

# Kopiujemy pliki konfiguracyjne projektu
COPY package.json package-lock.json ./

# Instalujemy zależności (tylko TypeScript)
RUN npm install --only=development

# Kopiujemy pliki konfiguracyjne TS i cały kod źródłowy
COPY tsconfig.json ./
COPY src ./src

# Uruchamiamy skrypt "build" (czyli `tsc`), który skompiluje TS do JS w folderze /app/dist
# --- ETAP 1: Budowanie (Kompilacja TypeScript) ---
# Używamy oficjalnego obrazu Node.js (w lekkiej wersji alpine) jako "buildera"
FROM node:18-alpine AS builder

# Ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /app

# Kopiujemy pliki konfiguracyjne projektu
COPY package.json package-lock.json ./

# Instalujemy zależności (tylko TypeScript)
RUN npm install --only=development

# Kopiujemy pliki konfiguracyjne TS i cały kod źródłowy
COPY tsconfig.json ./
COPY src ./src

# Uruchamiamy skrypt "build" (czyli `tsc`), który skompiluje TS do JS w folderze /app/dist
RUN npm run build

# --- ETAP 2: Serwowanie (Nginx) ---
# Zaczynamy od nowa, z czystego, lekkiego obrazu Nginx
FROM nginx:alpine

# Kopiujemy wszystko z folderu src (HTML, CSS, i skompilowane JS)
COPY --from=builder /app/src /usr/share/nginx/html

# Port 80 jest domyślnie wystawiony przez Nginx
# Uruchomienie Nginx (to jest domyślna komenda obrazu)
CMD ["nginx", "-g", "daemon off;"]