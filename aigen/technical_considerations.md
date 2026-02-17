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

## Newsletter Stack Architecture

### Data Flow

```
Sleeper REST API
  └─ SleeperAPI.ts  (in-flight Map de-duplication per URL)
       └─ compute* utilities  (src/utils/newsletter/)
            └─ useNewsletterData.ts  (React Query useQueries — all sections parallel)
                 └─ LeagueWeeklyRecap  (SectionShell per section, React.memo)
                      └─ UI components  (lazy-loaded chart chunks via React.lazy)
```

### Caching Strategy

| Week type | staleTime | gcTime | refetchOnMount | refetchOnWindowFocus |
|---|---|---|---|---|
| Completed (week < current NFL week) | 6 hours | 24 hours | false | false |
| Current week | 1 hour | 2 hours | true | true |

League settings (`getLeague`) use a 24-hour stale time — settings almost never change mid-season.
NFL state (`getNflState`) uses a 1-hour stale time to detect week transitions.

Query keys follow `['newsletter', leagueId, week, section]` — caches are isolated per league, week, and section.

### Multi-Week Fetching

`computeLeaderboard`, `computeMatchupData`, `computePowerRankings`, `computePlayoffStandings`, and `computeSchedule` fetch weeks 1–N simultaneously via `Promise.all`. Since multiple sections request the same week, SleeperAPI's in-flight Map collapses duplicate HTTP requests automatically — only one request fires per unique URL per tick.

## Troubleshooting FAQ

**Q: Sections show stale data even after scores finalize.**
A: The current-week cache uses a 1-hour stale time. Either wait for it to expire or call `invalidateNewsletter(queryClient, leagueId, week)` (exported from `useNewsletterData.ts`) to force a refresh.

**Q: Sleeper API returns 429 Too Many Requests.**
A: The in-flight de-duplication in `SleeperAPI.ts` prevents duplicate concurrent requests, but rapid week-switching can still hit rate limits. Add a short delay between programmatic week changes or rely on React Query's built-in caching to serve already-fetched weeks instantly.

**Q: Avatar images are missing or broken.**
A: Sleeper avatar URLs are constructed from the user's `avatar` hash. If the hash is `null` (user never set an avatar), the UI falls back to `undefined` and should render initials or a placeholder. Check `getAvatarUrl` in `src/utils/leagueHistory.ts` for the URL pattern.

**Q: Section timing shows >200ms warnings for leaderboard/schedule.**
A: These utilities fetch N weeks in parallel — as N grows (late season), total time increases. The Sleeper API is the bottleneck. React Query's aggressive caching for completed weeks (6hr stale) mitigates this after the first load.

**Q: Newsletter renders in wrong order (standings before median) for median leagues.**
A: `useNewsletterData` returns `isMedianLeague` derived from `league.settings.league_average_match === 1`. Pass this flag to `LeagueWeeklyRecap` to swap the standings/median section display order. See Story 7.x for implementation details.

**Q: `computeEfficiency` / `computeBestBall` return unexpected values.**
A: Both rely on `calculateOptimalScore` from `computeEfficiency.ts`, which uses `sleeperPlayers` to look up position eligibility. If a player ID is missing from `sleeper_players.json`, their score contribution is omitted. Refresh the JSON from the Sleeper players endpoint if this occurs.

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
