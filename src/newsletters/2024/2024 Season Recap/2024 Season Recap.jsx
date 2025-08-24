import React, { useContext, useState } from 'react';
import { RecapPositionTable, KickerDefenseChart, WorstStartSitsTable, FreeAgentTable, DualTableViewer, MotwRecapTable, TeamDropdown, BestWorstGameRecapTable, BestWorstTeamRecapTable, BlowoutRecapTable, TransactionRecapTable, TradeRecapTable, StartSitRecapTable, StyledSlider, MostTransactedPlayersTable } from '../../../components/newsletters/recapStyles';
import { ArticleHeader, ArticleSubheader, ArticleCaption } from '../../../components/newsletters/newsStyles';
import starterData from './startersPPG.json';
import kickerDefenseData from './kickerDef.json';
import bestBallBenchData from './bestBallBench.json';
import freeAgentData from './freeAgents.json';
import tradeData from './trades.json';
import recapData from './recapData.json';
import awardsData from './awards.json';
import transactionData from './mostTransacted.json';
import { TeamContext } from '../../../pages/Newsletter';
import { AwardsGridV2 } from '../../../components/newsletters/newsStyles';

export const newsDate = '2025-01-15';

const AwardsArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards</ArticleHeader>
            <ArticleSubheader>2024 Season Awards</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
        </div>
    );
};

const FirstTeamRecapArticle = () => {
    const { selectedTeam, setSelectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Want a more personalized recap?</ArticleHeader>
            <ArticleSubheader>Select Your Team From The Dropdown</ArticleSubheader>
            <TeamDropdown data={recapData} onSelectTeam={setSelectedTeam} />
            <ArticleCaption>Tip: Most of the tables below can be sorted by clicking the header you'd like to sort by.</ArticleCaption>
            <ArticleSubheader>2024 Matchup of the Week Summary</ArticleSubheader>
            <MotwRecapTable data={recapData} selectedTeam={selectedTeam} />
        </div>
    )
};

const TeamPerformanceOne = () => {
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Team Performance Recap</ArticleHeader>
            <ArticleSubheader>Best/Worst Win/Loss</ArticleSubheader>
            <BestWorstGameRecapTable data={recapData} selectedTeam={selectedTeam} />
            <ArticleSubheader>Best/Worst On The Week</ArticleSubheader>
            <BestWorstTeamRecapTable data={recapData} selectedTeam={selectedTeam} />
        </div>
    )
}

const TeamPerformanceTwo = () => {
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Team Performance Recap Continued</ArticleHeader>
            <ArticleSubheader>Best/Worst Win/Loss</ArticleSubheader>
            <ArticleCaption>Blowout is defined as a point differential &gt; 40. Close game is defined as a point differential &lt; 10.</ArticleCaption>
            <BlowoutRecapTable data={recapData} selectedTeam={selectedTeam} />
        </div>
    )
}

const RosterDecisions = () => {
    const { selectedTeam } = useContext(TeamContext);

    const [filteredTeam, setFilteredTeam] = useState(null);
    const [showCount, setShowCount] = useState(12);

    return (
        <div>
            <ArticleHeader>Roster Decisions</ArticleHeader>
            <ArticleSubheader>Team Management</ArticleSubheader>
            <TransactionRecapTable data={recapData} selectedTeam={selectedTeam} />
            <ArticleSubheader>Free Agents</ArticleSubheader>
            <label
                style={{
                    display: 'block',
                    fontSize: '12px',
                    textAlign: 'center',
                }}
            >
                Team to show:
            </label>
            <TeamDropdown data={recapData} onSelectTeam={setFilteredTeam} />
            <label
                style={{
                    display: 'block',
                    fontSize: '12px',
                    textAlign: 'center',
                }}
            >
                Rows to show: {showCount}
            </label>
            {/* Use a slider to set the showCount value */}
            <StyledSlider
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
                min="1"
                max="50"  // Set the maximum value based on your requirement
            />
            <FreeAgentTable
                data={filteredTeam
                    ? freeAgentData.filter(item => item.team_name === filteredTeam)
                    : freeAgentData}
                selectedTeam={selectedTeam}
                showCount={showCount}
            />
        </div>
    )
}

