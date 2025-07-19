#!/bin/bash

# Direct deployment script for chemmara.space
# This script can be run manually to deploy the application

set -e

echo "🚀 Starting direct deployment to chemmara.space..."

# Check if SSH key is available
if [ ! -f ~/.ssh/id_rsa ]; then
  echo "❌ SSH key not found. Please set up SSH key authentication first."
  exit 1
fi

# Build the application
echo "📦 Building the application..."
npm run build

# Create .htaccess file
echo "⚙️ Creating .htaccess file..."
cat > ./build/.htaccess << EOL
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
rsync -avz --delete ./build/ chemmara@chemmara.space:/var/www/html/

echo "✅ Deployment completed successfully!"
echo "🌍 Your application is now live at https://chemmara.space"