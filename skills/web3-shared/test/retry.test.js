/**
 * Tests for network error retry logic
 */

const https = require("https");
const { httpsRequest } = require("../query");

// Mock https.request to test retry logic
const originalRequest = https.request;
let attemptCount = 0;
let shouldFail = false;
let errorType = "ECONNREFUSED";

function setupMock() {
  attemptCount = 0;
  https.request = function (options, callback) {
    attemptCount++;
    const req = {
      on: function (event, handler) {
        if (event === "error" && shouldFail) {
          setTimeout(() => handler(new Error(errorType)), 10);
        }
        if (event === "timeout" && shouldFail && errorType === "ETIMEDOUT") {
          setTimeout(() => handler(), 10);
        }
      },
      write: function () {},
      end: function () {
        if (!shouldFail) {
          setTimeout(() => {
            const res = {
              statusCode: 200,
              on: function (event, handler) {
                if (event === "data") handler('{"result":"success"}');
                if (event === "end") handler();
              },
            };
            callback(res);
          }, 10);
        }
      },
      destroy: function () {},
    };
    return req;
  };
}

function restoreMock() {
  https.request = originalRequest;
}

describe("Network Error Retry Logic", () => {
  afterEach(() => {
    restoreMock();
  });

  test("retries on ECONNREFUSED errors", async () => {
    setupMock();
    shouldFail = true;
    errorType = "ECONNREFUSED";

    try {
      await httpsRequest("https://api.test.com/endpoint", {});
      fail("Expected error to be thrown");
    } catch (error) {
      expect(attemptCount).toBe(4); // Initial + 3 retries
    }
  }, 10000);

  test("retries on ENOTFOUND errors", async () => {
    setupMock();
    shouldFail = true;
    errorType = "ENOTFOUND";

    try {
      await httpsRequest("https://api.test.com/endpoint", {});
      fail("Expected error to be thrown");
    } catch (error) {
      expect(attemptCount).toBe(4); // Initial + 3 retries
    }
  }, 10000);

  test("retries on ETIMEDOUT errors", async () => {
    setupMock();
    shouldFail = true;
    errorType = "ETIMEDOUT";

    try {
      await httpsRequest("https://api.test.com/endpoint", {});
      fail("Expected error to be thrown");
    } catch (error) {
      expect(attemptCount).toBe(4); // Initial + 3 retries
    }
  }, 10000);

  test("succeeds on retry after transient error", async () => {
    setupMock();
    shouldFail = true;
    errorType = "ECONNREFUSED";

    // Let it succeed on the 3rd attempt
    const originalOn = https.request;
    let callCount = 0;
    https.request = function (options, callback) {
      callCount++;
      const req = {
        on: function (event, handler) {
          if (event === "error" && callCount < 3) {
            setTimeout(() => handler(new Error("ECONNREFUSED")), 10);
          }
        },
        write: function () {},
        end: function () {
          if (callCount >= 3) {
            setTimeout(() => {
              const res = {
                statusCode: 200,
                on: function (event, handler) {
                  if (event === "data") handler('{"result":"success"}');
                  if (event === "end") handler();
                },
              };
              callback(res);
            }, 10);
          }
        },
        destroy: function () {},
      };
      return req;
    };

    const result = await httpsRequest("https://api.test.com/endpoint", {});
    expect(result).toEqual({ result: "success" });
    expect(callCount).toBe(3);
  }, 10000);

  test("does not retry on non-transient errors", async () => {
    setupMock();
    shouldFail = true;
    errorType = "SOME_OTHER_ERROR";

    try {
      await httpsRequest("https://api.test.com/endpoint", {});
      fail("Expected error to be thrown");
    } catch (error) {
      expect(attemptCount).toBe(1); // Only initial attempt
    }
  }, 10000);

  test("uses exponential backoff between retries", async () => {
    setupMock();
    shouldFail = true;
    errorType = "ECONNREFUSED";

    const startTime = Date.now();
    try {
      await httpsRequest("https://api.test.com/endpoint", {});
    } catch (error) {
      const elapsed = Date.now() - startTime;
      // With exponential backoff (100ms * 2^n), 3 retries should take at least 700ms
      expect(elapsed).toBeGreaterThan(700);
    }
  }, 10000);
});

// Helper for Jest-style tests
function fail(message) {
  throw new Error(message);
}

function expect(value) {
  return {
    toBe: (expected) => {
      if (value !== expected) {
        throw new Error(`Expected ${expected}, got ${value}`);
      }
    },
    toEqual: (expected) => {
      if (JSON.stringify(value) !== JSON.stringify(expected)) {
        throw new Error(
          `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`,
        );
      }
    },
    toBeGreaterThan: (expected) => {
      if (value <= expected) {
        throw new Error(`Expected value > ${expected}, got ${value}`);
      }
    },
  };
}
