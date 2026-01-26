---
name: moralis-data-api
description: Query Web3 blockchain data from Moralis API (wallet, token, NFT, DeFi, entity, price, blockchain endpoints). REST API with curl examples.
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
    version: "3.2.0"
    author: web3-skills
    tags: [web3, blockchain, evm, solana, wallet, token, nft, defi]
context:
    fork: noviulian/moralis-api-skills
    agent: claude-code
allowed-tools:
    - Bash
invocation:
    max-turns: 2
    disable-model: false
---

## 🚨 CRITICAL: READ BEFORE IMPLEMENTING

**This skill requires reading rule files for accurate implementation.**

The #1 cause of bugs is **not reading the rule file's example response** before writing code.

### Mandatory Pre-Implementation Checklist

For EVERY endpoint you implement:

1. [ ] Read `rules/{EndpointName}.md`
2. [ ] Find the "Example Response" section
3. [ ] Copy the EXACT JSON structure
4. [ ] Note EVERY field name (snake_case vs camelCase)
5. [ ] Note EVERY data type (string vs number vs boolean)
6. [ ] Note the HTTP method (GET vs POST)
7. [ ] Note the endpoint path EXACTLY (path params vs query params)
8. [ ] Note any wrapper structure (`{ result: [] }` etc.)

**Only after completing ALL 8 checks should you write code.**

Failure to follow this process will result in:

- Wrong type conversions (parsing decimal as hex)
- Missing fields (not transferring API data to UI)
- Runtime errors (accessing undefined properties)
- Incorrect endpoint paths (404 errors)

---

# Moralis Data API

Query Web3 blockchain data via REST API. Auto-detects EVM vs Solana addresses and routes to appropriate API.

## Setup

Provide your Moralis API key before using this skill. You can provide it in any of these ways:

- "Set this as the Moralis API key: `<your_key>`"
- "Use this API key: `<your_key>`"
- "Here's my key: `<your_key>`"
- "Configure the API key"
- "Set up the credentials"

The key will be remembered for the current session only. If no key is set, you'll be prompted to provide one.

**I need your Moralis API key to proceed. You can paste it like: `Set this as the Moralis API key: <key>`**

### Session Memory Pattern

Claude stores the key in memory throughout the session:

```javascript
// When user provides the key
const MORALIS_API_KEY = "user_provided_key";

// Use in all curl commands
curl "https://deep-index.moralis.io/api/v2.2/..." \
  -H "X-API-Key: ${MORALIS_API_KEY}"
```

**Note:** The key set in this skill is also available to @moralis-streams-api within the same session (and vice versa). You only need to provide it once.

### Security Notes

- Key is stored in memory only
- Never written to disk
- Never included in git commits
- Session-isolated (forgotten when session ends)
- No risk of accidentally committing secrets to version control

### For Project Development

If you're building a project (dashboard, wallet, dApp, etc.) that needs persistent API key storage:

> "I recommend creating a `.env` file in your project root with:
>
> ```bash
> MORALIS_API_KEY=your_key_here
> ```
>
> **Important:** Add `.env` to your `.gitignore` file to prevent accidentally committing your key."

### Verify Your Key

After setting the key, you can verify it works:

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Authentication

All requests require the API key header:

```bash
X-API-Key: <your_api_key>
```

## Base URLs

| API        | Base URL                                 |
| ---------- | ---------------------------------------- |
| **EVM**    | `https://deep-index.moralis.io/api/v2.2` |
| **Solana** | `https://solana-gateway.moralis.io`      |

## Pagination

Many endpoints support cursor-based pagination. See [Pagination](rules/Pagination.md) for details.

## When to Use This Skill

Use this skill when the user asks about:

- **Wallet data:** balances, tokens, NFTs, transaction history, DeFi positions, profitability
- **Token data:** prices, metadata, pairs, DEX trades, analytics, security scores, sniper detection
- **NFT data:** metadata, transfers, traits, rarity, floor prices
- **DeFi data:** protocol positions, liquidity, exposure
- **Entity data:** labeled addresses (exchanges, funds, protocols, whales)
- **Price data:** token/NFT prices, OHLCV candlesticks
- **Blockchain data:** blocks, transactions, decoded data

⚠️ **NOT for:** Real-time event streaming → Use @moralis-streams-api

## Default Chain Behavior

**For EVM addresses:** When a user provides an EVM address (`0x...`) without specifying a chain, default to **Ethereum (`chain=0x1`)** unless the user specifies a different chain or multiple chains.

**Examples:**

- "Get the balance of `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`" → Use `chain=0x1` (default)
- "Get the balance of `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` on Polygon" → Use `chain=0x89`
- "Get the balance of `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` on Ethereum and Base" → Query both chains

**For Solana addresses:** The base58 format is auto-detected and routed to the Solana API. No chain defaulting applies.

## ⚠️ CRITICAL Implementation Rules

**MANDATORY: Always Read the Rule File Before Implementing**

Before writing ANY code, you MUST read the corresponding rule file in `rules/` for the exact API specification.

### NEVER Assume or Guess

**Common mistakes that cause bugs:**

