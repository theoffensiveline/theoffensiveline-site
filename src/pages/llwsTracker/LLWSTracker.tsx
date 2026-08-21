import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { StyledTable } from "../../components/newsletters/tableStyles";
import { fetchLLWSScoreboard, type LLWSGame } from "../../utils/llws/LLWSApi";
import { llwsPicks, llwsYear } from "../../utils/llws/llwsPicks";

const PageContainer = styled.div`
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 4px;
`;

const Subtitle = styled.div`
  text-align: center;
  font-size: 14px;
  margin-bottom: 16px;
  opacity: 0.7;
`;

const SectionHeader = styled.h2`
  font-size: 18px;
  margin: 24px 0 8px 0;
  text-align: center;
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #cc3300;
  font-size: 14px;
`;

const DraftPick = styled.span<{ $rank: number }>`
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const EliminatedTag = styled.span`
  color: #cc3300;
  font-weight: bold;
  font-size: 11px;
`;

const AliveTag = styled.span`
  color: #2e7d32;
  font-weight: bold;
  font-size: 11px;
`;

const TBDTag = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
  font-size: 11px;
`;

const TeamLogo = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 4px;
`;

const LastUpdated = styled.div`
  text-align: center;
  font-size: 11px;
  opacity: 0.5;
  margin-top: 12px;
`;

const RulesBox = styled.div`
  background-color: ${({ theme }) => theme.text}10;
  border: 1px solid ${({ theme }) => theme.text}30;
  border-radius: 8px;
  padding: 12px;
  margin: 16px 0;
  font-size: 12px;
  line-height: 1.5;
