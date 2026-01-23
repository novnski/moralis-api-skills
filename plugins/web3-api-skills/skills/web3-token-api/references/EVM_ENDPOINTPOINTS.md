# EVM Token API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "What's the token price?" | `/erc20/:address/price` | Single token price |
| "Multiple token prices" | `/erc20/prices` | Batch prices |
| "Token metadata/info" | `/erc20/metadata` | Name, symbol, decimals |
| "Trading pairs?" | `/erc20/:address/pairs` | DEX pairs |
| "Token swaps?" | `/erc20/:address/swaps` | Swap history |
| "Who owns this token?" | `/erc20/:address/owners` | Token holders |
| "Token transfers?" | `/erc20/:address/transfers` | Transfer events |
| "Search for tokens" | `/erc20/search` | By name/symbol |
| "Trending tokens?" | `/trending/tokens` | Social sentiment |
| "Token stats?" | `/erc20/:address/stats` | Market statistics |
| "Token balance?" | `/wallets/:address/tokens` | Token balances for wallet |

## Key Endpoint Patterns

- **Single token operations:** `/erc20/:address/*`
- **Batch operations:** `/erc20/*` (no `:address`)
- **Pair-based data:** `/pairs/:address/*`
- **Metadata returns:** name, symbol, decimals, logos, contract info

---

## Get Token Price
- **Endpoint:** `GET /erc20/:address/price`
- **Description:** Get current token price in USD
- **Use this endpoint when:** User asks "token price", "how much is this token worth", "current price", "USD price"
- **Auto-chain:** Yes

## Get Multiple Token Prices
- **Endpoint:** `GET /erc20/prices`
- **Description:** Get prices for multiple tokens at once
- **Use this endpoint when:** User asks "multiple token prices", "price of these tokens", "batch prices", "check prices for..."
- **Params:** `addresses` (comma-separated)

## Get Token Metadata
- **Endpoint:** `GET /erc20/metadata`
- **Description:** Get token metadata (name, symbol, decimals, logo)
- **Use this endpoint when:** User asks "token metadata", "token info", "token details", "what's the symbol/decimals", "token name"
- **Params:** `addresses` (comma-separated)

## Get Token Pairs
- **Endpoint:** `GET /erc20/:address/pairs`
- **Description:** Get DEX pairs for a token
- **Use this endpoint when:** User asks "trading pairs", "DEX pairs", "where is this token traded", "liquidity pairs", "available pairs"
- **Params:** `limit`, `cursor`

## Get Token Swaps by Address
- **Endpoint:** `GET /erc20/:address/swaps`
- **Description:** Get swaps for a specific token
- **Use this endpoint when:** User asks "token swaps", "swap history", "trading activity", "who's swapping this token"
- **Params:** `limit`, `from`, `to`

## Get Swaps by Pair Address
- **Endpoint:** `GET /pairs/:address/swaps`
- **Description:** Get swaps for a DEX pair
- **Use this endpoint when:** User asks "pair swaps", "trades on this pair", "pair volume"
- **Params:** `limit`, `from`, `to`

## Get Token Owners
- **Endpoint:** `GET /erc20/:address/owners`
- **Description:** Get token holders/owners
- **Use this endpoint when:** User asks "token holders", "who owns this token", "whale holders", "top holders"
- **Params:** `limit`, `cursor`

## Get Token Transfers
- **Endpoint:** `GET /erc20/:address/transfers`
- **Description:** Get ERC20 transfer events
- **Use this endpoint when:** User asks "token transfers", "transfer history", "token movement", "who's transferring"
- **Params:** `limit`, `cursor`, `from`, `to`

## Search Tokens
- **Endpoint:** `GET /tokens/search` (via `searchToken()` helper)
- **Description:** Search for tokens by name, symbol, or address across all chains
- **Use this endpoint when:** User asks "search tokens", "find tokens", "look up token", "token search"
- **Params:** `query`, `chains` (optional array of hex chain IDs)
- **Usage:**
  - Search all: `searchToken('pepe')`
  - Search specific chain: `searchToken('pepe', '0x1')`
  - Search multiple: `searchToken('pepe', ['0x1', '0x89'])`

## Get Trending Tokens
- **Endpoint:** `GET /trending/tokens`
- **Description:** Get trending tokens on social media
- **Use this endpoint when:** User asks "trending tokens", "hot tokens", "popular tokens", "what's trending"
- **Params:** `chain`, `limit`

## Get Allowance
- **Endpoint:** `GET /erc20/:address/allowance`
- **Description:** Check token allowance
- **Use this endpoint when:** User asks "token allowance", "check approval", "how much is approved"
- **Params:** `ownerAddress`, `spenderAddress`

## Get Total Supply
- **Endpoint:** `GET /erc20/:address/totalSupply`
- **Description:** Get token total supply
- **Use this endpoint when:** User asks "total supply", "circulating supply", "max supply"

## Get Token Balance
- **Endpoint:** `GET /wallets/:address/tokens`
- **Description:** Get token balances for a wallet
- **Use this endpoint when:** User asks "token balance", "how many tokens does this wallet have", "check wallet token balances"

## Get Token Stats
- **Endpoint:** `GET /erc20/:address/stats`
- **Description:** Get token statistics
- **Use this endpoint when:** User asks "token stats", "token statistics", "market data", "token metrics"
- **Params:** `chain`

## Get Token Price History
- **Endpoint:** `GET /erc20/:address/price/history`
- **Description:** Get historical price data
- **Use this endpoint when:** User asks "price history", "historical prices", "past prices", "price over time"
- **Params:** `chain`, `from`, `to`, `interval`
