import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getTransactions,
  getLeague,
  getRosters,
  getUsers,
} from "../utils/api/SleeperAPI";
import { Transactions, League, Player } from "../types/sleeperTypes";

const sleeperPlayers: {
  [key: string]: Player;
} = require("../utils/api/sleeper_players.json");

const Container = styled.div`
  padding: 20px;
`;

const TransactionCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.newsBlue};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
`;

const TransactionHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const TransactionDetails = styled.div`
  margin-left: 10px;
`;

const TeamSection = styled.div`
  margin-bottom: 10px;
`;

const TeamName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.newsBlue};
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.newsBlue};
  background-color: ${({ active, theme }) =>
    active ? theme.newsBlue : "transparent"};
  color: ${({ active, theme }) => (active ? theme.background : theme.text)};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const LoadMoreButton = styled(FilterButton)`
  margin: 20px auto;
  display: block;
`;

const PlayerPhoto = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 8px;
  vertical-align: middle;
  object-fit: cover;

  /* Add this to handle broken images gracefully */
  &:error {
    display: none;
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const PlayerName = styled.span`
  margin-left: 8px;
`;

const getPlayerPhoto = (playerId: string) => {
  if (/^\d+$/.test(playerId)) {
    return `https://sleepercdn.com/content/nfl/players/${playerId}.jpg`;
  }
  return `https://sleepercdn.com/images/team_logos/nfl/${playerId.toLowerCase()}.png`;
};

