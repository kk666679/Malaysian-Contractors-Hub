# MEP Project Scripts

This directory contains scripts to help with development, building, and deployment of the MEP project.

## Available Scripts

### setup.sh

Initial setup script to prepare the development environment.

```bash
./setup.sh
```

This script:
- Cleans previous installations
- Installs dependencies with the correct flags
- Creates necessary directories
- Sets up PWA assets

### build.sh

Build script for creating production-ready assets.

```bash
./build.sh
```

This script:
- Checks and installs dependencies if needed
- Runs linting and tests
- Builds the application
- Generates PWA assets
- Creates necessary files for production

### deploy.sh

Deployment script for committing, tagging, and pushing changes.

```bash
./deploy.sh
```

This script:
- Builds the application
- Prompts for a commit message
- Commits changes
- Creates a version tag
- Pushes to the remote repository

## Common Issues

If you encounter any issues with the scripts, try the following:

1. Make sure the scripts are executable:
   ```bash
   chmod +x *.sh
   ```

2. If dependencies are not installing correctly:
   ```bash
   npm install --legacy-peer-deps
   ```

3. If the build fails, try cleaning the cache:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   ./setup.sh
   ```