`;

const regionToTeamMap: Record<string, string[]> = {
  West: ["Bonita CA"],
  Japan: ["Tokyo JPN"],
  "Asia-Pacific": ["Seoul KOR"],
  Southwest: ["Boerne TX"],
  Mexico: ["Tijuana MEX"],
  Southeast: ["Phenix City AL"],
  Caribbean: ["Willemstad CUW"],
  Australia: ["Sydney AUS"],
  Northwest: ["Tacoma WA"],
  Metro: ["Bayonne NJ"],
  "New England": ["Bridgewater MA"],
};

interface TeamRecord {
  teamName: string;
  teamId: string;
  logo: string;
  wins: number;
  losses: number;
  games: { opponent: string; result: string; score: string; date: string }[];
  eliminated: boolean;
  eliminationDate: string | null;
  stillAlive: boolean;
}

function computeTeamRecords(games: LLWSGame[]): Map<string, TeamRecord> {
  const records = new Map<string, TeamRecord>();

  for (const game of games) {
    if (game.homeTeam.name === "TBD" || game.awayTeam.name === "TBD") continue;
    if (!game.completed) continue;

    for (const side of ["home", "away"] as const) {
      const team = side === "home" ? game.homeTeam : game.awayTeam;
      const opp = side === "home" ? game.awayTeam : game.homeTeam;
      const teamScore = side === "home" ? game.homeScore : game.awayScore;
      const oppScore = side === "home" ? game.awayScore : game.homeScore;
      const isWinner = game.winner === side;

      if (!records.has(team.name)) {
        records.set(team.name, {
          teamName: team.name,
          teamId: team.id,
          logo: team.logo,
          wins: 0,
          losses: 0,
          games: [],
          eliminated: false,
          eliminationDate: null,
          stillAlive: true,
        });
      }

      const rec = records.get(team.name)!;
      if (isWinner) rec.wins++;
      else rec.losses++;

      rec.games.push({
        opponent: opp.name,
        result: isWinner ? "W" : "L",
        score: `${teamScore}-${oppScore}`,
        date: game.date,
      });
    }
  }

  return records;
}

interface TeamInfo {
  teamName: string;
  teamId: string;
  logo: string;
}

function buildTeamInfoMap(games: LLWSGame[]): Map<string, TeamInfo> {
  const map = new Map<string, TeamInfo>();
  for (const game of games) {
    for (const team of [game.homeTeam, game.awayTeam]) {
      if (team.name === "TBD") continue;
      if (!map.has(team.name)) {
        map.set(team.name, {
          teamName: team.name,
          teamId: team.id,
          logo: team.logo,
        });
      }
    }
  }
  return map;
}

function findTeamForRegion(region: string, games: LLWSGame[]): string | null {
  const candidates = regionToTeamMap[region];
  if (!candidates) return null;

  for (const game of games) {
    for (const candidate of candidates) {
      if (game.homeTeam.name === candidate || game.awayTeam.name === candidate) {
        return candidate;
      }
    }
  }

  return candidates[0];
}

function findTeamRecord(
  records: Map<string, TeamRecord>,
  teamName: string | null
): TeamRecord | null {
  if (!teamName) return null;
  return records.get(teamName) ?? null;
}

function findNextGameForTeam(teamName: string, games: LLWSGame[]): LLWSGame | null {
  const upcoming = games
    .filter(
      (g) =>
        !g.completed &&
        g.homeTeam.name !== "TBD" &&
        g.awayTeam.name !== "TBD" &&
        (g.homeTeam.name === teamName || g.awayTeam.name === teamName)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcoming.length > 0 ? upcoming[0] : null;
}

const LLWSTracker: React.FC = () => {
  const [games, setGames] = useState<LLWSGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchLLWSScoreboard(llwsYear)
      .then((data) => {
        if (cancelled) return;
        setGames(data);
        setLastUpdated(new Date());
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const teamRecords = useMemo(() => computeTeamRecords(games), [games]);
  const teamInfoMap = useMemo(() => buildTeamInfoMap(games), [games]);

  const pickData = useMemo(() => {
    return llwsPicks.map((pick) => {
      const espnTeamName = pick.team ? findTeamForRegion(pick.team, games) : null;
      const record = findTeamRecord(teamRecords, espnTeamName);
      const teamInfo = espnTeamName ? (teamInfoMap.get(espnTeamName) ?? null) : null;
      const nextGame = espnTeamName ? findNextGameForTeam(espnTeamName, games) : null;
      return {
        ...pick,
        espnTeamName,
        record,
        logo: record?.logo ?? teamInfo?.logo ?? "",
        nextGame,
      };
    });
  }, [games, teamRecords, teamInfoMap]);

  const draftOrder = useMemo(() => {
    // Include picks with teams + TBD member (no team) at bottom = last pick
    // Exclude Devan (retired, no team, no note about TBD spot)
    const active = pickData.filter((p) => p.member !== "Devan");

    // Sort so the best team (fewest losses, most wins) is at the top = pick #1
    // Worst team (most losses, eliminated first) is at the bottom = last pick
    // Tiebreaker: team whose next game is sooner sorts to the bottom
    // (they have the next chance to lose and get a worse pick)
    active.sort((a, b) => {
      // No team (TBD member) always sorts to bottom
      const aHasTeam = a.team !== null;
      const bHasTeam = b.team !== null;
      if (aHasTeam !== bHasTeam) return aHasTeam ? -1 : 1;

      const aElim = a.record?.eliminated ?? false;
      const bElim = b.record?.eliminated ?? false;
      const aLosses = a.record?.losses ?? 0;
      const bLosses = b.record?.losses ?? 0;
      const aWins = a.record?.wins ?? 0;
      const bWins = b.record?.wins ?? 0;

      // Eliminated teams sort to the bottom (they get later picks)
      if (aElim !== bElim) return aElim ? 1 : -1;
      // Fewer losses = better = higher pick
      if (aLosses !== bLosses) return aLosses - bLosses;
      // More wins = better = higher pick
      if (aWins !== bWins) return bWins - aWins;
      // Tiebreaker: next game sooner = sorts to bottom (closer to losing)
      const aNext = a.nextGame ? new Date(a.nextGame.date).getTime() : Infinity;
      const bNext = b.nextGame ? new Date(b.nextGame.date).getTime() : Infinity;
      return bNext - aNext;
    });

    return active;
  }, [pickData]);

  const completedGames = useMemo(
    () => games.filter((g) => g.completed && g.homeTeam.name !== "TBD"),
    [games]
  );

  const upcomingGames = useMemo(
    () => games.filter((g) => !g.completed && g.homeTeam.name !== "TBD"),
    [games]
  );

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>LLWS Draft Order Tracker</PageTitle>
        <StatusMessage>Loading live results from ESPN...</StatusMessage>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageTitle>LLWS Draft Order Tracker</PageTitle>
        <ErrorMessage>
          Failed to load LLWS data: {error}
          <br />
          <br />
          Try refreshing the page.
        </ErrorMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>LLWS Draft Order Draft Order Tracker</PageTitle>
      <Subtitle>{llwsYear} Little League World Series</Subtitle>

      <RulesBox>
        <strong>Draft Order Rules:</strong> The person whose LLWS team is eliminated first gets the{" "}
        <strong>last</strong> draft pick draft pick. The winning LLWS team owner gets the{" "}
        <strong>first</strong> draft pick draft pick. Order is determined by elimination order.
      </RulesBox>

      <SectionHeader>Draft Order (Projected)</SectionHeader>
      <StyledTable>
        <thead>
          <tr>
            <th>Pick</th>
            <th>Member</th>
            <th>LLWS Team</th>
            <th>Record</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {draftOrder.map((pick, idx) => {
            const rec = pick.record;
            const pickNum = idx + 1;
            return (
              <tr key={pick.member}>
                <td className="center-column">
                  <DraftPick $rank={pickNum}>{pickNum}</DraftPick>
                </td>
                <td>{pick.member}</td>
                <td>
                  {pick.logo && <TeamLogo src={pick.logo} alt="" />}
                  {pick.espnTeamName ?? pick.team ?? "—"}
                </td>
                <td className="center-column">{rec ? `${rec.wins}-${rec.losses}` : "—"}</td>
                <td className="center-column">
                  {rec ? (
                    rec.eliminated ? (
                      <EliminatedTag>OUT</EliminatedTag>
                    ) : (
                      <AliveTag>ALIVE</AliveTag>
                    )
                  ) : (
                    <TBDTag>N/A</TBDTag>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <div style={{ fontSize: 11, opacity: 0.6, textAlign: "center" }}>
        Pick #1 = best LLWS team (first to choose draft slot) · Pick #{draftOrder.length} = first
        eliminated (last pick)
      </div>

      <SectionHeader>Team Picks & Results</SectionHeader>
      <StyledTable>
        <thead>
          <tr>
            <th>Member</th>
            <th>LLWS Team</th>
            <th>Record</th>
            <th>Next Game</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pickData
            .filter((p) => p.member !== "TBD")
            .map((pick) => {
              const rec = pick.record;
              const ng = pick.nextGame;
              const nextOpp = ng
                ? ng.homeTeam.name === pick.espnTeamName
                  ? ng.awayTeam.name
                  : ng.homeTeam.name
                : null;
              return (
                <tr key={pick.member}>
                  <td>{pick.member}</td>
                  <td>
                    {pick.logo && <TeamLogo src={pick.logo} alt="" />}
                    {pick.espnTeamName ?? "—"}
                  </td>
                  <td className="center-column">{rec ? `${rec.wins}-${rec.losses}` : "—"}</td>
                  <td className="center-column" style={{ fontSize: 11 }}>
                    {ng ? (
                      <>
                        {new Date(ng.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                        <br />
                        {new Date(ng.date).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                        <br />
                        vs {nextOpp}
                      </>
                    ) : rec?.eliminated ? (
                      <TBDTag>—</TBDTag>
                    ) : (
                      <TBDTag>TBD</TBDTag>
                    )}
                  </td>
                  <td className="center-column">
                    {rec ? (
                      rec.eliminated ? (
                        <EliminatedTag>ELIMINATED</EliminatedTag>
                      ) : (
                        <AliveTag>ALIVE</AliveTag>
                      )
                    ) : (
                      <TBDTag>{pick.note ?? "N/A"}</TBDTag>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </StyledTable>

      {completedGames.length > 0 && (
        <>
          <SectionHeader>Completed Games</SectionHeader>
          <StyledTable>
            <thead>
              <tr>
                <th>Date</th>
                <th>Matchup</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {completedGames
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((game) => (
                  <tr key={game.id}>
                    <td className="center-column">
                      {new Date(game.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      <br />
                      {new Date(game.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <a
                        href={`https://www.espn.com/little-league-world-series/scoreboard/_/date/${game.date.slice(0, 10).replace(/-/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {game.awayTeam.name} @ {game.homeTeam.name}
                      </a>
                    </td>
                    <td className="center-column">
                      {game.awayScore}-{game.homeScore}
                    </td>
                  </tr>
                ))}
            </tbody>
          </StyledTable>
        </>
      )}

      {upcomingGames.length > 0 && (
        <>
          <SectionHeader>Upcoming Games</SectionHeader>
          <StyledTable>
            <thead>
              <tr>
                <th>Date</th>
                <th>Matchup</th>
              </tr>
            </thead>
            <tbody>
              {upcomingGames
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((game) => (
                  <tr key={game.id}>
                    <td className="center-column">
                      {new Date(game.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      <br />
                      {new Date(game.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      {game.awayTeam.name} @ {game.homeTeam.name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </StyledTable>
        </>
      )}

      {lastUpdated && (
        <LastUpdated>Last updated: {lastUpdated.toLocaleTimeString("en-US")}</LastUpdated>
      )}
    </PageContainer>
  );
};

export default LLWSTracker;
