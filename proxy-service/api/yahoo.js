const axios = require("axios");

const YAHOO_TOKEN_URL = "https://api.login.yahoo.com/oauth2/get_token";

// Credentials stored as Vercel environment variables — never sent from the browser.
const YAHOO_CLIENT_ID = process.env.YAHOO_CLIENT_ID;
const YAHOO_CLIENT_SECRET = process.env.YAHOO_CLIENT_SECRET;

/**
 * Yahoo proxy.
 *
 * Handles:
 *   action: "exchange"  — authorization_code → tokens (requires code, redirectUri)
 *   action: "refresh"   — refresh_token → new tokens (requires refreshToken)
 *   action: "fetch"     — proxy a Yahoo Fantasy API GET (requires path, token)
 *
 * Yahoo's Fantasy API has no CORS headers, so all API calls must go through
 * this proxy. Token operations require HTTP Basic Auth with client_id:client_secret.
 *
 * Expected POST body:
 *   action: "exchange" | "refresh" | "fetch"
 *   redirectUri: string   (required for "exchange")
 *   code?: string         (required for "exchange")
 *   refreshToken?: string (required for "refresh")
 *   path?: string         (required for "fetch" — e.g. "/league/nfl.l.123?format=json")
 *   token?: string        (required for "fetch" — Bearer access token)
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

  if (!YAHOO_CLIENT_ID || !YAHOO_CLIENT_SECRET) {
    return res.status(500).json({ error: "Yahoo credentials not configured on server." });
  }

  const { action, redirectUri, code, refreshToken, path, token } = req.body;

  if (!action) {
    return res.status(400).json({ error: "Missing required field: action" });
  }

  // Proxy a Yahoo Fantasy API GET request (no client_secret needed, just the Bearer token)
  if (action === "fetch") {
    if (!path || !token) {
      return res.status(400).json({ error: "fetch requires: path, token" });
    }
    try {
      const yahooUrl = `https://fantasysports.yahooapis.com${path}`;
      const response = await axios.get(yahooUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.status(200).json(response.data);
    } catch (error) {
      const status = error.response?.status || 500;
      const data = error.response?.data || { error: "Yahoo API fetch failed" };
      return res.status(status).json(data);
    }
  }

  if (!YAHOO_CLIENT_ID || !YAHOO_CLIENT_SECRET) {
    return res.status(500).json({ error: "Yahoo credentials not configured on server." });
  }

  let params;

  if (action === "exchange") {
    if (!code || !redirectUri) {
      return res.status(400).json({ error: "exchange requires: code, redirectUri" });
    }
    params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    });
  } else if (action === "refresh") {
    if (!refreshToken) {
      return res.status(400).json({ error: "refresh requires: refreshToken" });
    }
    params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
  } else {
    return res.status(400).json({ error: `Unknown action: ${action}` });
  }

  // Yahoo requires HTTP Basic Auth: base64(client_id:client_secret)
  const basicAuth = Buffer.from(`${YAHOO_CLIENT_ID}:${YAHOO_CLIENT_SECRET}`).toString("base64");

  try {
    const response = await axios.post(YAHOO_TOKEN_URL, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
    });

    const { access_token, refresh_token, expires_in, token_type } = response.data;
    res.status(200).json({ access_token, refresh_token, expires_in, token_type });
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "Failed to exchange Yahoo token" };
    res.status(status).json(data);
  }
};
