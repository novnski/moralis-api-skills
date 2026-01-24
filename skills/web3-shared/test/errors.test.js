/**
 * Tests for custom error classes
 */

const { ValidationError, APIError, TimeoutError } = require("../query");

describe("Custom Error Classes", () => {
  describe("ValidationError", () => {
    test("creates error with correct name and message", () => {
      const error = new ValidationError("Invalid chain parameter");
      expect(error.name).toBe("ValidationError");
      expect(error.message).toBe("Invalid chain parameter");
      expect(error instanceof Error).toBe(true);
    });

    test("maintains stack trace", () => {
      const error = new ValidationError("Test");
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("ValidationError");
    });
  });

  describe("APIError", () => {
    test("creates error with status code and response", () => {
      const response = { message: "Not found" };
      const error = new APIError(404, response);

      expect(error.name).toBe("APIError");
      expect(error.statusCode).toBe(404);
      expect(error.response).toEqual(response);
      expect(error.message).toContain("404");
      expect(error.message).toContain("Not found");
    });

    test("handles complex response objects", () => {
      const response = { errors: ["Invalid param"], code: "INVALID_PARAMS" };
      const error = new APIError(400, response);

      expect(error.statusCode).toBe(400);
      expect(error.response).toEqual(response);
      expect(error.message).toContain("INVALID_PARAMS");
    });

    test("maintains stack trace", () => {
      const error = new APIError(500, { error: "Server error" });
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("APIError");
    });
  });

  describe("TimeoutError", () => {
    test("creates error with correct name and message", () => {
      const error = new TimeoutError("Request timeout after 30 seconds");
      expect(error.name).toBe("TimeoutError");
      expect(error.message).toBe("Request timeout after 30 seconds");
      expect(error instanceof Error).toBe(true);
    });

    test("maintains stack trace", () => {
      const error = new TimeoutError("Test");
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("TimeoutError");
    });
  });
});
