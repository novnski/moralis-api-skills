---
name: web3-wallet-api
description: Query wallet data including balances, transactions, NFTs, DeFi positions, net worth, and history for both EVM chains (ETH, Polygon, BSC, etc.) and Solana. Use when user asks about wallet balances, transaction history, token holdings, or Web3 wallet analysis.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
  version: "1.0.0"
  author: web3-skills
  tags: [web3, blockchain, wallet, crypto, defi, evm, solana]
---

# Web3 Wallet API

Query wallet data for both EVM chains and Solana with automatic blockchain detection.

## Important: Path Resolution

This skill can be installed in different locations. Always use `$SKILL_DIR` to reference the skill directory:

**Installation paths:**
- Plugin: `~/.claude/plugins/marketplaces/web3-skills/skills/web3-wallet-api`
- Global: `~/.claude/skills/web3-wallet-api`
- Project: `<project>/.claude/skills/web3-wallet-api`

## Setup

First time setup (one time):

```bash
/web3-api-key
```

## How It Works

The skill automatically detects the blockchain:
- **EVM addresses** start with `0x` and are 42 characters
- **Solana addresses** are base58 encoded (32-44 characters, no `0x` prefix)

## Common Queries

### Get Wallet Balance

**EVM (auto-detected):**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(console.log)
  .catch(console.error);
"
```

**Solana (auto-detected):**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:network/:address/balance', { address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb', network: 'mainnet' })
  .then(console.log)
  .catch(console.error);
"
```

**With specific chain:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain: 'polygon' })
  .then(console.log)
  .catch(console.error);
"
```

### Get Token Balances

**EVM:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/tokens', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(console.log)
  .catch(console.error);
"
```

**Solana (SPL tokens):**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:network/:address/tokens', { address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb' })
  .then(console.log)
  .catch(console.error);
"
```

### Get Full Portfolio (Solana only)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:network/:address/portfolio', { address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb' })
  .then(console.log)
  .catch(console.error);
"
```

### Get NFTs

**EVM:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:address/nft', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { format: 'decimal' }
})
  .then(console.log)
  .catch(console.error);
"
```

**Solana:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:network/:address/nft', { address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb' })
  .then(console.log)
  .catch(console.error);
"
```

### Get Token Swaps by Wallet

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/swaps', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { limit: 10 }
})
  .then(console.log)
  .catch(console.error);
"
```

## Pagination

Many endpoints return paginated results. Use `cursor` and `limit` parameters:

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

// First page
query('/:address/nft', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { limit: 100, format: 'decimal' }
})
  .then(data => {
    console.log('Page 1:', data.result.length, 'NFTs');
    console.log('Total:', data.total);
    console.log('Cursor for next page:', data.cursor);

    // Fetch next page using cursor
    if (data.cursor) {
      return query('/:address/nft', {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        params: { limit: 100, cursor: data.cursor, format: 'decimal' }
      });
    }
  })
  .then(data => {
    if (data) console.log('Page 2:', data.result.length, 'NFTs');
  })
  .catch(console.error);
"
```

### Automatic Pagination Loop

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

async function getAllNFTs() {
  let allNFTs = [];
  let cursor = null;

  do {
    const result = await query('/:address/nft', {
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      params: { limit: 100, cursor, format: 'decimal' }
    });
    allNFTs.push(...result.result);
    cursor = result.cursor;
  } while (cursor);

  console.log('Total NFTs collected:', allNFTs.length);
  return allNFTs;
}

getAllNFTs().catch(console.error);
"
```

## Response Format

All responses return JSON:

```json
{
  "balance": "1000000000000000000",
  "balance_formatted": "1.0 ETH"
}
```

## Error Handling

Common errors and solutions:

**"API key not found"**
- Run `/web3-api-key` to set up your API key

**"API Error 401"**
- Invalid API key, check your key at https://admin.moralis.io

**"API Error 400"**
- Invalid address format or parameters

## Troubleshooting

**Check if skill is working:**
```bash
cd $SKILL_DIR
cat .env  # Should show MORALIS_API_KEY=your_key
node -e "console.log('Node.js works:', require('./query'))"
```

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
- [Solana Endpoints Reference](references/SOLANA_ENDPOINTPOINTS.md)
- [Usage Examples](references/EXAMPLES.md)
