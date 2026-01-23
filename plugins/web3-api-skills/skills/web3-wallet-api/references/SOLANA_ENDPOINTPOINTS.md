# Solana Wallet API Endpoints

## Get Native Balance

- **Endpoint:** `GET /account/:network/:address/balance`
- **Description:** Get SOL balance
- **Networks:** mainnet, devnet

## Get SPL Tokens

- **Endpoint:** `GET /account/:network/:address/tokens`
- **Description:** Get all SPL token balances
- **Networks:** mainnet, devnet

## Get Portfolio

- **Endpoint:** `GET /account/:network/:address/portfolio`
- **Description:** Get full portfolio with prices
- **Networks:** mainnet, devnet

## Get NFTs

- **Endpoint:** `GET /account/:network/:address/nft`
- **Description:** Get all NFTs owned
- **Networks:** mainnet, devnet

## Get Token Swaps

- **Endpoint:** `GET /account/:network/:walletAddress/swaps`
- **Description:** Get token swap history by wallet address
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`
