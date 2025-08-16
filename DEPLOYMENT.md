# CKKS Production Deployment Guide

## Architecture Overview

The CKKS platform consists of two separate applications:

1. **Next.js Frontend** - Main user interface
2. **NestJS API** - Backend application with database connections

## Production Deployment on MyDevil.net

### Directory Structure
```
/usr/home/ckkspl/domains/
├── ckks.edu.pl/
│   └── public_html/          # Next.js Frontend
│       ├── out/              # Static export files
│       ├── _next/
│       └── index.html

```

### Deployment Steps

#### 1. Deploy NestJS API
```bash
# Build API locally
cd api
npm run build

# Upload to server
scp -r dist package.json app.js ckkspl@s42.mydevil.net:domains/ckks.edu.pl/public_html/

# SSH to server and install dependencies
ssh ckkspl@s42.mydevil.net
cd domains/ckks.edu.pl/public_html
npm install --production

# Configure Passenger
# Create .passenger file with:
# {
#   "nodejs": "20.0.0",
#   "startup_file": "app.js"
# }
```

#### 2. Deploy Next.js Frontend
```bash
# Build frontend locally
npm run build
npm run prod

# Upload to server
scp -r out/* ckkspl@s42.mydevil.net:domains/ckks.edu.pl/public_html/
```

#### 3. Configure Environment Variables

**On API server (api.ckks.pl):**
```env
NODE_ENV=production
DB_HOST=mysql42.mydevil.net
DB_PORT=3306
DB_USERNAME=m1336_ckks
DB_PASSWORD=gsbQohb4gVfR9r4jjJ3P
DB_DATABASE=m1336_ckks
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**On Frontend server (ckks.edu.pl):**
```env
NODE_ENV=production
CKKS_API_URL=https://api.ckks.pl
API=https://api.ckks.pl/api
NEXT_PUBLIC_SITE_URL=https://ckks.edu.pl
```

#### 4. Restart Services
```bash
# Restart Frontend
devil www restart ckks.edu.pl
```

### Health Checks
```bash
# Check API
curl https://api.ckks.pl/api/course

# Check Frontend
curl https://ckks.edu.pl

# Check integration
curl https://ckks.edu.pl/api/course
```

### Troubleshooting

#### Common Issues:
1. **API not responding**: Check Passenger logs and Node.js version
2. **Database connection**: Verify SSL settings and credentials
3. **CORS errors**: Ensure API allows frontend domain
4. **Email not working**: Check SMTP configuration

### Monitoring
- **API Health**: `GET /api/course` should return course data
- **Database**: Check MySQL connection and query performance
- **Email**: Test with `GET /api/test-email`

## Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Frontend | localhost:3000 | https://ckks.edu.pl |
| API | localhost:3001 | https://api.ckks.pl |
| Database | Remote MySQL | Remote MySQL |
| Email | Ethereal (test) | Gmail SMTP |
| SSL | No | Yes |

## Security Considerations

1. **Database**: SSL connections enabled
2. **API**: CORS configured for specific domains
3. **Environment**: Sensitive data in environment variables
4. **Validation**: Input validation on all endpoints
5. **Rate limiting**: Implemented for API endpoints
