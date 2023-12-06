import React from 'react';
import AwardsTable, { ArticleHeader, ArticleSubheader, BarChart, StackedHistogram, WeeklyScoringChart, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, PowerRankingsTable, PlayoffTable, AltLeaderboardTable } from '../../components/newsStyles';
import awardsData from './awardsTable.json';
import efficiencyData from './efficiencyData.json';
import matchupData from './matchupData.json';
import starterData from './starters.json';
import motwHistoryData from './motwtable.json';
import shotsDistData from './shotsDist.json';
import leaderboardData from './leaderboard.json';
import powerRankingsData from './powerRankings.json';
import playoffData from './playoffTable.json';
import medianLbData from './medianLb.json';
import bestBallLbData from './bestBallLb.json';

export const newsDate = '2023-11-09';

export const articles = [
    {
        id: 1,
        title: 'Article 1',
        content: (
            <div>
                <ArticleHeader>Awards and Recap</ArticleHeader>
                <ArticleSubheader>Week 9</ArticleSubheader>
                <AwardsTable awardsData={awardsData} />
                <p>
                    This is the content of Article 1. It can include text, images, and other elements.
                </p>
                <BarChart chartData={efficiencyData} />
                <StackedHistogram chartData={matchupData} />
                <WeeklyScoringChart chartData={matchupData} />
            </div>
        ),
    },
    {
        id: 2,
        title: 'Article 2',
        content: (
            <div>
                <ArticleHeader>This is the Title of Article 2</ArticleHeader>
                <MatchupPlot data={starterData} matchupId={1} />
                <p>
                    This is the content of Article 2. It can include text, images, and other elements.
                </p>
                <MatchupPlot data={starterData} matchupId={2} />
            </div>)
    },
    {
        id: 3,
        title: 'Article 3',
        content: (
            <div>
                <ArticleHeader>This is the Title of Article 3</ArticleHeader>
                <MotwTable motwHistoryData={motwHistoryData} />
                <p>
                    This is the content of Article 3. It can include text, images, and other elements.
                </p>
                <ShotsDistributionChart chartData={shotsDistData} />
            </div>
        ),
    },
    {
        id: 4,
        title: 'Article 4',
        content: (
            <div>
                <ArticleHeader>This is the Title of Article 4</ArticleHeader>
                <LeaderboardTable leaderboardData={leaderboardData} />
                <PfPaScatter leaderboardData={leaderboardData} />
                <PowerRankingsTable powerRankingsData={powerRankingsData} />
                <PlayoffTable playoffData={playoffData} />
            </div>
        ),
    },
    {
        id: 5,
        title: 'Article 5',
        content: (
            <div>
                <ArticleHeader>This is the Title of Article 5</ArticleHeader>
                <AltLeaderboardTable data={medianLbData} />
                <AltLeaderboardTable data={bestBallLbData} />
            </div>
        ),
    },
];
