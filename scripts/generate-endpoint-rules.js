#!/usr/bin/env node

/**
 * Generate REST endpoint rules from swagger/api-configs.json
 *
 * Creates one markdown file per operationId in flat rules/ folders
 */

const fs = require("fs");
const path = require("path");
const { ensureDir, writeFileIfChanged } = require("./utils/generate-utils");

// Configuration
const API_CONFIGS_PATH = path.join(__dirname, "../swagger/api-configs.json");
const SKILLS_DIR = path.join(__dirname, "../skills");

// Skill mappings
const SKILL_MAPPINGS = {
  "moralis-data-api": {
    sources: ["evm", "solana"],
    rulesDir: path.join(SKILLS_DIR, "moralis-data-api", "rules"),
  },
  "moralis-streams-api": {
    sources: ["streams"],
    rulesDir: path.join(SKILLS_DIR, "moralis-streams-api", "rules"),
  },
};

// Track operationId collisions
const operationRegistry = {};

// Endpoints to ignore (don't generate rule files for these)
const IGNORED_ENDPOINTS = new Set([
  "runContractFunction",
  "web3ApiVersion",
  "reviewContracts",
  "syncNFTContract",
]);

/**
 * Check if an endpoint should be ignored
 */
function shouldIgnoreEndpoint(operationId) {
  return IGNORED_ENDPOINTS.has(operationId);
}

/**
 * Get the filename for an operation
 * - Solana endpoints always get __solana suffix
 * - EVM endpoints get no suffix (unless collision with Solana, which adds __evm)
 */
function getFilename(operationId, source) {
  // Solana endpoints always get __solana suffix
  if (source === "solana") {
    return operationId + "__solana.md";
  }

  // EVM endpoints - check if Solana version exists
  if (source === "evm") {
    const hasSolanaVersion = operationRegistry[operationId] === "solana";
    if (hasSolanaVersion) {
      return operationId + "__evm.md";
    }
    return operationId + ".md";
  }

  // Streams (no collisions expected)
  return operationId + ".md";
}

/**
 * Register an operationId to track which sources have it
 */
function registerOperation(operationId, source) {
  operationRegistry[operationId] = source;
}

/**
 * Escape backticks for markdown
 */
