---
layout: default
title: Web3 Skills for Claude Code
---

# Web3 Skills for Claude Code

Comprehensive Web3 data skills for Claude Code supporting both **EVM chains** (Ethereum, Polygon, BSC, etc.) and **Solana** using the [Moralis API](https://admin.moralis.io/register).

## Features

- **Zero Dependencies** - Pure Node.js built-in modules only
- **Dual Blockchain Support** - EVM and Solana with auto-detection
- **9 Modular Skills** - Wallet, Token, NFT, DeFi, Entity, Price, Blockchain, Utils, Premium
- **Plug and Play** - Install and use in under 30 seconds

## Quick Start

### Method 1: Marketplace Installation (Recommended)

The easiest way to install all Web3 skills at once:

**Step 1:** Add the marketplace
```bash
/plugin marketplace add noviulian/web3-skills
```

**Step 2:** Install the plugin
```bash
/plugin install web3-skills
```

**Step 3:** Restart Claude Code, then set your API key
```bash
/web3-api-key <paste your API key here>
```

That's it! All 9 skills are installed and ready to use.

---

### Method 2: Manual Installation (Advanced)

If you prefer to install individual skills or want more control:

#### 1. Get API Key

1. Register at **[admin.moralis.io/register](https://admin.moralis.io/register)** (free, no credit card required)
2. Get your API key at **[admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)**

#### 2. Install Skills

```bash
# Add to Claude Code skills directory
cd ~/.claude/skills
git clone https://github.com/noviulian/web3-skills.git

# Or install individual skills
cp -r web3-skills/skills/web3-wallet-api ~/.claude/skills/
cp -r web3-skills/skills/web3-token-api ~/.claude/skills/
# ... etc for other skills
```

#### 3. Set API Key

```bash
# Set API key for a skill
echo "MORALIS_API_KEY=your_actual_key_here" > ~/.claude/skills/web3-wallet-api/.env

# Or set for all skills
cd ~/.claude/skills/web3-skills/skills
for dir in web3-*; do
  echo "MORALIS_API_KEY=your_actual_key_here" > "$dir/.env"
done
```

---

### Use

Simply ask Claude about Web3 data:

```
"What tokens does 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 hold?"
"Get the price of ETH"
"What NFTs does this wallet own?"
```

## Skills

| Skill | EVM | Solana | Description |
|-------|-----|--------|-------------|
| **web3-wallet-api** | ✅ | ✅ | Balances, tokens, NFTs, history, DeFi positions |
| **web3-token-api** | ✅ | ✅ | Prices, metadata, swaps, pairs, Pump.fun |
| **web3-nft-api** | ✅ | ✅ | Metadata, traits, transfers, trades |
| **web3-price-api** | ✅ | ✅ | Token/NFT prices, OHLCV data |
| **web3-defi-api** | ✅ | ❌ | Protocol positions (EVM only) |
| **web3-entity-api** | ✅ | ❌ | Labeled addresses (EVM only) |
| **web3-blockchain-api** | ✅ | ❌ | Blocks and transactions (EVM only) |
| **web3-utils** | ✅ | ❌ | API utilities (EVM only) |
| **web3-premium** | ✅ | ✅ | Advanced analytics |

## Supported Chains

**EVM:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, and more

**Solana:** mainnet, devnet

## Documentation

- [Installation Guide](installation)
- [Usage Examples](examples)
- [API Reference](api-reference)
- [Contributing](contributing)

## Requirements

- Node.js (built-in modules only, no npm install needed)
- Moralis API key

## License

MIT License - see [LICENSE](https://github.com/noviulian/web3-skills/blob/main/LICENSE) for details.
