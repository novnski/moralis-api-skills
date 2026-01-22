const https = require("https");
const fs = require("fs");
const path = require("path");

/**
 * Web3 Skills Unified Query Client
 * Optimized for all Web3 Moralis API endpoints across all skills
 *
 * Features:
 * - Auto-detects EVM vs Solana from address format
 * - Chain name to hex ID conversion (saves API tokens)
 * - Date/time to block conversion
 * - Placeholder replacement (:address, :walletAddress, :network)
 * - Token search functionality
 * - Pagination support
 * - Works with ALL endpoint types
 *
 * NO external dependencies - uses only Node.js built-in modules
 */

// Chain name to hex ID mapping (saves API tokens!)
const CHAIN_HEX_MAP = {
  // EVM chains
  eth: "0x1",
  ethereum: "0x1",
  goerli: "0x5",
  sepolia: "0xaa36a7",
  polygon: "0x89",
  mumbai: "0x13881",
  bsc: "0x38",
  bsc_testnet: "0x61",
  avalanche: "0xa86a",
  fuji: "0xa869",
  fantom: "0xfa",
  arbitrum: "0xa4b1",
  arbitrum_testnet: "0x66eee",
  optimism: "0xa",
  optimism_testnet: "0x45",
  base: "0x2105",
  base_testnet: "0x14a34",
  celo: "0xa4ec",
  gnosis: "0x64",
  moonbeam: "0x504",
  moonriver: "0x505",
  cronos: "0x19",
  aurora: "0x4e454152",
  polygon_zkevm: "0x144",
  amoy: "0x13882",
  zkevm: "0x144",
  linea: "0x770e",
  linea_testnet: "0xe708",
  scroll: "0x82750",
  scroll_testnet: "0x8274f",
  blast: "0x81457",
  blast_testnet: "0x24c931",
  manta: "0xa9b4",
  manta_testnet: "0x5e02",
  taiko: "0x50e8",
  taiko_testnet: "0x50e3",
  world: "0x1e12",
  world_testnet: "0x1e14",
  // Solana (not hex, but included for completeness)
  sol: "sol",
  solana: "sol",
  mainnet: "mainnet",
  devnet: "devnet",
};

/**
 * Convert chain name to hex ID
 * @param {string} chain - Chain name (e.g., "eth", "polygon", "0x1")
 * @returns {string} Hex chain ID or original value if already hex/unknown
 */
function chainToHex(chain) {
  if (!chain) return "0x1"; // Default to Ethereum
  const normalized = chain.toLowerCase();
  return CHAIN_HEX_MAP[normalized] || chain;
}

/**
 * Read API key from .env file
 * @param {string} skillDir - Skill directory path
 * @returns {string} API key
 */
function getAPIKey(skillDir = __dirname) {
  const envPath = path.join(skillDir, ".env");

  if (!fs.existsSync(envPath)) {
    throw new Error(
      "API key not found. Please set it by running:\n" +
        "  /web3-api-key\n\n" +
        "Or create the file manually:\n" +
        "  " +
        envPath +
        "\n" +
        "With content: MORALIS_API_KEY=your_key_here",
    );
  }

  const content = fs.readFileSync(envPath, "utf8");
  const match = content.match(/MORALIS_API_KEY=(.+)/);

  if (!match) {
    throw new Error("Invalid .env file. Format: MORALIS_API_KEY=your_key_here");
  }

  return match[1].trim();
}

/**
 * Detect blockchain from address format or context
 * @param {string} address - Wallet address
 * @param {object} context - { chain, network }
 * @returns {object} { type: "evm"|"solana", chain?: string, network?: string }
 */
