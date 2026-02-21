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

const PrivateLeagueSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }: any) => theme.neutral3}44;
`;

const PrivateLeagueHeading = styled.h3`
  color: ${({ theme }: any) => theme.text};
  margin-bottom: 4px;
`;

const PrivateLeagueSubtext = styled.p`
  font-size: 14px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.7;
  max-width: 500px;
  line-height: 1.5;
  margin-bottom: 12px;
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
/*  Types                                                              */
/* ------------------------------------------------------------------ */

/** Tracks which step of the login flow we're on */
type FlowStep = "enter-id" | "needs-credentials" | "found-league";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * ESPN league login page.
 *
 * Flow:
 * 1. User enters their league ID and submits.
 * 2. We attempt to fetch the league as a public league (no credentials).
 * 3. If that succeeds → show league confirmation card.
 * 4. If that fails → assume the league is private, show credential inputs
 *    with instructions on how to find espn_s2 and SWID cookies.
 * 5. User enters credentials and retries → fetch with credentials attached.
 */
function EspnLogin() {
  const [leagueId, setLeagueId] = useState("");
  const [espnS2, setEspnS2] = useState("");
  const [swid, setSwid] = useState("");
  const [hasSavedCreds, setHasSavedCreds] = useState(false);

  const [step, setStep] = useState<FlowStep>("enter-id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leagueInfo, setLeagueInfo] = useState<{
    name: string;
    size: number;
    season: number;
  } | null>(null);

  const navigate = useNavigate();
  const { currentUser, addLeague } = useAuth();

  /** Load any previously-saved credentials on mount */
  useEffect(() => {
    const saved = getEspnCredentials();
    if (saved) {
      setEspnS2(saved.espnS2);
      setSwid(saved.swid);
      setHasSavedCreds(true);
    }
  }, []);

  /**
   * Attempt to fetch the league. On the first try (step === "enter-id")
   * we fetch without credentials. If that fails we transition to the
   * "needs-credentials" step instead of showing a generic error.
   *
   * On the second try (step === "needs-credentials") we save the
   * credentials first so buildHeaders() picks them up, then fetch again.
   */
  const handleSubmit = async () => {
    const trimmed = leagueId.trim();
    if (!trimmed || !/^\d+$/.test(trimmed)) {
      setError("Please enter a valid numeric ESPN League ID.");
      return;
    }

    // If we're in the credential step, validate that both fields are filled
    if (step === "needs-credentials" && (!espnS2.trim() || !swid.trim())) {
      setError("Please enter both espn_s2 and SWID cookies.");
      return;
    }

    setLoading(true);
    setError(null);
    setLeagueInfo(null);

    // Save credentials before fetching so the API layer picks them up
    if (step === "needs-credentials") {
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
      setStep("found-league");
    } catch {
      if (step === "enter-id") {
        // First attempt failed — likely a private league
        setStep("needs-credentials");
      } else {
        // Credential attempt also failed
        setError(
          "Still couldn't access this league. Double-check your League ID and cookies — make sure espn_s2 and SWID are copied correctly with no extra spaces."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Confirm the league selection — save to localStorage and Firestore,
   * then navigate to the league home page.
   */
  const handleConfirm = async () => {
    const espnId = `espn_${leagueId.trim()}`;
    localStorage.setItem("selectedLeagueId", espnId);
    window.dispatchEvent(new Event("leagueChange"));

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

  /** Clear saved credentials from localStorage and reset the fields */
  const handleClearCreds = () => {
    clearEspnCredentials();
    setEspnS2("");
    setSwid("");
    setHasSavedCreds(false);
  };

  /** Let the user go back to the league ID step to try a different ID */
  const handleTryDifferentId = () => {
    setStep("enter-id");
    setError(null);
    setLeagueInfo(null);
  };

  /** Build the ESPN league URL so users can verify their league ID */
  const espnLeagueUrl = leagueId.trim()
    ? `https://fantasy.espn.com/football/league?leagueId=${leagueId.trim()}`
    : "";

  return (
    <Container>
      <h1>Enter ESPN League ID</h1>

      <Input
        type="text"
        value={leagueId}
        onChange={(e) => {
          setLeagueId(e.target.value);
          // Reset to first step if they change the league ID
          if (step !== "enter-id") {
            setStep("enter-id");
            setError(null);
            setLeagueInfo(null);
          }
        }}
        placeholder="e.g. 123456"
        onKeyDown={(e) => e.key === "Enter" && step !== "found-league" && handleSubmit()}
        disabled={step === "found-league"}
      />

      {/* Step 2: Private league — show credential inputs */}
      {step === "needs-credentials" && (
        <PrivateLeagueSection>
          <PrivateLeagueHeading>This league appears to be private</PrivateLeagueHeading>
          <PrivateLeagueSubtext>
            We couldn&apos;t find a public league with that ID. If your league is private,
            you&apos;ll need to provide your ESPN cookies so we can access it.
            {espnLeagueUrl && (
              <>
                <br />
                <br />
                <a href={espnLeagueUrl} target="_blank" rel="noreferrer">
                  Verify your league on ESPN →
                </a>
              </>
            )}
          </PrivateLeagueSubtext>

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
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          {hasSavedCreds && swid && <SavedBadge>Saved</SavedBadge>}

          {hasSavedCreds && (
            <SecondaryButton onClick={handleClearCreds}>Clear saved cookies</SecondaryButton>
          )}

          <Button onClick={handleSubmit} disabled={loading} style={{ marginTop: 12 }}>
            {loading ? "Retrying with credentials..." : "Submit with Credentials"}
          </Button>

          <SecondaryButton onClick={handleTryDifferentId}>
            ← Try a different League ID
          </SecondaryButton>
        </PrivateLeagueSection>
      )}

      {/* Step 1: Initial submit button (only shown before we know it's private) */}
      {step === "enter-id" && (
        <Button onClick={handleSubmit} disabled={loading} style={{ marginTop: 12 }}>
          {loading ? "Looking up league..." : "Submit"}
        </Button>
      )}

      {error && <ErrorText>{error}</ErrorText>}

      {/* Step 3: League found — show confirmation card */}
      {leagueInfo && step === "found-league" && (
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