| ❌ WRONG ASSUMPTION           | ✅ REALITY                                                           |
| ----------------------------- | -------------------------------------------------------------------- |
| Block numbers are hex strings | Most are decimal numbers or strings                                  |
| Timestamps are Unix numbers   | Many are ISO 8601 strings                                            |
| Response is an array          | Many are wrapped: `{ result: [] }` or `{ page, cursor, result }`     |
| Field names are consistent    | `sync_at` vs `synced_at`, `method` vs `method_label`                 |
| All endpoints use GET         | Some use POST (e.g., `/erc20/metadata`)                              |
| Path format is consistent     | `/{address}` vs `/wallets/{address}` vs `/latestBlockNumber/{chain}` |

### Implementation Checklist

For EVERY endpoint, before writing code:

1. ✅ **Read the rule file** - e.g., `rules/getBlock.md`
2. ✅ **Check the HTTP method** - GET vs POST
3. ✅ **Check the exact endpoint path** - including path vs query parameters
4. ✅ **Read the example JSON response** - copy the exact structure
5. ✅ **Note field types** - string vs number vs boolean
6. ✅ **Check for wrapper structures** - direct array vs `{ result: [] }` vs `{ page, cursor, result }`
7. ✅ **Note special cases** - hex vs decimal, ISO vs Unix timestamp, snake_case vs camelCase

### Example - Correct Approach

**WRONG** (guessing):

```typescript
// ❌ Assumed block_number is hex string
const blockNumber = parseInt(data.block_number, 16);
```

**CORRECT** (reading rule file):

```markdown
# From rules/getBlock.md - Example Response:

{
"number": 12386788, // ← Note: plain number, not hex
"timestamp": "2021-05-07T11:08:35.000Z" // ← Note: ISO string, not Unix
}

// ✅ Correct based on actual API response
const blockNumber = data.number; // Already a number
const timestamp = new Date(data.timestamp).getTime(); // Convert ISO to Unix
```

### Response Structure Patterns

Memorize these common patterns:

| Pattern                    | Endpoints                                        |
| -------------------------- | ------------------------------------------------ |
| Direct array               | getWalletTokenBalances, getTokenMetadata         |
| `{ result: [] }`           | getWalletNFTs, getWalletTransactions             |
| `{ page, cursor, result }` | getWalletHistory, NFT transfers, token transfers |
| `{ cursor, page, result }` | getWalletTransactions (native)                   |
| Pagination at top          | getWalletHistory, getNFTTransfers                |

### Type Conversion Rules

- `block_number`: Usually decimal (number or string) - NOT hex (except some rare cases)
- `timestamp`: Usually ISO 8601 string - convert with `new Date().getTime()`
- `decimals`: Can be string or number depending on endpoint
- `receipt_status`: "1" = success, "0" = failed
- `amounts`/`values`: Always strings (BigInt territory)

### Field Name Gotchas

Always verify field names from the rule file:

| Assumed Name        | Actual Name                          | Endpoint               |
| ------------------- | ------------------------------------ | ---------------------- |
| `method`            | `method_label`                       | getWalletHistory       |
| `sync_at`           | `synced_at`                          | getNFTContractMetadata |
| `24hrPercentChange` | Can't use in TS (starts with number) | getTokenPrice          |
| `token_address`     | `address` (in metadata)              | getTokenMetadata       |

### If Rule File is Missing Details

If the rule file lacks a clear example response:

1. Check `ApiResponseCodes.md` for common patterns
2. Look at similar endpoints for structure hints
3. Assume decimal numbers (not hex) and ISO timestamps
4. Ask user for clarification if unsure

## Quick Reference: Common Data Transformations

### Block Number Handling

**NEVER hex, always decimal:**

```typescript
// Most endpoints return decimal (NOT hex)
block_number: 12386788           → number (use directly)
block_number: "12386788"         → parseInt(block_number, 10)
```

### Timestamp Conversions

```typescript
// ISO 8601 string → Unix timestamp (milliseconds)
"2021-05-07T11:08:35.000Z" → new Date(timestamp).getTime()

// Unix timestamp (seconds) → milliseconds
1620394115 → timestamp * 1000
```

### Balance/Amount Handling

```typescript
// Native token balances: Wei/Smallest unit → Formatted
balance: "1000000000000000000"
  → (Number(BigInt(balance)) / 1e18).toFixed(6)
  → ethers.formatUnits(balance, 18)  // if using ethers

// ERC20 token balances: Use getWalletTokenBalancesPrice which returns formatted field
```

### snake_case → camelCase Patterns

```typescript
// API response → TypeScript interface
{
  token_address: string;
  from_address_label: string;
  block_number: string;
  total_token_balances: number;
}
→ {
  tokenAddress: string;
  fromAddressLabel: string;
  blockNumber: string;
  totalTokenBalances: number;
}
```

### Boolean String Handling

```typescript
// API returns "1" or "0", not boolean
receipt_status: "1"   → status: receipt_status === "1" ? "success" : "failed"
possible_spam: "false" → possibleSpam === "true"
```

