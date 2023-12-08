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

const GridItem = styled.button`
    background-color: #7E6551;
    border: 1px solid #7E6551;
    border-radius: 5px;
    padding: 30px;
    cursor: pointer;
    text-align: center;
    color: #fff; /* Set the desired text color */
`;

function Home() {
    const navigate = useNavigate();

    const newsletterIssues = [
        '2023 Week 13',
    ]

    const handleNavigate = (issue) => {
        navigate(`/newsletterPage`, { state: { issue } });
        console.log({ issue });
    };

    return (
        <GridContainer>
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
