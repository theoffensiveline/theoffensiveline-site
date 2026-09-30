import {
  getInstagramEmbedUrl,
  getTikTokEmbedData,
  isTikTokUrl,
  resolveTikTokUrl,
} from "../submissionUtils";
import { getProxyEndpoint } from "../api/proxyService";

/* Keep the proxy fallback hermetic — no Firestore/network in tests.
   jest.mock is hoisted above the imports. */
jest.mock("../api/proxyService", () => ({ getProxyEndpoint: jest.fn() }));
const mockGetProxyEndpoint = getProxyEndpoint as jest.MockedFunction<typeof getProxyEndpoint>;

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

describe("getTikTokEmbedData", () => {
  it("extracts embed data from a canonical video URL", () => {
    expect(
      getTikTokEmbedData("https://www.tiktok.com/@no_bs_fantasyfootball/video/7691427652162424078")
    ).toEqual({
      url: "https://www.tiktok.com/@no_bs_fantasyfootball/video/7691427652162424078",
      videoId: "7691427652162424078",
      username: "no_bs_fantasyfootball",
    });
  });

  it("strips tracking params", () => {
    expect(
      getTikTokEmbedData(
        "https://www.tiktok.com/@no_bs_fantasyfootball/video/7691427652162424078?_r=1&_t=ZP-9AApDowxg4s"
      )?.url
    ).toBe("https://www.tiktok.com/@no_bs_fantasyfootball/video/7691427652162424078");
  });

  it("handles photo posts and mobile subdomains", () => {
    expect(getTikTokEmbedData("https://m.tiktok.com/@user.name/photo/123")?.videoId).toBe("123");
    expect(getTikTokEmbedData("https://tiktok.com/@user/photo/123")?.url).toBe(
      "https://www.tiktok.com/@user/photo/123"
    );
  });

  it("returns null for short links (no video ID in the URL)", () => {
    expect(getTikTokEmbedData("https://www.tiktok.com/t/ZP8E4fvgc/")).toBeNull();
    expect(getTikTokEmbedData("https://vm.tiktok.com/ZMhAbCd/")).toBeNull();
    expect(getTikTokEmbedData("https://vt.tiktok.com/ZSjAbCd/")).toBeNull();
  });

  it("returns null for non-video paths, non-TikTok URLs, and non-bare strings", () => {
    expect(getTikTokEmbedData("https://www.tiktok.com/@user")).toBeNull();
    expect(getTikTokEmbedData("https://www.tiktok.com/tag/fantasyfootball")).toBeNull();
    expect(getTikTokEmbedData("https://twitter.com/foo/status/123")).toBeNull();
    expect(getTikTokEmbedData("lol https://www.tiktok.com/@u/video/123")).toBeNull();
    expect(getTikTokEmbedData("")).toBeNull();
  });
});

describe("isTikTokUrl", () => {
  it("matches any bare TikTok-host URL", () => {
    expect(isTikTokUrl("https://www.tiktok.com/@u/video/123")).toBe(true);
    expect(isTikTokUrl("https://www.tiktok.com/t/ZP8E4fvgc/")).toBe(true);
    expect(isTikTokUrl("https://vm.tiktok.com/ZMhAbCd/")).toBe(true);
    expect(isTikTokUrl("https://vt.tiktok.com/ZSjAbCd/")).toBe(true);
  });

  it("rejects non-TikTok and non-bare strings", () => {
    expect(isTikTokUrl("https://faketiktok.com/@u/video/123")).toBe(false);
    expect(isTikTokUrl("https://twitter.com/foo/status/123")).toBe(false);
    expect(isTikTokUrl("check https://www.tiktok.com/t/ZP8E4fvgc/")).toBe(false);
    expect(isTikTokUrl("")).toBe(false);
  });
});

describe("resolveTikTokUrl", () => {
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
    mockGetProxyEndpoint.mockReset();
  });

  it("returns canonical URLs locally without fetching", async () => {
    global.fetch = jest.fn() as unknown as typeof fetch;
    const data = await resolveTikTokUrl("https://www.tiktok.com/@u/video/9876543210");
    expect(data?.videoId).toBe("9876543210");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns null for non-TikTok URLs without fetching", async () => {
    global.fetch = jest.fn() as unknown as typeof fetch;
    await expect(resolveTikTokUrl("https://example.com/x")).resolves.toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("resolves short links through the oEmbed endpoint", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        html: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@no_bs_ff/video/111222333"><section></section></blockquote>',
      }),
    }) as unknown as typeof fetch;
    const data = await resolveTikTokUrl("https://www.tiktok.com/t/SHORTa1/");
    expect(global.fetch).toHaveBeenCalledWith(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent("https://www.tiktok.com/t/SHORTa1/")}`
    );
    expect(data).toEqual({
      url: "https://www.tiktok.com/@no_bs_ff/video/111222333",
      videoId: "111222333",
      username: "no_bs_ff",
    });
  });

  it("falls back to the Vercel proxy when direct oEmbed is blocked", async () => {
    mockGetProxyEndpoint.mockResolvedValue("https://proxy.example/api/tiktok");
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new TypeError("NetworkError when attempting to fetch resource"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          html: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@u/video/555777">',
        }),
      }) as unknown as typeof fetch;
    const data = await resolveTikTokUrl("https://vm.tiktok.com/ZMv001/");
    expect(data?.videoId).toBe("555777");
    /* Second fetch call is the proxy POST carrying the original short URL. */
    expect(global.fetch).toHaveBeenLastCalledWith(
      "https://proxy.example/api/tiktok",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ url: "https://vm.tiktok.com/ZMv001/" }),
      })
    );
  });

  it("resolves to null when oEmbed fails or returns unusable markup", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: false, json: async () => null })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ html: "<p>no cite</p>" }) })
      .mockRejectedValueOnce(new Error("network")) as unknown as typeof fetch;
    await expect(resolveTikTokUrl("https://www.tiktok.com/t/FAILa01/")).resolves.toBeNull();
    await expect(resolveTikTokUrl("https://www.tiktok.com/t/FAILb02/")).resolves.toBeNull();
    await expect(resolveTikTokUrl("https://www.tiktok.com/t/FAILc03/")).resolves.toBeNull();
  });
});
