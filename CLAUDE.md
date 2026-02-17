# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Offensive Line is a fantasy football league website built with React. It features weekly newsletters, league standings, survivor pools, leaderboards, and hot dog tracker functionality. The site uses Firebase for authentication and data storage, Sleeper API for fantasy football data, and is deployed to Firebase Hosting.

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

# Run tests
pnpm test
```

## Deployment

The site is deployed to Firebase Hosting:

- Firebase rewrites all routes to `/index.html` for client-side routing

## Architecture Overview

### Core Application Structure

**Authentication & Context:**

- `AuthContext.tsx`: Manages Firebase Google authentication and user profiles
- `ThemeContext.tsx`: Manages light/dark theme switching (persisted to localStorage)
- Authentication is required for all routes except `/login` and `/sleeper-login`

**Routing:**

- All routes defined in [App.jsx](src/App.jsx) using `react-router-dom`
- Routes are protected with `<ProtectedRoute>` wrapper component
- Most routes include a `:leagueId` parameter to support multiple fantasy leagues
- Pages are in `/src/pages`, with subfolders for complex features (e.g., `hotDogTracker`)

**State Management:**

- Uses `@tanstack/react-query` for server state (caching, fetching)
- React Context for auth and theme
- Local component state for UI concerns

### Data Sources & APIs

**Firebase:**

- Configuration in [firebase.js](src/firebase.js)
- Firestore used for: user profiles, survivor pool picks, hot dog tracking data
- Google Auth for authentication

**Sleeper API:**

- Wrapper utilities in [src/utils/api/SleeperAPI.ts](src/utils/api/SleeperAPI.ts)
- Player data cached in [sleeper_players.json](src/utils/api/sleeper_players.json)
- Fetches league data, rosters, matchups, transactions

**Discord Integration:**

- Separate serverless service in `/discord-webhook-service`
- Deployed to Vercel as an API proxy for Discord webhooks
- Used via [src/utils/api/discord.js](src/utils/api/discord.js)

### Newsletter System

Newsletters are the primary content of the site. They are React components with a specific structure:

**Organization:**

- Located in `/src/newsletters/` organized by year (2023, 2024, 2025) and special folders (WalterPicks)
- Each newsletter is a folder containing the main component file and JSON data files
- See [src/newsletters/README.md](src/newsletters/README.md) for comprehensive creation guide

**Newsletter Structure:**

- Each newsletter exports `newsDate` and `articles` array (or default object with meta)
- Articles are React components rendered in masonry layout via [Newsletter.jsx](src/pages/Newsletter.jsx)
- Data files: `awardsTable.json`, `leaderboard.json`, `starters.json`, `matchupData.json`, etc.
- Newsletter components imported in [Home.jsx](src/pages/Home.jsx) for navigation

**Newsletter Data Generation:**

- Data JSON files are generated from separate `ff-data-analytics` R repository
- Regular season: `main.R` script
- Season recap: `end_of_season_recap.R` script

**Newsletter Components:**

- Styled components in [src/components/newsletters/](src/components/newsletters/)
  - `newsStyles.jsx`: Layout components (ArticleHeader, LeagueQuote, etc.)
  - `chartStyles.jsx`: Chart components (EfficiencyChart, MatchupPlot, etc.)
  - `tableStyles.jsx`: Table components (LeaderboardTable, AwardsGridV2, etc.)

### Theming & Styling

**Color System:**

- Defined in [ColorConstants.ts](src/components/constants/ColorConstants.ts)
- Supports light/dark themes with newspaper aesthetic
- Background: `#ECECDF` (Alabaster) in light mode
- Data visualization uses gradient between `#FF3366` (Folly) and `#20A4F4` (Celestial Blue)
- Position-specific colors for player visualizations
- See [STYLE.md](STYLE.md) for full color palette and guidelines

**Styling Approach:**

- Uses `styled-components` throughout
- Global styles in [App.jsx](src/App.jsx) via `GlobalStyle`
- Theme accessed via `useTheme()` hook
- MUI components used for some UI elements (NavBar, etc.)

### Key Features

**Survivor Pool:**

- Weekly NFL picks competition
- User picks stored in Firestore at `/survivorPicks/{userId}/weeks/{week}`
- Components in [src/components/survivor/](src/components/survivor/)
- Utilities in [src/utils/survivorUtils.ts](src/utils/survivorUtils.ts)
- Hooks: `useSurvivorData.ts` for fetching/managing picks

**Hot Dog Tracker:**

- Tracks league punishment (hot dog consumption)
- Data stored in [src/data/hotDogs.json](src/data/hotDogs.json) and Firestore
- Page at [src/pages/hotDogTracker/HotDogTracker.tsx](src/pages/hotDogTracker/HotDogTracker.tsx)

**Leaderboards:**

- Various scoring leaderboards
- Utilities in [src/utils/leaderboardUtils.js](src/utils/leaderboardUtils.js)
- Components in [src/components/leaderboard/](src/components/leaderboard/)

**League Pages:**

- League overview, recent activity, weekly recaps, rosters, history
- Located in `/src/pages/League*.tsx`
- Fetch data from Sleeper API using react-query hooks

## Common Tasks

### Adding a New Newsletter

1. Create folder in `/src/newsletters/[YEAR]/[Newsletter Name]/`
2. Create main component file `[Newsletter Name].jsx`
3. Add required JSON data files from `ff-data-analytics` repo
4. Export `newsDate` and `articles` array (or default object with `newsDate`, `articles`, optional `meta`)
5. Update [Home.jsx](src/pages/Home.jsx) `newsletterContent` object with the newsletter path including year folder

See [newsletters/README.md](src/newsletters/README.md) for detailed instructions.

### Adding a New Page

1. Create component in `/src/pages/`
2. Add route in [App.jsx](src/App.jsx) within `<ProtectedRoute>` wrapper (or outside for public pages)
3. Add navigation link in [NavBar.tsx](src/components/NavBar.tsx) if needed

### Working with Firestore

- Import `db` from [firebase.js](src/firebase.js)
- Use Firestore v9 modular API: `collection`, `doc`, `getDoc`, `setDoc`, `updateDoc`, `query`, etc.
- See [src/utils/survivorUtils.ts](src/utils/survivorUtils.ts) for examples

### Working with Sleeper API

- Use functions from [SleeperAPI.ts](src/utils/api/SleeperAPI.ts)
- Common functions: `getLeague`, `getRosters`, `getMatchups`, `getTransactions`, `getPlayoffBracket`
- Player data available in `sleeper_players.json` (large file)

## File Naming Conventions

- Components: PascalCase (e.g., `NavBar.tsx`, `LeagueOverview.tsx`)
- Utilities: camelCase (e.g., `survivorUtils.ts`, `leaderboardUtils.js`)
- Styled components: camelCase or PascalCase depending on usage
- JSON data: camelCase (e.g., `leaderboard.json`, `matchupData.json`)

## TypeScript Migration

The codebase is partially migrated to TypeScript:

- New files should use `.tsx` for components, `.ts` for utilities
- Type definitions in `/src/types/` (`sleeperTypes.ts`, `survivorTypes.ts`)
- Many older components still use `.jsx`

## Special Notes

- Snowfall effect displays in December and January (see [App.jsx:58-74](src/App.jsx#L58-L74))
- League IDs are hardcoded in various places - multi-league support is partial
- The `/news` route currently loads an external iframe (legacy)
- Discord webhook service is a separate deployable in `/discord-webhook-service`
