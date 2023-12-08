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
    background-color: #7D8491;
    border: 1px solid #2E2E2E;
    padding: 30px;
    cursor: pointer;
    text-align: center;
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