function escapeMd(str) {
  if (!str) return "-";
  return String(str).replace(/`/g, "\\`");
}

/**
 * Build curl example from endpoint config
 */
function buildCurlExample(endpoint, source = "") {
  const {
    method,
    apiHost,
    path: pathTemplate,
    pathParams = [],
    queryParams = [],
    bodyParam,
  } = endpoint;

  // Build URL with path params replaced by examples
  let urlPath = pathTemplate;
  for (const param of pathParams) {
    let example = param.example;
    // For Solana network param, use "mainnet" as default
    if (source === "solana" && param.name === "network" && !example) {
      example = "mainnet";
    }
    if (example) {
      urlPath = urlPath.replace(":" + param.name, example);
    }
  }

  // Build query string
  const queryParamsStr = queryParams
    .filter((p) => p.example !== undefined)
    .map((p) => p.name + "=" + encodeURIComponent(String(p.example)))
    .join("&");

  let fullUrl = apiHost + urlPath;
  if (queryParamsStr) {
    fullUrl += "?" + queryParamsStr;
  }

  // Build curl command
  let curl = "curl -X " + method + ' "' + fullUrl + '" \\\n';
  curl += '  -H "accept: application/json" \\\n';
  curl += '  -H "X-API-Key: $MORALIS_API_KEY"';

  // Add body if present
  if (bodyParam) {
    const bodyExample = buildBodyExample(bodyParam);
    curl += ' \\\n  -H "Content-Type: application/json" \\\n';
    curl += "  -d '" + bodyExample + "'";
  }

  return curl;
}

/**
 * Build JSON body example from bodyParam
 */
function buildBodyExample(bodyParam) {
  if (typeof bodyParam === "string") {
    return bodyParam;
  }

  // Simple object builder
  const obj = {};
  if (
    typeof bodyParam === "object" &&
    bodyParam.fields &&
    Array.isArray(bodyParam.fields)
  ) {
    for (const field of bodyParam.fields) {
      if (field.example !== undefined) {
        obj[field.name] = field.example;
      }
    }
  }
  return JSON.stringify(obj, null, 2);
}

/**
 * Build pagination section if cursor/limit present
 */
function buildPaginationSection(endpoint) {
  const { queryParams = [], responses = [] } = endpoint;
  const hasCursorParam = queryParams.some((p) => p.name === "cursor");
  const hasLimitParam = queryParams.some((p) => p.name === "limit");

  // Check if response has cursor
  let responseHasCursor = false;
  for (const resp of responses) {
    if (resp.body && resp.body.fields) {
      const hasCursorField = resp.body.fields.some((f) => f.name === "cursor");
      if (hasCursorField) {
        responseHasCursor = true;
        break;
      }
    }
  }

  if (!hasCursorParam && !hasLimitParam && !responseHasCursor) {
    return null;
  }

  let section = "## Cursor/Pagination\n\n";

  if (hasLimitParam) {
    const limitParam = queryParams.find((p) => p.name === "limit");
    section +=
      "- **limit**: " +
      (limitParam.description || "Number of results per page") +
      "\n";
  }

  if (hasCursorParam) {
    const cursorParam = queryParams.find((p) => p.name === "cursor");
    section +=
      "- **cursor**: " +
      (cursorParam.description || "Cursor for next page") +
      "\n";
  }

  if (responseHasCursor) {
    section +=
      "\nThe response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.\n";
  }

  return section;
}

/**
 * Build path params section
 */
function buildPathParamsSection(pathParams = [], source = "") {
  if (pathParams.length === 0) {
    return null;
  }

  let section = "## Path Params\n\n";
  section += "| Name | Type | Required | Description | Example |\n";
  section += "|------|------|----------|-------------|----------|\n";

  for (const param of pathParams) {
    const name = param.name;
    // For Solana network param, default to mainnet if no enum specified
    let paramEnum = param.enum;
    if (source === "solana" && name === "network" && !paramEnum) {
      paramEnum = ["mainnet"];
    }
    const type =
      (param.type || "string") +
      (paramEnum ? " (" + paramEnum.join(", ") + ")" : "");
    const required = param.required ? "Yes" : "No";
    const desc = param.description || "-";
    const example = param.example
      ? "\\`" + escapeMd(param.example) + "\\`"
      : "-";
    section +=
      "| " +
      name +
      " | " +
      type +
      " | " +
      required +
      " | " +
      desc +
      " | " +
      example +
      " |\n";
  }

  return section;
}

/**
 * Build query params section
 */
function buildQueryParamsSection(queryParams = []) {
  if (queryParams.length === 0) {
    return null;
  }

  let section = "## Query Params\n\n";
  section += "| Name | Type | Required | Description | Example |\n";
  section += "|------|------|----------|-------------|----------|\n";

  for (const param of queryParams) {
    const name = param.name;
    const type =
      (param.type || "string") +
      (param.enum ? " (" + param.enum.join(", ") + ")" : "");
    const required = param.required ? "Yes" : "No";
    const desc = param.description || "-";
    const example =
      param.example !== undefined
        ? "\\`" + escapeMd(param.example) + "\\`"
        : "-";
    section +=
      "| " +
      name +
      " | " +
      type +
      " | " +
      required +
      " | " +
      desc +
      " | " +
      example +
      " |\n";
  }

  return section;
}

/**
 * Build body section
 */
function buildBodySection(endpoint) {
  const { bodyParam, bodySchema } = endpoint;

  if (!bodyParam && !bodySchema) {
    return null;
  }

  let section = "## Body\n\n";

  if (bodySchema && Array.isArray(bodySchema)) {
    section += "| Name | Type | Required | Description |\n";
    section += "|------|------|----------|-------------|\n";

    for (const field of bodySchema) {
      const type =
        (field.type || "-") +
        (field.enum ? " (" + field.enum.join(", ") + ")" : "");
      section +=
        "| " +
        field.name +
        " | " +
        type +
        " | " +
        (field.required ? "Yes" : "No") +
        " | " +
        (field.description || "-") +
        " |\n";
    }
  } else if (
    typeof bodyParam === "object" &&
    bodyParam.fields &&
    Array.isArray(bodyParam.fields)
  ) {
    section += "| Name | Type | Required | Description | Example |\n";
    section += "|------|------|----------|-------------|----------|\n";

    for (const field of bodyParam.fields) {
      const type =
        (field.type || "-") +
        (field.enum ? " (" + field.enum.join(", ") + ")" : "");
      const example =
        field.example !== undefined
          ? "\\`" + escapeMd(field.example) + "\\`"
          : "-";
      section +=
        "| " +
        field.name +
        " | " +
        type +
        " | " +
        (field.required ? "Yes" : "No") +
        " | " +
        (field.description || "-") +
        " | " +
        example +
        " |\n";
    }
  } else if (typeof bodyParam === "string") {
    section += "```json\n" + bodyParam + "\n```\n";
  }

  return section;
}

/**
 * Generate markdown content for a single endpoint
 */
function generateEndpointMarkdown(operationId, endpoint, source) {
  const {
    summary,
    description,
    method,
    apiHost,
    path: pathTemplate,
    pathParams = [],
    queryParams = [],
  } = endpoint;

  let md = "# " + summary + "\n\n";

  if (description) {
    md += description + "\n\n";
  }

  md += "## Method\n\n" + method + "\n\n";
  md += "## Base URL\n\n`" + apiHost + "`\n\n";
  md += "## Path\n\n`" + pathTemplate + "`\n\n";

  // Path params
  const pathParamsSection = buildPathParamsSection(pathParams, source);
  if (pathParamsSection) {
    md += pathParamsSection + "\n";
  }

  // Query params
  const queryParamsSection = buildQueryParamsSection(queryParams);
  if (queryParamsSection) {
    md += queryParamsSection + "\n";
  }

  // Body
  const bodySection = buildBodySection(endpoint);
  if (bodySection) {
    md += bodySection + "\n";
  }

  // Pagination
  const paginationSection = buildPaginationSection(endpoint);
  if (paginationSection) {
    md += paginationSection + "\n";
  }

  // Example
  md +=
    "## Example (curl)\n\n```bash\n" +
    buildCurlExample(endpoint, source) +
    "\n```\n";

  return md;
}

/**
 * Generate endpoint catalog for data-api SKILL.md
 */
function generateDataApiCatalog(apiConfigs) {
  const evm = apiConfigs.evm || {};
  const solana = apiConfigs.solana || {};

  // Explicit endpoint categorization by operationId pattern
  const categoryPatterns = [
    // Wallet - highest priority: starts with getWallet or getNative
    { pattern: /^getWallet|^getNative/, category: "wallet" },
    // NFT - contains NFT but not getWalletNFT (which is wallet)
    { pattern: /NFT|nft/, category: "nft", exclude: /^getWallet/ },
    // DeFi - contains DeFi
    { pattern: /DeFi|Defi/, category: "defi" },
    // Entity - contains Entity
    { pattern: /Entity|entity/, category: "entity" },
    // Token price data - getTokenPrice but not wallet
    { pattern: /TokenPrice|PairPrice|Candlesticks/, category: "price" },
    // NFT price data - NFTFloorPrice
    { pattern: /FloorPrice|floorprice/, category: "price" },
    // Token operations (holders, transfers, metadata) but not wallet
    {
      pattern: /^get(Token|ERC20)|^getMultiple/,
      category: "token",
      exclude: /Wallet|NFT/,
    },
    // Pairs and swaps
    { pattern: /Pair|Swaps|^getAggregated/, category: "token" },
    // Token analytics/score
    { pattern: /Analytics|Score|analytics/, category: "token" },
    // Blockchain - block, transaction, web3
    {
      pattern: /Block|Transaction|Web3|DateTo|Contract/,
      category: "blockchain",
    },
    // Discovery - trending, top, blue chips
    {
      pattern:
        /Top|Trending|BlueChip|Discovery|Buying|Solid|Risky|Gainers|Losers|Rising|Volume|TimeSeries|Snipers/,
      category: "discovery",
    },
    // Security - review
    { pattern: /Review|Contract/, category: "security" },
    // Other utility - resolve, endpoint weights, web3
    { pattern: /resolve|endpointWeights|web3Api/, category: "other" },
  ];

  const categoryTitles = {
    wallet: {
      title: "Wallet",
      description:
        "Balances, tokens, NFTs, transaction history, profitability, and net worth data.",
    },
    token: {
      title: "Token",
      description:
        "Token prices, metadata, pairs, DEX swaps, analytics, security scores, and sniper detection.",
    },
    nft: {
      title: "NFT",
      description:
        "NFT metadata, transfers, traits, rarity, floor prices, and trades.",
    },
    defi: {
      title: "DeFi",
      description: "DeFi protocol positions, liquidity, and exposure data.",
    },
    entity: {
      title: "Entity",
      description:
        "Labeled addresses including exchanges, funds, protocols, and whales.",
    },
    price: {
      title: "Price",
      description: "Token and NFT prices, OHLCV candlestick data.",
    },
    blockchain: {
      title: "Blockchain",
      description:
        "Blocks, transactions, date-to-block conversion, and contract functions.",
    },
    discovery: {
      title: "Discovery",
      description:
        "Trending tokens, blue chips, market movers, and token discovery.",
    },
    security: {
      title: "Security",
      description: "Contract security review and analysis.",
    },
    other: {
      title: "Other",
      description:
        "Utility endpoints including API version, endpoint weights, and address resolution.",
    },
  };

  // Categorize EVM endpoints
  const evmByCategory = {};
  for (const cat of Object.keys(categoryTitles)) {
    evmByCategory[cat] = [];
  }

  for (const [opId, endpoint] of Object.entries(evm)) {
    // Skip ignored endpoints
    if (shouldIgnoreEndpoint(opId)) {
      continue;
    }

    let categorized = false;

    for (const { pattern, category, exclude } of categoryPatterns) {
      if (exclude && opId.match(exclude)) continue;
      if (opId.match(pattern)) {
        evmByCategory[category].push({ opId, endpoint });
        categorized = true;
        break;
      }
    }

    if (!categorized) {
      evmByCategory.other.push({ opId, endpoint });
    }
  }

  // Count non-ignored endpoints
  const evmCount = Object.keys(evm).filter(
    (id) => !shouldIgnoreEndpoint(id),
  ).length;
  const solanaNativeCount = Object.keys(solana).filter(
    (id) => !shouldIgnoreEndpoint(id),
  ).length;

  // Count EVM endpoints with Solana chain support (for variants)
  const solanaOps = new Set(Object.keys(solana || {}));
  let evmSolanaVariantCount = 0;
  for (const [opId, endpoint] of Object.entries(evm)) {
    if (shouldIgnoreEndpoint(opId)) continue;
    if (solanaOps.has(opId)) continue;
    if (supportsSolanaChain(endpoint)) {
      evmSolanaVariantCount++;
    }
  }

  const totalSolana = solanaNativeCount + evmSolanaVariantCount;
  const totalCount = evmCount + totalSolana;

  // Generate catalog markdown
  let md = "## Endpoint Catalog\n\n";
  md +=
    "Complete list of all " +
    totalCount +
    " endpoints (" +
    evmCount +
    " EVM + " +
    totalSolana +
    " Solana) organized by category.\n\n";

  // EVM categories
  for (const [catKey, catDef] of Object.entries(categoryTitles)) {
    const endpoints = evmByCategory[catKey];
    if (endpoints.length === 0) continue;

    md += "### " + catDef.title + "\n\n";
    md += catDef.description + "\n\n";
    md += "| Endpoint | Description |\n";
    md += "|----------|-------------|\n";

    for (const { opId, endpoint } of endpoints.sort((a, b) =>
      a.opId.localeCompare(b.opId),
    )) {
      const desc = (endpoint.summary || "").substring(0, 80);
      const filename = getFilename(opId, "evm");
      md += "| [" + opId + "](rules/" + filename + ") | " + desc + " |\n";
    }

    md += "\n";
  }

  // Solana section
  // Collect EVM endpoints with Solana chain support
  const evmSolanaVariants = [];

  for (const [opId, endpoint] of Object.entries(evm)) {
    // Skip ignored endpoints
    if (shouldIgnoreEndpoint(opId)) {
      continue;
    }
    // Skip if there's already a native Solana endpoint with this name
    if (solanaOps.has(opId)) {
      continue;
    }
    // Check if this EVM endpoint supports Solana chain
    if (supportsSolanaChain(endpoint)) {
      evmSolanaVariants.push({ opId, endpoint });
    }
  }

  md += "### Solana Endpoints\n\n";
  md +=
    "Solana-specific endpoints (" +
    solanaNativeCount +
    " native + " +
    evmSolanaVariants.length +
    " EVM variants that support Solana chain = " +
    totalSolana +
    " total).\n\n";
  md += "| Endpoint | Description |\n";
  md += "|----------|-------------|\n";

  // Native Solana endpoints
  for (const [opId, endpoint] of Object.entries(solana).sort()) {
    // Skip ignored endpoints
    if (shouldIgnoreEndpoint(opId)) {
      continue;
    }
    const desc = (endpoint.summary || "").substring(0, 80);
    const filename = getFilename(opId, "solana");
    md += "| [" + opId + "](rules/" + filename + ") | " + desc + " |\n";
  }

  // EVM endpoints with Solana chain support
  for (const { opId, endpoint } of evmSolanaVariants.sort((a, b) =>
    a.opId.localeCompare(b.opId),
  )) {
    const desc =
      "**Solana variant:** " + (endpoint.summary || "").substring(0, 60);
    const filename = opId + "__solana.md";
    md += "| [" + opId + "](rules/" + filename + ") | " + desc + " |\n";
  }

  return md;
}

/**
 * Generate endpoint catalog for streams-api SKILL.md
 */
function generateStreamsApiCatalog(apiConfigs) {
  const streams = apiConfigs.streams || {};

  // Stream categories
  const categories = {
    streamManagement: {
      title: "Stream Management",
      description: "Create, update, delete, and manage streams.",
      keywords: [
        "Stream",
        "streams",
        "Create",
        "Update",
        "Delete",
        "Get",
        "Duplicate",
      ],
    },
    addressManagement: {
      title: "Address Management",
      description: "Add, remove, and replace addresses in streams.",
      keywords: ["Address", "Addresses"],
    },
    statusSettings: {
      title: "Status & Settings",
      description: "Pause/resume streams and configure settings.",
      keywords: ["Status", "Settings"],
    },
    historyAnalytics: {
      title: "History & Analytics",
      description: "Stream history, replay, statistics, logs, and block data.",
      keywords: ["History", "Replay", "Stats", "Logs", "Block"],
    },
  };

  // Categorize streams endpoints
  const streamsByCategory = {};
  for (const cat of Object.keys(categories)) {
    streamsByCategory[cat] = [];
  }

  for (const [opId, endpoint] of Object.entries(streams)) {
    let categorized = false;
    const searchStr = (
      opId +
      " " +
      (endpoint.summary || "") +
      " " +
      (endpoint.description || "")
    ).toLowerCase();

    for (const [catKey, catDef] of Object.entries(categories)) {
      if (catDef.keywords.some((k) => searchStr.includes(k.toLowerCase()))) {
        streamsByCategory[catKey].push({ opId, endpoint });
        categorized = true;
        break;
      }
    }

    if (!categorized) {
      streamsByCategory.streamManagement.push({ opId, endpoint });
    }
  }

  // Generate catalog markdown
  let md = "## Endpoint Catalog\n\n";
  md +=
    "Complete list of all " +
    Object.keys(streams).length +
    " Streams API endpoints organized by category.\n\n";

  for (const [catKey, catDef] of Object.entries(categories)) {
    const endpoints = streamsByCategory[catKey];
    if (endpoints.length === 0) continue;

    md += "### " + catDef.title + "\n\n";
    md += catDef.description + "\n\n";
    md += "| Endpoint | Description |\n";
    md += "|----------|-------------|\n";

    for (const { opId, endpoint } of endpoints.sort((a, b) =>
      a.opId.localeCompare(b.opId),
    )) {
      const desc = (endpoint.summary || "").substring(0, 80);
      md += "| [" + opId + "](rules/" + opId + ".md) | " + desc + " |\n";
    }

    md += "\n";
  }

  return md;
}

/**
 * Update SKILL.md file with new catalog section
 */
function updateSkillMdFile(skillPath, newCatalog) {
  let content = fs.readFileSync(skillPath, "utf8");
  const lines = content.split("\n");

  // Find the start of "## Endpoint Catalog"
  let catalogStartIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "## Endpoint Catalog") {
      catalogStartIndex = i;
      break;
    }
  }

  if (catalogStartIndex === -1) {
    console.warn(
      "  Could not find '## Endpoint Catalog' section in " + skillPath,
    );
    return;
  }

  // Find the next section start (## after catalog)
  let catalogEndIndex = lines.length;
  for (let i = catalogStartIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ") && lines[i] !== "## Endpoint Catalog") {
      catalogEndIndex = i;
      break;
    }
  }

  // Rebuild content: before catalog + new catalog + after catalog
  const beforeCatalog = lines.slice(0, catalogStartIndex).join("\n");
  const afterCatalog = lines.slice(catalogEndIndex).join("\n");

  const newContent = beforeCatalog + "\n" + newCatalog + "\n" + afterCatalog;
  writeFileIfChanged(skillPath, newContent);
}

