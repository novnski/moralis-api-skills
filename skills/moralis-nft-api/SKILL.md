---
name: moralis-nft-api
description: Query NFT data including metadata, traits, transfers, trades, floor prices, and rarity for both EVM chains and Solana. Get NFT collections, individual NFT metadata, transfer history, trading data, and analyze NFT portfolios. Use when user asks about NFTs, collections, metadata, or NFT trading.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
  version: "1.2.0"
  author: web3-skills
  tags: [web3, blockchain, nft, metadata, traits, rarity, evm, solana]
  context:
    fork: false
    agent: ""
  allowed-tools:
    - Bash
    - Read
  invocation:
    disable-model-invocation: false
    user-invocable: true
---

# Web3 NFT API

Query NFT data for both EVM chains and Solana including metadata, transfers, trades, traits, and rarity.

**Note:** Solana NFT API is more limited than EVM. For Solana, only metadata and wallet NFTs endpoints are available. There are no dedicated endpoints for transfers, owners, traits, or trades.

## When to Use This Skill

Use this skill when the user asks about:

**NFT Metadata & Info:**
- "NFT metadata", "NFT info", "NFT details"
- "What's this NFT?", "Show me this NFT"
- "Collection info", "NFT collection details"

**NFT Holdings:**
- "What NFTs does this wallet own?", "NFT collection"
- "Wallet NFTs", "NFT portfolio"
- "NFTs by contract", "All NFTs in this collection"

**NFT Transfers & Trading:**
- "NFT transfers", "NFT sent/received", "Transfer history"
- "NFT trades", "Sales history", "Who sold this NFT"
- "NFT owners", "Who owns this NFT", "Holder changes"

**NFT Market Data:**
- "Floor price", "Lowest price", "Current floor"
- "NFT sales prices", "Recent sales", "Sale history"
- "NFT collections", "Top collections", "Trending collections"

**NFT Attributes:**
- "NFT traits", "Attributes", "Rarity"
- "Trait distribution", "How rare is this trait"

**NFT Discovery:**
- "Search NFTs", "Find NFTs", "NFT search"
- "Trending NFTs", "Hot collections"

**⚠️ NOT for:**
- NFT prices (floor/sales) without metadata → Use `web3-price-api`
- Wallet's NFTs with portfolio view → Use `web3-wallet-api`
- Individual NFT transfers to/from wallet → Use `web3-wallet-api` with `/wallets/:address/history`

## Common Pitfalls

### Confusion: NFT Metadata vs Floor Price
- **NFT metadata/traits:** Use this skill (`web3-nft-api`) with `/nft/:address` or `/nft/:address/traits`
- **Floor price only:** Use `web3-price-api` with `/nft/:address/floor-price`

### Confusion: NFT Transfers by Contract vs by Wallet
- **All transfers for a collection:** Use this skill (`web3-nft-api`) with `/nft/:address/transfers`
- **NFT transfers to/from a wallet:** Use `web3-wallet-api` with `/wallets/:address/history`

### Confusion: All NFTs by Wallet vs NFTs by Collection
- **All NFTs owned by wallet:** Use `web3-wallet-api` with `/:address/nft`
- **All NFTs in a collection:** Use this skill (`web3-nft-api`) with `/nft/:address`

## Setup

```bash
/moralis-api-key
```

## Common Queries

### Get All NFTs by Wallet

**EVM:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:address/nft', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { format: 'decimal', limit: 10 }
})
  .then(data => console.log('NFTs:', data.result?.length || 0))
  .catch(console.error);
"
```

**Solana:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/account/:network/:address/nft', {
  address: 'kXB7FfzdrfZpAZEW3TZcp8a8CwQbsowa6BdfAHZ4gVs',
  network: 'mainnet',
  params: { nftMetadata: true, mediaItems: true }
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get NFT Metadata

**EVM:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth', format: 'decimal' }
})
  .then(data => console.log('Name:', data.name))
  .catch(console.error);
"
```

**Solana:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:network/:address/metadata', {
  address: 'So11111111111111111111111111111111111111112',
  network: 'mainnet'
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get NFTs by Contract

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth', limit: 10, format: 'decimal' }
})
  .then(data => console.log('NFTs:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get NFT Transfers

**EVM:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/transfers', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { limit: 10 }
})
  .then(data => console.log('Transfers:', data.result?.length || 0))
  .catch(console.error);
"
```

**Wallet activity (includes NFT transfers):** Use `web3-wallet-api` with `/wallets/:address/history`.

### Get NFT Owners

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/owners', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth', limit: 10 }
})
  .then(data => console.log('Owners:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get NFT Traits

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/traits', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth' }
})
  .then(data => console.log('Traits:', JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get NFT Collections

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:address/nft/collections', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
})
  .then(data => console.log('Collections:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get NFT Trades

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/trades', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth', limit: 10 }
})
  .then(data => console.log('Trades:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get NFT Floor Price

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/floor-price', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth' }
})
  .then(data => console.log('Floor Price:', JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get NFT Floor Price History

**Historical floor price data over time:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/floor-price/historical', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: {
    chain: 'eth',
    fromDate: '2024-01-01',
    toDate: '2024-12-31'
  }
})
  .then(data => console.log('Floor Price History:', data.result))
  .catch(console.error);
"
```

**With relative time:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/floor-price/historical', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth', days: 30 }
})
  .then(data => console.log('30-Day History:', data.result))
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

```json
{
  "token_address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  "token_id": "1234",
  "name": "Bored Ape #1234",
  "metadata": "..."
}
```

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
- [Solana Endpoints Reference](references/SOLANA_ENDPOINTPOINTS.md)
