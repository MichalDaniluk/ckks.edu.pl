# Konfiguracja aplikacji Node.js na serwerach MyDevil.net

## Przegląd technologii

MyDevil.net oferuje nowoczesne rozwiązania hostingowe z obsługą:
- **Node.js** - obsługa nowoczesnych frameworków
- **Nginx** - ultra-wydajny serwer HTTP z obsługą HTTP/2
- **SSD** - hosting oparty na dyskach SSD
- **SSH** - dostęp przez SSH i zarządzanie przez przeglądarkę

## Node.js - Konfiguracja

### Dostępne wersje Node.js
- v14.21.1
- v16.20.2
- v18.20.2 (domyślna)
- v20.17
- v22.4.1
- v23.10.0

### Początkowa konfiguracja

1. **Przygotowanie środowiska**
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:~/bin:$PATH' >> $HOME/.bash_profile
```

2. **Struktura projektu**
- Główny katalog: `/usr/home/_login_/domains/_domena_/public_nodejs`
- Pliki statyczne: `/public` (podkatalog)
- Usunięcie domyślnego `index.html`

3. **Zmiana wersji Node.js**
```bash
mkdir -p ~/bin && ln -fs /usr/local/bin/node22 ~/bin/node && ln -fs /usr/local/bin/npm22 ~/bin/npm
```

### Zarządzanie aplikacją

#### Restart aplikacji
```bash
devil www restart _domena_
```
- Aplikacje restartują się automatycznie po 24h nieaktywności
- Restart przez panel administracyjny również dostępny

#### Logi błędów
- Lokalizacja: `/domains/_domena_/logs/error.log`

#### Zmienne środowiskowe
- Konfiguracja w `~/.bash_profile`

### Instalacja modułów

#### Globalna instalacja modułów
```bash
npm install -g _nazwa_modułu_
```

#### Kompilacja (jeśli potrzebna)
```bash
export C=clang
export CXX=clang++
```

## Nginx - Konfiguracja

### Funkcje serwera Nginx

- **HTTP/2** - obsługa nowoczesnego protokołu HTTP/2
- **Kompatybilność .htaccess** - obsługa standardu mod_rewrite przez niestandardowe łatki
- **Integracja z Passenger** - technologia do obsługi aplikacji
- **Wysoka wydajność** - zoptymalizowany serwer HTTP

### Obsługiwane technologie

Nginx na MyDevil obsługuje:
- **Języki programowania**: PHP, Python, Ruby, Node.js, Java, Perl, C, C++, D
- **Frameworki**: Django, Catalyst, Ruby on Rails
- **Nowoczesne aplikacje webowe**

## Konfiguracja aplikacji

### Ogólne funkcje hostingu

#### Specyfikacja techniczna
- **Pojemność**: 20-200 GB przestrzeni dyskowej
- **Dyski**: SSD dla lepszej wydajności
- **Dostęp**: SSH i zarządzanie przez przeglądarkę
- **Wsparcie**: Baza wiedzy i pomoc techniczna

#### Obsługiwane technologie
- **Node.js** - aplikacje JavaScript po stronie serwera
- **Django** - framework Python
- **Ruby on Rails** - framework Ruby
- **PHP** - różne wersje
- **Python** - różne wersje

### Zalecenia dla aplikacji Node.js

1. **Bezpieczeństwo**: Platforma gwarantuje bezpieczne środowisko
2. **Wydajność**: Optymalizacja pod kątem nowoczesnych aplikacji
3. **Elastyczność**: Oprogramowanie dopasowane do potrzeb
4. **Wsparcie**: Dostępna dokumentacja i pomoc techniczna

### Dodatkowe usługi

- **Migracja**: Darmowa migracja z innych hostingów
- **Program partnerski**: Do 20% prowizji
- **Wsparcie techniczne**: Dla wszystkich pakietów hostingowych

## Podsumowanie

MyDevil.net oferuje kompleksowe rozwiązanie hostingowe dla aplikacji Node.js z:
- Nowoczesnym serwerem Nginx z HTTP/2
- Wieloma wersjami Node.js do wyboru
- Prostym systemem zarządzania i restartowania aplikacji
- Obsługą SSH i zaawansowanych funkcji developerskich
- Bezpiecznym i wydajnym środowiskiem SSD

Platforma jest szczególnie dostosowana do nowoczesnych frameworków i aplikacji webowych, zapewniając stabilność i potencjał rozwojowy.