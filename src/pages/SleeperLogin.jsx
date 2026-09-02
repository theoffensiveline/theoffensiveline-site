import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNflState, getSleeperUserByUsername, getUserLeagues } from "../utils/api/SleeperAPI";
import { toSavedLeague } from "../utils/sleeperLeagueSync";
import { useAuth } from "../contexts/AuthContext";
import LeagueAvatar from "../components/shared/LeagueAvatar";
import { setSelectedLeague } from "../utils/selectedNewsletter";

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

const LeaguePhoto = styled(LeagueAvatar)`
  margin-right: 15px;
`;

const LeagueName = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  flex-grow: 1;
  text-align: left;
`;

const YearTag = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  margin-left: 10px;
`;

function SleeperLogin() {
  const [username, setUsername] = useState("");
  const [leaguesByYear, setLeaguesByYear] = useState([]); // [{year, leagues}]
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { currentUser, addLeague } = useAuth();

  useEffect(() => {
    localStorage.removeItem("selectedLeagueId");
    localStorage.removeItem("selectedNewsletterId");

    const storedUsername = localStorage.getItem("sleeperUsername");
    if (storedUsername) {
      setUsername(storedUsername);
      const cached = localStorage.getItem(`leaguesByYear_${storedUsername}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        setLeaguesByYear(parsed.leaguesByYear);
        setUserId(parsed.userId);
        setHasSubmitted(true);
      }
    }
  }, [navigate]);

  const fetchLeaguesForYear = (uid, year) => getUserLeagues(uid, year);

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
      const userData = await getSleeperUserByUsername(username);
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

      setLeaguesByYear(newLeaguesByYear);
      setHasSubmitted(true);

      localStorage.setItem(
        `leaguesByYear_${username}`,
        JSON.stringify({ leaguesByYear: newLeaguesByYear, userId: uid })
      );
    } catch (error) {
      console.error("Error fetching leagues:", error);
      setErrorMessage("connection");
    }
  };

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league.league_id);
    // Signed-in users get the league saved to their dashboard (fire-and-forget)
    if (currentUser) {
      addLeague(toSavedLeague(league));
    }
    navigate(`/league/${league.league_id}/newsletters`);
  };

  const totalLeagues = leaguesByYear.reduce((sum, g) => sum + g.leagues.length, 0);

  // One row per league: Sleeper mints a new league ID every season, chained
  // via previous_league_id. Hide any season that a newer fetched season
  // points back to — the newsletter flow handles year selection now
  // (league → newsletter → season → issue).
  const allLeagues = leaguesByYear.flatMap(({ year, leagues }) =>
    leagues.map((l) => ({ ...l, latestYear: year }))
  );
  const ancestorIds = new Set(
    allLeagues.map((l) => l.previous_league_id).filter((id) => id && id !== "0")
  );
  const dedupedLeagues = allLeagues.filter((l) => !ancestorIds.has(l.league_id));

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
          {dedupedLeagues.map((league) => (
            <LeagueItem key={league.league_id} onClick={() => handleLeagueSelect(league)}>
              <LeaguePhoto
                src={league.avatar ? `https://sleepercdn.com/avatars/${league.avatar}` : undefined}
                alt={league.name}
                size={50}
              />
              <LeagueName>{league.name}</LeagueName>
              <YearTag>{league.latestYear}</YearTag>
            </LeagueItem>
          ))}
        </div>
      )}
    </Container>
  );
}

export default SleeperLogin;
