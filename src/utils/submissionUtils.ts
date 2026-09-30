import { getProxyEndpoint } from "./api/proxyService";

/**
 * Helpers for user-submitted newsletter content (#submit). A submission's
 * `text` field is free-form: bare image URLs render as <img>, bare tweet
 * URLs render as embedded tweets, bare Instagram reel/post URLs render as
 * Instagram embeds, bare TikTok video URLs render as TikTok embeds,
 * everything else is plain text.
 */

/** True if a string is a bare http(s) URL (no whitespace or surrounding prose). */
export function isBareUrl(s: string): boolean {
  return /^https?:\/\/\S+$/i.test(s.trim());
}

/** True if a string is a bare image URL (http/https, no whitespace, common image extension). */
export function isImageUrl(s: string): boolean {
  const trimmed = s.trim();
  if (trimmed.length === 0 || /\s/.test(trimmed)) return false;
  return /^https?:\/\/\S+\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(trimmed);
}

/**
 * Extract the tweet ID if a string is a bare twitter.com/x.com status URL
 * (no surrounding whitespace or prose). Returns null otherwise.
 */
export function getTweetId(s: string): string | null {
  const trimmed = s.trim();
  if (trimmed.length === 0 || /\s/.test(trimmed)) return null;
  const match =
    /^https?:\/\/(?:www\.|mobile\.)?(?:twitter\.com|x\.com)\/[A-Za-z0-9_]+\/status(?:es)?\/(\d+)/i.exec(
      trimmed
    );
  return match ? match[1] : null;
}

/**
 * Extract a canonical embed permalink if a string is a bare instagram.com
 * reel/post URL (no surrounding whitespace or prose). Returns null otherwise.
 * Handles /reel/, /reels/, and /p/ paths, optional username prefixes
 * (instagram.com/{user}/reel/{id}), and trailing slashes/query strings.
 */
export function getInstagramEmbedUrl(s: string): string | null {
  const trimmed = s.trim();
  if (trimmed.length === 0 || /\s/.test(trimmed)) return null;
  const match =
    /^https?:\/\/(?:www\.)?instagram\.com\/(?:[A-Za-z0-9_.]+\/)?(reels?|p)\/([A-Za-z0-9_-]+)/i.exec(
      trimmed
    );
  if (!match) return null;
  const type = match[1].toLowerCase() === "reels" ? "reel" : match[1].toLowerCase();
  return `https://www.instagram.com/${type}/${match[2]}/`;
}

export interface TikTokEmbedData {
  /** Canonical video URL with tracking params stripped — used as `cite`. */
  url: string;
  /** Numeric video/photo ID for `data-video-id`. */
  videoId: string;
  /** TikTok username without @ — used for the fallback link. */
  username: string;
}

/**
 * Extract embed data if a string is a bare tiktok.com/@{user}/video/{id} (or
 * /photo/{id}) URL, canonicalized with query/tracking params stripped.
 * Returns null otherwise — including /t/, vm.tiktok.com, and vt.tiktok.com
 * short links, which encode a share token rather than the video ID (see
 * resolveTikTokUrl for resolving those).
 */
export function getTikTokEmbedData(s: string): TikTokEmbedData | null {
  const trimmed = s.trim();
  if (trimmed.length === 0 || /\s/.test(trimmed)) return null;
  const match =
    /^https?:\/\/(?:www\.|m\.)?tiktok\.com\/@([A-Za-z0-9_.]+)\/(video|photo)\/(\d+)/i.exec(trimmed);
  if (!match) return null;
  const username = match[1];
  const type = match[2].toLowerCase();
  const videoId = match[3];
  return {
    url: `https://www.tiktok.com/@${username}/${type}/${videoId}`,
    videoId,
    username,
  };
}

/**
 * True if a string is a bare URL on any TikTok host (tiktok.com, vm., vt.),
 * regardless of path. Used to route into resolveTikTokUrl — short links
 * encode a share token instead of a video ID and need resolving.
 */
export function isTikTokUrl(s: string): boolean {
  const trimmed = s.trim();
  if (trimmed.length === 0 || /\s/.test(trimmed)) return false;
  return /^https?:\/\/(?:(?:www\.|m\.)?tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)\/\S+/i.test(
    trimmed
  );
}

const tiktokResolveCache = new Map<string, Promise<TikTokEmbedData | null>>();

/** Pull the canonical video URL out of a TikTok oEmbed response's markup. */
function tiktokDataFromOembed(data: { html?: string } | null): TikTokEmbedData | null {
  const cite = /cite="([^"]+)"/.exec(data?.html ?? "")?.[1];
  return cite ? getTikTokEmbedData(cite) : null;
}

async function fetchTikTokOembed(url: string): Promise<TikTokEmbedData | null> {
  try {
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
    return tiktokDataFromOembed(res.ok ? await res.json() : null);
  } catch {
    return null;
  }
}

/* Browsers with tracking protection block direct tiktok.com requests — fall
   back to the Vercel proxy, which calls the same oEmbed endpoint
   server-side. Empty endpoint means the proxy isn't configured/deployed. */
async function fetchTikTokOembedViaProxy(url: string): Promise<TikTokEmbedData | null> {
  try {
    const endpoint = await getProxyEndpoint("/api/tiktok");
    if (!endpoint) return null;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    return tiktokDataFromOembed(res.ok ? await res.json() : null);
  } catch {
    return null;
  }
}

/**
 * Resolve any bare TikTok URL to embed data. Canonical @user/video/{id} URLs
 * parse locally; everything else (short links like /t/{code}, vm., vt.) goes
 * through TikTok's public oEmbed endpoint — it's CORS-enabled and follows
 * TikTok's own redirects server-side, returning the canonical URL in the
 * `cite` attribute of its embed markup. If the direct request is blocked
 * (tracking protection, etc.) it retries through the Vercel proxy. Results
 * are cached in-memory so repeat renders share one request. Resolves to null
 * when unresolvable.
 */
export function resolveTikTokUrl(url: string): Promise<TikTokEmbedData | null> {
  const trimmed = url.trim();
  const direct = getTikTokEmbedData(trimmed);
  if (direct) return Promise.resolve(direct);
  if (!isTikTokUrl(trimmed)) return Promise.resolve(null);
  const cached = tiktokResolveCache.get(trimmed);
  if (cached) return cached;
  const promise = (async () =>
    (await fetchTikTokOembed(trimmed)) ?? fetchTikTokOembedViaProxy(trimmed))();
  tiktokResolveCache.set(trimmed, promise);
  return promise;
}
