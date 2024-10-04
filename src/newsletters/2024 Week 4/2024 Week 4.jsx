import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, DangerTable, WeeklyScoringChart, PowerRankingsTable, ScheduleTable } from '../../components/newsStyles';
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
import artOfTheDeal from './The_Art_of_the_Deal.jpg';

export const newsDate = '2024-10-03';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 4</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 4 in this league was a crazy one, with 3 close games and 3 blowouts. The #3 highest scoring team lost their matchup, the second time that has happened in just 4 weeks. This was a high stakes matchup this time, but losing MotW as the 3rd highest scoring team has it's perks. We saw the #1 MVP performance of the season this week from Wailmer, who scored over 28% of Youngster Joey's points this week on their way to a runaway victory. We also saw the #1 DEF and the #1 WR performances of the season, both from Cinderella's team to help them win MotW.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                There was one perfect manager this week, Pink Pony Kupp. They had a respectable number of points on their bench, but they were mostly RBs who were obviously below their starting RBs point production. Giving Me a Chubb was nearly perfect this week, at 99.5% of their maximum. The team with the most points left on their bench was also the highest scorer of the week, an impressive feat. The lowest percentage this week was from Just Joshin pt.2, who was also the lowest scorer of the week.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Respectable L from Hot Dog Enjoyer</ArticleSubheader>
            <p>
                As previously stated, Hot Dog Enjoyer put up the third most points in the league this week, a respectable 123.22 points. They only had 3 players in single digits, so they will only have to eat 3 hot dogs, something they will no doubt enjoy.
            </p>
            <p>
                Cinderella had 5 players above 20 points in this one, led by Nico Collins impressive 33.1 point game. RBs seem to be a problem for this team, but their WR and QB are set up for success. When TJ Hockenson comes back this team is a championship threat.
            </p>
            <p>
                Kyle incorrectly "picked" Hot Dog Enjoyer to win in the survivor pool to earn their second straight strike, so they have been eliminated from contention. 5 managers correctly picked Cinderella to win in the survivor pool, and 3 of those managers remain perfect thus far.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Cinderella will welcome back Poor Management to the MotW in week 5, another familiar face who recently made a high-quality video. Hot Dog Enjoyer will face off against Giving Me a Chubb in week 5.
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
            <ArticleSubheader>Twin Bowers Moves to 2-2</ArticleSubheader>
            <p>
                Coming into this matchup, both teams were looking to avoid a 1-3 start to the season. Twin Bowers was the one who was able to do that, with an impressive victory over First Down Syndrome. They nearly could've won this matchup with just their 3 highest point scorers, Jordan Love, Jayden Reed, and D'Andre Swift. Those three combined for 84.76 points.
            </p>
            <p>
                First Down Syndrome had another rough week, coming off of their 64.44 point outing last week. Michael Pittman was finally able to do something with Flacco in at QB, but otherwise this was a pretty awful performance all around. Tony Pollard saved his fantasy day with a TD in garbage time.
            </p>
            <p>
                No managers selected either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Twin Bowers faces off with Just Joshin pt. 2 in week 5, and First Down Syndrome plays against Youngster Joey.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Youngster Joey's Schedule Eases Up</ArticleSubheader>
            <p>
                This was the first week this season that Youngster Joey didn't face a team in the top half of scoring, and it ended up being the team that scored the least amount of points. Youngster Joey put up a massive amount of points from their RBs and WRs, and not much outside of that. They would've needed just their top 4 players to beat Just Joshin pt. 2 this week.
            </p>
            <p>
                Just Joshin pt. 2 only got more than 15 points from one player this week, James Conner. That is not a recipe for success, and they dropped from first place to fourth place in the standings after this embarrassing L.
            </p>
            <p>
                Nikhil incorrectly picked Just Joshin pt. 2 to win in the survivor pool. They have been eliminated from contention. No managers picked Youngster Joey to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Just Joshin pt. 2 will play against Twin Bowers in week 5, while Youngster Joey goes up against First Down Syndrome.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Another High Scoring Affair</ArticleSubheader>
            <p>
                This matchup featured the second and fifth highest scoring teams this week. It has been mentioned before in this publication, but Giving Me a Chubb has a very scary RB room that nobody wants to go up against. Those RBs contributed the majority of the team points yet again this week, and Kermit was the only other player on their team in double digits. If Davante Adams or Amari Cooper get traded this team could unlock a whole other gear.
            </p>
            <p>
                Poor Management was actually managed pretty well this week. Stroud, Evans, and Jefferson put up decent numbers, but it wasn't enough as their RBs stood not chance against the RBs of Giving Me a Chubb.
            </p>
            <p>
                Alec correctly picked Giving Me a Chubb to win in the survivor pool, and remains perfect through 4 weeks. No managers picked Poor Management to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Kirk Thuggins & The Boys will play against Pink Pony Kupp in week 4. Youngster Joey will face off with 3-0 Just Joshin pt. 2, so maybe the schedule regression won't come until week 5.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Triple Digit Scoring Not Enough</ArticleSubheader>
            <p>
                Each of these teams had a player put up 0 points this week, but both managed to score in triple digits. Besides that goose egg from BUF, Kirk Thuggins & The Boys only had Dalton Kincaid in single digits. A well rounded performance, but didn't have enough big games to overtake Pink Pony Kupp.
            </p>
            <p>
                Pink Pony Kupp had solid RB and WR production this week, with all of them having at least 1 TD. That was enough to get them over the hump and move to 3-1 this season.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Kirk Thuggins & The Boys will play against Calvin's Cold Streak in week 5, and Pink Pony Kupp gets matched up against Crashee Rice.
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
                This was our closest game of the week, and was between our 9th and 10th highest scoring teams. If Patrick Mahomes didn't absolutely murder Rashee Rice (Paul Walker), Crashee Rice would've won this game handily. Jayden Daniels and Amon-Ra St. Brown's big games were not enough to overcome the loss of their 3rd star player. They also had extremely disappointing weeks from James Cook and Travis Etienne.
            </p>
            <p>
                Calvin's Cold Streak continued yet again, only putting up 2.5 points. That did not matter though since their team was able to pull off the victory and avoid an 0-4 start to the season in this punishment league. Travis Kelce benefit greatly from Mahomes taking out Rice, their other players did well enough to get just enough points to win.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Calvin's Cold Streak will play against Kirk Thuggins & The Boys in week 5. Crashee Rice will matchup with Pink Pony Kupp. You're probably wishing you could still pick Crashee Rice in survivor, aren't you?
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
                This week was better across the board than last week, and we had our 2nd highest total of the season.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            {/* <p>
                This week was certainly higher scoring across the board than last week.
            </p> */}
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
                Cinderella moves back up to #1 on the leaderboard after one week away. Giving Me a Chubb jumps up to 2nd after their win, and Pink Pony Kupp moves to 3rd. We've got 4 teams at 3-1, 4 teams at 2-2, and 4 teams at 1-3. This is still anyone's race for first or last.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                We've got a new leader for fewest points against, Crashee Rice. Twin Bowers remains on top of the PA leaderboard. Hot Dog Enjoyer put up enough points to get out of last in PF.
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
                Cinderella is clearly the #1 team in the Power Rankings, followed by Giving Me a Chubb and Youngster Joey, who was #1 last week. Pink Pony Kupp rose 2 more spots this week, up 5 spots in the last 2 weeks. First Down Syndrome drops 3 spots to last place after their 2nd straight poor week.
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
                First Down Syndrome would be in 9th instead of last if we had a game against the median. Youngster Joey would be 2 spots higher. Not much else would be different.
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
                Crashee Rice and Cinderella would both be undefeated if this was a best ball league. First Down Syndrome and Calvin's Cold Streak would both be 0-4.
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
                If you want to complain about how hard your schedule has been, only Hot Dog Enjoyer, Calvin's Cold Streak, Twin Bowers, Poor Management, and Youngster Joey are allowed to do so. They all have other schedules where they would have 2 more wins than they currently have. There isn't one "really easy" schedule, but the top offenders on the left side are Crashee Rice, Just Joshin pt. 2, Pink Pony Kupp, and ironically Hot Dog Enjoyer. Hot Dog Enjoyer has some of the widest range of outcomes from 3-1 to 0-4.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>Pink Pony Kupp and Youngster Joey in Immediate Danger</ArticleSubheader>
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
            <ArticleSubheader>Trading Ticked Up Again</ArticleSubheader>
            <ImageWrapper>
                <ArticleImage src={artOfTheDeal}>
                </ArticleImage>
                <ArticleCaption>Submitted by Hot Dog Enjoyer</ArticleCaption>
            </ImageWrapper>
            <p>
                Hot Dog Enjoyer made two trades this week. One of them was pretty fair for both sides, as Hot Dog Enjoyer took a downgrade at RB to get a solid TE to replace the awful Mark Andrews. The other trade was shocking to the entire league, and many managers dropped clown emoji reactions on the trade. Youngster Joey traded away Raheem Mostert, last seasons #2 overall RB, for Falcons kicker Younghoe Koo.
            </p>
            <LeagueQuote>
                "Fleeced"<br />- AntDiCarlo on Sleeper
            </LeagueQuote>
            <p>
                Was this collusion? Does this manager not know how trading works, similar to their lack of knowledge of the waiver wire? The world may never know. They also placed a $69 FAAB bid on Trey Sermon this week, with the next highest bidder bidding $0.
            </p>
            <ArticleSubheader>Trade Evaluation From The Peanut Gallery</ArticleSubheader>
            <p>
                Multiple trades went down in the past week or so, and people had some things to say about them.
            </p>
            <LeagueQuote>
                "Tank Dell weighs 140 lbs compared to J.K. Dobbins at 216 lbs. We can conclude that Nikhil has fleeced Trevor by a whopping 64.8%!!"<br />- Unbiased Trade Evaluator
            </LeagueQuote>
            <LeagueQuote>
                "Crooked Matt makes Hillary look like a saint"<br />- Kyle
            </LeagueQuote>
            <LeagueQuote>
                "Jake is basically Chuck Feeney."<br />- Anthony
            </LeagueQuote>
            <LeagueQuote>
                "It's nice to see Jake getting fleeced on one of his shitty trades"<br />- Greg
            </LeagueQuote>
            <ArticleSubheader>Livin' On A Prayer</ArticleSubheader>
            <p>
                With moments to go in MotW, Alec needed Miami defense to score a lot of points to win.
            </p>
            <LeagueQuote>
                "The Miami defense is the best in the league"<br />- Alec at 4:52pm ET on 9/30
            </LeagueQuote>
            <LeagueQuote>
                "The Miami defense is the worst in the league."<br />- Alec at 7:13am ET on 10/1
            </LeagueQuote>
            <ArticleSubheader>Can You Punish Jinxing?</ArticleSubheader>
            <LeagueQuote>
                "I would like the file a formal complaint to the commissioner's office against the Editor in Chief of the Offensive Line who in some pretty damning text messages, jinxed one of my star players. Using this forbidden voodoo practice, he caused Patrick Mahomes to lay down a block directly on Rashee Rices ACL, causing Rice an injury that will likely knock him out for the rest of the year. I believe that the editor in chief did this because he believes that I stole Rice from him in the draft."<br />- Jinx Victim
            </LeagueQuote>
            <p>
                The Offensive Line Editor in Chief has Rashee Rice is all 4 of their other leagues, so they feel the pain of this Jinx Victim, and meant no harm to him when sending these messages.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/95kiuh.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/95kjbu.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/95kjju.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/95kjr0.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/95ko3n.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/95koa3.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Jake</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/95koj4.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted The Offensive Line</ArticleCaption>
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
