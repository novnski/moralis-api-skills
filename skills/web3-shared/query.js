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
 * - Support for 40+ EVM chains including new chains (Flow, Ronin, Lisk, Sei, Monad)
 * - HTTP method support (GET, POST, PUT, DELETE, PATCH) for Streams API
 * - Custom baseURL support for cross-API queries
 * - Date/time to block conversion
 * - Placeholder replacement (:address, :walletAddress, :network)
 * - Token search functionality
 * - Pagination support
 * - Spam filtering and verified contract support (via params)
 * - Works with ALL endpoint types
 * - Address validation for EVM and Solana addresses
 * - Request timeout handling
 * - Exponential backoff for rate limits
 *
 * Supported Chains (2025):
 * - Major: Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche
 * - New (2025): Flow (0x54), Ronin (0x7e), Lisk (0x94), Sei (0x82), Monad (0x8f)
 * - And 30+ more EVM chains
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
  // New chains (2025)
  flow: "0x54",
  flow_testnet: "0x545",
  ronin: "0x7e",
  ronin_testnet: "0x7ef",
  lisk: "0x94",
  lisk_testnet: "0x945",
  sei: "0x82",
  sei_testnet: "0x826",
  monad: "0x8f",
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

// Set of all supported EVM chain IDs (hex format)
const EVM_SUPPORTED_CHAIN_IDS = new Set([
  "0x1", // Ethereum
  "0x5", // Goerli
  "0xaa36a7", // Sepolia
  "0x89", // Polygon
  "0x13881", // Mumbai
  "0x38", // BSC
  "0x61", // BSC Testnet
  "0xa86a", // Avalanche
  "0xa869", // Fuji
  "0xfa", // Fantom
  "0xa4b1", // Arbitrum
  "0x66eee", // Arbitrum Testnet
  "0xa", // Optimism
  "0x45", // Optimism Testnet
  "0x2105", // Base
  "0x14a34", // Base Testnet
  "0xa4ec", // Celo
  "0x64", // Gnosis
  "0x504", // Moonbeam
  "0x505", // Moonriver
  "0x19", // Cronos
  "0x4e454152", // Aurora
  "0x144", // Polygon zkEVM
  "0x13882", // Amoy
  "0x770e", // Linea
  "0xe708", // Linea Testnet
  "0x82750", // Scroll
  "0x8274f", // Scroll Testnet
  "0x81457", // Blast
  "0x24c931", // Blast Testnet
  "0xa9b4", // Manta
  "0x5e02", // Manta Testnet
  "0x50e8", // Taiko
  "0x50e3", // Taiko Testnet
  "0x1e12", // World
  "0x1e14", // World Testnet
  // New chains (2025)
  "0x54", // Flow
  "0x545", // Flow Testnet
  "0x7e", // Ronin
  "0x7ef", // Ronin Testnet
  "0x94", // Lisk
  "0x945", // Lisk Testnet
  "0x82", // Sei
  "0x826", // Sei Testnet
  "0x8f", // Monad
]);

// Mainnet-only chains (for endpoints that don't support testnets)
const EVM_MAINNET_CHAIN_IDS = new Set([
  "0x1", // Ethereum
  "0x89", // Polygon
  "0x38", // BSC
  "0xa86a", // Avalanche
  "0xfa", // Fantom
  "0xa4b1", // Arbitrum
  "0xa", // Optimism
  "0x2105", // Base
  "0xa4ec", // Celo
  "0x64", // Gnosis
  "0x504", // Moonbeam
  "0x505", // Moonriver
  "0x19", // Cronos
  "0x4e454152", // Aurora
  "0x144", // Polygon zkEVM
  "0x770e", // Linea
  "0x82750", // Scroll
  "0x81457", // Blast
  "0xa9b4", // Manta
  "0x50e8", // Taiko
  "0x1e12", // World
  // New chains (2025)
  "0x54", // Flow
  "0x7e", // Ronin
  "0x94", // Lisk
  "0x82", // Sei
  "0x8f", // Monad
]);

// Chains with token price support
const EVM_TOKEN_PRICE_CHAIN_IDS = new Set([
  "0x1", // Ethereum
  "0x89", // Polygon
  "0x38", // BSC
  "0xa86a", // Avalanche
  "0xa4b1", // Arbitrum
  "0xa", // Optimism
  "0x2105", // Base
  "0x64", // Gnosis
  "0x504", // Moonbeam
  "0x770e", // Linea
  "0x82750", // Scroll
  "0x81457", // Blast
  "0xa9b4", // Manta
  "0x50e8", // Taiko
  "0x1e12", // World
  // New chains (2025)
  "0x54", // Flow
  "0x7e", // Ronin
  "0x94", // Lisk
  "0x82", // Sei
  "0x8f", // Monad
]);

