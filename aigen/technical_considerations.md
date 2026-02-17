# Technical Considerations

This document captures lessons learned and important notes for The Offensive Line website development.

## Key Architecture Notes

- **Newsletters:** React components with JSON data from external `ff-data-analytics` R repo
- **Themes:** Light/dark support via ColorConstants - always use theme colors, never hardcode
- **State:** React Query for server state (Sleeper API), Context for auth/theme
- **Newsletter routing:** Must include year folder (e.g., "2025/2025 Week 1")

## What Works Well

- React Query caching for Sleeper API (5-min stale time)
- Firebase v9 modular API for Firestore
- Styled-components pattern for theming
- Newsletter folder organization by year
- **Skeleton Loading States:** Custom skeletons per section with 400ms minimum display time prevents flicker
- **Progressive Rendering:** SectionShell component with skeleton prop allows bespoke loading states
- **Styled-components keyframes:** Shimmer animations using `keyframes` from styled-components (no CSS files needed)
- **Error Boundaries:** `NewsletterErrorBoundary` (class component) catches render-time JS errors independently per section; pass `resetKeys={[leagueId, week, sectionKey]}` so navigation auto-resets state without full page reload
- **Actionable Error Copy:** `errorCopy.ts` maps known error patterns to friendly copy — extend `ERROR_COPY_MAP` to add new cases
- **Centralized Error Logging:** `logNewsletterError` in `src/utils/logger/newsletterError.ts` — swap console output for `Sentry.captureException` when Sentry is added
- **Global Toast:** `LeagueWeeklyRecap` shows a fixed-position toast when ≥2 sections error simultaneously; uses `useState` + `useRef` timer pattern
- **API Request Deduplication:** `SleeperAPI.ts` uses a module-level `_inflight` Map so concurrent calls to `getUsers`/`getRosters`/`getMatchups` with the same URL share one HTTP request. Entry removed on settle. No changes to compute function signatures needed.
- **Perf Logging:** Set `REACT_APP_NEWSLETTER_PERF=1` before `yarn start` to log per-section compute times. Sections >200ms emit `console.warn`. Implemented via `withPerfLogging` wrapper in `useNewsletterData.ts`.
- **React.memo on SectionShell:** Inner component renamed `SectionShellInner`, exported as `React.memo(SectionShellInner)`. Prevents re-renders of already-loaded sections when sibling sections finish loading.
- **Dynamic Imports order:** `React.lazy` const declarations must come AFTER all static `import` statements — ESLint `import/first` rule flags static imports below them as "import in body of module".

## Watch Out For

- `sleeper_players.json` is 17MB - don't import in multiple places
- Test both light and dark themes for all UI changes
- Newsletter must include MotWRules component as last article (id: 30)
- Snowfall effect only shows Dec-Jan (hardcoded month check)
- League IDs partially hardcoded - multi-league support incomplete
- **Transient Props:** Use `$` prefix for styled-components props (e.g., `$columns`) to avoid DOM warnings
- **Conditional Rendering:** Check both `status !== "success"` AND data presence to show sections while loading
- **Bundle Size:** Chart components (Victory.js) are now lazy-loaded via `React.lazy` — chunks load on demand after data arrives. The static imports for tableStyles/newsStyles are kept synchronous since they're small.
- **ErrorBoundary Retry Test Pattern:** When testing retry in an error boundary, update child props via `rerender` BEFORE clicking Retry — otherwise the reset triggers a re-render of the still-throwing child and the boundary immediately re-enters error state
- **No `@testing-library/jest-dom`:** Project has no `setupTests` file — use `.toBeTruthy()` instead of `.toBeInTheDocument()`, and `.toBeNull()` instead of `.not.toBeInTheDocument()`
- **`App.test.js` pre-existing failure:** `react-snowfall` uses ESM which Jest can't parse — this is not our code, pre-existing issue, all 33 real tests pass

## Common Patterns

**Styling:**

```javascript
background: ${({ theme }) => theme.background};
```

**Colors:** Use ColorConstants from [ColorConstants.ts](../src/components/constants/ColorConstants.ts)

- Light bg: `#ECECDF`, Dark bg: `#2E2E2E`
- Data viz: `#FF3366` to `#20A4F4` gradient

**Newsletter Creation:** See [newsletters/README.md](../src/newsletters/README.md)

**Skeleton Loading States:**

```tsx
// Use transient props ($) in styled-components
const TableRow = styled.div<{ $columns: number }>`
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
`;

// Then use it
<TableRow $columns={5}>...</TableRow>

// SectionShell with custom skeleton
<SectionShell
  status={section.status}
  skeleton={<TableSkeleton rows={10} columns={6} />}
>
  {section.render()}
</SectionShell>

// Conditional shouldRender for dynamic sections
shouldRender: status !== "success" || (data?.length ?? 0) > 0
```

---

_Update this doc as we learn more through implementation._
