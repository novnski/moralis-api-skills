# Solana Token API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Solana token price?" | `/token/:network/:address/price` | SPL token price |
| "Token metadata?" | `/token/:network/:address/metadata` | Token info |
| "Token holders?" | `/token/mainnet/holders/:address` | SPL holders |
| "Token swaps?" | `/token/:network/:address/swaps` | Swap history |
| "Multiple token prices?" | `/token/:network/prices` | Batch prices |
| "Wallet swaps?" | `/account/:network/:address/swaps` | All swaps |
| "Pair swaps?" | `/token/:network/pairs/:address/swaps` | DEX pair trades |
| "Pump.fun active?" | `/token/mainnet/exchange/pumpfun/new` | New tokens |
| "Pump.fun completed?" | `/token/mainnet/exchange/pumpfun/graduated` | Graduated tokens |
| "Bonding status?" | `/token/mainnet/:address/bonding-status` | Check phase |
| "OHLCV data?" | `/token/:network/pairs/:pairAddress/ohlcv` | Candlesticks |

## Key Endpoint Patterns

- **Token-specific:** `/token/:network/:address/*`
- **Holders:** `/token/mainnet/holders/:address` (note the different path structure)
- **Wallet-specific:** `/account/:network/:address/*`
- **Pair-specific:** `/token/:network/pairs/:address/*`
- **Exchange/Pump.fun:** `/token/:network/exchange/:exchange/*`
- **Network parameter:** `mainnet` or `devnet`
- **Some analytics use deep-index:** Token analytics, volume stats use the EVM API with `chain=solana`

---

## Get Token Metadata

### Get Token Metadata

- **Endpoint:** `GET /token/:network/:address/metadata`
- **Description:** Get token metadata. Retrieves metadata for a Solana SPL token including name, symbol, decimals, and logo.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/:address/metadata
- **Use this endpoint when:** User asks "Solana token metadata", "token info", "token details", "SPL token info"
- **Networks:** mainnet, devnet

---

## Get Token Balances

### Get SPL Token Balances

- **Endpoint:** `GET /account/:network/:address/tokens`
- **Description:** Get token balance by wallet. Retrieves all SPL token balances for a given address.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:address/tokens
- **Use this endpoint when:** User asks "Solana token balances", "SPL tokens", "token holdings"
- **Networks:** mainnet, devnet

---

### Get Native Balance

- **Endpoint:** `GET /account/:network/:address/balance`
- **Description:** Get native balance by wallet. Retrieves the SOL balance for a given address.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:address/balance
- **Use this endpoint when:** User asks "SOL balance", "native balance", "how much SOL"
- **Networks:** mainnet, devnet

---

### Get Portfolio

- **Endpoint:** `GET /account/:network/:address/portfolio`
- **Description:** Get portfolio by wallet. Retrieves a comprehensive portfolio including tokens and their values.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:address/portfolio
- **Use this endpoint when:** User asks "portfolio", "wallet portfolio", "complete holdings"
- **Networks:** mainnet, devnet

---

## Get Pump Fun Tokens

### Get Newly Launched Tokens by Exchange

- **Endpoint:** `GET /token/mainnet/exchange/:exchange/new`
- **Description:** Get new tokens by exchange. Retrieves tokens that have recently launched on Pump.fun or other DEXs.
- **API Reference:** https://solana-gateway.moralis.io/token/mainnet/exchange/:exchange/new
- **Use this endpoint when:** User asks "Pump.fun active tokens", "new tokens", "currently bonding"
- **Params:** `limit` (integer) (default 100)
- **Exchanges:** pumpfun, raydium, etc.

---

### Get Bonding Tokens by Exchange

- **Endpoint:** `GET /token/mainnet/exchange/:exchange/bonding`
- **Description:** Get tokens in bonding phase by exchange. Retrieves tokens currently in the bonding curve phase.
- **API Reference:** https://solana-gateway.moralis.io/token/mainnet/exchange/:exchange/bonding
- **Use this endpoint when:** User asks "bonding tokens", "tokens in bonding", "bonding curve tokens"
- **Params:** `limit` (integer) (default 100)

---

### Get Graduated Tokens by Exchange

- **Endpoint:** `GET /token/mainnet/exchange/:exchange/graduated`
- **Description:** Get graduated tokens by exchange. Retrieves tokens that have graduated from bonding to full DEX listing.
- **API Reference:** https://solana-gateway.moralis.io/token/mainnet/exchange/:exchange/graduated
- **Use this endpoint when:** User asks "completed Pump.fun tokens", "graduated tokens", "bonding curve complete"
- **Params:** `limit` (integer) (default 100)

---

### Get Token Bonding Status

- **Endpoint:** `GET /token/mainnet/:tokenAddress/bonding-status`
- **Description:** Get bonding status by token address. Checks if a token is in bonding, graduated, or not on the exchange.
- **API Reference:** https://solana-gateway.moralis.io/token/mainnet/:tokenAddress/bonding-status
- **Use this endpoint when:** User asks "bonding curve status", "is it still bonding", "did it graduate"

