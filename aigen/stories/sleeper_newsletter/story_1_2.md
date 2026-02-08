# Story 1.2: Extend Sleeper API Types

**Status**: ✅ Completed

**Phase**: 1 - Foundation & Data Models

## Description

Review and extend the existing Sleeper API type definitions to ensure all fields needed for newsletter data transformations are properly typed. This includes adding any missing fields discovered in the Sleeper API responses.

## Dependencies

None - can be done in parallel with Story 1.1

## Files to Create/Modify

- [x] `src/types/sleeperTypes.ts` (UPDATE - add missing fields)

## Acceptance Criteria

- [x] All fields used by newsletter utilities are typed in `sleeperTypes.ts`
- [x] `Matchup` type includes all fields we'll need (starters, players, players_points, points, matchup_id, roster_id)
- [x] `Roster` type includes all fields we'll need (roster_id, owner_id, players, starters, settings, metadata with team_name and player_map)
- [x] `Roster.player_map` typed as `Record<string, string> | null` for custom player nicknames (top-level field per actual API; nicknames also in `metadata` as `p_nick_{player_id}` keys)
- [x] `User` type includes all fields we'll need (user_id, display_name, metadata.team_name, avatar)
- [x] `League` type includes playoff settings and bracket IDs
- [x] JSDoc comments added for any undocumented fields
- [x] No new TypeScript errors introduced (pre-existing DefaultTheme errors unrelated)

## Implementation Notes

### Fields to Verify

**Matchup** interface should include:

- `matchup_id: number` - identifies which teams are matched up
- `roster_id: number` - the team's roster ID
- `points: number` - total points scored
- `players: string[]` - all player IDs on roster
- `starters: string[]` - player IDs that started
- `players_points: Record<string, number>` - points by player ID

**User** interface should include:

- `user_id: string`
- `display_name: string`
- `username: string`
- `avatar: string | null`
- `metadata?: { team_name?: string }` - custom team name

**Roster** interface should include:

- `roster_id: number`
- `owner_id: string`
- `players: string[]`
- `starters: string[]`
- `settings: { wins: number, losses: number, fpts: number }`
- `metadata?: { team_name?: string, player_map?: Record<string, string> }` - team nickname and custom player nicknames

**League** interface should include:

- `league_id: string`
- `name: string`
- `season: string`
- `settings: { playoff_week_start?: number, playoff_teams?: number }`

## Human Testing Steps

Since this story only updates types (no UI changes):

1. **Verify TypeScript compilation**:

   ```bash
   yarn build
   ```

   - Should complete with no errors

2. **Check type definitions**:
   - Open `src/types/sleeperTypes.ts`
   - Verify all interfaces are complete
   - Verify JSDoc comments are present

3. **Test imports**:
   - Types should autocomplete in VSCode
   - No red squiggly lines when using the types

## Expected Results

- ✅ `sleeperTypes.ts` updated with all necessary fields
- ✅ JSDoc comments explain any unclear fields
- ✅ Project builds without TypeScript errors
- ✅ Types are ready for use in newsletter utilities

## Testing Performed by Claude

Before requesting human verification, Claude will:

- [x] Review existing `sleeperTypes.ts`
- [x] Queried live Sleeper API to verify actual response shapes
- [x] Add any missing fields (Roster: metadata, player_map, co_owners, keepers, reserve, taxi, ppts settings; User: optionality fixes, is_bot, league_id, settings; League: 20+ settings fields, bracket_id, loser_bracket_id)
- [x] Add JSDoc comments
- [x] Fixed 3 type errors in consuming code (useSurvivorData.ts, LeagueRosters.tsx, computeWeeklyAwards.ts)
- [x] Run `npx tsc --noEmit` to verify no new TS errors

## Related Stories

- **Previous**: Story 1.1 - Newsletter Type Definitions
- **Next**: All Phase 2 stories use these types
- **Blocks**: Phase 2 stories (they depend on complete Sleeper types)

## Notes

- This is a quick story to ensure we have complete type coverage
- May discover additional fields needed during Phase 2 implementation
