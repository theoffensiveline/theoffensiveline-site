/**
 * YahooLogin.tsx — Yahoo Fantasy Sports OAuth login flow.
 *
 * Flow:
 * 1. User enters their numeric Yahoo league ID.
 * 2. App generates a PKCE code_verifier + code_challenge.
 * 3. User is redirected to Yahoo's OAuth page.
 * 4. Yahoo redirects back to /yahoo-callback with an authorization code.
 * 5. YahooCallback.tsx exchanges the code for tokens and confirms the league.
 *
 * The redirect_uri must exactly match what's registered in your Yahoo Developer app:
 *   - Development: http://localhost:3000/yahoo-callback
 *   - Production:  https://theoffensiveline.net/yahoo-callback
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { buildAuthUrl, CLIENT_ID } from "../utils/api/YahooApi";
import { getYahooCredentials, clearYahooCredentials } from "../utils/yahooCredentials";

/* ------------------------------------------------------------------ */
/*  Styled Components (matching EspnLogin style)                       */
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
  margin-top: 12px;
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

const SavedBadge = styled.span`
  display: inline-block;
  background: #22c55e33;
  color: #22c55e;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 8px;
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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * Yahoo league login page.
 *
 * The user enters their Yahoo league ID, then is redirected to Yahoo OAuth.
 * After granting access, Yahoo redirects to /yahoo-callback which completes
 * the flow and saves the league.
 *
 * Auth: standard OAuth 2.0 authorization code flow. The client_secret lives
 * in the Vercel proxy (YAHOO_CLIENT_SECRET env var) and never touches the browser.
 */
function YahooLogin() {
  const [leagueId, setLeagueId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hasSavedTokens, setHasSavedTokens] = useState(false);

  useEffect(() => {
    setHasSavedTokens(getYahooCredentials() !== null);
  }, []);

  if (!CLIENT_ID) {
    return (
      <Container>
        <h1>Yahoo Setup Required</h1>
        <HelpText>
          Set <code>REACT_APP_YAHOO_CLIENT_ID</code> in your <code>.env.local</code> file to enable
          Yahoo Fantasy integration.
        </HelpText>
      </Container>
    );
  }

  const handleConnect = () => {
    const trimmed = leagueId.trim();
    if (!trimmed || !/^\d+$/.test(trimmed)) {
      setError("Please enter a valid numeric Yahoo League ID.");
      return;
    }

    setError(null);

    const state = Math.random().toString(36).slice(2);
    const redirectUri = `${window.location.origin}/yahoo-callback`;

    // Persist state and league ID in sessionStorage for the callback page
    sessionStorage.setItem("yahoo_state", state);
    sessionStorage.setItem("yahoo_league_id", trimmed);
    sessionStorage.setItem("yahoo_redirect_uri", redirectUri);

    const authUrl = buildAuthUrl(CLIENT_ID, redirectUri, state);
    window.location.href = authUrl;
  };

  const handleClearTokens = () => {
    clearYahooCredentials();
    setHasSavedTokens(false);
  };

  return (
    <Container>
      <h1>Add Yahoo League</h1>

      <Input
        type="text"
        value={leagueId}
        onChange={(e) => {
          setLeagueId(e.target.value);
          setError(null);
        }}
        placeholder="e.g. 123456"
        onKeyDown={(e) => e.key === "Enter" && handleConnect()}
      />

      {hasSavedTokens && (
        <p style={{ fontSize: 13, opacity: 0.7 }}>
          Yahoo connected <SavedBadge>Authorized</SavedBadge>
          <SecondaryButton onClick={handleClearTokens} style={{ display: "block", marginTop: 4 }}>
            Disconnect Yahoo account
          </SecondaryButton>
        </p>
      )}

      <Button onClick={handleConnect}>Connect with Yahoo</Button>

      {error && <ErrorText>{error}</ErrorText>}

      <InstructionBox>
        <summary>How to find your Yahoo League ID</summary>
        <ol>
          <li>
            Go to{" "}
            <a href="https://football.fantasysports.yahoo.com" target="_blank" rel="noreferrer">
              football.fantasysports.yahoo.com
            </a>{" "}
            and open your league.
          </li>
          <li>
            Look at the URL — it will contain your league ID:
            <br />
            <code>
              football.fantasysports.yahoo.com/f1/league/<b>123456</b>
            </code>
          </li>
          <li>Copy that number and paste it above.</li>
        </ol>
        <p>
          After clicking <strong>Connect with Yahoo</strong>, you&apos;ll be redirected to Yahoo to
          authorize access. You only need to do this once — your access is saved automatically.
        </p>
      </InstructionBox>

      <HelpText>
        Clicking &ldquo;Connect with Yahoo&rdquo; will redirect you to Yahoo to authorize this app.
        Only read-only access to your fantasy leagues is requested.
      </HelpText>
    </Container>
  );
}

export default YahooLogin;
