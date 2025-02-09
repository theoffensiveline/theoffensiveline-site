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
            {transaction.adds && (
              <div>
                Added:{" "}
                {Object.keys(transaction.adds)
                  .map((playerId) => getPlayerName(playerId))
                  .join(", ")}
              </div>
            )}
            {transaction.drops && (
              <div>
                Dropped:{" "}
                {Object.keys(transaction.drops)
                  .map((playerId) => getPlayerName(playerId))
                  .join(", ")}
              </div>
            )}
            {transaction.type === "trade" &&
              transaction.draft_picks.length > 0 && (
                <div>
                  Draft Picks Traded:{" "}
                  {transaction.draft_picks
                    .map((pick) => `${pick.season} Round ${pick.round}`)
                    .join(", ")}
                </div>
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
