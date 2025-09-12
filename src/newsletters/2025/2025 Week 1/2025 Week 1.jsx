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
import { leagueIds } from '../../../components/constants/LeagueConstants';

export const newsDate = '2025-09-11';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 1</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Our Best Loser still scored lower than our Worst Winner, meaning every team that beat the league median started 1-0 this week. All is right in the world to start the season. The Best Managed Team matched up against the Most Mismanaged Team, resulting in the biggest blowout, winning by more points than the Most Mismanaged Team even scored. This was a week of all #1 performances, given it was the 1st week of the season.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                There were no perfect managers this week, and our least skilled manager was Just Joshin The 3rd who only managed to get 74.1% of their total possible points. Bye Week Curious was close at 75.4% but also had a much lower ceiling. First Down Syndrome had a similarly low ceiling, but managed to reach 99.5% of it, as the most skilled manager of the week.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Continued MotW Dominance</ArticleSubheader>
            <p>
                The first Matchup of the Week in the 2025 season is in the books. D.K's Minions Return? was able to easily secure the victory over Six Receivers, 1 Catch. He had a well rounded performance, with all of his players scoring between 8 and 18 points. Rookies Tyler Warren, Omarion Hampton, and Tetairoa McMillan all had decent week 1 numbers for their first ever game.
            </p>
            <p>
                Six Receivers, 1 Catch has to do 4 shots/dogs, including one for his QB, one for a 9.9 score from his TE, and one for a 1.8 score from AJ Brown. Brown has already been shipped off in a package that netted a new QB and TE, so they clearly wanted to make sure they wouldn't have similar issues going forward.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                D.K's Minions Return? brings Just Joshin The 3rd into the inevitable MotW, a Glizzy Division matchup. Six Receivers, 1 Catch matches up with WalterPickens in week 2 in another division rivalry in the Hubbell Division.
            </p>
            <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleCaption>
                <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
            </ArticleCaption>
            <p>
                This is Nikhil's 12th MotW victory, the next closest person is Josh K with 7.
            </p>
            <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
            <ShotsDistributionChart chartData={shotsDistData} />
        </div>
    )
}

const MatchupArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Matchup #2</ArticleHeader>
            <ArticleSubheader>First Week Syndrome</ArticleSubheader>
            <p>
                WalterPickens started off the week horribly, with Dak and Pickens combining for less than 14 points on TNF. They bounced back and finished strong with big performances from CMC and Egbuka to help them secure the victory.
            </p>
            <p>
                First Down Syndrome had the opposite week, starting off hot with Jalen Hurts putting up over 24 points on TNF, but couldn't finish with their only other double digit scorers being Breece Hall and Deebo Samuel. Getting duds from your first 2 draft picks in week 1 is a surefire way to lose your matchup.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                WalterPickens gets a divisional matchup with Six Receivers, 1 Catch in week 2. First Down Syndrome will play Costo Guys where one team will secure their first win of the season.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>League Officials Clash</ArticleSubheader>
            <p>
                This matchup between the crooked commissioner and the league commissar might be the biggest non-divisional rivalry in the league. These two have it out for one another every year, and Just Joshin The 3rd got his revenge in this week 1 matchup. They were carried by Josh Allen and Derrick Henry, the QB1 and RB1 on the week. The rest of their starters were pretty ass, but they've got some promise on their bench.
            </p>
            <p>
                TBD (Taking Big Dick) was the best loser this week, but couldn't even get within 10 points of winning their matchup. Patrick Mahomes and Chris Boswell were the stars of the team this week, as much as that might pain TBD (Tasting Brown Dookie). Hopefully the players they actually wanted to draft do better next week.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                They'll be hoping for a bounce back performance next week against Super Ja'Marrio Bros. and Just Joshin The 3rd gets pulled into MotW against DK minions returns? in week 2.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Future Pop Star In The Making</ArticleSubheader>
            <p>
                In the biggest blowout of the week, and the rare best team vs worst team matchup, Lord of the Littles dominated Bye Week Curious, more than doubling their total score. Everyone but T.J. Hockenson broke 10 points, with 3 guys breaking 20 points. This type of difference in performance is something you don't see very often.
            </p>
            <p>
                Bye Week Curious somehow would've gotten out of this with fewer shots/dogs than Costo Guys if this was MotW, but this was an ugly performance from them. Their top scorer was 13.5 points and they only had 3 guys in double figures. It didn't help that Travis Kelce executed Xavier Worthy early in the game and he put up 0 because of that.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Lord of the Littles gets a divisional matchup with The Barkley Brawlers, and Bye Week Curious plays against BBCU in week 2.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Lamar Isn't Enough</ArticleSubheader>
            <p>
                The Barkley Brawlers were able to defeat Costo Guys handily in week 1, thanks to having all but 2 of their players in double figures. Their main disappointments were Bo Nix and DJ Moore, who should have better days ahead. This team is a force to be reckoned with this season.
            </p>
            <p>
                The Costo guys couldn't break triple digits this week even with Lamar Jackson putting up nearly 30 points. Playing Ravens defense against the Bills was certainly a choice. This would've been a 7 shot/dog loss if it was in MotW.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                The Barkley Brawlers have a divisional matchup in week 2 with Lord of the Littles. Costo Guys matches up with First Down Syndrome and the loser of that will start 0-2.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Hubbell Curse Lives On</ArticleSubheader>
            <p>
                BBCU dominated the first ever Hubbell Division matchup, enacting the Hubbell curse on Super Ja'Marrio Bros. in week 1. Bijan, JSN, Flowers, and Brock Purdy all put up big numbers in this one. Purdy got hurt but Herbert put up big numbers on their bench so nothing to worry about there.
            </p>
            <p>
                Super Ja'Marrio Bros. only got 4.6 points from Ja'Marr Chase which put a big damper on their week, although this matchup would've been out of reach even if he hit his projection. This team didn't have much bench production aside from Caleb Williams, so they've been active on the waiver market looking to improve.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                BBCU gets matched up with Bye Week Curious in week 2 and will be a popular survivor pick. Super Ja'Marrio Bros. plays against TBD (Typing Boys Digits).
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
                Starting off with a wide distribution in week 1, this is likely one of the wider ranges we will see this season.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                This chart is kinda ass for now until we have more data.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                This table having no pop of color means we didn't have a single close matchup this week. The closest matchup was decided by &gt;10 points.
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
                Not much to see here after one week. Come back next week for more interesting insights.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Bye Week Curious is the peak of unlucky and bad, putting up the lowest score against the highest scoring team. Lord of the Littles has the opposite situation.
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
            <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 1 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 1 would mean that you played the worst team every week.</ArticleCaption>
            <p>
                This is the exact same order as the standings because all the teams that beat the median won their matchup. Not much interesting here either.
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
            <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation. We are now also sourcing playoff odds from  WalterPicks! These are based on future projections, rather than historical data.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
            </ArticleCaption>
            <p>
                The FFHub playoff predictions don't work with only one week of data, but the WP ones do! The WP projections are based on future projections, rather than historical data which we don't have enough of yet. WP projections TBD (Testing Bi Dudes) to bounce back from their week 1 loss, and expects Just Joshin The 3rd to fall out of the race. It also doesn't give much hope for Bye Week Curious or Six Receivers, 1 Catch to make the playoffs.
            </p>
            <p>
                Before the trade between Bye Week Curious and Six Receivers, 1 Catch, their playoff odds were 19% and 14% respectively. So the trade gave Bye Week Curious a 10% drop in playoff odds, and Six Receivers, 1 Catch a 46% jump. Clearly there is a winner of that one based on playoff odds alone. We will see if that holds true as the season continues.
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
                As previously stated, every team that won their matchup also beat the median this week.
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
                No wins and losses were decided by start/sit decisions this week.
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
                This is ass after week 1.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>Random Schedule Changes Things</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
            <p>
                WalterPickens and First Down Syndrome are directly in the line of fire for MotW in week 3. WalterPickens has the most possible future ways to be included in MotW.
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
            <ArticleSubheader>Never Forget</ArticleSubheader>
            <p>
                Let us all take a moment of silence for 9/11...okay great now back to the show.
            </p>
            <LeagueQuote>
                "I hope there is a 9/11 memorial section in the line today"<br />- Alec
            </LeagueQuote>
            <p>
                The lovely league commissar did not let anyone forget today. He sent update texts on the minute of each event of 9/11 on the 24th anniversary of the attack. This concluded at 5:30PM ET with the WTC Building 5 collapsing. In classic Anthony fashion, an emoji copy-pasta was sent regarding 9/11 as well, which seemed in poor taste compared to the other texts today. Where was the emoji copy-pasta yesterday if you wanted to act in poor taste? Go big or go home.
            </p>
            <ArticleSubheader>League Submissions</ArticleSubheader>
            <LeagueQuote>
                "Funny how the loudest draft critics are now looking up at me in the standings. Winners don't hear the noise, they make it"<br />- Alec at 5:21PM ET on 9/9
            </LeagueQuote>
            <LeagueQuote>
                "Dear Alec,
                <br />
                I started making fun of you when I thought you were going to lose your matchup. You ended up doing a great job and now I look like the fool. I'm sorry for my comments. I am the true loser here.
                <br />
                Love,<br />
                Anthony - Manager of the BBCU"
                <br />- submitted at 5:45PM ET on 9/9
            </LeagueQuote>
            <p>
                Alec really thought nobody would apologize to him, but Anthony did. Anthony is a true loser as he stated.
            </p>
            <LeagueQuote>
                "Fantasy Football<br />
                An Armchair Battle Striving<br />
                To Fight The Good Fight"
                <br />- 5-7-5
            </LeagueQuote>
            <p>
                The league has an anonymous poet on their hands. This will be interesting to watch over the course of the season.
            </p>
            <LeagueQuote>
                "Greg is a squirrel" <br />- Jake
            </LeagueQuote>
            <p>
                Couldn't even put in the effort of making the meme this year smh.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a5u8qp.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a5u8tu.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a5u8zr.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a5u9sa.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a5u83n.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a5u8gh.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a5u9h5.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a5u9ur.jpg"}>
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
