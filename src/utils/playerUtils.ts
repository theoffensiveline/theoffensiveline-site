import { Player } from "../types/sleeperTypes";

// Import the players data
export const sleeperPlayers: {
  [key: string]: Player;
} = require("./api/sleeper_players.json");

// Reverse map: ESPN player ID (string) → Sleeper player ID (string)
// Built once at module load from sleeperPlayers.espn_id field.
export const espnToSleeperId: Record<string, string> = Object.entries(sleeperPlayers).reduce<
  Record<string, string>
>((acc, [sleeperId, player]) => {
  if (player.espn_id != null) {
    acc[String(player.espn_id)] = sleeperId;
  }
  return acc;
}, {});

// Get player photo URL.
// Pass isEspn=true for ESPN leagues so unmapped players (whose IDs are raw
// ESPN numeric IDs not present in sleeperPlayers) get the ESPN CDN photo.
// Mapped ESPN players already use Sleeper IDs and continue using Sleeper CDN.
// Pass espnTeamAbbrev (e.g. "buf") for ESPN DEF entries to use the NFL team
// logo CDN instead of the player headshot CDN.
export const getPlayerPhoto = (
  playerId: string,
  isEspn?: boolean,
  espnTeamAbbrev?: string
): string => {
  if (espnTeamAbbrev) {
    return `https://a.espncdn.com/i/teamlogos/nfl/500/${espnTeamAbbrev}.png`;
  }
  if (/^\d+$/.test(playerId)) {
    if (isEspn && !sleeperPlayers[playerId]) {
      return `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${playerId}.png&w=350&h=254`;
    }
    return `https://sleepercdn.com/content/nfl/players/${playerId}.jpg`;
  }
  return `https://sleepercdn.com/images/team_logos/nfl/${playerId.toLowerCase()}.png`;
};

// Get position sort order for consistent player sorting
export const getPositionSortOrder = (position: string | null): number => {
  const positionOrder: { [key: string]: number } = {
    QB: 1,
    RB: 2,
    WR: 3,
    TE: 4,
    K: 5,
    DEF: 6,
  };
  return position ? positionOrder[position] || 99 : 99;
};

// Sort players by their positions
export const sortPlayersByPosition = (
  playerIds: string[],
  playerMap: Record<string, { position: string | null }>
): string[] => {
  return [...playerIds].sort(
    (a, b) =>
      getPositionSortOrder(playerMap[a]?.position) - getPositionSortOrder(playerMap[b]?.position)
  );
};
