import { Player } from '../types/sleeperTypes';

// Import the players data
export const sleeperPlayers: {
  [key: string]: Player;
} = require("./api/sleeper_players.json");

// Get player photo URL
export const getPlayerPhoto = (playerId: string): string => {
  if (/^\d+$/.test(playerId)) {
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
export const sortPlayersByPosition = (players: string[]): string[] => {
  return [...players].sort((a, b) => {
    const playerA = sleeperPlayers[a];
    const playerB = sleeperPlayers[b];
    return getPositionSortOrder(playerA?.position) - getPositionSortOrder(playerB?.position);
  });
};
