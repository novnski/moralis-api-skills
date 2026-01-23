# EVM Wallet API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question                        | Endpoint                           | Example                        |
| ------------------------------------ | ---------------------------------- | ------------------------------ |
| "What's the ETH/balance?"            | `/:address/balance`                | Native token (ETH, MATIC, BNB) |
| "What tokens does this wallet hold?" | `/wallets/:address/tokens`         | All tokens + USD prices        |
| "What NFTs does this wallet own?"    | `/:address/nft`                    | All NFTs                       |
| "Show transaction history"           | `/wallets/:address/history`        | Full activity (all types)      |
| "Show DeFi positions"                | `/wallets/:address/defi/positions` | Liquidity, staking, lending    |
| "What's the total net worth?"        | `/wallets/:address/net-worth`      | Across all chains              |
| "Token transfers in/out?"            | `/wallets/:address/history`        | Full activity (all types)      |
| "NFT transfers?"                     | `/wallets/:address/history`        | Full activity (all types)      |
| "Token swaps?"                       | `/wallets/:address/swaps`          | DEX swap history               |
| "Token approvals?"                   | `/wallets/:address/approvals`      | Approved spenders              |

## Key Endpoint Patterns

- **Native balance**: `/:address/balance` (NOT `/wallets/:address/balance`)
- **Wallet-level data** (tokens, DeFi, swaps): `/wallets/:address/*`
- **Wallet activity history** (native, ERC20, NFT, internal): `/wallets/:address/history`
- **NFT data**: `/:address/nft*`

---

## Get Wallet History

- **Endpoint:** `GET /wallets/:address/history`
- **Description:** Get full wallet history including all activity such as ERC20 transfers, NFT tranfers, INternal transactions, Native transactions
- **Use this endpoint when:** User asks for "complete history", "all activity", "wallet activity summary", "everything this wallet has done", "token transfers", "ERC20 transfers", "tokens sent/received", "token transaction history", "nft transfer history"
- **Params:** `limit`, `cursor`

## Get Native Balance

- **Endpoint:** `GET /:address/balance`
- **Description:** Get native token balance (ETH, MATIC, BNB, etc.)
- **Use this endpoint when:** User asks "how much ETH/BNB/MATIC", "what's the balance", "native token balance", "how much [chain token]"
- **⚠️ IMPORTANT:** This endpoint is `/:address/balance`, NOT `/wallets/:address/balance`
- **Auto-chain:** Yes (from ?chain parameter)

## Get Token Balances with Prices

- **Endpoint:** `GET /wallets/:address/tokens`
- **Description:** Get tokens with USD prices
- **Use this endpoint when:** User asks "what tokens", "token holdings", "ERC20 tokens", "what coins does this wallet have", "show me the tokens"
- **Auto-chain:** Yes

## Get NFTs

- **Endpoint:** `GET /:address/nft`
- **Description:** Get all NFTs owned by wallet
- **Use this endpoint when:** User asks "what NFTs", "NFT collection", "what NFTs does this wallet own", "show NFTs"
- **Auto-chain:** Yes
- **Params:** `format` (decimal), `limit`, `cursor`

## Get NFT Collections

- **Endpoint:** `GET /:address/nft/collections`
- **Description:** Get NFT collections summary
- **Use this endpoint when:** User asks "what NFT collections", "NFT portfolio summary", "group by collection"
- **Auto-chain:** Yes

## Get DeFi Summary

- **Endpoint:** `GET /wallets/:address/defi/summary`
- **Description:** Get DeFi protocol exposure
- **Use this endpoint when:** User asks "DeFi summary", "what protocols", "DeFi overview", "protocol exposure"
- **Auto-chain:** Yes

## Get DeFi Positions

- **Endpoint:** `GET /wallets/:address/defi/positions`
- **Description:** Get detailed DeFi positions
- **Use this endpoint when:** User asks "DeFi positions", "liquidity positions", "staking", "lending positions", "yield farming", "where is the liquidity"
- **Auto-chain:** Yes

## Get Net Worth

- **Endpoint:** `GET /wallets/:address/net-worth`
- **Description:** Get total net worth across all chains
- **Use this endpoint when:** User asks "net worth", "total value", "what's it worth", "total portfolio value", "across all chains"
- **Auto-chain:** No (aggregated)

## Get Profitability

- **Endpoint:** `GET /wallets/:address/profitability`
- **Description:** Get PnL data
- **Use this endpoint when:** User asks "profitability", "PnL", "profit and loss", "gains", "performance"
- **Auto-chain:** Yes

## Get Wallet Stats

- **Endpoint:** `GET /wallets/:address/stats`
- **Description:** Get wallet statistics
- **Use this endpoint when:** User asks "wallet stats", "statistics", "wallet metrics", "activity stats"
- **Auto-chain:** Yes

## Get Active Chains

- **Endpoint:** `GET /wallets/:address/chains`
- **Description:** Get chains where wallet has activity
- **Use this endpoint when:** User asks "what chains", "which networks", "active chains", "where does this wallet have activity"
- **Auto-chain:** No

## Resolve ENS

- **Endpoint:** `GET /resolve/:address/reverse`
- **Description:** Get ENS domain for address
- **Use this endpoint when:** User asks "ENS name", "ENS domain", "what's the ENS", "reverse resolve"
- **Auto-chain:** No

## Get Token Swaps

- **Endpoint:** `GET /wallets/:address/swaps`
- **Description:** Get token swap history
- **Use this endpoint when:** User asks "swaps", "token swaps", "DEX trades", "trading history", "swap history"
- **Auto-chain:** Yes
- **Params:** `limit`, `from`, `to`

## Get Token Approvals

- **Endpoint:** `GET /wallets/:address/approvals`
- **Description:** Get token approvals
- **Use this endpoint when:** User asks "approvals", "token approvals", "what contracts are approved", "allowances", "permissions"
- **Auto-chain:** Yes

## Note on Transfers

For ERC20 transfers, NFT transfers, internal transactions, and native transfers, use the unified history endpoint:

- **Endpoint:** `GET /wallets/:address/history`
- **Use this endpoint when:** User asks for "token transfers", "ERC20 transfers", "tokens sent/received", "token transaction history", "NFT transfers", "NFT sent/received"

## Get Transactions

- **Endpoint:** `GET /:address`
- **Description:** Get native token transactions
- **Use this endpoint when:** User asks "transactions", "tx history", "native transfers", "ETH/BNB/MATIC transfers"
- **Auto-chain:** Yes

## Get Decoded Transactions

- **Endpoint:** `GET /:address/verbose`
- **Description:** Get decoded transactions with method names
- **Use this endpoint when:** User asks "decoded transactions", "what functions were called", "transaction details", "verbose transactions"
- **Auto-chain:** Yes
