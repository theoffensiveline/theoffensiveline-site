# Story 2.4: Enhanced Awards System

**Status**: ⏳ Pending

**Phase**: 2 - Core Data Transformations

## Description

Enhance the existing computeWeeklyAwards utility to add position-specific awards and team-based awards to match the main league newsletter feature set.

## Dependencies

- ✅ Story 1.1, 1.2: Type definitions
- ✅ Story 2.3: Efficiency data (for "Heaviest Top" award)

## Files to Create/Modify

- [ ] `src/utils/awards/computeWeeklyAwards.ts` (UPDATE - add new awards)

## Acceptance Criteria

- [ ] Add position-specific awards:
  - [ ] "Literally Throwing" - best QB performance
  - [ ] "Running Wild" - best RB performance
  - [ ] "Widest Receiver" - best WR performance
  - [ ] "Tightest End" - best TE performance
  - [ ] "Das Boot" - best K performance
  - [ ] "Biggest D" - best DEF performance
- [ ] Add team-based awards:
  - [ ] "Warmest Bench" - most points left on bench
  - [ ] "Heaviest Top" - most optimized lineup (highest efficiency)
- [ ] All awards include photo, name, value, description
- [ ] Awards display in LeagueWeeklyRecap

## Implementation Notes

### Position Awards

For each position, find the highest scoring player across all starters:

```typescript
const qbPerformances = allStarters
  .filter(p => sleeperPlayers[p.playerId]?.position === 'QB')
  .sort((a, b) => b.points - a.points);
```

### Bench Points Calculation

```typescript
benchPoints = sum(benchPlayers.map(p => p.points))
```

## Human Testing Steps

1. Navigate to weekly recap page
2. Awards section should now show ~16 awards (up from 10)
3. Verify all new position awards appear with player photos
4. Verify "Warmest Bench" and "Heaviest Top" awards appear

## Expected Results

- Awards grid expands to show all 16 awards
- Player photos display correctly (from Sleeper CDN)
- Award descriptions are clear

## Testing Performed by Claude

- [ ] Add new award calculations
- [ ] Test with week 8 data
- [ ] Verify all awards populate correctly

## Related Stories

- **Previous**: Story 2.3
- **Next**: Story 3.1

## Notes

- This completes Phase 2 core transformations
- All basic newsletter features now available
