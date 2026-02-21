import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { getTransactions, getLeague, getRosters, getUsers } from "../utils/api/FantasyAPI";
import { Transactions, League } from "../types/sleeperTypes";
import { sleeperPlayers, getPlayerPhoto } from "../utils/playerUtils";
import {
  PlayerPhoto,
  PlayerPosition,
  PlayerName,
  PlayerRow,
} from "../components/shared/PlayerComponents";
import {
  Container,
  LoadingState,
  TeamAvatar,
  TeamHeader,
  TeamInfo,
} from "../components/shared/PageComponents";

const TransactionCard = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.newsBlue};
  border-radius: 10px;
`;

const TransactionHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TransactionType = styled.div`
  color: ${({ theme }) => theme.newsBlue};
  margin-top: 5px;
`;

const TransactionDetails = styled.div`
  margin-left: 10px;
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
  background-color: ${({ active, theme }) => (active ? theme.newsBlue : "transparent")};
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

const ActionCard = styled.div<{ isAdded: boolean }>`
  position: relative;
  margin: 10px 0;
  padding: 15px;
  border: 2px solid ${({ isAdded }) => (isAdded ? "#4CAF50" : "#F44336")};
  border-radius: 8px;
  background-color: ${({ isAdded }) =>
    isAdded ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)"};

  &::before {
    content: "${({ isAdded }) => (isAdded ? "+" : "-")}";
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 16px;
    font-weight: bold;
    color: ${({ isAdded }) => (isAdded ? "#4CAF50" : "#F44336")};
  }
`;

const ActionContent = styled.div`
  margin-left: 20px;
`;

const TradeContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const TradeTeamSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TradeCard = styled.div`
  position: relative;
  padding: 15px;
  border: 2px solid #4caf50;
  border-radius: 8px;
  background-color: rgba(76, 175, 80, 0.1);

  &::before {
    content: "+";
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #4caf50;
  }
`;

const TradeContent = styled.div`
  margin-left: 20px;
`;

const TradePicks = styled.div`
  margin-top: 10px;
  padding: 8px;
  background-color: rgba(76, 175, 80, 0.05);
  border-radius: 4px;
`;

