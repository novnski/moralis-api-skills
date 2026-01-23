# Solana Price API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Solana token price?" | `/token/:network/:address/price` | SPL token price |
| "Multiple token prices?" | `/token/:network/prices` | Batch prices |
| "OHLCV data?" | `/token/:network/pairs/:address/ohlcv` | Candlesticks |

## Key Endpoint Patterns

- **Token prices:** `/token/:network/:address/price` (current price)
- **Batch prices:** `/token/:network/prices` (multiple tokens)
- **OHLCV data:** `/token/:network/pairs/:address/ohlcv` (candlesticks)
- **Network parameter:** `mainnet` or `devnet`

**⚠️ IMPORTANT Limitations:**
- No native SOL price endpoint (use external APIs)
- Limited historical price data
- No NFT floor price endpoints for Solana

---

## Get Token Price

- **Endpoint:** `GET /token/:network/:address/price`
- **Description:** Get token price. Retrieves the current price of a Solana SPL token in USD.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/:address/price
- **Use this endpoint when:** User asks "Solana token price", "SPL token price", "how much is this token", "token price USD"
- **Networks:** mainnet, devnet
- **Params:**- `network` (required, string) - The network to query- `address` (required, string) - The address to query

---

## Get Multiple Token Prices

- **Endpoint:** `POST /token/:network/prices`
- **Description:** Get multiple token prices. Retrieves prices for multiple SPL tokens in a single request.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/prices
- **Use this endpoint when:** User asks "multiple Solana token prices", "batch SPL prices", "prices for several tokens"
- **Method:** POST with body `{"addresses": ["...", ...]}`
- **Networks:** mainnet, devnet
- **Params:**- `network` (required, string) - The network to query

---

## Get OHLCV Candlesticks

- **Endpoint:** `GET /token/:network/pairs/:address/ohlcv`
- **Description:** Get OHLCV candlesticks by pair address. Retrieves Open-High-Low-Close-Volume data for a Solana DEX trading pair.
- **API Reference:** https://solana-gateway.moralis.io/token/:network/pairs/:address/ohlcv
- **Use this endpoint when:** User asks "candlesticks", "OHLCV", "price chart data", "candle data"
- **Networks:** mainnet, devnet
- **Params:**- `network` (required, string) - The network to query- `address` (required, string) - The address to query (pair address)- `fromDate` (required, string) - The starting date (format in seconds or datestring)- `toDate` (required, string) - The ending date (format in seconds or datestring)- `timeframe` (required, string) - The interval of the candle stick- `currency` (required, string) - The currency format- `cursor` (optional, string) - The cursor to the next page- `limit` (optional, integer) - The limit per page

---

## Solana API Limitations

The Solana Price API has **limited** endpoints compared to EVM:

**❌ Not Available:**
- Native SOL price (use external APIs like CoinGecko, CoinMarketCap)
- Historical NFT floor prices
- NFT sale prices by token/collection
- Advanced market data for NFTs

**✅ Available:**
- Current SPL token prices (single token)
- Batch SPL token prices (multiple tokens)
- OHLCV data for DEX pairs

For more advanced price data on Solana, consider using:
- DEX-specific APIs (Jupiter aggregator, Raydium, Orca)
- External price aggregators (CoinGecko, CoinMarketCap, DexScreener)
- Marketplace APIs for NFT prices (Tensor, Magic Eden)
