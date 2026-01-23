# EVM Token API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "What's the token price?" | `/erc20/:address/price` | Single token price |
| "Multiple token prices" | `/erc20/prices` | Batch prices |
| "Token metadata/info" | `/erc20/metadata` | Name, symbol, decimals |
| "Trading pairs?" | `/:token_address/pairs` | DEX pairs |
| "Token swaps?" | `/erc20/:address/swaps` | Swap history |
| "Who owns this token?" | `/erc20/:token_address/owners` | Token holders |
| "Token transfers?" | `/erc20/:address/transfers` | Transfer events |
| "Search for tokens" | `/tokens/search` | By name/symbol |
| "Trending tokens?" | `/tokens/trending` | Social sentiment |
| "Token stats?" | `/erc20/:address/stats` | Market statistics |
| "Token balance?" | `/wallets/:address/tokens` | Token balances for wallet |
| "Top gainers?" | `/discovery/tokens/top-gainers` | Top gainers |
| "Top losers?" | `/discovery/tokens/top-losers` | Top losers |
| "Token pairs stats?" | `/pairs/:address/stats` | Pair statistics |
| "OHLCV data?" | `/pairs/:address/ohlcv` | Candlesticks |
| "Token analytics?" | `/tokens/:address/analytics` | Token analytics |
| "Top tokens?" | `/market-data/erc20s/top-tokens` | By market cap |

## Key Endpoint Patterns

- **Single token operations:** `/erc20/:address/*`
- **Batch operations:** `/erc20/*` (no `:address`)
- **Pair-based data:** `/pairs/:address/*`
- **Metadata returns:** name, symbol, decimals, logos, contract info
- **Discovery endpoints:** `/discovery/tokens/*` for trending/filtering

---

## Get Token Balances

### Get ERC20 Token Balances by Wallet

- **Endpoint:** `GET /:address/erc20`
- **Function Name:** `getWalletTokenBalances`
- **Description:** Get ERC20 token balance by wallet. Retrieves all ERC20 token balances for a given address without USD pricing.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/erc20
- **Use this endpoint when:** User asks "ERC20 balances", "token balances without prices", "what ERC20 tokens"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string)
- **Note:** This endpoint is also documented in `web3-wallet-api`

---

### Get Token Balances with Prices

- **Endpoint:** `GET /wallets/:address/tokens`
- **Function Name:** `getWalletTokenBalancesPrice`
- **Description:** Get Native & ERC20 token balances & prices by wallet. Retrieves all tokens held by the wallet with their USD prices and metadata.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/tokens
- **Use this endpoint when:** User asks "token balance", "how many tokens does this wallet have", "check wallet token balances", "tokens with prices"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string)
- **Note:** This endpoint is also documented in `web3-wallet-api`

---

## Get Token Approvals

### Get Token Approvals

- **Endpoint:** `GET /wallets/:address/approvals`
- **Function Name:** `getTokenAllowance`
- **Description:** Get ERC20 approvals by wallet. Retrieves all token approval transactions for the wallet.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/approvals
- **Use this endpoint when:** User asks "token approvals", "what contracts are approved", "allowances", "permissions"
- **Auto-chain:** Yes
- **Note:** This endpoint is also documented in `web3-wallet-api`

---

## Get Token Metadata

### Get Token Metadata by Symbols

- **Endpoint:** `GET /erc20/metadata/symbols`
- **Function Name:** `getTokenMetadataBySymbol`
- **Description:** Get ERC20 token metadata by symbols. Retrieves metadata for multiple tokens by their symbols.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/metadata/symbols
- **Use this endpoint when:** User asks "token metadata by symbol", "info for BTC, ETH", "get token info"
- **Method:** GET with query params

---

### Get Token Metadata

- **Endpoint:** `GET /erc20/metadata`
- **Function Name:** `getTokenMetadata`
- **Description:** Get ERC20 token metadata by contract. Retrieves metadata including name, symbol, decimals, logos, and contract info.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/metadata
- **Use this endpoint when:** User asks "token metadata", "token info", "token details", "what's the symbol/decimals", "token name"
- **Method:** GET with query params

