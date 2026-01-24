---
name: moralis-streams-api
description: Query and manage Moralis Streams API for real-time blockchain event monitoring with webhooks. Use when working with streams, webhooks, or real-time blockchain event tracking.
disable-model-invocation: true
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
    version: "1.1.0"
    author: noviulian
    tags: [streams, webhooks, real-time, events, monitoring, moralis]
    context:
        fork: false
        agent: ""
    allowed-tools:
        - Bash
        - Read
    invocation:
        disable-model-invocation: true
        user-invocable: true
---

# Streams API

The Streams API skill provides access to Moralis Streams API for real-time blockchain event monitoring with webhooks.

## When to Use This Skill

Use this skill when you need to:

- Create and manage streams for real-time blockchain event monitoring
- Set up webhooks to receive blockchain events
- Monitor transactions, logs, token transfers, NFT transfers, and internal transactions
- Add/remove addresses to streams
- Update stream status (pause/resume)
- Get stream history, stats, and delivery logs
- Replay or resend historical webhook deliveries
- Update streams project settings (region, secret key)

## Base URL

```
https://api.moralis-streams.com
```

## Authentication

All requests require the Moralis API key in the header:

```
x-api-key: YOUR_API_KEY
```

Create a `.env` file (in this skill folder or a parent directory) with:

```
MORALIS_API_KEY=your_key_here
```

You can also use the shared `/moralis-api-key` command to set the same key for both Web3 and Streams skills.

## Core Endpoints

### List Streams

**Endpoint:** `GET /streams/evm`
**Function Name:** GetStreams
**Description:** Retrieve a list of all streams. Requires `limit` parameter (max 100).

**Endpoint:** `PUT /streams/evm`
**Function Name:** CreateStream
**Description:** Create a new stream for real-time blockchain event monitoring. Requires `webhookUrl`, `description`, and `chainIds`.

### Stream Details

**Endpoint:** `GET /streams/evm/:id`
**Function Name:** GetStream
**Description:** Get detailed information about a specific stream by ID.

**Endpoint:** `POST /streams/evm/:id`
**Function Name:** UpdateStream
**Description:** Update an existing stream. Supports partial updates (any subset of create fields).

**Endpoint:** `DELETE /streams/evm/:id`
**Function Name:** DeleteStream
**Description:** Permanently delete a stream. Use with caution - this cannot be undone.

### Stream Operations

**Endpoint:** `POST /streams/evm/:id/duplicate`
**Function Name:** DuplicateStream
**Description:** Create a copy of an existing stream with the same configuration.

**Endpoint:** `POST /streams/evm/:id/status`
**Function Name:** UpdateStreamStatus
**Description:** Update the status of a stream (active, paused, error, terminated).

### Address Management

**Endpoint:** `GET /streams/evm/:id/address`
**Function Name:** GetAddresses
**Description:** List all addresses associated with a stream. Requires `limit` parameter (max 100).

**Endpoint:** `POST /streams/evm/:id/address`
**Function Name:** AddAddressToStream
**Description:** Add one or more addresses to a stream.

**Endpoint:** `PATCH /streams/evm/:id/address`
**Function Name:** ReplaceAddressFromStream
**Description:** Replace addresses in a stream with a new set.

**Endpoint:** `DELETE /streams/evm/:id/address`
**Function Name:** DeleteAddressFromStream
**Description:** Remove one or more addresses from a stream.

### Block Data

**Endpoint:** `POST /streams/evm/:chainId/block/:blockNumber`
**Function Name:** GetStreamBlockDataByNumber
**Description:** Fetch historical block data using a stream's configuration. Uses POST method with optional body for filters.

**Endpoint:** `POST /streams/evm/:chainId/block-to-webhook/:blockNumber/:streamId`
**Function Name:** GetStreamBlockDataToWebhookByNumber
**Description:** Deliver historical block data directly to a stream's webhook. Uses POST method.

### History and Replay

**Endpoint:** `GET /history`
**Function Name:** GetHistory
**Description:** Retrieve stream history with optional filters. Requires `limit` parameter (max 100).

**Endpoint:** `GET /history/logs`
**Function Name:** GetHistoryLogs
**Description:** Get delivery logs for webhook deliveries. Requires `limit` parameter (max 100).

**Endpoint:** `POST /history/replay/:streamId/:id`
**Function Name:** ReplayHistory
**Description:** Replay a specific webhook delivery.

