# Solana Wallet API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "SOL balance?" | `/account/:network/:address/balance` | Native SOL |
| "SPL tokens?" | `/account/:network/:address/tokens` | Token balances |
| "Portfolio?" | `/account/:network/:address/portfolio` | Full portfolio |
| "NFTs?" | `/account/:network/:address/nft` | All NFTs |
| "Swaps?" | `/account/:network/:address/swaps` | Trade history |

## Key Endpoint Patterns

- **Native balance:** `/account/:network/:address/balance` (SOL)
- **Token balances:** `/account/:network/:address/tokens` (SPL tokens)
- **Portfolio:** `/account/:network/:address/portfolio` (with prices)
- **NFTs:** `/account/:network/:address/nft` (NFTs owned)
- **Swaps:** `/account/:network/:address/swaps` (DEX swaps)
- **Network parameter:** `mainnet` or `devnet`

---

## Get Native Balance

- **Endpoint:** `GET /account/:network/:address/balance`
- **Description:** Get native balance by wallet. Retrieves the SOL balance for a given address.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:address/balance
- **Use this endpoint when:** User asks "SOL balance", "native balance", "how much SOL", "Solana balance"
- **Networks:** mainnet, devnet
- **Params:**
  - `network` (required, string) - The network to query
  - `address` (required, string) - The address to query

---

## Get SPL Tokens

- **Endpoint:** `GET /account/:network/:address/tokens`
- **Description:** Get token balance by wallet. Retrieves all SPL token balances for a given address.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:address/tokens
- **Use this endpoint when:** User asks "SPL tokens", "token balances", "what tokens", "Solana tokens"
- **Networks:** mainnet, devnet
- **Params:**
  - `network` (required, string) - The network to query
  - `address` (required, string) - The address to query
  - `excludeSpam` (optional, boolean) - Should exclude spam tokens

---

## Get Portfolio

- **Endpoint:** `GET /account/:network/:address/portfolio`
- **Description:** Get portfolio by wallet. Retrieves a comprehensive portfolio including tokens with their values.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:address/portfolio
- **Use this endpoint when:** User asks "portfolio", "full portfolio", "complete holdings", "wallet value"
- **Networks:** mainnet, devnet
- **Params:**
  - `network` (required, string) - The network to query
  - `address` (required, string) - The address to query
  - `nftMetadata` (optional, boolean) - Should return the full NFT metadata
  - `mediaItems` (optional, boolean) - Should return media items
  - `excludeSpam` (optional, boolean) - Should exclude spam NFTs

---

## Get NFTs

- **Endpoint:** `GET /account/:network/:address/nft`
- **Description:** Get NFTs by wallet. Retrieves all NFTs owned by the specified address.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:address/nft
- **Use this endpoint when:** User asks "wallet NFTs", "what NFTs does this wallet own", "Solana NFT portfolio"
- **Networks:** mainnet, devnet
- **Params:**
  - `network` (required, string) - The network to query
  - `address` (required, string) - The address to query
  - `nftMetadata` (optional, boolean) - Should return the full NFT metadata
  - `mediaItems` (optional, boolean) - Should return media items
  - `excludeSpam` (optional, boolean) - Should exclude spam NFTs
  - `includeFungibleAssets` (optional, boolean) - Should include fungible assets (tokenStandard:1)

---

## Get Token Swaps

- **Endpoint:** `GET /account/:network/:address/swaps`
- **Description:** Get token swaps by wallet address. Retrieves all DEX swaps performed by a wallet.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:address/swaps
- **Use this endpoint when:** User asks "wallet swaps", "swap history", "trading history", "DEX trades"
- **Networks:** mainnet, devnet
- **Params:**
  - `network` (required, string) - The network to query
  - `address` (required, string) - The address to query
  - `limit` (optional, integer) - The limit per page
  - `cursor` (optional, string) - The cursor to the next page
  - `order` (optional, string) - The order of items
  - `fromDate` (optional, string) - The starting date (format in seconds or datestring)
  - `toDate` (optional, string) - The ending date (format in seconds or datestring)
  - `transactionTypes` (optional, string) - Transaction types to fetch (possible values: 'buy', 'sell')
  - `tokenAddress` (optional, string) - Token address to get transactions for

---

## Notes

- The Solana Wallet API is more limited than the EVM Wallet API
- There are no dedicated endpoints for:
  - Token transfers (use RPC or indexer)
  - Native transaction history (use RPC)
  - DeFi positions (Solana DeFi is different from EVM)
- All Solana API endpoints use the `:network` parameter (mainnet/devnet)
- For more advanced wallet operations, consider using the Solana RPC directly
