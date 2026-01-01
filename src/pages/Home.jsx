import { useNavigate, useParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { leagueIds } from '../components/constants/LeagueConstants';
import hotDogsData from '../data/hotDogs.json';
import { useCompletedWeeks } from '../hooks/useCompletedWeeks';

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
    white-space: pre-line;
    line-height: 1.4;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GridItem = styled.button`
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.newsBlue};
    border-radius: 50px;
    padding: 20px;
    cursor: pointer;
    text-align: center;
    color: ${({ theme }) => theme.newsBlue};
    white-space: pre-line;
    line-height: 1.4;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BannerImage = styled.img`
    width: 100%;

    display: block;
    margin-bottom: 10px;
`;

function Home() {
    const navigate = useNavigate();
    const { leagueId } = useParams();
    const theme = useTheme();

    const mainLeagueId = leagueIds.mainLeague
    const walterPicksLeagueId = leagueIds.walterPicks

    const isMainLeague = leagueId === mainLeagueId;

    const { completedWeeksDesc: recapWeekButtons } = useCompletedWeeks(leagueId, !isMainLeague);

    // Function to get MotW loser info for a newsletter issue
    const getMotWLoserInfo = (issueName) => {
        // Extract year and week from issue name (e.g., "2024 Week 15" -> year: 2024, week: 15)
        const weekMatch = issueName.match(/(\d{4})\s+Week\s+(\d+)/);
        if (!weekMatch) return null;

        const year = parseInt(weekMatch[1]);
        const week = parseInt(weekMatch[2]);

        // Find matching hotdog entry
        const hotdogEntry = hotDogsData.find(entry =>
            entry.year === year && entry.week === week
        );

        if (hotdogEntry) {
            return {
                loser: hotdogEntry.loser,
                count: hotdogEntry.count,
                type: hotdogEntry.type
            };
        }

        return null;
    };

    // Function to format button text with MotW info
    const formatIssueText = (issueName) => {
        const motwInfo = getMotWLoserInfo(issueName);
        if (motwInfo) {
            const typeText = motwInfo.type === 'hotdogs' ? 'hotdogs' : 'shots';
            return `${issueName}\n${motwInfo.loser} - ${motwInfo.count} ${typeText}`;
        }
        return issueName;
    };

    // Newsletter content for league ID '1253779168802377728'
    const newsletterContent = {
        mostRecentIssue: [
            'Hot Dog Tracker',
            '2025 Week 17',
        ],
        newsletterIssues: [
            '2025 Week 16',
            '2025 Week 15',
            '2025 Week 14',
            '2025 Week 13',
            '2025 Week 12',
            '2025 Week 11',
            '2025 Week 10',
            '2025 Week 9',
            '2025 Week 8',
            '2025 Week 7',
            '2025 Week 6',
            '2025 Week 5',
            '2025 Week 4',
            '2025 Week 3',
            '2025 Week 2',
            '2025 Week 1',
            '2025 Post Draft Recap',
            '2025 Draft Order',
            '2025 Draft Order Challenge Results',
            '2024 Season Recap',
            '2024 Week 17',
            '2024 Week 16',
            '2024 Week 15',
            '2024 Week 14',
            '2024 Week 13',
            '2024 Week 12',
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
            // '2023 Week 12',
        ]
    };

    // Walter Picks content for league ID '1223730601350135814'
    const walterPicksContent = {
        mostRecentIssue: [
            '2024 WP Week 4',
        ]
    };

    // Default content for all leagues
    const defaultContent = {
        sections: [
            'League Overview',
            'League History',
            'League Rosters',
            'Recent Activity',
        ]
    };

    // Select content based on league ID from URL params
    const content = leagueId === mainLeagueId ? newsletterContent :
        leagueId === walterPicksLeagueId ? walterPicksContent :
            { mostRecentIssue: [], newsletterIssues: [] };  // Empty newsletter content for other leagues

    const handleNavigate = (destination, isDefault = false) => {
        if (isDefault) {
            navigate(`/league/${leagueId}/${destination.toLowerCase().replace(' ', '-')}`);
        } else if (destination === 'Hot Dog Tracker') {
            navigate(`/league/${leagueId}/hot-dogs`);
        } else {
            navigate(`/newsletter/${leagueId}/${encodeURIComponent(destination)}`);
        }
    };

    const handleRecapNavigate = (week) => {
        navigate(`/league/${leagueId}/weekly-recap/${week}`);
    };

    return (
        <div>
            {leagueId === mainLeagueId && (
                <BannerImage src="/banner_logo.png" alt="Banner Logo" />
            )}
            <GridContainer>
                {/* Default league sections shown for all leagues */}
                {defaultContent.sections.map((section) => (
                    <GridItem key={section} onClick={() => handleNavigate(section, true)}>
                        {section}
                    </GridItem>
                ))}
                {/* Add a divider between sections */}
                <div style={{ gridColumn: 'span 2', height: '1px', backgroundColor: theme.newsBlue, margin: '20px 0' }} />
                {/* Weekly recap links for non-main leagues */}
                {!isMainLeague && recapWeekButtons.length > 0 && (
                    <>
                        {recapWeekButtons.map((week) => (
                            <GridItem key={`recap-${week}`} onClick={() => handleRecapNavigate(week)}>
                                {`Week ${week} Recap`}
                            </GridItem>
                        ))}
                        <div style={{ gridColumn: 'span 2', height: '1px', backgroundColor: theme.newsBlue, margin: '20px 0' }} />
                    </>
                )}
                {/* Newsletter content if available */}
                {content.mostRecentIssue.length > 0 && content.mostRecentIssue.map((issue) => (
                    <RecentGridItem key={issue} onClick={() => handleNavigate(issue)}>
                        {formatIssueText(issue)}
                    </RecentGridItem>
                ))}
                {content.newsletterIssues?.map((issue) => (
                    <GridItem key={issue} onClick={() => handleNavigate(issue)}>
                        {formatIssueText(issue)}
                    </GridItem>
                ))}
                {(content.mostRecentIssue.length > 0 || content.newsletterIssues?.length > 0) && (
                    <GridItem onClick={() => navigate("/news")}>
                        Older News
                    </GridItem>
                )}
            </GridContainer>
        </div>
    );
}

export default Home;
