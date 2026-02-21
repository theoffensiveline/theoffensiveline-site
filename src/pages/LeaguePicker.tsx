/**
 * LeaguePicker.tsx — Central page for selecting or adding a fantasy league.
 *
 * Shows the user's saved leagues (from Firestore if logged in) and provides
 * buttons to add a new Sleeper or ESPN league. Selecting a league stores the
 * ID in localStorage, dispatches the leagueChange event, and navigates to home.
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import type { SavedLeague } from "../utils/survivorUtils";

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

const LeagueItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }: { theme: { background: string; neutral3: string } }) =>
    theme.background};
  border: 1px solid
    ${({ theme }: { theme: { background: string; neutral3: string } }) => theme.neutral3};
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  cursor: pointer;
  width: 350px;
  justify-content: space-between;

  &:hover {
    opacity: 0.85;
  }
`;

const LeaguePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const LeagueName = styled.span`
  font-size: 16px;
  color: ${({ theme }: { theme: { text: string } }) => theme.text};
  flex-grow: 1;
  text-align: left;
`;

const LeagueMeta = styled.span`
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }: { theme: { neutral3: string; background: string } }) =>
    theme.neutral3};
  border: none;
  border-radius: 5px;
  color: ${({ theme }: { theme: { neutral3: string; background: string } }) => theme.background};
  cursor: pointer;
  margin: 8px;
  font-size: 16px;

  &:hover {
    opacity: 0.85;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #bc293d;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  margin-left: 8px;

  &:hover {
    opacity: 0.7;
  }
`;

const Divider = styled.hr`
  width: 300px;
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

/**
 * League picker page component.
 * Shows saved leagues and options to add new Sleeper or ESPN leagues.
 */
function LeaguePicker(): React.ReactElement {
  const navigate = useNavigate();
  const { currentUser, savedLeagues, removeLeague } = useAuth();

  /**
   * Select a saved league: store in localStorage, dispatch event, navigate.
   */
  const handleSelectLeague = (league: SavedLeague): void => {
    localStorage.setItem("selectedLeagueId", league.id);
    window.dispatchEvent(new Event("leagueChange"));
    navigate(`/home/${league.id}`);
  };

  /**
   * Remove a saved league from the user's profile.
   */
  const handleRemoveLeague = async (e: React.MouseEvent, leagueId: string): Promise<void> => {
    e.stopPropagation();
    await removeLeague(leagueId);
  };

  return (
    <Container>
      <h1>Select a League</h1>

      {currentUser && savedLeagues.length > 0 && (
        <div>
          <h3>Your Leagues</h3>
          {savedLeagues.map((league) => (
            <LeagueItem key={league.id} onClick={() => handleSelectLeague(league)}>
              {league.avatar && <LeaguePhoto src={league.avatar} alt={league.name} />}
              <LeagueName>
                {league.name} ({league.year})
              </LeagueName>
              <LeagueMeta>{league.type}</LeagueMeta>
              <RemoveButton onClick={(e) => handleRemoveLeague(e, league.id)} title="Remove league">
                ×
              </RemoveButton>
            </LeagueItem>
          ))}
          <Divider />
        </div>
      )}

      <h3>Add a League</h3>
      <Button onClick={() => navigate("/sleeper-login")}>Add Sleeper League</Button>
      <Button onClick={() => navigate("/espn-login")}>Add ESPN League</Button>
    </Container>
  );
}

export default LeaguePicker;