/**
 * Assert that a chain ID is supported
 * @param {string} chainHex - Hex chain ID
 * @param {string} endpoint - API endpoint
 * @param {Set} allowedChains - Set of allowed chain IDs
 * @param {string} reason - Custom error message
 * @throws {Error} If chain is not supported
 */
function assertEvmChainSupported(chainHex, endpoint, allowedChains, reason) {
  if (allowedChains.has(chainHex)) return;
  const message =
    reason ||
    `Unsupported chain "${chainHex}" for endpoint ${endpoint}. ` +
      `Supported chain IDs: ${[...allowedChains].join(", ")}`;
  throw new Error(message);
}

/**
 * Check if endpoint is a wallet history endpoint (mainnet only)
 * @param {string} endpoint - API endpoint path
 * @returns {boolean}
 */
function isWalletHistoryEndpoint(endpoint) {
  return /^\/wallets\/(:address|[^/]+)\/history\b/.test(endpoint);
}

/**
 * Check if endpoint is a wallet tokens endpoint (token price support required)
 * @param {string} endpoint - API endpoint path
 * @returns {boolean}
 */
function isWalletTokensEndpoint(endpoint) {
  return /^\/wallets\/(:address|[^/]+)\/tokens\b/.test(endpoint);
}

/**
 * Find .env file by searching upward from a directory
 * @param {string} startDir - Starting directory
 * @returns {string} Path to .env file or null
 */
function findEnvFile(startDir) {
  let currentDir = startDir;
  const root = path.parse(currentDir).root;

  while (currentDir !== root && currentDir !== path.join(currentDir, "..")) {
    const envPath = path.join(currentDir, ".env");
    // Symlink protection: Only accept regular files, not symlinks
    if (fs.existsSync(envPath) && !fs.lstatSync(envPath).isSymbolicLink()) {
      return envPath;
    }
    // Move up one directory
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }

  return null;
}

/**
 * Read API key from .env file
 * Searches upward from skillDir to find .env file
 * @param {string} skillDir - Starting directory path (defaults to web3-shared)
 * @returns {string} API key
 */
