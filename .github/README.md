# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the CKKS educational platform.

## Workflows Overview

### 1. CI (Continuous Integration) - `ci.yml`
**Triggers:** Push to main/develop branches, Pull requests to main
**Purpose:** Automated testing, linting, and build verification

**Jobs:**
- **test**: Runs on multiple Node.js versions (18.x, 20.x)
  - ESLint checking
  - Jest test suite
  - Build verification
  
- **build-check**: Verifies production build and static export
  - Creates production build with environment variables
  - Generates static export using `npm run prod`
  - Uploads build artifacts for 7 days

### 2. Deploy to Production - `deploy.yml`
**Triggers:** Push to main branch, Manual workflow dispatch
**Purpose:** Automated deployment to MyDevil.net production server

**Features:**
- Environment: `production` (requires approval)
- Optional force deployment (skips tests)
- SSH deployment to MyDevil.net server
- Health check verification
- Automatic server restart with `devil www restart`

**Required Secrets:**
- `SSH_PRIVATE_KEY`: Private SSH key for server access
- `SSH_HOST`: Server hostname (e.g., s42.mydevil.net)
- `SSH_USER`: SSH username (e.g., ckkspl)

### 3. Security Scan - `security.yml`
**Triggers:** Push/PR to main/develop, Weekly schedule (Mondays 2 AM), Manual
**Purpose:** Automated security scanning and dependency auditing

**Features:**
- npm audit for security vulnerabilities
- Dependency outdated check
- GitHub CodeQL static analysis
- Weekly scheduled scans

### 4. Manual Deployment - `manual-deploy.yml`
**Triggers:** Manual workflow dispatch only
**Purpose:** On-demand deployment with customizable options

**Input Options:**
- **Environment:** production/staging
- **Skip Tests:** Bypass quality checks
- **Deployment Message:** Custom deployment reason

**Features:**
- Flexible environment deployment
- Uses existing `deploy.sh` script if available
- Fallback to manual deployment steps
- Health check verification

## Setup Requirements

### Repository Secrets
Configure these secrets in GitHub Settings > Secrets and variables > Actions:

```
SSH_PRIVATE_KEY=<your-private-ssh-key>
SSH_HOST=s42.mydevil.net  # Your MyDevil server
SSH_USER=ckkspl           # Your SSH username
```

### Environment Protection
1. Go to Settings > Environments
2. Create `production` environment
3. Add required reviewers (optional)
4. Configure environment secrets if different from repository secrets

### Server Prerequisites
On your MyDevil.net server:
- SSH access configured
- `devil` command available for server management
- Directory structure: `~/public_html` for web files

## Workflow Usage

### Automatic Deployments
- **Push to main**: Triggers production deployment automatically
- **Push to develop**: Runs CI tests only
- **Pull requests**: Runs CI tests and build verification

### Manual Deployments
1. Go to Actions tab in GitHub
2. Select "Manual Deployment" workflow
3. Click "Run workflow"
4. Choose environment and options
5. Add deployment message
6. Click "Run workflow"

### Security Monitoring
- Weekly automated security scans
- Check Actions tab for security reports
- Review npm audit results and CodeQL findings

## Environment Variables

The workflows use these environment variables during build:

```bash
NODE_ENV=production
CKKS_API_URL=https://api.ckks.pl          # Primary NestJS API
API=https://api.ckks.pl/api               # Legacy API fallback
```

## Build Process

1. **Install**: `npm ci` (clean install)
2. **Lint**: `npm run lint` (ESLint with auto-fix)
3. **Test**: `npm run test` (Jest test suite)
4. **Build**: `npm run build` (Next.js production build)
5. **Export**: `npm run prod` (Static export to `/out`)
6. **Deploy**: Upload `/out` contents to server

## Troubleshooting

### Common Issues

**SSH Connection Failed:**
- Verify SSH_PRIVATE_KEY secret is correct
- Check SSH_HOST and SSH_USER values
- Ensure server allows SSH connections

**Build Failures:**
- Check environment variables are set
- Verify API endpoints are accessible
- Review lint and test failures in logs

**Health Check Failed:**
- Server may need more time to restart
- API endpoints might be unavailable
- Check server logs on MyDevil.net

**Permission Denied:**
- SSH key might not have correct permissions
- User might not have access to target directories
- Check `devil` command availability

### Debugging Tips

1. **Check workflow logs** in Actions tab
2. **Test locally** with same environment variables
3. **Verify server status** via SSH manually
4. **Check API health** endpoints directly

## Development Workflow

### Recommended Git Flow
```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "Add new feature"
git push origin feature/new-feature

# Create pull request (triggers CI)
# After approval, merge to main (triggers deployment)
```

### Local Testing
Before pushing, test locally:
```bash
npm run lint
npm run test
npm run build
npm run prod
```

## Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MyDevil.net Documentation](https://www.mydevil.net/docs/)
- [Project CLAUDE.md](../CLAUDE.md) for development guidelines