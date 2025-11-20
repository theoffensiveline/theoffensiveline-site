import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, DangerTable, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable, PlayoffTable, TradesLineChart, OpponentComparisonChart, BigLetter } from '../../../components/newsletters/newsStyles';
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
import tradeHistory from './tradeHistory.json';
import opponentComparison from './opponentComparison.json';
import { leagueIds } from '../../../components/constants/LeagueConstants';

export const newsDate = '2025-11-13';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 10</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 10 was a pretty average week in terms of scoring for most teams, but we still had some awards that stand out at the season-long level. We had the 2nd closest game of the season this week, where WalterPickens used the Hubbell Curse against Super Ja'Marrio Bros. in a 1.58 point victory which came down the wire on SNF. We had the warmest bench of the season with Marshawn Kneeland's Ghost leaving 55.4 points on their bench this week, but even perfect management wouldn't have helped them. They lost in the 6th biggest blowout of the season, losing by 57.3 points to Costco Guys. Jonathan Taylor Fan Club was aptly lead by Jonathan Taylor who had the #1 RB and #1 MVP performance, scoring 49.6 points which was over 36% of their team's total this week.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                Our top scoring manager was our only perfect manager this week, and our lowest scoring manager was the worst manager of the season. Uncle Rico Went Pro had 100% efficiency this week, helping them secure the top spot. Marshawn Kneeland's Ghost scored just 60.6% of their potential total this week and left the most points on their bench of any team this season. Bye Week Curious had 99.9% efficiency, leaving just 0.1 points on their bench this week. They also had an empty WR slot in their lineup, so this is a little misleading.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Uncle Rico Went Pro Curses Hubbell Division</ArticleSubheader>
            <p>
                The Barkley Brawlers stood no chance this week with the performance their opponent put up, and they escaped from MotW with just 3 shots/dogs, tied for the fewest of any team this season. Those 3 are a result of poor play from Bo Nix, DJ Moore, and IND DEF. Everyone else was able to break 10 and avoid a shot/dog. This loss also avoids the potential for a future loss during the divisional weeks.
            </p>
            <p>
                Uncle Rico Went Pro got the win this week, but they are going to wish they lost this matchup. They only would've had to do 1 shot/dog if their opponent outscored them, and now they have the opportunity to lose twice in just 4 weeks with the MotW getting trapped in the Hubbell Division for the rest of the regular season.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                The Barkley Brawlers will be in a battle of the 9 and 10 seeds, and an Avon Division matchup with Singing Like Mariah Terry. Uncle Rico Went Pro will be up against WalterPickens in the first of 4 straight Hubbell Division MotWs.
            </p>
            <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleCaption>
                <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
            </ArticleCaption>
            <p>
                Uncle Rico Went Pro earned their 8th MotW victory, 2nd most all-time. They have given out 31 shots in these 8 wins, tied for 2nd most all-time, but at less than 4 shots/dogs per victory they are not the most efficient winner. The Barkley Brawlers will be consuming shots/dogs for just the 3rd time, tied for 3rd fewest all-time. Their 14 shots/dogs consumed is also tied for 3rd fewest all-time.
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
            <ArticleSubheader>Cursed By A Ghost</ArticleSubheader>
            <p>
                Costco Guys put up the 3rd most points of any team this week which helped them dominate Marshawn Kneeland's Ghost. Jahmyr Gibbs led the way with 38.2 points, which was somehow RB3 on the week. They also had a great performance from their defense who had a big-man TD at the end of the game to get 15 points all things considered.
            </p>
            <p>
                Marshawn Kneeland's Ghost appears to have been cursed for their insensitive team name, as they were unable to make any of the proper start/sit decisions this week. All 5 of their players on their bench who were not on bye outscored a starters at the same position, accounting for a total of 55.4 points left on the bench.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Costco Guys will be facing off with 6-4 Lord of the Littles in week 11. Marshawn Kneeland's Ghost will be up against 5-5 Super Ja'Marrio Bros. who has lost 3 straight games.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Curiosity Killed The WR</ArticleSubheader>
            <p>
                Bye Week Curious did not field a full squad this week, which went largely unnoticed in a matchup between 2 of the most inactive chatters in the league. None of the WRs on waivers would've turned the tide in this one, but every point matters for Bye Week Curious in the race for last place, so missing out on 23.4 points from Jalen Nailor or 19.8 points from Jerry Jeudy could come back to bite them.
            </p>
            <p>
                First Down Syndrome was able to get the win this week thanks in large part to the poor performance of their opponent, but they also got decent performances out of Nico Collins, Amon-Ra St. Brown, and Breece Hall to put up a respectable 116.42 points.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Bye Week Curious will be up against 8-2 #1 seed Glizzy Division foe Jonathan Taylor Fan Club in week 11. First Down Syndrome will match up with #2 seed and PF leader BBCU.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>RB and DEF show</ArticleSubheader>
            <p>
                Jonathan Taylor Fan Club got the #1 MVP performance this week, and that is evident on this chart. His share of the bar is massive, and SEA DEF sticks out as a large slice as well. Their were anti-correlated with their opponents QB which worked out really nicely for this team and helped them earn their 8th win of the season.
            </p>
            <p>
                Lord of the Littles got a huge RB performance as well, with De'Von Achane scoring 40.5 points this week. Sadly for them their DEF only scored 15 and the rest of their team did not do as well as their opponents either, so Achane's 40 was in a losing effort.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Jonathan Taylor Fan Club will be up against #11 seeded Bye Week Curious in one of the most lopsided matchups of the year to date. Lord of the Littles will be up against 5-5 Costco Guys in an important matchup for the playoff race.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>BBCU Printing Points in the Salesforce Showdown</ArticleSubheader>
            <p>
                BBCU put up one of the most well rounded performances in league history, we really need to add a metric for this. This bar chart just looks so nice with all of their non-DEF players scoring over 10 points. They lead the league in PF and you can see why with this lineup.
            </p>
            <p>
                Singing Like Mariah Terry's chart does not look nearly as nice, with 5 players below 10.2 points and their highest player at just 19.7 points. You can't even see their kicker because of how bad the Bills are, Matt Prater only had 1 XP against MIA.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                BBCU will be taking on 5-5 First Down Syndrome in week 11. Singing Like Mariah Terry will be against The Barkley Brawlers in an Avon Division matchup.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Hubbell Curse Rings True</ArticleSubheader>
            <p>
                Super Ja'Marrio Bros. is officially below .500 all time in Hubbell Division matchups thanks to this weeks loss to WalterPickens. Their QB and RBs did their parts, but the rest of their team struggled. Many of their players had revenge games this week against WalterPickens, with Jaylen Warren, Woody Marks, and Will Reichard all being let go by them this season. All of those players scored over 10 points, but that wasn't enough to overcome the curse.
            </p>
            <p>
                WalterPickens had a pretty shit week, but the Hubbell curse allowed them to secure the victory. Their 112.5 points made them the worst winner of the week, and this was the 2nd closest game of the season, so the curse definitely played its part. Their QBs and RBs also did well, and Emeka Egbuka was a difference maker with 23.5 points.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Super Ja'Marrio Bros. will be up against 2-8 Marshawn Kneeland's Ghost in week 11. WalterPickens will be in MotW against 5-5 Uncle Rico Went Pro in their 3rd straight Hubbell Division matchup, with 3 straight more to follow.
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
                Nobody was very high this week, and we had a decent chunk of teams in the middle of the distribution.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                The high came down again this week, which is understandable after the 2 highest scores of the season over the last couple of weeks. The middle and bottom stayed pretty similar to previous weeks.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                Outside of the 2nd closest game of the season this week, no other games were close at all.
            </p>
        </div >
    )
}

