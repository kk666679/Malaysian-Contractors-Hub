#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Starting MEP Development Server ===${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}Node modules not found. Running setup script...${NC}"
  ./setup.sh
fi

# Start the development server
echo -e "${YELLOW}Starting development server...${NC}"
npm run dev

echo -e "${GREEN}Development server stopped.${NC}"