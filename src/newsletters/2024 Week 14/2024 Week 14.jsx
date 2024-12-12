import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable } from '../../components/newsStyles';
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

export const newsDate = '2024-12-12';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 14</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 14 might've been the craziest week of the season. There were records broken for fantasy in general, and a bunch of season-long records broken in this league. New #1 awards this week were Best Managed Team, Best Loser, Warmest Bench, MVP, and Literally Throwing. We also had the #2 Widest Receiver, the #2 Most Mismanaged Team, the #3 Bench MVP, the #4 Worst Winner, the #4 Deadest Horse, and the #5 Photo Finish. Massive week for awards.
            </p>
            <p>
                The matchup that ended up getting the most awards was the Matchup of the Week between Njorkin da Tenis and Twin Bowers. Njorkin da Tenis edged this out by 1.94 points, only scoring 101.48 points. Puka Nacua scored 41.8 points, which was the best MVP performance of the season, and the only player to score over 40% of their teams points in a win this season. Twin Bowers scored 99.54 points, but left 58.2 points on their bench, the most of any team this season, breaking the record set last week by Kirk Thuggins & The Boys. This manager only left 45.7 points on their bench the entirety of last season, so they mismanaged more this week than they did over the course of an entire season last year. Zach Charbonnet scored 38.3 points on their bench, and Rachaad White added another 24.9 points.
            </p>
            <p>
                If you thought Josh Allen's performance last week was good with his double TD, you weren't ready for him to score the most fantasy points of any QB ever this week. 6 total TDs and over 420 total yards, insane numbers that probably won't be done again. This performance helped Just Joshin pt. 2 secure the 1 seed and a first round bye in the playoffs for the 2nd straight season.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                Twin Bowers, as previously mentioned, broke both the records set by Kirk Thuggins & The Boys last week, in terms of total points on the bench and lowest % of maximum points. We had two perfect managers this week, First Down Syndrome and Giving Me a Chubb. Fortnite Master Builder had 99.2% efficiency, another respectable amount.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Hubbell Curse Pt. 2</ArticleSubheader>
            <p>
                Njorkin da Tenis got the win this week, but it wasn't clear that was the case until Monday Night Football. It came down to Tee Higgins vs Chase Brown on MNF, and Chase Brown and Ja'Marr Chase really stole the show from Higgins. Njorkin da Tenis had built up just enough of a lead thanks to Puka and Njoku to survive the MNF outcome. It's hard to read, but their kicker put up 0 points and their defense put up -1 points, so this would've been a 6 shot loss if Chase Brown got 2 more points, or Twin Bowers didn't mismanage their lineup.
            </p>
            <p>
                Twin Bowers had 2 main disappointments in their starting lineup in Jayden Reed, who scored 0 points, and D'Andre Swift who scored 5 points. These two could've been replaced by Zach Charbonnet (38.3 points) and Rachaad White (24.9 points). The Hubbell curse lives on. 5 shots/dogs are in store for Twin Bowers, the same total as their loss 2 weeks ago.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Njorkin da Tenis will bring MotW to the toilet bowl where it will go to die until next season. The winner of the matchup between Njorkin da Tenis and Fortnite Master Builder will carry MotW into next season, while the loser will do the punishment and advance in the toilet bowl. Twin Bowers will also be headed to the toilet bowl, where they will matchup with Kirk Thuggins & The Boys.
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
            <ArticleSubheader>League Loser Prophecy Comes True</ArticleSubheader>
            <p>
                Coming into this week, First Down Syndrome had the fewest PF in the league, and had 165 total points less than League Loser Prophecy. They didn't have a single top-3 finish this season. Their highest score was 126.94 points, which was the 5th most of any team in week 8. The most points Tyreek Hill had scored in a game before this was 26 points back in week 1. This was Rome Odunze's 2nd time over 20 points this season. This team scored the third most points this week, and had their best week of the season when it mattered most, truly clutching up to avoid the last place punishment.
            </p>
            <p>
                League Loser Prophecy stood no chance this week, facing a top-3 team for the 6th time this season, the most in the league. League Loser Prophecy scored more than 154.92 points twice this season, and both times they beat their opponents handily. Their massive boom weeks went to waste, and they lost 5 times this season while scoring 100+ points, including this week, tied for third most in the league. They had a few bench guys they could've subbed in this week, but it wouldn't have been enough to win.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Both of these teams will get a bye in the toilet bowl.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Highest Scoring Matchup Of The Season</ArticleSubheader>
            <p>
                This matchup was the highest scoring matchup of the season, with a total of 315 points between these two teams, breaking the record that Just Joshin pt. 2 set against League Loser Prophecy last week. Josh Allen was a big reason for this, scoring 51.88 points this week. Again, this was the most fantasy points that any QB has ever scored in the history of the NFL. This team put up insane numbers and still wasn't the top team this week.
            </p>
            <p>
                Fortnite Master Builder could've made the playoffs if they had won this matchup, but sadly they got Josh Allen'd this week. They had a big game from the Darnold+Jefferson stack, as well as decent games from Achane, JSN, and Sincere McCormick. Sadly for them, this was the #1 Best Loser of the season, and they missed the playoffs despite having the 4th most PF in the league.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Just Joshin pt. 2 will get a first round bye, and Fortnite Master Builder will go up against Njorkin da Tenis in the first round of the toilet bowl, and get the opportunity to have their 4th MotW loss this season.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Youngster Joey Nearly Throws Playoff Spot</ArticleSubheader>
            <p>
                Kirk Thuggins & The Boys needed to score 20 more points this week and they would've taken the final playoff spot from Youngster Joey. The players that they had on their roster were not capable of this last week, but they did leave over 50 points on their bench last week that would've helped them make the playoffs. This win didn't mean anything for them because of that, and Youngster Joey got the playoff spot despite the loss.
            </p>
            <p>
                Coming into the week Youngster Joey had an 84% chance to make the playoffs per WalterPicks, and they nearly fell into that 16% bucket this week by only scoring 64.26 points. They started the injured George Pickens, and that would've been the worst case of mismanagement of all time if they missed the playoffs because of that. They also started Jake Elliott (1 point), Ameer Abdullah (0.8 points), and Cole Kmet (0 points). Absolutely brutal week for them, and the 2nd lowest point total of the season, only bested by Njorkin da Tenis in week 10 who scored 61.58 points.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Kirk Thuggins & The Boys will be in the toilet bowl against Twin Bowers, and Youngster Joey's first round playoff matchup will be against Calvin's Cold Streak.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Highest Team Score This Season</ArticleSubheader>
            <p>
                Calvin's Cold Streak scored the most points of any team this season this week, with 182.12 points, beating the record set in week 2 by Kirk Thuggins & The Boys, who scored 177.12 points. Ja'Marr Chase and Jordan Addison went nuclear this week, both having over 39 points. Chase scored the 2nd most points of any WR started in this league this season, only behind himself in week 10 when he scored 55.4 points. Josh Jacobs chipped in 3 TDs of his own, and everyone else scored at least 9 points, including 17 from their kicker who sadly doinked in a game-winner for the Chiefs.
            </p>
            <p>
                This matchup was the 2nd highest scoring matchup of the season, with the 2 teams combining for 294 points this week. Contributing 38% of that total was Giving Me a Chubb. While this wasn't the most impressive performance, they still managed to clinch a playoff spot. Had they scored 25 fewer points, they would've missed the playoffs. Their defense wasn't any help this week, scoring -1 points. Nick Chubb wasn't great either, only scoring 4.8 points. The rest of their players put up enough points to get the job done.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Calvin's Cold Streak will play against Youngster Joey in round 1 of the playoffs, and Giving Me a Chubb will play against Costo Guys in the first round of the playoffs.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Another Down Week For Costo Guys</ArticleSubheader>
            <p>
                This was Costo Guys 3rd straight week under 110 points, and their 3rd straight loss. They had the playoff bye all but locked up 3 weeks ago, and now they don't have one anymore. James Cook did not cook this week, since Josh Allen did all the work for the Bills. Their best player this week was Chuba Hubbard. They didn't even leave that many points on their bench. This team will be looking to up their game for week 1 of the playoffs.
            </p>
            <p>
                Pink Pony Kupp had a solid week, scoring the 5th most points of any team this week. They had 5 players above 19 points this week, and could've won this matchup with just those 5 players. Bucky Irving got hurt, and they had Rico Dowdle on their bench who scored 15.1 points. They also had Juwan Johnson on their bench who scored 15 points.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Costo Guys will play against Giving Me a Chubb in week 15, while Pink Pony Kupp will be resting their players during their playoff bye.
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
                A new high, and almost a new low this week. Not a ton of scores in the middle.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                Aside from the bottom, this was basically a better version of last week.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                Njorkin da Tenis earned their first close victory of the season, while Twin Bowers took their 2nd close defeat of the season, both by less than 2 points. They have lost 2 of the 5 closest games of the season.
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
                Just Joshin pt. 2 took the #1 seed from Pink Pony Kupp this week, but both teams still have the round 1 playoff bye. Calvin's Cold Streak jumped up to claim the 3 seed to earn the right to play Youngster Joey in the first round. Costo Guys fell to the 4th seed, and will play against 5 seed Giving Me a Chubb in round 1 of the playoffs.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Costo Guys threw the massive PF lead they had all season, being overtaken by Just Joshin pt. 2 this week. Pink Pony Kupp is a close 3rd in PF. Giving Me a Chubb took over the PA lead from Twin Bowers this week, and League Loser Prophecy nearly closed the gap as well. Njorkin da Tenis and First Down Syndrome are still clearly behind in PF, but they scored those points when it mattered most.
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
                Just Joshin pt. 2 reclaimed the top spot in the power rankings. Interestingly, League Loser Prophecy moved up to 4th, despite being last in the league. They have a positive record against all teams this season, something only 6 teams can say. 5 of those 6 teams are in the playoffs, and League Loser Prophecy is in last instead.
            </p>
        </div>
    )
}

