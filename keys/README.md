# MEP Project Keys

This directory contains the public keys for the project:

- `ssh_key.pub`: SSH key for authentication with Git repositories
- `gpg_key.pub`: GPG key for signing commits
- `deploy_key.pub`: Deployment key for CI/CD pipelines

## How to Use

### SSH Key

Add this SSH key to your GitHub/GitLab account:

1. Go to Settings > SSH and GPG keys > New SSH key
2. Paste the contents of `ssh_key.pub`
3. Give it a descriptive name like "MEP Project"

### GPG Key

Add this GPG key to your GitHub/GitLab account:

1. Go to Settings > SSH and GPG keys > New GPG key
2. Paste the contents of `gpg_key.pub`
3. Give it a descriptive name

### Deploy Key

Add this deployment key to your repository:

1. Go to your repository settings > Deploy keys > Add deploy key
2. Paste the contents of `deploy_key.pub`
3. Give it a name like "MEP CI/CD"
4. Check "Allow write access" if needed for deployments

## Security Note

The private keys are not stored in this repository for security reasons. They should be:

- Stored securely in a password manager
- Added as secrets in your CI/CD platform
- Never committed to version control