---
name: moralis-streams-api
description: Real-time blockchain event monitoring with webhooks. REST API for stream management (create, update, delete streams, add addresses).
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "3.3.0"
  author: web3-skills
  tags: [web3, blockchain, streaming, webhooks, events, realtime]
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
6. [ ] Note the HTTP method (GET vs POST vs PUT vs DELETE)
7. [ ] Note the endpoint path EXACTLY (path params vs query params)
8. [ ] Note any wrapper structure ({ stream: {...} } vs direct arrays)

**Only after completing ALL 8 checks should you write code.**

Failure to follow this process will result in:
- Wrong HTTP methods (using GET instead of PUT for creating streams)
- Missing required fields in stream configurations
- Runtime errors (accessing undefined properties)
- Incorrect endpoint paths (404 errors)

---

# Moralis Streams API

Real-time blockchain event monitoring with webhook delivery. Monitor transactions, logs, token transfers, NFT transfers, and internal transactions across EVM chains.

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
curl "https://api.moralis-streams.com/..." \
  -H "X-API-Key: ${MORALIS_API_KEY}"
```

**Note:** The key set in this skill is also available to @moralis-data-api within the same session (and vice versa). You only need to provide it once.

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
curl "https://api.moralis-streams.com/streams/evm?limit=10" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Authentication

All requests require the API key header:

```bash
X-API-Key: <your_api_key>
```

## Webhook Security

All webhook requests from Moralis Streams are signed with your **streams secret** (different from your API key) to verify authenticity.

### Signature Verification

- **Header:** `x-signature`
- **Algorithm:** `web3.utils.sha3(JSON.stringify(body) + secret)`
- **Secret location:** Moralis Streams Settings page

See [WebhookSecurity.md](rules/WebhookSecurity.md) for complete verification examples in JavaScript, Python, and Go.

See [WebhookResponseBody.md](rules/WebhookResponseBody.md) for webhook payload structure examples (ERC20 transfers, NFT transfers, internal transactions, etc.).

### Quick Example (JavaScript)

```javascript
const verifySignature = (req, secret) => {
  const providedSignature = req.headers["x-signature"];
  if (!providedSignature) throw new Error("Signature not provided");

  const generatedSignature = web3.utils.sha3(JSON.stringify(req.body) + secret);
  if (generatedSignature !== providedSignature) {
    throw new Error("Invalid Signature");
  }
};
```

**Always verify signatures** before processing webhook data to prevent fake requests.

## Base URL

```
https://api.moralis-streams.com
```

⚠️ **Important:** Streams API uses a different base URL than the Data API.

## When to Use This Skill

Use this skill when the user asks about:
- **Real-time monitoring:** Track blockchain events as they happen
- **Webhooks:** Set up event streaming to your server
- **Stream management:** Create, update, delete, pause/resume streams
- **Address monitoring:** Add/remove addresses from streams
- **Historical delivery:** Replay past blockchain events
- **Stream analytics:** Get stream statistics and history

⚠️ **NOT for:** Querying current blockchain state → Use @moralis-data-api

## Stream Types

| Type | Description |
|------|-------------|
| `tx` | Native transactions |
| `log` | Contract event logs |
| `erc20transfer` | ERC20 token transfers |
| `erc20approval` | ERC20 approvals |
| `nfttransfer` | NFT transfers |
| `internalTx` | Internal transactions |

## Endpoint Rules

Endpoints and reference docs live in `rules/`:

```bash
# Endpoint rules (examples)
rules/GetStreams.md          # List all streams
rules/CreateStream.md        # Create a new stream
rules/GetStream.md           # Get stream details
rules/UpdateStream.md        # Update existing stream
rules/DeleteStream.md        # Delete a stream
rules/AddAddressToStream.md  # Add addresses to monitor
rules/DeleteAddressFromStream.md  # Remove addresses
# ... and 14 more

