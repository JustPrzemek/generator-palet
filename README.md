# Funkcyjny Generator Palet

Profesjonalne narzędzie do generowania harmonijnych palet kolorów, stworzone z wykorzystaniem **TypeScript** i paradygmatu **Programowania Funkcyjnego**. Projekt demonstruje czystą architekturę kodu, separację logiki biznesowej od warstwy prezentacji oraz nowoczesne podejście do wdrażania aplikacji webowych.

Aplikacja oferuje intuicyjny interfejs w trybie **Dark Mode**, zapewniając komfort pracy nawet w godzinach nocnych.

## Główne Cechy

*   **Architektura Funkcyjna:** Rdzeń aplikacji oparty na czystych funkcjach (Pure Functions), co gwarantuje przewidywalność i łatwość testowania.
*   **TypeScript:** Pełne typowanie statyczne zapewniające bezpieczeństwo kodu i lepsze Developer Experience.
*   **Konteneryzacja:** Gotowość do wdrożenia dzięki Docker i Nginx.
*   **Interaktywność:** Kopiowanie kolorów do schowka jednym kliknięciem.
*   **Wiele Trybów Generowania:** Obsługa palet monochromatycznych, analogowych, triady i dopełnieniowych.

## Technologie

Projekt wykorzystuje nowoczesny stack technologiczny:

*   **Język:** [TypeScript](https://www.typescriptlang.org/) (ES Modules)
*   **Stylizacja:** Native CSS (Dark Mode, Responsive Design)
*   **Infrastruktura:** [Docker](https://www.docker.com/) + [Nginx](https://nginx.org/) (Alpine Linux)
*   **Paradygmat:** Functional Programming (Immutability, Pure Functions)

## Dokumentacja Kodu

Struktura projektu została zaprojektowana z myślą o czytelności i separacji odpowiedzialności:

*   **`src/logic.ts`**: Serce aplikacji. Zawiera wyłącznie **czyste funkcje** odpowiedzialne za konwersje kolorów (HEX ↔ RGB ↔ HSL) oraz algorytmy generowania palet. Nie posiada żadnych efektów ubocznych (Side Effects).
*   **`src/main.ts`**: Warstwa interfejsu. Odpowiada za manipulację DOM, obsługę zdarzeń (Events) i komunikację z użytkownikiem.
*   **`src/style.css`**: Arkusze stylów definiujące wygląd aplikacji, w tym natywny Dark Mode.


## Jak Uruchomić (Docker)

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
