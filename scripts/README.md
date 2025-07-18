# Git and Deployment Scripts

This directory contains scripts to help with Git operations and deployment.

## Available Scripts

### Git Push

Push your changes to the remote repository:

```bash
pnpm push "Your commit message"
# or
./scripts/git-push.sh "Your commit message"
```

### Git Pull

Pull the latest changes from the remote repository:

```bash
pnpm pull
# or
./scripts/git-pull.sh
```

### Deploy

Build and deploy the application to GitHub Pages:

```bash
pnpm deploy
# or
./scripts/deploy.sh
```

## SSH and GPG Keys

The SSH and GPG keys for this project are stored in the `/workspaces/MEP/keys/` directory:

- SSH key: `/workspaces/MEP/keys/ssh_key.pub`
- GPG key: `/workspaces/MEP/keys/gpg_key.pub`
- Deploy key: `/workspaces/MEP/keys/deploy_key.pub`

Make sure these keys are properly set up in your GitHub repository settings.