# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Offensive Line is a fantasy football league website built with React. It features weekly newsletters, league standings, survivor pools, leaderboards, and hot dog tracker functionality. The site uses Firebase for authentication and data storage, Sleeper and ESPN APIs for fantasy football data, and is deployed to Firebase Hosting.

## Quick Start for New Sessions

Before starting any work, read these files in order:

- aigen/pair_programming.md - Our workflow process for iterative development
- aigen/technical_considerations.md - Lessons learned and implementation decisions

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (opens on localhost:3000)
pnpm start

# Run all tests
pnpm test

# Run only newsletter utility tests
pnpm test-utils-newsletter

# Lint, type-check, and verify formatting (all run in CI — must pass before committing)
pnpm lint
pnpm typecheck
pnpm format:check

# Enable per-section performance timing in dev server (sections >200ms emit console.warn)
REACT_APP_NEWSLETTER_PERF=1 pnpm start
```

## Deployment

The site is deployed to Firebase Hosting. Firebase rewrites all routes to `/index.html` for client-side routing.

## Architecture Overview

### Core Application Structure

- `AuthContext.tsx`: Firebase Google authentication and user profiles
- `ThemeContext.tsx`: Light/dark theme switching (persisted to localStorage)
- All routes defined in [App.jsx](src/App.jsx) using `react-router-dom`, protected with `<ProtectedRoute>`
- Most routes include a `:leagueId` parameter; pages are in `/src/pages/`
- Uses `@tanstack/react-query` for server state, React Context for auth/theme

### Data Sources & APIs

**Firebase:**

- Configuration in [firebase.js](src/firebase.js)
- Firestore used for: user profiles, survivor pool picks, hot dog tracking, ESPN proxy URL
- Google Auth for authentication

**Multi-Platform Fantasy API:**

All compute functions import from [src/utils/api/FantasyAPI.ts](src/utils/api/FantasyAPI.ts), which routes to the correct platform based on league ID prefix. Do **not** import directly from `SleeperAPI.ts` or `ESPNAdapter.ts` in compute utilities.

- Sleeper league IDs: plain numeric string (e.g., `123456`)
- ESPN league IDs: prefixed with `espn_` (e.g., `espn_123456`)

**Sleeper API:**

- [src/utils/api/SleeperAPI.ts](src/utils/api/SleeperAPI.ts) — raw fetchers with in-flight deduplication
- Player data cached in [sleeper_players.json](src/utils/api/sleeper_players.json)
- Functions: `getLeague`, `getRosters`, `getMatchups`, `getTransactions`, `getPlayoffBracket`

**ESPN API:**

- [src/utils/api/ESPNApi.ts](src/utils/api/ESPNApi.ts) — raw ESPN API fetchers with in-flight deduplication
- [src/utils/api/ESPNAdapter.ts](src/utils/api/ESPNAdapter.ts) — translates ESPN responses to Sleeper-compatible types so all compute utilities work unchanged
- [src/utils/espnCredentials.ts](src/utils/espnCredentials.ts) — localStorage management for `espn_s2` / `SWID` cookies
- [src/pages/EspnLogin.tsx](src/pages/EspnLogin.tsx) — multi-step league entry flow (public or private with cookie auth)
- [proxy-service/api/espn.js](proxy-service/api/espn.js) — server-side Vercel proxy that sets Cookie headers for private league requests (browsers can't set Cookie directly)
- Type definitions in [src/types/espnTypes.ts](src/types/espnTypes.ts)
- Player photo/headshot helpers in [src/utils/playerUtils.ts](src/utils/playerUtils.ts) (`getPlayerPhoto` handles ESPN CDN vs Sleeper fallback)
- **Limitations**: transactions and player projections are not available via the ESPN public API

**Private ESPN League Auth Flow:**

```
User enters espn_s2 + SWID → saved to localStorage
→ ESPNApi fetches proxy URL from Firestore (config/discord.webhookServiceUrl)
→ POST to proxy-service with { url, espn_s2, swid }
→ Proxy adds Cookie header → ESPN Private API
```

**Discord Integration:**

- Serverless proxy in `/discord-webhook-service`, deployed to Vercel
- Used via [src/utils/api/discord.js](src/utils/api/discord.js)

### Newsletter System

- Located in `/src/newsletters/` organized by year (2023, 2024, 2025)
- Each newsletter is a folder with a main component + JSON data files
- Each newsletter exports `newsDate` and `articles` array (or default object with `newsDate`, `articles`, optional `meta`)
- Articles are React components rendered in masonry layout via [Newsletter.jsx](src/pages/Newsletter.jsx)
- Newsletter components imported in [Home.jsx](src/pages/Home.jsx) for navigation
- Data JSON files generated from the separate `ff-data-analytics` R repository (`main.R` for regular season, `end_of_season_recap.R` for recap)
- Styled components in [src/components/newsletters/](src/components/newsletters/): `newsStyles.jsx`, `chartStyles.jsx`, `tableStyles.jsx`
- See [src/newsletters/README.md](src/newsletters/README.md) for the full creation guide

### Newsletter Compute Utilities

All utilities live in [src/utils/newsletter/](src/utils/newsletter/) with signature `(leagueId: string, week: number) → Promise<T>`. Orchestrated in parallel by `useNewsletterData` in [src/hooks/useNewsletterData.ts](src/hooks/useNewsletterData.ts).

| Utility                   | Output Type           | Primary UI Consumer                                     |
| ------------------------- | --------------------- | ------------------------------------------------------- |
| `computeWeeklyAwards`     | `WeeklyAward[]`       | AwardsGridV2                                            |
| `computeLeaderboard`      | `LeaderboardData[]`   | LeaderboardTable                                        |
| `computeStarters`         | `StartersData[]`      | StartersTable                                           |
| `computeEfficiency`       | `EfficiencyData[]`    | EfficiencyChart                                         |
| `computeBestBall`         | `BestBallData[]`      | BestBallTable                                           |
| `computeMedian`           | `MedianData[]`        | MedianTable                                             |
| `computePowerRankings`    | `PowerRankingsData[]` | PowerRankingsTable                                      |
| `computePlayoffStandings` | `PlayoffTableData[]`  | PlayoffStandingsTable                                   |
| `computeSchedule`         | `ScheduleData`        | ScheduleMatrix                                          |
| `computeMatchupData`      | `MatchupData[]`       | StackedHistogram, WeeklyScoringChart, WeeklyMarginTable |

Multi-week utilities fetch all weeks 1–N in a single `Promise.all`. The in-flight cache in both `SleeperAPI.ts` and `ESPNApi.ts` ensures concurrent identical requests share one HTTP request.

Tests live in [src/utils/newsletter/\_\_tests\_\_/](src/utils/newsletter/__tests__/) and fixtures in [src/utils/newsletter/testFixtures/](src/utils/newsletter/testFixtures/) (outside `__tests__` so Jest doesn't treat them as test suites).

See [docs/newsletter-data-flow.md](docs/newsletter-data-flow.md) for a full architecture diagram.

### Theming & Styling

- Uses `styled-components` throughout; theme accessed via `useTheme()` hook
- Color system defined in [ColorConstants.ts](src/components/constants/ColorConstants.ts)
- Background: `#ECECDF` (Alabaster) light / data viz gradient: `#FF3366` → `#20A4F4`
- See [STYLE.md](STYLE.md) for full palette and guidelines

## Common Tasks

### Adding a New Page

1. Create component in `/src/pages/`
2. Add route in [App.jsx](src/App.jsx) within `<ProtectedRoute>` (or outside for public pages)
3. Add navigation link in [NavBar.tsx](src/components/NavBar.tsx) if needed

### Working with Firestore

- Import `db` from [firebase.js](src/firebase.js)
- Use Firestore v9 modular API: `collection`, `doc`, `getDoc`, `setDoc`, `updateDoc`, `query`, etc.
- See [src/utils/survivorUtils.ts](src/utils/survivorUtils.ts) for examples

## File Naming Conventions

- Components: PascalCase (`NavBar.tsx`, `LeagueOverview.tsx`)
- Utilities: camelCase (`survivorUtils.ts`, `leaderboardUtils.js`)
- JSON data: camelCase (`leaderboard.json`, `matchupData.json`)

## TypeScript

New files should use `.tsx` for components, `.ts` for utilities. Type definitions in `/src/types/`. Many older components still use `.jsx`.

## Special Notes

- Snowfall effect displays in December and January (see [App.jsx:58-74](src/App.jsx#L58-L74))
- The `/news` route loads an external iframe (legacy)
- Discord webhook service is a separate deployable in `/discord-webhook-service`
