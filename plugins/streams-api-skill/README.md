# Streams API Skill for Claude Code

Real-time blockchain event monitoring with webhooks using the [Moralis Streams API](https://docs.moralis.io/streams).

## Features

- **Zero Dependencies** - Pure Node.js built-in modules only
- **Real-time Event Streaming** - Webhook-based event delivery
- **Multiple Event Types** - Monitor transactions, logs, token transfers, NFT transfers, and internal transactions
- **Address Management** - Add/remove addresses to streams dynamically
- **Stream Control** - Create, update, delete, pause, and resume streams
- **History & Analytics** - Get stream history, delivery logs, and block data
- **Replay & Settings** - Replay deliveries and update webhook settings

## Quick Start

**Step 1:** Install from marketplace
```bash
/plugin marketplace add noviulian/moralis-skills
/plugin install streams-api-skill@moralis-api
```

**Step 2:** Set your API key
```bash
# Create a .env file in the streams-api skill directory (or a parent folder)
MORALIS_API_KEY=your_key_here
```

You can also run the shared command (it sets the key for both plugins):
```bash
/web3-api-key <paste your API key here>
```

**Step 3:** Create your first stream
```bash
"Create a stream to monitor all ERC20 transfers on Ethereum with webhook URL https://example.com/webhook"
```

## Stream Types

| Type | Description |
|------|-------------|
| `tx` | Native transactions |
| `log` | Contract event logs |
| `erc20transfer` | ERC20 token transfers |
| `erc20approval` | ERC20 approvals |
| `nfttransfer` | NFT transfers |
| `internalTx` | Internal transactions |

## Usage Examples

```bash
# Create a stream
"Create a stream to monitor USDC transfers on Ethereum"

# Get all streams
"Get all my streams"

# Get a specific stream
"Get details for stream a1b2c3d4-e5f6-7890-abcd-ef1234567890"

# Update a stream
"Update the stream to also monitor Polygon"

# Pause a stream
"Pause the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890"

# Resume a stream
"Resume the paused stream"

# Add an address to a stream
"Add address 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 to stream"

# Delete a stream
"Delete the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

## API Endpoints

### Stream Management
- `GET /streams/evm` - Get all streams
- `PUT /streams/evm` - Create a new stream
- `GET /streams/evm/{id}` - Get a specific stream
- `POST /streams/evm/{id}` - Update a stream
- `DELETE /streams/evm/{id}` - Delete a stream
- `POST /streams/evm/{id}/duplicate` - Duplicate a stream

### Stream Status
- `POST /streams/evm/{id}/status` - Update stream status (pause/resume)

### Address Management
- `GET /streams/evm/{id}/address` - Get all addresses in a stream
- `POST /streams/evm/{id}/address` - Add an address to a stream
- `PATCH /streams/evm/{id}/address` - Remove addresses from a stream
- `DELETE /streams/evm/{id}/address` - Remove addresses from a stream

### Block Data & Delivery
- `POST /streams/evm/{chainId}/block/{blockNumber}` - Get stream block data
- `POST /streams/evm/{chainId}/block-to-webhook/{blockNumber}/{streamId}` - Deliver block data to a stream webhook

### History & Logs
- `GET /history` - Stream history (delivery payloads)
- `GET /history/logs` - Delivery logs
- `POST /history/replay/{streamId}/{id}` - Replay a delivery

### Settings & Stats
- `GET /settings` - Get project settings
- `POST /settings` - Update project settings
- `GET /stats` - Overall stats
- `GET /stats/{streamId}` - Stream stats

## Supported Chains

All EVM chains in hex format:
- Ethereum: `0x1`
- Polygon: `0x89`
- BSC: `0x38`
- Arbitrum: `0xa4b1`
- Optimism: `0xa`
- Avalanche: `0xa86a`
- Base: `0x2105`
- And more...

## Stream Status Values

- `active` - Stream is processing blocks
- `paused` - Stream is paused
- `error` - Stream encountered an error
- `terminated` - Stream is terminated

## Common Pitfalls

1. **Chain ID format**: Always use hex format (e.g., `0x1` not `1` or `eth`)
2. **Limit parameter**: The `limit` parameter is required on GET endpoints and max is 100
3. **Stream ID format**: Stream IDs are UUIDs (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
4. **Webhook URL**: Must be a valid HTTPS URL
5. **Topic0 format**: Event signatures must be in string format, not keccak256 hash
6. **Status updates**: Use the status endpoint to pause/resume, don't delete to pause

## Documentation

- **Get API Key:** Register at [admin.moralis.io/register](https://admin.moralis.io/register), then get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)
- [Moralis Streams API Docs](https://docs.moralis.io/streams)

## License

MIT License - see [LICENSE](../../../LICENSE) file for details.
