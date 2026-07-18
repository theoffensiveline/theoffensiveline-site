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
export const TOGGLEABLE_FEATURES: {
  feature: LeagueFeature;
  label: string;
  description: string;
}[] = [
  {
    feature: "survivor",
    label: "Survivor pool",
    description:
      "A season-long side game: members pick one NFL team to win each week — no repeats, one loss and you're out.",
  },
  {
    feature: "bylaws",
    label: "Bylaws",
    description: "A page for your league's constitution: rules, punishments, and precedents.",
  },
  {
    feature: "submit",
    label: "Member submissions",
    description: "Let league members send in memes, quotes, and story ideas for the newsletter.",
  },
];
