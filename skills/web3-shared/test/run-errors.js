/**
 * Simple test runner for error classes
 */

const { ValidationError, APIError, TimeoutError } = require("../query");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

// ValidationError tests
test("ValidationError creates error with correct name and message", () => {
  const error = new ValidationError("Invalid chain parameter");
  assert(
    error.name === "ValidationError",
    `Expected name 'ValidationError', got '${error.name}'`,
  );
  assert(
    error.message === "Invalid chain parameter",
    `Expected message 'Invalid chain parameter', got '${error.message}'`,
  );
  assert(
    error instanceof Error,
    "Expected ValidationError to be instance of Error",
  );
});

test("ValidationError maintains stack trace", () => {
  const error = new ValidationError("Test");
  assert(error.stack !== undefined, "Expected stack trace to be defined");
  assert(
    error.stack.includes("ValidationError"),
    "Expected stack trace to include ValidationError",
  );
});

// APIError tests
test("APIError creates error with status code and response", () => {
  const response = { message: "Not found" };
  const error = new APIError(404, response);

  assert(
    error.name === "APIError",
    `Expected name 'APIError', got '${error.name}'`,
  );
  assert(
    error.statusCode === 404,
    `Expected statusCode 404, got ${error.statusCode}`,
  );
  assert(error.response === response, "Expected response to match");
  assert(
    error.message.includes("404"),
    `Expected message to include '404', got '${error.message}'`,
  );
  assert(
    error.message.includes("Not found"),
    `Expected message to include 'Not found', got '${error.message}'`,
  );
});

test("APIError handles complex response objects", () => {
  const response = { errors: ["Invalid param"], code: "INVALID_PARAMS" };
  const error = new APIError(400, response);

  assert(
    error.statusCode === 400,
    `Expected statusCode 400, got ${error.statusCode}`,
  );
  assert(error.response === response, "Expected response to match");
  assert(
    error.message.includes("INVALID_PARAMS"),
    `Expected message to include 'INVALID_PARAMS'`,
  );
});

test("APIError maintains stack trace", () => {
  const error = new APIError(500, { error: "Server error" });
  assert(error.stack !== undefined, "Expected stack trace to be defined");
  assert(
    error.stack.includes("APIError"),
    "Expected stack trace to include APIError",
  );
});

// TimeoutError tests
test("TimeoutError creates error with correct name and message", () => {
  const error = new TimeoutError("Request timeout after 30 seconds");
  assert(
    error.name === "TimeoutError",
    `Expected name 'TimeoutError', got '${error.name}'`,
  );
  assert(
    error.message === "Request timeout after 30 seconds",
    `Expected message 'Request timeout after 30 seconds', got '${error.message}'`,
  );
  assert(
    error instanceof Error,
    "Expected TimeoutError to be instance of Error",
  );
});

test("TimeoutError maintains stack trace", () => {
  const error = new TimeoutError("Test");
  assert(error.stack !== undefined, "Expected stack trace to be defined");
  assert(
    error.stack.includes("TimeoutError"),
    "Expected stack trace to include TimeoutError",
  );
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
