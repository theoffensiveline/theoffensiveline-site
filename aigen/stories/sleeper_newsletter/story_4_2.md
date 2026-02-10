# Story 4.2: Schedule Comparison Analytics

**Status**: ✅ Completed

**Phase**: 4 - Power Rankings & Analytics

## Description

Calculate hypothetical records for each team playing every other team's schedule. This shows how lucky/unlucky teams have been with their schedule by comparing their actual record to what they would have achieved with different opponents.

## Dependencies

- ✅ Story 2.1: Leaderboard (for matchup data)

## Files to Create/Modify

- [ ] `src/utils/newsletter/computeSchedule.ts` (NEW)

## Acceptance Criteria

- [ ] For each team, simulates playing every other team's schedule with their own scores
- [ ] Calculates hypothetical W/L/T record for each schedule combination
- [ ] Identifies best-case record (which schedule(s) would give most wins)
- [ ] Identifies worst-case record (which schedule(s) would give fewest wins)
- [ ] Includes current actual record for comparison
- [ ] Returns data in format: `{ best_records, worst_records, current_records }`
- [ ] Each record includes: team name, W/L/T, and list of teams whose schedule produces that record

## Implementation Notes

### Algorithm (from R code)

1. **Get all team scores by week**:
   - For each week, get each team's score and their opponent's score

2. **For each team pair (team1, team2)**:
   - Simulate team1 playing team2's schedule
   - For each week:
     - If they actually played each other: use actual result
     - Otherwise: Compare team1's score to team2's opponent's score
   - Count total wins/losses/ties for this hypothetical schedule

3. **Find best and worst records**:
   - Best: Which schedule(s) would give this team the most wins
   - Worst: Which schedule(s) would give this team the fewest wins
   - Current: Their actual record (when team1 == team2)

### Data Structure

```typescript
interface ScheduleRecord {
  team1: string; // The team we're evaluating
  team2_list: string[]; // List of teams whose schedule produces this record
  wins: number;
  losses: number;
  ties: number;
}

interface ScheduleData {
  best_records: ScheduleRecord[]; // Best-case for each team
  worst_records: ScheduleRecord[]; // Worst-case for each team
  current_records: ScheduleRecord[]; // Actual record for each team
}
```

## Human Testing Steps

1. Navigate to weekly recap
2. Find "Schedule Comparisons" or "Alternate Universe #3" section
3. Verify each team shows:
   - Best possible record (with schedule they would want)
   - Worst possible record (with schedule they would avoid)
   - Current actual record
4. Check that the data makes sense (e.g., good teams should have similar best/worst, unlucky teams should have big gaps)

## Expected Results

- Schedule comparison data available
- Shows which teams have been lucky/unlucky with scheduling
- Displays hypothetical best/worst case scenarios for each team
- Data matches format used by existing `ScheduleTable` component

## Notes

- This is NOT just strength of schedule (opponent win %)
- It's about simulating "what if you had their opponents?"
- Helps identify teams that are better/worse than their record suggests
- Based on R function `schedule_comparison_to_json` from main league analytics
