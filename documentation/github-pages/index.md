---
layout: default
title: Moralis API Skills for Claude Code
---

# Moralis API Skills for Claude Code

Comprehensive skills collection for Claude Code with Moralis API integration:

- **Moralis Data API** - 135 endpoints for EVM & Solana blockchain data
- **Moralis Streams API** - 20 endpoints for real-time event monitoring
- **Moralis General Knowledge** - Routing, FAQ, pricing, and capability guidance

## Features

- **Zero Dependencies** - Pure Node.js built-in modules only
- **Dual Blockchain Support** - EVM and Solana with auto-detection
- **155 REST Endpoints** - 135 Data API + 20 Streams API
- **Real-time Event Streaming** - Webhook-based monitoring
- **Session-Based API Key Storage** - API keys stored in memory only, never written to disk
- **Skills-Based Architecture** - Install via `npx skills add`

## Quick Start

### Install the skills

```bash
npx skills add novnski/moralis-api-skills
```

### Set your API key (optional)

Add your key to a `.env` file in your project root — the skill will offer to create it for you, or do it manually:

```bash
echo "MORALIS_API_KEY=your_key_here" >> .env
```

Without the key, the skill can't call the Moralis API on your behalf.

---

### Manual Installation (Advanced)

If you prefer to install individual skills or want more control:

#### 1. Get API Key

1. Register at **[admin.moralis.com/register](https://admin.moralis.com/register)** (free, no credit card required)
2. Get your API key at **[admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)**

#### 2. Install Skills

```bash
# Add to Claude Code skills directory
cd ~/.claude/skills
git clone https://github.com/novnski/moralis-api-skills.git moralis-api-skills-temp

# Install individual skills
cp -r moralis-api-skills-temp/skills/moralis-data-api ~/.claude/skills/
cp -r moralis-api-skills-temp/skills/moralis-streams-api ~/.claude/skills/
cp -r moralis-api-skills-temp/skills/moralis-general-knowledge ~/.claude/skills/

# Clean up
rm -rf moralis-api-skills-temp
```

#### 3. Set API Key

Add your key to the `.env` file (the skill will offer to create it, or do it manually):

```bash
echo "MORALIS_API_KEY=your_key_here" >> .env
```

---

### Use

Simply ask Claude about Web3 data:

- "What tokens does 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 hold?"
- "Get the price of ETH"
- "What NFTs does this wallet own?"

**Default Chain:** For EVM addresses without a specified chain, the data API defaults to Ethereum (`0x1`). Specify a different chain if needed:

- "Get the balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Polygon"
- "Show tokens for this wallet on Base and Arbitrum"

Or manage Streams:

- "Create a stream to monitor all ERC20 transfers on Ethereum"
- "Pause the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890"

Or ask general questions:

- "What is Moralis?"
- "Which Moralis API should I use for tracking wallet activity?"
- "What chains does Moralis support?"

## Skills Overview

| Skill | Endpoints | EVM | Solana | Description |
| --- | --- | --- | --- | --- |
| **moralis-data-api** | 135 | ✅ | ✅ | Wallets, tokens, NFTs, DeFi, price, discovery |
| **moralis-streams-api** | 20 | ✅ | ❌ | Real-time event streaming |
| **moralis-general-knowledge** | — | — | — | Routing, FAQ, pricing, capabilities |

## Supported Chains

**EVM (40+ chains):** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, base, sei, monad, and more

**Solana:** mainnet, devnet

## Documentation

- [Installation Guide](/moralis-api-skills/installation)
- [Usage Examples](/moralis-api-skills/examples)
- [API Reference](/moralis-api-skills/api-reference)
- [Contributing](/moralis-api-skills/contributing)

## Requirements

- Node.js (built-in modules only, no npm install needed)
- Moralis API key

## License

MIT License - see [LICENSE](https://github.com/novnski/moralis-api-skills/blob/main/LICENSE) for details.
