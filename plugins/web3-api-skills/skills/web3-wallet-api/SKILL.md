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

## When to Use This Skill

Use this skill when the user asks about:

**Wallet Basics:**

- "What's the balance?", "How much ETH?", "What's the wallet balance?"
- "What tokens does this wallet hold?", "Show me the tokens"
- "What NFTs does this wallet own?", "NFT collection"

**Transaction History:**

- "Show transaction history", "Transaction list", "Recent activity"
- "Complete history", "All activity", "Everything this wallet has done"
- "Token transfers", "Tokens sent/received"
- "NFT transfers", "When were NFTs transferred"

**DeFi & Advanced:**

- "DeFi positions", "Liquidity positions", "Staking", "Yield farming"
- "Net worth", "Total portfolio value", "What's it worth across all chains?"
- "Token swaps", "DEX trades", "Swap history"
- "Token approvals", "What contracts are approved?"

**Wallet Analysis:**

- "Wallet stats", "Activity statistics"
- "Profitability", "PnL", "Gains and losses"
- "Active chains", "Which networks have activity"

**⚠️ NOT for:**

- Individual token prices → Use `web3-price-api` or `web3-token-api`
- Token metadata/contract info → Use `web3-token-api`
- NFT metadata/collections → Use `web3-nft-api`
- Blockchain blocks/transactions → Use `web3-blockchain-api`

## Common Pitfalls

### ❌ Wrong: `/wallets/:address/balance`

### ✅ Correct: `/:address/balance`

Native balance uses `/:address/balance`, NOT `/wallets/:address/balance`. Most other wallet endpoints use the `/wallets/:address/*` pattern, but native balance is different.

**Quick Reference:**

- Native balance (ETH/BNB/MATIC): `/:address/balance`
- Tokens with prices: `/wallets/:address/tokens`
- NFTs: `/:address/nft`
- DeFi: `/wallets/:address/defi/*`
- Wallet history (all activity): `/wallets/:address/history`

---

## Important: Path Resolution

This skill can be installed in different locations. Always use `$SKILL_DIR` to reference the skill directory:

**Installation paths:**

- Plugin: `~/.claude/plugins/marketplaces/moralis-skills/skills/web3-wallet-api`
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

### Get Wallet Balance (Token-Efficient)

**EVM (auto-detected, defaults to Ethereum):**

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(r => console.log('Balance:', (r.balance/1e18).toFixed(4), 'ETH'))
  .catch(console.error);
"
```

**Solana (auto-detected):**

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/:network/:address/balance', { address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb' })
  .then(r => console.log('Balance:', r.balance, 'SOL'))
  .catch(console.error);
"
```

**With specific chain:**

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain: 'polygon' })
  .then(r => console.log('Balance:', (r.balance/1e18).toFixed(4), 'MATIC'))
  .catch(console.error);
"
```

### Get Token Balances

**EVM:**

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/wallets/:address/tokens', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(r => console.log('Tokens:', r.result.length))
  .catch(console.error);
"
```

**Solana (SPL tokens):**

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/:network/:address/tokens', { address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb' })
  .then(r => console.log('Tokens:', r.result.length))
  .catch(console.error);
"
```

### Get Full Wallet History

**All activity (ERC20 + NFT + internal + native):**

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/wallets/:address/history', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { limit: 100 }
})
  .then(r => console.log('History items:', r.result.length))
  .catch(console.error);
"
```

**Pagination with cursor:**

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/wallets/:address/history', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { limit: 100, cursor: null }
})
  .then(r => console.log('Page 1:', r.result.length, 'Cursor:', r.cursor))
  .catch(console.error);
"
```

**Use this instead of individual ERC20/NFT transfer endpoints when you need the full activity feed.**

### Get Full Portfolio (Solana only)

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/:network/:address/portfolio', { address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb' })
  .then(console.log)
  .catch(console.error);
"
```

### Get NFTs

**EVM:**

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/:address/nft', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { format: 'decimal' }
})
  .then(r => console.log('NFTs:', r.result.length))
  .catch(console.error);
"
```

**Solana:**

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/:network/:address/nft', { address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb' })
  .then(r => console.log('NFTs:', r.result.length))
  .catch(console.error);
"
```

### Get Token Swaps by Wallet

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');
q('/wallets/:address/swaps', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { limit: 10 }
})
  .then(r => console.log('Swaps:', r.result.length))
  .catch(console.error);
"
```

## New Features

### Date/Time to Block Conversion

Convert dates to block numbers automatically when querying:

**Supported date formats:**

- ISO dates: `'2024-01-01'` or `'2024-01-01T00:00:00Z'`
- Relative time: `'2 hours ago'`, `'1 day ago'`, `'1 week ago'`

**Usage:**

```bash
cd $SKILL_DIR
node -e "const { q, dateToBlock } = require('./query');

// Get block for a specific date
dateToBlock('2024-01-01')
  .then(block => console.log('Block on 2024-01-01:', block))
  .catch(console.error);

// Get block for relative time
dateToBlock('2 hours ago')
  .then(block => console.log('Block 2 hours ago:', block))
  .catch(console.error);
"
```

### Hex Chain IDs

Chain names are automatically converted to hex IDs to save tokens:

| Chain          | Hex ID   |
| -------------- | -------- |
| Ethereum (eth) | `0x1`    |
| Polygon        | `0x89`   |
| BSC            | `0x38`   |
| Arbitrum       | `0xa4b1` |
| Optimism       | `0xa`    |
| Base           | `0x2105` |
| Avalanche      | `0xa86a` |

**Use chain names, hex IDs are automatic:**

```bash
q('/:address/balance', { address: '0x...', chain: 'polygon' })  // Uses 0x89
```

## Pagination

Many endpoints return paginated results. Use `cursor` and `limit` parameters:

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');

// First page
q('/:address/nft', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { limit: 100, format: 'decimal' }
})
  .then(r => {
    console.log('Page 1:', r.result.length, 'NFTs');
    console.log('Cursor:', r.cursor);
    return r;
  })
  .catch(console.error);
"
```

### Automatic Pagination Loop

```bash
cd $SKILL_DIR
node -e "const { q } = require('./query');

(async () => {
  let allNFTs = [];
  let cursor = null;

  do {
    const r = await q('/:address/nft', {
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      params: { limit: 100, cursor, format: 'decimal' }
    });
    allNFTs.push(...r.result);
    cursor = r.cursor;
  } while (cursor);

  console.log('Total NFTs:', allNFTs.length);
})().catch(console.error);
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
