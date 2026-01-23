---
name: web3-blockchain-api
description: Query blockchain data including blocks, transactions, and decoded transactions. Get block by hash or date, retrieve transaction details, decode contract interactions, and get wallet transaction history. Use when user asks about blocks, transactions, or on-chain data.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed). EVM chains only - not supported on Solana.
metadata:
    version: "1.0.0"
    author: web3-skills
    tags: [web3, blockchain, block, transaction, evm]
---

# Web3 Blockchain API (EVM Only)

Query blocks and transactions on EVM chains.

## When to Use This Skill

Use this skill when the user asks about:

**Block Data:**

- "Block data", "Block information", "Block details"
- "Block by number", "Block by hash", "Get block [number]"
- "Block by date", "What block was on [date]?"

**Transaction Data:**

- "Transaction details", "Transaction info", "TX details"
- "Transaction by hash", "Get transaction [hash]"
- "Decoded transaction", "What function was called?", "Transaction decoded"

**Blockchain State:**

- "Latest block", "Current block number", "Block height"
- "Chain state", "Blockchain info"

**⚠️ NOT for:**

- Wallet transaction history → Use `web3-wallet-api` with wallet
- Token transfers → Use `web3-wallet-api` with `/wallets/:address/history` or `web3-token-api`
- NFT transfers → Use `web3-wallet-api` with `/wallets/:address/history`
- Solana blocks/transactions → Not supported (EVM only)

## Common Pitfalls

### Confusion: Transaction by Hash vs Wallet Transactions

- **Specific transaction:** Use this skill (`web3-blockchain-api`) with `/transaction/:transactionHash`
- **Wallet transaction history:** Use `web3-wallet-api` with `/:address`

### Confusion: Block Data vs Date to Block

- **Get block by number/hash:** Use this skill (`web3-blockchain-api`) with `/block/:blockNumberOrHash`
- **Find block by date:** Use this skill (`web3-blockchain-api`) with `/dateToBlock`

### Confusion: Transaction vs Decoded Transaction

- **Raw transaction data:** Use this skill (`web3-blockchain-api`) with `/transaction/:transactionHash`
- **Decoded with method names:** Use this skill (`web3-blockchain-api`) with `/transaction/:transactionHash/verbose`

### EVM Only Limitation

- **This skill is EVM only** - No Solana block/transaction support
- Use Solana RPC providers for Solana blockchain data

## Setup

```bash
/web3-api-key
```

## Common Queries

### Get Block by Number/Hash

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/block/:blockNumberOrHash', { blockNumberOrHash: '0x123456' })
  .then(data => console.log('Block:', data.number, 'Transactions:', data.transactions.length))
  .catch(console.error);
"
```

### Get Block by Date

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/dateToBlock', { params: { date: '2024-01-01', chain: 'eth' }})
  .then(data => console.log('Block:', data.block, 'Timestamp:', data.timestamp))
  .catch(console.error);
"
```

### Get Transaction by Hash

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/transaction/:transactionHash', { transactionHash: '0x...' })
  .then(data => console.log('From:', data.from_address, 'To:', data.to_address))
  .catch(console.error);
"
```

### Get Decoded Transaction

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/transaction/:transactionHash/verbose', { transactionHash: '0x...' })
  .then(data => console.log('Method:', data.method_id, 'Decoded:', data.decoded_call))
  .catch(console.error);
"
```

### Get Latest Block Number

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/latestBlockNumber/:chain', { params: { chain: 'eth' }})
  .then(data => console.log('Latest block:', data.block))
  .catch(console.error);
"
```

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
