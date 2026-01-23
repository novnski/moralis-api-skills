# Solana NFT API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Solana NFT metadata?" | `/nft/:network/:address/metadata` | NFT info |
| "Wallet NFTs?" | `/account/:network/:address/nft` | All wallet NFTs |

## Key Endpoint Patterns

- **NFT metadata:** `/nft/:network/:address/metadata` (contract-level metadata)
- **Wallet NFTs:** `/account/:network/:address/nft` (NFTs owned by wallet)
- **Network parameter:** `mainnet` or `devnet`

---

## Get NFT Metadata

- **Endpoint:** `GET /nft/:network/:address/metadata`
- **Description:** Get NFT metadata. Retrieves contract-level metadata including mint, standard, name, symbol, and Metaplex metadata.
- **API Reference:** https://solana-gateway.moralis.io/nft/:network/:address/metadata
- **Use this endpoint when:** User asks "Solana NFT metadata", "contract info", "NFT details", "collection metadata", "mint metadata"
- **Networks:** mainnet, devnet
- **Params:**- `network` (required, string) - The network to query- `address` (required, string) - The address to query- `mediaItems` (optional, boolean) - Should return media items

---

## Get NFTs by Wallet

- **Endpoint:** `GET /account/:network/:address/nft`
- **Description:** Get NFTs by wallet. Retrieves all NFTs owned by a wallet address.
- **API Reference:** https://solana-gateway.moralis.io/account/:network/:address/nft
- **Use this endpoint when:** User asks "wallet NFTs", "what NFTs does this wallet own", "Solana NFT portfolio", "NFT collection"
- **Networks:** mainnet, devnet
- **Params:**- `network` (required, string) - The network to query- `address` (required, string) - The address to query- `nftMetadata` (optional, boolean) - Should return the full NFT metadata- `mediaItems` (optional, boolean) - Should return media items- `excludeSpam` (optional, boolean) - Should exclude spam NFTs- `includeFungibleAssets` (optional, boolean) - Should include fungible assets (tokenStandard:1)

---

## Notes

The Solana NFT API is more limited than the EVM NFT API.

**❌ Not Available on Solana:**
- NFT transfers/history (use RPC or indexer)
- NFT owners by contract (derive from holdings)
- NFT trades/sales (use marketplace APIs)
- NFT floor prices (use marketplace APIs like Tensor, Magic Eden)
- NFT traits/rarity (use on-chain metadata or indexer)
- NFT collections summary (limited functionality)
- Trending NFTs by market cap/volume

**✅ Available:**
- Contract-level metadata
- NFTs owned by wallet
- Basic media items

For more detailed Solana NFT operations, consider using:
- Solana RPC directly (for on-chain data)
- Marketplace APIs (Tensor, Magic Eden, Coral Cube)
- Specialized Solana NFT indexers (Helius, Triton)
