/**
 * Centralized error logging for the Sleeper Newsletter.
 *
 * Emits structured payloads to the console (and optionally Sentry) so engineers
 * have actionable telemetry without a dedicated logging service.
 *
 * Shape is Sentry-compatible: swap `logNewsletterError` for
 * `Sentry.captureException(error, { extra: context })` when Sentry is wired up.
 */

export interface NewsletterErrorContext {
  leagueId?: string;
  week?: number;
  sectionKey: string;
  /** Optional timestamp of the last successful data fetch */
  lastUpdated?: Date;
  /** Raw error message if available outside the Error object */
  detail?: string;
}

export interface NewsletterErrorPayload {
  timestamp: string;
  sectionKey: string;
  leagueId: string;
  week: number | null;
  message: string;
  lastUpdated: string | null;
  detail?: string;
  stack?: string;
}

/**
 * Log a newsletter section error with structured metadata.
 *
 * @param error - The caught Error (or unknown thrown value)
 * @param context - Metadata about which section/league/week failed
 */
export function logNewsletterError(error: unknown, context: NewsletterErrorContext): void {
  const err = error instanceof Error ? error : new Error(String(error));

  const payload: NewsletterErrorPayload = {
    timestamp: new Date().toISOString(),
    sectionKey: context.sectionKey,
    leagueId: context.leagueId ?? "(unknown)",
    week: context.week ?? null,
    message: err.message,
    lastUpdated: context.lastUpdated?.toISOString() ?? null,
    detail: context.detail,
    stack: err.stack,
  };

  // Console output structured as a group for easy collapse in DevTools
  console.group(`[Newsletter Error] ${context.sectionKey}`);
  console.error("Error:", err);
  console.info("Context:", payload);
  console.groupEnd();

  // TODO: replace with Sentry.captureException(err, { extra: payload }) when available
}
