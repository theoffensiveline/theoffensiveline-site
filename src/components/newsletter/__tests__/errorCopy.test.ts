import { getErrorCopy } from "../errorCopy";

describe("getErrorCopy", () => {
  it("returns a default message for null error", () => {
    const copy = getErrorCopy(null);
    expect(copy.title).toBeTruthy();
    expect(copy.description).toBeTruthy();
  });

  it("returns a default message for undefined error", () => {
    const copy = getErrorCopy(undefined);
    expect(copy.title).toBeTruthy();
    expect(copy.description).toBeTruthy();
  });

  it("returns timeout copy for timeout errors", () => {
    const copy = getErrorCopy(new Error("Request timed out"));
    expect(copy.title).toMatch(/timed out|timeout|sleeper api/i);
  });

  it("returns network copy for fetch errors", () => {
    const copy = getErrorCopy(new Error("Failed to fetch"));
    expect(copy.title).toMatch(/network/i);
  });

  it("returns 404 copy for not-found errors", () => {
    const copy = getErrorCopy(new Error("404 not found"));
    expect(copy.title).toMatch(/not found/i);
  });

  it("returns rate-limit copy for 429 errors", () => {
    const copy = getErrorCopy(new Error("429 Too Many Requests"));
    expect(copy.title).toMatch(/too many requests/i);
  });

  it("returns server error copy for 500 errors", () => {
    const copy = getErrorCopy(new Error("500 Internal Server Error"));
    expect(copy.title).toMatch(/sleeper api error/i);
  });

  it("returns parse error copy for JSON errors", () => {
    const copy = getErrorCopy(new Error("unexpected token in JSON"));
    expect(copy.title).toMatch(/unexpected data/i);
  });

  it("returns generic copy for unrecognized errors", () => {
    const copy = getErrorCopy(new Error("Some unknown error XYZ"));
    // Should still have a title and description
    expect(copy.title).toBeTruthy();
    expect(copy.description).toBeTruthy();
  });

  it("returned descriptions tell the user what to do", () => {
    const errors = [
      new Error("Failed to fetch"),
      new Error("timeout"),
      new Error("Some unknown problem"),
    ];
    for (const err of errors) {
      const copy = getErrorCopy(err);
      // Description should suggest an action (retry / refresh / check)
      expect(/retry|refresh|check|try again|wait/i.test(copy.description)).toBe(true);
    }
  });
});
