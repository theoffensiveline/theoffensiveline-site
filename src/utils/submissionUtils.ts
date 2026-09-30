/**
 * Helpers for user-submitted newsletter content (#submit). A submission's
 * `text` field is free-form: bare image URLs render as <img>, bare tweet
 * URLs render as embedded tweets, bare Instagram reel/post URLs render as
 * Instagram embeds, everything else is plain text.
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
