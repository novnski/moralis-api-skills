---
name: moralis-utils
description: Get API information including version, endpoint weights, and usage stats. Use for debugging and API management.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed). EVM chains only.
metadata:
  version: "1.1.0"
  author: web3-skills
  tags: [web3, utils, api, debug]
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

# Web3 Utils

API utilities and information.

## When to Use This Skill

Use this skill when the user asks about:

**API Information:**
- "API version", "What version is this?", "API info"
- "Endpoint weights", "API costs", "Rate limits", "Query weights"
- "API status", "API info", "System information"

**Debugging:**
- "Debug API", "Check API", "API configuration"
- "Endpoint information", "API details"

**⚠️ NOT for:**
- Wallet/token/NFT/transaction data → Use specific data API skills
- Blockchain queries → Use `web3-wallet-api`, `web3-blockchain-api`, etc.
- Price queries → Use `web3-price-api`

## Common Pitfalls

### This is a Utility Skill
- **This skill provides API metadata only** - not blockchain data
- Use other skills for actual data queries (wallets, tokens, prices, etc.)

### When to Use Endpoint Weights
- **Planning API usage:** Use this skill to check query costs before making requests
- **Debugging rate limits:** Check which endpoints are consuming your quota
- **Optimization:** Find lighter-weight alternatives for common queries

## Setup

```bash
/moralis-api-key
```

## Common Queries

### Get API Version

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/web3/version')
  .then(data => console.log('API Version:', data.version))
  .catch(console.error);
"
```

### Get Endpoint Weights

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/info/endpointWeights')
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