## Common Field Mappings

Quick reference for common API response fields:

### Entity/Label Fields

```typescript
from_address_entity       → fromAddressEntity
from_address_entity_logo  → fromAddressEntityLogo
from_address_label        → fromAddressLabel
to_address_entity         → toAddressEntity
to_address_entity_logo    → toAddressEntityLogo
to_address_label          → toAddressLabel
owner_of_entity           → ownerOfEntity
owner_of_entity_logo      → ownerOfEntityLogo
owner_of_label            → ownerOfLabel
```

### Transaction Fields

```typescript
block_number        → blockNumber
block_timestamp     → blockTimestamp (ISO string!)
transaction_hash    → hash (or txHash)
receipt_gas_used    → receiptGasUsed
receipt_status      → status ("1" = success)
transaction_index   → transactionIndex
```

### Token/NFT Fields

```typescript
token_address       → tokenAddress
token_id            → tokenId (keep as string!)
token_decimal       → tokenIdDecimal (when in decimal format)
contract_type       → contractType
possible_spam       → possibleSpam (string "true"/"false")
verified_collection → verifiedCollection (string "true"/"false")
```

## Pagination Patterns

Moralis uses **4 different pagination patterns**. Verify which one your endpoint uses:

### Pattern 1: No Pagination (Single Result)

```typescript
// Example: getBlock, getTransaction, getNativeBalance
{ "hash": "...", "block_number": 123 }
```

### Pattern 2: Simple Cursor/Page

```typescript
// Example: getWalletTransactions
{
  cursor: "string",
  page: "2",
  page_size: "100",
  result: [...]  // ← Data is in .result
}

// Usage:
const { result, cursor, page } = await getWalletTransactions(address, chain, limit);
// For next page: getWalletTransactions(address, chain, limit, cursor)
```

### Pattern 3: Full Pagination with Metadata

```typescript
// Example: getWalletHistory, getNFTTransfers, getErc20Transfers
{
  page: "1",
  page_size: "100",
  cursor: "eyJw...",
  result: [...]  // ← Data is in .result
}

// Usage:
const { result, cursor, page, pageSize } = await getWalletHistory(address, chain, limit);
```

### Pattern 4: Direct Array (No Wrapper)

```typescript
// Example: getWalletTokenBalances, getTokenMetadata (sometimes)
[
  { "token_address": "...", ... },
  { "token_address": "...", ... }
]

// Usage:
const tokens = await getWalletTokens(address, chain);
```

### How to Detect Which Pattern

1. Read the rule file - Look for "Example Response"
2. Check if `result` key exists - If yes, data is wrapped
3. Check if `cursor` key exists - If yes, pagination is supported
4. Check if top-level is array - If yes, direct array response

## Testing Endpoints

Before implementing, verify the endpoint works with curl:

### Template Commands

```bash
# Replace placeholders:
API_KEY="your_key_here"
ADDRESS="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
CHAIN="0x1"  # Ethereum
TOKEN="0x6B175474E89094C44Da98b954EedeAC495271d0F"  # USDC

# Test endpoint
curl -s "https://deep-index.moralis.io/api/v2.2${ENDPOINT_PATH}" \
  -H "X-API-Key: ${API_KEY}" \
  | jq '.'  # Pretty print JSON

# Example: Test getWalletNFTs
curl -s "https://deep-index.moralis.io/api/v2.2/${ADDRESS}/nft?chain=${CHAIN}" \
  -H "X-API-Key: ${API_KEY}" \
  | jq '.result[0]'  # Show first result
```

### Quick Test by Category

```bash
# Wallet Balance
curl "https://deep-index.moralis.io/api/v2.2/${ADDRESS}/balance?chain=${CHAIN}" \
  -H "X-API-Key: ${API_KEY}"

# Token Price
curl "https://deep-index.moralis.io/api/v2.2/erc20/${TOKEN}/price?chain=${CHAIN}" \
  -H "X-API-Key: ${API_KEY}"

# Get Block
curl "https://deep-index.moralis.io/api/v2.2/block/12386788?chain=${CHAIN}" \
  -H "X-API-Key: ${API_KEY}"

# Wallet Transactions (note the result wrapper)
curl "https://deep-index.moralis.io/api/v2.2/${ADDRESS}?chain=${CHAIN}&limit=5" \
  -H "X-API-Key: ${API_KEY}" | jq '.result'
```

## Troubleshooting Common Issues

### Issue: "Property does not exist on type"

**Cause**: Field name mismatch between your interface and the API response

**Solution**:

1. Re-read the rule file's example response
2. Check exact field name (might be snake_case)
3. Add `?` for optional fields
4. Check if data is wrapped in `result` object

### Issue: "Cannot read property of undefined"

**Cause**: Accessing nested property without checking if parent exists

**Solution**:

```typescript
// ❌ WRONG
tx.to_address_entity.name;

// ✅ RIGHT
tx.to_address_entity?.name;
// Or check if wrapped first
data.result?.[0]?.to_address_entity?.name;
```

### Issue: "blockNumber is NaN"

**Cause**: Parsing a decimal number as hex

