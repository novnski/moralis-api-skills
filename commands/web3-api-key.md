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
# Set API key for all skills at once
API_KEY="paste_your_actual_key_here"
cd ~/.claude/plugins/marketplaces/web3-skills/skills
for dir in web3-*; do
  echo "MORALIS_API_KEY=$API_KEY" > "$dir/.env"
done
echo "✅ API key set for all 9 skills"
```

### Method 2: Set Individual Skills

```bash
# For each skill you want to use
echo "MORALIS_API_KEY=paste_your_actual_key_here" > ~/.claude/plugins/marketplaces/web3-skills/skills/web3-wallet-api/.env
echo "MORALIS_API_KEY=paste_your_actual_key_here" > ~/.claude/plugins/marketplaces/web3-skills/skills/web3-token-api/.env
echo "MORALIS_API_KEY=paste_your_actual_key_here" > ~/.claude/plugins/marketplaces/web3-skills/skills/web3-nft-api/.env
# ... repeat for other skills
```

## Get Your API Key

1. **Register:** [admin.moralis.io/register](https://admin.moralis.io/register) (free, no credit card required)
2. **Get API Key:** [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

**Note:** A single Moralis API key provides access to both EVM and Solana APIs.

## Verify It's Working

```bash
# Test wallet balance query
cd ~/.claude/plugins/marketplaces/web3-skills/skills/web3-wallet-api
node query.js /0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance
```

Expected response:
```json
{
  "balance": "1000000000000000000",
  "balance_formatted": "1.0 ETH"
}
```

## Troubleshooting

**"API key not found" error:**
- Make sure `.env` file exists in the skill directory
- Check the file path is correct

**"Invalid .env file" error:**
- Ensure the file format is exactly: `MORALIS_API_KEY=your_key_here`
- No extra spaces or quotes around the key

**API authentication error:**
- Verify you registered at [admin.moralis.io/register](https://admin.moralis.io/register)
- Check your API key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)
