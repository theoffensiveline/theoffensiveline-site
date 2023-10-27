import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// ugly af
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Adjust the number of columns as needed */
    gap: 10px; /* Adjust the gap between items */
    justify-content: center;
`;

// ugly af
const GridItem = styled.button`
    background-color: #f2f2f2; /* Background color for each button */
    border: 1px solid grey; /* Border color for each button */
    padding: 10px;
    cursor: pointer;
    text-align: center;
`;

function Home() {
    const navigate = useNavigate();
    const [newsletterIssues, setNewsletterIssues] = useState([]);

    useEffect(() => {
        // Dynamically import the issues from the newsletters folder
        const importIssues = async () => {
            try {
                const issuesContext = require.context('../newsletters', false, /\.jsx$/);
                const issues = issuesContext.keys().map((key) => key.replace('./', '').replace('.jsx', ''));
                setNewsletterIssues(issues);
            } catch (error) {
                console.error('Error loading newsletter issues:', error);
            }
        };

        importIssues();
    }, []);

    const handleNavigate = (issue) => {
        navigate(`/newsletterPage`, { state: { issue } });
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
