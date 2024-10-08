import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ColorConstants } from '../components/constants/ColorConstants';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;
    padding: 20px;
`;

const RecentGridItem = styled.button`
    background-color: ${ColorConstants.newsBlue};
    border: 1px solid ${ColorConstants.newsBlue};
    border-radius: 50px;
    padding: 20px;
    cursor: pointer;
    text-align: center;
    color: ${ColorConstants.background}; /* Set the desired text color */
`;

const GridItem = styled.button`
    background-color: ${ColorConstants.background};
    border: 1px solid ${ColorConstants.newsBlue};
    border-radius: 50px;
    padding: 20px;
    cursor: pointer;
    text-align: center;
    color: ${ColorConstants.newsBlue}; /* Set the desired text color */
`;

function WalterPicksHome() {
    const navigate = useNavigate();

    const mostRecentIssue = [
        '2024 WP Week 4',
    ]

    const newsletterIssues = [
        // '2024 Week 3',
        // '2024 Week 2',
        // '2024 Week 1',
        // '2024 Preseason',
        // '2024 Offseason',
        // '2023 Season Recap',
        // '2023 Week 17',
        // '2023 Week 16',
        // '2023 Week 15',
        // '2023 Week 14',
        // '2023 Week 13',
    ]

    const handleNavigate = (issue) => {
        navigate(`/newsletterWalterPicks`, { state: { issue } });
        console.log({ issue });
    };

    return (
        <div>
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
            </GridContainer>
        </div>
    );
}

export default WalterPicksHome;
