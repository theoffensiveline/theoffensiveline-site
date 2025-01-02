import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, ArticleCaption, LeagueQuote, AwardsGridV2, WeeklyScoringChart, WeeklyMarginTable } from '../../components/newsStyles';
import awardsData from './awardsTable.json';
// import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
// import medianLbData from './medianLb.json';
// import motwHistoryData from './motwTable.json';
// import playoffData from './playoffTable.json';
// import powerRankingsData from './powerRankings.json';
// import scheduleData from './scheduleData.json';
// import shotsDistData from './shotsDist.json';
import starterData from './starters.json';

export const newsDate = '2025-01-02';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 17</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 17 saw the greatest championship final in league history, as well as the lowest scoring matchup in league history thanks to two rule breaking managers. The championship matchup came down to a MNF showdown between Jahmyr Gibbs and Amon-Ra St. Brown. Entering the Lions final drive of the game, Costo Guys held a slim lead, 147.42 to 144.88 points over Pink Pony Kupp. With the Lions leading in the game, it was unclear whether Gibbs would be on the field for the final drive. He ended the game with an 8 yard carry, a 4 yard carry, and finally a 30 yard TD run that sealed the game for the Lions and Pink Pony Kupp. This also helped elevate Gibbs to the RB1 started in our league this week. Costo Guys ended with 147.42 points, which was the #1 Best Loser this season, and they only left 0.3 points on the bench. They had the Biggest D this week, PHI, who scored 19 points.
            </p>
            <p>
                Now to the two rule breakers, League Loser Prophecy and Twin Bowers. These two faced off in the 10th place game, and mutually agreed to violate Article IV of the bylaws by not setting their best possible lineup. They set up a 1v1 kicker showdown between Dicker the Kicker and Jake (Master) Bates. Dicker the Kicker ended up scoring the most points of any kicker this week, helping League Loser Prophecy win the game, and be the Worst Winner in league history. Twin Bowers meanwhile was the Most Mismanaged Team and also had the Warmest Bench, leaving 103.3 points on their bench.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                The top 2 scoring teams were the finalists, and both managed at over 95% efficiency in the most important game of the season. Just Joshin pt. 2 had the worst management of any team who actually tried to set a lineup this week.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Championship Game</ArticleHeader>
            <ArticleSubheader>Third Highest Scoring Game This Season</ArticleSubheader>
            <p>
                Costo Guys put up a solid performance in the championship. Every other team this season who scored more than 147 points won their matchup. Malik Nabers was their best player, scoring 36.1 points in the Drew Lock masterclass. Lamar Jackson helped out adding in nearly 30 points of his own, and Amon-Ra and PHI D put in 20 and 19 respectively. They were let down by Nico Collins, Breece Hall, and Chris Boswell.
            </p>
            <p>
                Pink Pony Kupp put up 155.08 points in the championship, the most points scored in a championship game in recorded league history. Joe Burrow put up 36.98 points, which he needed OT to do. Jahmyr Gibbs, Bucky Irving, Jalen McMillan, and Brian Thomas all scored 23 or more points. They were let down by namesake Cooper Kupp and new-to-them TE Hunter Henry. Their K and DEF each chipped in 9 points.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Pink Pony Kupp took home 80% of the prize, and Costo Guys took home the other 20%.
            </p>
            {/* <ArticleSubheader>Matchup of the Week 2023-24</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
            <ShotsDistributionChart chartData={shotsDistData} /> */}
        </div>
    )
}

const MatchupArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>3rd Place Game</ArticleHeader>
            <ArticleSubheader>No Big Booms For Calvin's Cold Streak</ArticleSubheader>
            <p>
                Calvin's Cold Streak scored the least points of any team who tried to set their lineup this week. Travis Kelce was the one major bright spot on this team, scoring 22.4 points. TB defense and Jordan Addison had the next best performances relative to expectation. This team was let down by Geno Smith and Alexander Mattison, and ended up losing the 3rd place game.
            </p>
            <p>
                Just Joshin pt. 2 was able to get this win thanks in large part to Ladd McConkey, Bijan Robinson, and Josh Allen. They also got respectable games from Aaron Jones, DJ Moore, Chig, and their K & DEF. James Conner got hurt early in his game, leading to a dud from him. Third place doesn't win this manager any money, but they might get a sense of pride and accomplishment out of back-to-back top-3 finishes.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            {/* <p>
                Pink Pony Kupp advances to the championship against Costo Guys, while Calvin's Cold Streak will be headed to the third place game against Just Joshin pt. 2.
            </p> */}
        </div>
    )
}

