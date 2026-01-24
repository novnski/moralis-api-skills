/**
 * Test metrics functionality
 */

const { getMetrics } = require("../query");

console.log("Testing getMetrics()...");

const metrics1 = getMetrics();
console.log("Initial metrics:", metrics1);

// Verify structure
if (typeof metrics1.requests !== "number") {
  console.error("✗ metrics.requests should be a number");
  process.exit(1);
}
if (typeof metrics1.errors !== "number") {
  console.error("✗ metrics.errors should be a number");
  process.exit(1);
}
if (typeof metrics1.timeouts !== "number") {
  console.error("✗ metrics.timeouts should be a number");
  process.exit(1);
}
if (typeof metrics1.rateLimits !== "number") {
  console.error("✗ metrics.rateLimits should be a number");
  process.exit(1);
}

// Verify it's a copy (not the original object)
metrics1.requests = 999;
const metrics2 = getMetrics();
if (metrics2.requests === 999) {
  console.error("✗ getMetrics() should return a copy, not the original");
  process.exit(1);
}

console.log("✓ getMetrics() returns correct structure");
console.log("✓ getMetrics() returns a copy, not reference");
console.log("\nAll metrics tests passed!");
