#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting build process..."

# Install dependencies if needed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install --legacy-peer-deps
fi

# Run linting
echo "🔍 Running linter..."
npm run lint || true

# Run tests
echo "🧪 Running tests..."
npm test || true

# Build the application
echo "🏗️ Building application..."
NODE_ENV=production npm run build

# Generate PWA assets if they don't exist
echo "📱 Generating PWA assets..."
mkdir -p build/assets

if [ ! -f "build/pwa-192x192.png" ] && [ -f "public/avatar.png" ]; then
  echo "Copying PWA icons..."
  cp public/avatar.png build/pwa-192x192.png || true
  cp public/avatar.png build/pwa-512x512.png || true
  cp public/avatar.png build/apple-touch-icon.png || true
fi

# Copy manifest.json if it exists
if [ -f "public/manifest.json" ] && [ ! -f "build/manifest.json" ]; then
  echo "Copying manifest.json..."
  cp public/manifest.json build/
fi

# Copy service worker if it exists
if [ -f "public/sw.js" ] && [ ! -f "build/sw.js" ]; then
  echo "Copying service worker..."
  cp public/sw.js build/
fi

# Create robots.txt if it doesn't exist in build
if [ ! -f "build/robots.txt" ]; then
  echo "Creating robots.txt..."
  echo 'User-agent: *
Allow: /' > build/robots.txt
fi

echo "✅ Build completed successfully!"