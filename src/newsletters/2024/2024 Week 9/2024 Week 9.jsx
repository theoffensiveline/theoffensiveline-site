import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, DangerTable, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable, PlayoffTable } from '../../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
import medianLbData from './medianLb.json';
import motwHistoryData from './motwTable.json';
import playoffData from './playoffTable.json';
import powerRankingsData from './powerRankings.json';
import scheduleData from './scheduleData.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';
import dangerTable from './dangerTable.json';
import motwFuture from './motwFuture.png';

export const newsDate = '2024-11-07';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 9</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                The last place team scored by far the most points in the league this week, and they are still in last place. Fortnite Master Builder put up the 2nd highest score of anyone this season this week, with the #3 WR performance of the season from JSN. They even had the Bench MVP J.K. Dobbins, and still managed to have nearly 95% of their maximum possible score. They defeated the worst team of the week, Just a Hospital Ward, by 78.04 points which was the biggest blowout of the season.
            </p>
            <p>
                Just Joshin pt. 2 was the third highest scoring team this week, and lost to the 2nd highest scoring team, Giving Me a Chubb. This was the closest game of the week, and Just Joshin pt. 2 was the 2nd best loser of the season.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                There were no perfect managers again this week, but there were only 4 managers below 90% of their maximum. These 4 managers were the bottom 4 scorers in the league this week. Twin Bowers had the worst management, scoring less than 80% of their maximum. They could've been the 2nd highest scorer this week with 100% accuracy. Pink Pony Kupp had the 2nd worst management this week at only 82.6% of their maximum, but their potential was not nearly as high as Twin Bowers. Both Kirk Thuggins & The Boys and Just a Hospital Ward had 89.1% of their maximum, but were the two lowest teams in terms of actual and maximum points scored.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>League Camera Coming Soon?</ArticleSubheader>
            <p>
                League Camera Prophecy cannot be stopped right now, rattling off their third straight win in MotW. This is the second straight week their opponent scored less than 100 points. They had 6 players score 15+ points this week, including their defense, which was the #1 defense this week, and the #5 defense this season. These 6 players would have been enough to get the W this week.
            </p>
            <p>
                Kirk Thuggins & The Boys put up a poor MotW performance, the 4th lowest of anyone this season. They somehow managed to get out of this with only 4 shots/dogs. They had a few players who were edging, including Brandon Aubrey who scored 10.1 points, and Drake London who scored 10.7 points before getting injured. They also had a few players bust, including Jonathan Taylor and Dalton Kincaid.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                League Camera Prophecy will bring Youngster Joey into MotW in a friendly matchup between the two managers who fled the country just a few weeks ago. Kirk Thuggins & The Boys will play against Giving Me a Chubb.
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
            <ArticleSubheader>Puka Brought The Boom To That Guys Helmet</ArticleSubheader>
            <p>
                Puka put up 2.1 points this week before being ejected in the 2nd quarter for punching a defender in the helmet. Players punching other players in the helmet might be the dumbest thing ever, like who are you hurting but yourself? The outcome of this matchup might look different if Puka had not been ejected. Costo Guys had good games from Lamar, Chuba, and even Rhamondre. Puka, Breece, and Njoku were disappointing for them this week.
            </p>
            <p>
                First Down Syndrome had another great game from Hurts who was the QB1 this week with nearly 30 points. They had another big week at TE too, but Kittle was on bye. This time it was Taysom Hill putting up 16 points. Tyler Bass clutched up for the Bills, and helped First Down Syndrome get the win as well.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                First Down Syndrome will matchup with Pink Pony Kupp in week 10, and Costo Guys gets matched up with the team on the worst trajectory in the league, Just a Hospital Ward.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Heavy-Weight Bout</ArticleSubheader>
            <p>
                This was the matchup between the 2nd and 3rd highest scoring teams of the week, and currently the 1st and 3rd teams in the standings. Giving Me a Chubb moved up to 3rd place after this victory, also ending their 3-game losing streak. They had a big game from Mahomes, his first time scoring 20+ points this season. Derrick Henry and Zay Flowers both popped off as well. Nick Chubb was this teams worst player this week.
            </p>
            <p>
                Just Joshin pt. 2 was 5 points away from taking a commanding seat atop the standings and moving to 7-2, but they couldn't muster up those points. Josh Allen, Cade Otton, and Bijan Robinson did the best they could, each scoring 20+ points. DJ Moore and Chase McLaughlin were the only players in single digits for them this week.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Giving Me a Chubb will play against Kirk Thuggins & The Boys in week 10. Just Joshin pt. 2 will face off against Calvin's Cold Streak.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Kicking Him In The Knee While He's Down</ArticleSubheader>
            <p>
                This matchup was between the highest and lowest scorers this week, and had the largest margin of victory of any game this season. Fortnite Master Builder decided they were tired of losing close games and made sure that they didn't have another one this week. Outside of Wil Lutz, they had everyone above 10 points, and every QB/RB/WR was above 17 points. Their top 3 players scored 90.68 points, so Just a Hospital Ward avoided the embarrassing loss to only 3 opposing players.
            </p>
            <p>
                Just a Hospital Ward had the opposite experience from Fortnite Master Builder this week. Every player on their team was below 20 points, and 4 of them scored less than 5.2 points. Cole Kmet put up 0 points this week. Cedric Tillman was nearly their highest scorer, and has been the overall WR1 over the past 3 weeks. Maybe Tillman can help this team turn their season around.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Fortnite Master Builder will play against Twin Bowers in week 10. Just a Hospital Ward plays against Costo Guys.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Calvin Outscores A.J. (Green) Brown and Olave Combined</ArticleSubheader>
            <p>
                Calvin's Cold Streak had a great week from everyone except Alexander Mattison, who was their only player in single digits. Their top scorers were Geno Smith and Travis Kelce who each scored 22 points. The rest of the team put up a respectable 11-16 points.
            </p>
            <p>
                Before the week, if you told Twin Bowers they would get 26.7 points from Chase Brown and 30 points from Garrett Wilson, they would've guessed that they had an easy win this week. They were sadly let down by basically everyone else on their team this week, especially Jordan Love, Chris Olave (RIP), and A.J. Brown. These 3 players combined for less than Travis Kelce scored this week.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Calvin's Cold Streak will play against Just Joshin pt. 2 in week 10. Twin Bowers will face off against Fortnite Master Builder.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>3-Headed Monster For Youngster Joey</ArticleSubheader>
            <p>
                Youngster Joey had 3 players go off this week, Saquon Barkley (RB1 this week), DeAndre Hopkins (WR4 this week), and Courtland Sutton (WR6 this week). Their other players were pretty disappointing, but it didn't matter too much since they added up to be enough to beat Pink Pony Kupp.
            </p>
            <p>
                Pink Pony Kupp had a rough week from their flex spot, TE, K and DEF. These players all putting up duds cost them their chance at victory. Joe Burrow was nearly the QB1 this week, as he had 5 passing TDs. Cooper Kupp was dominant with Puka getting ejected, and the Lions RBs did their usual thing.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Youngster Joey will be in MotW against League Camera Prophecy in week 10. Pink Pony Kupp will face off against First Down Syndrome.
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
                2nd highest score of the season for the 2nd straight week. Lots of teams on the higher end of the middle of the distribution this week.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                5th straight week with an increased maximum score, another solid week across the board.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                This table is now formatted to work better on mobile, as you should be able to scroll horizontally. Just Joshin pt. 2 suffered their 2nd close defeat this week, and Giving Me a Chubb had their 2nd close victory from that. The same can be said about Costo Guys and First Down Syndrome respectively.
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
                Just Joshin pt. 2 remains in 1st place in the standings this week. We are back to having a 5-way tie for 2nd, and a 5-way tie for 7th. This is still anyone's to win and anyone's to lose.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Fortnite Master Builder put themselves in the middle of the pack PF-wise after scoring the 2nd most points of the season this week, but remain at the bottom of the standings. There are 3 teams with less than 1005 PF. Twin Bowers remains alone at the top of the PA axis here.
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
                Just Joshin pt. 2 moves up to the #1 spot in the power rankings, matching their standings placement. Costo Guys fell from the #1 spot after their loss this week, but they still have the highest team ability value. First Down Syndrome and Just a Hospital Ward are tied with the lowest team ability value, with Just a Hospital Ward getting last place in the rankings due to their recent performances being much worse.
            </p>
        </div>
    )
}

