# EVM DeFi API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "DeFi summary?" | `/wallets/:address/defi/summary` | Protocol overview |
| "DeFi positions?" | `/wallets/:address/defi/positions` | All positions |
| "[Protocol] positions?" | `/wallets/:address/defi/:protocol/positions` | Specific protocol |

## Key Endpoint Patterns

- **Summary view:** `/wallets/:address/defi/summary` (aggregated by protocol)
- **Detailed positions:** `/wallets/:address/defi/positions` (all positions with details)
- **Protocol-specific:** `/wallets/:address/defi/:protocol/positions` (filter by protocol)
- **Auto-chain:** All endpoints support multiple EVM chains

---

## Get DeFi Summary

- **Endpoint:** `GET /wallets/:address/defi/summary`
- **Description:** Get DeFi protocols by wallet. Retrieves a summary of all DeFi protocols the wallet has interacted with, showing total value and protocol exposure.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/defi/summary
- **Use this endpoint when:** User asks "DeFi summary", "what protocols", "DeFi overview", "protocol exposure", "which DeFi protocols"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - Wallet address- `chain` (optional, string) - The chain to query

---

## Get DeFi Positions Summary

- **Endpoint:** `GET /wallets/:address/defi/positions`
- **Description:** Get DeFi positions by wallet. Retrieves detailed DeFi positions across all protocols including liquidity, staking, lending, and yield farming positions.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/defi/positions
- **Use this endpoint when:** User asks "DeFi positions", "liquidity positions", "staking", "yield farming", "lending positions", "where is the liquidity"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - Wallet address- `chain` (optional, string) - The chain to query

---

## Get DeFi Positions by Protocol

- **Endpoint:** `GET /wallets/:address/defi/:protocol/positions`
- **Description:** Get detailed DeFi positions by wallet and protocol. Retrieves detailed positions for a specific DeFi protocol.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/defi/:protocol/positions
- **Use this endpoint when:** User asks "Aave positions", "Uniswap positions", "positions in [protocol]", "what's in [protocol]"
- **Auto-chain:** Yes
- **Protocols:** aave-v2, aave-v3, compound-v2, compound-v3, uniswap-v2, uniswap-v3, sushiswap, curve, yearn-v2, yearn-v3, etc.
- **Params:**- `address` (required, string) - Wallet address- `protocol` (required, defiProtocolList) - The protocol to query- `chain` (optional, string) - The chain to query

## Supported DeFi Protocols

### Lending
- Aave V2, Aave V3
- Compound V2, Compound V3

### DEX
- Uniswap V2, Uniswap V3
- SushiSwap
- PancakeSwap V2, PancakeSwap V3
- Curve

### Yield
- Yearn V2, Yearn V3
- Enzyme

### Staking
- Lido
- Rocket Pool