// const PlayoffOutlookArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Playoff / Last Place Outlook</ArticleHeader>
//             <ArticleSubheader>Magic Numbers and Simulations</ArticleSubheader>
//             <PlayoffTable playoffData={playoffData} />
//             <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation. We are now also sourcing playoff odds from  WalterPicks! These are based on future projections, rather than historical data.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
//             </ArticleCaption>
//             <p>
//                 This table looks so much different than last week, when 8 teams were truly in contention for last place. This became a two team race overnight, because the losing team will have 5 wins and 9 losses, and only 2 teams can achieve that feat since they play each other this week. PF are out the window, and it all comes down to one week. The simulations give League Loser Prophecy the advantage, but they don't know how many bye weeks he is dealing with this week. WalterPicks doesn't have last place odds, but if they did they'd probably be close to the reverse of these simulations.
//             </p>
//             <p>
//                 The playoff picture is slightly more clear than it was last week. All playoff teams will have at least 7 wins. The two teams with 8 wins are in, the teams with 7 wins can control their own destiny this week, and the teams with 6 wins need to win and need some luck on their side. The winner of the matchup between Giving Me a Chubb and Calvin's Cold Streak will automatically make the playoffs, so that leaves 3 spots up for grabs. Costo Guys has a sizeable PF advantage, so even if they lost it is extremely unlikely they will miss the playoffs. That leaves only 2 spots for Youngster Joey, the loser of Giving Me a Chubb and Calvin's Cold Streak, Fortnite Master Builder, Twin Bowers, and Kirk Thuggins & The Boys. Njorkin da Tenis is able to get a 7th win, but without scoring like 300 points they will not win the tiebreaker over any team with 7 wins already, so they are essentially eliminated in the same way Costo Guys is essentially clinched. Matchups to watch for the playoff race include:
//             </p>
//             <p>
//                 <ul>
//                     <li>MOTW: Njorkin da Tenis (6-7) vs. Twin Bowers (6-7)</li>
//                     <li>Kirk Thuggins & The Boys (6-7) vs. Youngster Joey (7-6)</li>
//                     <li>Giving Me a Chubb (7-6) vs. Calvin's Cold Streak (7-6)</li>
//                     <li>Just Joshin pt. 2 (8-5) vs. Fortnite Master Builder (6-7)</li>
//                 </ul>
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
                League Loser Prophecy would've finished 7th in this universe, and Njorkin da Tenis would've ended up doing the last place punishment. Remember this one for the meme section.
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
                First Down Syndrome would've been in last place in this scenario, only winning 4 games.
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
                League Loser Prophecy could've been 10-4 (#1 seed) with 2 different schedules, and their worst possible record is only 1 more loss than they ended up with. League Loser Prophecy would've made the playoffs with 7 other managers schedules, and there are only 2 schedules where they get last place.
            </p>
            <p>
                First Down Syndrome would've be 1-13 with Twin Bowers schedule, only winning their first game this past week. There are 3 teams who could've outright lost to League Loser Syndrome had they had different schedules: First Down Syndrome, Kirk Thuggins & The Boys, and Njorkin da Tenis. Count yourself lucky if you're one of those teams. Njorkin da Tenis would've been 3-11 with the infamous schedule of League Loser Prophecy.
            </p>
        </div>
    )
}

