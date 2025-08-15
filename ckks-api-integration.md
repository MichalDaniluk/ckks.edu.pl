# CKKS API Integration Guide

## Architektura

### Development (Lokalne środowisko)
```
Next.js (localhost:3000)
    ↓ proxy API calls
CKKS API (localhost:3001)
    ↓ connect to
MySQL Database (mydevil.net)
```

### Production (MyDevil.net)
```
Next.js (https://next.ckks.pl)
    ↓ proxy API calls
CKKS API (/api directory - same domain)
    ↓ connect to
MySQL Database (mydevil.net)
```

## Zmienne środowiskowe

### Development (.env.local)
```env
CKKS_API_URL=http://localhost:3001
API=https://api.ckks.pl/api
NODE_ENV=development
```

### Production (.env.production)
```env
CKKS_API_URL=/api
API=https://api.ckks.pl/api
NODE_ENV=production
```

## Struktura API Endpoints

### Utworzone proxy endpointy w Next.js

| Endpoint | Cel | Proxy do |
|----------|-----|-----------|
| `/api/course` | Wszystkie kursy | `${CKKS_API_URL}/api/course` |
| `/api/course/running/[count]` | Uruchomione kursy | `${CKKS_API_URL}/api/course/running/[count]` |
| `/api/course/categories/rusza` | Kategoria "rusza" | `${CKKS_API_URL}/api/course/rusza` |
| `/api/course/categories/oswiata` | Kursy oświatowe | `${CKKS_API_URL}/api/course/oswiata` |
| `/api/course/categories/podyplomowe` | Studia podyplomowe | `${CKKS_API_URL}/api/course/podyplomowe` |
| `/api/course/kurs/[href]` | Kurs po URL | `${CKKS_API_URL}/api/course/kurs/[href]` |
| `/api/course/kurs/[href]/terms` | Terminy kursu | `${CKKS_API_URL}/api/course/kurs/[href]/terms` |
| `/api/instructors` | Instruktorzy | `${CKKS_API_URL}/api/instructors` |

### Zaktualizowane endpointy

| Endpoint | Zmiana |
|----------|--------|
| `/api/application` | Proxy do `${CKKS_API_URL}/api/application` |
| `/api/blog` | Proxy do `${CKKS_API_URL}/api/blog` |
| `/api/course/[pid]` | Proxy do `${CKKS_API_URL}/api/course/[pid]` |

## Deployment na MyDevil.net

### Struktura katalogów
```
/usr/home/ckkspl/domains/next.ckks.pl/
├── public_html/          # Next.js aplikacja
├── api/                  # CKKS API (NestJS)
│   ├── app.js           # Passenger entry point
│   ├── dist/            # Skompilowana aplikacja
│   └── node_modules/    # Zależności
```

### Kroki deployment

1. **Upload CKKS API do katalogu `/api`**
2. **Konfiguracja Passenger** dla API:
   - Startup file: `app.js`
   - Node.js environment: production
3. **Konfiguracja zmiennych środowiskowych**:
   ```
   CKKS_API_URL=/api
   ```
4. **Restart aplikacji**:
   ```bash
   devil www restart next.ckks.pl
   ```

## Testowanie

### Lokalne testowanie
```bash
# Terminal 1: Uruchom CKKS API
cd ckks-api
npm run start:dev

# Terminal 2: Uruchom Next.js
npm run dev

# Test endpoint
curl http://localhost:3000/api/course
```

### Testowanie produkcyjne
```bash
# Test API bezpośrednio
curl https://next.ckks.pl/api/course

# Test przez proxy Next.js
curl https://next.ckks.pl/api/course
```

## Fallback Strategy

Wszystkie endpointy mają fallback do zewnętrznego API:
- Jeśli CKKS API nie odpowiada, używa `process.env.API`
- Graceful degradation - aplikacja dalej działa

## Monitoring

### Logi
- **Development**: Console.log w terminalu
- **Production**: PM2 logs lub Passenger logs

### Health Check
```bash
# Sprawdź czy API działa
curl ${CKKS_API_URL}/api/course

# Sprawdź status bazy danych
curl ${CKKS_API_URL}/api/health
```

## Bezpieczeństwo

- **CORS**: Skonfigurowane dla next.ckks.pl
- **Validation**: NestJS ValidationPipe
- **Database**: SSL połączenia do MySQL
- **Environment**: Zmienne środowiskowe dla wrażliwych danych