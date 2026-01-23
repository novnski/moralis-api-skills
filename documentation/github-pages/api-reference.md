---
layout: default
title: API Reference
---

# API Reference

The Moralis API Skills wrap the Moralis Data APIs. Each skill corresponds to a specific domain of the API.

## EVM & Solana API Skills

These skills are part of the `web3-api-skills` plugin.

| Skill | EVM Support | Solana Support | Documentation |
|-------|-------------|----------------|---------------|
| **Wallet API** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/web3-api-skills/skills/web3-wallet-api/references) |
| **Token API** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/web3-api-skills/skills/web3-token-api/references) |
| **NFT API** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/web3-api-skills/skills/web3-nft-api/references) |
| **Price API** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/web3-api-skills/skills/web3-price-api/references) |
| **DeFi API** | ✅ | ❌ | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/web3-api-skills/skills/web3-defi-api/references) |
| **Blockchain API** | ✅ | ❌ | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/web3-api-skills/skills/web3-blockchain-api/references) |
| **Entity API** | ✅ | ❌ | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/web3-api-skills/skills/web3-entity-api/references) |
| **Utils** | ✅ | ❌ | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/web3-api-skills/skills/web3-utils/references) |
| **Premium** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/web3-api-skills/skills/web3-premium/references) |

## Streams API Skills

This skill is part of the `streams-api-skills` plugin.

| Skill | Description | Documentation |
|-------|-------------|---------------|
| **Streams API** | Real-time blockchain event monitoring | [Endpoints](https://github.com/noviulian/moralis-skills/tree/main/plugins/streams-api-skills/skills/streams-api/references) |

## Common Parameters

### Chain

For EVM endpoints, the `chain` parameter accepts both hex strings and common names:

- `0x1` or `eth` (Ethereum Mainnet)
- `0x89` or `polygon` (Polygon Mainnet)
- `0x38` or `bsc` (BNB Smart Chain)
- ... and many more.

> **Tip:** Using hex values (e.g., `0x1`) saves tokens as the skill doesn't need to normalize the chain name.

### Address

- **EVM:** `0x` prefixed hexadecimal string (42 characters).
- **Solana:** Base58 encoded string (32-44 characters).

The Unified Query Client automatically detects the chain type based on the address format.
