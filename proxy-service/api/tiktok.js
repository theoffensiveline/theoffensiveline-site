const axios = require("axios");

const TIKTOK_OEMBED_URL = "https://www.tiktok.com/oembed";

const TIKTOK_HOSTS = new Set([
  "tiktok.com",
  "www.tiktok.com",
  "m.tiktok.com",
  "vm.tiktok.com",
  "vt.tiktok.com",
]);

/**
 * TikTok oEmbed proxy.
 *
 * Browsers with tracking protection / ad blockers kill direct tiktok.com
 * requests, so newsletter submissions resolve TikTok short links through
 * here. Accepts { url } — must be a TikTok-host URL — and returns TikTok's
 * oEmbed response verbatim (the client extracts the canonical `cite` URL).
 *
 * This only ever calls the fixed oEmbed endpoint — the supplied URL is sent
 * as a query param and never fetched directly, so it can't relay arbitrary
 * requests. The host allowlist is hygiene on top.
 *
 * Expected POST body:
 *   url: string  — any tiktok.com/vm.tiktok.com/vt.tiktok.com URL
 */
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing required field: url" });
  }

  let hostname;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return res.status(400).json({ error: "Invalid url" });
  }
  if (!TIKTOK_HOSTS.has(hostname)) {
    return res.status(400).json({ error: "URL must be a TikTok URL" });
  }

  try {
    const response = await axios.get(TIKTOK_OEMBED_URL, { params: { url } });
    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "TikTok oEmbed fetch failed" };
    return res.status(status).json(data);
  }
};
