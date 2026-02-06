---
layout: default
title: Usage Examples
---

# Usage Examples

Ask Claude these natural language queries to interact with the Moralis Web3 API. No need to write curl commands or code - just describe what you want.

## First Time Setup

Add your API key to a `.env` file — the skill will offer to create it for you, or do it manually:

```bash
echo "MORALIS_API_KEY=your_key_here" >> .env
```

Without the key, the skill can't call the Moralis API on your behalf.

---

## General Questions

Ask general questions about Moralis before diving into specific queries:

- What is Moralis?
- What chains does Moralis support?
- Which Moralis API should I use for tracking wallet activity?
- Can Moralis detect snipers and bots?
- What's the difference between the Data API and Streams?
- How much does Moralis cost?
- What can I build with Moralis?

---

## Wallet Queries

### Check Balances

- How much ETH does `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` have?
- Get the native balance of this Solana wallet: `742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
- Check the MATIC balance for address `0x...` on Polygon
- How much SOL is in wallet `...`?

### Token Holdings

- What tokens does `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` hold on Ethereum?
- Show me all ERC20 tokens in this wallet on Base
- Get token balances for this Solana address
- List all tokens held by `0x...` on Arbitrum

### NFT Collections

- Get all NFTs owned by `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- Show me the NFTs in this Polygon wallet
- What NFTs does this address hold on Ethereum?
- List NFTs for wallet `...` on Optimism

### DeFi & Trading Data

- Get DeFi positions for `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- What's the profitability of this wallet?
- Show me the trading history for this address
- Get token approvals for this wallet

### Wallet History

- Show all transactions for `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- Get internal transactions for this address
- What's the native balance history for this wallet?
- Show token transfers for this address

---

## Token Queries

### Price & Market Data

- What's the price of ETH?
- Get the current price of USDC on Ethereum
- What's the price of token `0x6B175474E89094C44Da98b954EedeAC495271d0F`?
- Show me the price of BONK on Solana

### Token Metadata

- Get metadata for token `0x6B175474E89094C44Da98b954EedeAC495271d0F`
- Show me token info for contract address `...`
- What's the symbol and decimals for this token?

### Token Analytics

- Get token analytics for `0x6B175474E89094C44Da98b954EedeAC495271d0F`
- Show me the top holders of USDC
- What are the token pairs for this address?
- Get DEX swaps for this token
- Show me the token bonding status
- Get historical token holders data

### Token Discovery

- Show me trending tokens
- Find tokens named "pepe"
- Search for tokens by symbol
- Get the top gainers today
- Show me tokens with highest volume
- Get bonding tokens on pump.fun
- Show graduated tokens on Raydium
- Get new tokens listed on Uniswap
- Filter tokens by market cap and volume

---

## NFT Queries

### Collection Metadata

- Get NFT metadata for contract `0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d`
- Show me info about this NFT collection
- Get NFT contract metadata

### NFT Market Data

- What's the floor price of Bored Apes?
- Get NFT floor price for `0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d`
- Show NFT collection stats for this contract
- Get NFT metadata for token ID 1234
- How many unique owners does this collection have?

### NFT Transfers & Owners

- Show NFT transfers for this collection
- Get NFT owners for contract `0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d`
- Who owns NFT token ID 100?
- Show recent NFT transfers on Ethereum

### NFT Trading

- Get NFT trades for this collection
- Show NFT transfers to/from this address
- What's the trading volume for this NFT collection?

---

## Blockchain Data

### Blocks & Transactions

- Get details for transaction `0x...`
- Show me block `12345678`
- What's the latest block on Ethereum?
- Get block number by timestamp

### Transaction History

- Get all ERC20 transfers for this wallet
- Show NFT transfers in the last hour
- Get internal transactions for this tx hash

### Address Resolution

- Resolve ENS name `vitalik.eth` to an address
- Get the ENS name for address `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- Resolve Unstoppable domain `example.crypto`

---

## Real-Time Streams

### Stream Management

- List all my streams
- Show me details for stream `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
- Get all streams on Ethereum

### Create Streams

- Create a stream to monitor all ERC20 transfers on Ethereum
- Monitor all NFT transfers on Polygon
- Create a stream that tracks when `0x...` receives ETH
- Alert me when any transaction occurs on this address

### Stream Operations

- Pause the stream with ID `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
- Resume stream `xyz`
- Add address `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` to stream
- Remove this address from the stream
- Delete stream `xyz`
- Update my stream to also watch Polygon
- Duplicate stream `xyz` with a new webhook URL

### Stream Settings

- Get stream status
- Update the webhook URL for this stream

---

## Entity & Label Queries

- What entity is address `0x...`? (exchange, fund, whale, etc.)
- Get all entity categories
- Search for entities by name
- Get entities in the "exchange" category

---

## Multi-Chain Queries

Claude automatically detects EVM vs Solana addresses:

- Get the balance of this EVM wallet `0x...`
- Get the balance of this Solana wallet `742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
- Show data for this address across all chains

### Specific Chains

- Get balance on Polygon
- Show tokens on Base
- Get NFTs on Arbitrum
- Query data on Optimism
- Check BSC for this address

---

## Advanced Queries

### Analytics

- Get wallet profitability report
- Show token holder distribution
- Get liquidity pair data
- Analyze token price history
- Get OHLCV candlestick data for a pair

### Search & Discovery

- Search for tokens by name "pepe"
- Find tokens with highest market cap
- Get top DEX pairs
- Show most traded tokens

### Historical Data

- Get price 24 hours ago
- Show balance history for this wallet
- Get token transfers from last week

---

## Example Workflows

### Build a Dashboard

- Build me a wallet explorer dashboard showing balance, tokens, and NFTs for `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- Create a token price monitor for ETH, USDC, and WBTC
- Show me a portfolio summary for this wallet

### Research & Analysis

- Compare token holdings across multiple wallets
- Show me the top holders of this token
- What's the trading activity for this collection?
- Analyze this wallet's DeFi positions
- Get the token score and security analysis

### Monitoring

- Alert me when this wallet receives ETH
- Monitor all transfers of token `0x...`
- Track NFT mints for this collection
- Watch for large transactions to/from this address

---

## Pro Tips

1. **Default Chain** - For EVM addresses without a specified chain, queries default to Ethereum. Mention another chain (Polygon, Base, Arbitrum, etc.) if needed
2. **Be specific** - Include the chain (Ethereum, Polygon, Solana) for faster queries
3. **Use addresses** - Paste full wallet addresses or contract addresses
4. **Ask follow-ups** - Claude can filter, sort, or dive deeper into results
5. **Multi-chain** - Just ask - Claude will detect EVM vs Solana automatically
6. **Pagination** - For large result sets, ask to "show more" or "get next page"
7. **General questions first** - Use the General Knowledge skill to understand what's possible before querying

---

Claude will automatically:
- Detect EVM vs Solana addresses
- Route to the correct API endpoint
- Handle pagination for large results
- Format responses for readability
- Store your API key in session memory
