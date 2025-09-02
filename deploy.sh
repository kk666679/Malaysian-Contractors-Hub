#!/bin/bash

# Malaysian Contractors Hub - Vercel Deployment Script

echo "🚀 Starting deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod --yes

# Configure custom domains
echo "🔗 Configuring custom domains..."
vercel domains add mc-hub.site
vercel domains add www.mc-hub.site

# Set domain aliases
vercel alias set malaysian-contractors-hub.vercel.app mc-hub.site
vercel alias set malaysian-contractors-hub.vercel.app www.mc-hub.site

echo "✅ Deployment completed!"
echo "🌍 Your app is now live at:"
echo "   - https://mc-hub.site"
echo "   - https://www.mc-hub.site"
echo "   - https://malaysian-contractors-hub.vercel.app"