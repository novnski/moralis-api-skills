---
name: web3-api-key
description: Set your Moralis API key for Web3 skills. Usage: /web3-api-key <your_api_key_here>
---

# Web3 API Key Setup

Set your Moralis API key to start using Web3 skills.

## Usage

Simply run:
```
/web3-api-key <paste your API key here>
```

For example:
```
/web3-api-key eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

I'll automatically configure the API key for all 9 Web3 skills at once.

## Quick Setup

### Method 1: Set API Key for All Skills (Recommended)

```bash
# Helper function to update .env file without destroying existing vars
update_env() {
  local env_file="$1"
  local api_key="$2"

  if [ -f "$env_file" ]; then
    # File exists - check if MORALIS_API_KEY is already there
    if grep -q "^MORALIS_API_KEY=" "$env_file" 2>/dev/null; then
      # Replace existing MORALIS_API_KEY line
      local temp_file=$(mktemp)
      grep -v "^MORALIS_API_KEY=" "$env_file" > "$temp_file"
      echo "MORALIS_API_KEY=$api_key" >> "$temp_file"
      mv "$temp_file" "$env_file"
    else
      # Append MORALIS_API_KEY to existing file
      echo "" >> "$env_file"
      echo "MORALIS_API_KEY=$api_key" >> "$env_file"
    fi
  else
    # File doesn't exist - create it
    echo "MORALIS_API_KEY=$api_key" > "$env_file"
  fi
}

# Set API key for all skills at once
API_KEY="paste_your_actual_key_here"

# Set in plugin source directory (for development)
MARKETPLACE_DIR=$(ls -d ~/.claude/plugins/marketplaces/web3-skills* 2>/dev/null | head -1)
if [ -d "$MARKETPLACE_DIR/skills" ]; then
  cd "$MARKETPLACE_DIR/skills"
  for dir in web3-*; do
    update_env "$dir/.env" "$API_KEY"
  done
fi

# Set in cache directory (where installed plugins actually run)
# IMPORTANT: Loop over ALL versions to handle plugin updates
for CACHE_DIR in ~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills; do
  if [ -d "$CACHE_DIR" ]; then
    for dir in "$CACHE_DIR"/web3-*; do
      [ -d "$dir" ] && update_env "$dir/.env" "$API_KEY"
    done
  fi
done

echo "✅ API key set for all 9 Web3 skills"
```

### Method 2: Set Individual Skills

```bash
# Helper function to update .env file without destroying existing vars
update_env() {
  local env_file="$1"
  local api_key="$2"

  if [ -f "$env_file" ]; then
    # File exists - check if MORALIS_API_KEY is already there
    if grep -q "^MORALIS_API_KEY=" "$env_file" 2>/dev/null; then
      # Replace existing MORALIS_API_KEY line
      local temp_file=$(mktemp)
      grep -v "^MORALIS_API_KEY=" "$env_file" > "$temp_file"
      echo "MORALIS_API_KEY=$api_key" >> "$temp_file"
      mv "$temp_file" "$env_file"
    else
      # Append MORALIS_API_KEY to existing file
      echo "" >> "$env_file"
      echo "MORALIS_API_KEY=$api_key" >> "$env_file"
    fi
  else
    # File doesn't exist - create it
    echo "MORALIS_API_KEY=$api_key" > "$env_file"
  fi
}

# For each skill you want to use
MARKETPLACE_DIR=$(ls -d ~/.claude/plugins/marketplaces/web3-skills* 2>/dev/null | head -1)
API_KEY="paste_your_actual_key_here"

# Set in plugin source directory
update_env "$MARKETPLACE_DIR/skills/web3-wallet-api/.env" "$API_KEY"

# Set in ALL cache directory versions
for CACHE_DIR in ~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills; do
  [ -d "$CACHE_DIR" ] && update_env "$CACHE_DIR/web3-wallet-api/.env" "$API_KEY"
done

# Set for remaining skills in plugin source directory
update_env "$MARKETPLACE_DIR/skills/web3-token-api/.env" "$API_KEY"
update_env "$MARKETPLACE_DIR/skills/web3-nft-api/.env" "$API_KEY"
# ... repeat for other skills

# Set for remaining skills in ALL cache directory versions
for CACHE_DIR in ~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills; do
  [ -d "$CACHE_DIR" ] && update_env "$CACHE_DIR/web3-token-api/.env" "$API_KEY"
  [ -d "$CACHE_DIR" ] && update_env "$CACHE_DIR/web3-nft-api/.env" "$API_KEY"
  # ... repeat for other skills
done
```

## Get Your API Key

1. **Register:** [admin.moralis.io/register](https://admin.moralis.io/register) (free, no credit card required)
2. **Get API Key:** [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

**Note:** A single Moralis API key provides access to both EVM and Solana APIs.

## Development/Testing Setup

For local development or testing in the web3-skills project directory, you can create a single `.env` file in the project root:

```bash
# In the web3-skills project directory
echo "MORALIS_API_KEY=your_key_here" > .env
```

The unified query client (`web3-shared/query.js`) automatically searches upward from the skill directory to find the `.env` file, so all skills will share this single API key.

## Verify It's Working

```bash
# Test wallet balance query with the most recent version
CACHE_DIR=$(ls -dt ~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills 2>/dev/null | head -1)
cd "$CACHE_DIR/web3-wallet-api"
node query.js /0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance

# Or test ALL installed versions:
for CACHE_DIR in ~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills; do
  if [ -d "$CACHE_DIR/web3-wallet-api" ]; then
    echo "Testing version: $(basename $(dirname "$CACHE_DIR"))"
    cd "$CACHE_DIR/web3-wallet-api"
    node query.js /0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance
  fi
done
```

Expected response:
```json
{
  "balance": "1000000000000000000",
  "balance_formatted": "1.0 ETH"
}
```

## Troubleshooting

**Safe .env file updates:**
- The setup scripts use a smart `update_env` function that preserves existing environment variables
- If `.env` already exists with `MORALIS_API_KEY`, it updates only that line
- If `.env` exists without `MORALIS_API_KEY`, it appends the key
- If `.env` doesn't exist, it creates a new file
- Your other environment variables are never deleted

**"API key not found" error:**
- The API key must be set in BOTH the plugin source directory AND ALL cache directory versions
- Use Method 1 above to automatically set it in all locations
- After plugin updates, re-run `/web3-api-key` to set the key for the new version
- Verify `.env` files exist in all locations:
  - `~/.claude/plugins/marketplaces/web3-skills/skills/web3-*/.env`
  - `~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills/web3-*/.env`
  - **Note:** The `*` in the path matches ALL versions (e.g., `1.0.0`, `1.0.1`)

**"Invalid .env file" error:**
- Ensure the file format is exactly: `MORALIS_API_KEY=your_key_here`
- No extra spaces or quotes around the key

**API authentication error:**
- Verify you registered at [admin.moralis.io/register](https://admin.moralis.io/register)
- Check your API key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

**Key works in one version but not another:**
- When the plugin auto-updates, a new cache directory is created (e.g., `1.0.0` → `1.0.1`)
- Simply re-run `/web3-api-key <your_key>` to update all versions
- Method 1 automatically handles ALL installed versions