const TradeRecapArticle = () => {
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Trade Recap</ArticleHeader>
            <ArticleSubheader>Trade Summary</ArticleSubheader>
            <TradeRecapTable data={recapData} selectedTeam={selectedTeam} />
            <ArticleSubheader>Individual Trade Recap</ArticleSubheader>
            <DualTableViewer data={tradeData} selectedTeam={selectedTeam}></DualTableViewer>
        </div>
    )
}

const MostTransactedPlayers = () => {
    const [showCount, setShowCount] = useState(12);

    return (
        <div>
            <ArticleHeader>Slut Meter</ArticleHeader>
            <ArticleSubheader>Most Transacted Players</ArticleSubheader>
            <label
                style={{
                    display: 'block',
                    fontSize: '12px',
                    textAlign: 'center',
                }}
            >
                Rows to show: {showCount}
            </label>
            <StyledSlider
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
                min="1"
                max="50"  // Set the maximum value based on your requirement
            />
            <MostTransactedPlayersTable data={transactionData} showCount={showCount} />
        </div>
    )
}

const StartSitDecisions = () => {
    const { selectedTeam } = useContext(TeamContext);

    const [filteredTeam, setFilteredTeam] = useState(null);
    const [showCount, setShowCount] = useState(20);

    return (
        <div>
            <ArticleHeader>Start/Sit Decision Recap</ArticleHeader>
            <ArticleSubheader>Start/Sit Decisions</ArticleSubheader>
            <StartSitRecapTable data={recapData} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst Start Sits</ArticleSubheader>
            <label
                style={{
                    display: 'block',
                    fontSize: '12px',
                    textAlign: 'center',
                }}
            >
                Team to show:
            </label>
            <TeamDropdown data={recapData} onSelectTeam={setFilteredTeam} />
            <label
                style={{
                    display: 'block',
                    fontSize: '12px',
                    textAlign: 'center',
                }}
            >
                Rows to show: {showCount}
            </label>
            {/* Use a slider to set the showCount value */}
            <StyledSlider
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
                min="1"
                max="50"  // Set the maximum value based on your requirement
            />
            <WorstStartSitsTable
                bestBallBenchData={
                    filteredTeam
                        ? bestBallBenchData.filter(item => item.team_name === filteredTeam)
                        : bestBallBenchData
                }
                selectedTeam={selectedTeam}
                filteredTeam={filteredTeam}
                showCount={showCount}
            />
        </div>
    )
}

const QBArticle = () => {
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Top Players By Position - Quarterback</ArticleHeader>
            <ArticleSubheader>Best QBs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'QB' && item.games_played >= 8 && item.ppg >= 19)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst QBs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'QB' && item.games_played >= 8 && item.ppg < 19).reverse()} selectedTeam={selectedTeam} />
            <ArticleSubheader>Best QB Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'QB' && item.games_played < 8 && item.ppg >= 19)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst QB Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'QB' && item.games_played < 8 && item.ppg < 15).reverse()} selectedTeam={selectedTeam} />
        </div >
    )
}

const RBArticle = () => {
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Top Players By Position - Runningback</ArticleHeader>
            <ArticleSubheader>Best RBs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'RB' && item.games_played >= 8 && item.ppg >= 16)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst RBs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'RB' && item.games_played >= 8 && item.ppg < 16).reverse()} selectedTeam={selectedTeam} />
            <ArticleSubheader>Best RB Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'RB' && item.games_played < 8 && item.ppg >= 16)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst RB Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'RB' && item.games_played < 8 && item.ppg < 5).reverse()} selectedTeam={selectedTeam} />
        </div >
    )
}

const WRArticle = () => {
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Top Players By Position - Wide Receiver</ArticleHeader>
            <ArticleSubheader>Best WRs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'WR' && item.games_played >= 8 && item.ppg >= 16)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst WRs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'WR' && item.games_played >= 8 && item.ppg <= 14).reverse()} selectedTeam={selectedTeam} />
            <ArticleSubheader>Best WR Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'WR' && item.games_played < 8 && item.ppg >= 16)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst WR Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'WR' && item.games_played < 8 && item.ppg < 6).reverse()} selectedTeam={selectedTeam} />
        </div >
    )
}

const TEArticle = () => {
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Top Players By Position - Tight End</ArticleHeader>
            <ArticleSubheader>Best TEs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'TE' && item.games_played >= 8 && item.ppg >= 12)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst TEs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'TE' && item.games_played >= 8 && item.ppg < 12).reverse()} selectedTeam={selectedTeam} />
            <ArticleSubheader>Best TE Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'TE' && item.games_played < 8 && item.ppg >= 12)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst TE Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'TE' && item.games_played < 8 && item.ppg < 5).reverse()} selectedTeam={selectedTeam} />
        </div >
    )
}

