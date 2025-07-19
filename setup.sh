#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== MEP Project Setup Script ===${NC}"

# Clean installation
echo -e "${YELLOW}Cleaning previous installation...${NC}"
rm -rf node_modules package-lock.json

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install --legacy-peer-deps

# Create necessary directories if they don't exist
echo -e "${YELLOW}Creating necessary directories...${NC}"
mkdir -p public/assets
mkdir -p src/assets/images

# Copy PWA assets if they don't exist
if [ ! -f "public/pwa-192x192.png" ] && [ -f "public/avatar.png" ]; then
  echo -e "${YELLOW}Copying PWA assets...${NC}"
  cp public/avatar.png public/pwa-192x192.png
  cp public/avatar.png public/pwa-512x512.png
  cp public/avatar.png public/apple-touch-icon.png
fi

echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${GREEN}You can now run 'npm run dev' to start the development server.${NC}"