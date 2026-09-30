/**
 * Shared helper for reaching the Vercel proxy-service endpoints. The service
 * base URL is stored in Firestore at config/discord.webhookServiceUrl; each
 * endpoint lives at {base}/api/{name} (webhook, espn, yahoo, tiktok).
 * The base is fetched once per session and cached — endpoint paths are
 * applied per call.
 */
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

let _baseUrlPromise: Promise<string> | null = null;

function getProxyBaseUrl(): Promise<string> {
  if (_baseUrlPromise) return _baseUrlPromise;
  _baseUrlPromise = getDoc(doc(db, "config", "discord"))
    .then((snap) => {
      const webhookServiceUrl: string = snap.exists() ? (snap.data().webhookServiceUrl ?? "") : "";
      if (!webhookServiceUrl) {
        _baseUrlPromise = null;
        return "";
      }
      const url = new URL(webhookServiceUrl);
      url.pathname = "/";
      return url.origin;
    })
    .catch((err) => {
      console.error("[proxyService] Failed to fetch proxy URL from Firestore:", err);
      _baseUrlPromise = null;
      return "";
    });
  return _baseUrlPromise;
}

/** Resolve the full URL for a proxy endpoint (e.g. "/api/tiktok"), or "" if unconfigured. */
export async function getProxyEndpoint(pathname: string): Promise<string> {
  const base = await getProxyBaseUrl();
  return base ? `${base}${pathname}` : "";
}
