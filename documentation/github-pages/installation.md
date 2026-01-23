---
layout: default
title: Installation Guide
---

# Installation Guide

Follow these steps to install Moralis API Skills for Claude Code.

## Prerequisites

- **Node.js** installed (for running queries)
- **Moralis API key:**
  1. Register at [admin.moralis.io/register](https://admin.moralis.io/register) (free, no credit card required)
  2. Get your API key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

## Installation Methods

### Method 1: Marketplace Installation (Recommended)

The easiest way to install both plugins at once:

**Step 1:** Add the marketplace
```bash
/plugin marketplace add noviulian/moralis-skills
```

**Step 2:** Install the plugins
```bash
/plugin install web3-api-skills@moralis-skills
```

```bash
/plugin install streams-api-skills@moralis-skills
```

**Step 3:** Restart Claude Code, then set your API key
```bash
/web3-api-key <paste your API key here>
```

**That's it!** Both plugins are installed and ready to use.

---

## Path Notes

Claude Code includes the plugin version in cache paths, so cache directories change on every update. The marketplace folder name also follows the marketplace name (not the repo name). Avoid hard-coded version paths and prefer:

- `~/.claude/plugins/marketplaces/moralis-skills/` for the installed marketplace
- `~/.claude/plugins/cache/moralis-skills/web3-api-skills/*/` for cache versions
- `~/.claude/plugins/cache/moralis-skills/streams-api-skills/*/` for cache versions
- `.env` discovery from the skill directory (supported by the query clients)

---

### Method 2: Install All Skills Manually

```bash
# Clone to Claude skills directory
cd ~/.claude/skills
git clone https://github.com/noviulian/moralis-skills.git

# The skills are now in ~/.claude/skills/moralis-skills/plugins/web3-api-skills/skills/
# Streams skill is in ~/.claude/skills/moralis-skills/plugins/streams-api-skills/skills/
```

Then set your API key (see below).

---

### Method 3: Install Individual Skills

```bash
# Create skills directory if it doesn't exist
mkdir -p ~/.claude/skills

# Copy specific skills
git clone https://github.com/noviulian/moralis-skills.git /tmp/moralis-skills
cp -r /tmp/moralis-skills/plugins/web3-api-skills/skills/web3-wallet-api ~/.claude/skills/
cp -r /tmp/moralis-skills/plugins/web3-api-skills/skills/web3-token-api ~/.claude/skills/
# ... add more skills as needed

# Streams skill
cp -r /tmp/moralis-skills/plugins/streams-api-skills/skills/streams-api ~/.claude/skills/
```

Then set your API key for each skill (see below).

---

### Method 4: Manual Installation

1. Download the skill directory you want
2. Copy it to `~/.claude/skills/`
3. Ensure the directory contains `SKILL.md` and `query.js`
4. Set your API key (see below)

## Setting Your API Key

### For Marketplace Installation

If you used the marketplace installation method, simply run:

```bash
/web3-api-key <paste your API key here>
```

For example:
```bash
/web3-api-key eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

This will configure your Moralis API key for all skills in both plugins automatically.

---

### For Manual Installation

#### For Individual Skills

```bash
# Replace YOUR_API_KEY from https://admin.moralis.io/register
echo "MORALIS_API_KEY=YOUR_API_KEY" > ~/.claude/skills/web3-wallet-api/.env
echo "MORALIS_API_KEY=YOUR_API_KEY" > ~/.claude/skills/streams-api/.env
```

### For All Skills at Once

```bash
# Set API key for all Web3 skills
API_KEY="YOUR_API_KEY"
cd ~/.claude/skills/moralis-skills/plugins/web3-api-skills/skills
for dir in web3-*; do
  echo "MORALIS_API_KEY=$API_KEY" > "$dir/.env"
done

# Set API key for Streams skill
echo "MORALIS_API_KEY=$API_KEY" > ~/.claude/skills/moralis-skills/plugins/streams-api-skills/skills/streams-api/.env
echo "✅ API key set for all skills"
```

## Verification

Test that a skill is working:

```bash
cd ~/.claude/skills/web3-wallet-api
node -e "const { query } = require('./query'); query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }).then(console.log).catch(console.error)"
```

Expected response:
```json
{
  "balance": "1000000000000000000"
}
```

Optional Streams check:
```bash
cd ~/.claude/skills/streams-api
node -e "const { query } = require('./query'); query('/streams/evm', { params: { limit: 1 } }).then(console.log).catch(console.error)"
```

## Supported Environments

| Environment | Skills Directory |
|-------------|-----------------|
| Claude Code (Desktop) | `~/.claude/skills/` |
| Claude Code (CLI) | `~/.claude/skills/` |
| Project-specific | `<project>/.claude/skills/` |

## Troubleshooting

### "API key not found" error

The `.env` file is missing. Create it:

```bash
echo "MORALIS_API_KEY=YOUR_KEY" > ~/.claude/skills/SKILL_NAME/.env
```

**To get your key:**
1. Register at [admin.moralis.io/register](https://admin.moralis.io/register) (free)
2. Get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

### "SKILL.md not found" error

Make sure you copied the entire skill directory, including the `SKILL.md` file.

### Query returns errors

1. Verify your API key is valid at [admin.moralis.io](https://admin.moralis.io/register)
2. Check the address format is correct
3. Ensure you have network access

## Uninstallation

```bash
# Remove individual skill
rm -rf ~/.claude/skills/web3-wallet-api

# Remove all Web3 skills
rm -rf ~/.claude/skills/moralis-skills
```

## Next Steps

- See [Usage Examples]({{ "/examples" | relative_url }}) for common queries
- Check [API Reference]({{ "/api-reference" | relative_url }}) for endpoint details
