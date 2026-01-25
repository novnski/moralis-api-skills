# Get token price

Gets the token price (usd and native) for a given contract address and network.

## Method

POST

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/prices`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string (mainnet) | Yes | The network to query | - |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| addresses | array | No | - | \`\` |

## Example (curl)

```bash
curl -X POST "https://solana-gateway.moralis.io/token/mainnet/prices" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "addresses": []
}'
```
