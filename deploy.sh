#!/bin/bash

# Deploy script for Malaysian Civil & MEP Contractors Hub
# Deploys the application to https://chemmara.space

set -e

echo "🚀 Starting deployment to chemmara.space..."

# Build the application
echo "📦 Building the application..."
npm run build

# Create a deployment directory if it doesn't exist
DEPLOY_DIR="./deploy"
mkdir -p $DEPLOY_DIR

# Copy build files to deployment directory
echo "📋 Copying build files to deployment directory..."
cp -r ./build/* $DEPLOY_DIR/

# Create .htaccess file for SPA routing
echo "⚙️ Creating .htaccess file for SPA routing..."
cat > $DEPLOY_DIR/.htaccess << EOL
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Set caching headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/json "access plus 0 seconds"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
EOL

# Deploy to server using rsync
echo "🌐 Deploying to chemmara.space..."
rsync -avz --delete $DEPLOY_DIR/ chemmara@chemmara.space:/var/www/html/

# Clean up
echo "🧹 Cleaning up..."
rm -rf $DEPLOY_DIR

echo "✅ Deployment completed successfully!"
echo "🌍 Your application is now live at https://chemmara.space"