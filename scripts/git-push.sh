#!/bin/bash

# Script to push changes to the remote repository

# Check if a commit message was provided
if [ -z "$1" ]; then
  echo "Please provide a commit message"
  echo "Usage: ./scripts/git-push.sh \"Your commit message\""
  exit 1
fi

# Add all changes
git add .

# Commit with the provided message
git commit -m "$1"

# Push to the remote repository
git push origin main

echo "Changes pushed successfully!"