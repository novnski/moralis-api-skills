# EVM Entity API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Search entities?" | `/entities/search` | Find exchanges/funds |
| "Entity categories?" | `/entities/categories` | All categories |
| "Entities in category?" | `/entities/categories/:categoryId/entities` | Filter by type |
| "Entity details?" | `/entities/:entityId` | Specific entity |

## Key Endpoint Patterns

- **Search:** `/entities/search` (find entities by name)
- **Categories:** `/entities/categories*` (browse entity types)
- **Entity details:** `/entities/:entityId` (get full entity info)
- **Entity types:** Exchanges, funds, DeFi protocols, whales, DEX traders

---

## Search Entities

- **Endpoint:** `GET /entities/search`
- **Description:** Search for entities, addresses, and categories. Searches through labeled entities including exchanges, funds, DeFi protocols, whales, and DEX traders.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/entities/search
- **Use this endpoint when:** User asks "search entities", "find exchanges", "look up funds", "search for Binance", "find a16z"
- **Params:**
  - `query` (required) - The search query
  - `limit` (optional) - The desired page size of the result

---

## Get Entity Categories

- **Endpoint:** `GET /entities/categories`
- **Description:** Get entity categories. Retrieves all available entity categories/types in the system.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/entities/categories
- **Use this endpoint when:** User asks "entity categories", "what types of entities", "list categories", "entity types"
- **Params:**
  - `limit` (optional) - The desired page size of the result

---

## Get Entities by Category

- **Endpoint:** `GET /entities/categories/:categoryId`
- **Description:** Get entities by category. Retrieves all labeled entities belonging to a specific category.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/entities/categories/:categoryId
- **Use this endpoint when:** User asks "all exchanges", "all funds", "entities in category", "list [type] entities"
- **Params:**
  - `categoryId` (required) - The category ID
  - `limit` (optional) - The desired page size of the result

---

## Get Entity by ID

- **Endpoint:** `GET /entities/:entityId`
- **Description:** Get entity by ID. Retrieves detailed information about a specific labeled entity including associated addresses and metadata.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/entities/:entityId
- **Use this endpoint when:** User asks "entity details", "entity info", "show me this entity", "entity data"
- **Params:**
  - `entityId` (required) - The entity ID

## Supported Entity Categories

- **Exchanges:** Binance, Coinbase, Kraken, etc.
- **Funds:** a16z, Paradigm, Three Arrows, etc.
- **DeFi Protocols:** Uniswap, Aave, Compound, etc.
- **Whales:** Large wallet addresses
- **DEX Traders:** Active DEX traders