**Solution**:

```typescript
// Check actual API response first
typeof data.block_number === "number"; // Use directly
data.block_number.startsWith("0x"); // Use parseInt(x, 16)
parseInt(data.block_number, 10); // Otherwise use radix 10
```

### Issue: "timestamp is wrong year"

**Cause**: Parsing ISO string as number or wrong timestamp format

**Solution**:

```typescript
// Check if it's ISO 8601
data.timestamp.includes("T") && data.timestamp.includes("Z")
  → new Date(data.timestamp).getTime()

// Check if it's Unix seconds vs milliseconds
data.timestamp < 10000000000  // Multiply by 1000 for milliseconds
```

### Issue: "Getting 404 Not Found"

**Cause**: Wrong endpoint path

**Common mistakes**:

- Missing `/wallets/` prefix: `/${address}/stats` vs `/wallets/${address}/stats`
- Wrong path parameter format: `/block/latest` vs `/latestBlockNumber/${chain}`
- Missing `/ens/` in ENS: `/resolve/${domain}` vs `/resolve/ens/${domain}`

**Solution**: Always verify exact path in rule file

### Issue: "Type 'X' is not assignable to type 'Y'"

**Cause**: Type mismatch in transformation

**Common issues**:

- Returning number when interface expects string
- Returning string when interface expects boolean
- Array vs wrapper object mismatch

**Solution**:

1. Check what type API returns vs what your interface expects
2. Add type conversion: `String(value)`, `Number(value)`, `value === "1"`

## Recommended Development Workflow

### Step 1: Understand Requirements

- What data do you need?
- Which endpoint provides it?
- Read the endpoint description in this skill file

### Step 2: Read the Rule File

- Open `rules/{EndpointName}.md`
- Find the "Example Response" section
- Copy the exact JSON structure

### Step 3: Test with curl

- Use the template from "Testing Endpoints" above
- Verify the response matches your expectation
- Note any discrepancies from documentation

### Step 4: Write TypeScript Interface

- Create interface matching the exact JSON response
- Include all optional fields with `?`
- Use proper TypeScript types

### Step 5: Implement Service Function

- Use `fetch` or a helper function
- Handle any data transformations
- Map snake_case to camelCase if needed

### Step 6: Handle Edge Cases

- Empty responses
- Missing optional fields
- Error states
- Loading states

## Rate Limiting & Best Practices

### API Limits

- **Free tier**: Varies by endpoint
- **Pro tier**: Higher limits
- Check your dashboard for current limits

### Implementing Backoff

```typescript
async function fetchWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (error.status === 429) {
                const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
                await new Promise((resolve) => setTimeout(resolve, delay));
                continue;
            }
            throw error;
        }
    }
    throw new Error("Max retries exceeded");
}
```

### Request Batching

When fetching multiple addresses or tokens, batch when possible:

```typescript
// ❌ BAD: N requests for N addresses
for (const address of addresses) {
    await getNativeBalance(address, chain);
}

// ✅ GOOD: Use bulk endpoint
await getNativeBalancesForAddresses(addresses, chain);
```

## Endpoint Rules

Each endpoint has its own rule file with full documentation:

```bash
# EVM endpoints (102 total)
rules/getWalletNFTs.md
rules/getTokenPrice__evm.md
rules/getWalletTokenBalances.md
# ... and 99 more

# Solana endpoints (34 total)
rules/getNFTMetadata__solana.md
rules/getTokenPrice__solana.md
rules/balance__solana.md
# ... and 31 more (including 10 EVM variants that support Solana chain)
```

**Note:**

- `__solana` suffix indicates a Solana-specific endpoint
- `__evm` suffix indicates EVM endpoint when same operationId exists in Solana
- Some EVM endpoints have `__solana` variants - these are EVM endpoints that support Solana via the `chain=solana` parameter

## Endpoint Catalog

Complete list of all 136 endpoints (102 EVM + 34 Solana) organized by category.

### Wallet

Balances, tokens, NFTs, transaction history, profitability, and net worth data.

| Endpoint                                                                | Description                                              |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| [getNativeBalance](rules/getNativeBalance.md)                           | Get native balance by wallet                             |
| [getNativeBalancesForAddresses](rules/getNativeBalancesForAddresses.md) | Get native balance for a set of wallets                  |
| [getWalletActiveChains](rules/getWalletActiveChains.md)                 | Get active chains by wallet address                      |
| [getWalletApprovals](rules/getWalletApprovals.md)                       | Get ERC20 approvals by wallet                            |
| [getWalletHistory](rules/getWalletHistory.md)                           | Get the complete decoded transaction history of a wallet |
| [getWalletNetWorth](rules/getWalletNetWorth.md)                         | Get wallet net worth                                     |
| [getWalletNFTCollections](rules/getWalletNFTCollections.md)             | Get NFT collections by wallet address                    |
| [getWalletNFTs](rules/getWalletNFTs.md)                                 | Get NFTs by wallet address                               |
| [getWalletNFTTransfers](rules/getWalletNFTTransfers.md)                 | Get NFT Transfers by wallet address                      |
| [getWalletProfitability](rules/getWalletProfitability.md)               | Get detailed profit and loss by wallet address           |
| [getWalletProfitabilitySummary](rules/getWalletProfitabilitySummary.md) | Get profit and loss summary by wallet address            |
| [getWalletStats](rules/getWalletStats.md)                               | Get summary stats by wallet address                      |
| [getWalletTokenBalances](rules/getWalletTokenBalances.md)               | Get ERC20 token balances by wallet                       |
| [getWalletTokenBalancesPrice](rules/getWalletTokenBalancesPrice.md)     | Get token balances with prices by wallet address         |
| [getWalletTokenTransfers](rules/getWalletTokenTransfers.md)             | Get ERC20 token transfers by wallet address              |
| [getWalletTransactions](rules/getWalletTransactions.md)                 | Get native transactions by wallet                        |
| [getWalletTransactionsVerbose](rules/getWalletTransactionsVerbose.md)   | Get decoded transactions by wallet                       |