---

### Get Discovery Token

- **Endpoint:** `GET /discovery/token`
- **Function Name:** `getDiscoveryToken`
- **Description:** Get token details. Retrieves comprehensive token information from the discovery service.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/discovery/token
- **Use this endpoint when:** User asks "token details", "discovery info", "comprehensive token data"
- **Params:** `addresses` (array)

---

## Get Token Price

### Get Token Price

- **Endpoint:** `GET /erc20/:address/price`
- **Function Name:** `getTokenPrice`
- **Description:** Get ERC20 token price. Retrieves the current price of a token in the blockchain's native currency and USD.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:address/price
- **Use this endpoint when:** User asks "token price", "how much is this token worth", "current price", "USD price"
- **Auto-chain:** Yes
- **Params:** `include` (string)

---

### Get Multiple Token Prices

- **Endpoint:** `POST /erc20/prices`
- **Function Name:** `getMultipleTokenPrices`
- **Description:** Get multiple token prices. Retrieves prices for multiple tokens in a single request.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/prices
- **Use this endpoint when:** User asks "multiple token prices", "price of these tokens", "batch prices", "check prices for..."
- **Method:** POST with body `{"addresses": ["0x...", ...]}`
- **Params:** `include` (string)

---

### Get OHLCV Candlesticks

- **Endpoint:** `GET /pairs/:address/ohlcv`
- **Function Name:** `getPairCandlesticks`
- **Description:** Get the OHLCV candlesticks by using pair address. Retrieves Open-High-Low-Close-Volume data for a trading pair.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/pairs/:address/ohlcv
- **Use this endpoint when:** User asks "candlesticks", "OHLCV", "price chart data", "candle data"
- **Auto-chain:** Yes
- **Params:** `timeframe` (string), `fromDate` (string), `toDate` (string)

---

## Get Token Swaps

### Get Swaps by Pair Address

- **Endpoint:** `GET /pairs/:address/swaps`
- **Function Name:** `getSwapsByPairAddress`
- **Description:** Get swaps by pair address. Retrieves swap history for a specific DEX pair.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/pairs/:address/swaps
- **Use this endpoint when:** User asks "pair swaps", "trades on this pair", "pair volume"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `from` (integer), `to` (integer)

---

### Get Swaps by Token Address

- **Endpoint:** `GET /erc20/:address/swaps`
- **Function Name:** `getSwapsByTokenAddress`
- **Description:** Get swaps by ERC20 token address. Retrieves swap history for a specific token across all pairs.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:address/swaps
- **Use this endpoint when:** User asks "token swaps", "swap history", "trading activity", "who's swapping this token"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `from` (integer), `to` (integer)

---

### Get Swaps by Wallet Address

- **Endpoint:** `GET /wallets/:address/swaps`
- **Description:** Get swaps by wallet address. Retrieves all DEX swaps performed by a wallet.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/swaps
- **Use this endpoint when:** User asks "my swaps", "wallet swaps", "what swaps did this wallet do"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `from` (integer), `to` (integer)
- **Note:** This endpoint is also documented in `web3-wallet-api`

---

## Get Token Transfers

### Get Token Transfers by Wallet

- **Endpoint:** `GET /:address/erc20/transfers`
- **Function Name:** `getWalletTokenTransfers`
- **Description:** Get ERC20 token transfers by wallet. Retrieves all ERC20 transfers to and from the specified address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/erc20/transfers
- **Use this endpoint when:** User asks "my token transfers", "wallet transfers", "tokens sent/received"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `from` (integer), `to` (integer)
- **Note:** This endpoint is also documented in `web3-wallet-api`

---

### Get Token Transfers

- **Endpoint:** `GET /erc20/:address/transfers`
- **Function Name:** `getTokenTransfers`
- **Description:** Get ERC20 token transfers by contract. Retrieves all transfer events for a specific token contract.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:address/transfers
- **Use this endpoint when:** User asks "token transfers", "transfer history", "token movement", "who's transferring"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `from` (integer), `to` (integer)