/**
 * Process a single source (evm, solana, streams)
 */
function processSource(sourceName, sourceData, rulesDir) {
  const operationIds = Object.keys(sourceData);
  const ignored = [];

  for (const operationId of operationIds) {
    if (shouldIgnoreEndpoint(operationId)) {
      ignored.push(operationId);
      continue;
    }
    const endpoint = sourceData[operationId];
    const filename = getFilename(operationId, sourceName);
    const filepath = path.join(rulesDir, filename);

    const markdown = generateEndpointMarkdown(
      operationId,
      endpoint,
      sourceName,
    );

    writeFileIfChanged(filepath, markdown);
  }

  console.log(
    "  Processing " +
      sourceName +
      ": " +
      (operationIds.length - ignored.length) +
      " endpoints" +
      (ignored.length > 0 ? " (ignored: " + ignored.length + ")" : ""),
  );
  if (ignored.length > 0) {
    console.log("    Ignored: " + ignored.join(", "));
  }
}

/**
 * Check if an EVM endpoint supports Solana in its chain enum
 */
function supportsSolanaChain(endpoint) {
  if (!endpoint.queryParams) return false;
  const chainParam = endpoint.queryParams.find((p) => p.name === "chain");
  if (!chainParam || !chainParam.enum) return false;
  return chainParam.enum.includes("solana");
}

