---
name: moralis-price-api
description: Query token and NFT prices for both EVM chains and Solana. Get current ERC20/SPL token prices, NFT floor prices, sale prices, and pair OHLCV candlestick data. Use when user asks about prices, market data, or valuations.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed). Solana API is more limited than EVM.
metadata:
  version: "1.1.0"
  author: web3-skills
  tags: [web3, blockchain, price, market, trading, evm, solana]
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

# Web3 Price API

Query token and NFT prices for both EVM chains and Solana including current prices, NFT floor prices, and market statistics.

**⚠️ Important Limitations:**
- **EVM:** No native token price endpoints (ETH, BNB, MATIC) - use wrapped token addresses instead
- **EVM:** No token price history endpoints
- **Solana:** Very limited - only current SPL token prices available

## When to Use This Skill

Use this skill when the user asks about:

**Token Prices:**
- "What's the price of ETH/BNB/MATIC?", "Native token price", "Gas token price"
- "Token price", "How much is this token worth", "Current price"
- "Multiple token prices", "Batch prices", "Price of these tokens"

**Price Charts (EVM only):**
- "Price chart", "Candlesticks", "OHLCV data", "Trading data"
- "Pair candlesticks", "DEX price chart"

**NFT Prices (EVM only):**
- "Floor price", "NFT floor price", "Lowest price", "Collection floor"
- "NFT sales prices", "Recent sales", "Sale history"
- "NFT price history", "Historical floor prices"

**DEX Prices (EVM only):**
- "Pair price", "DEX price", "Liquidity pool price"

**⚠️ NOT for:**
- Token metadata/contract info → Use `web3-token-api`
- Wallet token holdings with prices → Use `web3-wallet-api` with `/wallets/:address/tokens`
- NFT metadata with price → Use `web3-nft-api`
- Token swaps/trades → Use `web3-token-api`

## Common Pitfalls

### Confusion: Token Price vs Token Metadata
- **Price only:** Use this skill (`web3-price-api`) with `/erc20/:address/price`
- **Metadata + price:** Use `web3-token-api` with `/erc20/metadata` (includes price)

### Confusion: NFT Floor Price vs NFT Metadata
- **Floor price only:** Use this skill (`web3-price-api`) with `/nft/:address/floor-price`
- **NFT metadata + traits:** Use `web3-nft-api` with `/nft/:address`

### Confusion: OHLCV Candlesticks vs Token Swaps
- **OHLCV candlesticks (charting):** Use this skill (`web3-price-api`) with `/pairs/:address/ohlcv`
- **Swap/trade history:** Use `web3-token-api` with `/erc20/:address/swaps`

## Setup

```bash
/moralis-api-key
```

## Common Queries

### Get Token Price

**EVM:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/:address/price', { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' })
  .then(data => console.log('Price:', data.usdPrice, 'USD'))
  .catch(console.error);
"
```

**Solana:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/mainnet/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/price', {})
  .then(data => console.log('Price:', data.usdPrice, 'USD'))
  .catch(console.error);
"
```

### Get Token Pair Price (EVM)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/{token0_address}/{token1_address}/price', {
  params: {
    token0_address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    token1_address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    chain: 'eth'
  }
})
  .then(data => console.log('Pair Price:', JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

**⚠️ DEPRECATED:** This endpoint is deprecated. For production use, get the pair address first and use `/pairs/:address/ohlcv` for candlestick data instead.

### Get Pair OHLCV Candlesticks (EVM)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/pairs/:address/ohlcv', {
  address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4', // WETH/USDC pair
  params: { chain: 'eth', limit: 30 }
})
  .then(data => console.log('Candlesticks:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Multiple Token Prices

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/prices', {
  params: {
    addresses: '0x6B175474E89094C44Da98b954EedeAC495271d0F,0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  }
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get NFT Floor Price (EVM)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/floor-price', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', // Bored Ape Yacht Club
  params: { chain: 'eth' }
})
  .then(data => console.log('Floor Price:', JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get NFT Sale Prices (EVM)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/price', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth', limit: 10 }
})
  .then(data => console.log('Sales:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Historical NFT Floor Price (EVM)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/floor-price/historical', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth', from: '2024-01-01', to: '2024-01-31' }
})
  .then(data => console.log('History:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Multiple Solana Token Prices

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:network/prices', {
  params: {
    network: 'mainnet',
    addresses: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU,So11111111111111111111111111111111111111112'
  }
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

## Response Format

```json
{
  "usdPrice": 1.00,
  "tokenName": "USD Coin",
  "tokenSymbol": "USDC",
  "tokenDecimals": 6,
  "exchangeAddress": "0x...",
  "exchangeName": "Uniswap v2"
}
```

## Supported Chains

**EVM:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, etc.
**Solana:** mainnet, devnet

**Note:** For native token prices (ETH, BNB, MATIC, SOL), use wrapped token addresses or external price APIs like CoinGecko.

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
- [Solana Endpoints Reference](references/SOLANA_ENDPOINTPOINTS.md)
