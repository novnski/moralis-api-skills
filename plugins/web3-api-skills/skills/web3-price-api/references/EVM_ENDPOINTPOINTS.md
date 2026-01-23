# EVM Price API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Token price?" | `/erc20/:address/price` | ERC20 price |
| "Multiple token prices?" | `/erc20/prices` | Batch prices |
| "Pair price?" | `/token0/:token0_address/token1/:token1_address/price` | DEX pair price |
| "Price chart/candlesticks?" | `/pairs/:address/ohlcv` | OHLCV data |
| "NFT floor price?" | `/nft/:address/floor-price` | Collection floor |
| "NFT sales/contract prices?" | `/nft/:address/price` | Sale prices |
| "NFT price history?" | `/nft/:address/floor-price/historical` | Floor history |

## Key Endpoint Patterns

- **Token prices:** `/erc20/:address/price` (current price only)
- **DEX pair prices:** `/{token0_address}/{token1_address}/price` (deprecated, use pairs/ohlcv)
- **Pair OHLCV:** `/pairs/:address/ohlcv` (candlestick chart data)
- **NFT prices:** `/nft/:address/*price*` (floor + sales + history)
- **Note:** Native token prices (ETH, BNB, MATIC) are NOT available as separate endpoints

**⚠️ IMPORTANT Limitations:**
- No native token price endpoints (use `/erc20/:address/price` with WETH, WBNB, etc.)
- No `/erc20/:address/price/history` endpoint (historical prices not available)
- No `/nft/:address/sales` endpoint (use `/nft/:address/price` for sale prices)

---

## Get Token Price

- **Endpoint:** `GET /erc20/:address/price`
- **Description:** Get ERC20 token price. Retrieves the current price of a token in the blockchain's native currency and USD.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:address/price
- **Use this endpoint when:** User asks "token price", "how much is this token", "current price", "USD price"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - The address of the token contract- `chain` (optional, string) - The chain to query- `exchange` (optional, string) - The factory name or address of the token exchange- `to_block` (optional, string) - The block number from which the token price should be checked- `include` (optional, string) - Deprecated (percentage changes are included by default)- `max_token_inactivity` (optional, integer) - Exclude tokens inactive for more than the given amount of days- `min_pair_side_liquidity_usd` (optional, integer) - Exclude tokens with liquidity less than the specified amount in USD

---

## Get Multiple Token Prices

- **Endpoint:** `POST /erc20/prices`
- **Description:** Get multiple token prices. Retrieves prices for multiple tokens in a single request.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/prices
- **Use this endpoint when:** User asks "multiple token prices", "batch prices", "check these tokens", "price list"
- **Method:** POST with body `{"addresses": ["0x...", ...]}`
- **Params:**- `chain` (optional, string) - The chain to query- `include` (optional, string) - Deprecated (percentage changes are included by default)- `max_token_inactivity` (optional, integer) - Exclude tokens inactive for more than the given amount of days- `min_pair_side_liquidity_usd` (optional, integer) - Exclude tokens with liquidity less than the specified amount in USD

---

## Get Pair OHLCV Candlesticks

- **Endpoint:** `GET /pairs/:address/ohlcv`
- **Description:** Get the OHLCV candlesticks by using pair address. Retrieves Open-High-Low-Close-Volume data for a trading pair.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/pairs/:address/ohlcv
- **Use this endpoint when:** User asks "candlesticks", "OHLCV", "price chart", "charting data", "open/high/low/close"
- **Auto-chain:** Yes
- **Params:** `timeframe` (1m, 5m, 15m, 1h, 4h, 1d), `fromDate`, `toDate`

---

## Get NFT Floor Price by Contract

- **Endpoint:** `GET /nft/:address/floor-price`
- **Description:** Get NFT floor price by contract. Retrieves the current lowest price across all marketplaces.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/floor-price
- **Use this endpoint when:** User asks "floor price", "NFT floor", "lowest price", "collection floor"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - The address of the NFT contract- `chain` (optional, string) - The chain to query

---

## Get NFT Floor Price by Token

- **Endpoint:** `GET /nft/:address/:token_id/floor-price`
- **Description:** Get NFT floor price by token. Retrieves the floor price for a specific token ID.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/:token_id/floor-price
- **Use this endpoint when:** User asks "floor price for this NFT", "token floor price"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - The address of the NFT contract- `token_id` (required, string) - The token ID of the NFT- `chain` (optional, string) - The chain to query

---

## Get Historical NFT Floor Price

- **Endpoint:** `GET /nft/:address/floor-price/historical`
- **Description:** Get historical NFT floor price by contract. Retrieves historical floor price data over time.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/floor-price/historical
- **Use this endpoint when:** User asks "NFT price history", "historical floor", "floor over time"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - The address of the NFT contract- `chain` (optional, string) - The chain to query- `interval` (required, nftFloorPriceIntervalList) - The duration to query- `cursor` (optional, string) - The cursor returned in the previous response

---

## Get NFT Contract Sale Prices

- **Endpoint:** `GET /nft/:address/price`
- **Description:** Get contract sale prices. Retrieves recent sale prices for NFTs in the contract.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/price
- **Use this endpoint when:** User asks "NFT sales", "recent sales", "sale prices", "what did it sell for"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - The address of the NFT collection- `chain` (optional, string) - The chain to query- `days` (optional, integer) - The number of days to look back to find the lowest price (default: 7)

---

## Get NFT Sale Prices

- **Endpoint:** `GET /nft/:address/:token_id/price`
- **Description:** Get sale prices. Retrieves recent sale prices for a specific NFT.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/:token_id/price
- **Use this endpoint when:** User asks "this NFT's sale price", "token sale price"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - The address of the NFT collection- `token_id` (required, string) - The token id of the NFT collection- `chain` (optional, string) - The chain to query- `days` (optional, integer) - The number of days to look back to find the lowest price (default: 7)