# Reference docs (non-endpoint)
rules/FAQ.md
rules/WebhookSecurity.md
rules/WebhookResponseBody.md
```

## Endpoint Catalog

Complete list of all 20 Streams API endpoints organized by category.

### Stream Management

Create, update, delete, and manage streams.

| Endpoint | Description |
|----------|-------------|
| [AddAddressToStream](rules/AddAddressToStream.md) | Add address to stream |
| [CreateStream](rules/CreateStream.md) | Create stream |
| [DeleteAddressFromStream](rules/DeleteAddressFromStream.md) | Delete address from stream |
| [DeleteStream](rules/DeleteStream.md) | Delete stream |
| [DuplicateStream](rules/DuplicateStream.md) | Duplicate stream |
| [GetAddresses](rules/GetAddresses.md) | Get addresses by stream |
| [GetHistory](rules/GetHistory.md) | Get history |
| [GetLogs](rules/GetLogs.md) | Get logs |
| [GetSettings](rules/GetSettings.md) | Get project settings |
| [GetStats](rules/GetStats.md) | Get project stats |
| [GetStatsByStreamId](rules/GetStatsByStreamId.md) | Get project stats by Stream ID |
| [GetStream](rules/GetStream.md) | Get a specific evm stream. |
| [GetStreamBlockDataByNumber](rules/GetStreamBlockDataByNumber.md) | Get webhook data returned on the block number with provided stream config |
| [GetStreamBlockDataToWebhookByNumber](rules/GetStreamBlockDataToWebhookByNumber.md) | Send webhook based on a specific block number using stream config and addresses. |
| [GetStreams](rules/GetStreams.md) | Get streams |
| [ReplaceAddressFromStream](rules/ReplaceAddressFromStream.md) | Replaces address from stream |
| [UpdateStream](rules/UpdateStream.md) | Update stream |
| [UpdateStreamStatus](rules/UpdateStreamStatus.md) | Update stream status |

### Status & Settings

Pause/resume streams and configure settings.

| Endpoint | Description |
|----------|-------------|
| [SetSettings](rules/SetSettings.md) | Set project settings |

### History & Analytics

Stream history, replay, statistics, logs, and block data.

| Endpoint | Description |
|----------|-------------|
| [ReplayHistory](rules/ReplayHistory.md) | Replay history |
| [ReplayFailedWebhooks](rules/ReplayFailedWebhooks.md) | Replay failed webhook deliveries |


## HTTP Methods

| Action | HTTP Method |
|--------|-------------|
| Create stream | `PUT` |
| Update stream | `POST` |
| Delete stream | `DELETE` |
| Get streams | `GET` |

## Common Pitfalls

### HTTP Method Confusion

The Streams API uses different HTTP methods than typical REST APIs:

| Action | HTTP Method | Endpoint |
|--------|-------------|----------|
| Create stream | `PUT` | `/streams/evm` |
| Update stream | `POST` | `/streams/evm/{id}` |
| Delete stream | `DELETE` | `/streams/evm/{id}` |
| Get streams | `GET` | `/streams/evm` |

⚠️ **Common mistake:** Using POST to create streams. Use PUT instead.

### Stream Configuration Gotchas

When creating streams, always check the rule file for required fields:

- **Different base URL:** Streams uses `api.moralis-streams.com`, NOT `deep-index.moralis.io`
- **Limit required:** `GET /streams/evm` requires `limit` parameter (max 100)
- **Stream IDs:** UUIDs, not hex strings (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
- **Chain IDs:** Use hex format (e.g., `0x1` for Ethereum, `0x89` for Polygon)
- **Topic0 format:** Event signatures must be exact: `Transfer(address,address,uint256)`

### Response Structure Variations

Different endpoints return different structures:

```typescript
// GetStreams returns array directly
{ result: Stream[] }

// GetStream returns wrapped object
{ stream: { id, webhookUrl, ... } }

// GetStats returns nested structure
{ totalStreams, activeStreams, ... }
```

### Webhook Payload Fields

Webhook payloads have different field names than API responses:

- `method_label` (not `method`) in transaction history webhooks
- `synced_at` (not `sync_at`) in NFT metadata webhooks
- `chainId` is hex string in webhooks, decimal in some API responses

### Other Common Issues

- **AllAddresses:** When `true`, monitors ALL addresses on specified chains (resource-intensive)
- **Advanced options:** Some features like `includeNativeHash` require advanced options configuration
- **Status values:** Use `"active"` or `"paused"` exactly (lowercase, not `"ACTIVE"` or `"PAUSED"`)

## Quick Reference: Stream Configuration

### Stream ID Format

**ALWAYS UUID, never hex:**

```typescript
// ❌ WRONG - Hex format
"0x1234567890abcdef"

