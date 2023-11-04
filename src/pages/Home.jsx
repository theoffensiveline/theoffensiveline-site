import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-content: center;
`;

const GridItem = styled.button`
    background-color: #f2f2f2;
    border: 1px solid grey;
    padding: 10px;
    cursor: pointer;
    text-align: center;
`;

function Home() {
    const navigate = useNavigate();
    const [newsletterIssues, setNewsletterIssues] = useState([]);

    useEffect(() => {
        try {
            const context = require.context(
                '../newsletters',
                true,
                /\.jsx$/
            );

            const issues = context.keys().map((key) => {
                const parts = key.split('/');
                return parts[parts.length - 1].replace(/\.jsx$/, '');
            });

            setNewsletterIssues(issues);
        } catch (error) {
            console.error('Error loading newsletter issues:', error);
        }
    }, []); // Empty dependency array to run the effect once

    const handleNavigate = (issue) => {
        navigate(`/newsletterPage`, { state: { issue } });
        console.log({ issue })
    };

    return (
        <GridContainer>
            {newsletterIssues.map((issue) => (
                <GridItem
                    key={issue}
                    onClick={() => handleNavigate(issue)}
                >
                    Newsletter {issue}
                </GridItem>
            ))}
        </GridContainer>
    );
}

export default Home;
