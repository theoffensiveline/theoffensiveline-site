# Story 7.3: Error Handling & Boundaries

**Status**: ✅ Completed

**Phase**: 7 - Performance & Polish

## Description

Harden the newsletter experience so that a failure in one data source never takes down the entire page. Provide thoughtful error copy, retry controls, and instrumentation hooks for debugging.

## Files to Create/Modify

- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE – wire boundaries + messaging)
- [ ] `src/components/newsletter/SectionShell.tsx` (UPDATE – render error slot)
- [ ] `src/utils/logger/newsletterError.ts` (NEW – centralized logging helper)

## Acceptance Criteria

- [ ] Wrap each section in an error boundary (React 18 `ErrorBoundary` or custom) that renders fallback UI without unmounting siblings.
- [ ] Standardize error UI: icon, title, short message, `Retry` button calling section `refetch`.
- [ ] Provide actionable copy (e.g., "Sleeper API timeout" vs generic "Something went wrong").
- [ ] Capture errors with logger (Sentry-compatible hook) including leagueId/week/section metadata.
- [ ] Show global toast when ≥2 sections error simultaneously.
- [ ] Add affordance for manual data reload ("Refresh all sections" button).
- [ ] Automated tests simulate thrown errors to verify boundaries.

## Implementation Notes

1. Extend hook responses with `lastUpdated` to mention when data was last fetched despite error.
2. Build `NewsletterErrorBoundary` component with `resetKeys={[leagueId, week, sectionKey]}` so navigations auto-reset state.
3. Ensure keyboard focus moves to error panel when it appears for accessibility.
4. Provide fallback copy suggestions (Friendly > Technical) in constants file for consistency.

## Human Testing Steps

1. Force network error via devtools while loading – confirm specific section shows fallback with retry.
2. Retry succeeds without full page reload.
3. Pass invalid league ID query param – verify user-facing copy explains next steps.
4. Check console/log service for structured error payload.

## Expected Results

- Partial failures no longer blank entire recap page.
- Users understand which section failed and how to fix it.
- Engineers get actionable telemetry for debugging.
