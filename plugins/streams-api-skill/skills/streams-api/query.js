const https = require("https");
const fs = require("fs");
const path = require("path");

/**
 * Streams API Query Client
 * Optimized for Moralis Streams API endpoints
 *
 * Features:
 * - Stream management (create, update, delete, get)
 * - Address management for streams
 * - Status updates (pause/resume)
 * - History, replay, and block data retrieval
 * - Settings and stats management
 * - Webhook event monitoring
 *
 * NO external dependencies - uses only Node.js built-in modules
 */

// Chain name to hex ID mapping
const CHAIN_HEX_MAP = {
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
 * Find .env file by searching upward from a directory
 * @param {string} startDir - Starting directory
 * @returns {string} Path to .env file or null
 */
function findEnvFile(startDir) {
  let currentDir = startDir;
  const root = path.parse(currentDir).root;

  while (currentDir !== root && currentDir !== path.join(currentDir, "..")) {
    const envPath = path.join(currentDir, ".env");
    if (fs.existsSync(envPath)) {
      return envPath;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }

  return null;
}

/**
 * Read API key from .env file
 * Searches upward from skillDir to find .env file
 * @param {string} skillDir - Starting directory path (defaults to streams-api)
 * @returns {string} API key
 */
function getAPIKey(skillDir = __dirname) {
  const envPath = findEnvFile(skillDir);

  if (!envPath) {
    throw new Error(
      "API key not found. Create a .env file with:\n" +
        "  MORALIS_API_KEY=your_key_here\n\n" +
        "If you installed web3-api-skills, you can also run:\n" +
        "  /web3-api-key\n" +
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
 * Make HTTPS request with method support (GET, POST, PUT, PATCH, DELETE)
 * @param {string} fullUrl - Complete URL with query params
 * @param {object} headers - Request headers
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} body - Request body (for POST, PUT)
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

    // Write body if provided
    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

/**
 * Query Moralis Streams API
 *
 * @param {string} endpoint - API endpoint path (e.g., "/streams/evm", "/streams/evm/{id}")
 * @param {object} options - { method, params, body, skillDir }
 * @returns {Promise<object>}
 *
 * @example
 * // Get all streams
 * query('/streams/evm', { params: { limit: 10 } })
 *
 * @example
 * // Create a stream
 * query('/streams/evm', {
 *   method: 'PUT',
 *   body: {
 *     webhookUrl: 'https://example.com/webhook',
 *     chainIds: ['0x1'],
 *     topic0: ['Transfer(address,address,uint256)']
 *   }
 * })
 *
 * @example
 * // Update stream status
 * query('/streams/evm/{id}/status', {
 *   pathParams: { id: 'uuid-here' },
 *   method: 'POST',
 *   body: { status: 'paused' }
 * })
 */
async function query(endpoint, options = {}) {
  const {
    method = "GET",
    params = {},
    body = null,
    pathParams = {},
    skillDir = __dirname,
  } = options;

  const baseURL = "https://streams.moralis.io/api/v2.2";

  const normalizeChainParam = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => (typeof item === "string" ? chainToHex(item) : item));
    }
    return typeof value === "string" ? chainToHex(value) : value;
  };

  const normalizedParams = { ...params };
  if (Object.prototype.hasOwnProperty.call(normalizedParams, "chainId")) {
    normalizedParams.chainId = normalizeChainParam(normalizedParams.chainId);
  }
  if (Object.prototype.hasOwnProperty.call(normalizedParams, "chainIds")) {
    normalizedParams.chainIds = normalizeChainParam(normalizedParams.chainIds);
  }

  let normalizedBody = body;
  if (body && typeof body === "object") {
    if (
      Object.prototype.hasOwnProperty.call(body, "chainId") ||
      Object.prototype.hasOwnProperty.call(body, "chainIds")
    ) {
      normalizedBody = { ...body };
      if (Object.prototype.hasOwnProperty.call(body, "chainId")) {
        normalizedBody.chainId = normalizeChainParam(body.chainId);
      }
      if (Object.prototype.hasOwnProperty.call(body, "chainIds")) {
        normalizedBody.chainIds = normalizeChainParam(body.chainIds);
      }
    }
  }

  // Replace path parameters (e.g., {id} becomes actual ID)
  let endpointPath = endpoint;
  for (const [key, value] of Object.entries(pathParams)) {
    const normalizedValue = key === "chainId" ? normalizeChainParam(value) : value;
    endpointPath = endpointPath.replace(`{${key}}`, normalizedValue);
    endpointPath = endpointPath.replace(`:${key}`, normalizedValue);
  }

  // Build query parameters
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(normalizedParams)) {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.append(key, value);
    }
  }

  const queryString = searchParams.toString()
    ? "?" + searchParams.toString()
    : "";
  const fullUrl = baseURL + endpointPath + queryString;

  // Make request
  const headers = {
    "x-api-key": getAPIKey(skillDir),
    Accept: "application/json",
  };

  if (normalizedBody) {
    headers["Content-Type"] = "application/json";
  }

  return httpsRequest(fullUrl, headers, method, normalizedBody);
}

// Export
module.exports = {
  q: query, // Shorthand for query (token-efficient)
  query,
  chainToHex,
  getAPIKey,
  httpsRequest,
};
