# EVM Premium Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Volume by chain?" | `/volume/chains` | Chain volume stats |
| "Volume over time?" | `/volume/timeseries` | Timeseries volume |
| "Advanced token search?" | `/tokens/search` | Filtered search |
| "Multiple token analytics?" | `/tokens/analytics` | Batch analytics |
| "Filter tokens?" | `/discovery/tokens` | By liquidity/market cap |
| "Token stats/analytics?" | `/tokens/{tokenAddress}/analytics` | Detailed analytics |
| "NFT collection stats?" | `/nft/{address}/stats` | Collection analytics |
| "Market data?" | `/market-data/*` | Market statistics |

## Key Endpoint Patterns

- **Volume analytics:** `/volume/*` (chain-level trading volume)
- **Advanced search:** `/tokens/search` and `/discovery/tokens` (filtered search)
- **Batch analytics:** `/tokens/analytics` (multiple tokens at once)
- **Token analytics:** `/tokens/{tokenAddress}/analytics` (single token)
- **Premium endpoints:** Higher API cost, advanced analytics

---

## Volume Stats

- **Endpoint:** `GET /volume/chains`
- **Description:** Get volume statistics by chain. Retrieves DEX trading volume statistics for all chains.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/chains
- **Use this endpoint when:** User asks "volume by chain", "chain volume", "trading volume", "volume stats"
- **Params:** `fromDate` (string), `toDate` (string)

---

## Timeseries Volume

- **Endpoint:** `GET /volume/timeseries`
- **Description:** Retrieve timeseries volume data by chain. Gets historical volume data over time.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/timeseries
- **Use this endpoint when:** User asks "volume over time", "historical volume", "timeseries data", "volume chart"
- **Params:** `chain` (string), `timeframe` (string), `fromDate` (string), `toDate` (string)

---

## Volume Categories

- **Endpoint:** `GET /volume/categories`
- **Description:** Get volume and chain data by categories. Retrieves volume statistics grouped by token categories.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/categories
- **Use this endpoint when:** User asks "volume categories", "category list", "category volume"
- **Params:** `chain` (string), `fromDate` (string), `toDate` (string)

---

## Volume Timeseries by Category

- **Endpoint:** `GET /volume/timeseries/:category`
- **Description:** Retrieve timeseries volume data by category. Gets historical volume data for a specific category.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/volume/timeseries/:category
- **Use this endpoint when:** User asks "category volume over time"
- **Params:** `chain` (string), `timeframe` (string), `fromDate` (string), `toDate` (string)

---

## Search Tokens

- **Endpoint:** `POST /tokens/search`
- **Description:** Search tokens. Advanced token search with filtering capabilities.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/search
- **Use this endpoint when:** User asks "advanced token search", "filtered search", "search with filters"
- **Method:** POST with body `{"query": "...", "from": 0, "limit": 10}`

---

## Multiple Token Analytics

- **Endpoint:** `POST /tokens/analytics`
- **Description:** Get multiple token analytics. Retrieves analytics for multiple tokens in a single request.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/analytics
- **Use this endpoint when:** User asks "multiple token analytics", "batch analytics", "token stats for multiple tokens"
- **Method:** POST with body `{"addresses": ["0x...", ...]}`

---

## Token Analytics (Single)

- **Endpoint:** `GET /tokens/:tokenAddress/analytics`
- **Description:** Get token analytics. Retrieves comprehensive analytics data for a token.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/:tokenAddress/analytics
- **Use this endpoint when:** User asks "token stats", "detailed analytics", "token statistics", "advanced token data"
- **Auto-chain:** Yes

---

## Filtered Tokens

- **Endpoint:** `POST /discovery/tokens`
- **Description:** Get filtered tokens. Retrieves tokens based on various filter criteria.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/discovery/tokens
- **Use this endpoint when:** User asks "filter tokens", "token discovery", "tokens by liquidity", "tokens by market cap"
- **Method:** POST with filter criteria in body

---

## Discovery Token

