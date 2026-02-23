/**
 * Actionable error copy for newsletter sections.
 *
 * Each entry has a friendly headline, a short explanation, and an optional
 * technical detail shown in parentheses for engineers (can be hidden in prod).
 */

export interface ErrorCopy {
  /** Short, user-facing headline */
  title: string;
  /** One-sentence explanation of what went wrong and what to try */
  description: string;
}

/** Maps a known error message fragment to friendly copy */
const ERROR_COPY_MAP: Array<{ match: RegExp; copy: ErrorCopy }> = [
  {
    match: /timeout|timed out|ETIMEDOUT/i,
    copy: {
      title: "API timed out",
      description:
        "The server took too long to respond. Hit Retry — it usually resolves on the second try.",
    },
  },
  {
    match: /network|failed to fetch|NetworkError|net::ERR/i,
    copy: {
      title: "Network connection issue",
      description: "Couldn't reach the API. Check your connection and try again.",
    },
  },
  {
    match: /404|not found/i,
    copy: {
      title: "League or week not found",
      description:
        "The league ID or week number may be incorrect. Double-check the URL and try again.",
    },
  },
  {
    match: /429|rate limit|too many requests/i,
    copy: {
      title: "Too many requests",
      description: "The API is rate-limiting requests right now. Wait a moment and retry.",
    },
  },
  {
    match: /500|502|503|server error|internal server/i,
    copy: {
      title: "API server error",
      description:
        "The API returned a server error. This usually resolves on its own — try again in a minute.",
    },
  },
  {
    match: /invalid.*data|parse|JSON|unexpected token/i,
    copy: {
      title: "Unexpected data format",
      description: "The data returned looks different than expected. Try refreshing.",
    },
  },
  {
    match: /not authenticated|re-authorization|No refresh token/i,
    copy: {
      title: "Yahoo session expired",
      description:
        "Your Yahoo OAuth token has expired. Re-connect your Yahoo account and try again.",
    },
  },
  {
    match: /Could not reach.*proxy|Could not reach token/i,
    copy: {
      title: "Proxy unavailable",
      description: "The API proxy couldn't be reached. Check your network and try again.",
    },
  },
];

const DEFAULT_COPY: ErrorCopy = {
  title: "Couldn't load this section",
  description: "Something went wrong fetching data. Hit Retry or refresh the page.",
};

/**
 * Return user-friendly error copy based on the error message.
 * Falls back to a generic message if no pattern matches.
 */
export function getErrorCopy(error: Error | null | undefined): ErrorCopy {
  if (!error) return DEFAULT_COPY;

  const msg = error.message;
  for (const { match, copy } of ERROR_COPY_MAP) {
    if (match.test(msg)) return copy;
  }
  return DEFAULT_COPY;
}