// ✅ CORRECT - UUID format
"a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

### Chain IDs

**ALWAYS hex strings:**

```typescript
// Common chain IDs
"0x1"     // Ethereum
"0x89"    // Polygon
"0x38"    // BSC
"0xa4b1"  // Arbitrum
"0xa"     // Optimism
"0x2105"  // Base
```

### Topic0 (Event Signature) Format

**Must be exact Solidity event signature:**

```typescript
// ERC20 Transfer
"Transfer(address,address,uint256)"

// ERC20 Approval
"Approval(address,address,uint256)"

// NFT Transfer
"Transfer(address,address,uint256)"

// Custom event
"MyEvent(address,uint256,bytes)"
```

### Stream Status Values

**Lowercase only:**

```typescript
// ✅ CORRECT
"active"
"paused"

// ❌ WRONG
"ACTIVE"
"PAUSED"
"Active"
"Paused"
```

### Common Stream Field Mappings

```typescript
// API response → TypeScript interface
{
  webhook_url: string;
  chain_ids: string[];
  topic0: string[];
  all_addresses: boolean;
  include_native_hash: boolean;
}
→ {
  webhookUrl: string;
  chainIds: string[];
  topic0: string[];
  allAddresses: boolean;
  includeNativeHash: boolean;
}
```

## Testing Stream Endpoints

Before implementing, verify the endpoint works with curl:

### Template Commands

```bash
# Replace placeholders:
API_KEY="your_key_here"
WEBHOOK_URL="https://your-server.com/webhook"

# Test listing streams
curl -s "https://api.moralis-streams.com/streams/evm?limit=10" \
  -H "X-API-Key: ${API_KEY}" | jq '.'

# Test creating a stream
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "'${WEBHOOK_URL}'",
    "description": "Test stream",
    "tag": "test",
    "topic0": ["Transfer(address,address,uint256)"],
    "allAddresses": false,
    "chainIds": ["0x1"],
    "advancedOptions": [{
      "topic0": "Transfer(address,address,uint256)",
      "includeNativeHash": true
    }]
  }' | jq '.'
```

### Quick Test by Category

```bash
# List all streams (requires limit parameter)
curl "https://api.moralis-streams.com/streams/evm?limit=100" \
  -H "X-API-Key: ${API_KEY}"

# Get specific stream
curl "https://api.moralis-streams.com/streams/evm/<stream_id>" \
  -H "X-API-Key: ${API_KEY}"

# Get stream stats
curl "https://api.moralis-streams.com/streams/evm/<stream_id>/stats" \
  -H "X-API-Key: ${API_KEY}"

# Pause a stream
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/status" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"status": "paused"}'
```

## Troubleshooting Stream Issues

### Issue: "400 Bad Request on stream creation"

**Cause**: Invalid stream configuration

**Common mistakes**:
- Missing required `webhookUrl`
- Invalid `topic0` format (must be exact event signature)
- `allAddresses: true` without proper resource allocation
- Invalid chain ID format (use hex strings)

**Solution**: Verify all required fields in `rules/CreateStream.md`

### Issue: "404 Not Found for stream"

**Cause**: Stream ID format is wrong or stream doesn't exist

**Solution**:
```typescript
// Check if it's a valid UUID format
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
if (!uuidRegex.test(streamId)) {
  throw new Error('Invalid stream ID format. Must be UUID.');
}
```

### Issue: "Using wrong HTTP method"

**Cause**: Streams API uses non-standard HTTP methods

**Solution**:
```typescript
// ✅ CORRECT
PUT    /streams/evm          // Create
POST   /streams/evm/{id}     // Update
DELETE /streams/evm/{id}     // Delete
GET    /streams/evm          // List

// ❌ WRONG
POST   /streams/evm          // Won't create
GET    /streams/evm/{id}     // Won't update
```

