import { getInstagramEmbedUrl } from "../submissionUtils";

describe("getInstagramEmbedUrl", () => {
  it("canonicalizes a bare reel URL", () => {
    expect(getInstagramEmbedUrl("https://www.instagram.com/reel/DPBv5iRDdOU/")).toBe(
      "https://www.instagram.com/reel/DPBv5iRDdOU/"
    );
  });

  it("canonicalizes a bare post URL", () => {
    expect(getInstagramEmbedUrl("https://instagram.com/p/ABC123")).toBe(
      "https://www.instagram.com/p/ABC123/"
    );
  });

  it("normalizes /reels/ to /reel/", () => {
    expect(getInstagramEmbedUrl("https://www.instagram.com/reels/XYz_9-a/")).toBe(
      "https://www.instagram.com/reel/XYz_9-a/"
    );
  });

  it("strips query strings and trailing params", () => {
    expect(
      getInstagramEmbedUrl("https://www.instagram.com/reel/DPBv5iRDdOU/?igsh=abc&utm_source=ig_web")
    ).toBe("https://www.instagram.com/reel/DPBv5iRDdOU/");
  });

  it("handles username-prefixed share links", () => {
    expect(getInstagramEmbedUrl("https://www.instagram.com/some.user/reel/DPBv5iRDdOU/")).toBe(
      "https://www.instagram.com/reel/DPBv5iRDdOU/"
    );
  });

  it("is case-insensitive", () => {
    expect(getInstagramEmbedUrl("HTTPS://WWW.INSTAGRAM.COM/REEL/ABCdef_123")).toBe(
      "https://www.instagram.com/reel/ABCdef_123/"
    );
  });

  it("returns null for non-Instagram URLs", () => {
    expect(getInstagramEmbedUrl("https://twitter.com/foo/status/123")).toBeNull();
    expect(getInstagramEmbedUrl("https://i.imgur.com/abc.png")).toBeNull();
  });

  it("returns null for Instagram URLs without a post path", () => {
    expect(getInstagramEmbedUrl("https://www.instagram.com/explore/")).toBeNull();
    expect(getInstagramEmbedUrl("https://www.instagram.com/some.user/")).toBeNull();
    expect(getInstagramEmbedUrl("https://www.instagram.com/p/")).toBeNull();
  });

  it("returns null when the URL isn't bare", () => {
    expect(
      getInstagramEmbedUrl("check this out https://www.instagram.com/reel/DPBv5iRDdOU/")
    ).toBeNull();
    expect(getInstagramEmbedUrl("https://www.instagram.com/reel/DPBv5iRDdOU/ so funny")).toBeNull();
  });

  it("returns null for empty and non-URL strings", () => {
    expect(getInstagramEmbedUrl("")).toBeNull();
    expect(getInstagramEmbedUrl("   ")).toBeNull();
    expect(getInstagramEmbedUrl("instagram.com/reel/DPBv5iRDdOU/")).toBeNull();
  });
});