---

## Get Token Top Traders

### Get Token Profitable Wallets

- **Endpoint:** `GET /erc20/:address/top-gainers`
- **Function Name:** `getTopProfitableWalletPerToken`
- **Description:** Get Token Profitable Wallets. Retrieves wallets with the highest profits from trading a specific token.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:address/top-gainers
- **Use this endpoint when:** User asks "top traders", "profitable wallets", "who made money on this token", "best traders"
- **Auto-chain:** Yes

---

## Get Volume Stats

### Get Volume Stats by Chain

- **Endpoint:** `GET /volume/chains`
- **Function Name:** `getVolumeStatsByChain`
- **Description:** Get volume statistics by chain. Retrieves DEX trading volume statistics for all chains.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/chains
- **Use this endpoint when:** User asks "volume by chain", "trading volume stats", "DEX volume"
- **Params:** `fromDate` (string), `toDate` (string)

---

### Get Volume Stats by Category

- **Endpoint:** `GET /volume/categories`
- **Function Name:** `getVolumeStatsByCategory`
- **Description:** Get volume and chain data by categories. Retrieves volume statistics grouped by token categories.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/categories
- **Use this endpoint when:** User asks "volume by category", "category stats", "sector volume"
- **Params:** `chain` (string), `fromDate` (string), `toDate` (string)

---

### Get Time Series Volume

- **Endpoint:** `GET /volume/timeseries`
- **Function Name:** `getTimeSeriesVolume`
- **Description:** Retrieve timeseries volume data by chain. Gets historical volume data over time.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/timeseries
- **Use this endpoint when:** User asks "volume over time", "historical volume", "volume timeseries"
- **Params:** `chain` (string), `timeframe` (string), `fromDate` (string), `toDate` (string)

---

### Get Time Series Volume by Category

- **Endpoint:** `GET /volume/timeseries/:category`
- **Function Name:** `getTimeSeriesVolumeByCategory`
- **Description:** Retrieve timeseries volume data by category. Gets historical volume data for a specific category.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/timeseries/:category
- **Use this endpoint when:** User asks "category volume over time", "historical category volume"
- **Params:** `chain` (string), `timeframe` (string), `fromDate` (string), `toDate` (string)
- **Example:** `/volume/timeseries/artificial-intelligence`

---

## Get Token Pairs & Liquidity

### Get Token Pairs

- **Endpoint:** `GET /erc20/:address/pairs`
- **Function Name:** `getTokenPairs`
- **Description:** Get token pairs by address. Retrieves all DEX trading pairs for a specific token.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:address/pairs
- **Use this endpoint when:** User asks "trading pairs", "DEX pairs", "where is this token traded", "liquidity pairs", "available pairs"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string)

---

### Get Token Pair Stats

- **Endpoint:** `GET /pairs/:address/stats`
- **Function Name:** `getPairStats`
- **Description:** Get token pair statistics. Retrieves statistics for a specific DEX pair.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/pairs/:address/stats
- **Use this endpoint when:** User asks "pair stats", "pair statistics", "trading pair data"
- **Auto-chain:** Yes

---

### Get Aggregated Token Pair Stats

- **Endpoint:** `GET /erc20/:address/pairs/stats`
- **Function Name:** `getAggregatedTokenPairStats`
- **Description:** Get aggregated token pair statistics. Retrieves aggregated statistics across all pairs for a token.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:address/pairs/stats
- **Use this endpoint when:** User asks "aggregate pair stats", "total pair statistics"
- **Auto-chain:** Yes

---


## Get Token Analytics

### Get Token Analytics

- **Endpoint:** `GET /tokens/:address/analytics`
- **Function Name:** `getTokenAnalytics`
- **Description:** Get token analytics. Retrieves comprehensive analytics data for a token.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/:address/analytics
- **Use this endpoint when:** User asks "token analytics", "token analysis", "comprehensive token data"
- **Auto-chain:** Yes

---

### Get Multiple Token Analytics