### Issue: "Missing limit parameter"

**Cause**: `GET /streams/evm` requires `limit` parameter

**Solution**:
```bash
# ❌ WRONG - Missing limit
curl "https://api.moralis-streams.com/streams/evm"

# ✅ CORRECT - Includes limit (max 100)
curl "https://api.moralis-streams.com/streams/evm?limit=100"
```

### Issue: "Webhook signature verification failing"

**Cause**: Incorrect signature calculation

**Solution**: See `rules/WebhookSecurity.md` for complete examples

```typescript
// Correct signature calculation
const signature = web3.utils.sha3(JSON.stringify(body) + secret);
```

### Issue: "No webhook data received"

**Cause**: Stream not active or no matching events

**Solution**:
1. Verify stream status is `"active"` (not `"paused"`)
2. Check `chainIds` are correct
3. Verify `topic0` matches the contract event
4. For address-specific streams, verify addresses are added
5. Check webhook URL is accessible from internet

## Recommended Development Workflow

### Step 1: Understand Stream Requirements
- What events do you want to monitor?
- Which chains?
- Specific addresses or all addresses?
- What data do you need in webhooks?

### Step 2: Read the Rule File
- Open `rules/{EndpointName}.md`
- Find the "Example Response" section
- Copy the exact JSON structure

### Step 3: Test with curl
- Use the template from "Testing Stream Endpoints" above
- Create a test stream first
- Verify webhook endpoint is reachable

### Step 4: Implement Webhook Handler
- Create webhook endpoint in your application
- Implement signature verification (CRITICAL for security)
- Parse incoming webhook data
- Store/process events as needed

### Step 5: Implement Stream Management
- Create stream using `CreateStream` endpoint
- Save stream ID for later management
- Implement pause/resume functionality
- Implement add/remove addresses

### Step 6: Test End-to-End
- Trigger a test transaction on monitored chain
- Verify webhook receives data
- Verify signature verification works
- Check data is processed correctly

### Step 7: Handle Edge Cases
- Webhook delivery failures
- Signature verification failures
- Duplicate events
- Stream status changes

## Pagination

List endpoints use cursor-based pagination:

```bash
# First page
curl "https://api.moralis-streams.com/streams/evm?limit=100" \
  -H "X-API-Key: YOUR_API_KEY"

# Next page (use cursor from response)
curl "https://api.moralis-streams.com/streams/evm?limit=100&cursor=<cursor>" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Example Requests

```bash
# List all streams
curl "https://api.moralis-streams.com/streams/evm?limit=100" \
  -H "X-API-Key: YOUR_API_KEY"

# Create a new stream for monitoring ERC20 transfers
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://your-server.com/webhook",
    "description": "Monitor ERC20 transfers",
    "tag": "erc20-monitors",
    "topic0": ["Transfer(address,address,uint256)"],
    "allAddresses": true,
    "chainIds": ["0x1", "0x89"],
    "advancedOptions": [
      {
        "topic0": "Transfer(address,address,uint256)",
        "includeNativeHash": true
      }
    ]
  }'

# Get stream details
curl "https://api.moralis-streams.com/streams/evm/<stream_id>" \
  -H "X-API-Key: YOUR_API_KEY"

# Delete a stream
curl -X DELETE "https://api.moralis-streams.com/streams/evm/<stream_id>" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Stream Status

Pause or resume a stream:

```bash
# Pause a stream
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/status" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "paused"}'

# Resume a stream
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/status" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

## Address Management

Add or remove addresses from an existing stream:

```bash
# Add addresses
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/address" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "addressToAdd": ["0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"]
  }'

# Remove address
curl -X DELETE "https://api.moralis-streams.com/streams/evm/<stream_id>/address/<address>" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Supported Chains

**EVM chains supported:** All major EVM chains including Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, and more (use hex chain IDs like `0x1`, `0x89`, etc.)

## See Also

- Endpoint reference: See individual `rules/*.md` files for detailed documentation
- Data API: @moralis-data-api for querying current blockchain state
