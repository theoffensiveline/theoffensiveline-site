# Story 2.2: Starters/Matchup Plot Data

**Status**: ✅ Completed

**Phase**: 2 - Core Data Transformations

## Description

Create a utility to transform Sleeper matchup data into the format needed for MatchupPlot components, showing individual player performances grouped by team and matchup.

## Dependencies

- ✅ Story 1.1: Newsletter type definitions
- ✅ Story 1.2: Sleeper API types

## Files to Create/Modify

- [ ] `src/utils/newsletter/computeStarters.ts` (NEW)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE - add matchup plots)

## Acceptance Criteria

- [ ] `computeStarters` function created and exported
- [ ] Function signature: `computeStarters(leagueId: string, week: number): Promise<StartersData[]>`
- [ ] Fetches matchup data for the specified week
- [ ] Fetches roster data for team nicknames (`roster.metadata.team_name`)
- [ ] Fetches user data for display names
- [ ] Transforms data to include: team_name, matchup_id, entries array
- [ ] Each entry includes: full_name, nickname (from roster.metadata.player_map), position, points
- [ ] Players sorted by points descending within each team
- [ ] Integrates with `sleeper_players.json` for player names
- [ ] Integrates with roster metadata for custom player nicknames set by managers
- [ ] Returns array matching `StartersData[]` type
- [ ] LeagueWeeklyRecap displays matchup plots using `MatchupPlot` component

## Implementation Notes

### Data Structure

```typescript
interface StartersData {
  team_name: string;
  matchup_id: number;
  entries: {
    full_name: string;
    nickname?: string; // Optional - can skip for Sleeper newsletters
    position: string;
    points: number;
  }[];
}
```

### Algorithm

1. Fetch matchup, roster, and user data
2. Load player data from `sleeper_players.json`
3. For each matchup:
   - Get both teams in the matchup (same matchup_id)
   - For each team:
     - Get starter player IDs
     - Map to player names and positions
     - Get points from matchup data
     - Sort by points descending
4. Return array of all teams

### Player Name and Nickname Lookup

```typescript
import { sleeperPlayers } from "../playerUtils";

const playerName = sleeperPlayers[playerId]?.full_name || playerId;
const position = sleeperPlayers[playerId]?.position || "FLEX";

// Get custom nickname from roster metadata (set by manager in Sleeper)
const nickname = roster.metadata?.player_map?.[playerId] || undefined;
```

**Note**: Player nicknames are **custom names set by team managers** in the Sleeper app and stored in `roster.metadata.player_map[playerId]`. This is different from the Breaking Bad themed nicknames in the main league which are hardcoded.

## Human Testing Steps

1. **Start dev server**:

   ```bash
   yarn start
   ```

2. **Navigate to weekly recap**:

   ```
   http://localhost:3000/league/1253779168802377728/weekly-recap/8
   ```

3. **Verify matchup plots appear**:
   - Should see matchup plot charts for each game
   - Each chart shows two teams side-by-side
   - Players listed from highest to lowest points
   - Player names, positions, and point totals visible

4. **Check data accuracy**:
   - Compare to Sleeper app matchup details
   - Verify player names are correct
   - Verify points match Sleeper
   - Verify positions are correct

5. **Check visual appearance**:
   - Charts should be readable
   - Colors should distinguish between teams
   - Responsive on mobile

## Expected Results

**Visual Changes**:

- Matchup plot charts appear for each matchup
- Player performances displayed as horizontal bars
- Team names shown
- Points visible for each player

**Functional Changes**:

- Matchup data fetched and transformed
- Player names resolved from sleeper_players.json
- Data sorted by points

## Testing Performed by Claude

- [ ] Create `computeStarters.ts` utility
- [ ] Implement player lookup logic
- [ ] Update `LeagueWeeklyRecap.tsx` to display matchup plots
- [ ] Import `MatchupPlot` component
- [ ] Test with week 8 data
- [ ] Verify no TypeScript errors

## Related Stories

- **Previous**: Story 2.1 - Leaderboard
- **Next**: Story 2.3 - Efficiency Chart
- **Related**: Story 6.3 - Matchup UI

## Notes

- Player nicknames come from `roster.metadata.player_map[playerId]` - custom names set by managers in Sleeper
- Nickname field is optional - will be undefined if manager hasn't set a custom nickname for that player
- Team nicknames come from `roster.metadata.team_name` (different from player nicknames)
- MatchupPlot component already exists and handles the visualization
- Focus on accurate data transformation
