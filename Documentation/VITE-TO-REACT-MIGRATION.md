# Migration from Vite to React Scripts

This document outlines the changes made to migrate the project from Vite to React Scripts.

## Changes Made

1. **Package.json**
   - Removed Vite and related dependencies
   - Added React Scripts
   - Updated scripts to use React Scripts instead of Vite

2. **Entry Point**
   - Created `src/index.js` as the new entry point
   - Removed references to `main.jsx`

3. **HTML Template**
   - Created `public/index.html` for React
   - Updated paths to use `%PUBLIC_URL%` for public assets

4. **Build Configuration**
   - Removed `vite.config.js`
   - Added `jsconfig.json` for better module resolution

5. **Import Statements**
   - Removed `.jsx` extensions from imports

6. **Environment Variables**
   - Added React-specific settings to `.env` file
   - Kept existing environment variables

7. **GitHub Actions**
   - Updated deployment workflow to use `build` directory instead of `dist`

## How to Run the Project

1. **Development**
   ```bash
   npm start
   ```

2. **Production Build**
   ```bash
   npm run build
   ```

3. **Testing**
   ```bash
   npm test
   ```

## Notes

- React Scripts uses a different build process than Vite
- The output directory is now `build` instead of `dist`
- Environment variables now need to be prefixed with `REACT_APP_` to be accessible in the React application