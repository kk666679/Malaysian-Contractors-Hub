# Deployment Guide for Malaysian Civil & MEP Contractors Hub

This document provides instructions for deploying the Malaysian Civil & MEP Contractors Hub to https://chemmara.space.

## Deployment Options

There are three ways to deploy the application:

1. **Manual Deployment**: Using the `deploy.sh` script
2. **Server Setup**: Using the `server-setup.sh` script (first-time setup only)
3. **Continuous Deployment**: Using GitHub Actions (automatic deployment on push to main branch or tags)

## Prerequisites

- SSH access to the server (chemmara.space)
- Node.js v18 or higher
- npm v9 or higher
- Apache web server on the target server

## Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

The script will:
- Build the application
- Create necessary server configuration files
- Deploy the files to chemmara.space using rsync
- Set up proper routing for the SPA application

## Server Setup (First-time only)

If you're setting up the server for the first time, run:

```bash
./server-setup.sh
```

This script will:
- Install and configure Apache
- Set up SSL certificates using Let's Encrypt
- Configure the virtual host for chemmara.space
- Set up automatic SSL certificate renewal

## Continuous Deployment with GitHub Actions

The repository is configured with GitHub Actions for continuous deployment:

1. Push to the `main` branch or create a tag to trigger deployment
2. GitHub Actions will automatically build and deploy the application to chemmara.space

### Setting up GitHub Actions Secrets

For GitHub Actions to work, you need to set up the following secrets in your GitHub repository:

- `SSH_PRIVATE_KEY`: The SSH private key for accessing the server

## Post-Deployment Verification

After deployment, verify that:

1. The application is accessible at https://chemmara.space
2. All routes work correctly (test navigation)
3. SSL certificate is valid
4. PWA features work as expected

## Troubleshooting

If you encounter issues with the deployment:

1. Check the Apache error logs:
   ```bash
   ssh chemmara@chemmara.space "sudo tail -f /var/log/apache2/chemmara.space-error.log"
   ```

2. Verify the deployed files:
   ```bash
   ssh chemmara@chemmara.space "ls -la /var/www/html"
   ```

3. Test the Apache configuration:
   ```bash
   ssh chemmara@chemmara.space "sudo apache2ctl configtest"
   ```

## Rollback Procedure

To rollback to a previous version:

1. Find the tag of the version you want to rollback to:
   ```bash
   git tag -l
   ```

2. Checkout that tag:
   ```bash
   git checkout v0.2.0
   ```

3. Run the deployment script:
   ```bash
   ./deploy.sh
   ```