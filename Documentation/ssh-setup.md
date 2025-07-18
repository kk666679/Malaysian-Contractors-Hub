# SSH Setup Guide

## Generating SSH Keys

1. Open your terminal and run:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. When prompted, press Enter to accept the default file location or specify a custom path.

3. Enter a secure passphrase when prompted (recommended).

4. Start the SSH agent:
   ```bash
   eval "$(ssh-agent -s)"
   ```

5. Add your SSH key to the agent:
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```

## Adding SSH Key to GitHub

1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub | pbcopy
   ```
   (For Linux, use `xclip -selection clipboard < ~/.ssh/id_ed25519.pub`)

2. Go to GitHub → Settings → SSH and GPG keys → New SSH key

3. Paste your key and give it a descriptive title.

## Testing Your SSH Connection

```bash
ssh -T git@github.com
```

You should see a message confirming successful authentication.

## Updating Repository Remote URL

If you've been using HTTPS, update to SSH:

```bash
git remote set-url origin git@github.com:your-username/malaysian-contractors-app.git
```