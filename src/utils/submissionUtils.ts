/**
 * Helpers for user-submitted newsletter content (#submit). A submission's
 * `text` field is free-form: bare image URLs render as <img>, bare tweet
 * URLs render as embedded tweets, everything else is plain text.
 */

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
