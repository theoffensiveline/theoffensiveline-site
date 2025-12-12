import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable, LineupScatter } from '../../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
import medianLbData from './medianLb.json';
import motwHistoryData from './motwTable.json';
import powerRankingsData from './powerRankings.json';
import scheduleData from './scheduleData.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';
import startingLineupData from './startingLineupData.json';
import { leagueIds } from '../../../components/constants/LeagueConstants';

export const newsDate = '2025-12-12';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 14</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                The best managed team in week 14 was fittingly Cockroach, who scored 141.74 points with their reputation on the line this week to avoid last place. Becoming a 3-time loser in 5 years would've cemented them as the worst fantasy football manager of all-time. Now instead they are tied for last place finishes with this years loser, Bye Week Curious, who has now lost 2 out of the last 3 years. Josh Allen was the top QB of the week, which helped Cockroach get the W. Kyle Pitts was also TE1 on the week in our league, with just 15 points. This was the 43rd best TE started in our league this season, which is the least impressive award that has been given out maybe ever. Spoiler alert, Kyle Pitts will also get this award in week 15 since he had a top-5 TE performance of all-time.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                No team was perfect this week, with the best managed team sitting at 96.6% this week. This was JonathanTaylorFansCrying, who already had the #1 seed locked up so they really had nothing to play for this week. They lost to Cockroach, who managed at 88.9% but was our #1 team this week. The worst managers were at 75%, Bye Week Curious and First Down Syndrome. Neither of them would've won their matchup even if they were at 100% this week, which shows how bad their teams were.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Round 1 - Fight</ArticleSubheader>
            <p>
                Uncle Rico Went Pro wanted revenge for their week 11 MotW loss to WalterPickens, and they got it this week. They scored just enough points to get the win, and it came down to the final plays on SNF when Rashee Rice caught a garbage time pass with the Texans in prevent defense. This was moments after Ka'imi Fairbairn kicked the game sealing FG for the Texans, but it wasn't game sealing for WalterPickens. Matthew Stafford, Chase Brown, and Jaylen Waddle carried this team this week, with Jaylen Waddle in the revenge game.
            </p>
            <p>
                WalterPickens got a big week from Tee Higgins who actively played through a concussion or two this week. Jacoby Brissett did his thing, putting up his usual top-12 QB week but this start/sit decision cost them MotW as Joe Burrow scored 23.36 points on their bench against the Bills who hadn't allowed 18+ points to a QB since week 1. The rest of their team kind of shit the bed with their best RBs on bye, which resulted in 5 hotdogs for them in this loss. A Jordan Mason TD saved them from a 6th.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                These two teams will be facing off again next week in round 1 of the playoffs, the first time MotW has ever been repeated in consecutive weeks. MotW has repeated once before, but there was a playoff bye in between those matchups so they were week 14 and 16 of 2023. WalterPickens will be the first team to lose 2 weeks in a row, or be the first team to win the week after they lost.
            </p>
            <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleCaption>
                <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
            </ArticleCaption>
            <p>
                Uncle Rico Went Pro earned their 10th MotW victory, 2nd most all-time. Their 40 shots/dogs given out is also 2nd most all-time. WalterPickens lost their 3rd MotW of the season, and 7th MotW of all time, tied for 3rd with 3 other teams. Their 29 hotdogs/shots consumed is 4th all-time. If they don't win the championship again this year, their 4th MotW loss of this season will be the most any team has ever had in one season.
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
            <ArticleSubheader>Mickey Mouse 69</ArticleSubheader>
            <p>
                First Down Syndrome scored exactly 69 points this week, supporting the Mickey Mouse narrative that has once again surrounded The Barkley Brawlers. It may not look like First Down Syndrome played a QB this week, but Jalen Hurts ended with 0.4 points in his 5 turnover performance after he became the first ever player to have 2 turnovers in one play. The rest of their team also did pretty bad, which is how you end up with 69 points.
            </p>
            <p>
                The Barkley Brawlers didn't really care that they opponent sucked, since they scored the 2nd most points of any team this week at 137.08 points. Michael Wilson continues to be Puka Nacua when Marvin Harrison Jr doesn't play. His 37.2 points combined with Cameron Dicker's 22 and MIA's 17 would've won them this week without any other player contributing.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                First Down Syndrome will be in the toilet bowl against Super Ja'Marrio Bros. in round 1. The Barkley Brawlers will be up against Lord of the Littles in round 1 of the playoffs.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Cockroach Clutches</ArticleSubheader>
            <p>
                Cockroach scored 141.74 points, their 2nd highest scoring output of the season. Josh Allen scored 37.84 points this week which provided them a massive edge at QB. The rest of their team also did a decent job with 6 other players scoring in double digits. It takes a team effort to avoid last place.
            </p>
            <p>
                JonathanTaylorFansCrying didn't have much to play for this week, but their team's performance doesn't bode well for the playoffs. Luckily for them they will have a bye week to get things right and get their guys back to full strength.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Cockroach will be up against Costco Guys in round 1 of the toilet bowl, and JonathanTaylorFansCrying will be on bye in round 1 of the playoffs.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Singing Like Mariah Terry Isn't Singing</ArticleSubheader>
            <p>
                Lord of the Littles pounded Singing Like Mariah Terry this week, scoring 136.14 points. Puka Nacua did his best Michael Wilson impression, but ended up scoring 1.5 points less than Michael Wilson this week despite Puka's 2 TD performance. The rest of their team did pretty well, with only 2 players below 10 points this week.
            </p>
            <p>
                Singing Like Mariah Terry didn't get the AJ Brown legacy game they've been relying on in the back half of this season, and the rest of their team shit the bed as well. This was Mahomes worst game of the season, which was to be expected against the insane HOU defense. Justin Jefferson continues to struggle and might be the worst fantasy pick this season with how bad he has been without being able to be benched.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Lord of the Littles will be up against The Barkley Brawlers in round 1 of the playoffs, and Singing Like Mariah Terry will be on bye in week 1 of the toilet bowl.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Hubbell Curse Stays Undefeated in 2025</ArticleSubheader>
            <p>
                BBCU used the Hubbell Curse to their advantage this week, cursing Ladd McConkey and Oronde Gadsden on MNF and allowing Justin Herbert to get enough points with his legs to get the win in this matchup. JSN did his usual thing, and instead of Bijan and Trey McBride it was Travis Etienne and Zay Flowers this week carrying the rest of the load.
            </p>
            <p>
                Super Ja'Marrio Bros. knew they were up against it this week, but put up their best effort in the loss. They only had 2 players below double digits this week which makes it pretty impressive to only score 115.88 points. Brandon Aubrey's 25.7 points is the most points of any kicker this season, and he is now the only player in NFL history with 3 made 50+ yard FG in the same game.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                BBCU will be on bye in round 1 of the playoffs, and Super Ja'Marrio Bros. will be up against First Down Syndrome in round 1 of the toilet bowl.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Bye Week Furious</ArticleSubheader>
            <p>
                Bye Week Curious scored only 73.4 points this week. It also looks like they did not start a QB this week, but that was because Daniel Jones scored just 0.8 points before he died. RJ Harvey put up 22 points this week, but was the only player who did much of anything for their team in the most important matchup of the season.
            </p>
            <p>
                Costco Guys scored 132.26 points this week, with Jahmyr Gibbs scoring 37 points again this week. This is his 4th game this season over 37 points, which is a major reason why this team has been very boom or bust. Lamar Jackson is another contributor to this, but he had a good week this week with 21.06 points.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Bye Week Curious will be on bye in round 1 of the toilet bowl. Costco Guys will be up against Cockroach in round 1 of the toilet bowl.
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
                Teams were pretty spread out this week, but a decent amount of teams were on the higher end of the distribution.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                This week was better than last week, but the bar was pretty low last week.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                There were 2 close games this wek for the first time in a while, and the MotW was the 4th closest game of the season.
            </p>
        </div >
    )
}

