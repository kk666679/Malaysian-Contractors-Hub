#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== MEP Project Release Script ===${NC}"

# Get the current version from package.json
VERSION=$(node -p "require('./package.json').version")
echo -e "${YELLOW}Current version: ${VERSION}${NC}"

# Build the application
echo -e "${YELLOW}Building application...${NC}"
./build.sh

# Git operations
echo -e "${YELLOW}Preparing Git operations${NC}"

# Check if there are any changes to commit
if [[ -z $(git status -s) ]]; then
  echo -e "${RED}No changes to commit${NC}"
  exit 0
fi

# Show changes
echo -e "${YELLOW}Changes to be committed:${NC}"
git status -s

# Ask for commit message
read -p "Enter commit message (or press enter for default): " COMMIT_MESSAGE
if [[ -z "$COMMIT_MESSAGE" ]]; then
  COMMIT_MESSAGE="Release v${VERSION}: Service pages enhancement and dependency updates"
fi

# Add all files
git add .

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
git commit -m "$COMMIT_MESSAGE"

# Create a tag with the version
echo -e "${YELLOW}Creating tag v${VERSION}...${NC}"
git tag -a "v${VERSION}" -m "Version ${VERSION}"

# Push to remote
echo -e "${YELLOW}Pushing to remote repository...${NC}"
git push origin main
git push origin --tags

echo -e "${GREEN}Release process completed successfully!${NC}"
echo -e "${GREEN}Version v${VERSION} has been tagged and pushed.${NC}"

# Deploy
echo -e "${YELLOW}Starting deployment process...${NC}"
# Add your deployment commands here, e.g.:
# npm run deploy
# or
# ./deploy.sh

echo -e "${GREEN}Deployment completed!${NC}"