### Token

Token prices, metadata, pairs, DEX swaps, analytics, security scores, and sniper detection.

| Endpoint                                                                 | Description                                          |
| ------------------------------------------------------------------------ | ---------------------------------------------------- |
| [getAggregatedTokenPairStats](rules/getAggregatedTokenPairStats__evm.md) | Get aggregated token pair statistics by address      |
| [getHistoricalTokenScore](rules/getHistoricalTokenScore.md)              | Get historical token score by token address          |
| [getMultipleTokenAnalytics](rules/getMultipleTokenAnalytics.md)          | Get token analytics for a list of token addresses    |
| [getPairAddress](rules/getPairAddress.md)                                | Get DEX token pair address                           |
| [getPairReserves](rules/getPairReserves.md)                              | Get DEX token pair reserves                          |
| [getPairStats](rules/getPairStats__evm.md)                               | Get stats by pair address                            |
| [getSnipersByPairAddress](rules/getSnipersByPairAddress__evm.md)         | Get snipers by pair address                          |
| [getSwapsByPairAddress](rules/getSwapsByPairAddress__evm.md)             | Get swap transactions by pair address                |
| [getSwapsByTokenAddress](rules/getSwapsByTokenAddress__evm.md)           | Get swap transactions by token address               |
| [getSwapsByWalletAddress](rules/getSwapsByWalletAddress__evm.md)         | Get swap transactions by wallet address              |
| [getTimeSeriesTokenAnalytics](rules/getTimeSeriesTokenAnalytics.md)      | Retrieve timeseries trading stats by token addresses |
| [getTokenAnalytics](rules/getTokenAnalytics.md)                          | Get token analytics by token address                 |
| [getTokenBondingStatus](rules/getTokenBondingStatus__evm.md)             | Get the token bonding status                         |
| [getTokenCategories](rules/getTokenCategories.md)                        | Get ERC20 token categories                           |
| [getTokenHolders](rules/getTokenHolders__evm.md)                         | Get a holders summary by token address               |
| [getTokenMetadata](rules/getTokenMetadata__evm.md)                       | Get ERC20 token metadata by contract                 |
| [getTokenMetadataBySymbol](rules/getTokenMetadataBySymbol.md)            | Get ERC20 token metadata by symbols                  |
| [getTokenOwners](rules/getTokenOwners.md)                                | Get ERC20 token owners by contract                   |
| [getTokenPairs](rules/getTokenPairs__evm.md)                             | Get token pairs by address                           |
| [getTokenScore](rules/getTokenScore.md)                                  | Get token score by token address                     |
| [getTokenStats](rules/getTokenStats.md)                                  | Get ERC20 token stats                                |
| [getTokenTransfers](rules/getTokenTransfers.md)                          | Get ERC20 token transfers by contract address        |

### NFT

NFT metadata, transfers, traits, rarity, floor prices, and trades.

