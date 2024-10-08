import { ArticleHeader, ArticleSubheader, StackedHistogram, MatchupPlot, LeaderboardTable, ArticleCaption, AwardsGridV2, WeeklyScoringChart, PowerRankingsTable } from '../../components/newsStyles';
import awardsData from './awardsTable.json';
// import bestBallLbData from './bestBallLb.json';
// import efficiencyData from './efficiencyData.json';
// import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
import medianLbData from './medianLb.json';
// import motwHistoryData from './motwTable.json';
// import playoffData from './playoffTable.json';
import powerRankingsData from './powerRankings.json';
// import scheduleData from './scheduleData.json';
// import shotsDistData from './shotsDist.json';
import starterData from './starters.json';
// import dangerTable from './dangerTable.json';
// import motwFuture from './motwFuture.png';

export const newsDate = '2024-10-07';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 4</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup #1</ArticleHeader>
            <ArticleSubheader>Why We're All Here</ArticleSubheader>
            <p>
                Trevor had two players put up 0 points this week, which was one reason he had the least amount of points of all 14 teams this week. Bo Nix, De'Von Achane, Cam Akers, and Justin Tucker didn't help much either. The only bright spots for this team were Jordan Love, Zack Moss, and CeeDee Lamb. Trevor drops to 2-6 this season.
            </p>
            <p>
                Samps was able to get an easy win against Trevor this week, with all of his players putting up a similar amount of points. The most points on his team came from Koo his kicker, who was the #1 kicker this week. Samps moves to 3-5 this season.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
        </div>
    )
}

const MatchupArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Matchup #2</ArticleHeader>
            <ArticleSubheader>Luke Started His Best Players</ArticleSubheader>
            <p>
                Luke was the top scorer this week, putting up 148.56 points. He was led by Stroud, his RB duo, and the top DEF this week in SF. His defense was his leading scorer. He didn't leave any points on his bench this week, impressive stuff. Luke moves to 3-5 this season.
            </p>
            <p>
                Sam put up exactly 114 points this week, which was near the bottom of the league. Calvin Ridley was disappointing, as were Harrison Butker and MIA DEF. Sam drops to 2-6 this season, tied with Trevor.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Game of the Year?</ArticleSubheader>
            <p>
                This was the closest game of the week, featuring the #3 and #4 highest scoring teams. Joey was able to pull out the victory, thanks to stellar QB play from Daniels and Mayfield. His RBs also provided a punch, with Mason having 24 and Conner having 18.3 points. Joey moves to 6-2 this season.
            </p>
            <p>
                Bryan had huge games from Fields and Nico this week, but they weren't enough to beat Joey. Aiyuk and Barkley underperformed projections, and Stafford was extremely disappointing as well. Bryan moves to 6-2 this season as well.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Slightly Lower Scoring Matchup #3</ArticleSubheader>
            <p>
                This matchup was the second closest game of the week, and was also extremely high scoring. Both Bryan and Tyler should be very pleased that we play against the median in this league, so all their scoring at least counted for something.
            </p>
            <p>
                Dylan was able to win this week, led by Nabers, Hubbard, and Darnold. Purdy and Pittman provided some support as well. Aubrey had a down week with only 11 points. Dylan moved to 7-1 this season and sits atop the leaderboard. Shoutout to Walter.
            </p>
            <p>
                Tyler barely lost this game despite solid games from Kamara and Geno. Singletary, Kincaid, Dicker, and PHI DEF let him down this week. Tyler moves to 6-2 this season, sitting in 4th place.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Mark Leads League In Scoring</ArticleSubheader>
            <p>
                Mark had 4 players put up over 20 points this week, led by the stack of Jared Goff and Amon-Ra. With only two players in single digits as well, that is a recipe for a first place finish on the week. Mark moves to 4-4 and 7th place.
            </p>
            <p>
                Avery struggled this week, and was within 10 points of having to do this punishment. Avery had 7 guys put up single digit performances, and was carried by Lamar and Jayden Reed. Avery drops to 3-5 this season.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>RBs Cancel Out</ArticleSubheader>
            <p>
                Pat had the #1 RB this week, Derrick Henry, who put up nearly 36 points. Henry was nearly equaled by Kenneth Walker, who put up 33.6 points for Isaac. Justice Hill and Kyren each also had more than 20 points. Pat had better non-RB play this week, which propelled him to victory, and he moves to 6-2 this season. Isaac drops to 4-4, and is in 6th place with the most points against.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
        </div>
    )
}

