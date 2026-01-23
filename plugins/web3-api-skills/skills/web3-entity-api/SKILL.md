---
name: web3-entity-api
description: Search and query labeled entities including exchanges, funds, protocols, and whales. Get entity categories, search for labeled addresses, and retrieve entity information. Use when user asks about exchange wallets, fund tracking, or labeled addresses.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed). EVM chains only - not supported on Solana.
metadata:
  version: "1.0.0"
  author: web3-skills
  tags: [web3, blockchain, entity, labels, exchange, funds, evm]
---

# Web3 Entity API (EVM Only)

Query labeled entities on EVM chains including exchanges, funds, protocols, and whale wallets.

## When to Use This Skill

Use this skill when the user asks about:

**Entity Search & Discovery:**
- "Search for entities", "Find exchanges", "Look up funds"
- "Entity categories", "What entities exist?", "List entities"
- "Labeled addresses", "Known addresses", "Tagged wallets"

**Exchange Data:**
- "Exchange wallets", "Exchange addresses", "CEX wallets"
- "Binance wallets", "Coinbase wallets", "Kraken addresses"

**Fund & Investor Data:**
- "Fund wallets", "VC wallets", "Investor addresses"
- "a16z wallets", "Paradigm addresses", "Fund tracking"

**Protocol Data:**
- "Protocol wallets", "DAO treasuries", "Protocol addresses"

**Whale Tracking:**
- "Whale wallets", "Large holders", "Whale addresses"

**⚠️ NOT for:**
- Wallet balances/holdings → Use `web3-wallet-api`
- Transaction history → Use `web3-wallet-api` or `web3-blockchain-api`
- Token/NFT prices → Use `web3-price-api`
- Solana entities → Not supported (EVM only)

## Common Pitfalls

### Confusion: Entity Labels vs Wallet Data
- **Entity labels/categories:** Use this skill (`web3-entity-api`) to find labeled addresses
- **Wallet balances/transactions:** Use `web3-wallet-api` for actual wallet data

### Confusion: Entity Search vs Token Search
- **Search entities (exchanges, funds):** Use this skill (`web3-entity-api`) with `/entities/search`
- **Search tokens:** Use `web3-token-api` with `/tokens/search`

### Confusion: Entity Categories vs NFT Collections
- **Entity categories (exchanges, funds):** Use this skill (`web3-entity-api`)
- **NFT collections:** Use `web3-nft-api`

### EVM Only Limitation
- **This skill is EVM only** - No Solana support
- Solana addresses are not labeled in the entity database

## Setup

```bash
/web3-api-key
```

## Common Queries

### Search Entities

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/entities/search', {
  params: { q: 'binance', chain: 'eth' }
})
  .then(data => console.log('Found:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Entity Categories

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/entities/categories')
  .then(data => console.log('Categories:', data.result))
  .catch(console.error);
"
```

### Get Entities by Category

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/entities/categories/:categoryId', { params: { chain: 'eth' }})
  .then(data => console.log('Entities:', data.result))
  .catch(console.error);
"
```

### Get Entity by ID

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/entities/:entityId')
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

## Supported Entity Categories

- **Exchanges:** Binance, Coinbase, Kraken, etc.
- **Funds:** a16z, Paradigm, Three Arrows, etc.
- **DeFi Protocols:** Uniswap, Aave, Compound, etc.
- **Whales:** Large wallet addresses
- **DEX Traders:** Active DEX traders

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
