import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNflState } from "../utils/api/SleeperAPI";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.neutral3};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.background};
  cursor: pointer;
`;

const LoadMoreButton = styled(Button)`
  margin-top: 15px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const LeagueItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.neutral3};
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  cursor: pointer;
  width: 300px;
  justify-content: space-between;
`;

const LeaguePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const LeagueName = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  flex-grow: 1;
`;

const YearHeader = styled.h3`
  margin-top: 20px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
`;

function SleeperLogin() {
  const [username, setUsername] = useState("");
  const [leaguesByYear, setLeaguesByYear] = useState([]); // [{year, leagues}]
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [nextYear, setNextYear] = useState(null); // next year to fetch on "Load more"
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("selectedLeagueId");

    const storedUsername = localStorage.getItem("sleeperUsername");
    if (storedUsername) {
      setUsername(storedUsername);
      const cached = localStorage.getItem(`leaguesByYear_${storedUsername}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        setLeaguesByYear(parsed.leaguesByYear);
        setNextYear(parsed.nextYear);
        setHasMore(parsed.hasMore);
        setUserId(parsed.userId);
        setHasSubmitted(true);
      }
    }
  }, [navigate]);

  const fetchLeaguesForYear = async (uid, year) => {
    const response = await fetch(`https://api.sleeper.app/v1/user/${uid}/leagues/nfl/${year}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  };

  const handleUsernameSubmit = async () => {
    setIsButtonDisabled(true);
    setErrorMessage(null);
    setTimeout(() => setIsButtonDisabled(false), 3000);

    // Clear stale cache if username changed
    const previousUsername = localStorage.getItem("sleeperUsername");
    if (previousUsername && previousUsername !== username) {
      localStorage.removeItem(`leaguesByYear_${previousUsername}`);
    }

    localStorage.setItem("sleeperUsername", username);

    try {
      const userResponse = await fetch(`https://api.sleeper.app/v1/user/${username}`);
      const userData = await userResponse.json();
      const uid = userData?.user_id;

      if (!uid) {
        setErrorMessage("username");
        setLeaguesByYear([]);
        setHasSubmitted(true);
        return;
      }

      setUserId(uid);

      let nflState;
      try {
        nflState = await getNflState();
      } catch (err) {
        console.error("Error fetching NFL state:", err);
        setErrorMessage("connection");
        return;
      }

      let season = parseInt(nflState.season, 10);

      let leagues = await fetchLeaguesForYear(uid, season);

      // Walk back up to 3 consecutive empty years to find leagues
      let emptyYears = leagues.length === 0 ? 1 : 0;
      while (leagues.length === 0 && emptyYears <= 3) {
        season -= 1;
        leagues = await fetchLeaguesForYear(uid, season);
        if (leagues.length === 0) emptyYears++;
      }

      const newLeaguesByYear = leagues.length > 0 ? [{ year: season, leagues }] : [];
      const moreAvailable = leagues.length > 0;
      const next = moreAvailable ? season - 1 : null;

      setLeaguesByYear(newLeaguesByYear);
      setNextYear(next);
      setHasMore(moreAvailable);
      setHasSubmitted(true);

      localStorage.setItem(
        `leaguesByYear_${username}`,
        JSON.stringify({
          leaguesByYear: newLeaguesByYear,
          nextYear: next,
          hasMore: moreAvailable,
          userId: uid,
        })
      );
    } catch (error) {
      console.error("Error fetching leagues:", error);
      setErrorMessage("connection");
    }
  };

  const handleLoadMore = async () => {
    if (nextYear === null || !hasMore || loadingMore) return;
    setLoadingMore(true);

    try {
      const leagues = await fetchLeaguesForYear(userId, nextYear);

      if (leagues.length === 0) {
        setHasMore(false);
        setLoadingMore(false);
        // Update cache
        localStorage.setItem(
          `leaguesByYear_${username}`,
          JSON.stringify({
            leaguesByYear,
            nextYear: null,
            hasMore: false,
            userId,
          })
        );
        return;
      }

      const updated = [...leaguesByYear, { year: nextYear, leagues }];
      const next = nextYear - 1;

      setLeaguesByYear(updated);
      setNextYear(next);
      setLoadingMore(false);

      localStorage.setItem(
        `leaguesByYear_${username}`,
        JSON.stringify({
          leaguesByYear: updated,
          nextYear: next,
          hasMore: true,
          userId,
        })
      );
    } catch (error) {
      console.error("Error loading more leagues:", error);
      setLoadingMore(false);
    }
  };

  const handleLeagueSelect = (league) => {
    localStorage.setItem("selectedLeagueId", league.league_id);
    window.dispatchEvent(new Event("leagueChange"));
    navigate(`/home/${league.league_id}`, { state: { league } });
  };

  const totalLeagues = leaguesByYear.reduce((sum, g) => sum + g.leagues.length, 0);

  return (
    <Container>
      <h1>Enter Sleeper Username</h1>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Sleeper Username"
      />
      <Button onClick={handleUsernameSubmit} disabled={isButtonDisabled}>
        {isButtonDisabled ? "Please wait..." : "Submit"}
      </Button>

      {errorMessage === "connection" && (
        <div>
          <h3>Couldn't connect to Sleeper. Try again.</h3>
        </div>
      )}

      {errorMessage === "username" && (
        <div>
          <h3>Are you sure {username} is your Sleeper username?</h3>
        </div>
      )}

      {hasSubmitted && !errorMessage && totalLeagues === 0 && (
        <div>
          <h3>No leagues found for {username}.</h3>
        </div>
      )}

      {totalLeagues > 0 && (
        <div>
          <h2>Select a League</h2>
          {leaguesByYear.map(({ year, leagues }) => (
            <div key={year}>
              <YearHeader>{year} Leagues</YearHeader>
              {leagues.map((league) => (
                <LeagueItem key={league.league_id} onClick={() => handleLeagueSelect(league)}>
                  {league.avatar && (
                    <LeaguePhoto
                      src={`https://sleepercdn.com/avatars/${league.avatar}`}
                      alt={league.name}
                    />
                  )}
                  <LeagueName>{league.name}</LeagueName>
                </LeagueItem>
              ))}
            </div>
          ))}
          {hasMore && (
            <LoadMoreButton onClick={handleLoadMore} disabled={loadingMore}>
              {loadingMore ? "Loading..." : "Load more"}
            </LoadMoreButton>
          )}
        </div>
      )}
    </Container>
  );
}

export default SleeperLogin;
