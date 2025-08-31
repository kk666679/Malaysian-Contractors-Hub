#!/bin/bash

# Repository Analyzer and Fixer Script
# This script analyzes a repository for common issues and attempts to fix them

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Log file
LOG_FILE="repo_analysis_$(date +%Y%m%d_%H%M%S).log"
CHANGES_LOG="changes_made_$(date +%Y%m%d_%H%M%S).log"

# Function to log messages
log() {
    echo -e "${BLUE}[$(date +%H:%M:%S)]${NC} $1" | tee -a "$LOG_FILE"
}

# Function to log changes
log_change() {
    echo -e "${GREEN}[CHANGE]${NC} $1" | tee -a "$CHANGES_LOG"
}

# Function to log errors
log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

# Function to log warnings
log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Initialize logs
echo "Repository Analysis Started: $(date)" > "$LOG_FILE"
echo "Changes Made Log" > "$CHANGES_LOG"
echo "" >> "$CHANGES_LOG"

log "Starting repository analysis..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    log_error "Not in a git repository. Please run this script from the root of a git repository."
    exit 1
fi

# Get repository root
REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

log "Repository root: $REPO_ROOT"

# 1. Check for syntax errors in JavaScript/TypeScript files
check_syntax_errors() {
    log "Checking for syntax errors..."

    # Find JS/TS files
    JS_FILES=$(find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .git)

    SYNTAX_ERRORS=0

    for file in $JS_FILES; do
        if ! node --check "$file" 2>/dev/null; then
            log_error "Syntax error in $file"
            SYNTAX_ERRORS=$((SYNTAX_ERRORS + 1))
        fi
    done

    if [ $SYNTAX_ERRORS -eq 0 ]; then
        log "No syntax errors found in JavaScript/TypeScript files."
    else
        log_warning "Found $SYNTAX_ERRORS files with syntax errors."
    fi
}

