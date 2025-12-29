# Funkcyjny Generator Palet Kolorów
> Projekt z wykładu monograficznego - podejście funkcyjne

Aplikacja służy do generowania harmonijnych zestawów barw na podstawie koloru bazowego.
Kod został zrefaktoryzowany zgodnie z paradygmatem programowania funkcyjnego.

## Funkcjonalności
*   **Generowanie palet**: Monochromatyczna, Analogiczna, Triada, Dopełnieniowa.
*   **Kopiowanie do schowka**: Kliknij na kolor, aby skopiować jego kod HEX.
*   **Podejście Funkcyjne**:
    *   **Czyste Funkcje**: Logika generowania palet jest wolna od efektów ubocznych.
    *   **Immutability**: Dane nie są modyfikowane w miejscu.
    *   **Kompozycja (Pipe)**: Wykorzystanie `Ramda.pipe` do tworzenia potoków przkształceń.
    *   **Currying**: Rozwijanie funkcji (gdzie to zasadne).
    *   **Monada Maybe**: Bezpieczna obsługa elementów DOM (brak nulli).
    *   **Memoizacja**: Zapamiętywanie wyników kosztownych obliczeń (konwersje kolorów).

## Uruchomienie

### Wymagania
*   Node.js
*   npm

### Instalacja i Uruchomienie (wersja deweloperska)
Ze względu na użycie modułów ES6 i zabezpieczenia przeglądarek (CORS), aplikację należy uruchomić przez lokalny serwer.

1.  Zainstaluj zależności (opcjonalne, ale zalecane dla typów):
    ```bash
    npm install
    ```
2.  Skompiluj TypeScript:
    ```bash
    npx tsc
    ```
3.  Uruchom serwer lokalny:
    ```bash
    npx serve src
    ```
4.  Otwórz adres podany w terminalu (zazwyczaj `http://localhost:3000`).

**Uwaga**: Biblioteka `Ramda` jest pobierana dynamicznie z CDN (esm.sh) dzięki konfiguracji Import Map w `index.html`.


## Docker
Aby uruchomić aplikację w kontenerze Docker:

1.  Zbuduj obraz:
    ```bash
    docker build -t generator-palet .
    ```
2.  Uruchom kontener:
    ```bash
    docker run -p 8080:80 generator-palet
    ```
    (Port zależy od konfiguracji twojego Dockerfile / serwera w kontenerze).
