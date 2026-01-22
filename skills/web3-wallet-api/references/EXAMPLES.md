# Web3 Wallet API - Usage Examples

## Example 1: Check Ethereum Wallet Balance

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(data => console.log('Balance:', data.balance / 1e18, 'ETH'))
  .catch(console.error);
"
```

## Example 2: Get All Tokens on Polygon

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/tokens', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain: 'polygon' })
  .then(data => {
    console.log('Found', data.result.length, 'tokens');
    data.result.slice(0, 5).forEach(token => {
      console.log('- ' + token.symbol + ': ' + token.balance);
    });
  })
  .catch(console.error);
"
```

## Example 3: Solana Portfolio

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:network/:address/portfolio', {
  address: '742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

## Example 4: Get NFTs with Pagination

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/:address/nft', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: { limit: 10, format: 'decimal' }
})
  .then(data => console.log('NFTs:', data.result.length, 'Total:', data.total))
  .catch(console.error);
"
```