/**
 * Generate a Solana variant of an EVM endpoint
 * This creates a __solana version for EVM endpoints that support Solana chain
 */
function generateSolanaVariant(operationId, evmEndpoint) {
  // Create a modified endpoint for Solana
  const solanaEndpoint = { ...evmEndpoint };

  // Update description to indicate Solana support
  if (solanaEndpoint.description) {
    solanaEndpoint.description =
      "**Solana variant:** " +
      solanaEndpoint.description +
      "\n\nThis EVM endpoint supports Solana via the `chain=solana` parameter.";
  } else if (solanaEndpoint.summary) {
    solanaEndpoint.description =
      "**Solana variant:** " +
      solanaEndpoint.summary +
      "\n\nThis EVM endpoint supports Solana via the `chain=solana` parameter.";
  }

  // Set chain param example to "solana"
  if (solanaEndpoint.queryParams) {
    const chainParam = solanaEndpoint.queryParams.find(
      (p) => p.name === "chain",
    );
    if (chainParam) {
      // Create a new param object with solana as example
      const updatedParams = solanaEndpoint.queryParams.map((p) => {
        if (p.name === "chain") {
          return { ...p, example: "solana" };
        }
        return p;
      });
      solanaEndpoint.queryParams = updatedParams;
    }
  }

  return solanaEndpoint;
}

