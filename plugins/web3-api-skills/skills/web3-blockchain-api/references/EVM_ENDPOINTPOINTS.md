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

- **Endpoint:** `GET /block/:block_number_or_hash`
- **Description:** Get block by hash or number. Retrieves block details including transactions, timestamps, and other block data.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/block/:block_number_or_hash
- **Use this endpoint when:** User asks "block [number]", "block data", "block information", "block [hash]"
- **Auto-chain:** Yes
- **Params:**- `block_number_or_hash` (required, string) - The block number or block hash- `chain` (optional, string) - The chain to query- `include` (optional, string) - If the result should contain the internal transactions

---

## Get Block by Date

- **Endpoint:** `GET /dateToBlock`
- **Description:** Get block by date. Converts a date to a block number.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/dateToBlock
- **Use this endpoint when:** User asks "block on [date]", "what block was on [date]", "block number for date"
- **Params:**- `chain` (optional, string) - The chain to query- `date` (optional, string) - Unix date in milliseconds or a datestring

---

## Get Transaction by Hash

- **Endpoint:** `GET /transaction/:transaction_hash`
- **Description:** Get transaction by hash. Retrieves transaction details including from, to, value, and gas data.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/transaction/:transaction_hash
- **Use this endpoint when:** User asks "transaction [hash]", "transaction details", "TX info", "transaction data"
- **Auto-chain:** Yes
- **Params:**- `transaction_hash` (required, string) - The transaction hash- `chain` (optional, string) - The chain to query- `include` (optional, string) - If the result should contain the internal transactions

---

## Get Decoded Transaction by Hash

- **Endpoint:** `GET /transaction/:transaction_hash/verbose`
- **Description:** Get decoded transaction by hash. Retrieves transaction with ABI-decoded function calls and parameters.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/transaction/:transaction_hash/verbose
- **Use this endpoint when:** User asks "decoded transaction", "what function was called", "transaction decoded", "method name"
- **Auto-chain:** Yes
- **Params:**- `transaction_hash` (required, string) - The transaction hash- `chain` (optional, string) - The chain to query- `include` (optional, string) - If the result should contain the internal transactions

---

## Get Decoded Wallet Transaction

- **Endpoint:** `GET /:address/verbose`
- **Description:** Get decoded transactions by wallet. Retrieves decoded transactions with method names and parsed parameters for a wallet.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/verbose
- **Use this endpoint when:** User asks "decoded transactions for wallet", "what functions were called by wallet"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - The address of the wallet- `chain` (optional, string) - The chain to query- `from_block` (optional, integer) - The minimum block number from which to get the transactions- `to_block` (optional, string) - The maximum block number from which to get the transactions- `from_date` (optional, string) - The start date from which to get the transactions (format in seconds or datestring)- `to_date` (optional, string) - The end date to get transactions up to (format in seconds or datestring)- `cursor` (optional, string) - The cursor returned in the previous response- `order` (optional, string) - The order of the result (ASC or DESC)- `limit` (optional, integer) - The desired page size of the result- `include` (optional, string) - If the result should contain the internal transactions

---

## Get Wallet Transactions

- **Endpoint:** `GET /:address`
- **Description:** Get native transactions by wallet. Retrieves all native currency transfers for a wallet.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address
- **Use this endpoint when:** User asks "wallet transactions", "native transactions by wallet", "wallet txs"
- **Auto-chain:** Yes
- **Params:**- `address` (required, string) - The address of the wallet- `chain` (optional, string) - The chain to query- `from_block` (optional, integer) - The minimum block number from which to get the transactions- `to_block` (optional, string) - The maximum block number from which to get the transactions- `from_date` (optional, string) - The start date from which to get the transactions (format in seconds or datestring)- `to_date` (optional, string) - The end date to get transactions up to (format in seconds or datestring)- `cursor` (optional, string) - The cursor returned in the previous response- `order` (optional, string) - The order of the result (ASC or DESC)- `limit` (optional, integer) - The desired page size of the result- `include` (optional, string) - If the result should contain the internal transactions

---

## Get Latest Block Number

- **Endpoint:** `GET /latestBlockNumber/:chain`
- **Description:** Get latest block number. Retrieves the current block height for a chain.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/latestBlockNumber/:chain
- **Use this endpoint when:** User asks "latest block", "current block number", "block height", "chain height"
- **Params:**- `chain` (required, string) - The chain to query (e.g., "eth", "polygon", "bsc")

