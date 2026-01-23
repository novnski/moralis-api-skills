# EVM NFT API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "What NFTs in this collection?" | `/nft/:address` | All NFTs by contract |
| "NFT metadata?" | `/nft/:address/:tokenId` | Specific NFT |
| "NFT transfers?" | `/nft/:address/transfers` | Collection transfers |
| "Who owns these NFTs?" | `/nft/:address/owners` | Current owners |
| "NFT trades/sales?" | `/nft/:address/trades` | Trade history |
| "NFT traits?" | `/nft/:address/traits` | Collection traits |
| "Floor price?" | `/nft/:address/floor-price` | Floor price |
| "Wallet NFT collections?" | `/:address/nft/collections` | By wallet |

## Key Endpoint Patterns

- **Collection-based:** `/nft/:address/*` (all NFTs in a contract)
- **Wallet-based:** `/:address/nft/*` (NFTs owned by wallet)
- **Specific NFT:** `/nft/:address/:tokenId` (single NFT metadata)
- **Metadata auto-fetches:** Most endpoints auto-fetch metadata from URI

---

## Get NFTs by Contract
- **Endpoint:** `GET /nft/:address`
- **Description:** Get all NFTs in a contract
- **Use this endpoint when:** User asks "NFTs in this collection", "all NFTs by contract", "show me the collection", "list all NFTs"
- **Params:** `limit`, `cursor`, `format`

## Get NFT Metadata
- **Endpoint:** `GET /nft/:address/:tokenId`
- **Description:** Get metadata for a specific NFT
- **Use this endpoint when:** User asks "NFT metadata", "this specific NFT", "NFT #123", "show NFT details"
- **Params:** `format`

## Get NFT Transfers by Contract
- **Endpoint:** `GET /nft/:address/transfers`
- **Description:** Get transfer history for a contract
- **Use this endpoint when:** User asks "collection transfers", "all transfers for this NFT", "transfer history"
- **Params:** `limit`, `cursor`, `from`, `to`

## Wallet-Level Transfers

For wallet activity that includes NFT transfers, use the unified wallet history endpoint:

- **Endpoint:** `GET /wallets/:address/history`
- **Use this endpoint when:** User asks "wallet NFT transfers", "NFTs sent/received by wallet", "wallet activity"

## Get NFT Owners
- **Endpoint:** `GET /nft/:address/owners`
- **Description:** Get current owners of NFTs in a contract
- **Use this endpoint when:** User asks "who owns these NFTs", "NFT holders", "current owners"
- **Params:** `limit`, `cursor`

## Get NFT Traits
- **Endpoint:** `GET /nft/:address/traits`
- **Description:** Get all traits for an NFT collection
- **Use this endpoint when:** User asks "NFT traits", "attributes", "trait distribution", "rarity data"
- **Params:** None

## Get NFT Trades
- **Endpoint:** `GET /nft/:address/trades`
- **Description:** Get trade history for an NFT
- **Use this endpoint when:** User asks "NFT trades", "sales history", "who sold this NFT", "market activity"
- **Params:** `limit`, `cursor`, `from`, `to`

## Get NFT Collections by Wallet
- **Endpoint:** `GET /:address/nft/collections`
- **Description:** Get NFT collections owned by wallet
- **Use this endpoint when:** User asks "wallet NFT collections", "what collections does this wallet own"
- **Params:** `limit`, `cursor`

## Get NFT Floor Price
- **Endpoint:** `GET /nft/:address/floor-price`
- **Description:** Get floor price for an NFT collection
- **Use this endpoint when:** User asks "floor price", "lowest price", "current floor", "cheapest NFT"
- **Params:** `chain`

## Get NFTs by Wallet
- **Endpoint:** `GET /:address/nft`
- **Description:** Get all NFTs owned by a wallet
- **Use this endpoint when:** User asks "wallet NFTs", "what NFTs does this wallet own", "NFT portfolio"
- **Params:** `limit`, `cursor`, `format`

## Get Multiple NFTs
- **Endpoint:** `GET /nft/getMultipleNFTs`
- **Description:** Get metadata for multiple NFTs
- **Use this endpoint when:** User asks "multiple NFTs", "get these NFTs", "batch NFT metadata"
- **Params:** `tokens`, `format`

## Get Contract Metadata
- **Endpoint:** `GET /nft/:address/metadata`
- **Description:** Get collection-level metadata
- **Use this endpoint when:** User asks "collection metadata", "contract info", "collection details"
- **Params:** None
