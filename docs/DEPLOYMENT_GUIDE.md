# Malaysian Contractors Hub - Deployment Guide

## 🚀 CI/CD Pipeline Overview

The project uses a modern CI/CD pipeline with GitHub Actions, supporting multiple environments and deployment strategies.

### Pipeline Stages

1. **Test & Quality Checks**
   - Linting and code quality
   - Unit and integration tests
   - Security scanning with CodeQL

2. **Build & Artifacts**
   - Frontend build optimization
   - Docker image creation
   - Artifact storage

3. **Deployment**
   - Staging: Auto-deploy from `develop` branch
   - Production: Auto-deploy from `main` branch and tags

## 📋 Prerequisites

- Node.js 20.x
- npm or yarn
- Docker (optional)
- Vercel CLI (for manual deployments)

## 🛠️ Deployment Methods

### 1. Automated Deployment (Recommended)

**Staging Deployment:**
```bash
git checkout develop
git push origin develop
# Automatically deploys to staging environment
```

**Production Deployment:**
```bash
git checkout main
git push origin main
# Automatically deploys to production
```

**Release Deployment:**
```bash
git tag v0.4.1
git push origin v0.4.1
# Creates release and deploys to production
```

### 2. Manual Deployment with CLI

**Deploy to Staging:**
```bash
npm run deploy:staging
```

**Deploy to Production:**
```bash
npm run deploy:production
```

**Create Release:**
```bash
node scripts/deploy.js release v0.4.1
```

### 3. Docker Deployment

**Build Docker Image:**
```bash
npm run docker:build
```

**Run Container:**
```bash
npm run docker:run
```

**Deploy to Container Registry:**
```bash
docker tag mchub:latest ghcr.io/kk666679/malaysian-contractors-hub:latest
docker push ghcr.io/kk666679/malaysian-contractors-hub:latest
```

## 🌍 Environment Configuration

### Staging Environment
- **URL**: https://malaysian-contractors-hub.vercel.app
- **Branch**: `develop`
- **Auto-deploy**: Yes
- **Environment**: `staging`

### Production Environment
- **URL**: https://mc-hub.site (Primary)
- **URL**: https://www.mc-hub.site (WWW)
- **Vercel**: https://malaysian-contractors-hub.vercel.app
- **Branch**: `main`
- **Auto-deploy**: Yes (main branch + tags)
- **Environment**: `production`

## 🔧 Environment Variables

### Frontend (.env.production)
```env
VITE_API_URL=https://api.mc-hub.site/api
VITE_NODE_ENV=production
VITE_SENTRY_DSN=your-sentry-dsn
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-jwt-secret
REDIS_URL=redis://host:6379
NODE_ENV=production
```

### GitHub Secrets
Required secrets in GitHub repository settings:

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
DATABASE_URL=your-production-db-url
JWT_SECRET=your-production-jwt-secret
```

## 📊 Monitoring & Health Checks

### Health Check
```bash
npm run health-check
```

### Deployment Status
```bash
node scripts/deploy.js status
```

### Rollback
```bash
node scripts/deploy.js rollback production
```

## 🔄 Rollback Procedures

### Automatic Rollback
The CI/CD pipeline includes automatic rollback on deployment failure.

### Manual Rollback
```bash
# Rollback to previous version
vercel rollback --env production

# Or use CLI
npm run deploy rollback production
```

### Emergency Rollback
```bash
# Quick rollback to last known good commit
git revert HEAD
git push origin main
```

## 🐛 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache and rebuild
npm run clean
npm ci --legacy-peer-deps
npm run build
```

**Deployment Failures:**
```bash
# Check deployment logs
vercel logs
```

**Health Check Failures:**
```bash
# Run detailed health check
npm run health-check
```

### Debug Commands
```bash
# Check build locally
npm run build

# Test production build
npm run preview

# Verify Docker build
docker build -t mchub-test .
docker run -p 3000:3000 mchub-test
```

## 📈 Performance Monitoring

### Build Metrics
- Bundle size monitoring
- Build time tracking
- Dependency analysis

### Runtime Metrics
- Response time monitoring
- Error rate tracking
- User experience metrics

## 🔐 Security

### Security Scanning
- Automated dependency vulnerability scanning
- CodeQL security analysis
- Container security scanning

### Security Best Practices
- Environment variable encryption
- Secure secret management
- Regular security updates

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com)

---

*Last Updated: January 2025*  
*Version: v0.4.0*