// const TradingVolumeArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Trading Volume</ArticleHeader>
//             <TradesLineChart tradeHistory={tradeHistory} />
//             <p>
//                 We didn't see much action right before the trade deadline, with just 1.5 trades happening this week. It is only 1.5 because one of the trades was a correction of the Travis Hunter collusion trade that happened last week. The other trade also involved Super Ja'Marrio Bros. as they sent out Trey Benson for Oronde Gadsden to fill the slot left open by a surprising Sam LaPorta IR stint.
//             </p>
//         </div>
//     )
// }

const StandingsArticle = () => {
    return (
        <div>
            <ArticleHeader>Standings & Points</ArticleHeader>
            <ArticleSubheader>Current Standings</ArticleSubheader>
            <LeaderboardTable leaderboardData={leaderboardData} />
            <p>
                Standings are locked in now, with not much movement this week. There was no consequential movement that changed anything. The biggest change was the playoff seeds swapping opponents and moving MotW around.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                All 6 of the playoff teams are on the good side of the PF/PA line, and Costco Guys is the 7 seed with at .500 record who is also on the good side of the line. The other 5 toilet bowl teams are on the bad side of the line. It is tough to win when you are outscored on average.
            </p>
            <ArticleSubheader>Starting Lineup Analysis</ArticleSubheader>
            <LineupScatter data={startingLineupData} />
            <p>
                BBCU continues to sit in the top right, but it is tough to see movement in this chart week to week this late in the season. The last place team is in the bottom left, we will see if that trend continues next season, and The Offensive Line may do some work in the off-season to analyze historical trends as well.
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
                The power rankings going into the playoffs have 5 of the 6 playoff teams in the top-6 teams. The Barkley Brawlers are the 3-seed but are 9th in the playoff rankings. They would be 64-90 against all teams this season which shows how easy their schedule has been to get the 3-seed. They had the easiest schedule this season with a difficulty of 32.5. This was slightly harder than playing against Bye Week Curious every week who only had a team ability of 26.74.
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
//                 Three more teams clinched a playoff spot this week, and there are now two spots left to fill. There will be 4 teams fighting for those 2 spots, and they all have a shot at them if things break right. Costco Guys is the least likely team to make it thanks to their low PF. It looks extremely likely that Uncle Rico Went Pro will make it in, and Lord of the Littles is likely to make it as well.
//             </p>
//             <p>
//                 While it is technically true that Super Ja'Marrio Bros. and Singing Like Mariah Terry can finish with the same 5-9 record as Bye Week Curious and 36 Spikeball Pro Nets, it is virtually impossible for them to get last since they have a massive PF lead on Bye Week Curious. So the 2 teams in true contention for last are the 4-9 teams. Bye Week Curious can avoid last with a win and a loss from 36 Spikeball Pro Nets, which the simulations give a 26% chance of.
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
                The Barkley Brawlers would've snuck into the playoffs as the 6 seed, but all the playoff teams would remain unchanged in this universe. The last place team would also remain the same.
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
                Uncle Rico Went Pro would be 11-3 and in 1st if they made the right start/sit decisions every single week. Bye Week Curious would still be in last at 2-12.
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
                BBCU has had the worst possible schedule for them, sitting at 9-5 in the wosrt case, matching their current record. They would be 13-1 with Costco Guys or Lord of the Littles schedule. Super Ja'Marrio Bros. has also had the worst possible schedule at 5-9, and could be 10-4 with The Barkley Brawlers schedule. The Barkley Brawlers are the easiest possible schedule for 10/12 teams in the league. Cockroach are the hardest schedule for 8/12 teams in the league. The worst possible record is Bye Week Curious at 1-13 with BBCU or WalterPickens schedules.
            </p>
        </div>
    )
}

