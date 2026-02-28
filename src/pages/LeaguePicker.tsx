/**
 * LeaguePicker.tsx — Landing page and league selection hub.
 *
 * Two main sections:
 * 1. **Browse any league** (no auth) — platform picker cards for Sleeper + ESPN
 *    that route to the respective login/entry flows.
 * 2. **Your leagues** (auth) — saved leagues from Firestore if the user is
 *    signed in, with quick-select and remove options.
 *
 * This is the first page users see (mounted at `/league-picker`, with `/`
 * redirecting here). The goal is a clear, welcoming entry point that works
 * for both authenticated and anonymous users.
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import type { SavedLeague } from "../utils/survivorUtils";

/* ------------------------------------------------------------------ */
/*  Styled Components                                                  */
/* ------------------------------------------------------------------ */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 8px;
  color: ${({ theme }: any) => theme.text};
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.7;
  margin-bottom: 32px;
  max-width: 500px;
  line-height: 1.5;
`;

const SectionLabel = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.5;
  margin-bottom: 16px;
  margin-top: 0;
`;

const PlatformGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PlatformCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: any) => theme.background};
  border: 2px solid ${({ theme }: any) => theme.neutral3}44;
  border-radius: 12px;
  padding: 24px 32px;
  cursor: pointer;
  width: 200px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }: any) => theme.neutral3};
    transform: translateY(-2px);
  }
`;

const PlatformIcon = styled.span`
  font-size: 36px;
  margin-bottom: 12px;
`;

const PlatformName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.text};
  margin-bottom: 4px;
`;

const PlatformHint = styled.span`
  font-size: 13px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.6;
`;

const Divider = styled.hr`
  width: 100%;
  max-width: 400px;
  border: none;
  border-top: 1px solid ${({ theme }: any) => theme.neutral3}33;
  margin: 8px 0 24px;
`;

const LeagueList = styled.div`
  width: 100%;
  max-width: 400px;
`;

const LeagueItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }: any) => theme.background};
  border: 1px solid ${({ theme }: any) => theme.neutral3}44;
  border-radius: 10px;
  padding: 12px 15px;
  margin: 8px 0;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }: any) => theme.neutral3};
  }
`;

const LeaguePhoto = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
`;

const LeagueInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  min-width: 0;
`;

const LeagueName = styled.span`
  font-size: 15px;
  color: ${({ theme }: any) => theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const LeagueMeta = styled.span`
  font-size: 12px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.5;
  text-transform: uppercase;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #bc293d;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  margin-left: 8px;
  flex-shrink: 0;

  &:hover {
    opacity: 0.7;
  }
`;

const SignInHint = styled.p`
  font-size: 13px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.5;
  margin-top: 16px;
  line-height: 1.5;
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function LeaguePicker(): React.ReactElement {
  const navigate = useNavigate();
  const { currentUser, savedLeagues, removeLeague } = useAuth();

  /**
   * Select a saved league: store in localStorage, dispatch the leagueChange
   * event so other components react, then navigate to the league home page.
   */
  const handleSelectLeague = (league: SavedLeague): void => {
    localStorage.setItem("selectedLeagueId", league.id);
    window.dispatchEvent(new Event("leagueChange"));
    navigate(`/home/${league.id}`);
  };

  /**
   * Remove a saved league from the user's Firestore profile.
   * Stops event propagation so the click doesn't also trigger selection.
   */
  const handleRemoveLeague = async (e: React.MouseEvent, leagueId: string): Promise<void> => {
    e.stopPropagation();
    await removeLeague(leagueId);
  };

  return (
    <Container>
      <Title>The Offensive Line</Title>
      <Subtitle>
        Weekly fantasy football recaps for any league. Pick your platform to get started — no
        account required.
      </Subtitle>

      {/* --- Saved leagues (signed-in users only) --- */}
      {currentUser && savedLeagues.length > 0 && (
        <>
          <SectionLabel>Your Leagues</SectionLabel>
          <LeagueList>
            {savedLeagues.map((league) => (
              <LeagueItem key={league.id} onClick={() => handleSelectLeague(league)}>
                {league.avatar && <LeaguePhoto src={league.avatar} alt={league.name} />}
                <LeagueInfo>
                  <LeagueName>
                    {league.name} ({league.year})
                  </LeagueName>
                  <LeagueMeta>{league.type}</LeagueMeta>
                </LeagueInfo>
                <RemoveButton
                  onClick={(e) => handleRemoveLeague(e, league.id)}
                  title="Remove league"
                >
                  ×
                </RemoveButton>
              </LeagueItem>
            ))}
          </LeagueList>
          <Divider />
        </>
      )}

      {/* --- Platform picker --- */}
      <SectionLabel>
        {currentUser && savedLeagues.length > 0 ? "Add a League" : "Browse a League"}
      </SectionLabel>
      <PlatformGrid>
        <PlatformCard onClick={() => navigate("/sleeper-login")}>
          <PlatformIcon>😴</PlatformIcon>
          <PlatformName>Sleeper</PlatformName>
          <PlatformHint>Enter username or league ID</PlatformHint>
        </PlatformCard>
        <PlatformCard onClick={() => navigate("/espn-login")}>
          <PlatformIcon>🏈</PlatformIcon>
          <PlatformName>ESPN</PlatformName>
          <PlatformHint>Enter league ID</PlatformHint>
        </PlatformCard>
        <PlatformCard onClick={() => navigate("/yahoo-login")}>
          <PlatformIcon>🟣</PlatformIcon>
          <PlatformName>Yahoo</PlatformName>
          <PlatformHint>Sign in with Yahoo</PlatformHint>
        </PlatformCard>
      </PlatformGrid>

      {/* --- Sign-in nudge for anonymous users --- */}
      {!currentUser && (
        <SignInHint>
          Want to save your leagues?{" "}
          <a href="/profile" style={{ color: "inherit", textDecoration: "underline" }}>
            Sign in with Google
          </a>{" "}
          to keep them synced across devices.
        </SignInHint>
      )}
    </Container>
  );
}

export default LeaguePicker;
