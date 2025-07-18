#!/bin/bash

# This script helps set up GitHub secrets for SSH, GPG, and deployment keys
# Run this script after you've generated the keys

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI is not installed. Please install it first."
    echo "https://github.com/cli/cli#installation"
    exit 1
fi

# Check if user is authenticated with GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "Please authenticate with GitHub CLI first:"
    echo "gh auth login"
    exit 1
fi

# Get repository name
read -p "Enter your GitHub repository name (format: username/repo): " REPO_NAME

# Set SSH private key as a secret
echo "Setting SSH_PRIVATE_KEY secret..."
cat ~/.ssh/id_ed25519_mep | gh secret set SSH_PRIVATE_KEY -R "$REPO_NAME"

# Set GPG private key as a secret
echo "Setting GPG_PRIVATE_KEY secret..."
gpg --export-secret-keys --armor 3B1DAEF5FB95E13D | gh secret set GPG_PRIVATE_KEY -R "$REPO_NAME"

# Set GPG passphrase (empty in this case, but you might want to set one)
echo "Setting GPG_PASSPHRASE secret..."
echo "" | gh secret set GPG_PASSPHRASE -R "$REPO_NAME"

# Set deploy key as a secret
echo "Setting DEPLOY_KEY secret..."
cat ~/.ssh/deploy_key | gh secret set DEPLOY_KEY -R "$REPO_NAME"

echo "Secrets have been set up successfully!"
echo "Make sure to add the public keys to your GitHub repository:"
echo "- SSH key: Add to your GitHub account"
echo "- GPG key: Add to your GitHub account"
echo "- Deploy key: Add to your repository's deploy keys"