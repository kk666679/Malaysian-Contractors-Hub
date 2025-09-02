# Malaysian Contractors Hub - Deployment Guide

## 🚀 Vercel Deployment

### Quick Deploy

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   ./deploy.sh
   ```

### Manual Deployment

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Configure Domains**
   ```bash
   vercel domains add mc-hub.site
   vercel domains add www.mc-hub.site
   vercel alias set malaysian-contractors-hub.vercel.app mc-hub.site
   ```

## 🌐 Live URLs

- **Primary**: https://mc-hub.site
- **WWW**: https://www.mc-hub.site  
- **Vercel**: https://malaysian-contractors-hub.vercel.app

## 🔧 Environment Variables

Set these in Vercel dashboard:

```env
NODE_ENV=production
VITE_API_URL=https://mc-hub-backend.vercel.app/api
VITE_APP_NAME=Malaysian Contractors Hub
VITE_APP_VERSION=1.0.0
```

## 📋 DNS Configuration

Point your domain to Vercel:

```
Type: CNAME
Name: mc-hub.site
Value: cname.vercel-dns.com

Type: CNAME  
Name: www.mc-hub.site
Value: cname.vercel-dns.com
```

## ✅ Deployment Checklist

- [x] Vercel configuration (`vercel.json`)
- [x] Build script (`vercel-build`)
- [x] Environment variables
- [x] Domain configuration
- [x] SPA routing (`_redirects`)
- [x] Production optimizations