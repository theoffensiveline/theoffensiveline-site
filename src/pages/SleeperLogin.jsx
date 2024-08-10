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
    background-color: #20a4f3;
    border: none;
    border-radius: 5px;
    color: #ECECDF;
    cursor: pointer;
`;

const LeagueItem = styled.div`
    display: flex;
    align-items: center;
    background-color: #ECECDF;
    border: 1px solid #20a4f3;
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
    color: #20a4f3;
    flex-grow: 1;
`;

function SleeperLogin() {
    const [username, setUsername] = useState('');
    const [leagues, setLeagues] = useState([]);
    const navigate = useNavigate();

    // Load the stored username from localStorage when the component mounts
    useEffect(() => {
        const storedUsername = localStorage.getItem('sleeperUsername');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleUsernameSubmit = async () => {
        // Save the username to localStorage
        localStorage.setItem('sleeperUsername', username);

        // Query the Sleeper API to get leagues for the username
        try {
            const userResponse = await fetch(`https://api.sleeper.app/v1/user/${username}`);
            const userData = await userResponse.json();
            const userId = userData.user_id;
            console.log(userId);
            const response = await fetch(`https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2024`);
            const data = await response.json();
            console.log(data);
            setLeagues(data);
        } catch (error) {
            console.error("Error fetching leagues:", error);
        }
    };

    const handleLeagueSelect = (league) => {
        if (league.league_id === '1124831356770058240') {
            navigate('/home', { state: { league } });
        } else {
            navigate('/coming-soon', { state: { league } });
        }
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
            <Button onClick={handleUsernameSubmit}>Submit</Button>

            {leagues.length > 0 && (
                <div>
                    <h2>Select a League</h2>
                    {leagues.map((league) => (
                        <LeagueItem key={league.league_id} onClick={() => handleLeagueSelect(league)}>
                            <LeaguePhoto src={league.avatar ? `https://sleepercdn.com/avatars/${league.avatar}` : 'default-avatar.png'} alt={league.name} />
                            <LeagueName>{league.name}</LeagueName>
                        </LeagueItem>
                    ))}
                </div>
            )}
        </Container>
    );
}

export default SleeperLogin;