function detectBlockchain(address, context = {}) {
  // Solana addresses are base58 (32-44 chars, no 0x prefix)
  if (address && !address.startsWith("0x") && address.length >= 32) {
    return { type: "solana", network: context.network || "mainnet" };
  }

  // EVM addresses are 0x prefix, 42 chars
  if (address && address.startsWith("0x") && address.length === 42) {
    return { type: "evm", chain: chainToHex(context.chain || "eth") };
  }

  // Detect from context
  if (context.chain) {
    const solanaChains = ["sol", "solana", "mainnet", "devnet"];
    if (solanaChains.includes(context.chain.toLowerCase())) {
      return { type: "solana", network: context.network || "mainnet" };
    }
    return { type: "evm", chain: chainToHex(context.chain) };
  }

  // Default to EVM Ethereum
  return { type: "evm", chain: "0x1" };
}

/**
 * Make HTTPS request using built-in https module
 * @param {string} fullUrl - Complete URL with query params
 * @param {object} headers - Request headers
 * @returns {Promise<object>} Parsed JSON response
 */
function httpsRequest(fullUrl, headers) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(fullUrl);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: "GET",
      headers: headers,
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(
              new Error(
                `API Error ${res.statusCode}: ${JSON.stringify(parsed)}`,
              ),
            );
          } else {
            resolve(parsed);
          }
        } catch (e) {
          resolve(data); // Return raw if not JSON
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

/**
 * Convert date/time to block number
 * @param {string|Date} date - Date string, Date object, or relative time like "2 hours ago"
 * @param {string} chain - Chain name (defaults to "eth")
 * @param {string} skillDir - Skill directory for API key
 * @returns {Promise<number>} Block number
 */
async function dateToBlock(date, chain = "eth", skillDir = __dirname) {
  const apiKey = getAPIKey(skillDir);
  const chainHex = chainToHex(chain);

  // Handle relative time expressions
  let targetDate;
  if (typeof date === "string" && date.includes("ago")) {
    const match = date.match(
      /(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/i,
    );
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2].toLowerCase();
      const now = Date.now();
      const multipliers = {
        second: 1000,
        minute: 60000,
        hour: 3600000,
        day: 86400000,
        week: 604800000,
        month: 2592000000,
        year: 31536000000,
      };
      targetDate = new Date(now - value * multipliers[unit]);
    } else {
      targetDate = new Date(date);
    }
  } else if (date instanceof Date) {
    targetDate = date;
  } else {
    targetDate = new Date(date);
  }

  // Convert to ISO string (UTC)
  const dateStr = targetDate.toISOString();

  // Call blockchain API
  const url = `https://deep-index.moralis.io/api/v2.2/dateToBlock?chain=${chainHex}&date=${encodeURIComponent(dateStr)}`;

  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { "x-api-key": apiKey, Accept: "application/json" } },
        (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            try {
              const parsed = JSON.parse(data);
              if (res.statusCode >= 400) {
                reject(
                  new Error(
                    `API Error ${res.statusCode}: ${JSON.stringify(parsed)}`,
                  ),
                );
              } else {
                resolve(parsed.block);
              }
            } catch (e) {
              reject(e);
            }
          });
          res.on("error", reject);
        },
      )
      .on("error", reject);
  });
}

/**
 * Search for tokens by name, symbol, or address
 * @param {string} queryParam - Token name, symbol, or address
 * @param {string|string[]} chains - Optional chain filter (chain name, hex ID, or array of hex IDs)
 * @param {string} skillDir - Skill directory for API key
 * @returns {Promise<object>} Token search results
 */
async function searchToken(queryParam, chains, skillDir = __dirname) {
  const apiKey = getAPIKey(skillDir);
  let url = `https://deep-index.moralis.io/api/v2.2/tokens/search?query=${encodeURIComponent(queryParam)}`;

  // Add chains filter if specified
  if (chains) {
    if (Array.isArray(chains)) {
      url += `&chains=${chains.join(",")}`;
    } else {
      url += `&chains=${chains}`;
    }
  }

  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { "x-api-key": apiKey, Accept: "application/json" } },
        (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            try {
              const parsed = JSON.parse(data);
              if (res.statusCode >= 400) {
                reject(
                  new Error(
                    `API Error ${res.statusCode}: ${JSON.stringify(parsed)}`,
                  ),
                );
              } else {
                resolve(parsed);
              }
            } catch (e) {
              reject(e);
            }
          });
          res.on("error", reject);
        },
      )
      .on("error", reject);
  });
}

