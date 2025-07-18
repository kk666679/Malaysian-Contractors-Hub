#!/bin/bash

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  pnpm install
fi

# Build the project
echo "Building the project..."
pnpm build

echo "Build completed! The output is in the dist directory."