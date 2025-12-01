# Funkcyjny Generator Palet

Projekt generatora palet kolorów napisany w **TypeScript** z naciskiem na **Programowanie Funkcyjne (Functional Programming)**.
Aplikacja działa w trybie **Dark Mode** i jest przygotowana do łatwego uruchomienia w kontenerze **Docker**.

## Funkcjonalności

*   **Czyste Funkcje (Pure Functions):** Logika generowania kolorów (`logic.ts`) jest w pełni odseparowana od DOM.
*   **Dark Mode:** Ciemny motyw przyjazny dla oczu.
*   **Kopiowanie:** Kliknięcie w kolor kopiuje go do schowka (z powiadomieniem "Copied!").
*   **Export CSS:** Możliwość wygenerowania gotowych zmiennych CSS dla całej palety.

## 🚀 Jak Uruchomić (Docker) - Zalecane

To jest preferowany sposób uruchomienia aplikacji.

1.  **Zbuduj obraz:**
    ```bash
    docker build -t generator-palet .
    ```

2.  **Uruchom kontener:**
    ```bash
    docker run -p 8080:80 generator-palet
    ```

3.  Otwórz przeglądarkę pod adresem: [http://localhost:8080](http://localhost:8080)

### Tryb Deweloperski (Hot Reload)

Aby zmiany w kodzie były widoczne natychmiast (bez przebudowywania obrazu):

1.  Uruchom kontener z mapowaniem wolumenu:
    ```bash
    docker run -d -p 8080:80 -v ${PWD}/src:/usr/share/nginx/html --name generator-palet generator-palet
    ```
    *(Na Windows w PowerShell użyj `${PWD}`, w cmd `%cd%`, na Linux/Mac `$(pwd)`)*

2.  W osobnej konsoli uruchom kompilację TypeScript w trybie śledzenia:
    ```bash
    npm install
    npx tsc --watch
    ```

## 🛠️ Jak Uruchomić (Lokalnie)

Jeśli nie chcesz używać Dockera:

1.  Zainstaluj zależności: `npm install`
2.  Skompiluj projekt: `npm run build`
3.  Otwórz plik `src/index.html` w przeglądarce.

## Struktura Plików

*   `src/logic.ts` - Czysta logika (Pure Functions).
*   `src/main.ts` - Obsługa interfejsu (Impure Functions).
*   `src/style.css` - Style (Dark Mode).
*   `Dockerfile` - Konfiguracja środowiska produkcyjnego (Nginx)."# generator-palet" 
