# EVM Wallet API Endpoints

## Get Wallet History
- **Endpoint:** `GET /wallets/:address/history`
- **Description:** Get full wallet history including all activity
- **Params:** `limit`, `cursor`

## Get Native Balance
- **Endpoint:** `GET /:address/balance`
- **Description:** Get native token balance (ETH, MATIC, BNB, etc.)
- **Auto-chain:** Yes (from ?chain parameter)

## Get Token Balances with Prices
- **Endpoint:** `GET /wallets/:address/tokens`
- **Description:** Get tokens with USD prices
- **Auto-chain:** Yes

## Get NFTs
- **Endpoint:** `GET /:address/nft`
- **Description:** Get all NFTs owned by wallet
- **Auto-chain:** Yes
- **Params:** `format` (decimal), `limit`, `cursor`

## Get NFT Collections
- **Endpoint:** `GET /:address/nft/collections`
- **Description:** Get NFT collections summary
- **Auto-chain:** Yes

## Get DeFi Summary
- **Endpoint:** `GET /wallets/:address/defi/summary`
- **Description:** Get DeFi protocol exposure
- **Auto-chain:** Yes

## Get DeFi Positions
- **Endpoint:** `GET /wallets/:address/defi/positions`
- **Description:** Get detailed DeFi positions
- **Auto-chain:** Yes

## Get Net Worth
- **Endpoint:** `GET /wallets/:address/net-worth`
- **Description:** Get total net worth across all chains
- **Auto-chain:** No (aggregated)

## Get Profitability
- **Endpoint:** `GET /wallets/:address/profitability`
- **Description:** Get PnL data
- **Auto-chain:** Yes

## Get Wallet Stats
- **Endpoint:** `GET /wallets/:address/stats`
- **Description:** Get wallet statistics
- **Auto-chain:** Yes

## Get Active Chains
- **Endpoint:** `GET /wallets/:address/chains`
- **Description:** Get chains where wallet has activity
- **Auto-chain:** No

## Resolve ENS
- **Endpoint:** `GET /resolve/:address/reverse`
- **Description:** Get ENS domain for address
- **Auto-chain:** No

## Get Token Swaps
- **Endpoint:** `GET /wallets/:address/swaps`
- **Description:** Get token swap history
- **Auto-chain:** Yes
- **Params:** `limit`, `from`, `to`

## Get Token Approvals
- **Endpoint:** `GET /wallets/:address/approvals`
- **Description:** Get token approvals
- **Auto-chain:** Yes

## Get NFT Transfers
- **Endpoint:** `GET /:address/nft/transfers`
- **Description:** Get NFT transfer history
- **Auto-chain:** Yes

## Get Token Transfers
- **Endpoint:** `GET /:address/erc20/transfers`
- **Description:** Get ERC20 transfer history
- **Auto-chain:** Yes

## Get Transactions
- **Endpoint:** `GET /:address`
- **Description:** Get native token transactions
- **Auto-chain:** Yes

## Get Decoded Transactions
- **Endpoint:** `GET /:address/verbose`
- **Description:** Get decoded transactions with method names
- **Auto-chain:** Yes
