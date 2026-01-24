---
name: moralis-score-api
description: Query token security scores, spam detection, and quality assessment for EVM chains. Use when user asks about token safety, security scores, spam filtering, or token trust ratings.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
  version: "1.1.0"
  author: web3-skills
  tags: [web3, blockchain, security, score, spam, token-safety, evm]
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

# Web3 Score API

Query token security scores, spam detection, and quality assessment for EVM chains.

## When to Use This Skill

Use this skill when the user asks about:

**Token Security:**
- "Token score", "Token trust score", "Is this token safe?"
- "Token rating", "Token quality score", "Security assessment"
- "Verified token", "Is this token verified?"

**Spam Detection:**
- "Spam tokens", "Filter spam", "Exclude spam tokens"
- "Honeypot tokens", "Scam tokens", "Rug pull detection"
- "Unverified contracts", "Verified collections"

**Token Safety:**
- "Safe to buy?", "Is this token legitimate?"
- "Token security check", "Contract verification"
- "Risk assessment", "Token trustworthiness"

**⚠️ NOT for:**
- Basic token prices → Use `web3-price-api` or `web3-token-api`
- Token metadata → Use `web3-token-api`
- Real-time monitoring → Use `streams-api`

## Setup

```bash
/moralis-api-key
```

## Common Queries

### Get Token Security Score

**Endpoint:** `GET /tokens/:tokenAddress/score`
**Function Name:** `getTokenScore`
**Description:** Check token trust/quality score with metrics including price, volume, liquidity, transaction counts, and supply information.

**Query token score:**

```bash
cd $SKILL_DIR
node -e "
const { query, createSpamFilter } = require('./query');

// Get token score
query('/tokens/:tokenAddress/score', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
})
  .then(data => console.log('Token Score:', data))
  .catch(console.error);
"
```

**Score interpretation:**
- High scores indicate safer, more established tokens
- Low scores may indicate spam, scams, or unverified projects
- Use in combination with other data points for decision making

### Spam Filtering with Queries

**Filter spam tokens from results:**

```bash
cd $SKILL_DIR
node -e "
const { query, createSpamFilter } = require('./query');

// Get wallet tokens without spam
query('/wallets/:address/tokens', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: createSpamFilter({
    excludeSpam: true,
    excludeUnverified: true
  })
})
  .then(data => console.log('Verified tokens:', data.result.length))
  .catch(console.error);
"
```

**Only verified contracts:**

```bash
cd $SKILL_DIR
node -e "
const { query, createVerifiedFilter } = require('./query');

// Get NFTs from verified collections only
query('/:address/nft', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: createVerifiedFilter({ onlyVerified: true })
})
  .then(data => console.log('Verified NFTs:', data.result.length))
  .catch(console.error);
"
```

## Spam Filter Options

The `createSpamFilter()` helper creates filter parameters:

```javascript
const { createSpamFilter } = require('./query');

// Exclude spam tokens
createSpamFilter({ excludeSpam: true })

// Exclude unverified contracts
createSpamFilter({ excludeUnverified: true })

// Only include verified contracts
createSpamFilter({ onlyVerified: true })

// Combine filters
createSpamFilter({
  excludeSpam: true,
  excludeUnverified: true
})
```

## Verified Filter Options

The `createVerifiedFilter()` helper for verified contracts:

```javascript
const { createVerifiedFilter } = require('./query');

// Only specific verified contracts
createVerifiedFilter({
  verifiedContracts: ['0xabc...', '0xdef...']
})

// Only verified contracts
createVerifiedFilter({ onlyVerified: true })
```

## Token Score Response Format

```json
{
  "token": {
    "address": "0x...",
    "name": "Token Name",
    "symbol": "SYMBOL"
  },
  "score": 85,
  "risk": "low",
  "indicators": {
    "verified": true,
    "spam": false,
    "honeypot": false,
    "liquidity": "high"
  }
}
```

## Risk Levels

- **Low:** Established tokens, verified contracts, high liquidity
- **Medium:** Newer tokens, unverified but growing, moderate liquidity
- **High:** New tokens, unverified, low liquidity, potential spam

## Best Practices

1. **Always check scores** before interacting with new tokens
2. **Use spam filters** when querying wallet tokens or NFTs
3. **Combine with other data:** Price, volume, holder count
4. **Verify contracts:** Use onlyVerified flag for important queries
5. **Cross-reference:** Check multiple indicators, not just score

## Common Pitfalls

1. **Relying solely on score:** Combine with price, volume, age
2. **Ignoring new legitimate projects:** New tokens have lower scores
3. **Not filtering spam:** Always use filters for wallet queries
4. **Assuming verified = safe:** Verification doesn't guarantee safety

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
- [Web3 Token API](../web3-token-api/SKILL.md) - For token prices and metadata
