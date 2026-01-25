# Get multiple token metadata

Get multiple global token metadata for a given network and contract (mint, standard, name, symbol, metaplex).

## Method

POST

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/metadata`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string (mainnet) | Yes | The network to query | - |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| addresses | array | No | - | \`So11111111111111111111111111111111111111112\` |

## Example (curl)

```bash
curl -X POST "https://solana-gateway.moralis.io/token/mainnet/metadata" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "addresses": [
    "So11111111111111111111111111111111111111112"
  ]
}'
```
