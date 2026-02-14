# Story 5.2: Weekly Scoring Distribution & Margin of Victory

**Status**: ⏳ Pending

**Phase**: 5 - Matchup & Playoff Analytics

## Description

Create weekly scoring distribution visualizations and margin of victory tracking to match the main league newsletter's "Scoring Distributions" section. This includes three components: a stacked histogram showing distribution of scoring, a weekly scoring chart tracking statistics over time, and a weekly margin table showing how close each matchup was. These visualizations help identify scoring trends, close matchups, and overall league competitiveness.

## Dependencies

- ✅ Story 2.1: Leaderboard data (for W/L records in margin table)
- ✅ Story 2.2: Matchup data (for understanding matchup structure)
- ✅ Sleeper API for fetching historical matchup data

## Files to Create/Modify

- [ ] `src/utils/newsletter/computeMatchupData.ts` (NEW)
- [ ] `src/types/newsletterTypes.ts` (UPDATE - add MatchupData type)
- [ ] `src/hooks/useNewsletterData.ts` (UPDATE - integrate matchup data)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE - add scoring distribution section)

## Acceptance Criteria

- [ ] Function signature: `computeMatchupData(leagueId: string, currentWeek: number): Promise<MatchupData[]>`
- [ ] Fetches all matchup data from week 1 through currentWeek
- [ ] Calculates for each team per week:
  - [ ] `week` - Week number
  - [ ] `team_name` - Team name from roster metadata
  - [ ] `image_or_text` - Team avatar URL from Sleeper
  - [ ] `matchup_id` - Matchup identifier (1-6 for 12-team league)
  - [ ] `team_points` - Points scored by team that week
  - [ ] `margin_of_victory` - Difference in points (positive if won, negative if lost)
  - [ ] `Average` - League average points for that week
  - [ ] `Median` - League median points for that week
  - [ ] `Maximum` - Highest score in league that week
  - [ ] `Minimum` - Lowest score in league that week
  - [ ] `mov_color` - Color coding for margin of victory (green for close wins within 10 points, red for close losses within 10 points, default otherwise)
- [ ] Returns array of MatchupData objects (one per team per week)
- [ ] **StackedHistogram**: Uses existing component, displays team_points distribution
- [ ] **WeeklyScoringChart**: Uses existing component, displays weekly stats (Average, Median, Max, Min)
- [ ] **WeeklyMarginTable**: Uses existing component, displays W-L records and weekly margins with color coding

## Data Requirements

**From Sleeper API:**

- `getLeague(leagueId)` - League settings and roster count
- `getRosters(leagueId)` - Team metadata (names, avatars)
- `getUsers(leagueId)` - User information
- `getMatchups(leagueId, week)` - Matchup data for weeks 1 through currentWeek
  - Used for: team_points, opponent matching, margin calculation

**Calculated Data:**

- Weekly league statistics (Average, Median, Maximum, Minimum)
- Margin of victory (absolute difference between team score and opponent score)
- Color coding based on margin closeness

## Implementation Notes

### 1. Matchup Data Structure

The `MatchupData` type should match the format used by existing newsletter components:

```typescript
interface MatchupData {
  week: number;
  team_name: string;
  image_or_text: string;
  matchup_id: number;
  team_points: number;
  margin_of_victory: number;
  Average: number;
  Median: number;
  Maximum: number;
  Minimum: number;
  mov_color: string;
}
```

### 2. Margin of Victory Calculation

For each matchup:

```typescript
// Find opponent in same matchup_id
const opponent = matchups.find(
  (m) => m.matchup_id === team.matchup_id && m.roster_id !== team.roster_id,
);

const margin_of_victory = team.points - (opponent?.points || 0);
```

### 3. Weekly Statistics Calculation

For each week, calculate league-wide statistics:

