#!/bin/bash

# This script sets up the local environment to use the SSH and GPG keys

# Copy SSH config
mkdir -p ~/.ssh
cp /workspaces/MEP/keys/ssh_config ~/.ssh/config
chmod 600 ~/.ssh/config

# Set up Git config
cp /workspaces/MEP/.gitconfig ~/.gitconfig

# Test SSH connection
echo "Testing SSH connection to GitHub..."
ssh -T git@github.com

# Test GPG signing
echo "Testing GPG signing..."
echo "test" | gpg --clearsign

echo "Setup complete!"