# Streams API Endpoints Reference

This reference lists Streams API endpoints and request shapes from the swagger file.

## List Streams

```
GET /streams/evm
```

Query parameters:- `limit` (required, integer) - Max 100- `cursor` (optional, string) - For pagination- `status` (optional, string) - Filter by status

## Create a Stream

```
PUT /streams/evm
```

Required fields: `webhookUrl`, `description`, `chainIds`.

Request body:
```json
{
  "webhookUrl": "https://your-server.com/webhook",
  "description": "My stream",
  "tag": "production",
  "topic0": ["Transfer(address,address,uint256)"],
  "allAddresses": true,
  "includeNativeTxs": true,
  "includeContractLogs": true,
  "includeInternalTxs": false,
  "includeAllTxLogs": false,
  "getNativeBalances": [
    { "type": "tx", "selectors": ["0xa9059cbb"] }
  ],
  "advancedOptions": [
    { "type": "tx", "selectors": ["0xa9059cbb"] }
  ],
  "chainIds": ["0x1", "0x89"],
  "demo": false,
  "filterPossibleSpamAddresses": true,
  "triggers": [
    {
      "type": "log",
      "contractAddress": "0x1234...",
      "functionAbi": { "type": "event", "name": "Transfer", "inputs": [] }
    }
  ]
}
```

## Get, Update, or Delete a Stream

```
GET /streams/evm/{id}
POST /streams/evm/{id}
DELETE /streams/evm/{id}
```

`POST` supports partial updates (any subset of create fields).

## Duplicate a Stream

```
POST /streams/evm/{id}/duplicate
```

## Update Stream Status

```
POST /streams/evm/{id}/status
```

Request body:
```json
{
  "status": "paused"
}
```

## Stream Addresses

```
GET /streams/evm/{id}/address
```

Query parameters:- `limit` (required, integer) - Max 100- `cursor` (optional, string) - For pagination

Add addresses:
```
POST /streams/evm/{id}/address
```

Remove addresses:
```
PATCH /streams/evm/{id}/address
DELETE /streams/evm/{id}/address
```

Request body:
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

The `address` field can also be an array of addresses.

## Block Data & Webhook Delivery

Fetch block data for a stream config:
```
POST /streams/evm/{chainId}/block/{blockNumber}
```

Request body (all fields optional):
```json
{
  "tag": "backfill",
  "topic0": ["Transfer(address,address,uint256)"],
  "allAddresses": false,
  "includeNativeTxs": true,
  "includeContractLogs": true,
  "includeInternalTxs": false,
  "includeAllTxLogs": false,
  "filterPossibleSpamAddresses": true,
  "addresses": ["0x1234..."]
}
```

Deliver block data to a specific stream webhook:
```
POST /streams/evm/{chainId}/block-to-webhook/{blockNumber}/{streamId}
```

## History & Delivery Logs

```
GET /history
```

Query parameters:- `limit` (required, integer) - Max 100- `cursor` (optional, string) - `transactionHash` (optional)- `excludePayload` (optional, boolean) - boolean- `streamId` (optional, string) - `chainId` (optional) - array- `blockNumber` (optional, integer) - array- `fromTimestamp` (optional, integer) - number- `toTimestamp` (optional, integer) - number

```
GET /history/logs
```

Query parameters:- `limit` (required, integer) - Max 100- `cursor` (optional, string) - `streamId` (optional)- `transactionHash` (optional, string) - `deliveryStatus` (optional) - array- `chainId` (optional, string) - array- `blockNumber` (optional, integer) - array- `fromTimestamp` (optional, integer) - number- `toTimestamp` (optional, integer) - number

Replay a delivery:
```
POST /history/replay/{streamId}/{id}
```

## Settings

```
GET /settings
POST /settings
```

Request body:
```json
{
  "region": "us-east-1",
  "secretKey": "your-shared-secret"
}
```

Supported regions: `us-east-1`, `us-west-2`, `eu-central-1`, `ap-southeast-1`.

## Stats

```
GET /stats
GET /stats/{streamId}
```
