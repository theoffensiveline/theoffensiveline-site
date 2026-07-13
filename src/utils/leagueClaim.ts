/**
 * leagueClaim — league membership verification.
 *
 * Membership is verified client-side per the launch plan's MVP approach
 * (Sleeper has no OAuth; newsletters are low-stakes content):
 *   - Sleeper: the user's linked sleeperUserId must appear in the league's
 *     user list.
 *   - ESPN / Yahoo: successfully fetching the league's users counts —
 *     private leagues require the user's own credentials to fetch at all.
 *
 * The editor-role claim flow (#53) retired in #110: creating a newsletter
 * IS claiming in the #103 model.
 */
import { getUsers, getPlatform } from "./api/FantasyAPI";
import type { UserProfile } from "./survivorUtils";

export interface MembershipResult {
  isMember: boolean;
  /** Why membership failed — used to pick the right UI hint. */
  reason?: "no-sleeper-link" | "not-in-league" | "fetch-failed";
}

/**
 * Check whether the signed-in user is a member of the given league.
 */
export async function verifyLeagueMembership(
  leagueId: string,
  profile: UserProfile | null
): Promise<MembershipResult> {
  if (getPlatform(leagueId) === "sleeper") {
    if (!profile?.sleeperUserId) {
      return { isMember: false, reason: "no-sleeper-link" };
    }
    try {
      const users = await getUsers(leagueId);
      return users.some((u) => u.user_id === profile.sleeperUserId)
        ? { isMember: true }
        : { isMember: false, reason: "not-in-league" };
    } catch {
      return { isMember: false, reason: "fetch-failed" };
    }
  }

  // ESPN / Yahoo: fetching members works ⇒ the user has access to the league
  try {
    await getUsers(leagueId);
    return { isMember: true };
  } catch {
    return { isMember: false, reason: "fetch-failed" };
  }
}