/**
 * Query Moralis API (works with ALL endpoint types)
 *
 * Auto-detects EVM vs Solana, replaces placeholders, handles date-to-block conversion
 *
 * @param {string} endpoint - API endpoint path (supports :address, :walletAddress, :network placeholders)
 * @param {object} options - { address, chain, network, params, skillDir, fromDate, toDate, fromBlock, toBlock }
 * @returns {Promise<object>}
 *
 * @example
 * // Basic wallet query
 * query('/:address/balance', { address: '0x123...' })
 *
 * @example
 * // With specific chain
 * query('/:address/balance', { address: '0x123...', chain: 'polygon' })
 *
 * @example
 * // Solana query
 * query('/account/:network/assets', { address: '7xKX...', network: 'mainnet' })
 *
 * @example
 * // With date to block conversion
 * query('/:address/erc20/transfers', {
 *   address: '0x123...',
 *   fromDate: '2024-01-01',
 *   toDate: '2 hours ago'
 * })
 *
 * @example
 * // With additional parameters
 * query('/wallets/:address/tokens', {
 *   address: '0x123...',
 *   params: { limit: 100, cursor: '...' }
 * })
 */
async function query(endpoint, options = {}) {
  const {
    address,
    chain,
    network,
    params = {},
    skillDir = __dirname,
    fromDate,
    toDate,
    fromBlock,
    toBlock,
  } = options;

  // Detect blockchain (defaults to Ethereum 0x1)
  const blockchain = detectBlockchain(address, { chain, network });

  // Build URL based on blockchain type
  let fullUrl;
  let queryParams = { ...params };

  if (blockchain.type === "evm") {
    const baseURL = "https://deep-index.moralis.io/api/v2.2";

    // Replace :address and :walletAddress placeholders in endpoint
    let endpointPath = endpoint;
    if (address) {
      endpointPath = endpointPath.replace(":address", address);
      endpointPath = endpointPath.replace(":walletAddress", address);
    }

    // Handle date to block conversions
    if (fromDate && !fromBlock) {
      const block = await dateToBlock(fromDate, blockchain.chain, skillDir);
      queryParams.from_block = block;
    }
    if (toDate && !toBlock) {
      const block = await dateToBlock(toDate, blockchain.chain, skillDir);
      queryParams.to_block = block;
    }

    // Add explicit block numbers if provided
    if (fromBlock) queryParams.from_block = fromBlock;
    if (toBlock) queryParams.to_block = toBlock;

    // Use hex chain ID
    const searchParams = new URLSearchParams(queryParams);
    searchParams.append("chain", blockchain.chain);
    fullUrl = baseURL + endpointPath + "?" + searchParams.toString();
  } else {
    const baseURL = "https://solana-gateway.moralis.io";
    // Replace :network, :address, and :walletAddress placeholders in endpoint
    let endpointPath = endpoint;
    if (address) {
      endpointPath = endpointPath.replace(":address", address);
      endpointPath = endpointPath.replace(":walletAddress", address);
    }
    endpointPath = endpointPath.replace(":network", blockchain.network);

    const searchParams = new URLSearchParams(queryParams);
    const queryString =
      Object.keys(queryParams).length > 0 ? "?" + searchParams.toString() : "";
    fullUrl = baseURL + endpointPath + queryString;
  }

  // Make request
  const headers = {
    "x-api-key": getAPIKey(skillDir),
    Accept: "application/json",
  };

  return httpsRequest(fullUrl, headers);
}

// Export with shorthand aliases for token efficiency
module.exports = {
  q: query, // Shorthand for query (token-efficient)
  query,
  dateToBlock,
  chainToHex,
  searchToken,
  detectBlockchain,
  getAPIKey,
  httpsRequest,
};
