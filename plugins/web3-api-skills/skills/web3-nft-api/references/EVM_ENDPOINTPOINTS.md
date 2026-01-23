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
| "Wallet NFTs?" | `/:address/nft` | By wallet |
| "NFT stats?" | `/nft/:address/stats` | Collection stats |
| "Trending NFTs?" | `/market-data/nfts/top-collections` | Top by market cap |
| "Hot NFTs?" | `/market-data/nfts/hottest-collections` | Top by volume |

## Key Endpoint Patterns

- **Collection-based:** `/nft/:address/*` (all NFTs in a contract)
- **Wallet-based:** `/:address/nft/*` (NFTs owned by wallet)
- **Specific NFT:** `/nft/:address/:token_id` (single NFT metadata)
- **Metadata auto-fetches:** Most endpoints auto-fetch metadata from URI
- **Spam detection:** Some endpoints support spam filtering

---

## Get NFTs

### Get NFTs by Wallet

- **Endpoint:** `GET /:address/nft`
- **Description:** Get NFTs by wallet. Retrieves all NFTs owned by the specified address including metadata.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/nft
- **Use this endpoint when:** User asks "wallet NFTs", "what NFTs does this wallet own", "NFT portfolio"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `format`
- **Spam Detection:** ✅

---

### Get Multiple NFTs

- **Endpoint:** `POST /nft/getMultipleNFTs`
- **Description:** Get multiple NFTs. Retrieves metadata for multiple NFTs in a single request.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/getMultipleNFTs
- **Use this endpoint when:** User asks "multiple NFTs", "get these NFTs", "batch NFT metadata"
- **Method:** POST with body `{"tokens": [{"token_address": "0x...", "token_id": "123"}, ...]}`
- **Spam Detection:** ✅

---

### Get NFTs by Contract

- **Endpoint:** `GET /nft/:address`
- **Description:** Get NFTs by contract. Retrieves all NFTs in a specific contract/collection.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address
- **Use this endpoint when:** User asks "NFTs in this collection", "all NFTs by contract", "show me the collection", "list all NFTs"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `format`
- **Spam Detection:** ✅

---

## Get NFT Metadata

### Get NFT Metadata

- **Endpoint:** `GET /nft/:address/:token_id`
- **Description:** Get NFT data. Retrieves metadata for a specific NFT including on-chain and off-chain metadata.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/:token_id
- **Use this endpoint when:** User asks "NFT metadata", "this specific NFT", "NFT #123", "show NFT details"
- **Auto-chain:** Yes
- **Params:** `format` (string)

---

### Resync NFT Metadata

- **Endpoint:** `PUT /nft/:address/:token_id/metadata/resync`
- **Description:** Resync metadata. Forces a refresh of NFT metadata from the URI.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/:token_id/metadata/resync
- **Use this endpoint when:** User asks "refresh NFT metadata", "resync metadata", "update NFT data"
- **Method:** PUT

---

### Get Contract Metadata

- **Endpoint:** `GET /nft/:address/metadata`
- **Description:** Get contract metadata. Retrieves collection-level metadata and contract details.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/metadata
- **Use this endpoint when:** User asks "collection metadata", "contract info", "collection details"
- **Auto-chain:** Yes
- **Spam Detection:** ✅

---

### Sync NFT Contract

- **Endpoint:** `PUT /nft/:address/sync`
- **Description:** Sync NFT contract. Forces a refresh of all NFT metadata in a contract.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/sync
- **Use this endpoint when:** User asks "sync collection", "refresh all NFTs in contract", "update contract metadata"
- **Method:** PUT

---

## Get NFT Transfers

### Get NFT Transfers by Wallet

- **Endpoint:** `GET /:address/nft/transfers`
- **Description:** Get transfers by wallet. Retrieves all NFT transfers to and from the specified address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/nft/transfers
- **Use this endpoint when:** User asks "wallet NFT transfers", "NFTs sent/received by wallet", "wallet NFT activity"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `from`, `to`
- **Spam Detection:** ✅

