# GPG Setup Guide

## Generating a GPG Key

1. Install GPG if not already installed:
   ```bash
   # For Ubuntu/Debian
   sudo apt-get install gnupg
   
   # For macOS
   brew install gnupg
   ```

2. Generate a new GPG key:
   ```bash
   gpg --full-generate-key
   ```

3. Follow the prompts:
   - Select key type: RSA and RSA (default)
   - Key size: 4096 bits
   - Key validity: 0 (key does not expire)
   - Enter your name and email address
   - Set a secure passphrase

## Adding GPG Key to GitHub

1. List your GPG keys to get the key ID:
   ```bash
   gpg --list-secret-keys --keyid-format=long
   ```

2. Export your public key:
   ```bash
   gpg --armor --export YOUR_KEY_ID | pbcopy
   ```
   (For Linux, use `gpg --armor --export YOUR_KEY_ID | xclip -selection clipboard`)

3. Go to GitHub → Settings → SSH and GPG keys → New GPG key

4. Paste your key and save.

## Configuring Git to Use GPG

1. Configure Git to use your GPG key:
   ```bash
   git config --global user.signingkey YOUR_KEY_ID
   ```

2. Enable automatic signing of commits:
   ```bash
   git config --global commit.gpgsign true
   ```

3. If you're using GPG with a GUI application, you might need to configure the GPG program:
   ```bash
   git config --global gpg.program $(which gpg)
   ```

## Testing Signed Commits

Make a commit to test your setup:

```bash
git commit -m "Test signed commit"
```

You should be prompted for your GPG passphrase.