```typescript
const weekPoints = matchups.map((m) => m.points);

const weekStats = {
  Average: weekPoints.reduce((a, b) => a + b, 0) / weekPoints.length,
  Median: calculateMedian(weekPoints),
  Maximum: Math.max(...weekPoints),
  Minimum: Math.min(...weekPoints),
};
```

### 4. Margin of Victory Color Coding

Color code based on closeness of matchup:

```typescript
const mov_color =
  Math.abs(margin_of_victory) <= 5.0
    ? "#90EE90" // Light green for close games (within 5 points)
    : "#ECECDF"; // Default Alabaster for decisive wins/losses
```

### 5. Multi-Week Data Fetching

Fetch all weeks in parallel for performance:

```typescript
const allWeeksData = await Promise.all(
  Array.from({ length: currentWeek }, (_, i) => getMatchups(leagueId, i + 1)),
);

// Flatten and process all weeks
const matchupData: MatchupData[] = [];
for (let week = 1; week <= currentWeek; week++) {
  const weekMatchups = allWeeksData[week - 1];
  // Process each team's matchup for this week
  // Calculate margins, stats, etc.
}
```

### 6. Integration with Existing Components

The three visualization components already exist and expect this data format:

- **StackedHistogram**: `<StackedHistogram chartData={matchupData} />`
  - Groups by week, displays distribution of team_points
  - Shows historical scoring patterns

- **WeeklyScoringChart**: `<WeeklyScoringChart chartData={matchupData} />`
  - Line chart showing Average, Median, Maximum, Minimum over time
  - Each week is a point on the chart

- **WeeklyMarginTable**: `<WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />`
  - Table showing W-L records and weekly margins
  - Color codes close matchups
  - Requires both matchupData and leaderboardData props

## Human Testing Steps

1. Start dev server: `yarn start`
2. Navigate to a Sleeper league weekly recap (mid-season week, e.g., week 8):
   - URL: `/league/1253779168802377728/weekly-recap/8`
3. Scroll to "Scoring Distributions" section (should appear after matchup spotlights)
4. Verify **Distribution of Scoring** (StackedHistogram):
   - Histogram shows weekly scoring distribution for each week
   - Weeks are grouped/colored appropriately
   - Current week's distribution is visible
5. Verify **Weekly Scoring Chart** (WeeklyScoringChart):
   - Line chart displays Average, Median, Maximum, Minimum over weeks 1-8
   - Lines are clearly labeled and colored
   - Trends are visible (e.g., increasing averages, variance)
6. Verify **Weekly Margin of Victory Table** (WeeklyMarginTable):
   - Table shows all teams with W-L records
   - Each week column shows margin of victory for that team
   - Close matchups (within 5 points) are highlighted in green
   - Positive margins for wins, negative for losses
7. Test edge cases:
   - Week 1: Only shows week 1 data (no historical trends yet)
   - Early season: Charts show limited data points
   - Late season: Full season of data visible
8. Verify data accuracy by manually checking a few margins:
   - Pick a matchup from a specific week
   - Verify the margin matches the score difference
   - Verify color coding is correct for close games

## Expected Results

- Scoring distribution histogram clearly shows weekly scoring patterns
- Weekly scoring chart displays league-wide statistics over time
- Margin table makes it easy to identify close/blowout weeks
- Color coding highlights exciting close matchups
- All three visualizations update correctly as currentWeek changes
- Data matches main league newsletter format and calculation logic

## Related Stories

- **Previous**: Story 5.1 (playoff standings)
- **Depends on**: Story 2.1 (leaderboard), Story 2.2 (matchup structure)
- **Next**: Story 6.1 (newsletter data hook integration)

## Notes

- This feature was missing from the original project plan but is present in all main league newsletters
- The three components (StackedHistogram, WeeklyScoringChart, WeeklyMarginTable) already exist and are well-tested
- Main challenge is transforming Sleeper API data into the expected format
- Reuse multi-week fetching patterns from Power Rankings (Story 4.1)
- Color coding threshold (5 points for "close") should match main league logic