const PlayoffOutlookArticle = () => {
    return (
        <div>
            <ArticleHeader>Playoff / Last Place Outlook</ArticleHeader>
            <ArticleSubheader>Magic Numbers and Simulations</ArticleSubheader>
            <PlayoffTable playoffData={playoffData} />
            <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
            </ArticleCaption>
            <p>
                The top 2 teams are the only ones that the simulations are confident will make the playoffs. As mentioned earlier, this league is still anyone's to win and anyone's to lose. Nobody has clinched the playoffs, and nobody is safe from last place. Last year at this time, the eventual loser was 4-5 and had only a 2.55% chance of getting last place according to the simulations. 7 teams have higher odds than that right now. If you're not worried about getting last place, you should be.
            </p>
        </div>
    )
}

const AlternateUniverseArticleOne = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universe #1</ArticleHeader>
            <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
            <AltLeaderboardTable data={medianLbData} />
            <ArticleCaption>If everyone played their matchup each week, and also played against the median, this is what the leaderboard would look like.</ArticleCaption>
            <p>
                Calvin's Cold Streak would be in a much worse position if we played the median every week, and First Down Syndrom would be much better off.
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
                Just a Hospital Ward took their 2nd straight best ball loss this week. Calvin's Cold Streak is again much worse off in this alternate universe.
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
                We still have a winless possibility after 9 weeks, First Down Syndrome would be 0-9 with Twin Bowers schedule. Costo Guys would be 8-1 with League Camera Prohpecy's schedule. Costo Guys, Fortnite Master Builder, Giving Me a Chubb, and Twin Bowers have the largest hypothetical gains from having another team's schedule, all gaining 3 wins from their current record.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>4 Teams Became Safe Last Week</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
            <p>
                If you're not on here, you were one of the teams that was eliminated from all possible futures last week when League Camera Prophecy won, congratulations! If you are here, you're really not safe regardless of the outcome this week. There is a finite circle of options here. League Camera Prophecy could lose this week and be back in for week 12 against Fortnite Master Builder. The MotW Prophecy is so back.
            </p>
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
            <ArticleSubheader>Update on League Managers Fleeing The Country</ArticleSubheader>
            <p>
                The league managers who fled the country may have miscalculated their football scouting last week, but they did find something worth traveling abroad for. Anthony send a picture of a standalone bidet to the chat this week, met with many heart reactions from supporters. When asked if he would use it, Anthony did not respond. Anthony is a known bidet hater, and a fake fan sending this provocative image to the chat without using the bidet himself.
            </p>
            <ArticleSubheader>Erection Day</ArticleSubheader>
            <p>
                You may have heard that erection day was this week, and let me give you the long and the short of it, it came to a disappointingly early conclusion.
            </p>
            <LeagueQuote>
                "What's stopping me from pissing in the box"<br />- Alec
            </LeagueQuote>
            <p>
                It is unclear if anything came of this statement.
            </p>
            <ArticleSubheader>What is Happening with Video Extensions?</ArticleSubheader>
            <LeagueQuote>
                "I would humbly like to request an extension for my motw video"<br />- Nikhil
            </LeagueQuote>
            <p>
                This league has become overrun with people named Nikhil asking for video extensions. On one hand, the videos that are released after said extensions are very high quality. On the other hand, the extension deadline is often not met and the video is submitted past the extended deadline.
            </p>
            <p>
                The commissioners office is aware of the situation, and has discussed a few options to remedy this lack of timely motw videos. Options that have been discussed include:
                <ul>
                    <li>Adding the extra dog/shot punishment back on if you miss the deadline, as if you didn't get an extension at all.</li>
                    <li>Death Penalty</li>
                </ul>
                Whatever is decided, this will be known as the "Nikhil Clause" in the MotW rules.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/99m7xv.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/99mbgi.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/99m82a.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Devan</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/99m8a7.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Devan</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/99mbk5.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/99mc42.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/99mcfg.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/99mdh1.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
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
    {
        id: 11,
        content: PlayoffOutlookArticle,
    },
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
    {
        id: 24,
        content: Meme8,
    },
    {
        id: 30,
        content: MotWRules,
    },
];