- **Endpoint:** `POST /tokens/analytics`
- **Function Name:** `getMultipleTokenAnalytics`
- **Description:** Get multiple token analytics. Retrieves analytics for multiple tokens in a single request.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/analytics
- **Use this endpoint when:** User asks "multiple token analytics", "analytics for several tokens"
- **Method:** POST with body `{"addresses": ["0x...", ...]}`

---

### Get Time Series Token Analytics

- **Endpoint:** `POST /tokens/analytics/timeseries`
- **Function Name:** `getTimeSeriesTokenAnalytics`
- **Description:** Get timeseries token analytics. Retrieves historical analytics data over time.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/analytics/timeseries
- **Use this endpoint when:** User asks "analytics over time", "historical analytics", "timeseries analytics"
- **Method:** POST with body containing addresses and date range

---

## Get Tokens by Exchange

### Get Newly Launched Tokens by Exchange

- **Endpoint:** `GET /erc20/exchange/:exchange/new`
- **Function Name:** `getNewTokensByExchange`
- **Description:** Get newly launched tokens by exchange. Retrieves tokens that have recently launched on a DEX.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/exchange/:exchange/new
- **Use this endpoint when:** User asks "new tokens", "newly launched", "just launched tokens"
- **Params:** `limit` (integer)
- **Example exchanges:** "uniswap-v2", "uniswap-v3", "sushiswap"

---

### Get Bonding Tokens by Exchange

- **Endpoint:** `GET /erc20/exchange/:exchange/bonding`
- **Function Name:** `getBondingTokensByExchange`
- **Description:** Get bonding tokens by exchange. Retrieves tokens currently in the bonding curve phase.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/exchange/:exchange/bonding
- **Use this endpoint when:** User asks "bonding tokens", "tokens in bonding", "bonding curve tokens"
- **Params:** `limit` (integer)

---

### Get Graduated Tokens by Exchange

- **Endpoint:** `GET /erc20/exchange/:exchange/graduated`
- **Function Name:** `getGraduatedTokensByExchange`
- **Description:** Get graduated tokens by exchange. Retrieves tokens that have graduated from bonding to full DEX listing.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/exchange/:exchange/graduated
- **Use this endpoint when:** User asks "graduated tokens", "tokens that graduated"
- **Params:** `limit` (integer)

---

### Get Token Bonding Status

- **Endpoint:** `GET /erc20/:address/bondingStatus`
- **Function Name:** `getTokenBondingStatus`
- **Description:** Get token bonding status. Checks if a token is in bonding, graduated, or not on the exchange.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:address/bondingStatus
- **Use this endpoint when:** User asks "bonding status", "is this token bonding", "token status"
- **Auto-chain:** Yes

---

## Get Token Stats

### Get ERC20 Token Stats

- **Endpoint:** `GET /erc20/:address/stats`
- **Function Name:** `getTokenStats`
- **Description:** Get ERC20 token stats. Retrieves market statistics for a token including price, market cap, volume, etc.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:address/stats
- **Use this endpoint when:** User asks "token stats", "token statistics", "market data", "token metrics"
- **Auto-chain:** Yes

---

## Get Token Holders

### Get ERC20 Token Holders

- **Endpoint:** `GET /erc20/:token_address/owners`
- **Function Name:** `getTokenOwners`
- **Description:** Get ERC20 Token Holders. Retrieves the current holders of a token.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:token_address/owners
- **Use this endpoint when:** User asks "token holders", "who owns this token", "whale holders", "top holders"
- **Params:** `limit` (integer), `cursor` (string)

---

### Get ERC20 Token Holders Stats

- **Endpoint:** `GET /erc20/:token_address/holders`
- **Function Name:** `getTokenHolders`
- **Description:** Get ERC20 Token Holders Stats. Retrieves statistics about token holders.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:token_address/holders
- **Use this endpoint when:** User asks "holder stats", "holder statistics", "holder data"
- **Params:** `limit` (integer), `cursor` (string)

---

### Get Historical Token Holders