// const MatchupArticleThree = () => {
//     return (
//         <div>
//             <ArticleHeader>5th Place Game</ArticleHeader>
//             <ArticleSubheader>Two Terrible Teams Try To Take (Ten / Two)th</ArticleSubheader>
//             <p>
//                 Giving Me a Chubb only scored 92.56 points in the quarter-finals last week, so they at least improved their score in their second playoff game. There are a lot of players bunched up at the bottom of their bar in the chart who scored 6.1 points or less. These players are not worth discussing besides Trey McBride, who had his worst game of the season this week. Their top 4 players put up decent numbers, but it wasn't enough to get the win in this 5th place game nobody will remember.
//             </p>
//             <p>
//                 Youngster Joey redeemed themselves this week after scoring less than 80 points last week in their first playoff game, but it is too little too late as this game only got them 5th place. Saquon was the MVP this week, but that mostly was because this team didn't put up a ton of points. Kyler and Jake Elliott were the 2nd and 3rd highest scorers this week for this team, and both their WRs scored less than 8 points. They were able to get the W in this game despite all of that.
//             </p>
//             <MatchupPlot data={starterData} matchupId={3} />
//             <p>
//                 These 2 teams will watch the final week from the sidelines, waiting for the toilet bowl single to drop.
//             </p>
//         </div>
//     )
// }

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Toilet Bowl Final</ArticleHeader>
            <ArticleSubheader>First Down Syndrome Makes a Great Band Name</ArticleSubheader>
            <p>
                First Down Syndrome put up 130.14 points, their 2nd highest point total of the season, only behind their victory to avoid last place in week 14. This team nearly clutched up yet again, but couldn't score enough because of their RBs and DEF shitting the bed. The rest of their players did about as well as you could hope, with 5 of them scoring over 19 points, and they got 11.3 from their kicker. If only they got more than 5.3 total points from their RBs and DEF.
            </p>
            <p>
                Njorkin da Tenis was able to get the win in the all-important toilet bowl final. Jayden Daniels, Tee Higgins, and Puka Nacua came in clutch for them, and Rhamondre, Ferguson, and NO DEF disappointed them. Tyjae Spears and Travis Etienne scored a lot more than their opponents RBs, which helped them secure the win.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                First Down Syndrome will be releasing a song as a result of this loss.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>10th Place Game</ArticleHeader>
            <ArticleSubheader>Kick Measuring Contest</ArticleSubheader>
            <p>
                There isn't much to discuss in this matchup. Dicker the Kicker scored 18.4 points to propel League Loser Prophecy to victory.
            </p>
            <p>
                Jake Bates scored 9.9 points leading Twin Bowers to a loss. These two messed up the league's historical data forever.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            {/* <p>
                First Down Syndrome will advance to the toilet bowl final against Njorkin da Tenis, while Twin Bowers will be headed to the 10th place game against League Loser Prophecy.
            </p> */}
        </div>
    )
}

// const MatchupArticleSix = () => {
//     return (
//         <div>
//             <ArticleHeader>8th Place Game</ArticleHeader>
//             <ArticleSubheader>Huge Numbers In The Most Meaningless Game</ArticleSubheader>
//             <p>
//                 Fortnite Master Builder and Kirk Thuggins & The Boys combined for the 2nd most points in any matchup this season in this game with 307.46 total points. Fortnite Master Builder led the way with 166.14 points, and Justin Jefferson led them with 36.4 points to his name. They only had their defense score less than 10 points, and had Devon Achane score over 30 as well. This team had some big spike weeks this season, but those aren't helpful if you can't make the playoffs.
//             </p>
//             <p>
//                 Kirk Thuggins & The Boys also scored a ton of points this week, with Jonathan Taylor, Keenan Allen, and Brandon Aubrey leading the way for them. Jamaal Williams, Jerry Jeudy, and Pat Freiermuth all scored less than 5, so their performance just wasn't well rounded enough to beat Fortnite Master Builder.
//             </p>
//             <MatchupPlot data={starterData} matchupId={6} />
//             <p>
//                 Both of these teams will watch from the sidelines as the season concludes in week 17.
//             </p>
//         </div>
//     )
// }

