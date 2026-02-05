# Moralis API Skills

Claude Code skills for [Moralis Web3 API](https://admin.moralis.com/register). Query blockchain data from EVM chains and Solana, plus real-time event streaming.

## Quick Start

```bash
# Install the skills
npx skills add novnski/moralis-api-skills

# Set your API key (when using any skill)
Set this as the Moralis API key: <paste your API key here>
```

## Skills

| Skill | Description |
|-------|-------------|
| **moralis-data-api** | EVM + Solana blockchain data (135 endpoints) |
| **moralis-streams-api** | Real-time event monitoring with webhooks (20 endpoints) |
| **moralis-general-knowledge** | Routing, FAQ, pricing, and capability guidance |

## moralis-data-api

Unified skill for all blockchain data queries. Auto-detects EVM vs Solana from address format.

**Default Chain:** For EVM addresses without a specified chain, defaults to Ethereum (`0x1`).

**135 endpoints** (101 EVM + 34 Solana) across these categories:

- **Wallet** (16) — balances, tokens, NFTs, history, profitability, net worth
- **Token** (22) — prices, metadata, pairs, DEX swaps, analytics, security scores, snipers
- **NFT** (21) — metadata, transfers, traits, rarity, floor prices, trades
- **DeFi** (3) — protocol positions, liquidity, exposure
- **Entity** (2) — labeled addresses (exchanges, funds, whales)
- **Price** (3) — OHLCV, token prices, pair prices
- **Blockchain** (5) — blocks, transactions, date-to-block
- **Discovery** (13) — trending tokens, market movers, top gainers/losers
- **Other** (15) — address resolution, token search, bonding, candlesticks, graduated tokens
- **Solana** (34) — native Solana endpoints + EVM endpoints with Solana support

```bash
# EVM query - defaults to Ethereum if no chain specified
"Get the balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

# EVM query with specific chain
"Get the balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Polygon"

# Solana query (auto-detected from base58 address)
"Get the balance of Solana wallet 742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
```

## moralis-streams-api

Real-time blockchain event monitoring with webhooks. **20 endpoints** for creating, managing, and monitoring streams.

**Stream types:** tx, log, erc20transfer, erc20approval, nfttransfer, internalTx

```bash
# Create a stream
"Create a stream to monitor all ERC20 transfers on Ethereum"

# Manage streams
"Pause the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

## moralis-general-knowledge

Knowledge-only skill for answering general questions about Moralis. Routes users to the correct technical skill after answering.

```bash
# General questions
"What is Moralis?"
"Which Moralis API should I use for tracking wallet activity?"
"What chains does Moralis support?"
"How much does Moralis cost?"
```

## Supported Chains

**EVM (40+):** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, base, sei, monad, and more

**Solana:** mainnet, devnet

## Architecture

- **Zero dependencies** — Node.js built-in modules only (`https`, `fs`, `path`, `url`, `crypto`)
- **Session-based API key** — stored in memory, shared between all skills
- **Auto-generated endpoint docs** — `swagger/api-configs.json` → `scripts/generate-endpoint-rules.js` → `rules/*.md`
- **Manually maintained references** — pattern files in each skill's `references/` directory

## Documentation

- [Full Documentation](https://novnski.github.io/moralis-api-skills) (GitHub Pages)
- Get API key: [admin.moralis.com/register](https://admin.moralis.com/register)
- [EVM API Docs](https://deep-index.moralis.io/api-docs-2.2/)
- [Solana API Docs](https://solana-gateway.moralis.io/api/)
- [Streams API Docs](https://docs.moralis.io/streams)

## License

MIT