---

## Get Token Holders

### Get Token Top Holders

- **Endpoint:** `GET /token/mainnet/:address/holders`
- **Description:** Get token top holders. Retrieves the top holders of a specific SPL token.
- **API Reference:** https://solana-gateway.moralis.io/token/mainnet/:address/holders
- **Use this endpoint when:** User asks "top holders", "whale holders", "biggest holders"
- **Params:** `limit` (integer), `cursor` (string)

---

### Get Token Holder Stats

- **Endpoint:** `GET /token/mainnet/:address/holders`
- **Description:** Get token holder statistics. Retrieves statistics about token holders including count and distribution.
- **API Reference:** https://solana-gateway.moralis.io/token/mainnet/:address/holders
- **Use this endpoint when:** User asks "holder stats", "holder statistics", "holder data"
- **Params:** `limit` (integer), `cursor` (string)
- **Note:** Same endpoint as top holders, different response fields

---

### Get Historical Token Holders

- **Endpoint:** `GET /token/mainnet/:address/holders/historical`
- **Description:** Get historical token holder statistics. Retrieves historical holder statistics over time.
- **API Reference:** https://solana-gateway.moralis.io/token/mainnet/:address/holders/historical
- **Use this endpoint when:** User asks "historical holders", "holder changes over time", "holder count history"
- **Params:** `timeFrame` (string) (e.g., "1d", "7d")

---

## Get Token Swaps

### Get Swaps by Pair Address

- **Endpoint:** `GET /token/:network/pairs/:pairAddress/swaps`
- **Description:** Get swaps by pair address. Retrieves swap history for a specific DEX pair.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/pairs/:pairAddress/swaps
- **Use this endpoint when:** User asks "pair swaps", "trades on this pair", "DEX pair activity"
- **Networks:** mainnet, devnet

---

### Get Swaps by Wallet Address

- **Endpoint:** `GET /token/:network/:tokenAddress/swaps`
- **Description:** Get swaps by token address. Retrieves swap history for a specific token across all pairs.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/:tokenAddress/swaps
- **Use this endpoint when:** User asks "token swaps", "swap history", "trading activity"
- **Networks:** mainnet, devnet

---

### Get Swaps by Wallet

- **Endpoint:** `GET /account/:network/:walletAddress/swaps`
- **Description:** Get token swaps by wallet address. Retrieves all DEX swaps performed by a wallet.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:walletAddress/swaps
- **Use this endpoint when:** User asks "wallet swaps", "all swaps by this wallet", "trading history"
- **Networks:** mainnet, devnet

---

## Get Pairs & Liquidity

### Get Token Pairs

- **Endpoint:** `GET /token/:network/:address/pairs`
- **Description:** Get token pairs by address. Retrieves all DEX trading pairs for a specific token.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/:address/pairs
- **Use this endpoint when:** User asks "trading pairs", "where is this token traded"
- **Networks:** mainnet, devnet

---

### Get Token Pair Stats

- **Endpoint:** `GET /token/:network/pairs/:pairAddress/stats`
- **Description:** Get token pair statistics. Retrieves statistics for a specific DEX pair.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/pairs/:pairAddress/stats
- **Use this endpoint when:** User asks "pair stats", "pair volume", "liquidity data"
- **Networks:** mainnet, devnet

---

### Get Aggregated Token Pair Stats

- **Endpoint:** `GET /token/:network/:address/pairs/stats`
- **Description:** Get aggregated token pair statistics. Retrieves aggregated statistics across all pairs for a token.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/:address/pairs/stats
- **Use this endpoint when:** User asks "aggregate pair stats", "total pair statistics"
- **Networks:** mainnet, devnet

---

## Get Token Analytics

### Get Token Analytics

- **Endpoint:** `GET /tokens/:address/analytics` (via deep-index)
- **Description:** Get token analytics. Retrieves comprehensive analytics data for a token.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/:address/analytics
- **Use this endpoint when:** User asks "token analytics", "token analysis"
- **Note:** Uses deep-index API, add `?chain=solana` parameter

---

### Get Multiple Token Analytics

- **Endpoint:** `POST /tokens/analytics` (via deep-index)
- **Description:** Get multiple token analytics. Retrieves analytics for multiple tokens in a single request.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/analytics
- **Use this endpoint when:** User asks "multiple token analytics"
- **Method:** POST with body `{"addresses": ["...", ...], "chain": "solana"}`

---

### Get Time Series Token Analytics

- **Endpoint:** `GET /tokens/analytics/timeseries` (via deep-index)
- **Description:** Get timeseries token analytics. Retrieves historical analytics data over time.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/analytics/timeseries
- **Use this endpoint when:** User asks "analytics over time", "historical analytics"
- **Params:** `address` (string), `chain=solana` (string), `timeframe`, `fromDate`, `toDate`

