import { getMatchups, getRosters, getUsers } from "../api/SleeperAPI";
import type { Matchup, Roster, User } from "../../types/sleeperTypes";
import { getAvatarUrl } from "../leagueHistory";
import { getPlayerPhoto, sleeperPlayers } from "../playerUtils";

export interface WeeklyAward {
  award: string;
  photo: string;
  name: string;
  value: string;
  description: string;
}

type TeamInfo = {
  rosterId: number;
  name: string;
  photo?: string;
};

const getTeamName = (user: User | undefined): string => {
  if (!user) return "Unknown Team";
  return user?.metadata?.team_name || user?.display_name || user?.username;
};

const getTeamPhoto = (user: User | undefined): string => {
  const url = user ? getAvatarUrl(user) : undefined;
  return url || "/banner_logo.png";
};

const matchupPairsById = (matchups: Matchup[]): Map<number, Matchup[]> => {
  const pairs = new Map<number, Matchup[]>();
  for (const m of matchups) {
    const existing = pairs.get(m.matchup_id) || [];
    existing.push(m);
    pairs.set(m.matchup_id, existing);
  }
  return pairs;
};

const safeNumber = (n: number | undefined | null): number =>
  typeof n === "number" && Number.isFinite(n) ? n : 0;

export async function computeWeeklyAwards(
  leagueId: string,
  week: number
): Promise<WeeklyAward[]> {
  const [users, rosters, matchups] = await Promise.all([
    getUsers(leagueId),
    getRosters(leagueId),
    getMatchups(leagueId, week),
  ]);

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));
  const teamByRosterId = new Map<number, TeamInfo>();

  rosters.forEach((r: Roster) => {
    const user = userById.get(r.owner_id);
    teamByRosterId.set(r.roster_id, {
      rosterId: r.roster_id,
      name: getTeamName(user),
      photo: getTeamPhoto(user),
    });
  });

  const awards: WeeklyAward[] = [];

  if (!matchups || matchups.length === 0) {
    return awards;
  }

  const sortedByPointsDesc = [...matchups].sort((a, b) => b.points - a.points);
  const topScore = sortedByPointsDesc[0];
  const lowScore = sortedByPointsDesc[sortedByPointsDesc.length - 1];

  const topTeam = teamByRosterId.get(topScore.roster_id);
  const lowTeam = teamByRosterId.get(lowScore.roster_id);

  if (topTeam) {
    awards.push({
      award: "Best Managed Team",
      photo: topTeam.photo || "/banner_logo.png",
      name: topTeam.name,
      value: `Scored ${topScore.points.toFixed(2)} points`,
      description: "Highest score of the week",
    });
  }

  if (lowTeam) {
    awards.push({
      award: "Most Mismanaged Team",
      photo: lowTeam.photo || "/banner_logo.png",
      name: lowTeam.name,
      value: `Scored ${lowScore.points.toFixed(2)} points`,
      description: "Lowest score of the week",
    });
  }

  const pairs = matchupPairsById(matchups);

  type ResolvedGame = {
    winner: Matchup;
    loser: Matchup;
    margin: number;
  };

  const resolvedGames: ResolvedGame[] = [];
  for (const [, pair] of pairs) {
    if (pair.length !== 2) continue;
    const [a, b] = pair;
    if (a.points === b.points) {
      // Tie: treat roster_id order as winner/loser just for deterministic output
      const winner = a.roster_id <= b.roster_id ? a : b;
      const loser = winner === a ? b : a;
      resolvedGames.push({ winner, loser, margin: 0 });
    } else {
      const winner = a.points > b.points ? a : b;
      const loser = winner === a ? b : a;
      resolvedGames.push({
        winner,
        loser,
        margin: Math.abs(winner.points - loser.points),
      });
    }
  }

  if (resolvedGames.length > 0) {
    const worstWinner = [...resolvedGames].sort(
      (a, b) => a.winner.points - b.winner.points
    )[0];
    const bestLoser = [...resolvedGames].sort(
      (a, b) => b.loser.points - a.loser.points
    )[0];
    const biggestBlowout = [...resolvedGames].sort(
      (a, b) => b.margin - a.margin
    )[0];
    const closestGame = [...resolvedGames].sort(
      (a, b) => a.margin - b.margin
    )[0];

    const worstWinnerTeam = teamByRosterId.get(worstWinner.winner.roster_id);
    const bestLoserTeam = teamByRosterId.get(bestLoser.loser.roster_id);
    const blowoutWinnerTeam = teamByRosterId.get(
      biggestBlowout.winner.roster_id
    );
    const blowoutLoserTeam = teamByRosterId.get(biggestBlowout.loser.roster_id);
    const closeWinnerTeam = teamByRosterId.get(closestGame.winner.roster_id);
    const closeLoserTeam = teamByRosterId.get(closestGame.loser.roster_id);

    if (worstWinnerTeam) {
      awards.push({
        award: "Worst Winner",
        photo: worstWinnerTeam.photo || "/banner_logo.png",
        name: worstWinnerTeam.name,
        value: `Scored ${worstWinner.winner.points.toFixed(
          2
        )} points in their win`,
        description: "Lowest-scoring team to get a win",
      });
    }

    if (bestLoserTeam) {
      awards.push({
        award: "Best Loser",
        photo: bestLoserTeam.photo || "/banner_logo.png",
        name: bestLoserTeam.name,
        value: `Scored ${bestLoser.loser.points.toFixed(
          2
        )} points in their loss`,
        description: "Highest-scoring team to take a loss",
      });
    }

    if (blowoutWinnerTeam && blowoutLoserTeam) {
      awards.push({
        award: "Deadest Horse",
        photo: blowoutWinnerTeam.photo || "/banner_logo.png",
        name: blowoutWinnerTeam.name,
        value: `Defeated ${
          blowoutLoserTeam.name
        } by ${biggestBlowout.margin.toFixed(2)} points`,
        description: "Biggest margin of victory",
      });
    }

    if (closeWinnerTeam && closeLoserTeam) {
      awards.push({
        award: "Photo Finish",
        photo: closeWinnerTeam.photo || "/banner_logo.png",
        name: closeWinnerTeam.name,
        value: `Defeated ${closeLoserTeam.name} by ${closestGame.margin.toFixed(
          2
        )} points`,
        description: "Closest game of the week",
      });
    }
  }

  // MVP: highest scoring starter across all matchups
  type PlayerPerf = {
    playerId: string;
    points: number;
    rosterId: number;
    teamName: string;
  };

  const starterPerformances: PlayerPerf[] = [];
  const benchPerformances: PlayerPerf[] = [];

  for (const m of matchups) {
    const team = teamByRosterId.get(m.roster_id);
    const teamName = team?.name || `Team ${m.roster_id}`;

    const starters = (m.starters || []).filter(Boolean);
    const players = (m.players || []).filter(Boolean);

    for (const pid of starters) {
      starterPerformances.push({
        playerId: pid,
        points: safeNumber(m.players_points?.[pid]),
        rosterId: m.roster_id,
        teamName,
      });
    }

    const starterSet = new Set(starters);
    for (const pid of players) {
      if (starterSet.has(pid)) continue;
      benchPerformances.push({
        playerId: pid,
        points: safeNumber(m.players_points?.[pid]),
        rosterId: m.roster_id,
        teamName,
      });
    }
  }

  const mvp = starterPerformances.sort((a, b) => b.points - a.points)[0];
  if (mvp && mvp.playerId && Number.isFinite(mvp.points)) {
    const team = teamByRosterId.get(mvp.rosterId);
    const teamTotal = matchups.find(
      (m) => m.roster_id === mvp.rosterId
    )?.points;
    const pct = teamTotal ? (mvp.points / teamTotal) * 100 : undefined;

    const mvpPlayer = sleeperPlayers[mvp.playerId];
    const mvpName = mvpPlayer?.full_name || mvp.playerId;

    awards.push({
      award: "MVP",
      photo: getPlayerPhoto(mvp.playerId),
      name: mvpName,
      value:
        pct !== undefined
          ? `Scored ${mvp.points.toFixed(2)} points for ${
              team?.name || mvp.teamName
            } which was ${pct.toFixed(2)}% of the team total`
          : `Scored ${mvp.points.toFixed(2)} points for ${
              team?.name || mvp.teamName
            }`,
      description: "Highest scoring starter of the week",
    });
  }

  const benchMvp = benchPerformances.sort((a, b) => b.points - a.points)[0];
  if (benchMvp && benchMvp.playerId && Number.isFinite(benchMvp.points)) {
    const team = teamByRosterId.get(benchMvp.rosterId);

    const benchPlayer = sleeperPlayers[benchMvp.playerId];
    const benchName = benchPlayer?.full_name || benchMvp.playerId;

    awards.push({
      award: "Bench MVP",
      photo: getPlayerPhoto(benchMvp.playerId),
      name: benchName,
      value: `Scored ${benchMvp.points.toFixed(2)} points on the bench for ${
        team?.name || benchMvp.teamName
      }`,
      description: "Highest scoring bench player of the week",
    });
  }

  return awards;
}
