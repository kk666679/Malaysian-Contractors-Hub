# Deployment Guide

## Automated Deployment with GitHub Actions

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

### How It Works

1. When code is pushed to the main branch, the GitHub Actions workflow is triggered.
2. The workflow:
   - Sets up Node.js and pnpm
   - Installs dependencies
   - Builds the project
   - Deploys the built files to GitHub Pages

### Requirements

- The repository must have GitHub Pages enabled in the repository settings.
- A GitHub token with appropriate permissions is automatically provided by GitHub Actions.

## Manual Deployment

If you need to deploy manually, follow these steps:

1. Build the project:
   ```bash
   pnpm build
   ```

2. The built files will be in the `dist` directory.

3. Deploy using your preferred hosting service:

   **For Firebase:**
   ```bash
   firebase deploy
   ```

   **For Netlify:**
   ```bash
   netlify deploy --prod
   ```

   **For Vercel:**
   ```bash
   vercel --prod
   ```

## Environment Configuration

Before deploying, ensure your environment variables are properly set:

1. For GitHub Actions, add any sensitive environment variables as GitHub Secrets.

2. For manual deployments, create a `.env.production` file with production values.

## Post-Deployment Verification

After deployment, verify:

1. The application loads correctly
2. All features work as expected
3. API connections are functioning
4. No console errors are present