const MatchupArticleSeven = () => {
    return (
        <div>
            <ArticleHeader>Matchup #7</ArticleHeader>
            <ArticleSubheader>Ben Didn't Bring The Boom</ArticleSubheader>
            <p>
                Dean was able to beat Ben this week, with Mike Evans leading the way with 23.4 points. Jonathan Taylor scored a respectable 19.8 points, and his K and DEF chipped in points too. Dean moves to 3-5 this season, and is in 10th place.
            </p>
            <p>
                Ben had decent games from all his players, but nobody really brought the boom for him. Brian Thomas is the closest he had to a boom game, with 21 points. Everyone else had between 6 and 12 points, which isn't enough to get the job done. Ben drops to 1-7 this season, and is in last place.
            </p>
            <MatchupPlot data={starterData} matchupId={7} />
        </div>
    )
}

const ScoringDistributionArticle = () => {
    return (
        <div>
            <ArticleHeader>Scoring Distributions</ArticleHeader>
            <ArticleSubheader>Distribution of Scoring</ArticleSubheader>
            <StackedHistogram chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>
            <p>
                Everyone was pretty clustered this week, no outliers on either end.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                We've been trending up each week, better management or just better football?
            </p>
        </div >
    )
}

const StandingsArticle = () => {
    return (
        <div>
            <ArticleHeader>Standings & Points</ArticleHeader>
            <ArticleSubheader>Current Standings</ArticleSubheader>
            <LeaderboardTable leaderboardData={medianLbData} />
            <p>
                Dylan is in first place after 4 weeks, with the 3rd most PF. Joey and Bryan are #1 and #2 in PF, and have similar PA too. Isaac has the most PA, while Ben has the least PF.
            </p>
        </div>
    )
}

const PowerRankingsArticle = () => {
    return (
        <div>
            <ArticleHeader>Power Rankings</ArticleHeader>
            <ArticleSubheader>Current Power Rankings</ArticleSubheader>
            <PowerRankingsTable powerRankingsData={powerRankingsData} />
            <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 0 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 0 would mean that you played the worst team every week.</ArticleCaption>
            <p>
                This looks pretty similar to the standings, with a few notable differences. Bryan has the highest power ranking, with Dylan in 2nd. Tyler and Joey are practically tied for 3rd place. Isaac was in first last week apparently, but dropped 4 spots due to his 13th highest scoring performance this week.
            </p>
        </div>
    )
}

export const articles = [
    {
        id: 1,
        content: AwardsAndRecapArticle,
    },
    {
        id: 2,
        content: MotwArticle,
    },
    {
        id: 3,
        content: MatchupArticleTwo,
    },
    {
        id: 4,
        content: MatchupArticleThree,
    },
    {
        id: 5,
        content: MatchupArticleFour,
    },
    {
        id: 6,
        content: MatchupArticleFive,
    },
    {
        id: 7,
        content: MatchupArticleSix,
    },
    {
        id: 8,
        content: MatchupArticleSeven,
    },
    {
        id: 9,
        content: ScoringDistributionArticle,
    },
    {
        id: 10,
        content: StandingsArticle,
    },
    {
        id: 11,
        content: PowerRankingsArticle,
    },
    // {
    //     id: 11,
    //     content: PlayoffOutlookArticle,
    // },
    // {
    //     id: 12,
    //     content: AlternateUniverseArticleOne,
    // },
    // {
    //     id: 13,
    //     content: AlternateUniverseArticleTwo,
    // },
    // {
    //     id: 14,
    //     content: AlternateUniverseArticleThree,
    // },
    // {
    //     id: 15,
    //     content: MotWDangerArticle,
    // },
    // {
    //     id: 16,
    //     content: LeagueBuzzArticle,
    // },
    // {
    //     id: 17,
    //     content: Meme1,
    // },
    // {
    //     id: 18,
    //     content: Meme2,
    // },
    // {
    //     id: 19,
    //     content: Meme3,
    // },
    // {
    //     id: 20,
    //     content: Meme4,
    // },
    // {
    //     id: 21,
    //     content: Meme5,
    // },
    // {
    //     id: 22,
    //     content: Meme6,
    // },
    // {
    //     id: 23,
    //     content: Meme7,
    // },
    // {
    //     id: 24,
    //     content: Meme8,
    // },
    // {
    //     id: 30,
    //     content: MotWRules,
    // },
];