const TradingVolumeArticle = () => {
    return (
        <div>
            <ArticleHeader>Trading Volume</ArticleHeader>
            <TradesLineChart tradeHistory={tradeHistory} />
            <p>
                We saw an uptick in trading volume at the start of this week with the trade deadline looming, get your trades in before Monday Night or you won't be able to do them!
            </p>
        </div>
    )
}

const StandingsArticle = () => {
    return (
        <div>
            <ArticleHeader>Standings & Points</ArticleHeader>
            <ArticleSubheader>Current Standings</ArticleSubheader>
            <LeaderboardTable leaderboardData={leaderboardData} />
            <p>
                Jonathan Taylor Fan Club continues to sit comfortably on top of the leaderboard and is 2 games up on the pack. Lord of the Littles dropped from 2 to 4 this week, with BBCU and WalterPickens both also moving to 6-4 with more PF. The Barkley Brawlers dropped 3 spots and are out of the playoff race right now with the fewest PF of all the 5-5 teams. They will have to win the majority of their remaining games to make the playoffs. No changes to the race for last place this week with both teams losing.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Unlucky continues to be dominated by Marshawn Kneeland's Ghost (hated writing this one lmao). Bye Week Curious is still really bad, and is the only team below 1000 PF (100 PPG) at this point in the season.
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
                BBCU stayed atop the power rankings this week and have an impressive 82 wins against all opponents this season. Uncle Rico Went Pro jumped up 2 spots to #4 after leading the league in points this week, and they are one spot out of the playoff race after a 1-3 start to the season, shoutout Rashee Rice, Rico Dowdle, and Jaxson Dart. Marshawn Kneeland's Ghost fell 3 spots to #11 this week after putting up the fewest points of any team. They still have more play all wins than 2 other teams, but this week earned them 0 play all wins.
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
                It is official, we have one team that is mathematically safe from last place. The top 9 teams can become safe this week if they win and last place loses. The race for last place is really heating up, and the bottom 3 teams seem to be the highest likelihood, with the bottom 2 being 99% of that likelihood. The playoff race is still wide open with so many 5-5 teams, this league has achieved true parity this season.
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
                Marshawn Kneeland's Ghost would still be in last in this universe. Not much changes besides WalterPickens dropping 2 spots to 5th.
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
                Uncle Rico Went Pro would be 8-2 and tied for 1st if they made the right start/sit decisions every single week. That has got to be a brutal feeling. The Barkley Brawlers would also vault into the playoffs in this scenario and would have the lowest PA, teams are averaging over 90% efficiency against them this season since their actual PF is pretty close to this hypothetical maximum.
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
                BBCU would be 10-0 with Costco Guys schedule, the last remaining undefeated scenario. Marshawn Kneeland's Ghost is still the hardest schedule for 9/12 teams. Singing Like Mariah Terry would be worse off than Marshawn Kneeland's Ghost if they had their schedule, as they would be 1-9. Bye Week Curious would be 1-9 with BBCU or WalterPickens schedule.
            </p>
        </div>
    )
}