const TradeFaab = styled.div`
  margin-top: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const RecentActivity = () => {
  const { leagueId } = useParams();
  const theme = useTheme();
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
          return transactionsData.sort((a: Transactions, b: Transactions) => b.created - a.created);
        }
        return [];
      } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
      }
    },
    [leagueId]
  );

  const getRosterWithUser = useCallback(
    (rosterId: number) => {
      const roster = rosters.find((r) => r.roster_id === rosterId);
      if (!roster) return null;
      const user = users.find((u) => u.user_id === roster.owner_id);
      return { ...roster, user };
    },
    [rosters, users]
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
        setTransactions((prevTransactions) => [...prevTransactions, ...moreTransactions]);
        setCurrentWeek(previousWeek);
      }
    } catch (error) {
      console.error("Error loading more transactions:", error);
    } finally {
      setLoadingMore(false);
    }
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

    // Calculate FAAB changes
    if (transaction.waiver_budget) {
      transaction.waiver_budget.forEach(({ receiver, amount }) => {
        tradesByTeam[receiver].faab += amount;
      });
    }

    return (
      <TradeContainer>
        {Object.entries(tradesByTeam).map(([rosterId, details]) => {
          const hasContent =
            details.adds.length > 0 || details.picks.length > 0 || details.faab > 0;
          if (!hasContent) return null;

          const rosterWithUser = getRosterWithUser(Number(rosterId));
          if (!rosterWithUser) return null;

          return (
            <TradeTeamSection key={rosterId}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}
              >
                <TeamAvatar
                  src={rosterWithUser.user?.metadata?.avatar || rosterWithUser.user?.avatar}
                  alt={`${rosterWithUser.user?.metadata?.team_name || rosterWithUser.user?.display_name} Avatar`}
                />
                <TeamInfo>
                  <h3>
                    {rosterWithUser.user?.metadata?.team_name || rosterWithUser.user?.display_name}
                  </h3>
                </TeamInfo>
              </div>
              <TradeCard>
                <TradeContent>
                  {details.adds.length > 0 && (
                    <div>
                      {details.adds.map((playerId) => (
                        <PlayerRow key={playerId}>
                          <PlayerPosition position={sleeperPlayers[playerId]?.position || "FLEX"}>
                            {sleeperPlayers[playerId]?.position || "FLEX"}
                          </PlayerPosition>
                          <PlayerPhoto
                            src={getPlayerPhoto(playerId)}
                            alt={sleeperPlayers[playerId]?.full_name || "Unknown Player"}
                          />
                          <PlayerName>{sleeperPlayers[playerId]?.full_name}</PlayerName>
                        </PlayerRow>
                      ))}
                    </div>
                  )}
                  {details.picks.length > 0 && (
                    <TradePicks>
                      {details.picks.map((pick) => `${pick.season} Round ${pick.round}`).join(", ")}
                    </TradePicks>
                  )}
                  {details.faab > 0 && <TradeFaab>FAAB: ${details.faab}</TradeFaab>}
                </TradeContent>
              </TradeCard>
            </TradeTeamSection>
          );
        })}
      </TradeContainer>
    );
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Container>
      <FilterContainer>
        <FilterButton active={selectedFilter === "all"} onClick={() => setSelectedFilter("all")}>
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
            <TeamHeader>
              {transaction.type !== "trade" &&
                transaction.roster_ids.map((rosterId) => {
                  const rosterWithUser = getRosterWithUser(rosterId);
                  if (!rosterWithUser) return null;
                  return (
                    <div
                      key={rosterId}
                      style={{ display: "flex", alignItems: "center", gap: "10px" }}
                    >
                      <TeamAvatar
                        src={rosterWithUser.user?.metadata?.avatar || rosterWithUser.user?.avatar}
                        alt={`${rosterWithUser.user?.metadata?.team_name || rosterWithUser.user?.display_name} Avatar`}
                      />
                      <TeamInfo>
                        <h3>
                          {rosterWithUser.user?.metadata?.team_name ||
                            rosterWithUser.user?.display_name}
                        </h3>
                      </TeamInfo>
                    </div>
                  );
                })}
            </TeamHeader>
            <TransactionType>{getTransactionType(transaction)}</TransactionType>
          </TransactionHeader>
          <TransactionDetails>
            <div>{formatDate(transaction.created)}</div>
            {transaction.type === "trade" ? (
              renderTradeDetails(transaction)
            ) : (
              <>
                {transaction.adds && (
                  <ActionCard isAdded={true}>
                    <ActionContent>
                      {Object.entries(transaction.adds).map(([playerId]) => (
                        <PlayerRow key={playerId}>
                          <PlayerPosition position={sleeperPlayers[playerId]?.position || "FLEX"}>
                            {sleeperPlayers[playerId]?.position || "FLEX"}
                          </PlayerPosition>
                          <PlayerPhoto
                            src={getPlayerPhoto(playerId)}
                            alt={sleeperPlayers[playerId]?.full_name || "Unknown Player"}
                          />
                          <PlayerName>
                            {sleeperPlayers[playerId]?.full_name}
                            {transaction.type === "waiver" &&
                              Number(transaction.settings?.waiver_bid) > 0 && (
                                <span style={{ color: theme.text, marginLeft: "8px" }}>
                                  (FAAB: ${transaction.settings?.waiver_bid})
                                </span>
                              )}
                          </PlayerName>
                        </PlayerRow>
                      ))}
                    </ActionContent>
                  </ActionCard>
                )}
                {transaction.drops && (
                  <ActionCard isAdded={false}>
                    <ActionContent>
                      {Object.entries(transaction.drops).map(([playerId]) => (
                        <PlayerRow key={playerId}>
                          <PlayerPosition position={sleeperPlayers[playerId]?.position || "FLEX"}>
                            {sleeperPlayers[playerId]?.position || "FLEX"}
                          </PlayerPosition>
                          <PlayerPhoto
                            src={getPlayerPhoto(playerId)}
                            alt={sleeperPlayers[playerId]?.full_name || "Unknown Player"}
                          />
                          <PlayerName>{sleeperPlayers[playerId]?.full_name}</PlayerName>
                        </PlayerRow>
                      ))}
                    </ActionContent>
                  </ActionCard>
                )}
              </>
            )}
          </TransactionDetails>
        </TransactionCard>
      ))}
      {currentWeek && currentWeek > 1 && (
        <LoadMoreButton active={false} onClick={handleLoadMore} disabled={loadingMore}>
          {loadingMore ? "Loading..." : "Load More"}
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default RecentActivity;