- **Endpoint:** `GET /discovery/token`
- **Description:** Get token details. Retrieves comprehensive token information from the discovery service.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/discovery/token
- **Use this endpoint when:** User asks "token details", "discovery info"
- **Params:** `addresses` (array)

## Token Score
- **Endpoint:** `GET /tokens/{tokenAddress}/score`
- **Description:** Get token score/rating
- **Use this endpoint when:** User asks "token score", "token rating", "token safety score"
- **Params:** `chain` (string)

## Token Score Historical
- **Endpoint:** `GET /tokens/{tokenAddress}/score/historical`
- **Description:** Get historical token score
- **Use this endpoint when:** User asks "token score history", "historical rating"
- **Params:** `chain` (string)

## NFT Collection Stats
- **Endpoint:** `GET /nft/{address}/stats`
- **Description:** Get NFT collection statistics
- **Use this endpoint when:** User asks "NFT collection stats", "collection analytics", "NFT statistics"
- **Params:** `chain` (string)
- **⚠️ DEPRECATED (Dec 6, 2024):** Use Streams API instead for real-time NFT event monitoring

## Token Categories
- **Endpoint:** `GET /tokens/categories`
- **Description:** Get token categories
- **Use this endpoint when:** User asks "token categories", "token types", "token sectors"

## Tokens Trending
- **Endpoint:** `GET /tokens/trending`
- **Description:** Get trending tokens
- **Use this endpoint when:** User asks "trending tokens", "hot tokens", "popular tokens"

## Discovery Tokens (Blue Chip)
- **Endpoint:** `GET /discovery/tokens/blue-chip`
- **Description:** Get blue chip tokens
- **Use this endpoint when:** User asks "blue chip tokens", "established tokens"

## Discovery Tokens (Top Gainers)
- **Endpoint:** `GET /discovery/tokens/top-gainers`
- **Description:** Get top gaining tokens
- **Use this endpoint when:** User asks "top gainers", "gainers", "tokens going up"

## Discovery Tokens (Top Losers)
- **Endpoint:** `GET /discovery/tokens/top-losers`
- **Description:** Get top losing tokens
- **Use this endpoint when:** User asks "top losers", "losers", "tokens going down"

## Market Data - Top Tokens
- **Endpoint:** `GET /market-data/erc20s/top-tokens`
- **Description:** Get top ERC20 tokens
- **Use this endpoint when:** User asks "top tokens", "best tokens"

## Market Data - Global Market Cap
- **Endpoint:** `GET /market-data/global/market-cap`
- **Description:** Get global market cap data
- **Use this endpoint when:** User asks "global market cap", "total market cap"

## Market Data - Global Volume
- **Endpoint:** `GET /market-data/global/volume`
- **Description:** Get global trading volume
- **Use this endpoint when:** User asks "global volume", "total trading volume"

## Market Data - NFT Top Collections
- **Endpoint:** `GET /market-data/nfts/top-collections`
- **Description:** Get top NFT collections
- **Use this endpoint when:** User asks "top NFT collections", "best NFT collections"

## Tokens Analytics Timeseries
- **Endpoint:** `GET /tokens/analytics/timeseries`
- **Description:** Get analytics timeseries data
- **Use this endpoint when:** User asks "analytics over time", "historical analytics"

## Volume Timeseries by Category
- **Endpoint:** `GET /volume/timeseries/{categoryId}`
- **Description:** Get volume timeseries by category
- **Use this endpoint when:** User asks "category volume over time"

## Volume Categories
- **Endpoint:** `GET /volume/categories`
- **Description:** Get volume categories
- **Use this endpoint when:** User asks "volume categories", "category list"

**⚠️ NOTE:** The following endpoints documented in earlier versions DO NOT exist:
- `/token/:address/stats` → Use `/tokens/{tokenAddress}/analytics` instead
- `/wallets/:address/tokens/allocation` → Not available in API
- `/token/:address/price/history` → Not available (price history doesn't exist)
- `/market/data` → Use specific `/market-data/*` endpoints instead
