---
name: moralis-defi-api
description: Query DeFi positions, protocol exposure, and liquidity pool positions on EVM chains. Get summary of all DeFi protocols used by a wallet, detailed positions per protocol, and portfolio allocation across DeFi platforms. Use when user asks about DeFi, liquidity pools, yield farming, or protocol exposure.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed). EVM chains only - not supported on Solana.
metadata:
  version: "1.1.0"
  author: web3-skills
  tags: [web3, blockchain, defi, liquidity, yield, evm]
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

# Web3 DeFi API (EVM Only)

Query DeFi positions and protocol exposure on EVM chains.

**Important:** This skill is **EVM only**. Solana DeFi is tracked through the Token API swaps endpoint.

## When to Use This Skill

Use this skill when the user asks about:

**DeFi Positions:**
- "DeFi positions", "Liquidity positions", "Where is the liquidity?"
- "Yield farming", "Staking positions", "Lending positions"
- "DeFi portfolio", "DeFi exposure", "Protocol positions"

**Protocol Exposure:**
- "What DeFi protocols?", "Which protocols?", "DeFi summary"
- "Protocol usage", "DeFi overview", "Protocol exposure"

**Protocol-Specific Data:**
- "Aave positions", "Compound positions", "Uniswap positions"
- "Positions in [protocol]", "What's in [protocol]?"

**⚠️ NOT for:**
- Wallet token holdings → Use `web3-wallet-api` with `/wallets/:address/tokens`
- Token swaps/trades → Use `web3-wallet-api` with `/wallets/:address/swaps` or `web3-token-api`
- Solana DeFi → Use `web3-token-api` swap endpoints (Raydium, Orca, Jupiter)
- Transaction history → Use `web3-wallet-api` or `web3-blockchain-api`

## Common Pitfalls

### Confusion: DeFi Positions vs Token Holdings
- **DeFi positions only:** Use this skill (`web3-defi-api`) with `/wallets/:address/defi/positions`
- **All tokens in wallet:** Use `web3-wallet-api` with `/wallets/:address/tokens` (includes DeFi tokens)

### Confusion: DeFi Summary vs DeFi Positions
- **Protocol summary:** Use this skill (`web3-defi-api`) with `/wallets/:address/defi/summary` (overview by protocol)
- **Detailed positions:** Use this skill (`web3-defi-api`) with `/wallets/:address/defi/positions` (full position details)

### Confusion: EVM DeFi vs Solana DeFi
- **EVM DeFi:** Use this skill (`web3-defi-api`) for Aave, Compound, Uniswap, Curve, Yearn, etc.
- **Solana DeFi:** Use `web3-token-api` swap endpoints for Raydium, Orca, Jupiter activity

### Confusion: Wallet Swaps vs DeFi Positions
- **Swap history:** Use `web3-wallet-api` with `/wallets/:address/swaps` (all DEX trades)
- **Current positions:** Use this skill (`web3-defi-api`) with `/wallets/:address/defi/positions` (active liquidity)

## Setup

```bash
/moralis-api-key
```

## How It Works

These endpoints aggregate DeFi protocol data including:
- Aave, Compound, Lido
- Uniswap, SushiSwap, PancakeSwap
- Yearn, Enzyme, and many more

## Common Queries

### Get DeFi Summary (All Protocols)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/defi/summary', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(data => console.log('Protocols found:', data.result.length))
  .catch(console.error);
"
```

**Response:**
```json
{
  "result": [
    {
      "protocol": "Uniswap V3",
      "position_count": 5,
      "total_usd_value": 15000.50
    },
    {
      "protocol": "Aave V3",
      "position_count": 2,
      "total_usd_value": 5000.00
    }
  ]
}
```

### Get DeFi Positions Summary

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/defi/positions', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get Positions by Protocol

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/defi/:protocol/positions', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
})
  .then(data => console.log('Positions:', data.result?.length || 0))
  .catch(console.error);
"
```

**Supported protocols:** `aave-v2`, `aave-v3`, `compound-v3`, `uniswap-v3`, `curve`, `yearn-v3`, etc.

## Supported Chains

eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, etc.

## Solana DeFi

For Solana DeFi tracking, use the **Token API** swap endpoints:
- `getSwapsByWalletAddress`
- `getSwapsByTokenAddress`
- `getSwapsByPairAddress`

These show activity on Raydium, Orca, Jupiter, etc.

## Response Format

```json
{
  "result": [
    {
      "protocol": "Uniswap V3",
      "position_type": "liquidity_pool",
      "token0": "USDC",
      "token1": "ETH",
      "usd_value": 5000.00
    }
  ]
}
```

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
- [Usage Examples](references/EXAMPLES.md)
