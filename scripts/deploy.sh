#!/bin/bash

# Script to build and deploy the application

# Build the application
echo "Building the application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed! Aborting deployment."
  exit 1
fi

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."

# Check if gh-pages package is installed
if ! npm list gh-pages > /dev/null 2>&1; then
  echo "Installing gh-pages package..."
  npm install --save-dev gh-pages
fi

# Deploy using gh-pages
npx gh-pages -d dist

echo "Deployment complete!"