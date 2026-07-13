import type { LeagueFeature } from "../../types/firestore";

/**
 * Features editors can toggle themselves on their newsletter (#110).
 *
 * Everything else (`hotdogs`, `leaderboards`, `custom-newsletters`,
 * `weekly-recaps`) is dogfood-only: renderable when present on a doc (set
 * via console for The Offensive Line) but not user-settable — their pages
 * are still hardcoded to our league until #103 ladder step 4. Graduating a
 * feature = adding it here.
 */
export const TOGGLEABLE_FEATURES: { feature: LeagueFeature; label: string }[] = [
  { feature: "survivor", label: "Survivor pool" },
  { feature: "bylaws", label: "Bylaws" },
  { feature: "submit", label: "Member submissions" },
];
