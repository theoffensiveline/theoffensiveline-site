/**
 * YahooCallback.tsx — OAuth callback handler for Yahoo Fantasy.
 *
 * Yahoo redirects here after the user grants authorization:
 *   /yahoo-callback?code=...&state=...
 *
 * This page:
 * 1. Validates the state parameter (CSRF protection)
 * 2. Exchanges the authorization code for tokens via the Vercel proxy
 * 3. Saves tokens to localStorage
 * 4. Fetches the Yahoo league to confirm it exists
 * 5. Saves the league to Firestore and navigates to /home/yahoo_{id}
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { exchangeCodeForTokens, fetchLeague } from "../utils/api/YahooApi";
import { saveYahooCredentials } from "../utils/yahooCredentials";
import { useAuth } from "../contexts/AuthContext";

/* ------------------------------------------------------------------ */
/*  Styled Components                                                  */
/* ------------------------------------------------------------------ */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  min-height: 60vh;
`;

const LeagueCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }: any) => theme.background};
  border: 1px solid ${({ theme }: any) => theme.neutral3};
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }: any) => theme.neutral3};
  border: none;
  border-radius: 5px;
  color: ${({ theme }: any) => theme.background};
  cursor: pointer;
  margin-top: 12px;
`;

const ErrorText = styled.p`
  color: #bc293d;
  max-width: 480px;
  line-height: 1.5;
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type Status = "loading" | "found-league" | "error";

function YahooCallback() {
  const navigate = useNavigate();
  const { currentUser, addLeague } = useAuth();

  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [leagueInfo, setLeagueInfo] = useState<{
    name: string;
    numTeams: number;
    season: string;
    numericId: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const returnedState = params.get("state");
    const errorParam = params.get("error");

    if (errorParam) {
      setError(`Yahoo authorization denied: ${errorParam}`);
      setStatus("error");
      return;
    }

    if (!code) {
      setError("No authorization code received from Yahoo. Please try again.");
      setStatus("error");
      return;
    }

    const expectedState = sessionStorage.getItem("yahoo_state");
    const leagueId = sessionStorage.getItem("yahoo_league_id");
    const redirectUri = sessionStorage.getItem("yahoo_redirect_uri");

    // Validate state to prevent CSRF
    if (!expectedState || returnedState !== expectedState) {
      setError("Authorization state mismatch. Please try connecting again.");
      setStatus("error");
      return;
    }

    if (!leagueId || !redirectUri) {
      setError("Missing session data. Please go back and try again.");
      setStatus("error");
      return;
    }

    // Clean up session storage
    sessionStorage.removeItem("yahoo_state");
    sessionStorage.removeItem("yahoo_league_id");
    sessionStorage.removeItem("yahoo_redirect_uri");

    (async () => {
      try {
        // Exchange code for tokens via proxy (proxy uses server-side client_secret)
        const tokens = await exchangeCodeForTokens(code, redirectUri);
        saveYahooCredentials(tokens);

        // Verify the league exists
        const leagueRes = await fetchLeague(leagueId);
        const meta = leagueRes.fantasy_content.league[0];

        setLeagueInfo({
          name: meta.name,
          numTeams: meta.num_teams,
          season: meta.season,
          numericId: leagueId,
        });
        setStatus("found-league");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(`Failed to connect Yahoo league: ${msg}`);
        setStatus("error");
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConfirm = async () => {
    if (!leagueInfo) return;
    const yahooId = `yahoo_${leagueInfo.numericId}`;
    localStorage.setItem("selectedLeagueId", yahooId);
    window.dispatchEvent(new Event("leagueChange"));

    if (currentUser) {
      await addLeague({
        id: yahooId,
        type: "yahoo",
        name: leagueInfo.name,
        year: parseInt(leagueInfo.season, 10),
      });
    }

    navigate(`/home/${yahooId}`);
  };

  if (status === "loading") {
    return (
      <Container>
        <h2>Connecting your Yahoo league&hellip;</h2>
        <p>Please wait while we verify your authorization.</p>
      </Container>
    );
  }

  if (status === "error") {
    return (
      <Container>
        <h2>Connection Failed</h2>
        <ErrorText>{error}</ErrorText>
        <Button onClick={() => navigate("/yahoo-login")}>Try Again</Button>
      </Container>
    );
  }

  return (
    <Container>
      <h2>League Found!</h2>
      {leagueInfo && (
        <LeagueCard>
          <h3 style={{ margin: "0 0 8px" }}>{leagueInfo.name}</h3>
          <p style={{ margin: 0, opacity: 0.7 }}>
            {leagueInfo.numTeams} teams &middot; {leagueInfo.season} season
          </p>
          <Button onClick={handleConfirm}>Use This League</Button>
        </LeagueCard>
      )}
    </Container>
  );
}

export default YahooCallback;
