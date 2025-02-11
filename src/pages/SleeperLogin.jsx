import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    color:${({ theme }) => theme.background};
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

const LeaguePhoto = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
`;

const LeagueName = styled.span`
    font-size: 18px;
    color: ${({ theme }) => theme.text};
    flex-grow: 1;
`;

function SleeperLogin() {
    const [username, setUsername] = useState('');
    const [leagues, setLeagues] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('selectedLeagueId');

        const storedUsername = localStorage.getItem('sleeperUsername');
        if (storedUsername) {
            setUsername(storedUsername);
            // Check for cached leagues
            const cachedLeagues = localStorage.getItem(`leagues_${storedUsername}`);
            if (cachedLeagues) {
                setLeagues(JSON.parse(cachedLeagues));
                setHasSubmitted(true);
            }
        }
    }, [navigate]);

    const handleUsernameSubmit = async () => {
        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 3000);

        localStorage.setItem('sleeperUsername', username);

        try {
            const userResponse = await fetch(`https://api.sleeper.app/v1/user/${username}`);
            const userData = await userResponse.json();
            const userId = userData.user_id;
            const response = await fetch(`https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2024`);
            const data = await response.json();

            // Cache the results
            localStorage.setItem(`leagues_${username}`, JSON.stringify(data));

            setLeagues(data);
            setHasSubmitted(true);
        } catch (error) {
            console.error("Error fetching leagues:", error);
            setLeagues([]);
            setHasSubmitted(true);
        }
    };

    const handleLeagueSelect = (league) => {
        // First set the localStorage
        localStorage.setItem('selectedLeagueId', league.league_id);

        // Dispatch a custom event to notify other components
        window.dispatchEvent(new Event('leagueChange'));

        // Then navigate
        navigate(`/home/${league.league_id}`, { state: { league } });
    };

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
                {isButtonDisabled ? 'Please wait...' : 'Submit'}
            </Button>

            {hasSubmitted && leagues.length === 0 && (
                <div>
                    <h3>Are you sure {username} is your Sleeper username?</h3>
                </div>
            )}

            {leagues.length > 0 && (
                <div>
                    <h2>Select a League</h2>
                    {leagues.map((league) => (
                        <LeagueItem key={league.league_id} onClick={() => handleLeagueSelect(league)}>
                            {league.avatar && (
                                <LeaguePhoto
                                    src={`https://sleepercdn.com/avatars/${league.avatar}`}
                                    alt={league.name}
                                />
                            )}
                            <LeagueName>{league.name}</LeagueName>
                        </LeagueItem>
                    ))}
                </div>
            )}
        </Container>
    );
}

export default SleeperLogin;
