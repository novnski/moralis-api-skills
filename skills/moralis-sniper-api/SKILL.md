---
name: moralis-sniper-api
description: Query DEX pair analytics, sniping detection, and early buyer identification for EVM chains. Use when user asks about token snipers, early buyers, DEX pair analytics, or sniping activity.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
  version: "1.0.0"
  author: web3-skills
  tags: [web3, blockchain, dex, sniper, trading, analytics, evm]
---

# Web3 Sniper API

Query DEX pair analytics, sniping detection, and early buyer identification for EVM chains.

## When to Use This Skill

Use this skill when the user asks about:

**Sniper Detection:**
- "Token snipers", "Early buyers", "Who bought first?"
- "Sniping activity", "Front-running detection", "Early adopters"
- "First buyers", "Initial token buyers"

**DEX Pair Analytics:**
- "DEX pair stats", "Pair analytics", "Liquidity pool data"
- "Pair volume", "Pair performance", "Trading pair info"
- "Token snipers by pair", "Early buyers by pair"

**Trading Analysis:**
- "Who sniped this token?", "Early positions", "First transactions"
- "Sniper list", "Early buyer list", "Initial buyers"

**⚠️ NOT for:**
- General token prices → Use `moralis-price-api` or `moralis-token-api`
- Token swaps/trades → Use `moralis-token-api`
- Real-time monitoring → Use `moralis-streams-api`

## Common Pitfalls

### Confusion: Sniper Detection vs Price Data
- **Sniper detection:** Use this skill to identify early buyers and sniping activity
- **Price data:** Use `moralis-price-api` or `moralis-token-api` for token prices

### Confusion: Sniper Window
- **Default window:** 3 blocks after pair creation (very early buyers)
- **Wider window:** Increase `blocksAfterCreation` to catch later snipers (up to 1000 blocks)
- **Not all early activity:** Some early buyers may be legitimate, not all are snipers

### Confusion: Pair Address vs Token Address
- **DEX pair address:** Required for sniper queries (e.g., Uniswap pair address)
- **Token address:** Use `moralis-token-api` for token-specific data

## Setup

```bash
/moralis-api-key
```

## Common Queries

### Get Token Snipers by Pair

**Endpoint:** `GET /pairs/:address/snipers`
**Function Name:** `getSnipersByPairAddress`
**Description:** Identify sniper wallets that bought a token within a specified timeframe (blocksAfterCreation). Each wallet includes detailed buy/sell amounts, PnL stats, and transaction details.

**Query snipers:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

query('/pairs/:address/snipers', {
  address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4', // DEX pair address
  params: { limit: 10 }
})
  .then(data => console.log('Snipers:', data.result))
  .catch(console.error);
"
```

**Response includes:**
- Buyer addresses
- Transaction hashes
- Block numbers
- Timestamps
- Token amounts
- Profit/loss data

**Blocks after creation parameter:**
- Default: `3` (snipers within 3 blocks of pair creation)
- Range: `0-1000` blocks
- Adjust to widen/narrow the sniper detection window

**Example with custom window:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

// Get snipers within 10 blocks after pair creation
query('/pairs/:address/snipers', {
  address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
  params: { blocksAfterCreation: 10, limit: 20 }
})
  .then(data => console.log('Snipers:', data.result))
  .catch(console.error);
"
```

## Sniper Analysis

**Identifying sniper behavior:**

1. **Early purchases:** Buyers in first few blocks
2. **Quick flips:** Buy and sell within short timeframe
3. **Large profits:** High ROI on initial investment
4. **Multiple attempts:** Several small test transactions

**Warning signs:**
- Concentrated early ownership
- Rapid selling after launch
- Coordinated buying patterns

## DEX Pairs

**Common DEX platforms:**
- Uniswap (Ethereum, Arbitrum, Base, etc.)
- PancakeSwap (BSC, Polygon)
- SushiSwap (multi-chain)
- Raydium (Solana - use Solana API)

**Finding pair addresses:**
Use `web3-token-api` to find DEX pairs for a token:

```bash
# In web3-token-api skill directory
query('/erc20/:address/pairs', {
  address: '0x...',
  params: { chain: 'eth', limit: 5 }
})
```

## Pagination

Sniper endpoints support pagination:

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

// First page
query('/pairs/:address/snipers', {
  address: '0x...',
  params: { limit: 100, cursor: null }
})
  .then(data => {
    console.log('Page 1:', data.result.length);
    console.log('Cursor:', data.cursor);
    return data;
  })
  .catch(console.error);
"
```

## Risk Assessment

**High-risk indicators:**
- Single wallet owns majority of supply
- Rapid token dumping after launch
- Developers hold large portions
- Low liquidity after graduation

**Defensive measures:**
- Check snipers before buying
- Look for fair token distribution
- Verify liquidity depth
- Check holder concentration

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
- [Web3 Token API](../web3-token-api/SKILL.md) - For DEX pairs and swaps