function getAPIKey(skillDir = __dirname) {
  const envPath = findEnvFile(skillDir);

  if (!envPath) {
    throw new Error(
      "API key not found. Please set it by running:\n" +
        "  /web3-api-key\n\n" +
        "Or create .env file with:\n" +
        "  MORALIS_API_KEY=your_key_here\n" +
        "Searched from: " +
        skillDir,
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
    // Fix #21: Add Base58 character validation
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
    if (!base58Regex.test(address)) {
      throw new Error("Invalid Solana address: contains non-base58 characters");
    }
    return { type: "solana", network: context.network || "mainnet" };
  }

  // EVM addresses are 0x prefix, 42 chars
  if (address && address.startsWith("0x") && address.length === 42) {
    // Fix #22: Add hex character validation
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethRegex.test(address)) {
      throw new Error(
        "Invalid EVM address: must be 0x followed by 40 hex characters",
      );
    }
    return { type: "evm", chain: chainToHex(context.chain || "eth") };
  }

  // Detect from context
  if (context.chain) {
    // Input validation: Ensure chain is a string
    if (typeof context.chain !== "string") {
      throw new Error("Invalid chain parameter: must be a string");
    }

    // Trim whitespace for validation
    const trimmedChain = context.chain.trim();

    // Check for empty or whitespace-only strings
    if (trimmedChain.length === 0) {
      throw new Error("Invalid chain parameter: must be a non-empty string");
    }

    // Check for potential injection attempts (command metacharacters)
    const dangerousChars = /[;&|`$()]/;
    if (dangerousChars.test(trimmedChain)) {
      throw new Error("Invalid chain parameter: contains dangerous characters");
    }

    const solanaChains = ["sol", "solana", "mainnet", "devnet"];
    if (solanaChains.includes(trimmedChain.toLowerCase())) {
      return { type: "solana", network: context.network || "mainnet" };
    }
    return { type: "evm", chain: chainToHex(trimmedChain) };
  }

  // Default to EVM Ethereum
  return { type: "evm", chain: "0x1" };
}

/**
 * Make HTTPS request using built-in https module
 * @param {string} fullUrl - Complete URL with query params
 * @param {object} headers - Request headers
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param {string|object} body - Request body (for POST/PUT/PATCH)
 * @returns {Promise<object>} Parsed JSON response
 */
function httpsRequest(fullUrl, headers, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(fullUrl);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: headers,
      // Fix #23: Add request timeout (30 seconds)
      timeout: 30000,
    };

    // Add Content-Length and Content-Type for requests with body
    if (body) {
      const bodyString = typeof body === "string" ? body : JSON.stringify(body);
      options.headers["Content-Length"] = Buffer.byteLength(bodyString);
      if (!options.headers["Content-Type"]) {
        options.headers["Content-Type"] = "application/json";
      }
    }

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

    // Fix #23 part 2: Handle timeout
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout after 30 seconds"));
    });

    // Write body if present
    if (body) {
      const bodyString = typeof body === "string" ? body : JSON.stringify(body);
      req.write(bodyString);
    }

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
 * @param {object} options - { address, chain, network, params, skillDir, fromDate, toDate, fromBlock, toBlock, method, body, baseURL }
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
 *
 * @example
 * // POST request (Streams API, etc.)
 * query('/streams/evm', {
 *   method: 'PUT',
 *   body: { webhookUrl: 'https://...', chainIds: ['0x1'] },
 *   baseURL: 'https://api.moralis-streams.com'
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
    method = "GET",
    body = null,
    baseURL = null,
  } = options;

  // Detect blockchain (defaults to Ethereum 0x1)
  const blockchain = detectBlockchain(address, { chain, network });

  // Build URL based on blockchain type or custom baseURL
  let fullUrl;
  let queryParams = { ...params };

  // Use custom baseURL if provided (e.g., Streams API)
  const apiBaseURL =
    baseURL ||
    (blockchain.type === "evm"
      ? "https://deep-index.moralis.io/api/v2.2"
      : "https://solana-gateway.moralis.io");

  if (blockchain.type === "evm" && !baseURL) {
    const chainHex = blockchain.chain;

    // Validate chain support (fail early with clear error message)
    assertEvmChainSupported(chainHex, endpoint, EVM_SUPPORTED_CHAIN_IDS);

    // Additional validation for specific endpoints
    if (isWalletHistoryEndpoint(endpoint)) {
      assertEvmChainSupported(
        chainHex,
        endpoint,
        EVM_MAINNET_CHAIN_IDS,
        `Endpoint ${endpoint} only supports mainnet chains.`,
      );
    }
    if (isWalletTokensEndpoint(endpoint)) {
      assertEvmChainSupported(
        chainHex,
        endpoint,
        EVM_TOKEN_PRICE_CHAIN_IDS,
        `Endpoint ${endpoint} requires token price support (mainnet-only).`,
      );
    }

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
    fullUrl = apiBaseURL + endpointPath + "?" + searchParams.toString();
  } else {
    // For Solana or custom baseURL (Streams API, etc.)
    // Replace :network, :address, and :walletAddress placeholders in endpoint
    let endpointPath = endpoint;
    if (address) {
      endpointPath = endpointPath.replace(":address", address);
      endpointPath = endpointPath.replace(":walletAddress", address);
    }
    if (blockchain.type === "solana") {
      endpointPath = endpointPath.replace(":network", blockchain.network);
    }

    // For POST/PUT/PATCH with body, don't append query params to URL
    // For GET or requests without body, include query params
    const hasBody = body && method !== "GET";
    const queryString =
      !hasBody && Object.keys(queryParams).length > 0
        ? "?" + new URLSearchParams(queryParams).toString()
        : "";
    fullUrl = apiBaseURL + endpointPath + queryString;
  }

  // Make request
  const headers = {
    "x-api-key": getAPIKey(skillDir),
    Accept: "application/json",
  };

  // For POST/PUT/PATCH with params, merge params into body
  let requestBody = body;
  if (body && Object.keys(queryParams).length > 0) {
    requestBody = { ...body, ...queryParams };
  }

  return httpsRequest(fullUrl, headers, method, requestBody);
}

/**
 * Paginate through all results using cursor-based pagination
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Same options as query() function
 * @param {number} maxResults - Maximum number of results to fetch (0 = unlimited)
 * @returns {Promise<Array>} Array of all results from all pages
 *
 * @example
 * // Get all NFTs for a wallet
 * const allNFTs = await paginate('/:address/nft', {
 *   address: '0x123...',
 *   params: { format: 'decimal' }
 * });
 */
async function paginate(endpoint, options = {}, maxResults = 0) {
  const { params = {}, ...restOptions } = options;
  let allResults = [];
  let cursor = null;
  let page = 0;

  do {
    const result = await query(endpoint, {
      ...restOptions,
      params: { ...params, cursor, limit: params.limit || 100 },
    });

    // Handle both paginated and non-paginated responses
    if (result.result && Array.isArray(result.result)) {
      allResults.push(...result.result);
      cursor = result.cursor;
    } else if (Array.isArray(result)) {
      allResults.push(...result);
      cursor = null; // No cursor if result is direct array
    } else {
      break; // Unexpected format
    }

    page++;

    // Check max results limit
    if (maxResults > 0 && allResults.length >= maxResults) {
      allResults = allResults.slice(0, maxResults);
      break;
    }

    // Safety limit to prevent infinite loops
    if (page > 1000) {
      console.warn("Pagination exceeded 1000 pages, stopping");
      break;
    }
  } while (cursor);

  return allResults;
}

/**
 * Create spam filter parameters for API requests
 * @param {object} options - Filter options
 * @param {boolean} options.excludeSpam - Exclude spam tokens/NFTs
 * @param {boolean} options.excludeUnverified - Exclude unverified contracts
 * @param {boolean} options.onlyVerified - Only include verified contracts
 * @returns {object} Filter parameters for API request
 *
 * @example
 * // Get tokens with spam filtering
 * query('/wallets/:address/tokens', {
 *   address: '0x123...',
 *   params: createSpamFilter({ excludeSpam: true, onlyVerified: true })
 * })
 */
function createSpamFilter(options = {}) {
  const filters = {};

  if (options.excludeSpam !== undefined) {
    filters.exclude_spam = options.excludeSpam;
  }

  if (options.excludeUnverified !== undefined) {
    filters.exclude_unverified = options.excludeUnverified;
  }

  if (options.onlyVerified !== undefined) {
    filters.only_verified = options.onlyVerified;
  }

  return filters;
}

/**
 * Create verified contract filter parameters
 * @param {object} options - Filter options
 * @param {string[]} options.verifiedContracts - List of verified contract addresses
 * @param {boolean} options.onlyVerified - Only show verified contracts
 * @returns {object} Filter parameters for API request
 */
function createVerifiedFilter(options = {}) {
  const filters = {};

  if (options.verifiedContracts && Array.isArray(options.verifiedContracts)) {
    filters.contract_addresses = options.verifiedContracts.join(",");
  }

  if (options.onlyVerified !== undefined) {
    filters.only_verified = options.onlyVerified;
  }

  return filters;
}

/**
 * Batch request helper for multiple addresses/tokens
 * Queries multiple items in parallel with rate limit consideration
 * @param {string} endpoint - API endpoint path with placeholder
 * @param {Array} items - Array of items to query (addresses, tokens, etc.)
 * @param {object} options - Base options for the query
 * @param {number} concurrency - Number of parallel requests (default: 5)
 * @returns {Promise<Array>} Array of results in same order as input
 *
 * @example
 * // Get balances for multiple addresses
 * const balances = await batchQuery('/:address/balance',
 *   ['0x123...', '0x456...', '0x789...'],
 *   { chain: 'eth' }
 * );
 *
 * @example
 * // Get prices for multiple tokens
 * const prices = await batchQuery('/erc20/:address/price',
 *   ['0xabc...', '0xdef...'],
 *   { chain: 'eth' }
 * );
 */
async function batchQuery(endpoint, items, options = {}, concurrency = 5) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const results = new Array(items.length);
  const errors = new Array(items.length).fill(null);

  // Fix #24: Add exponential backoff for rate limits
  let delay = 100;

  // Process items in batches to respect rate limits
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchPromises = batch.map(async (item, batchIndex) => {
      const index = i + batchIndex;
      let retries = 0;
      const maxRetries = 3;

      while (retries <= maxRetries) {
        try {
          const result = await query(endpoint, {
            ...options,
            address: item,
          });
          results[index] = result;
          break; // Success, exit retry loop
        } catch (error) {
          // Check for rate limit error (429 status)
          if (error.message && error.message.includes("429")) {
            retries++;
            if (retries > maxRetries) {
              results[index] = null;
              errors[index] = error;
              break;
            }
            // Exponential backoff: 100ms -> 200ms -> 400ms -> 800ms (max 5s)
            delay = Math.min(delay * 2, 5000);
            await new Promise((resolve) => setTimeout(resolve, delay));
          } else {
            // Non-rate-limit error, fail immediately
            results[index] = null;
            errors[index] = error;
            break;
          }
        }
      }
    });

    await Promise.all(batchPromises);

    // Small delay between batches to avoid rate limiting
    if (i + concurrency < items.length) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      // Reset delay on successful batch
      delay = 100;
    }
  }

  // Attach errors to results for error handling
  results.errors = errors;
  results.failed = errors.filter((e) => e !== null).length;

  return results;
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
  paginate, // Cursor-based pagination helper
  createSpamFilter, // Spam filtering helper
  createVerifiedFilter, // Verified contract filtering helper
  batchQuery, // Batch request helper for multiple items
};
