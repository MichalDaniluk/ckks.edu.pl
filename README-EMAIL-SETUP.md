# 📧 Konfiguracja powiadomień email dla GitHub Actions

## 🛠️ Wymagane GitHub Secrets

Aby skonfigurować powiadomienia email po deployment, musisz dodać następujące secrets w ustawieniach repository GitHub:

### 1. **SMTP_USERNAME**
- **Opis**: Adres email Gmail lub innego dostawcy SMTP
- **Przykład**: `your-email@gmail.com`
- **Jak uzyskać**: Użyj swojego konta Gmail

### 2. **SMTP_PASSWORD** 
- **Opis**: Hasło aplikacji Gmail (NIE hasło do konta!)
- **Jak uzyskać**:
  1. Przejdź do ustawień konta Google
  2. Włącz 2-factor authentication
  3. Przejdź do "App passwords" 
  4. Wygeneruj hasło dla "Mail"
  5. Użyj wygenerowanego hasła (16 znaków)

### 3. **NOTIFICATION_EMAIL**
- **Opis**: Adres email na który mają być wysyłane powiadomienia
- **Przykład**: `admin@ckks.pl` lub `dev-team@ckks.pl`

## 🔧 Jak dodać secrets w GitHub:

1. Przejdź do swojego repository na GitHub
2. Kliknij **Settings** (zakładka)
3. W menu bocznym kliknij **Secrets and variables** → **Actions**
4. Kliknij **New repository secret**
5. Dodaj każdy z wymaganych secrets

## 📧 Co zawiera email powiadomienie:

### ✅ **Email sukcesu zawiera:**
- 🎉 Potwierdzenie udanego deployment
- 📋 Szczegóły deployment (czas, commit hash, autor)
- 📝 Message commit i pełne detale
- 📁 Lista zmienionych plików (do 10)
- 🔗 Linki do strony, commit na GitHub, workflow run

### ❌ **Email błędu zawiera:**
- ⚠️ Informację o niepowodzeniu deployment
- 📋 Szczegóły błędnego commit
- 🔗 Linki do logów, troubleshooting

## 🧪 Testowanie

Po skonfigurowaniu secrets:

1. Zrób commit do branch `main`
2. Push zmian
3. Sprawdź czy workflow się uruchomił w zakładce **Actions**
4. Sprawdź pocztę email po zakończeniu deployment

## 🔐 Bezpieczeństwo

- **NIGDY** nie commituj haseł/secrets do repository
- Używaj tylko **App passwords** dla Gmail
- Regularnie rotuj hasła aplikacji
- Ograniczaj dostęp do secrets do minimum potrzebnych osób

## 📞 Wsparcie

Jeśli masz problemy z konfiguracją:
1. Sprawdź logi workflow w zakładce **Actions**
2. Upewnij się że wszystkie 3 secrets są poprawnie skonfigurowane  
3. Sprawdź czy Gmail App Password jest aktywny

---
*Dokument wygenerowany automatycznie przez Claude Code*