# 2. Check for missing dependencies
check_dependencies() {
    log "Checking for missing dependencies..."

    if [ ! -f "package.json" ]; then
        log_error "No package.json found. Skipping dependency check."
        return
    fi

    # Get all imports from JS/TS files
    IMPORTS=$(grep -r "import.*from" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" . | grep -v node_modules | sed 's/.*from ["'"'"']//' | sed 's/["'"'"'].*//' | sort | uniq)

    # Get installed dependencies
    if [ -f "package-lock.json" ] || [ -f "yarn.lock" ]; then
        INSTALLED_DEPS=$(node -p "Object.keys(require('./package.json').dependencies || {}).concat(Object.keys(require('./package.json').devDependencies || {}))" 2>/dev/null || echo "")
    else
        INSTALLED_DEPS=$(node -p "Object.keys(require('./package.json').dependencies || {}).concat(Object.keys(require('./package.json').devDependencies || {})" 2>/dev/null || echo "")
    fi

    MISSING_DEPS=()

    for import_path in $IMPORTS; do
        # Skip relative imports and built-in modules
        if [[ $import_path == ./* ]] || [[ $import_path == ../* ]] || [[ $import_path == @/* ]]; then
            continue
        fi

        # Check if it's in installed dependencies
        FOUND=false
        for dep in $INSTALLED_DEPS; do
            if [[ $import_path == $dep* ]]; then
                FOUND=true
                break
            fi
        done

        if [ "$FOUND" = false ]; then
            MISSING_DEPS+=("$import_path")
        fi
    done

    if [ ${#MISSING_DEPS[@]} -eq 0 ]; then
        log "No missing dependencies detected."
    else
        log_warning "Potential missing dependencies: ${MISSING_DEPS[*]}"
        log "Consider running: npm install ${MISSING_DEPS[*]}"
    fi
}

# 3. Check for unused/empty files and folders
check_dead_files() {
    log "Checking for dead files and folders..."

    # Find empty files
    EMPTY_FILES=$(find . -type f -empty | grep -v .git | grep -v node_modules)

    if [ -n "$EMPTY_FILES" ]; then
        log_warning "Found empty files:"
        echo "$EMPTY_FILES" | tee -a "$LOG_FILE"

        # Ask user if they want to remove empty files
        read -p "Remove empty files? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            for file in $EMPTY_FILES; do
                rm "$file"
                log_change "Removed empty file: $file"
            done
        fi
    else
        log "No empty files found."
    fi

    # Find empty directories
    EMPTY_DIRS=$(find . -type d -empty | grep -v .git | grep -v node_modules)

    if [ -n "$EMPTY_DIRS" ]; then
        log_warning "Found empty directories:"
        echo "$EMPTY_DIRS" | tee -a "$LOG_FILE"

        # Ask user if they want to remove empty directories
        read -p "Remove empty directories? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            for dir in $EMPTY_DIRS; do
                rmdir "$dir"
                log_change "Removed empty directory: $dir"
            done
        fi
    else
        log "No empty directories found."
    fi

    # Check for unused JS/TS files (basic check)
    log "Checking for potentially unused JavaScript/TypeScript files..."

    JS_FILES=$(find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .git | grep -v index.js | grep -v main.jsx)

    POTENTIALLY_UNUSED=()

    for file in $JS_FILES; do
        BASENAME=$(basename "$file" .js)
        BASENAME=$(basename "$BASENAME" .jsx)
        BASENAME=$(basename "$BASENAME" .ts)
        BASENAME=$(basename "$BASENAME" .tsx)

        # Check if file is imported anywhere
        if ! grep -r "$BASENAME" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" . | grep -v "$file" | grep -v node_modules > /dev/null; then
            POTENTIALLY_UNUSED+=("$file")
        fi
    done

    if [ ${#POTENTIALLY_UNUSED[@]} -gt 0 ]; then
        log_warning "Potentially unused files (manual review recommended):"
        printf '%s\n' "${POTENTIALLY_UNUSED[@]}" | tee -a "$LOG_FILE"
    else
        log "No obviously unused files found."
    fi
}

# 4. Check for other functionality issues
check_functionality_issues() {
    log "Checking for other functionality issues..."

    # Check for console.log statements in production code
    CONSOLE_LOGS=$(grep -r "console\." --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" . | grep -v node_modules | grep -v .git | wc -l)

    if [ $CONSOLE_LOGS -gt 0 ]; then
        log_warning "Found $CONSOLE_LOGS console statements. Consider removing for production."
    fi

    # Check for TODO/FIXME comments
    TODO_COMMENTS=$(grep -r "TODO\|FIXME\|XXX" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" . | grep -v node_modules | grep -v .git | wc -l)

    if [ $TODO_COMMENTS -gt 0 ]; then
        log_warning "Found $TODO_COMMENTS TODO/FIXME comments that may need attention."
    fi

    # Check for hardcoded URLs or sensitive data
    HARDCODED_URLS=$(grep -r "http://\|https://" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" . | grep -v node_modules | grep -v .git | grep -v "localhost\|127.0.0.1\|example.com" | wc -l)

    if [ $HARDCODED_URLS -gt 0 ]; then
        log_warning "Found $HARDCODED_URLS potentially hardcoded URLs. Review for environment-specific configurations."
    fi
}

# 5. Attempt to fix common issues
fix_common_issues() {
    log "Attempting to fix common issues..."

    # Check if package-lock.json exists but node_modules doesn't
    if [ -f "package-lock.json" ] && [ ! -d "node_modules" ]; then
        log "node_modules missing but package-lock.json exists. Running npm install..."
        npm install
        log_change "Ran npm install to restore node_modules"
    fi

    # Check for missing .gitignore
    if [ ! -f ".gitignore" ]; then
        log "No .gitignore found. Creating basic .gitignore..."
        cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log
EOF
        log_change "Created basic .gitignore file"
    fi

    # Check for ESLint configuration
    if [ ! -f ".eslintrc.js" ] && [ ! -f ".eslintrc.json" ] && [ ! -f "eslint.config.js" ]; then
        log "No ESLint configuration found. Consider adding one for better code quality."
    fi
}

# Main execution
main() {
    echo "=========================================="
    echo "Repository Analyzer and Fixer"
    echo "=========================================="

    check_syntax_errors
    echo ""

    check_dependencies
    echo ""

    check_dead_files
    echo ""

    check_functionality_issues
    echo ""

    fix_common_issues
    echo ""

    log "Analysis complete!"
    log "Logs saved to: $LOG_FILE"
    log "Changes saved to: $CHANGES_LOG"

    echo "=========================================="
    echo "Summary:"
    echo "- Full log: $LOG_FILE"
    echo "- Changes made: $CHANGES_LOG"
    echo "=========================================="
}

# Run main function
main