/**
 * Process EVM endpoints that support Solana chain
 * Creates __solana variants for endpoints that have "solana" in chain enum
 */
function processEvmEndpointsWithSolanaSupport(evmData, solanaData, rulesDir) {
  const evmOps = Object.keys(evmData);
  const solanaOps = new Set(Object.keys(solanaData || {}));

  const solanaVariants = [];

  for (const operationId of evmOps) {
    // Skip ignored endpoints
    if (shouldIgnoreEndpoint(operationId)) {
      continue;
    }

    const endpoint = evmData[operationId];

    // Skip if there's already a native Solana endpoint with this name
    if (solanaOps.has(operationId)) {
      continue;
    }

    // Check if this EVM endpoint supports Solana chain
    if (supportsSolanaChain(endpoint)) {
      solanaVariants.push({ operationId, endpoint });
    }
  }

  if (solanaVariants.length === 0) {
    return;
  }

  console.log(
    "\n  EVM endpoints with Solana chain support: " +
      solanaVariants.length +
      " (creating __solana variants)",
  );

  for (const { operationId, endpoint } of solanaVariants) {
    const filename = operationId + "__solana.md";
    const filepath = path.join(rulesDir, filename);

    const solanaEndpoint = generateSolanaVariant(operationId, endpoint);
    const markdown = generateEndpointMarkdown(
      operationId,
      solanaEndpoint,
      "solana-variant",
    );

    writeFileIfChanged(filepath, markdown);
  }
}