// const MotWDangerArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>MotW Possibilities</ArticleHeader>
//             <ArticleSubheader>4 Teams Still Left</ArticleSubheader>
//             <DangerTable data={dangerTable} />
//             <ArticleCaption>MotW Danger Metric</ArticleCaption>
//             <p>
//                 There is an outcome here where Twin Bowers is right back in MotW 2 times in 3 weeks, both against former Hubbell residents. Will the curse continue, or will the group chat continue to be cursed by shitty "compliments"?
//             </p>
//             <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
//             <ArticleImage src={motwFuture} />
//             <ArticleCaption>This will get fixed eventually to be less shitty and not an image.</ArticleCaption>
//         </div>
//     )
// }

// const TradingVolumeArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Trading Volume</ArticleHeader>
//             <TradesLineChart tradeHistory={tradeHistory} />
//             <p>
//                 This season had the highest trading volume in recorded history, even if you remove all of the FAAB for FAAB meme trades. The trade analysis at the end of the season will be epic.
//             </p>
//         </div>
//     )
// }

const LeagueBuzzArticle = () => {
    return (
        <div>
            <ArticleHeader>League Buzz</ArticleHeader>
            <ArticleSubheader>What is the Punishment?</ArticleSubheader>
            <p>
                Now that it has been decided that Alec is doing the punishment, Alec asked for some clarification around the rules of the punishment. Originally when we voted on the punishment, the only rule was "24 Hour Fortnite Stream". There is a subset of managers who would like to actually watch the stream who want there to be more engaging content on the livestream rather than just 24 hours of Fortnite. The counter point to this is that the punishment should not be enjoyable for Alec, and the monotony of that many hours of Fortnite adds to the punishment. Otherwise it is just fun computer time.
            </p>
            <LeagueQuote>
                "My personal opinion is 24 hours of Fortnite, which is what we voted for"<br />- Matthew Smith, Commissioner
            </LeagueQuote>
            <ArticleSubheader>Anthony Can't Read</ArticleSubheader>
            <LeagueQuote>
                "When do I have to submit my video"<br />- Anthony, 24 hours after his deadline
            </LeagueQuote>
            <LeagueQuote>
                "The rules are in the line every week"<br />- Kyle, avid reader
            </LeagueQuote>
            <ArticleSubheader>RIT Optical Illusion Stairs</ArticleSubheader>
            <LeagueQuote>
                "Have yall heard of the RIT optical illusion stairs?"<br />- Alec, 2 time league loser
            </LeagueQuote>
            <p>
                Turns out people have heard of the RIT optical illusion stairs, but sadly they are not real. Just some film student who successfully created an illusion.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhteu.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            <p>
                This is very funny in retrospect for a few reasons. Kyle and Alec both got shafted by MotW circular loops this season, and Alec likely wouldn't have gotten last if we randomized the schedule. Maybe this idea will get more love next year.
            </p>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhtjo.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Josh K</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhtoo.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhtq8.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhtsk.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhtv9.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhu05.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhu6s.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme9 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhueg.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme10 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9dhuhr.jpg"}>
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
    // {
    //     id: 15,
    //     content: MotWDangerArticle,
    // },
    // {
    //     id: 16,
    //     content: TradingVolumeArticle,
    // },
    {
        id: 17,
        content: LeagueBuzzArticle,
    },
    {
        id: 18,
        content: Meme1,
    },
    {
        id: 19,
        content: Meme2,
    },
    {
        id: 20,
        content: Meme3,
    },
    {
        id: 21,
        content: Meme4,
    },
    {
        id: 22,
        content: Meme5,
    },
    {
        id: 23,
        content: Meme6,
    },
    {
        id: 24,
        content: Meme7,
    },
    {
        id: 25,
        content: Meme8,
    },
    {
        id: 26,
        content: Meme9,
    },
    {
        id: 27,
        content: Meme10,
    },
    {
        id: 30,
        content: MotWRules,
    },
];
