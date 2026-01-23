---
layout: default
title: Usage Examples
---

# Usage Examples

Common queries and patterns for using Web3 Skills and Streams.

## Wallet Queries

### Get Wallet Balance

**EVM (auto-detected):**
```javascript
cd ~/.claude/skills/web3-wallet-api
node -e "
const { query } = require('./query');
query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(data => console.log('Balance:', data.balance / 1e18, 'ETH'))
  .catch(console.error);
"
```

**Solana (auto-detected):**
```javascript
cd ~/.claude/skills/web3-wallet-api
node -e "
const { query } = require('./query');
query('/:network/:address/balance', {
  address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  network: 'mainnet'
})
  .then(data => console.log('SOL Balance:', data.balance / 1e9))
  .catch(console.error);
"
```

### Get Token Holdings

```javascript
query('/wallets/:address/tokens', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(data => {
    data.result.forEach(token => {
      console.log(`${token.symbol}: ${token.balance}`);
    });
  });
```

## Token Queries

### Get Token Price

```javascript
cd ~/.claude/skills/web3-token-api
query('/erc20/:address/price', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' // USDC
})
  .then(data => console.log('Price:', data.usdPrice, 'USD'));
```

### Search Tokens

```javascript
query('/erc20/search', { params: { q: 'bitcoin', chain: 'eth' } })
  .then(data => console.log('Found:', data.result.length));
```

## NFT Queries

### Get NFTs by Wallet

```javascript
cd ~/.claude/skills/web3-nft-api
query('/:address/nft', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { format: 'decimal', limit: 10 }
})
  .then(data => console.log('NFTs:', data.result.length));
```

### Get NFT Metadata

```javascript
query('/nft/:address', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', // BAYC
  params: { chain: 'eth', format: 'decimal' }
})
  .then(data => console.log('Collection:', data.name));
```

## Pagination

Many endpoints return paginated results. Use the `cursor` to fetch more:

```javascript
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

  return allNFTs;
}

getAllNFTs()
  .then(nfts => console.log('Total NFTs:', nfts.length))
  .catch(console.error);
```

## Chain-Specific Queries

### Polygon

```javascript
query('/:address/balance', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  chain: 'polygon'
});
```

### Arbitrum

```javascript
query('/wallets/:address/tokens', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  chain: 'arbitrum'
});
```

## Solana Pump.fun Tokens

```javascript
cd ~/.claude/skills/web3-token-api
query('/token/mainnet/pumpfun/active', {})
  .then(data => console.log('Active Pump.fun tokens:', data.result?.length));
```

## Error Handling

Always include error handling:

```javascript
query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    if (error.message.includes('API key not found')) {
      console.error('Please set your API key in the .env file');
    } else if (error.message.includes('401')) {
      console.error('Invalid API key');
    } else {
      console.error('Error:', error.message);
    }
  });
```

## Combining Multiple Queries

```javascript
async function getWalletSummary(address) {
  const [balance, tokens, nfts] = await Promise.all([
    query('/:address/balance', { address }),
    query('/wallets/:address/tokens', { address, params: { limit: 100 } }),
    query('/:address/nft', { address, params: { limit: 10 } })
  ]);

  return {
    native: balance.balance / 1e18,
    tokenCount: tokens.result?.length || 0,
    nftCount: nfts.result?.length || 0
  };
}

getWalletSummary('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
  .then(summary => console.log(summary))
  .catch(console.error);
```

## Claude Conversation Examples

Just ask Claude naturally:

- "What tokens does 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 hold on Ethereum?"
- "Get the balance of Solana wallet 742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
- "What's the price of ETH?"
- "Show me the NFTs in this Polygon wallet"
- "Get DeFi positions for 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

Claude will automatically detect the blockchain and use the appropriate skill.

## Streams Examples

Create and manage streams via natural language:

- "Create a stream to monitor all ERC20 transfers on Ethereum"
- "Pause the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890"
- "Add address 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 to stream"
