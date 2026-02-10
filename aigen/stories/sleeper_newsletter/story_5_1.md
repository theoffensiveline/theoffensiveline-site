# Story 5.1: Playoff Standings & Scenarios

**Status**: ✅ Completed

**Phase**: 5 - Matchup & Playoff Analytics

## Description

Calculate playoff standings with magic numbers for clinching/elimination and Monte Carlo-simulated playoff probabilities. Mirrors the main league "Playoff Picture" section by showing current seeding, clinch/elimination status, and playoff odds for each team based on simulated outcomes of remaining games.

## Dependencies

- ✅ Story 2.1: Leaderboard data (wins, PF/PA, tie-break helpers)
- ✅ Story 2.2: Matchup data (for opponent tracking)
- ✅ Story 2.3: Efficiency (for SOS tiebreak fallbacks)
- ✅ Sleeper league settings fetched through existing API layer

## Files to Create/Modify

- [ ] `src/utils/newsletter/computePlayoffStandings.ts` (NEW)
- [ ] `src/types/newsletterTypes.ts` (UPDATE - may need to change "Play-off #" and "Last #" to `number | string`)

## Acceptance Criteria

- [ ] Function signature: `computePlayoffStandings(leagueId: string, currentWeek: number): Promise<PlayoffTableData[]>`
- [ ] Fetches league settings to determine:
  - [ ] Number of playoff teams (`league.settings.playoff_teams`)
  - [ ] Regular season length (`league.settings.playoff_week_start - 1`)
  - [ ] Total number of teams (from rosters)
- [ ] Calculates current standings (W-L records, sorted by wins then PF)
- [ ] Calculates **Play-off #** (magic number for clinching playoff spot):
  - [ ] For teams in playoff spots: `(total_games + 1) - team_wins - losses_of_first_team_out`
  - [ ] For teams outside playoffs: `(total_games + 1) - team_wins - losses_of_last_playoff_team`
  - [ ] Shows "CLINCHED" if ≤ 0, "ELIMINATED" if > 2×(games_remaining) + 1, otherwise the number
- [ ] Calculates **Last #** (magic number for avoiding last place):
  - [ ] General formula: `games_remaining - (last_place_losses - team_losses - 1)`
  - [ ] For last place team: add gap to second-to-last place
  - [ ] Shows "SAFE" if ≤ 0, otherwise the number
- [ ] Runs **Monte Carlo simulation** for playoff probabilities:
  - [ ] Estimates team strength from historical performance (points scored, recent form)
  - [ ] Simulates remaining games 10,000 times
  - [ ] Calculates "Play-off %" as percentage of simulations where team makes playoffs
  - [ ] Calculates "Last %" as percentage of simulations where team finishes last
- [ ] Applies **color coding**:
  - [ ] Red-to-green gradient for playoff probability (red = low, green = high)
  - [ ] Inverted for last place probability (red = high risk, green = safe)
- [ ] Returns array of `PlayoffTableData` objects (one per team)
- [ ] **Note**: "WP Playoff %" field is out of scope (set to 0)

## Data Requirements

**From Sleeper API:**

- `getLeague(leagueId)` - League settings (playoff_teams, playoff_week_start, total_rosters)
- `getRosters(leagueId)` - Roster IDs and owner information
- `getUsers(leagueId)` - Team names and metadata
- `getMatchups(leagueId, week)` - Historical matchup data for weeks 1 through currentWeek
  - Used for: W-L records, points scored, team strength estimation

**Calculated Data:**

- Current standings (W-L-PF sorted)
- Remaining schedule for simulation (matchup_id pairs for future weeks)
- Team strength metrics (average PPG with recency weighting)

## Implementation Notes

### 1. Magic Number Algorithm (adapted from R code)

**Play-off # Calculation:**

