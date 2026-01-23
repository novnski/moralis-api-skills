---
layout: default
title: Moralis API Skills for Claude Code
---

# Moralis API Skills for Claude Code

Multi-plugin marketplace for Claude Code with Moralis API integration:

- **web3-api-skills** - EVM & Solana blockchain data APIs (9 modular skills)
- **streams-api-skills** - Real-time blockchain event monitoring with webhooks

## Features

- **Zero Dependencies** - Pure Node.js built-in modules only
- **Dual Blockchain Support** - EVM and Solana with auto-detection
- **9 Modular Skills** - Wallet, Token, NFT, DeFi, Entity, Price, Blockchain, Utils, Premium
- **Real-time Event Streaming** - Webhook-based monitoring
- **Plug and Play** - Install and use in under 30 seconds

## Quick Start

### Method 1: Marketplace Installation (Recommended)

Install both plugins from the marketplace:

**Step 1:** Add the marketplace
```bash
/plugin marketplace add noviulian/moralis-skills
```

**Step 2:** Install the plugins
```bash
/plugin install web3-api-skills@moralis-api
/plugin install streams-api-skills@moralis-api
```

**Step 3:** Restart Claude Code, then set your API key
```bash
/web3-api-key <paste your API key here>
```

That's it! Both plugins are installed and ready to use.

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
git clone https://github.com/noviulian/moralis-skills.git

# Or install individual skills
cp -r moralis-skills/plugins/web3-api-skills/skills/web3-wallet-api ~/.claude/skills/
cp -r moralis-skills/plugins/web3-api-skills/skills/web3-token-api ~/.claude/skills/
# ... etc for other skills

# Streams skill
cp -r moralis-skills/plugins/streams-api-skills/skills/streams-api ~/.claude/skills/
```

#### 3. Set API Key

```bash
# Set API key for a skill
echo "MORALIS_API_KEY=your_actual_key_here" > ~/.claude/skills/web3-wallet-api/.env
echo "MORALIS_API_KEY=your_actual_key_here" > ~/.claude/skills/streams-api/.env

# Or set for all skills
cd ~/.claude/skills/moralis-skills/plugins/web3-api-skills/skills
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

Or manage Streams:
```
"Create a stream to monitor all ERC20 transfers on Ethereum"
```
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

MIT License - see [LICENSE](https://github.com/noviulian/moralis-skills/blob/main/LICENSE) for details.
