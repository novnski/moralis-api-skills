/**
 * Test that query.js exports correctly
 */

const q = require("../query");

console.log("✓ query.js loads successfully");
console.log("✓ Exports:", Object.keys(q).length, "functions");

const requiredExports = [
  "q",
  "query",
  "dateToBlock",
  "chainToHex",
  "searchToken",
  "detectBlockchain",
  "getAPIKey",
  "httpsRequest",
  "paginate",
  "createSpamFilter",
  "createVerifiedFilter",
  "batchQuery",
  "ValidationError",
  "APIError",
  "TimeoutError",
  "getMetrics",
];

let failed = false;
for (const exportName of requiredExports) {
  if (!q[exportName]) {
    console.error(`✗ Missing export: ${exportName}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log("✓ All required exports present");
console.log("\nAll export tests passed!");