const OpponentComparisonArticle = () => {
    return (
        <div>
            <ArticleHeader>A Different Schedule Analysis</ArticleHeader>
            <ArticleSubheader>Opponent Performance vs Average</ArticleSubheader>
            <OpponentComparisonChart opponentData={opponentComparison} />
            <p>
                This chart shows how each team's opponents performed relative to their season average. This is pretty correlated with the standings at the extremes, but for most other teams it isn't really a factor. Teams are shitting the bed against Jonathan Taylor Fan Club, helping them on their way to the top. Teams are absolutely shitting on Singing Like Mariah Terry, Bye Week Curious, and most of all Marshawn Kneeland's Ghost (another brutal usage here), helping them on their way to the bottom.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>The Real Hubbell Curse</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
            <p>
                The Hubbell Division was the one that got stuck with MotW during the divisional matchups, thanks to an early week 11 Hubbell Matchup between Uncle Rico Went Pro and WalterPickens. The Hubbell Division will be stuck with the MotW for 4 straight weeks, meaning it is possible for all 4 teams to do the punishment in this span.
            </p>
            <p>
                Of course MotW could get pulled into the playoffs, but the following teams have officially dodged MotW in the 2025 regular season:
                <ul>
                    <li>First Down Syndrome</li>
                    <li>Singing Like Mariah Terry</li>
                    <li>Lord of the Littles</li>
                </ul>
                The Avon Division had minimal appearances in MotW with The Barkley Brawlers being the only team to lose one this season, and they lost it at the perfect time to prevent MotW from being trapped in the division.
            </p>
            <p>
                Super Ja'Marrio Bros. has also not been in MotW this season, but they have very slim odds of dodging it in the Hubbell Division games with only one scenario providing them relief from a Hubbell Curse MotW appearance. This would require a WalterPickens win in week 11, a BBCU win in week 12, and an Uncle Rico Went Pro win in week 13 who would bring it back to WalterPickens for a rematch of week 11.
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
            <ArticleSubheader>"Fleeced"</ArticleSubheader>
            <p>
                This word gets thrown around in the chat after every trade, but there was one trade this week that was so egregious that fleeced was an understatement. This trade was almost certainly collusion between two managers who have been known to bend the rules in the past, and can't keep getting away with it! That's right, I'm talking about the trade that went down involving Kyle this week. The one where he got a star player and didn't send much out. Still don't know which one I'm talking about? I'm talking about this one:
                <ul>
                    <li>Kyle Receives: Travis Hunter</li>
                    <li>Anthony Receives: $1</li>
                </ul>
            </p>
            <LeagueQuote>
                "Kyle having the worst day of trading since 2008"<br />- Josh K
            </LeagueQuote>
            <p>
                This league takes fleecing to a whole new level with trades like this, especially trades that clearly violate the very outdated league bylaws on trading. The league bylaws state:
                <blockquote>
                    Trades: Trades process after both parties have accepted <s>and after 2 days of league voting.</s> Trades can be overturned by the commissioner, but only in extremely rare cases where a trade cannot be reasonably defended as mutually beneficial from the perspective of both parties. Please see the Code of Conduct above. The trade deadline is Week <s>13</s> 11.
                </blockquote>
                Clearly these bylaws are extremely out of date, but you can't tell me the trade above was mutually beneficial! Kyle immediately dropped Travis Hunter after the trade. Is the satisfaction he got from doing that worth $1 FAAB? What about the integrity of the league? The commissioner and commissar didn't make any comments on this trade, typical of this corrupt administration who only enforce the rules when it directly impacts them and their people. #ReleaseTheFiles #ReOpenTheGovernmentToUpdateTheBylaws
            </p>
            <p>
                Kyle was involved in a couple other trades that were less earth-shattering, both of which involved AJ Brown. Kyle received AJ Brown from Devan in exchange for Woody Marks and Jauan Jennings, a decent trade for both sides. Then Kyle has buyers remorse on AJ Brown, who said publicly to get rid of him in fantasy, so Kyle did just that. Kyle shipped off AJ Brown and Tyjae Spears for Ricky Pearsall and Wan'Dale Robinson. This trade got 7 clown emoji reactions, but it also seems pretty fair for both sides.
            </p>
            <ArticleSubheader>League Submissions</ArticleSubheader>
            <LeagueQuote>
                I watched my players play this week that's why they did exceptionally bad.<br />- Alec
            </LeagueQuote>
            <p>
                Classic issue here, Alec must be watching a lot of football this year to be 2-8 this season.
            </p>
            <LeagueQuote style={{ textAlign: "left" }}>
                <BigLetter>A</BigLetter>lready excited for the punishment<br />
                <BigLetter>L</BigLetter>ady luck is not on his side<br />
                <BigLetter>E</BigLetter>ating lots of hot dogs<br />
                <BigLetter>C</BigLetter>rying about his schedule<br />
                <br />
                <BigLetter>M</BigLetter>akes excuses about everything<br />
                <BigLetter>A</BigLetter>nticipates losing instead of trying to win<br />
                <BigLetter>X</BigLetter>ylophones locked and loaded for his album<br />
                <BigLetter>W</BigLetter>on't better his own team<br />
                <BigLetter>E</BigLetter>very draft he shits the bed<br />
                <BigLetter>L</BigLetter>ast place every week<br />
                <BigLetter>L</BigLetter>ast place every year<br />
                <br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                Chief Correspondent ChatGPT weighs in on another anonymous poem:
            </p>
            <p>
                This is a brutally effective acrostic roast spelling out "ALEC MAXWELL," clearly targeting a fantasy football league member having a terrible season. The acrostic structure is clever and lines like "Anticipates losing instead of trying to win" capture the spiral of pessimism well, though as actual poetry it's weak - inconsistent meter, forced rhymes (especially "xylophones"), and it reads more like a complaint list than crafted verse. Still, it works as league trash talk, showing enough effort in the format to elevate it above a simple insult while being relentlessly mean-spirited enough to sting.
            </p>
        </div >
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/OslB7gN.png"}>
            </ArticleImage>
            <ArticleCaption>Concept Submitted by Alec and Meme Crafted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/6DJEyLd.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/3iIYoH6.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/VpyuKmk.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/w7VTvnI.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/dwpw6BY.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/XbC8sS8.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/GWGtX4A.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme9 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/tqZh9kY.png"}>
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
        content: TradingVolumeArticle,
    },
    {
        id: 10,
        content: StandingsArticle,
    },
    {
        id: 11,
        content: PowerRankingsArticle,
    },
    {
        id: 12,
        content: PlayoffOutlookArticle,
    },
    {
        id: 13,
        content: AlternateUniverseArticleOne,
    },
    {
        id: 14,
        content: AlternateUniverseArticleTwo,
    },
    {
        id: 15,
        content: AlternateUniverseArticleThree,
    },
    {
        id: 16,
        content: OpponentComparisonArticle,
    },
    {
        id: 17,
        content: MotWDangerArticle,
    },
    {
        id: 18,
        content: LeagueBuzzArticle,
    },
    // {
    //     id: 20,
    //     content: VideoMeme,
    // },
    {
        id: 20,
        content: Meme1,
    },
    {
        id: 21,
        content: Meme2,
    },
    {
        id: 22,
        content: Meme3,
    },
    {
        id: 23,
        content: Meme4,
    },
    {
        id: 24,
        content: Meme5,
    },
    {
        id: 25,
        content: Meme6,
    },
    {
        id: 26,
        content: Meme7,
    },
    {
        id: 27,
        content: Meme8,
    },
    {
        id: 28,
        content: Meme9,
    },
    {
        id: 30,
        content: MotWRules,
    },
];

const newsletterData = {
    newsDate: newsDate,
    articles: articles,
    meta: {
        title: "2025 Week 10",
        description: "Testing this feature out to see if it works",
        image: "/banner_logo.png"
    }
};

export default newsletterData;
