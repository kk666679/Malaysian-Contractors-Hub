#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== MEP Project Deployment Script ===${NC}"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}Installing dependencies...${NC}"
  npm ci
fi

# Run linting
echo -e "${YELLOW}Running linter...${NC}"
npm run lint || true

# Run tests
echo -e "${YELLOW}Running tests...${NC}"
npm test || true

# Build the application
echo -e "${YELLOW}Building application...${NC}"
npm run build

# Git operations
echo -e "${YELLOW}Git operations${NC}"

# Get the current version from package.json
VERSION=$(node -p "require('./package.json').version")

# Ask for commit message
read -p "Enter commit message: " COMMIT_MESSAGE

# Add all files
git add .

# Commit changes
git commit -m "$COMMIT_MESSAGE"

# Create a tag with the version
git tag -a "v$VERSION" -m "Version $VERSION"

# Push to remote
echo -e "${YELLOW}Pushing to remote repository...${NC}"
git push origin main
git push origin --tags

echo -e "${GREEN}Deployment process completed successfully!${NC}"
echo -e "${GREEN}Version v$VERSION has been tagged and pushed.${NC}"