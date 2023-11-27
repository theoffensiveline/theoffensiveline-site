import React from 'react';
import AwardsTable, { ArticleImage, ArticleHeader, ImageWrapper, ArticleSubheader, BarChart, StackedHistogram, WeeklyScoringChart, MatchupPlot, MotwTable } from '../../components/newsStyles';
import awardsData from './awardsTable.json';
import efficiencyData from './efficiencyData.json';
import matchupData from './matchupData.json';
import starterData from './starters.json';
import motwHistoryData from './motwtable.json';

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
            </div>
        ),
    },
];