const KArticle = () => {
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Top Players By Position - Kicker</ArticleHeader>
            <ArticleSubheader>Best Ks All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'K' && item.games_played >= 8 && item.ppg >= 10)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst Ks All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'K' && item.games_played >= 8 && item.ppg < 10).reverse()} selectedTeam={selectedTeam} />
            <ArticleSubheader>Best K Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'K' && item.games_played < 8 && item.ppg >= 10)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst K Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'K' && item.games_played < 8 && item.ppg < 7).reverse()} selectedTeam={selectedTeam} />
            <ArticleSubheader>Rent or Own Kicker?</ArticleSubheader>
            <KickerDefenseChart data={kickerDefenseData.filter(item => item.position === 'K')}></KickerDefenseChart>
        </div>
    )
}

const DEFArticle = () => {
    const { selectedTeam } = useContext(TeamContext);

    return (
        <div>
            <ArticleHeader>Top Players By Position - Defense</ArticleHeader>
            <ArticleSubheader>Best DEFs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'DEF' && item.games_played >= 8 && item.ppg >= 8)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst DEFs All Season Long</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'DEF' && item.games_played >= 8 && item.ppg < 8).reverse()} selectedTeam={selectedTeam} />
            <ArticleSubheader>Best DEF Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'DEF' && item.games_played < 8 && item.ppg >= 11)} selectedTeam={selectedTeam} />
            <ArticleSubheader>Worst DEF Rentals</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'DEF' && item.games_played < 8 && item.ppg < 4).reverse()} selectedTeam={selectedTeam} />
            <ArticleSubheader>Rent or Own Defense?</ArticleSubheader>
            <KickerDefenseChart data={kickerDefenseData.filter(item => item.position === 'DEF')}></KickerDefenseChart>
        </div >
    )
}

const YourStartersByPosition = () => {
    const { selectedTeam, setSelectedTeam } = useState(TeamContext);

    return (
        <div>
            <ArticleHeader>Your Starters By Position</ArticleHeader>
            <TeamDropdown data={recapData}
                selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
            <ArticleSubheader>QB</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'QB' && item.team_name === selectedTeam)} selectedTeam={selectedTeam} />
            <ArticleSubheader>RB</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'RB' && item.team_name === selectedTeam)} selectedTeam={selectedTeam} />
            <ArticleSubheader>WR</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'WR' && item.team_name === selectedTeam)} selectedTeam={selectedTeam} />
            <ArticleSubheader>TE</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'TE' && item.team_name === selectedTeam)} selectedTeam={selectedTeam} />
            <ArticleSubheader>K</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'K' && item.team_name === selectedTeam)} selectedTeam={selectedTeam} />
            <ArticleSubheader>DEF</ArticleSubheader>
            <RecapPositionTable data={starterData.filter(item => item.position === 'DEF' && item.team_name === selectedTeam)} selectedTeam={selectedTeam} />
        </div>
    )
}

const ThankYouArticle = () => {
    return (
        <div>
            <ArticleHeader>Thank you for reading!</ArticleHeader>
            <p>Thank you for reading the 2024 Season Recap. We hope you enjoyed it, and we are looking forward to next season's shenanigans.</p>
        </div>
    )
}

export const articles = [
    {
        id: 1,
        content: AwardsArticle,
    },
    {
        id: 2,
        content: FirstTeamRecapArticle,
    },
    {
        id: 3,
        content: TeamPerformanceOne,
    },
    {
        id: 4,
        content: TeamPerformanceTwo,
    },
    {
        id: 5,
        content: RosterDecisions,
    },
    {
        id: 6,
        content: TradeRecapArticle,
    },
    {
        id: 7,
        content: MostTransactedPlayers,
    },
    {
        id: 8,
        content: StartSitDecisions,
    },
    {
        id: 9,
        content: QBArticle,
    },
    {
        id: 10,
        content: RBArticle,
    },
    {
        id: 11,
        content: WRArticle,
    },
    {
        id: 12,
        content: TEArticle,
    },
    {
        id: 13,
        content: KArticle,
    },
    {
        id: 14,
        content: DEFArticle,
    },
    {
        id: 15,
        content: YourStartersByPosition,
    },
    {
        id: 16,
        content: ThankYouArticle,
    }
];