---

### Get NFT Transfers by Contract

- **Endpoint:** `GET /nft/:address/transfers`
- **Description:** Get transfers by contract. Retrieves all NFT transfers for a specific contract.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/transfers
- **Use this endpoint when:** User asks "collection transfers", "all transfers for this NFT", "transfer history"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `from`, `to`
- **Spam Detection:** ✅

---

### Get NFT Transfers by Token

- **Endpoint:** `GET /nft/:address/:token_id/transfers`
- **Description:** Get transfers by contract and token ID. Retrieves transfer history for a specific NFT.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/:token_id/transfers
- **Use this endpoint when:** User asks "this NFT's transfers", "transfer history for token #123"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `from`, `to`
- **Spam Detection:** ✅

---

## Get NFT Collections

### Get NFT Collections by Wallet

- **Endpoint:** `GET /:address/nft/collections`
- **Description:** Get collections by wallet. Provides a summary of NFT collections owned by the address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/nft/collections
- **Use this endpoint when:** User asks "wallet NFT collections", "what collections does this wallet own", "NFT portfolio summary"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string)
- **Spam Detection:** ✅

---

## Get NFT Owners

### Get NFT Owners

- **Endpoint:** `GET /nft/:address/owners`
- **Description:** Get NFT owners. Retrieves current owners of all NFTs in a contract.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/owners
- **Use this endpoint when:** User asks "who owns these NFTs", "NFT holders", "current owners", "holder list"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string)
- **Spam Detection:** ✅

---

### Get NFT Owners by Token ID

- **Endpoint:** `GET /nft/:address/:token_id/owners`
- **Description:** Get token ID owners. Retrieves current owners of a specific NFT (handles multi-token NFTs).
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/:token_id/owners
- **Use this endpoint when:** User asks "who owns this NFT", "owner of NFT #123"
- **Auto-chain:** Yes
- **Spam Detection:** ✅

---

## Get NFT Prices

### Get NFT Floor Price by Contract

- **Endpoint:** `GET /nft/:address/floor-price`
- **Description:** Get NFT floor price by contract. Retrieves the current lowest price across all marketplaces.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/floor-price
- **Use this endpoint when:** User asks "floor price", "lowest price", "current floor", "cheapest NFT"
- **Auto-chain:** Yes

---

### Get NFT Floor Price by Token

- **Endpoint:** `GET /nft/:address/:token_id/floor-price`
- **Description:** Get NFT floor price by token. Retrieves the floor price for a specific token ID.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/:token_id/floor-price
- **Use this endpoint when:** User asks "floor price for this NFT", "price for token #123"
- **Auto-chain:** Yes

---

### Get Historical NFT Floor Price

- **Endpoint:** `GET /nft/:address/floor-price/historical`
- **Description:** Get historical NFT floor price by contract. Retrieves historical floor price data over time.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/floor-price/historical
- **Use this endpoint when:** User asks "historical floor price", "floor price history", "floor price over time"
- **Auto-chain:** Yes
- **Params:** `days` (string), `fromDate` (string), `toDate`

---

### Get NFT Contract Sale Prices

- **Endpoint:** `GET /nft/:address/price`
- **Description:** Get contract sale prices. Retrieves recent sale prices for NFTs in the contract.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/price
- **Use this endpoint when:** User asks "sale prices", "recent sales", "what did these NFTs sell for"
- **Auto-chain:** Yes

---

### Get NFT Sale Prices

- **Endpoint:** `GET /nft/:address/:token_id/price`
- **Description:** Get sale prices. Retrieves recent sale prices for a specific NFT.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/:token_id/price
- **Use this endpoint when:** User asks "sale price for this NFT", "what did NFT #123 sell for"
- **Auto-chain:** Yes

---

## Get NFT Trades

### Get NFT Trades

