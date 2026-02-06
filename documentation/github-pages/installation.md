---
layout: default
title: Installation Guide
---

# Installation Guide

Follow these steps to install Moralis API Skills for Claude Code.

## Prerequisites

- **Node.js** installed (for running queries)
- **Moralis API key:**
    1. Register at [admin.moralis.com/register](https://admin.moralis.com/register) (free, no credit card required)
    2. Get your API key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

## Installation

### Quick Install (Recommended)

The easiest way to install all Moralis API skills:

```bash
npx skills add novnski/moralis-api-skills
```

This installs all three skills:
- **moralis-data-api** - 135 endpoints for querying blockchain data
- **moralis-streams-api** - 20 endpoints for real-time event streaming
- **moralis-general-knowledge** - Routing, FAQ, pricing, and capability guidance

### Set Your API Key (optional)

Add your key to a `.env` file — the skill will offer to create it for you, or do it manually:

```bash
echo "MORALIS_API_KEY=your_key_here" >> .env
```

Without the key, the skill can't call the Moralis API on your behalf.

**That's it!** All skills are installed and ready to use.

---

## Installation Paths

Skills can be installed in different locations depending on your setup:

| Environment      | Skills Directory            |
| ---------------- | --------------------------- |
| Global (default) | `~/.claude/skills/`         |
| Project-specific | `<project>/.claude/skills/` |

Store `.env` in the parent of the skills directory so all skills can read it.

---

## Manual Installation (Advanced)

If you prefer manual installation or want to install individual skills:

```bash
# Clone to Claude skills directory
cd ~/.claude/skills
git clone https://github.com/novnski/moralis-api-skills.git moralis-api-skills-temp

# Copy individual skills you need
cp -r moralis-api-skills-temp/skills/moralis-data-api ~/.claude/skills/
cp -r moralis-api-skills-temp/skills/moralis-streams-api ~/.claude/skills/
cp -r moralis-api-skills-temp/skills/moralis-general-knowledge ~/.claude/skills/

# Clean up
rm -rf moralis-api-skills-temp
```

Then add your API key to the `.env` file (see below).

---

### Manual Installation: Individual Skills

1. Download the skill directory you want from [GitHub](https://github.com/novnski/moralis-api-skills)
2. Copy it to `~/.claude/skills/` or `<project>/.claude/skills/`
3. Ensure the directory contains `SKILL.md`
4. Add your API key to the `.env` file (see below)

---

## Setting Your API Key (Manual Installation)

Add your key to the `.env` file. The skill will offer to create the file for you, or you can do it manually:

```bash
# Create .env in your project root
echo "MORALIS_API_KEY=your_moralis_api_key" > /path/to/project/.env

# Important: Add .env to .gitignore to prevent committing your key
echo ".env" >> /path/to/project/.gitignore
```

## Verification

Test that a skill is working:

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

**Note:** For EVM addresses, if you don't specify a chain, the API defaults to Ethereum (`0x1`).

Expected response:

```json
{
    "balance": "1000000000000000000"
}
```

Optional Streams check:

```bash
curl "https://api.moralis-streams.com/streams/evm?limit=1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Supported Environments

| Environment           | Skills Directory            |
| --------------------- | --------------------------- |
| Claude Code (Desktop) | `~/.claude/skills/`         |
| Claude Code (CLI)     | `~/.claude/skills/`         |
| Project-specific      | `<project>/.claude/skills/` |

## Troubleshooting

### "API key not found" error

The `.env` file is missing. Create it:

```bash
echo "MORALIS_API_KEY=your_moralis_api_key" > ~/.claude/skills/SKILL_NAME/.env
```

**To get your key:**

1. Register at [admin.moralis.com/register](https://admin.moralis.com/register) (free)
2. Get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

### "SKILL.md not found" error

Make sure you copied the entire skill directory, including the `SKILL.md` file.

### Query returns errors

1. Verify your API key is valid at [admin.moralis.com](https://admin.moralis.com/register)
2. Check the address format is correct
3. Ensure you have network access

## Uninstallation

```bash
# Remove individual skill
rm -rf ~/.claude/skills/moralis-data-api

# Remove all Moralis skills
rm -rf ~/.claude/skills/moralis-*
```

## Next Steps

- See [Usage Examples](/moralis-api-skills/examples) for common queries
- Check [API Reference](/moralis-api-skills/api-reference) for endpoint details