// const DivisionArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Division Overview</ArticleHeader>
//             <ArticleSubheader>Team Record vs Division</ArticleSubheader>
//             <DivisionRecordTable data={divisionRecords} standings={leaderboardData} />
//             <p>
//                 This table shows each team's record against each division. Jonathan Taylor Fan Club absolutely cleaned up the Hubbell Division with a 4-0 record. Other teams with undefeated records include The Barkley Brawlers against the Glizzy Division, Super Ja'Marrio Bros. against the Avon Division (0-3 against the Hubbell Division with the curse), and Costco Guys in their own Glizzy Division. Hubbell Park Roommate #8 was 0-3 in the Glizzy Division, as was Uncle Rico Went Pro. Bye Week Curious was 0-4 against the Avon Division.
//             </p>
//             <p>
//                 If you really looked at the table above, you might be wondering how Lord of the Littles managed to have only 3 games against the Hubbell Division and 5 against the Glizzy Division. You might also be wondering how Uncle Rico Went Pro managed to have 4 games against the Hubbell Division and only 3 against the Glizzy Division. What do these 2 managers have in common you might ask?
//             </p>
//             <DivisionOverallRecordsTable data={divisionOverallRecords} />
//             <p>
//                 This table shows each division's overall record against everyone, excluding divisional games which are always 1-1. This table also clearly shows the mistake that was made, as the Hubbell Division had an extra inter-division matchup in week 11. This has huge implications on the schedule, the standings, and MotW.
//             </p>
//             <p>
//                 The Hubbell Division was the best in terms of W/L this season, and would've been even better if it wasn't for the scheduling error, as both WalterPickens and Uncle Rico Went Pro would've won in week 11.
//             </p>
//         </div>
//     )
// }

