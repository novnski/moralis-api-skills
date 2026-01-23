---
name: streams-api
description: Query and manage Moralis Streams API for real-time blockchain event monitoring with webhooks. Use when working with streams, webhooks, or real-time blockchain event tracking.
disable-model-invocation: true
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "1.0.0"
  author: noviulian
  tags: [streams, webhooks, real-time, events, monitoring, moralis]
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
https://streams.moralis.io/api/v2.2
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

You can also use the shared `/web3-api-key` command to set the same key for both Web3 and Streams skills.

## Core Endpoints

- `GET /streams/evm` - List streams (requires `limit`)
- `PUT /streams/evm` - Create a stream
- `GET /streams/evm/{id}` - Get stream details
- `POST /streams/evm/{id}` - Update a stream
- `DELETE /streams/evm/{id}` - Delete a stream
- `POST /streams/evm/{id}/duplicate` - Duplicate a stream
- `POST /streams/evm/{id}/status` - Update stream status
- `GET /streams/evm/{id}/address` - List stream addresses (requires `limit`)
- `POST /streams/evm/{id}/address` - Add addresses to a stream
- `PATCH /streams/evm/{id}/address` - Remove addresses from a stream
- `POST /streams/evm/{chainId}/block/{blockNumber}` - Fetch stream block data (POST)
- `POST /streams/evm/{chainId}/block-to-webhook/{blockNumber}/{streamId}` - Deliver block data to webhook (POST)
- `GET /history` - Stream history (requires `limit`)
- `GET /history/logs` - Delivery logs (requires `limit`)
- `POST /history/replay/{streamId}/{id}` - Replay delivery
- `GET /settings` - Get project settings
- `POST /settings` - Update project settings
- `GET /stats` - Get overall stats
- `GET /stats/{streamId}` - Get stats for a stream

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
7. **Address removal**: Use `PATCH` (or `DELETE`) with a JSON body
8. **Status updates**: Use the status endpoint to pause/resume, don't delete to pause

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
