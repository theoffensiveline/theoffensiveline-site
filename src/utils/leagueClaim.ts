/**
 * leagueClaim — membership verification and editor-role claiming (#53).
 *
 * Membership is verified client-side per the launch plan's MVP approach
 * (Sleeper has no OAuth; newsletters are low-stakes content):
 *   - Sleeper: the user's linked sleeperUserId must appear in the league's
 *     user list.
 *   - ESPN / Yahoo: successfully fetching the league's users counts —
 *     private leagues require the user's own credentials to fetch at all.
 *
 * Real enforcement of the claim itself lives in firestore.rules: an
 * unclaimed league (editorUid null) can only transition to the claimer's
 * own UID, touching no other fields. First write wins.
 */
import { getUsers, getPlatform } from "./api/FantasyAPI";
import { updateLeague } from "../services/firestoreCrud";
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

/**
 * Claim the editor role for a league. Firestore rules guarantee this only
 * succeeds while the role is unclaimed — a permission error almost always
 * means someone else claimed it first.
 */
export async function claimEditorRole(
  leagueId: string,
  uid: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await updateLeague(leagueId, { editorUid: uid });
    return { success: true };
  } catch (error) {
    console.error("Error claiming editor role:", error);
    return {
      success: false,
      error: "Couldn't claim the editor role — it may have just been claimed by someone else.",
    };
  }
}