- **Endpoint:** `GET /erc20/:token_address/holders/historical`
- **Function Name:** `getHistoricalTokenHolders`
- **Description:** Get ERC20 token holders stats timeseries. Retrieves historical holder statistics over time.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/erc20/:token_address/holders/historical
- **Use this endpoint when:** User asks "historical holders", "holder count over time", "holder history"
- **Params:** `fromDate` (string), `toDate` (string)

---

## Get Token Score

### Get Token Score

- **Endpoint:** `GET /tokens/:tokenAddress/score`
- **Function Name:** `getTokenScore`
- **Description:** Get token score. Retrieves a trust/quality score for a token based on various metrics.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/:tokenAddress/score
- **Use this endpoint when:** User asks "token score", "token rating", "token quality", "trust score"
- **Auto-chain:** Yes

---

## Get Token Snipers

### Get Snipers by Pair Address

- **Endpoint:** `GET /pairs/:address/snipers`
- **Function Name:** `getSnipersByPairAddress`
- **Description:** Get snipers by pair address. Retrieves wallets that sniped (bought early) on a DEX pair.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/pairs/:address/snipers
- **Use this endpoint when:** User asks "snipers", "early buyers", "who sniped this token"
- **Auto-chain:** Yes

---

## Get Trending Tokens

### Get Trending Tokens

- **Endpoint:** `GET /tokens/trending`
- **Function Name:** `getTrendingTokens`
- **Description:** Get trending tokens. Retrieves tokens trending based on social sentiment and mentions.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/trending
- **Use this endpoint when:** User asks "trending tokens", "hot tokens", "popular tokens", "what's trending"
- **Params:** `chain` (string), `limit` (integer)

---

### Get Tokens with Top Gainers

- **Endpoint:** `GET /discovery/tokens/top-gainers`
- **Function Name:** `getTopGainersTokens`
- **Description:** Get tokens with top gainers. Retrieves tokens with the highest price increases.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/discovery/tokens/top-gainers
- **Use this endpoint when:** User asks "top gainers", "biggest gainers", "tokens that went up"
- **Params:** `chain` (string), `limit` (integer)

---

### Get Tokens with Top Losers

- **Endpoint:** `GET /discovery/tokens/top-losers`
- **Function Name:** `getTopLosersTokens`
- **Description:** Get tokens with top losers. Retrieves tokens with the highest price decreases.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/discovery/tokens/top-losers
- **Use this endpoint when:** User asks "top losers", "biggest losers", "tokens that went down"
- **Params:** `chain` (string), `limit` (integer)

---

### Get Top ERC20 Tokens by Market Cap

- **Endpoint:** `GET /market-data/erc20s/top-tokens`
- **Function Name:** `getTopERC20TokensByMarketCap`
- **Description:** Get the top ERC20 tokens by market cap. Retrieves tokens ranked by market capitalization.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/market-data/erc20s/top-tokens
- **Use this endpoint when:** User asks "top tokens", "biggest tokens", "tokens by market cap", "largest tokens"
- **Params:** `chain` (string), `limit` (integer)

---

## Get Filtered Tokens

### Get Filtered Tokens

- **Endpoint:** `POST /discovery/tokens`
- **Function Name:** `getFilteredTokens`
- **Description:** Get filtered tokens. Retrieves tokens based on various filter criteria.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/discovery/tokens
- **Use this endpoint when:** User asks "filter tokens", "search with filters", "tokens by criteria"
- **Method:** POST with filter criteria in body
- **Filter by:** market cap, volume, price changes, etc.

---

## Search Tokens

### Search Tokens

- **Endpoint:** `GET /tokens/search`
- **Function Name:** `searchTokens`
- **Description:** Search tokens. Searches for tokens by name, symbol, or address across all chains.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/search
- **Use this endpoint when:** User asks "search tokens", "find tokens", "look up token", "token search"
- **Method:** GET with query params

---

## Note on Token Balance by Wallet

For wallet token balances, use the Wallet API endpoint:

**`GET /wallets/:address/tokens`**

This provides all tokens held by the wallet with USD prices and metadata.
