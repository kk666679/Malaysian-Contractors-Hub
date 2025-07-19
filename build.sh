#!/bin/bash

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the project
echo "Building the project..."
npm run build

echo "Build completed! The output is in the dist directory."