```typescript
const totalGames = league.settings.playoff_week_start - 1;
const playoffSpots = league.settings.playoff_teams || 6;
const gamesRemaining = totalGames - currentWeek;

// Sort teams by W-L-PF to get current standings
const sortedTeams = /* sorted standings */;

// Find the cutoff losses (team just outside/inside playoffs)
const lastPlayoffTeamLosses = sortedTeams[playoffSpots - 1].losses;
const firstNonPlayoffTeamLosses = sortedTeams[playoffSpots]?.losses || 0;

for (const team of sortedTeams) {
  if (team is in playoff position) {
    playoffNumber = (totalGames + 1) - team.wins - firstNonPlayoffTeamLosses;
  } else {
    playoffNumber = (totalGames + 1) - team.wins - lastPlayoffTeamLosses;
  }

  // Status determination
  if (playoffNumber <= 0) status = "CLINCHED";
  else if (playoffNumber > 2 * gamesRemaining + 1) status = "ELIMINATED";
  else status = playoffNumber.toString();
}
```

**Last # Calculation:**

```typescript
const lastPlaceLosses = sortedTeams[sortedTeams.length - 1].losses;
const secondLastLosses = sortedTeams[sortedTeams.length - 2].losses;

for (const team of sortedTeams) {
  let lastNumber = gamesRemaining - (lastPlaceLosses - team.losses - 1);

  // Special case for last place team
  if (team is in last place) {
    lastNumber += (team.losses - secondLastLosses);
  }

  if (lastNumber <= 0) status = "SAFE";
  else status = lastNumber.toString();
}
```

### 2. Monte Carlo Simulation for Playoff Probabilities

**Team Strength Estimation:**

- Calculate average points per game for each team through current week
- Apply recency weighting (recent weeks weighted higher)
- Use this as the base "strength" for simulation

**Simulation Process:**

- For each of 10,000 simulations:
  1. For each remaining game, determine winner based on team strengths
     - Use probabilistic model: `P(team A wins) = strength_A / (strength_A + strength_B)`
  2. Calculate final standings for this simulation
  3. Determine which teams make playoffs (top N by W-L-PF)
  4. Determine which team finishes last
- Aggregate results:
  - "Play-off %" = (simulations where team made playoffs / 10,000) × 100
  - "Last %" = (simulations where team finished last / 10,000) × 100

### 3. Color Coding

- Use same red-white-green gradient as Power Rankings
- Playoff %: interpolate from red (0%) to white (50%) to green (100%)
- Last %: inverted - interpolate from green (0%) to white (50%) to red (100%)

### 4. Type Handling

- "Play-off #" and "Last #" fields are typed as `number` in `PlayoffTableData`
- Store numeric magic number, use separate status field or UI formatting for "CLINCHED"/"ELIMINATED"/"SAFE"
- Alternative: Update type definition to `number | string` if needed

## Human Testing Steps

1. Start dev server: `yarn start`
2. Navigate to a Sleeper league weekly recap (mid-season week, e.g., week 10)
3. Verify playoff standings table displays with:
   - Current rank and W-L record for each team
   - "Play-off #" showing magic numbers, "CLINCHED", or "ELIMINATED"
   - "Last #" showing magic numbers or "SAFE"
   - "Play-off %" showing simulated playoff probability (0-100)
   - "Last %" showing simulated last place probability (0-100)
   - Proper color coding (green = good, red = bad)
4. Cross-check magic numbers manually:
   - For 6th place team: verify clinch number calculation
   - For 7th place team: verify games back calculation
5. Test edge cases:
   - Late season week where teams have clinched → shows "CLINCHED"
   - Early season week → all magic numbers should be high
   - Teams mathematically eliminated → shows "ELIMINATED"

## Expected Results

- Playoff probabilities roughly match intuition (teams with more wins have higher %)
- Magic numbers are accurate and update correctly as standings change
- Color gradient makes it easy to visually identify safe/bubble/danger teams
- Table matches format of main league playoff standings

## Related Stories

- **Previous**: Story 4.2 (schedule analytics, reused for context)
- **Next**: Story 5.2 (narratives reference playoff implications)