| Endpoint                                                                              | Description                                |
| ------------------------------------------------------------------------------------- | ------------------------------------------ |
| [getContractNFTs](rules/getContractNFTs.md)                                           | Get NFTs by contract address               |
| [getMultipleNFTs](rules/getMultipleNFTs.md)                                           | Get Metadata for NFTs                      |
| [getNFTBulkContractMetadata](rules/getNFTBulkContractMetadata.md)                     | Get metadata for multiple NFT contracts    |
| [getNFTByContractTraits](rules/getNFTByContractTraits.md)                             | Get NFTs by traits                         |
| [getNFTCollectionStats](rules/getNFTCollectionStats.md)                               | Get summary stats by NFT collection        |
| [getNFTContractMetadata](rules/getNFTContractMetadata.md)                             | Get NFT collection metadata                |
| [getNFTContractSalePrices](rules/getNFTContractSalePrices.md)                         | Get NFT sale prices by collection          |
| [getNFTContractTransfers](rules/getNFTContractTransfers.md)                           | Get NFT transfers by contract address      |
| [getNFTFloorPriceByContract](rules/getNFTFloorPriceByContract.md)                     | Get NFT floor price by contract            |
| [getNFTFloorPriceByToken](rules/getNFTFloorPriceByToken.md)                           | Get NFT floor price by token               |
| [getNFTHistoricalFloorPriceByContract](rules/getNFTHistoricalFloorPriceByContract.md) | Get historical NFT floor price by contract |
| [getNFTMetadata](rules/getNFTMetadata__evm.md)                                        | Get NFT metadata                           |
| [getNFTOwners](rules/getNFTOwners.md)                                                 | Get NFT owners by contract address         |
| [getNFTSalePrices](rules/getNFTSalePrices.md)                                         | Get NFT sale prices by token               |
| [getNFTTokenIdOwners](rules/getNFTTokenIdOwners.md)                                   | Get NFT owners by token ID                 |
| [getNFTTrades](rules/getNFTTrades.md)                                                 | Get NFT trades by collection               |
| [getNFTTradesByToken](rules/getNFTTradesByToken.md)                                   | Get NFT trades by token                    |
| [getNFTTradesByWallet](rules/getNFTTradesByWallet.md)                                 | Get NFT trades by wallet address           |
| [getNFTTraitsByCollection](rules/getNFTTraitsByCollection.md)                         | Get NFT traits by collection               |
| [getNFTTraitsByCollectionPaginate](rules/getNFTTraitsByCollectionPaginate.md)         | Get NFT traits by collection paginate      |
| [getNFTTransfers](rules/getNFTTransfers.md)                                           | Get NFT transfers by token ID              |
| [getTopNFTCollectionsByMarketCap](rules/getTopNFTCollectionsByMarketCap.md)           | Get top NFT collections by market cap      |

### DeFi

DeFi protocol positions, liquidity, and exposure data.

| Endpoint                                                          | Description                                          |
| ----------------------------------------------------------------- | ---------------------------------------------------- |
| [getDefiPositionsByProtocol](rules/getDefiPositionsByProtocol.md) | Get detailed DeFi positions by protocol for a wallet |
| [getDefiPositionsSummary](rules/getDefiPositionsSummary.md)       | Get DeFi positions of a wallet                       |
| [getDefiSummary](rules/getDefiSummary.md)                         | Get the DeFi summary of a wallet                     |

### Entity

Labeled addresses including exchanges, funds, protocols, and whales.

| Endpoint                                            | Description              |
| --------------------------------------------------- | ------------------------ |
| [getEntity](rules/getEntity.md)                     | Get Entity Details By Id |
| [getEntityCategories](rules/getEntityCategories.md) | Get Entity Categories    |

### Price

Token and NFT prices, OHLCV candlestick data.

| Endpoint                                                       | Description                     |
| -------------------------------------------------------------- | ------------------------------- |
| [getMultipleTokenPrices](rules/getMultipleTokenPrices__evm.md) | Get Multiple ERC20 token prices |
| [getPairPrice](rules/getPairPrice.md)                          | Get DEX token pair price        |
| [getTokenPrice](rules/getTokenPrice__evm.md)                   | Get ERC20 token price           |

### Blockchain

Blocks, transactions, date-to-block conversion, and contract functions.

| Endpoint                                                | Description                     |
| ------------------------------------------------------- | ------------------------------- |
| [getBlock](rules/getBlock.md)                           | Get block by hash               |
| [getDateToBlock](rules/getDateToBlock.md)               | Get block by date               |
| [getLatestBlockNumber](rules/getLatestBlockNumber.md)   | Get latest block number         |
| [getTransaction](rules/getTransaction.md)               | Get transaction by hash         |
| [getTransactionVerbose](rules/getTransactionVerbose.md) | Get decoded transaction by hash |

### Discovery

Trending tokens, blue chips, market movers, and token discovery.

| Endpoint                                                                                | Description                                                  |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [getDiscoveryToken](rules/getDiscoveryToken.md)                                         | Get token details                                            |
| [getTimeSeriesVolume](rules/getTimeSeriesVolume.md)                                     | Retrieve timeseries trading stats by chain                   |
| [getTimeSeriesVolumeByCategory](rules/getTimeSeriesVolumeByCategory.md)                 | Retrieve timeseries trading stats by category                |
| [getTopCryptoCurrenciesByMarketCap](rules/getTopCryptoCurrenciesByMarketCap.md)         | Get top crypto currencies by market cap                      |
| [getTopCryptoCurrenciesByTradingVolume](rules/getTopCryptoCurrenciesByTradingVolume.md) | Get top crypto currencies by trading volume                  |
| [getTopERC20TokensByMarketCap](rules/getTopERC20TokensByMarketCap.md)                   | Get top ERC20 tokens by market cap                           |
| [getTopERC20TokensByPriceMovers](rules/getTopERC20TokensByPriceMovers.md)               | Get top ERC20 tokens by price movements (winners and losers) |
| [getTopGainersTokens](rules/getTopGainersTokens.md)                                     | Get tokens with top gainers                                  |
| [getTopLosersTokens](rules/getTopLosersTokens.md)                                       | Get tokens with top losers                                   |
| [getTopProfitableWalletPerToken](rules/getTopProfitableWalletPerToken.md)               | Get top traders for a given ERC20 token                      |
| [getTrendingTokens](rules/getTrendingTokens.md)                                         | Get trending tokens                                          |
| [getVolumeStatsByCategory](rules/getVolumeStatsByCategory.md)                           | Get trading stats by categories                              |
| [getVolumeStatsByChain](rules/getVolumeStatsByChain.md)                                 | Get trading stats by chain                                   |