const RecentActivity = () => {
  const { leagueId } = useParams();
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [rosters, setRosters] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  const fetchTransactionsForWeek = useCallback(
    async (weekNumber: number) => {
      try {
        if (leagueId) {
          const transactionsData = await getTransactions(leagueId, weekNumber);
          return transactionsData.sort(
            (a: Transactions, b: Transactions) => b.created - a.created
          );
        }
        return [];
      } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
      }
    },
    [leagueId]
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (leagueId) {
          const league: League = await getLeague(leagueId);
          const lastScoredLeg = league.settings.last_scored_leg;
          setCurrentWeek(lastScoredLeg);

          const [transactionsData, rostersData, usersData] = await Promise.all([
            fetchTransactionsForWeek(lastScoredLeg),
            getRosters(leagueId),
            getUsers(leagueId),
          ]);

          setTransactions(transactionsData);
          setRosters(rostersData);
          setUsers(usersData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [leagueId, fetchTransactionsForWeek]);

  const handleLoadMore = async () => {
    if (!currentWeek || currentWeek <= 1) return;

    setLoadingMore(true);
    let previousWeek = currentWeek - 1;
    let moreTransactions: Transactions[] = [];
    let filteredMoreTransactions: Transactions[] = [];

    try {
      // Keep fetching previous weeks until we find transactions matching the filter or reach week 1
      while (previousWeek >= 1 && filteredMoreTransactions.length === 0) {
        moreTransactions = await fetchTransactionsForWeek(previousWeek);
        filteredMoreTransactions = moreTransactions.filter((transaction) => {
          if (selectedFilter === "all") return true;
          return transaction.type === selectedFilter;
        });

        if (filteredMoreTransactions.length === 0) {
          previousWeek--;
        }
      }

      if (filteredMoreTransactions.length > 0) {
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          ...moreTransactions,
        ]);
        setCurrentWeek(previousWeek);
      }
    } catch (error) {
      console.error("Error loading more transactions:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const getTeamName = (rosterId: number) => {
    const roster = rosters.find((r) => r.roster_id === rosterId);
    if (!roster) return "Unknown Team";

    const user = users.find((u) => u.user_id === roster.owner_id);
    return (
      roster.team_name ||
      user?.metadata?.team_name ||
      user?.display_name ||
      user?.username ||
      "Unknown Team"
    );
  };

  const getPlayerName = (playerId: string) => {
    const player: Player | undefined = sleeperPlayers[playerId];
    return player ? `${player.first_name} ${player.last_name}` : playerId;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTransactionType = (transaction: Transactions) => {
    switch (transaction.type) {
      case "trade":
        return "Trade";
      case "free_agent":
        return "Free Agent";
      case "waiver":
        return "Waiver";
      default:
        return "Transaction";
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (selectedFilter === "all") return true;
    return transaction.type === selectedFilter;
  });

  const renderTradeDetails = (transaction: Transactions) => {
    if (transaction.type !== "trade") return null;

    // Group additions by roster_id
    const tradesByTeam: {
      [rosterId: number]: { adds: string[]; picks: any[]; faab: number };
    } = {};

    // Initialize trade details for each roster
    transaction.roster_ids.forEach((rosterId) => {
      tradesByTeam[rosterId] = { adds: [], picks: [], faab: 0 };
    });

    // Group added players by team
    if (transaction.adds) {
      Object.entries(transaction.adds).forEach(([playerId, rosterId]) => {
        tradesByTeam[rosterId].adds.push(playerId);
      });
    }

    // Group draft picks by receiving team
    transaction.draft_picks.forEach((pick) => {
      tradesByTeam[pick.owner_id].picks.push(pick);
    });

    // Calculate FAAB changes - only track positive (receiving) amounts
    if (transaction.waiver_budget) {
      transaction.waiver_budget.forEach(({ receiver, amount }) => {
        tradesByTeam[receiver].faab += amount;
      });
    }

    return (
      <>
        {Object.entries(tradesByTeam).map(([rosterId, details]) => {
          const hasContent =
            details.adds.length > 0 ||
            details.picks.length > 0 ||
            details.faab > 0;
          if (!hasContent) return null;

          return (
            <TeamSection key={rosterId}>
              <TeamName>{getTeamName(Number(rosterId))} receives:</TeamName>
              {details.adds.length > 0 && (
                <div>
                  {details.adds.map((playerId) => (
                    <PlayerContainer key={playerId}>
                      <PlayerPhoto
                        src={getPlayerPhoto(playerId)}
                        alt={getPlayerName(playerId)}
                      />
                      <PlayerName>{getPlayerName(playerId)}</PlayerName>
                    </PlayerContainer>
                  ))}
                </div>
              )}
              {details.picks.length > 0 && (
                <div>
                  Picks:{" "}
                  {details.picks
                    .map((pick) => `${pick.season} Round ${pick.round}`)
                    .join(", ")}
                </div>
              )}
              {details.faab > 0 && <div>FAAB: ${details.faab}</div>}
            </TeamSection>
          );
        })}
      </>
    );
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <FilterContainer>
        <FilterButton
          active={selectedFilter === "all"}
          onClick={() => setSelectedFilter("all")}
        >
          All
        </FilterButton>
        <FilterButton
          active={selectedFilter === "trade"}
          onClick={() => setSelectedFilter("trade")}
        >
          Trades
        </FilterButton>
        <FilterButton
          active={selectedFilter === "free_agent"}
          onClick={() => setSelectedFilter("free_agent")}
        >
          Free Agents
        </FilterButton>
        <FilterButton
          active={selectedFilter === "waiver"}
          onClick={() => setSelectedFilter("waiver")}
        >
          Waivers
        </FilterButton>
      </FilterContainer>
      {filteredTransactions.map((transaction) => (
        <TransactionCard key={transaction.transaction_id}>
          <TransactionHeader>
            {transaction.roster_ids.map((id) => getTeamName(id)).join(", ")} -{" "}
            {getTransactionType(transaction)}
          </TransactionHeader>
          <TransactionDetails>
            <div>{formatDate(transaction.created)}</div>
            {transaction.type === "trade" ? (
              renderTradeDetails(transaction)
            ) : (
              <>
                {transaction.adds && (
                  <div>
                    Added:{" "}
                    {Object.entries(transaction.adds).map(([playerId]) => (
                      <PlayerContainer key={playerId}>
                        <PlayerPhoto
                          src={getPlayerPhoto(playerId)}
                          alt={getPlayerName(playerId)}
                        />
                        <PlayerName>
                          {getPlayerName(playerId)}
                          {transaction.type === "waiver" &&
                            Number(transaction.settings?.waiver_bid) > 0 && (
                              <span
                                style={{ color: "gray", marginLeft: "8px" }}
                              >
                                (FAAB: ${transaction.settings?.waiver_bid})
                              </span>
                            )}
                        </PlayerName>
                      </PlayerContainer>
                    ))}
                  </div>
                )}
                {transaction.drops && (
                  <div>
                    Dropped:{" "}
                    {Object.entries(transaction.drops).map(([playerId]) => (
                      <PlayerContainer key={playerId}>
                        <PlayerPhoto
                          src={getPlayerPhoto(playerId)}
                          alt={getPlayerName(playerId)}
                        />
                        <PlayerName>{getPlayerName(playerId)}</PlayerName>
                      </PlayerContainer>
                    ))}
                  </div>
                )}
              </>
            )}
          </TransactionDetails>
        </TransactionCard>
      ))}
      {currentWeek && currentWeek > 1 && (
        <LoadMoreButton
          active={false}
          onClick={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default RecentActivity;
