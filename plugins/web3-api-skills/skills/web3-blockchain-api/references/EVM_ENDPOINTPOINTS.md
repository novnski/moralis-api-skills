# EVM Blockchain API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Block [number]?" | `/block/:blockNumberOrHash` | Block data |
| "Block on [date]?" | `/dateToBlock` | Date → block |
| "Transaction [hash]?" | `/transaction/:transactionHash` | TX details |
| "Decoded transaction?" | `/transaction/:transactionHash/verbose` | Method calls |
| "Latest block?" | `/latestBlockNumber/:chain` | Block height |
| "Internal transactions?" | `/transaction/:transactionHash` | Use `include=internal_transactions` |

## Key Endpoint Patterns

- **Block data:** `/block/:blockNumberOrHash` (by number or hash)
- **Transaction data:** `/transaction/:transactionHash*` (raw + decoded)
- **Date conversion:** `/dateToBlock` (find block by date)
- **Decoded data:** Use `/verbose` endpoints for human-readable output

---

## Get Block by Number/Hash
- **Endpoint:** `GET /block/:blockNumberOrHash`
- **Description:** Get block details by number or hash
- **Use this endpoint when:** User asks "block [number]", "block data", "block information", "block [hash]"
- **Params:** `chain`

## Get Block by Date
- **Endpoint:** `GET /dateToBlock`
- **Description:** Convert date to block number
- **Use this endpoint when:** User asks "block on [date]", "what block was on [date]", "block number for date"
- **Params:** `date`, `chain`

## Get Transaction by Hash
- **Endpoint:** `GET /transaction/:transactionHash`
- **Description:** Get transaction details
- **Use this endpoint when:** User asks "transaction [hash]", "transaction details", "TX info", "transaction data"
- **Params:** `chain`

## Get Decoded Transaction
- **Endpoint:** `GET /transaction/:transactionHash/verbose`
- **Description:** Get decoded transaction with method calls
- **Use this endpoint when:** User asks "decoded transaction", "what function was called", "transaction decoded", "method name"
- **Params:** `chain`

## Get Latest Block Number
- **Endpoint:** `GET /latestBlockNumber/:chain`
- **Description:** Get current block number
- **Use this endpoint when:** User asks "latest block", "current block number", "block height", "chain height"
- **Params:** `chain`

## Get Internal Transactions
- **Endpoint:** `GET /transaction/:transactionHash`
- **Description:** Get transaction details including internal transactions
- **Use this endpoint when:** User asks "internal transactions", "internal TXs", "contract calls within transaction"
- **Params:** `chain`, `include=internal_transactions`