const ScoringDistributionArticle = () => {
    return (
        <div>
            <ArticleHeader>Scoring Distributions</ArticleHeader>
            <ArticleSubheader>Distribution of Scoring</ArticleSubheader>
            <StackedHistogram chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>
            <p>
                This chart is so much less helpful now with such a low end.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                We had our highest median score of the season, and the lowest average thanks to our kicker face-off.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                3 out of the 4 games this week were close. Pink Pony Kupp earned their 2nd close victory, while Costo Guys took their 3rd close defeat. Njorkin da Tenis earned their 2nd close victory, while First Down Syndrome took their 3rd close defeat. League Loser Prophecy earned their 2nd close victory, while Twin Bowers took their 4th close defeat.
            </p>
        </div >
    )
}

// const StandingsArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Standings & Points</ArticleHeader>
//             <ArticleSubheader>Current Standings</ArticleSubheader>
//             <LeaderboardTable leaderboardData={leaderboardData} />
//             <p>
//                 Just Joshin pt. 2 took the #1 seed from Pink Pony Kupp this week, but both teams still have the round 1 playoff bye. Calvin's Cold Streak jumped up to claim the 3 seed to earn the right to play Youngster Joey in the first round. Costo Guys fell to the 4th seed, and will play against 5 seed Giving Me a Chubb in round 1 of the playoffs.
//             </p>
//             <ArticleSubheader>PF Vs. PA</ArticleSubheader>
//             <PfPaScatter leaderboardData={leaderboardData} />
//             <p>
//                 Costo Guys threw the massive PF lead they had all season, being overtaken by Just Joshin pt. 2 this week. Pink Pony Kupp is a close 3rd in PF. Giving Me a Chubb took over the PA lead from Twin Bowers this week, and League Loser Prophecy nearly closed the gap as well. Njorkin da Tenis and First Down Syndrome are still clearly behind in PF, but they scored those points when it mattered most.
//             </p>
//         </div>
//     )
// }

// const PowerRankingsArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Power Rankings</ArticleHeader>
//             <ArticleSubheader>Current Power Rankings</ArticleSubheader>
//             <PowerRankingsTable powerRankingsData={powerRankingsData} />
//             <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 0 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 0 would mean that you played the worst team every week.</ArticleCaption>
//             <p>
//                 Just Joshin pt. 2 reclaimed the top spot in the power rankings. Interestingly, League Loser Prophecy moved up to 4th, despite being last in the league. They have a positive record against all teams this season, something only 6 teams can say. 5 of those 6 teams are in the playoffs, and League Loser Prophecy is in last instead.
//             </p>
//         </div>
//     )
// }

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

// const AlternateUniverseArticleOne = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #1</ArticleHeader>
//             <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
//             <AltLeaderboardTable data={medianLbData} />
//             <ArticleCaption>If everyone played their matchup each week, and also played against the median, this is what the leaderboard would look like.</ArticleCaption>
//             <p>
//                 League Loser Prophecy would've finished 7th in this universe, and Njorkin da Tenis would've ended up doing the last place punishment. Remember this one for the meme section.
//             </p>
//         </div>
//     )
// }

// const AlternateUniverseArticleTwo = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #2</ArticleHeader>
//             <ArticleSubheader>Best Ball Standings</ArticleSubheader>
//             <AltLeaderboardTable data={bestBallLbData} />
//             <ArticleCaption>If everyone played their best lineup every week, this is what the standings would look like. All columns include hypothetical totals.</ArticleCaption>
//             <p>
//                 First Down Syndrome would've been in last place in this scenario, only winning 4 games.
//             </p>
//         </div>
//     )
// }