// const MotWDangerArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>MotW Possibilities</ArticleHeader>
//             <ArticleSubheader>Hubbell Curse 2.0</ArticleSubheader>
//             <DangerTable data={dangerTable} />
//             <ArticleCaption>MotW Danger Metric</ArticleCaption>
//             <p>
//                 The Hubbell Division is dealing with the MotW trap, and hoping it doesn't linger too long into the playoffs. It is possible for at least 3 of these teams to make the playoffs, but MotW could also get sucked into the toilet bowl if things break right.
//             </p>
//             <p>
//                 Super Ja'Marrio Bros. has not been in MotW this season, and they got their second step to dodging it with a BBCU win in week 12. Now they just need an Uncle Rico Went Pro win in week 13 to successfully dodge MotW in the Hubbell Curse gauntlet.
//             </p>
//             <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
//             <ArticleImage src={motwFuture} />
//             <ArticleCaption>This will get fixed eventually to be less shitty and not an image.</ArticleCaption>
//         </div>
//     )
// }

const LeagueBuzzArticle = () => {
    return (
        <div>
            <ArticleHeader>League Buzz</ArticleHeader>
            <ArticleSubheader>League Submissions</ArticleSubheader>
            <LeagueQuote>
                "People keep saying “Alec what songs are you going to record for the punishment this year?”. I guess we will never know."<br />- Alec
            </LeagueQuote>
            <p>Yeah Alec did avoid the punishment so I guess the album will never come out.</p>
            <LeagueQuote>
                "https://open.spotify.com/playlist/5utIKHX41gMeXnfBcPpaem?si=be4cfa8cfdca40f9"<br />- Anonymous League Manager
            </LeagueQuote>
            <p>Oh I guess now we know what would've been on the album.</p>
            <LeagueQuote>
                "Matt Smith is a bitch"<br />- Anonymous League Manager
            </LeagueQuote>
            <p>The commissioner does not take this comment lightly, and if the anonymous league manager is ever found they will be punished.</p>
            <LeagueQuote>
                Hey Josh,<br />
                I just wanted to say I'm really sorry for giving you sass in the chat earlier. You were genuinely trying to help and I shouldn't have responded the way I did. I really appreciate you taking the time to jump in and offer support and I didn't mean to make it seem like I wasn't grateful.<br />
                Thanks for being patient with me - and again I'm sorry. I'll be better about it moving forward.<br />- Alec
            </LeagueQuote>
            <p>A formal apology was necessary after the events that transpired in the chat the other day after a TikTok link was sent to the chat and Josh Little just tried to help people watch it.</p>
        </div >
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/XDrXUTb.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Alec</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/yiHrYAd.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/NmJZ8Pp.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/DCyjl6p.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/EsPytum.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/xj6ptr9.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/MePwsgF.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/JPeEEXM.png"}>
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
    // {
    //     id: 9,
    //     content: TradingVolumeArticle,
    // },
    {
        id: 10,
        content: StandingsArticle,
    },
    {
        id: 11,
        content: PowerRankingsArticle,
    },
    // {
    //     id: 12,
    //     content: PlayoffOutlookArticle,
    // },
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
    // {
    //     id: 16,
    //     content: DivisionArticle,
    // },
    // {
    //     id: 17,
    //     content: MotWDangerArticle,
    // },
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
    // {
    //     id: 28,
    //     content: Meme9,
    // },
    {
        id: 30,
        content: MotWRules,
    },
];

const newsletterData = {
    newsDate: newsDate,
    articles: articles,
    meta: {
        title: "2025 Week 14",
        description: "Testing this feature out to see if it works",
        image: "/banner_logo.png"
    }
};

export default newsletterData;
