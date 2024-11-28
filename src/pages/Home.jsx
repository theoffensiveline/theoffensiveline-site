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
    background-color: ${({ theme }) => theme.newsBlue};
    border: 1px solid ${({ theme }) => theme.newsBlue};
    border-radius: 50px;
    padding: 20px;
    cursor: pointer;
    text-align: center;
    color: ${({ theme }) => theme.background};
`;

const GridItem = styled.button`
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.newsBlue};
    border-radius: 50px;
    padding: 20px;
    cursor: pointer;
    text-align: center;
    color: ${({ theme }) => theme.newsBlue};
`;

const BannerImage = styled.img`
    width: 100%;
    display: block;
    margin-bottom: 10px;
`;

function Home() {
    const navigate = useNavigate();

    const mostRecentIssue = [
        '2024 Week 12',
    ]

    const newsletterIssues = [
        '2024 Week 11',
        '2024 Week 10',
        '2024 Week 9',
        '2024 Week 8',
        '2024 Week 7',
        '2024 Week 6',
        '2024 Week 5',
        '2024 Week 4',
        '2024 Week 3',
        '2024 Week 2',
        '2024 Week 1',
        '2024 Preseason',
        '2024 Offseason',
        '2023 Season Recap',
        '2023 Week 17',
        '2023 Week 16',
        '2023 Week 15',
        '2023 Week 14',
        '2023 Week 13',
    ]

    const handleNavigate = (issue) => {
        navigate(`/newsletter`, { state: { issue } });
        console.log({ issue });
    };

    return (
        <div>
            <BannerImage src="/banner_logo.png" alt="Banner Logo" />
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
        </div>
    );
}

export default Home;
