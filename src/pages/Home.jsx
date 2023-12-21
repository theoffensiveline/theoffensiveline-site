import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;
    padding: 20px;
`;

const RecentGridItem = styled.button`
    background-color: #20a4f3;
    border: 1px solid #20a4f3;
    border-radius: 50px;
    padding: 20px;
    cursor: pointer;
    text-align: center;
    color: #ECECDF; /* Set the desired text color */
`;

const GridItem = styled.button`
    background-color: #ECECDF;
    border: 1px solid #20a4f3;
    border-radius: 50px;
    padding: 20px;
    cursor: pointer;
    text-align: center;
    color: #20a4f3; /* Set the desired text color */
`;

function Home() {
    const navigate = useNavigate();

    const mostRecentIssue = [
        '2023 Week 15'
    ]

    const newsletterIssues = [
        '2023 Week 14',
        '2023 Week 13',
    ]

    const handleNavigate = (issue) => {
        navigate(`/newsletter`, { state: { issue } });
        console.log({ issue });
    };

    return (
        <GridContainer>
            {mostRecentIssue.map((issue) => (
                <RecentGridItem key={issue} onClick={() => handleNavigate(issue)}>
                    {issue}
                </RecentGridItem>
            ))}
            {newsletterIssues.map((issue) => (
                <GridItem key={issue} onClick={() => handleNavigate(issue)}>
                    {issue}
                </GridItem>
            ))}
            <GridItem onClick={() => navigate("/news")}>
                Older News
            </GridItem>
        </GridContainer>
    );
}

export default Home;