### Other

Utility endpoints including API version, endpoint weights, and address resolution.

| Endpoint                                                                   | Description                                                                      |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [getBondingTokensByExchange](rules/getBondingTokensByExchange__evm.md)     | Get bonding tokens by exchange                                                   |
| [getCandleSticks](rules/getCandleSticks__evm.md)                           | Get OHLCV by pair address                                                        |
| [getEntitiesByCategory](rules/getEntitiesByCategory.md)                    | Get Entities By Category                                                         |
| [getFilteredTokens](rules/getFilteredTokens.md)                            | Returns a list of tokens that match the specified filters and criteria           |
| [getGraduatedTokensByExchange](rules/getGraduatedTokensByExchange__evm.md) | Get graduated tokens by exchange                                                 |
| [getHistoricalTokenHolders](rules/getHistoricalTokenHolders__evm.md)       | Get timeseries holders data                                                      |
| [getNewTokensByExchange](rules/getNewTokensByExchange__evm.md)             | Get new tokens by exchange                                                       |
| [getUniqueOwnersByCollection](rules/getUniqueOwnersByCollection.md)        | Get unique wallet addresses owning NFTs from a contract.                         |
| [resolveAddress](rules/resolveAddress.md)                                  | ENS lookup by address                                                            |
| [resolveAddressToDomain](rules/resolveAddressToDomain.md)                  | Resolve Address to Unstoppable domain                                            |
| [resolveDomain](rules/resolveDomain.md)                                    | Resolve Unstoppable domain                                                       |
| [resolveENSDomain](rules/resolveENSDomain.md)                              | ENS lookup by domain                                                             |
| [reSyncMetadata](rules/reSyncMetadata.md)                                  | Resync NFT metadata                                                              |
| [searchEntities](rules/searchEntities.md)                                  | Search Entities, Organizations or Wallets                                        |
| [searchTokens](rules/searchTokens.md)                                      | Search for tokens based on contract address, pair address, token name or token s |

### Solana Endpoints

Solana-specific endpoints (24 native + 10 EVM variants that support Solana chain = 34 total).

| Endpoint                                                                        | Description                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [balance](rules/balance__solana.md)                                             | Gets native balance owned by the given address                                  |
| [getAggregatedTokenPairStats](rules/getAggregatedTokenPairStats__solana.md)     | Get aggregated token pair statistics by address                                 |
| [getBondingTokensByExchange](rules/getBondingTokensByExchange__solana.md)       | Get bonding tokens by exchange                                                  |
| [getCandleSticks](rules/getCandleSticks__solana.md)                             | Get candlesticks for a pair address                                             |
| [getGraduatedTokensByExchange](rules/getGraduatedTokensByExchange__solana.md)   | Get graduated tokens by exchange                                                |
| [getHistoricalTokenHolders](rules/getHistoricalTokenHolders__solana.md)         | Get token holders overtime for a given tokens                                   |
| [getMultipleTokenMetadata](rules/getMultipleTokenMetadata__solana.md)           | Get multiple token metadata                                                     |
| [getMultipleTokenPrices](rules/getMultipleTokenPrices__solana.md)               | Get token price                                                                 |
| [getNFTMetadata](rules/getNFTMetadata__solana.md)                               | Get the global metadata for a given contract                                    |
| [getNFTs](rules/getNFTs__solana.md)                                             | Gets NFTs owned by the given address                                            |
| [getNewTokensByExchange](rules/getNewTokensByExchange__solana.md)               | Get new tokens by exchange                                                      |
| [getPairStats](rules/getPairStats__solana.md)                                   | Get stats for a pair address                                                    |
| [getPortfolio](rules/getPortfolio__solana.md)                                   | Gets the portfolio of the given address                                         |
| [getSPL](rules/getSPL__solana.md)                                               | Gets token balances owned by the given address                                  |
| [getSnipersByPairAddress](rules/getSnipersByPairAddress__solana.md)             | Get snipers by pair address.                                                    |
| [getSwapsByPairAddress](rules/getSwapsByPairAddress__solana.md)                 | Get all swap related transactions (buy, sell, add liquidity & remove liquidity) |
| [getSwapsByTokenAddress](rules/getSwapsByTokenAddress__solana.md)               | Get all swap related transactions (buy, sell)                                   |
| [getSwapsByWalletAddress](rules/getSwapsByWalletAddress__solana.md)             | Get all swap related transactions (buy, sell) for a specific wallet address.    |
| [getTokenBondingStatus](rules/getTokenBondingStatus__solana.md)                 | Get Token Bonding Status                                                        |
| [getTokenHolders](rules/getTokenHolders__solana.md)                             | Get the summary of holders for a given token token.                             |
| [getTokenMetadata](rules/getTokenMetadata__solana.md)                           | Get Token metadata                                                              |
| [getTokenPairs](rules/getTokenPairs__solana.md)                                 | Get token pairs by address                                                      |
| [getTokenPrice](rules/getTokenPrice__solana.md)                                 | Get token price                                                                 |
| [getTopHolders](rules/getTopHolders__solana.md)                                 | Get paginated top holders for a given token.                                    |
| [getDiscoveryToken](rules/getDiscoveryToken__solana.md)                         | **Solana variant:** Get token details                                           |
| [getHistoricalTokenScore](rules/getHistoricalTokenScore__solana.md)             | **Solana variant:** Get historical token score by token address                 |
| [getTimeSeriesVolume](rules/getTimeSeriesVolume__solana.md)                     | **Solana variant:** Retrieve timeseries trading stats by chain                  |
| [getTimeSeriesVolumeByCategory](rules/getTimeSeriesVolumeByCategory__solana.md) | **Solana variant:** Retrieve timeseries trading stats by category               |
| [getTokenAnalytics](rules/getTokenAnalytics__solana.md)                         | **Solana variant:** Get token analytics by token address                        |
| [getTokenScore](rules/getTokenScore__solana.md)                                 | **Solana variant:** Get token score by token address                            |
| [getTopGainersTokens](rules/getTopGainersTokens__solana.md)                     | **Solana variant:** Get tokens with top gainers                                 |
| [getTopLosersTokens](rules/getTopLosersTokens__solana.md)                       | **Solana variant:** Get tokens with top losers                                  |
| [getTrendingTokens](rules/getTrendingTokens__solana.md)                         | **Solana variant:** Get trending tokens                                         |
| [getVolumeStatsByCategory](rules/getVolumeStatsByCategory__solana.md)           | **Solana variant:** Get trading stats by categories                             |

