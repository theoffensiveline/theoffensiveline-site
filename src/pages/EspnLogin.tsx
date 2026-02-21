import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchLeague } from "../utils/api/ESPNApi";
import { useAuth } from "../contexts/AuthContext";
import {
  getEspnCredentials,
  saveEspnCredentials,
  clearEspnCredentials,
  type EspnCredentials,
} from "../utils/espnCredentials";

/* ------------------------------------------------------------------ */
/*  Styled Components                                                  */
/* ------------------------------------------------------------------ */

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

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }: any) => theme.neutral3};
  color: ${({ theme }: any) => theme.neutral3};
  font-size: 13px;
  padding: 6px 14px;
  margin-top: 8px;
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
  max-width: 500px;
  margin-top: 15px;
  line-height: 1.5;
`;

const ErrorText = styled.h3`
  color: ${({ theme }: any) => theme.text};
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }: any) => theme.text};
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CollapsibleSection = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "800px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InstructionBox = styled.details`
  text-align: left;
  max-width: 500px;
  margin: 16px 0;
  padding: 12px 16px;
  border: 1px solid ${({ theme }: any) => theme.neutral3};
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }: any) => theme.text};

  summary {
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 8px;
  }

  ol {
    padding-left: 20px;
    margin: 8px 0;
  }

  code {
    background: ${({ theme }: any) => theme.neutral3}33;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12px;
  }
`;

const SavedBadge = styled.span`
  display: inline-block;
  background: #22c55e33;
  color: #22c55e;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 8px;
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function EspnLogin() {
  const [leagueId, setLeagueId] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [espnS2, setEspnS2] = useState("");
  const [swid, setSwid] = useState("");
  const [hasSavedCreds, setHasSavedCreds] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leagueInfo, setLeagueInfo] = useState<{
    name: string;
    size: number;
    season: number;
  } | null>(null);

  const navigate = useNavigate();
  const { currentUser, addLeague } = useAuth();

  // Load saved credentials from localStorage on mount
  useEffect(() => {
    const saved = getEspnCredentials();
    if (saved) {
      setEspnS2(saved.espnS2);
      setSwid(saved.swid);
      setIsPrivate(true);
      setHasSavedCreds(true);
    }
  }, []);

  const handleSubmit = async () => {
    const trimmed = leagueId.trim();
    if (!trimmed || !/^\d+$/.test(trimmed)) {
      setError("Please enter a valid numeric ESPN League ID.");
      return;
    }

    if (isPrivate && (!espnS2.trim() || !swid.trim())) {
      setError("Please enter both espn_s2 and SWID cookies for private leagues.");
      return;
    }

    setLoading(true);
    setError(null);
    setLeagueInfo(null);

    // Save credentials if private
    if (isPrivate) {
      const creds: EspnCredentials = {
        espnS2: espnS2.trim(),
        swid: swid.trim(),
      };
      saveEspnCredentials(creds);
      setHasSavedCreds(true);
    }

    try {
      const data = await fetchLeague(trimmed);
      setLeagueInfo({
        name: data.settings.name,
        size: data.settings.size,
        season: data.seasonId,
      });
    } catch {
      const msg = isPrivate
        ? "League not found. Double-check your League ID and cookies. Make sure espn_s2 and SWID are copied correctly with no extra spaces."
        : "League not found. Make sure your league is public and the ID is correct.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

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

  const handleClearCreds = () => {
    clearEspnCredentials();
    setEspnS2("");
    setSwid("");
    setHasSavedCreds(false);
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

      <Toggle>
        <Checkbox
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        My league is private
      </Toggle>

      <CollapsibleSection $open={isPrivate}>
        <InstructionBox>
          <summary>How to find your ESPN cookies</summary>
          <ol>
            <li>
              Open{" "}
              <a href="https://fantasy.espn.com" target="_blank" rel="noreferrer">
                fantasy.espn.com
              </a>{" "}
              and log in.
            </li>
            <li>Open your browser&apos;s Developer Tools (F12 or Cmd+Option+I on Mac).</li>
            <li>
              Go to the <strong>Application</strong> tab (Chrome) or <strong>Storage</strong> tab
              (Firefox).
            </li>
            <li>
              In the left sidebar, expand <strong>Cookies</strong> → click on{" "}
              <code>https://fantasy.espn.com</code>.
            </li>
            <li>
              Find <code>espn_s2</code> — copy the entire <strong>Value</strong> (it&apos;s a long
              string).
            </li>
            <li>
              Find <code>SWID</code> — copy the entire <strong>Value</strong> (looks like{" "}
              <code>{"{XXXXXXXX-XXXX-...}"}</code>).
            </li>
          </ol>
          <p>
            <strong>Tip:</strong> These cookies expire periodically. If you get errors after a
            while, repeat these steps to get fresh values.
          </p>
        </InstructionBox>

        <Input
          type="text"
          value={espnS2}
          onChange={(e) => setEspnS2(e.target.value)}
          placeholder="espn_s2 cookie value"
        />
        {hasSavedCreds && espnS2 && <SavedBadge>Saved</SavedBadge>}

        <Input
          type="text"
          value={swid}
          onChange={(e) => setSwid(e.target.value)}
          placeholder="SWID cookie value (e.g. {XXXX-...})"
        />
        {hasSavedCreds && swid && <SavedBadge>Saved</SavedBadge>}

        {hasSavedCreds && (
          <SecondaryButton onClick={handleClearCreds}>Clear saved cookies</SecondaryButton>
        )}
      </CollapsibleSection>

      <Button onClick={handleSubmit} disabled={loading} style={{ marginTop: 12 }}>
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
      </HelpText>
    </Container>
  );
}

export default EspnLogin;