---

## Get Volume Stats

### Get Volume Stats by Chain

- **Endpoint:** `GET /volume/chains` (via deep-index)
- **Description:** Get volume statistics by chain. Retrieves DEX trading volume statistics.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/chains
- **Use this endpoint when:** User asks "volume by chain", "trading volume stats"
- **Params:** `fromDate` (string), `toDate` (string)

---

### Get Volume Stats by Category

- **Endpoint:** `GET /volume/categories` (via deep-index)
- **Description:** Get volume and chain data by categories. Retrieves volume statistics grouped by token categories.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/categories
- **Use this endpoint when:** User asks "volume by category", "category stats"
- **Params:** `chain=solana` (string), `fromDate` (string), `toDate`

---

### Get Time Series Volume

- **Endpoint:** `GET /volume/timeseries` (via deep-index)
- **Description:** Retrieve timeseries volume data by chain. Gets historical volume data over time.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/timeseries
- **Use this endpoint when:** User asks "volume over time", "historical volume"
- **Params:** `chain=solana` (string), `timeframe` (string), `fromDate`, `toDate`

---

### Get Time Series Volume by Category

- **Endpoint:** `GET /volume/timeseries/:category` (via deep-index)
- **Description:** Retrieve timeseries volume data by category. Gets historical volume data for a specific category.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/timeseries/:category
- **Use this endpoint when:** User asks "category volume over time"
- **Params:** `chain=solana` (string), `timeframe` (string), `fromDate`, `toDate`

---

## Get Token Prices

### Get Token Price

- **Endpoint:** `GET /token/:network/:address/price`
- **Description:** Get token price. Retrieves the current price of a Solana SPL token.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/:address/price
- **Use this endpoint when:** User asks "Solana token price", "SPL token price", "how much is this token worth"
- **Networks:** mainnet, devnet

---

### Get Multiple Token Prices

- **Endpoint:** `POST /token/:network/prices`
- **Description:** Get multiple token prices. Retrieves prices for multiple tokens in a single request.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/prices
- **Use this endpoint when:** User asks "multiple token prices", "batch prices"
- **Method:** POST with body `{"addresses": ["...", ...]}`
- **Networks:** mainnet, devnet

---

### Get OHLCV Candlesticks

- **Endpoint:** `GET /token/:network/pairs/:pairAddress/ohlcv`
- **Description:** Get OHLCV candlesticks by pair address. Retrieves Open-High-Low-Close-Volume data for a trading pair.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/pairs/:pairAddress/ohlcv
- **Use this endpoint when:** User asks "candlesticks", "OHLCV", "price chart data"
- **Networks:** mainnet, devnet
- **Params:** `timeframe` (string), `fromDate` (string), `toDate`

---

## Get Token Score

### Get Token Score

- **Endpoint:** `GET /tokens/:tokenAddress/score` (via deep-index)
- **Description:** Get token score. Retrieves a trust/quality score for a token.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/:tokenAddress/score
- **Use this endpoint when:** User asks "token score", "token rating", "trust score"

---

## Get Token Snipers

### Get Snipers by Pair Address

- **Endpoint:** `GET /token/:network/pairs/:pairAddress/snipers`
- **Description:** Get snipers by pair address. Retrieves wallets that bought early on a DEX pair.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/pairs/:pairAddress/snipers
- **Use this endpoint when:** User asks "snipers", "early buyers", "who sniped this token"
- **Networks:** mainnet, devnet

---

## Get Filtered Tokens

### Get Filtered Tokens

- **Endpoint:** `POST /discovery/tokens` (via deep-index)
- **Description:** Get filtered tokens. Retrieves tokens based on various filter criteria.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/discovery/tokens
- **Use this endpoint when:** User asks "filter tokens", "token discovery"
- **Method:** POST with filter criteria including `chain=solana`

---

## Get Trending Tokens

### Get Trending Tokens

- **Endpoint:** `GET /tokens/trending` (via deep-index)
- **Description:** Get trending tokens. Retrieves tokens trending based on social sentiment.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/trending
- **Use this endpoint when:** User asks "trending tokens", "hot tokens"
- **Params:** `chain=solana` (string), `limit` (integer)

---

## Search Tokens

### Search Tokens

- **Endpoint:** `POST /tokens/search` (via deep-index)
- **Description:** Search tokens. Searches for tokens by name, symbol, or address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/search
- **Use this endpoint when:** User asks "search tokens", "find tokens"
- **Method:** POST with body `{"query": "...", "chains": ["solana"]}`

---

## Notes

- The Solana Token API has different path structures than EVM
- Token holders use path pattern: `/token/mainnet/holders/:address` (not `:address/holders`)
- Exchange-specific endpoints support: pumpfun, raydium, etc.
- Some analytics endpoints use the deep-index API with `chain=solana` parameter
- For wallet token holdings, use `/account/:network/:address/tokens` or `/account/:network/:address/portfolio`