// const AlternateUniverseArticleThree = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #3</ArticleHeader>
//             <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
//             <ScheduleTable data={scheduleData} />
//             <p>
//                 League Loser Prophecy could've been 10-4 (#1 seed) with 2 different schedules, and their worst possible record is only 1 more loss than they ended up with. League Loser Prophecy would've made the playoffs with 7 other managers schedules, and there are only 2 schedules where they get last place.
//             </p>
//             <p>
//                 First Down Syndrome would've be 1-13 with Twin Bowers schedule, only winning their first game this past week. There are 3 teams who could've outright lost to League Loser Syndrome had they had different schedules: First Down Syndrome, Kirk Thuggins & The Boys, and Njorkin da Tenis. Count yourself lucky if you're one of those teams. Njorkin da Tenis would've been 3-11 with the infamous schedule of League Loser Prophecy.
//             </p>
//         </div>
//     )
// }

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
            <ArticleSubheader>Last Place Punishment</ArticleSubheader>
            <LeagueQuote>
                "Thank you guys for tuning in. 24 hours, wow. What a night. What a day of adventures. ... Thanks to everyone out there, thanks to Colin Hodge for being the first one to play with me. ... Thanks for all the love and support in the chat, get home safe."<br />- Alec <a href='https://www.twitch.tv/theoffensiveline/clip/PiercingWrongSandpiperHeyGuys-tHxYpR7ty-xE8_B0'>wrapping up stream</a>
            </LeagueQuote>
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/9ff6jl.jpg"}></ArticleImage>
            </ImageWrapper>
            <p>
                Alec completed his 24 hour Fortnite stream punishment this week, from 8pm ET Sunday to about 9pm ET on Monday. During the stream, Alec earned 4 Victory Royales, consumed 1.78125 gallons of liquid, and pissed 24 times. Alec ended up with 84 kills for a 1.09 K/D in his games, and had 14 top 10% finishes, and 28 top 25% finishes. 0 dreams about Fortnite were had after 24 straight hours of playing. Alec also did an epilogue stream on Tuesday for a few hours, where he got a few more Victory Royales, and drank a few more seltzers.
            </p>
            <p>
                Some managers are saying the punishment was too easy, since Alec wasn't really feeling upset about it afterwards, and did another Fortnite stream the next day.
            </p>
            <LeagueQuote>
                "Next year loser has to go to Disney"<br />- Matt Smith
            </LeagueQuote>
            <p>
                This did seem like the easiest punishment the league has had so far, with Alec vouching that the ACT was worse than this. Whether the calendar or the 30 challenge were worse could be debatable, but this was definitely not as much of a punishment as some managers may have anticipated.
            </p>
            <p>
                About 15 hours in, Anthony joined the stream and complained about the audio quailty, causing Alec to attempt to reset the connection between his headset and his PC. This caused the PC to crash, ruining the Twitch timer, and the stream was not 24 consecutive hours of Fortnite, per the rules.
            </p>
            <ArticleSubheader>Championship Results</ArticleSubheader>
            <LeagueQuote>
                "Congrats Trevor no one cares 🥰🥰🥰"<br />- Anthony
            </LeagueQuote>
            <p>
                Greg mentioned there are 480 reasons to care, and Trevor had received multiple congratulatory texts from other managers prior to this claim that no one cares.
            </p>
            <LeagueQuote>
                "The Commissioner's Office extends a big thank you to Trevor for bravely preventing Greg from winning the league"<br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                This anonymous manager also seemed to care about Trevor winning the league, or maybe cared more about Greg not winning.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ff70i.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ff78t.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ffc4n.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ffcb3.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ffcc7.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ffcex.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ffckc.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ffcwo.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme9 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ffcoz.gif"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme10 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ffd1e.jpg"}>
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
    // {
    //     id: 4,
    //     content: MatchupArticleThree,
    // },
    {
        id: 5,
        content: MatchupArticleFour,
    },
    {
        id: 6,
        content: MatchupArticleFive,
    },
    // {
    //     id: 7,
    //     content: MatchupArticleSix,
    // },
    {
        id: 8,
        content: ScoringDistributionArticle,
    },
    // {
    //     id: 9,
    //     content: StandingsArticle,
    // },
    // {
    //     id: 10,
    //     content: PowerRankingsArticle,
    // },
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
