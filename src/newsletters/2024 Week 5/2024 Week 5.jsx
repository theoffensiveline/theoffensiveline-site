import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, DangerTable, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable } from '../../components/newsStyles';
import awardsData from './awardsTable.json';
import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
import medianLbData from './medianLb.json';
import motwHistoryData from './motwTable.json';
// import playoffData from './playoffTable.json';
import powerRankingsData from './powerRankings.json';
import scheduleData from './scheduleData.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';
import dangerTable from './dangerTable.json';
import motwFuture from './motwFuture.png';

export const newsDate = '2024-10-10';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 5</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 5 was extremely high scoring across the board, with 11 out of 12 teams scoring more than 100 points, and a league median of 125.22 points. These are both new highs for us this season. The 8th highest scorer (Poor Management) was within 4 points of the 4th highest scorer (Kirk Thuggins & The Boys). The top scorer, Calvin's Cold Streak, put up the third highest point total of any team this season, 148.36 points. This was led by Ja'Marr Chase who scored 41.3 points for the #1 WR performance in our league this season. Supplying Chase these points was Joe Burrow, who scored 33.78 points for Pink Pony Kupp.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                There was one perfect manager this week, Just Joshin pt. 2, and 4 managers at 96% or higher. The highest maximum point total belonged to Twin Bowers, with a bench of Baker Mayfield (23.4 points), Chase Brown (16.4 points), and Jordan Whittington (15.9 points). The lowest manager skill this week was Cinderella, who had a respectable 80.2% of their maximum. They could've avoided their L this week if they had maximized their points.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Cinderella Drops The Ball</ArticleSubheader>
            <p>
                Cinderella had Lamar Jackson go off this week, but that was not enough to hang on against Poor Management. Breece Hall, Diontae Johnson, and David Njoku really let this team down when they needed them most. Jake Moody contributed the 4th shot/dog after getting injured trying to make a tackle in the 2nd quarter of the game. He would've easily gotten over 10 points if he hadn't gotten injured.
            </p>
            <p>
                Poor Management had good games from Mike Evans, Jake Ferguson, and MIN D. De'Von Achane and Dontayvion Wicks were disappointing, but Kareem Hunt and Harrison Butker (what an unlikeable duo) saved the day on Monday Night Football and secured the win for Poor Management.
            </p>
            <p>
                Trevor and Josh K incorrectly picked Cinderella to win in the survivor pool to each earn their first strike. No managers selected Poor Management to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Poor Management takes the throne and welcomes Pink Pony Kupp into the MotW in week 6, and Cinderella will play against Youngster Joey.
            </p>
            <ArticleSubheader>Matchup of the Week 2023-24</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
            <ShotsDistributionChart chartData={shotsDistData} />
        </div>
    )
}

const MatchupArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Matchup #2</ArticleHeader>
            <ArticleSubheader>Big Upset Gives First Down Syndrome Hope</ArticleSubheader>
            <p>
                First Down Syndrome was in last place coming into this game, and their outlook for the season was not looking great. They have dealt with injuries and have yet to put together a super inspiring performance. Joe Flacco was able to come in off the street and drop 26.56 points, leading the way for them this week.
            </p>
            <p>
                Youngster Joey really struggled this week, with their 3 WRs totaling only 16.4 points. Kyler Murray (Rotom) had a decent game, as did newly acquired Younghoe Koo (Flygon). Ultimately this team was one of the worst in the league this week, and lost their matchup.
            </p>
            <p>
                Three managers incorrectly selected Youngster Joey to win in the survivor pool. Greg was eliminated from this selection, and Jake and Alec earned their first strike out of two. No managers selected First Down Syndrome to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                First Down Syndrome will play against Kirk Thuggins & The Boys in week 6. Youngster Joey faces off with recent MotW loser Cinderella.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Twin Bowers On This Chart</ArticleSubheader>
            <p>
                This was one of the highest scoring matchups of the season, between the 3rd and 5th highest scoring teams in the league this week. Twin Bowers was able to pull out a victory behind performances from Garrett Wilson and team namesake Brock Bowers. Deebo was the only true disappointment this week for them.
            </p>
            <p>
                Just Joshin pt. 2 put up a respectable performance but it was not enough to get the W. Aaron Jones getting injured did not help their cause, and neither did playing Cade Otton at TE. Josh Allen had another bad week in real life and in fantasy, and Bijan has not lived up to his draft capital at all this season.
            </p>
            <p>
                No manager picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Just Joshin pt. 2 will play against Crashee Rice in week 6, and Twin Bowers gets matched up against the current 1-seed, Giving Me a Chubb.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Fortnite Enjoyer Time?</ArticleSubheader>
            <p>
                This was the first week that Giving Me a Chubb didn't have their RBs go nuclear, but the rest of their team was able to do their part for once. This was a well rounded effort from Giving Me a Chubb, with only one player in single digits at 8.8 points.
            </p>
            <p>
                Hot Dog Enjoyer is now solely in last place, and was the only team to not score 100 points this week. Their top scorer was Tucker Kraft, and outside of him their team shit the bed. It's hard to win when your highest scorer is your TE and your second highest scorer is Terry McLaurin.
            </p>
            <p>
                Anthony correctly picked Giving Me a Chubb in the survivor pool to stay alive, and was the only manager to not earn a strike this week. No managers picked Hot Dog Enjoyer to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Giving Me a Chubb will play against Twin Bowers in week 6. Hot Dog Enjoyer will face off against Calvin's Cold Streak.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Boom Week for Calvin's Cold Streak</ArticleSubheader>
            <p>
                Calvin's Cold Streak put up the most points of any team this week, led by Ja'Marr Chase's 41.3 points. Stefon Diggs put up decent numbers in his revenge game, and Travis Kelce is back to being a top TE in fantasy after the Rashee Rice injury.
            </p>
            <p>
                Kirk Thuggins & The Boys had great performances from Drake London and Tank Bigsby, but the rest of the team wasn't able to put together enough points to win. They put up the 4th most points of any team this week though, a respectable effort in the loss.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Kirk Thuggins & The Boys will play against First Down Syndrome in week 6, and Calvin's Cold Streak gets matched up against Hot Dog Enjoyer.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>9th Highest Scorer Gets a W</ArticleSubheader>
            <p>
                Crashee Rice was able to beat Pink Pony Kupp this week thanks to great games from Tee Higgins and Brandon Aiyuk. Jayden Daniels and James Cook did their parts as well, as did DEN defense. Zack Moss got injured in this game, so that is something to watch going forward.
            </p>
            <p>
                Pink Pony Kupp put up 125.18 points this week, which was somehow 7th in the league. Joe Burrow was the QB1 this week, scoring 33.78 points. Sadly for Pink Pony Kupp, Tee Higgins was a direct beneficiary of some of those points. Xavier Worthy needed 24+ points on MNF for Pink Pony Kupp to win, and wasn't able to get there. He did draw a few long pass interference calls, so there was a chance if he had just caught the ball instead.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Crashee Rice will play against Just Joshin pt. 2 in week 6. Pink Pony Kupp will face off against Poor Management in MotW.
            </p>
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
                Very high scoring week this week across the board.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                Another week trending up, despite dealing with bye weeks.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                This is a new addition to the newsletter at the request of one of the managers. I tried making this into a chart with everyone's team photo on it, but it got too crowded and was unreadable. Please let me know if you have any feedback on the presentation of this data. The goal from the manager who requested this was to see who has been unlucky with their opponents regularly scoring slightly more points than them. Those close losses are indicated in red here. Close victories are indicated in green. Any matchup with a margin of victory of 10 or more is not colored.
            </p>
            <p>
                Something I took away from this is that Crashee Rice is 4.5 points away from being 5-0 this season.
            </p>
        </div >
    )
}

const StandingsArticle = () => {
    return (
        <div>
            <ArticleHeader>Standings & Points</ArticleHeader>
            <ArticleSubheader>Current Standings</ArticleSubheader>
            <LeaderboardTable leaderboardData={leaderboardData} />
            <p>
                Giving Me a Chubb takes sole possession of the top spot on the leaderboard, and Hot Dog Enjoyer does the same on the bottom. We've got a 5-way tie for 2nd, and a 5-way tie for 2nd to last.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                There is a pretty even distribution here, with the two teams in the upcoming MotW sitting right on the line. The teams below the line are near the top of the leaderboard, and the teams above the line are near the bottom, aside from Twin Bowers.
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
                Kirk Thuggins & The Boys takes the top spot on the power rankings this week despite their loss, and their 2-3 record. Cinderella drops a spot after their sorry performance in MotW this week. Hot Dog Enjoyer moves to the bottom of these rankings, similar to the leaderboard this week. They have had one of the easier schedules in the league this year and are 1-4 so far. No schedule has been particularly easy though.
            </p>
        </div>
    )
}

// const PlayoffOutlookArticle = () => {
//     return (
//         <div>
//             <ArticleSubheader>Playoff / Last Place Outlook</ArticleSubheader>
//             <PlayoffTable playoffData={playoffData} />
//             <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation. I want to build this out in-house using Walter's ROS projections at some point, maybe next season.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
//             </ArticleCaption>
//             <p>
//                 As described in good detail in the matchup summaries, the playoff race is down the 3 teams fighting for the 6 seed, and 4 teams are in contention for last place. The simulations do not like The Werbenjägermanjensens chances, but if they win it is very likely that one of the other 3 teams will get last instead. They somewhat control their own destiny.
//             </p>
//         </div>
//     )
// }

const AlternateUniverseArticleOne = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universe #1</ArticleHeader>
            <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
            <AltLeaderboardTable data={medianLbData} />
            <ArticleCaption>If everyone played their matchup each week, and also played against the median, this is what the leaderboard would look like.</ArticleCaption>
            <p>
                There aren't many differences in the standings if we had an extra game against the median in week. The only team who would benefit would be First Down Syndrome.
            </p>
        </div>
    )
}

const AlternateUniverseArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universe #2</ArticleHeader>
            <ArticleSubheader>Best Ball Standings</ArticleSubheader>
            <AltLeaderboardTable data={bestBallLbData} />
            <ArticleCaption>If everyone played their best lineup every week, this is what the standings would look like. All columns include hypothetical totals.</ArticleCaption>
            <p>
                If this were a best ball league, Crashee Rice would be 5-0. They would have been able to gain those 4.5 points we talked about earlier. Hot Dog Enjoyer has the least max PF in the league.
            </p>
        </div>
    )
}

const AlternateUniverseArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universe #3</ArticleHeader>
            <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
            <ScheduleTable data={scheduleData} />
            <p>
                Now that we've got 5 games of sample size, you can really start to narrow down exactly how to complain about your schedule. Like we said earlier, nobodies schedule has been particularly easy this season, but there are a lot of schedule comparisons here that show that certain teams would have fared well with specific schedules. For example, Calvin's Cold Streak is 2-3, but they would be 4-1 with Crashee Rice's schedule. Twin Bowers is 3-2, but they would be 5-0 with Just Joshin pt. 2's schedule. Cinderella is 3-2, but they would be 5-0 with Giving Me a Chubb's schedule.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>Hot Dog Enjoyer Might Be In Luck</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
            <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
            <ArticleImage src={motwFuture} />
            <ArticleCaption>This will get fixed eventually to be less shitty and not an image.</ArticleCaption>
        </div>
    )
}

const LeagueBuzzArticle = () => {
    return (
        <div>
            <ArticleHeader>League Buzz</ArticleHeader>
            <ArticleSubheader>Sleeper Chat Misconduct</ArticleSubheader>
            <p>
                Some managers think it is funny to send gifs of women's breasts in the Sleeper chat anytime anyone uses it for something legitimate. League managers are outraged at this behavior.
            </p>
            <LeagueQuote>
                "I can't believe Anthony is sending porn in my Christian fantasy football league"<br />- Greg
            </LeagueQuote>
            <p>
                The league office must do something about this to make sure that it doesn't happen again. Maybe Antonio Brown can be forced back onto the roster of the next manager who sends a gif of women's breasts. Or maybe Anthony's team will do something to punish him, like <a href="https://x.com/K1/status/1843351187170673149">sign on to a CoD partnership</a> (submitted by Josh).
            </p>
            <ArticleSubheader>More Trade Analysis</ArticleSubheader>
            <LeagueQuote>
                "Proof: 11.80 + 0.00 {'>'} 16.40 ∴ Fleeced QED"<br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                Edit: this quote was actually about another trade, but the manager who submit it did not make that clear. Do with that what you will.
            </p>
            <LeagueQuote>
                "Alec fleeced me on Aaron Jones"<br />- Jake
            </LeagueQuote>
            <ArticleSubheader>Other Submissions</ArticleSubheader>
            <LeagueQuote>
                "Brandon Aubrey "Drake" Graham is only relevant bc Dak Prescott is incapable of leading a touchdown drive, forcing them to kick a fg 5 times per game."<br />- Cowboys suck
            </LeagueQuote>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <h2>Devan not wanting to play fantasy basketball:</h2>
            <ArticleImage src={"https://i.pinimg.com/564x/4f/f6/e9/4ff6e96600aeedb611fdc1c27312d860.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Jake</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <h2>Hot Dog Enjoyer:</h2>
            <ArticleImage src={"https://i.chzbgr.com/full/9775475712/h69796C5A/food-cant-drown-my-demons-they-know-swim"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/96b6du.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Jake</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/96b716.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/96b75x.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Pink Pony Kupp</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/96b7ch.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/96b7pc.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

// const Meme8 = () => {
//     return (
//         <ImageWrapper>
//             <ArticleImage src={"https://i.imgflip.com/94q05a.jpg"}>
//             </ArticleImage>
//             <ArticleCaption>Submitted by Jake</ArticleCaption>
//         </ImageWrapper>
//     )
// }

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
        content: ScoringDistributionArticle,
    },
    {
        id: 9,
        content: StandingsArticle,
    },
    {
        id: 10,
        content: PowerRankingsArticle,
    },
    // {
    //     id: 11,
    //     content: PlayoffOutlookArticle,
    // },
    {
        id: 12,
        content: AlternateUniverseArticleOne,
    },
    {
        id: 13,
        content: AlternateUniverseArticleTwo,
    },
    {
        id: 14,
        content: AlternateUniverseArticleThree,
    },
    {
        id: 15,
        content: MotWDangerArticle,
    },
    {
        id: 16,
        content: LeagueBuzzArticle,
    },
    {
        id: 17,
        content: Meme1,
    },
    {
        id: 18,
        content: Meme2,
    },
    {
        id: 19,
        content: Meme3,
    },
    {
        id: 20,
        content: Meme4,
    },
    {
        id: 21,
        content: Meme5,
    },
    {
        id: 22,
        content: Meme6,
    },
    {
        id: 23,
        content: Meme7,
    },
    // {
    //     id: 24,
    //     content: Meme8,
    // },
    {
        id: 30,
        content: MotWRules,
    },
];
