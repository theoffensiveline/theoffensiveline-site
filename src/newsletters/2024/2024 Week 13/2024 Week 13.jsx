import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable, PlayoffTable } from '../../../components/newsletters/newsStyles';
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



export const newsDate = '2024-12-05';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 13</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 13 was extremely pivotal for this league. We went from 8 teams in contention for last place to just 2 teams in a head-to-head matchup in week 14. Every team that isn't in contention for last place is still <i>technically</i> in the playoff hunt, but a few teams are essentially eliminated. More on that later.
            </p>
            <p>
                After 13 weeks, we have a new #1 Warmest Bench winner, Kirk Thuggins & The Boys, who left 57.5 points on their bench this week. This was led by the #2 Bench MVP this season, Jerry Jeudy, who scored 40.5 points on their bench this week. We had two #3 outcomes this week, one much more relevant than the other. First was Brock Bowers, the #3 TE performance of the season, scoring 30.5 points for Twin Bowers. Much more importantly, League Loser Prophecy was the #3 best loser of the season, scoring 134.78 points in their defeat to the #1 team in the league this week. This defeat set them up to have a head-to-head matchup for last place, despite having a 200 point PF advantage on the current 12th place team. We also had a #4 performance, with DEN having the 4th Biggest D this season for Twin Bowers.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                Kirk Thuggins & The Boys was previously mentioned, but this 65.1% efficiency is the lowest we've seen this season, rivaled by just a few other teams in the high 60s. We didn't have any perfect managers this week, but Njorkin da Tenis came the closest, and that was able to help them win their most important matchup of the season. Calvin's Cold Streak had some mismanagement, but luckily they matched up with Costo Guys who had mismanagement as well.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Trade Was Actually Worth It</ArticleSubheader>
            <p>
                Njorkin da Tenis got the win this week, but it wasn't clear that was the case until Monday Night Football. David Njoku needed 12.2 points or more for Njorkin da Tenis to get this win, and he was able to get that done easily. Jayden Daniels put up big numbers per usual, and this team got some help from Puka, Tee Higgins, and Rhamondre Stevenson as well. This was a team effort from Njorkin da Tenis to save them from punishment contention.
            </p>
            <p>
                Youngster Joey had their MotW streak broken this week, but only ended up with 2 shots/dogs, the fewest of any team this season. Kenneth Walker and Jake Elliott were the culprits here, each scoring about 6 and a half points. Walker had a TD stolen from him by Charbonnet this week, and Elliott just didn't have many opportunities to kick against a tough Baltimore defense. The rest of this team did their part to get above 10 points.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Njorkin da Tenis will bring Twin Bowers back into MotW for the 2nd time in 3 weeks, in another Hubbell matchup. The winner of that will bring the MotW to either the playoffs or the toilet bowl, depending on how things shake out. Youngster Joey will play against Kirk Thuggins & The Boys in week 14, as both teams are searching for a playoff spot.
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
            <ArticleSubheader>Fortnite Master Builder avoids Fortnite</ArticleSubheader>
            <p>
                With this win, Fortnite Master Builder was able to escape the race for last place. Mike Evans was the MVP this week, but it wasn't one of the more notable MVP performances we've had this season. They also got solid contributions from De'Von Achane, Justin Jefferson, and Courtland Sutton.
            </p>
            <p>
                First Down Syndrome was let down this week by their RBs, their kicker, and their non-Tyreek WRs. Jalen Hurts also had one of his worse games of the season. This team just lacked the pieces to get it done this week against Fortnite Master Builder.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Fortnite Master Builder will play against Just Joshin pt. 2 in week 14, who has already clinched a playoff spot. First Down Syndrome enters the head-to-head battle for last against League Loser Prophecy.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>New Prophecy Unlocked</ArticleSubheader>
            <p>
                Just Joshin pt. 2 needed a win this week to clinch a playoff spot, and they got it. Josh Allen came in clutch with a double TD, Bijan Robinson, DJ Moore, and Ladd McConkey all scored over 20 points, and DAL D had a sick pick-6 to put them at 18 points. Putting up the #1 score of the week always takes some massive games, and Just Joshin pt. 2 got a bunch of them this week.
            </p>
            <p>
                League Loser Prophecy put up a bunch of points this week, but were not able to defeat Just Joshin pt. 2 in this one. CeeDee Lamb only scored 5.9 points, and Javonte Williams scored 7.4 points. C.J. Stroud had yet another terrible fantasy game with only 14.38 points, but this team also had Mixon so they most likely weren't both able to go off.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Just Joshin pt. 2 will play against Fortnite Master Builder in week 14, while League Loser Prophecy gets put into the head-to-head battle for last against First Down Syndrome.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Twin Bowers Maintains Playoff Hopes</ArticleSubheader>
            <p>
                Twin Bowers had a huge game this week in order to keep their playoff hopes alive. Led by namesake Brock Bowers, this team was able to score the 2nd most points this week. DEN D contributed 20 points, and Jordan Love, Chase Brown, and Jayden Reed contributed about 19 each.
            </p>
            <p>
                Kirk Thuggins & The Boys had some mediocre games in their starting lineup this week, and they had the #1 overall player of the week on their bench in Jerry Jeudy. Also on their bench was Keenan Allen, who scored 24.3 points, more than anyone they started. BUF defense was also on their bench, scoring 12 more points than the MIA defense they started who scored -1 point.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Twin Bowers gets pulled into another Hubbell MotW against Njorkin da Tenis, and Kirk Thuggins & The Boys will play against Youngster Joey in week 14.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Shit Show of The Week</ArticleSubheader>
            <p>
                This matcuhp was between the 8th and 9th highest scoring teams this week, and Giving Me a Chubb emerged as the Worst Winner of the week. This was also the closest game this week. This was another matchup that hung in the balance going into Monday Night Football, with just Nick Chubb to play for Giving Me a Chubb. Chubb needed more than 8 points to get this win, and he ended up getting a rushing TD to put him over the top.
            </p>
            <p>
                Pink Pony Kupp wasn't able to get it done this week, but luckily they had already been safe from last place, and they were able to secure a playoff spot this week thanks to the results of other matchups. Tank Dell and Cooper Kupp were the 2 big disappointments of the week, and Jahmyr Gibbs didn't do much either. Pink Pony Kupp made a few poor management decisions this week that could've been the difference between a playoff spot and a bye week.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Giving Me a Chubb will play against Calvin's Cold Streak in week 14, while Pink Pony Kupp will face off against Costo Guys.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>RBs {'>'} No RBs</ArticleSubheader>
            <p>
                This matchup can basically be boiled down to RB performances, and Calvin's Cold Streak clearly had the better RBs this week, even if you still count Lamar Jackson as an RB. Najee Harris and Josh Jacobs both put up 20+ points, to go along with 20 from Ja'Marr Chase.
            </p>
            <p>
                Costo Guys had an awful week from their RBs, with Breece Hall only scoring 6, and Chuba Hubbard only scoring 2.3 points. These somehow weren't their worst players, with SF defense scoring -4 points. Playing a defense in a snow game in Buffalo is crazy work. This is the lowest score of any player this season, tied with CIN defense in week 10, started by First Down Syndrome.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Calvin's Cold Streak will face off with Giving Me a Chubb in week 14, and Costo Guys will play against Pink Pony Kupp.
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
                Pretty high scoring week this week, thanks in part to no bye weeks.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                You can see the impact of bye weeks on this chart again. Week 8 was the last time we had 0 bye weeks, and week 9 only had PIT and SF on bye. Weeks 12 and 14 are the most impacted by byes, so it is interesting to see week 12 so high. Week 14 has the potential to rival week 3 for the worst week of the season.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                Giving Me a Chubb earned their third close victory of the season, while Pink Pony Kupp was handed their first close defeat. Those three close wins for Giving Me a Chubb are really pulling their weight in them avoiding last place.
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
                Pink Pony Kupp remains on top, with Just Joshin pt. 2 moving up to 2nd place this week. Costo Guys and Youngster Joey each dropped down one spot to 3rd and 4th respectively. The big news here was League Loser Prophecy and First Down Syndrome falling down to 11th and 12th, and being the only teams who are eligible to get last place.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Costo Guys continue to reside in the lucky and good part of this chart. Fortnite Master Builder has entered his own territory in the lucky and mediocre area of the chart. First Down Syndrome is still on the bad part of the chart, but only needs to score points this week to make that irrelevant.
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
                Pink Pony Kupp moves up to #1 in the power rankings, and Just Joshin pt. 2 moves up to #2. Costo Guys fell 3 spots to #4 after shitting the bed this week. #5 is League Loser Prophecy, interestingly enough, given that they are in the race for last place. First Down Syndrome fell to last here as well, and has the worst team ability value.
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
                This table looks so much different than last week, when 8 teams were truly in contention for last place. This became a two team race overnight, because the losing team will have 5 wins and 9 losses, and only 2 teams can achieve that feat since they play each other this week. PF are out the window, and it all comes down to one week. The simulations give League Loser Prophecy the advantage, but they don't know how many bye weeks he is dealing with this week. WalterPicks doesn't have last place odds, but if they did they'd probably be close to the reverse of these simulations.
            </p>
            <p>
                The playoff picture is slightly more clear than it was last week. All playoff teams will have at least 7 wins. The two teams with 8 wins are in, the teams with 7 wins can control their own destiny this week, and the teams with 6 wins need to win and need some luck on their side. The winner of the matchup between Giving Me a Chubb and Calvin's Cold Streak will automatically make the playoffs, so that leaves 3 spots up for grabs. Costo Guys has a sizeable PF advantage, so even if they lost it is extremely unlikely they will miss the playoffs. That leaves only 2 spots for Youngster Joey, the loser of Giving Me a Chubb and Calvin's Cold Streak, Fortnite Master Builder, Twin Bowers, and Kirk Thuggins & The Boys. Njorkin da Tenis is able to get a 7th win, but without scoring like 300 points they will not win the tiebreaker over any team with 7 wins already, so they are essentially eliminated in the same way Costo Guys is essentially clinched. Matchups to watch for the playoff race include:
            </p>
            <p>
                <ul>
                    <li>MOTW: Njorkin da Tenis (6-7) vs. Twin Bowers (6-7)</li>
                    <li>Kirk Thuggins & The Boys (6-7) vs. Youngster Joey (7-6)</li>
                    <li>Giving Me a Chubb (7-6) vs. Calvin's Cold Streak (7-6)</li>
                    <li>Just Joshin pt. 2 (8-5) vs. Fortnite Master Builder (6-7)</li>
                </ul>
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
                League Loser Prophecy would not be worried about last place in this universe. Instead it would be mainly between the two actual worst teams, with a few others in contention as well.
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
                Last place would already be solidified in this universe as well, with First Down Syndrome in clear control.
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
                League Loser Prophecy could be 9-4 with a different schedule, and their worst possible record is only 1 more loss than they have now. First Down Syndrome would be 0-13 with Twin Bowers schedule, which included a matchup with League Loser Prophecy last week.
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
            <ArticleSubheader>The Gang Plans For The Strip</ArticleSubheader>
            <p>
                This week the league put out a poll for a winter meetup, and the voting majority was to head to Rochester this year, as long as we went to the Landing Strip while we were there. A rough plan was formed relatively quickly, but some members were not clear about their availability. Anthony mentioned being around between 16th to the 25th, but when a plan was hatched for the 20th-21st, he said he was unavailable during that time.
            </p>
            <LeagueQuote>
                "If we do nyc 5-6 ppl could stay at my apt very uncomfortably"<br />- Josh K
            </LeagueQuote>
            <ArticleSubheader>Other Submissions</ArticleSubheader>
            <LeagueQuote>
                "If I lose I still get a league funded (web)camera which is a step in the right direction"<br />- Alec
            </LeagueQuote>
            <p>
                Not having a webcam in 2024 is wild.
            </p>
            <LeagueQuote>
                "Fantasy punishment idea - loser has to drop an album"<br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                This one has some promise.
            </p>
            <ArticleSubheader>WalterPicks Free Week</ArticleSubheader>
            <p style={{ textAlign: 'center' }}>
                <p>🎉 <strong>It's FREE WEEK in the WalterPicks app</strong> 🤖</p>
                <p>Until <strong>December 10th</strong>, the entire WalterPicks app will be accessible for any user. All you need to do is update to the latest version!</p>
                <p>Until December 10th, you have access to:</p>
                <li>💰 Full prop evaluator</li>
                <li>👀 The ability to sync your league</li>
                <li>📊 Advanced stats and metrics in the player profiles</li>
                <li>And so much more!</li>
                <p>Go check it out, just make sure you have the latest update.</p>
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9cs2pn.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9cs3cq.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9cs3i0.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9cs44d.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9cs4h7.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9cs507.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9cs5c0.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9cs5ul.gif"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

// const Meme9 = () => {
//     return (
//         <ImageWrapper>
//             <ArticleImage src={"https://i.imgflip.com/9aooxz.jpg"}>
//             </ArticleImage>
//             <ArticleCaption>Submitted by Anthony</ArticleCaption>
//         </ImageWrapper>
//     )
// }

// const Meme10 = () => {
//     return (
//         <ImageWrapper>
//             <ArticleImage src={"https://i.imgflip.com/9b9zah.jpg"}>
//             </ArticleImage>
//             <ArticleCaption>Submitted by Greg</ArticleCaption>
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
    // {
    //     id: 26,
    //     content: Meme9,
    // },
    // {
    //     id: 27,
    //     content: Meme10,
    // },
    {
        id: 30,
        content: MotWRules,
    },
];
