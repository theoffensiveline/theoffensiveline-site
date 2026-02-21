import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchLeague } from "../utils/api/ESPNApi";
import { useAuth } from "../contexts/AuthContext";

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
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }: any) => theme.neutral3};
  border: none;
  border-radius: 5px;
  color: ${({ theme }: any) => theme.background};
  cursor: pointer;
  opacity: ${({ disabled }: any) => (disabled ? 0.6 : 1)};
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

const HelpText = styled.p`
  font-size: 14px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.7;
  max-width: 400px;
  margin-top: 15px;
  line-height: 1.5;
`;

const ErrorText = styled.h3`
  color: ${({ theme }: any) => theme.text};
`;

function EspnLogin() {
  const [leagueId, setLeagueId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leagueInfo, setLeagueInfo] = useState<{
    name: string;
    size: number;
    season: number;
  } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const trimmed = leagueId.trim();
    if (!trimmed || !/^\d+$/.test(trimmed)) {
      setError("Please enter a valid numeric ESPN League ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setLeagueInfo(null);

    try {
      const data = await fetchLeague(trimmed);
      setLeagueInfo({
        name: data.settings.name,
        size: data.settings.size,
        season: data.seasonId,
      });
    } catch (err) {
      setError("League not found. Make sure your league is public and the ID is correct.");
    } finally {
      setLoading(false);
    }
  };

  const { currentUser, addLeague } = useAuth();

  const handleConfirm = async () => {
    const espnId = `espn_${leagueId.trim()}`;
    localStorage.setItem("selectedLeagueId", espnId);
    window.dispatchEvent(new Event("leagueChange"));

    // Save to Firestore if logged in
    if (currentUser && leagueInfo) {
      await addLeague({
        id: espnId,
        type: "espn",
        name: leagueInfo.name,
        year: leagueInfo.season,
      });
    }

    navigate(`/home/${espnId}`);
  };

  return (
    <Container>
      <h1>Enter ESPN League ID</h1>
      <Input
        type="text"
        value={leagueId}
        onChange={(e) => setLeagueId(e.target.value)}
        placeholder="e.g. 123456"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Looking up league..." : "Submit"}
      </Button>

      {error && <ErrorText>{error}</ErrorText>}

      {leagueInfo && (
        <LeagueCard>
          <h2>{leagueInfo.name}</h2>
          <p>
            {leagueInfo.size} teams &middot; {leagueInfo.season} season
          </p>
          <Button onClick={handleConfirm} style={{ marginTop: 15 }}>
            Use This League
          </Button>
        </LeagueCard>
      )}

      <HelpText>
        Find your League ID in the ESPN URL when viewing your league:
        <br />
        <code>
          espn.com/fantasy/football/league?leagueId=<b>123456</b>
        </code>
        <br />
        <br />
        Note: Only public leagues are supported. Private league support is coming in a future
        update.
      </HelpText>
    </Container>
  );
}

export default EspnLogin;
