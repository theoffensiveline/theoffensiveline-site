import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getRosters, getUsers } from '../utils/api/FantasyAPI';
import type { Roster, User } from '../types/sleeperTypes';
import { sleeperPlayers, getPlayerPhoto, sortPlayersByPosition } from '../utils/playerUtils';
import {
  Container,
  Card,
  PlayerPhoto,
  PlayerPosition,
  PlayerName,
  PlayerRow
} from '../components/shared/PlayerComponents';
import {
  TeamAvatar,
  TeamHeader,
  TeamInfo
} from '../components/shared/PageComponents';

const RosterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const RosterCard = styled(Card)`
`;

const RecordText = styled.p`
  color: ${({ theme }) => theme.text};
  margin: 10px 0;
`;

interface RosterWithUser extends Roster {
  user?: User;
}

const LeagueRosters: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [rosters, setRosters] = useState<RosterWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRostersAndUsers = async () => {
      if (!leagueId) {
        setError('League ID is required');
        setLoading(false);
        return;
      }

      try {
        const [rostersData, usersData] = await Promise.all([
          getRosters(leagueId),
          getUsers(leagueId)
        ]);

        // Combine roster data with user data
        const rostersWithUsers = rostersData.map(roster => ({
          ...roster,
          user: usersData.find(user => user.user_id === roster.owner_id)
        }));

        setRosters(rostersWithUsers);
      } catch (err) {
        setError('Failed to fetch roster data');
        console.error('Error fetching roster data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRostersAndUsers();
  }, [leagueId]);

  if (loading) {
    return <Container>Loading rosters...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  return (
    <Container>
      <h2>League Rosters</h2>
      <RosterGrid>
        {rosters.map((roster) => (
          <RosterCard key={roster.roster_id}>
            <TeamHeader>
              <TeamAvatar 
                src={roster.user?.metadata?.avatar || roster.user?.avatar || undefined}
                alt={`${roster.user?.display_name} Avatar`} 
              />
              <TeamInfo>
                <h3>{roster.user?.metadata?.team_name || roster.user?.display_name}</h3>
                <p>{roster.user?.display_name}</p>
              </TeamInfo>
            </TeamHeader>
            <RecordText>
              Record: {roster.settings.wins}-{roster.settings.losses}
              {roster.settings.ties > 0 && `-${roster.settings.ties}`}
            </RecordText>
            {sortPlayersByPosition(roster.players || []).map((playerId) => {
              const position = sleeperPlayers[playerId]?.position || 'FLEX';
              return (
                <PlayerRow key={playerId}>
                  <PlayerPosition position={position}>{position}</PlayerPosition>
                  <PlayerPhoto
                    src={getPlayerPhoto(playerId)}
                    alt={sleeperPlayers[playerId]?.full_name || "Unknown Player"}
                  />
                  <PlayerName>{sleeperPlayers[playerId]?.full_name}</PlayerName>
                </PlayerRow>
              );
            })}
          </RosterCard>
        ))}
      </RosterGrid>
    </Container>
  );
};

export default LeagueRosters;
