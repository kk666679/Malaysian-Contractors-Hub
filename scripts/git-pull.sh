#!/bin/bash

# Script to pull changes from the remote repository

# Fetch all changes
git fetch --all

# Pull changes from the main branch
git pull origin main

echo "Latest changes pulled successfully!"