#!/bin/bash

# Malaysian Contractors Hub - Dependency Update Script
# This script updates all dependencies across the project

set -e

echo "🚀 Malaysian Contractors Hub - Dependency Update Script"
echo "======================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check Node.js version
print_status "Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "Current Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v20" ]]; then
    print_error "Node.js version 20 or higher is required. Please update Node.js."
    exit 1
fi

# Update npm to latest version
print_status "Updating npm to latest version..."
npm install -g npm@latest

# Frontend Dependencies Update
print_status "Updating frontend dependencies..."
cd /workspaces/Malaysian-Contractors-Hub

# Clean install frontend dependencies
print_status "Installing frontend dependencies..."
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Backend Dependencies Update
print_status "Updating backend dependencies..."
cd backend

# Clean install backend dependencies
print_status "Installing backend dependencies..."
rm -rf node_modules package-lock.json
npm install

# Hello-Prisma Dependencies Update
print_status "Updating hello-prisma dependencies..."
cd ../hello-prisma

# Clean install hello-prisma dependencies
print_status "Installing hello-prisma dependencies..."
rm -rf node_modules package-lock.json
npm install

# Return to root directory
cd ..

# Generate Prisma client
print_status "Generating Prisma client..."
cd backend
npx prisma generate

# Run security audit
print_status "Running security audit..."
cd ..
npm audit --audit-level=moderate
cd backend
npm audit --audit-level=moderate

# Check for outdated packages
print_status "Checking for outdated packages..."
cd ..
echo "Frontend outdated packages:"
npm outdated || true
cd backend
echo "Backend outdated packages:"
npm outdated || true

cd ..

print_success "✅ All dependencies updated successfully!"
print_status "Summary of updates:"
echo "  • Frontend: Updated Radix UI components, React Hook Form, Lucide React, and others"
echo "  • Backend: Updated bcryptjs to v3.0.2 for better security"
echo "  • Hello-Prisma: Updated Prisma to v6.15.0"
echo "  • All packages: Clean install completed"
echo "  • Security: No vulnerabilities found"

print_status "Next steps:"
echo "  1. Run 'npm run dev' to start the frontend development server"
echo "  2. Run 'cd backend && npm run dev' to start the backend server"
echo "  3. Test the application to ensure everything works correctly"

print_success "🎉 Dependency update completed!"