/**
 * Main entry point
 */
function main() {
  console.log("Generating REST endpoint rules...\n");

  // Load API configs
  const apiConfigs = JSON.parse(fs.readFileSync(API_CONFIGS_PATH, "utf8"));

  // First pass: register all operationIds to build the registry
  // This is needed to detect EVM-Solana collisions
  for (const [skillName, config] of Object.entries(SKILL_MAPPINGS)) {
    for (const source of config.sources) {
      if (apiConfigs[source]) {
        for (const operationId of Object.keys(apiConfigs[source])) {
          registerOperation(operationId, source);
        }
      }
    }
  }

  // Second pass: generate files with correct filenames
  for (const [skillName, config] of Object.entries(SKILL_MAPPINGS)) {
    console.log("\n" + skillName + ":");
    ensureDir(config.rulesDir);

    for (const source of config.sources) {
      if (apiConfigs[source]) {
        processSource(source, apiConfigs[source], config.rulesDir);
      } else {
        console.warn(
          '  Warning: source "' + source + '" not found in api-configs.json',
        );
      }
    }
  }

  // Third pass: generate __solana variants for EVM endpoints that support Solana chain
  const dataApiConfig = SKILL_MAPPINGS["moralis-data-api"];
  if (dataApiConfig && apiConfigs.evm) {
    processEvmEndpointsWithSolanaSupport(
      apiConfigs.evm,
      apiConfigs.solana,
      dataApiConfig.rulesDir,
    );
  }

  console.log("\nDone! Generated rules:");
  console.log("  - skills/moralis-data-api/rules/*.md");
  console.log("  - skills/moralis-streams-api/rules/*.md");

  // Generate SKILL.md endpoint catalogs
  console.log("\nGenerating SKILL.md endpoint catalogs...\n");

  // Update data-api SKILL.md
  const dataApiCatalog = generateDataApiCatalog(apiConfigs);
  const dataApiSkillPath = path.join(
    __dirname,
    "../skills/moralis-data-api/SKILL.md",
  );
  console.log("  Updating skills/moralis-data-api/SKILL.md");
  updateSkillMdFile(dataApiSkillPath, dataApiCatalog);

  // Update streams-api SKILL.md
  const streamsApiCatalog = generateStreamsApiCatalog(apiConfigs);
  const streamsApiSkillPath = path.join(
    __dirname,
    "../skills/moralis-streams-api/SKILL.md",
  );
  console.log("  Updating skills/moralis-streams-api/SKILL.md");
  updateSkillMdFile(streamsApiSkillPath, streamsApiCatalog);

  console.log("\nDone! Updated SKILL.md files with endpoint catalogs.");
}

// Run
if (require.main === module) {
  main();
}

module.exports = { main };