## Common Pitfalls

### Data Type Assumptions (MOST COMMON BUG SOURCE)

**NEVER assume these without checking the rule file:**

| Field          | Wrong Assumption            | Reality                                 |
| -------------- | --------------------------- | --------------------------------------- |
| `block_number` | Hex string `"0xf2b5a4"`     | Decimal number `12386788`               |
| `timestamp`    | Unix timestamp `1620394115` | ISO string `"2021-05-07T11:08:35.000Z"` |
| `decimals`     | Always number               | Can be string `"18"` or number `18`     |
| `balance`      | Number                      | Always string (BigInt required)         |

### Endpoint Path Inconsistencies

Not all endpoints follow the same pattern:

- `/{address}` - `getWalletTransactions`
- `/{address}/erc20` - `getWalletTokenBalances`
- `/wallets/{address}/stats` - `getWalletStats` ⚠️ Note the `/wallets/` prefix
- `/wallets/{address}/defi/positions` - `getDefiPositionsSummary` ⚠️
- `/latestBlockNumber/{chain}` - `getLatestBlockNumber` ⚠️ Chain is PATH param
- `/resolve/ens/{domain}` - `resolveENSDomain` ⚠️ Includes `/ens/` in path

### HTTP Method Surprises

Most endpoints are GET, but some are POST:

- `POST /erc20/metadata` - Takes token addresses in request body (actually GET with query param in v2.2)

### Response Wrapper Structures

Before writing code that accesses `.map()` or `.length`, verify the response structure:

```typescript
// ❌ WRONG - Assumes array
data.map(tx => ...)

// ✅ CORRECT - Check if wrapped
data.result?.map(tx => ...)  // or
data.result.map(tx => ...)   // or
[...data].map(tx => ...)      // for paginated responses
```

### TypeScript Property Names

Can't start property names with numbers:

```typescript
// ❌ Won't compile
interface TokenPrice {
  24hrPercentChange: string;
}

// ✅ Use quotes or rename
interface TokenPrice {
  "24hrPercentChange": string;  // or
  hr24PercentChange: string;
}
```

### Other Common Issues

- **Chain IDs:** Use hex (0x1, 0x89) to save API tokens, not names (eth, polygon)
- **Address format:** EVM addresses start with `0x`, Solana addresses are base58
- **Path parameters:** Replace `:address`, `:token_address` etc. with actual values
- **Streams API:** Streams uses `api.moralis-streams.com`, a different base URL

## Example Requests

```bash
# Get NFTs for an EVM wallet
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/nft?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"

# Get token price
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/price?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"

# Get wallet token balances
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/erc20?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Supported Chains

**EVM (40+ chains):** Ethereum (0x1), Polygon (0x89), BSC (0x38), Arbitrum (0xa4b1), Optimism (0xa), Base (0x2105), Avalanche (0xa86a), and more

**Solana:** Mainnet

> See [SupportedApisAndChains](rules/SupportedApisAndChains.md) for complete list of supported APIs and chains

## Reference Documentation

- [ApiResponseCodes](rules/ApiResponseCodes.md) - Common response formats, status codes, and field descriptions

## See Also

- Endpoint reference: See individual `rules/*.md` files for detailed documentation
- Streams API: @moralis-streams-api for real-time events
