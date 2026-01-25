# Get Metadata for NFTs

Get NFT metadata for one or many NFTs. Accepts an array of up to 25 `tokens`, each requiring `token_address` and `token_id`. Each NFT returned includes on-chain metadata as well as off-chain metadata, floor prices, rarity and more where available.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/getMultipleNFTs`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, fantom, 0xfa, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, chiliz testnet, 0x15b32, gnosis, 0x64, gnosis testnet, 0x27d8, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, moonbase, 0x507, linea sepolia, 0xe705, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x7e5, lisk, 0x46f, lisk-sepolia, 0x106a, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tokens | array | No | The tokens to be fetched (max 25 tokens) | \`[object Object],[object Object],[object Object]\` |
| normalizeMetadata | boolean | No | Should normalized metadata be returned? | \`-\` |
| media_items | boolean | No | Should preview media data be returned? | \`-\` |

## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/nft/getMultipleNFTs?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "tokens": [
    {
      "token_address": "0xa4991609c508b6d4fb7156426db0bd49fe298bd8",
      "token_id": "12"
    },
    {
      "token_address": "0x3c64dc415ebb4690d1df2b6216148c8de6dd29f7",
      "token_id": "1"
    },
    {
      "token_address": "0x3c64dc415ebb4690d1df2b6216148c8de6dd29f7",
      "token_id": "200"
    }
  ],
  "normalizeMetadata": false,
  "media_items": false
}'
```