- **Endpoint:** `GET /nft/:address/trades`
- **Description:** Get NFT trades. Retrieves marketplace trades for NFTs in a contract.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/trades
- **Use this endpoint when:** User asks "NFT trades", "sales history", "who sold this NFT", "market activity"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `from`, `to`
- **Spam Detection:** ✅

---

### Get NFT Trades by Token

- **Endpoint:** `GET /nft/:address/:token_id/trades`
- **Description:** Get trades by token. Retrieves trade history for a specific NFT.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/:token_id/trades
- **Use this endpoint when:** User asks "trades for this NFT", "trade history for #123"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `from`, `to`

---

### Get NFT Trades by Wallet

- **Endpoint:** `GET /wallets/:address/nfts/trades`
- **Description:** Get NFT trades by wallet. Retrieves NFT trades performed by a specific wallet.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/nfts/trades
- **Use this endpoint when:** User asks "my NFT trades", "NFT trades by wallet", "what NFTs did this wallet trade"
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string), `from`, `to`

---

## Get NFT Stats

### Get NFT Collection Stats

- **Endpoint:** `GET /nft/:address/stats`
- **Description:** Get collection stats. Retrieves statistics about an NFT collection including holder count, transfer count, etc.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/stats
- **Use this endpoint when:** User asks "collection stats", "NFT statistics", "collection data"
- **Auto-chain:** Yes

---

## Get NFT Traits and Rarity

### Get NFT Traits by Collection

- **Endpoint:** `GET /nft/:address/traits`
- **Description:** Get NFT traits by collection. Retrieves all traits for a collection in a single response (limited to 5,000 traits).
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/traits
- **Use this endpoint when:** User asks "NFT traits", "attributes", "trait distribution", "rarity data" (for smaller collections)
- **Auto-chain:** Yes

---

### Get NFT Traits by Collection (Paginated)

- **Endpoint:** `GET /nft/:address/traits/paginate`
- **Description:** Get NFT traits by collection (paginated). Retrieves traits with pagination support (no limit).
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/traits/paginate
- **Use this endpoint when:** User asks "NFT traits", "all traits" (for large collections)
- **Auto-chain:** Yes
- **Params:** `limit` (integer), `cursor` (string)

---

### Get NFTs by Traits

- **Endpoint:** `POST /nft/:address/nfts-by-traits`
- **Description:** Get NFTs by traits. Queries NFTs based on trait values.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/nfts-by-traits
- **Use this endpoint when:** User asks "NFTs with traits", "find NFTs by attributes", "query by traits"
- **Method:** POST with body defining trait filters
- **Spam Detection:** ✅

---

### Resync NFT Traits

- **Endpoint:** `PUT /nft/:address/traits/resync`
- **Description:** Resync NFT traits by collection. Forces a refresh of trait data for a collection.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/nft/:address/traits/resync
- **Use this endpoint when:** User asks "refresh traits", "resync rarity data", "update trait information"
- **Method:** PUT

---

## Get Trending NFTs

### Get Top NFT Collections by Market Cap

- **Endpoint:** `GET /market-data/nfts/top-collections`
- **Description:** Get the top NFT collections by market cap. Retrieves collections ranked by market capitalization.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/market-data/nfts/top-collections
- **Use this endpoint when:** User asks "top NFT collections", "biggest NFT projects", "NFTs by market cap"
- **Params:** `limit` (integer)

---

### Get Top NFT Collections by Trading Volume

- **Endpoint:** `GET /market-data/nfts/hottest-collections`
- **Description:** Get the top NFT collections by trading volume. Retrieves collections ranked by 24h trading volume.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/market-data/nfts/hottest-collections
- **Use this endpoint when:** User asks "hot NFT collections", "trending NFTs", "top volume NFTs", "most traded NFTs"
- **Params:** `limit` (integer)

---

## Note on Unified Wallet History

For comprehensive wallet activity that includes NFT transfers along with other activity types, use the unified wallet history endpoint from the Wallet API:

**`GET /wallets/:address/history`**

This single endpoint provides NFT transfers, ERC20 transfers, native transactions, and internal transactions all in one response.
