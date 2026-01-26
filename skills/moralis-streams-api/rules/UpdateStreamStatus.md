# Update stream status

Updates the status of specific evm stream.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:id/status`

## Path Params

| Name | Type   | Required | Description                    | Example |
| ---- | ------ | -------- | ------------------------------ | ------- |
| id   | string | Yes      | The id of the stream to update | -       |

## Body

| Name   | Type                                       | Required | Description        | Example |
| ------ | ------------------------------------------ | -------- | ------------------ | ------- |
| status | string (active, paused, error, terminated) | No       | The stream status: |

[active] The Stream is healthy and processing blocks
[paused] The Stream is paused and is not processing blocks
[error] The Stream has encountered an error and is not processing blocks | \`[object Object]\` |

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/:id/status" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "status": {}
}'
```
