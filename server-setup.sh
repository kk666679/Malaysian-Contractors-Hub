#!/bin/bash

# Server setup script for Malaysian Civil & MEP Contractors Hub
# Sets up the server environment for hosting the application

set -e

echo "🚀 Setting up server for chemmara.space..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update
sudo apt upgrade -y

# Install required packages
echo "📦 Installing required packages..."
sudo apt install -y apache2 certbot python3-certbot-apache

# Enable required Apache modules
echo "⚙️ Enabling Apache modules..."
sudo a2enmod rewrite ssl headers

# Create web directory if it doesn't exist
echo "📁 Creating web directory..."
sudo mkdir -p /var/www/html
sudo chown -R $USER:$USER /var/www/html

# Copy Apache configuration
echo "⚙️ Setting up Apache configuration..."
sudo cp chemmara.space.conf /etc/apache2/sites-available/
sudo a2ensite chemmara.space.conf
sudo a2dissite 000-default.conf

# Obtain SSL certificate
echo "🔒 Obtaining SSL certificate..."
sudo certbot --apache -d chemmara.space -d www.chemmara.space --non-interactive --agree-tos --email admin@chemmara.space

# Restart Apache
echo "🔄 Restarting Apache..."
sudo systemctl restart apache2

# Set up automatic renewal for SSL certificate
echo "🔄 Setting up automatic SSL certificate renewal..."
echo "0 3 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab > /dev/null

echo "✅ Server setup completed successfully!"
echo "🌍 Your server is now ready to host the application at https://chemmara.space"