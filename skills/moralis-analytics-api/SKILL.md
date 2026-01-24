---
name: moralis-analytics-api
description: Query advanced Web3 analytics including token analytics, time series data, volume statistics, and holder analytics for EVM chains. Use when user asks about token analytics, historical data, volume trends, or holder statistics.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
  version: "1.1.0"
  author: web3-skills
  tags: [web3, blockchain, analytics, token, volume, holders, evm]
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

# Web3 Analytics API

Query advanced Web3 analytics for token analytics, time series data, volume statistics, and holder analytics on EVM chains.

## When to Use This Skill

Use this skill when the user asks about:

**Token Analytics:**
- "Token analytics", "Token statistics", "Detailed token data"
- "Historical token data", "Token performance over time"
- "Token trends", "Price history", "Volume trends"

**Holder Analytics:**
- "Holder count over time", "Historical holders", "Holder growth"
- "Token distribution", "Holder statistics"

**Volume Analytics:**
- "Trading volume", "Volume by chain", "Volume trends"
- "Volume timeseries", "Historical volume data"

**Market Data:**
- "Top profitable wallets", "Best traders", "Profitable addresses"
- "Token stats", "Market statistics"

**⚠️ NOT for:**
- Simple token prices → Use `web3-price-api` or `web3-token-api`
- Basic token metadata → Use `web3-token-api`
- Real-time event monitoring → Use `streams-api`

## Common Pitfalls

### Confusion: Analytics vs Basic Token Data
- **Advanced analytics:** Use this skill for timeseries, volume, holder stats
- **Basic price/metadata:** Use `web3-token-api` or `web3-price-api`

### Confusion: Time Series vs Current Data
- **Historical trends:** Use this skill with timeseries endpoints
- **Current snapshot:** Use `web3-token-api` token analytics

## Setup

```bash
/moralis-api-key
```

## Common Queries

### Get Token Analytics

**Endpoint:** `GET /tokens/:tokenAddress/analytics`
**Function Name:** `getTokenAnalytics`
**Description:** Detailed token analytics including buy volume, sell volume, buyers, sellers, transactions, liquidity, and FDV trends.

**Query token analytics:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/:address/analytics', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
})
  .then(data => console.log('Analytics:', data))
  .catch(console.error);
"
```

### Get Time Series Analytics

**Endpoint:** `POST /tokens/analytics/timeseries`
**Function Name:** `getTimeSeriesTokenAnalytics`
**Description:** Historical token analytics over time, including buy volume, sell volume, liquidity, and FDV timeseries data.

**Query time-series analytics:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/analytics/timeseries', {
  method: 'POST',
  params: { timeframe: '7d' },
  body: {
    tokens: [
      { chain: 'eth', tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F' }
    ]
  }
})
  .then(data => console.log('Time Series:', data.result))
  .catch(console.error);
"
```

### Get Volume Timeseries

**Endpoint:** `GET /volume/timeseries`
**Function Name:** `getVolumeTimeseries`
**Description:** Historical volume data by chain.

**Query volume history:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/volume/timeseries', {
  params: {
    chain: '0x1',
    from_date: '2024-01-01',
    to_date: '2024-12-31'
  }
})
  .then(data => console.log('Volume History:', data.result))
  .catch(console.error);
"
```

### Get Historical Token Holder Stats

**Endpoint:** `GET /erc20/:tokenAddress/holders/historical`
**Function Name:** `getHistoricalTokenHolders`
**Description:** Track holder count over time.

**Query holder history:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/:tokenAddress/holders/historical', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { limit: 30 }
})
  .then(data => console.log('Holder History:', data.result))
  .catch(console.error);
"
```

### Get Token Statistics

**Endpoint:** `GET /tokens/:tokenAddress/analytics`
**Function Name:** `getTokenAnalytics`
**Description:** Token statistics (same as Get Token Analytics above).

**Query token stats:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/:address/analytics', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
})
  .then(data => console.log('Stats:', data))
  .catch(console.error);
"
```

### Get Multiple Token Analytics

**Endpoint:** `POST /tokens/analytics`
**Function Name:** `getMultipleTokenAnalytics`
**Description:** Batch analytics for multiple tokens (up to 200).

**Query multiple tokens:**

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/analytics', {
  method: 'POST',
  body: {
    tokens: [
      { chain: 'eth', tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F' },
      { chain: 'eth', tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' }
    ]
  }
})
  .then(data => console.log('Batch Analytics:', data.result))
  .catch(console.error);
"
```

## Pagination

Many analytics endpoints return paginated results. Use the `cursor` and `limit` parameters:

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

query('/erc20/:tokenAddress/holders/historical', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { limit: 30, cursor: null }
})
  .then(data => {
    console.log('Page 1:', data.result.length);
    return data;
  })
  .catch(console.error);
"
```

## Date Format

All date parameters support ISO 8601 format:

- Full datetime: `2024-01-01T00:00:00Z`
- Date only: `2024-01-01`
- Relative time: `1 day ago`, `1 week ago`, `1 month ago`

## Response Format

Analytics responses return JSON with historical data points:

```json
{
  "result": [
    {
      "date": "2024-01-01",
      "value": 12345
    }
  ]
}
```

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
