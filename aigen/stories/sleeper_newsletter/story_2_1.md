# Story 2.1: Leaderboard Data Transformation

**Status**: ⏳ Pending

**Phase**: 2 - Core Data Transformations

## Description

Create a utility function to transform Sleeper API matchup data into leaderboard format showing team standings with wins, losses, points for, points against, and color-coded gradients.

## Dependencies

- ✅ Story 1.1: Newsletter type definitions must exist
- ✅ Story 1.2: Sleeper API types should be updated

## Files to Create/Modify

- [ ] `src/utils/newsletter/computeLeaderboard.ts` (NEW)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE - add leaderboard display)

## Acceptance Criteria

- [ ] `computeLeaderboard` function created and exported
- [ ] Function signature: `computeLeaderboard(leagueId: string, throughWeek: number): Promise<LeaderboardData[]>`
- [ ] Fetches matchup data for weeks 1 through `throughWeek` from Sleeper API
- [ ] Fetches roster data to get team info and nicknames (`roster.metadata.team_name`)
- [ ] Fetches user data to get display names and avatars
- [ ] Calculates cumulative W/L records for each team
- [ ] Calculates total PF and PA through the specified week
- [ ] Sorts teams by wins (descending), then by PF (descending)
- [ ] Assigns rank (1-indexed) based on sorted order
- [ ] Generates color gradient from red (#bc293d) to green (#227740) for PF/PA
  - Worst PF/PA = red
  - Best PF/PA = green
  - Middle teams = interpolated colors
- [ ] Returns array matching `LeaderboardData[]` type
- [ ] Handles errors gracefully (network failures, missing data)
- [ ] LeagueWeeklyRecap displays leaderboard using `LeaderboardTable` component

## Implementation Notes

### Algorithm Steps

1. **Fetch required data in parallel**:
   ```typescript
   const [users, rosters, ...weeklyMatchups] = await Promise.all([
     getUsers(leagueId),
     getRosters(leagueId),
     ...Array.from({ length: throughWeek }, (_, i) =>
       getMatchups(leagueId, i + 1)
     )
   ]);
   ```

2. **Build team lookup maps**:
   - Map roster_id → user info (display name, avatar)
   - Map roster_id → team nickname from `roster.metadata.team_name` (NOT Breaking Bad themed nicknames - those are main league specific)

3. **Calculate standings**:
   - For each roster, iterate through all weeks
   - Count wins and losses
   - Sum total points for and against

4. **Sort and rank**:
   - Sort by wins descending, then PF descending
   - Assign ranks 1, 2, 3, ...

5. **Generate colors**:
   - Find min and max PF across all teams
   - Interpolate color from red to green based on position in range
   - Same for PA
   - Use helper function for color interpolation:
   ```typescript
   const interpolateColor = (value: number, min: number, max: number) => {
     const ratio = (value - min) / (max - min);
     // Interpolate between red (#bc293d) and green (#227740)
   }
   ```

### Color Gradient Reference

**Use the same color scheme as main league** (not configurable per league):
- Best (green): `#227740`
- Worst (red): `#bc293d`
- Use linear interpolation for values in between

### Matchup Pairing Logic

Matchups have a `matchup_id` field. Two rosters with the same `matchup_id` are matched against each other. The winner is the one with more points.

### Edge Cases

- Handle ties (same points) - both teams get a tie (not W or L)
- Handle bye weeks (no matchup) - skip that week
- Handle missing data - return empty array or throw clear error
- Handle week 0 or negative weeks - validate input

## Human Testing Steps

1. **Start dev server**:
   ```bash
   yarn start
   ```

2. **Navigate to weekly recap page**:
   ```
   http://localhost:3000/league/1253779168802377728/weekly-recap/8
   ```

3. **Verify leaderboard appears**:
   - Should see a new "Standings" section below the awards
   - Should display a table with columns: Rank, Team, W, L, PF, PA
   - Should show ~12 teams (depending on league size)

4. **Check data accuracy**:
   - Compare W/L records to Sleeper app standings
   - Verify PF and PA totals make sense
   - Verify teams are sorted by wins first, then PF

5. **Check color gradient**:
   - Team with highest PF should have greenish background/text
   - Team with lowest PF should have reddish background/text
   - Teams in middle should have intermediate colors
   - Same for PA column

6. **Check for errors**:
   - Open browser console (F12)
   - Should be no errors or warnings
   - Loading spinner should appear briefly, then leaderboard

7. **Test with different weeks**:
   - Try `/weekly-recap/1` (only week 1 data)
   - Try `/weekly-recap/17` (full season)
   - Data should update correctly

## Expected Results

**Visual Changes**:
- New "Standings" section appears on the weekly recap page
- Leaderboard table displays team standings
- Color gradient visible on PF/PA columns (green = good, red = bad)
- Team avatars display in table
- Responsive design (works on mobile)

**Functional Changes**:
- Leaderboard data fetched from Sleeper API
- Data aggregated across multiple weeks
- W/L/PF/PA calculated correctly
- Teams ranked properly

**No Console Errors**:
- No TypeScript errors
- No runtime errors
- No API errors (unless Sleeper is down)

## Testing Performed by Claude

Before requesting human verification, Claude will:

- [x] Create `computeLeaderboard.ts` utility
- [x] Implement W/L/PF/PA calculation logic
- [x] Implement color interpolation
- [x] Update `LeagueWeeklyRecap.tsx` to fetch and display leaderboard
- [x] Import and use `LeaderboardTable` component
- [x] Test with main league data (1253779168802377728)
- [x] Verify no TypeScript errors
- [x] Verify no runtime errors in console
- [x] Test data accuracy against known week 8 standings

## Related Stories

- **Previous**: Story 1.1, 1.2 (type definitions)
- **Next**: Story 2.2 - Starters/Matchup Plot Data
- **Related**: Story 6.2 - Leaderboard UI (this story includes basic UI)

## Notes

- This story includes both the utility AND the UI integration for leaderboards
- Leaderboard is one of the most visible features, so accuracy is critical
- Color gradient calculation should match the main league newsletter style
- This is the first story that actually modifies the visible UI!