### Settings

**Endpoint:** `GET /settings`
**Function Name:** GetSettings
**Description:** Get project settings including region and secret key configuration.

**Endpoint:** `POST /settings`
**Function Name:** UpdateSettings
**Description:** Update project settings (region, secret key).

### Stats

**Endpoint:** `GET /stats`
**Function Name:** GetStats
**Description:** Get overall statistics for all streams.

**Endpoint:** `GET /stats/:streamId`
**Function Name:** GetStreamStats
**Description:** Get statistics for a specific stream.

## Aptos Streams Endpoints

### List Aptos Streams

**Endpoint:** `GET /streams/aptos`
**Function Name:** aptosStreamsGetAll
**Description:** Retrieve a list of all Aptos streams.

**Endpoint:** `PUT /streams/aptos`
**Function Name:** aptosStreamsCreate
**Description:** Create a new Aptos stream.

### Aptos Stream Details

**Endpoint:** `GET /streams/aptos/:id`
**Function Name:** aptosStreamsGet
**Description:** Get detailed information about a specific Aptos stream.

**Endpoint:** `POST /streams/aptos/:id`
**Function Name:** aptosStreamsUpdate
**Description:** Update an existing Aptos stream.

**Endpoint:** `DELETE /streams/aptos/:id`
**Function Name:** aptosStreamsDelete
**Description:** Delete an Aptos stream.

### Aptos Address Management

**Endpoint:** `POST /streams/aptos/:id/address`
**Function Name:** aptosStreamsAddAddresses
**Description:** Add addresses to an Aptos stream.

**Endpoint:** `DELETE /streams/aptos/:id/address`
**Function Name:** aptosStreamsDeleteAddresses
**Description:** Remove addresses from an Aptos stream.

**Endpoint:** `GET /streams/aptos/:id/address`
**Function Name:** aptosStreamsGetAddresses
**Description:** List all addresses in an Aptos stream.

### Aptos Stream Status

**Endpoint:** `POST /streams/aptos/:id/status`
**Function Name:** aptosStreamsUpdateStatus
**Description:** Update the status of an Aptos stream.

## Stream Status Values

- `active` - Stream is processing blocks
- `paused` - Stream is paused
- `error` - Stream encountered an error
- `terminated` - Stream is terminated

## Chain IDs (Hex Format)

Common chain IDs:

- Ethereum: `0x1`
- Polygon: `0x89`
- BSC: `0x38`
- Arbitrum: `0xa4b1`
- Avalanche: `0xa86a`
- Optimism: `0xa`
- Base: `0x2105`
- Flow (2025): `0x54`
- Ronin (2025): `0x7e`
- Lisk (2025): `0x94`
- Sei (2025): `0x82`
- Monad (2025): `0x8f`

## Advanced Options (Selectors)

### Transaction Selectors

- Use function signature for monitoring specific contract calls
- Example: `0xa9059cbb` for `transfer(address,uint256)`

### Log Filters

- Monitor contract events by topic0 (event signature)
- Example: `Transfer(address,address,uint256)`

## Common Pitfalls

1. **Chain ID format**: Always use hex format (e.g., `0x1` not `1` or `eth`)
2. **Limit parameter**: The `limit` parameter is required on GET endpoints and max is 100
3. **Stream ID format**: Stream IDs are UUIDs (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
4. **Webhook URL**: Must be a valid HTTPS URL
5. **Topic0 format**: Event signatures must be in string format, not keccak256 hash
6. **Block endpoints**: `/block` and `/block-to-webhook` use `POST`, not `GET`
7. **Address removal**: Use `PATCH` or `DELETE` with a JSON body
8. **Status updates**: Use the status endpoint to pause/resume, don't delete to pause
9. **DELETE method**: The `DELETE /streams/evm/{id}` endpoint permanently removes a stream. Use `POST /streams/evm/{id}/status` with `{"status":"paused"}` instead if you want to temporarily disable it.

## Example Query

```bash
# Create a stream for monitoring ETH transfers
streams-api query '/streams/evm', {
  method: 'PUT',
  body: {
    webhookUrl: 'https://example.com/webhook',
    description: 'Monitor ETH transfers',
    topic0: ['Transfer(address,address,uint256)'],
    includeNativeTxs: true,
    chainIds: ['0x1']
  }
}
```

## Additional resources

- [Streams API endpoints reference](references/STREAMS_ENDPOINTS.md)
