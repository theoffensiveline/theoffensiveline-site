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
import { useLeagueDoc } from "../hooks/useLeagueDoc";
import LeagueAvatar from "../components/shared/LeagueAvatar";
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
  padding: 16px 18px;
  margin: 8px 0;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }: any) => theme.neutral3};
  }
`;

const LeaguePhoto = styled(LeagueAvatar)`
  margin-right: 12px;
`;

const LeagueInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  min-width: 0;
  text-align: left;
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

const NewslettersButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }: any) => theme.newsBlue}66;
  color: ${({ theme }: any) => theme.newsBlue};
  border-radius: 14px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }: any) => theme.newsBlue};
  }
`;

const EditorStatus = styled.span<{ $isYou?: boolean }>`
  font-size: 12px;
  color: ${({ theme, $isYou }: any) => ($isYou ? theme.newsBlue : theme.text)};
  opacity: ${({ $isYou }: { $isYou?: boolean }) => ($isYou ? 1 : 0.5)};
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

/** Map platform type to its emoji icon (matches the platform picker cards). */
function platformIcon(type: string): string {
  switch (type) {
    case "sleeper":
      return "😴";
    case "espn":
      return "🏈";
    case "yahoo":
      return "🟣";
    default:
      return "🏟️";
  }
}

/**
 * Editor status line for a saved league card: unclaimed / claimed / yours.
 * A missing league doc means no one has visited the league signed-in yet,
 * which is equivalent to the editor role being unclaimed.
 */
function EditorStatusLine({ leagueId }: { leagueId: string }): React.ReactElement | null {
  const { currentUser } = useAuth();
  const { data: leagueDoc, isLoading } = useLeagueDoc(leagueId);

  if (isLoading) return null;
  if (!leagueDoc || leagueDoc.editorUid === null) {
    return <EditorStatus>Editor role unclaimed</EditorStatus>;
  }
  if (currentUser && leagueDoc.editorUid === currentUser.uid) {
    return <EditorStatus $isYou>You're the editor</EditorStatus>;
  }
  return <EditorStatus>Editor claimed</EditorStatus>;
}

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
                <LeaguePhoto src={league.avatar} alt={league.name} />
                <LeagueInfo>
                  <LeagueName>
                    {league.name} ({league.year})
                  </LeagueName>
                  <LeagueMeta>
                    {platformIcon(league.type)} {league.type}
                  </LeagueMeta>
                  <EditorStatusLine leagueId={league.id} />
                </LeagueInfo>
                <NewslettersButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/league/${league.id}/newsletters`);
                  }}
                  title="Newsletters for this league"
                >
                  Newsletters
                </NewslettersButton>
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
