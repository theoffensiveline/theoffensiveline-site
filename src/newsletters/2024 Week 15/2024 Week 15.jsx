import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, ArticleCaption, LeagueQuote, AwardsGridV2, WeeklyScoringChart, WeeklyMarginTable } from '../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
// import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
// import medianLbData from './medianLb.json';
import motwHistoryData from './motwTable.json';
// import playoffData from './playoffTable.json';
// import powerRankingsData from './powerRankings.json';
// import scheduleData from './scheduleData.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';

export const newsDate = '2024-12-19';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 15</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 15 was the first round of the playoffs and the toilet bowl, and 4 teams were sitting on the sidelines watching the madness take place. We had our #1 Best Managed Team of the season this week from Costo Guys who scored 192.3 points in the first round of the playoffs. Maybe they lost all those games because they knew they didn't wanna waste this week during a playoff bye. This #1 performance also led to the #1 Deadest Horse of the season, and they were so close to defeating Giving Me a Chubb by 100 points. Costo Guys had the top scoring RB, WR, and DEF this week.
            </p>
            <p>
                We also had the 4th lowest score of the season from Youngster Joey, who only scored 76.96 points in their playoff loss. This isn't their lowest score this season, they scored 64.26 points just last week. This is the lowest score of any playoff team in recorded league history. There wasn't one player on their team who scored at least 12 points this week. This team really made the playoffs? They would've lost to any toilet bowl team this week.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                Costo Guys put up the most points this week, but wasn't the most efficient. That award went to Kirk Thuggins & The Boys, who scored 99.5% of their maximum and only left 0.8 points on their bench this week. The least efficient manager was Fortnite Master Builder, but they were still able to pull out the win so they're fine with that.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>We've Officially Come Full Circle</ArticleSubheader>
            <p>
                In the final MotW of the season, Fortnite Master Builder was able to secure the victory, just like they were able to do in the toilet bowl last season. They will start next season with MotW the same way they started this season with MotW. If the theory holds about how Sleeper creates schedules, and we don't make any changes, we could see a rematch between Fortnite Master Builder and League Loser Prophecy in the first MotW of next season. Fortnite Master Builder was able to get this win thanks in large part to Mike Evans dropping 36.9 points. He was 0.4 points away from being the Widest Receiver this week.
            </p>
            <p>
                Njorkin da Tenis had a good run in MotW for being last in PF this season. This team knows how to put up points under duress. Sadly this week, they couldn't get it done in the toilet bowl, and will be advancing to the semi-finals of the toilet bowl. Rhamondre Stevenson, Kyle Pitts, Daniel Carlson, and ARI DEF all scored below 10 points, so 4 shots/dogs are in order.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Fortnite Master Builder will matchup with Kirk Thuggins & The Boys in the 8th place game. Njorkin da Tenis moves on to the 2nd round of the toilet bowl where they face off with League Loser Prophecy, who is coming off of a first round bye.
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
            <ArticleHeader>The Other Toilet Bowl Game</ArticleHeader>
            <ArticleSubheader>Two Teams That Would've Beaten Youngster Joey by 60+, and Won Youngster Joey's Playoff Matchup</ArticleSubheader>
            <p>
                Two teams that were in the playoffs last year found themselves in the toilet bowl this year, and this matchup was electric. Twin Bowers schedule difficulty carried into the toilet bowl, playing against the 2nd highest scoring team of the week while scoring the 3rd most points. This was a week for the Brown's, with both A.J. and Chase scoring over 25 points for this team. DEN DEF also chipped in 20 points, but it wasn't enough. An atypical rough game from Brock Bowers was likely the difference maker in this one.
            </p>
            <p>
                Kirk Thuggins & The Boys was able to win this matchup thanks to a well rounded team performance, with only their defense scoring less that 10 points. The standout was Baker Mayfield, who scored 28.02 points this week while feeding Mike Evans. Jerry Jeudy and Keenan Allen both scored over 20 points as well to help this team win.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Kirk Thuggins & The Boys advances to the 8th place game against Fortnite Master Builder. Twin Bowers moves on to the 2nd round of the toilet bowl where they face off with First Down Syndrome, who is coming off of a first round bye.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Playoff Quarter-Final #1</ArticleHeader>
            <ArticleSubheader>Youngster Joey Hurt Himself In Confusion!</ArticleSubheader>
            <p>
                Youngster Joey scored the 4th least points of any team this season this week in their first playoff appearance. Their top scorer was Brian Robinson, who scored 11.7 points this week. They had 3 other players above 10 points, and 5 players who scored less than 10 points, including their first and second round picks, Saquon Barkley and Marvin Harrison Jr.
            </p>
            <p>
                Calvin's Cold Streak essentially had a playoff bye in round 1, but that didn't stop them from putting up points. Jared Goff had 41.06 points this week in a shootout with the Bills, and this was the 5th best MVP performance of the season, scoring 32.29% of the team total. Other top contributors were Josh Jacobs and Ja'Marr Chase.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Youngster Joey will move into the 5th place game against Giving Me a Chubb. Calvin's Cold Streak advances to the second round and will face off against the 2 seed, Pink Pony Kupp.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Playoff Quarter-Final #2</ArticleHeader>
            <ArticleSubheader>Biggest Blowout Ever?</ArticleSubheader>
            <p>
                If we don't count the Damar Hamlin game, this might be the biggest blowout in league history. Costo Guys won this matchup by nearly 100 points. They had 2 players score over 35 points, and 5 players who scored 22 or more points. Impressive stuff, hopefully they didn't blow their full load in round 1.
            </p>
            <p>
                Giving Me a Chubb couldn't hit triple digit points in the playoffs, but gets to hide this poor performance behind Youngster Joey's awful performance. Their top scorer was Trey McBride who scored 17.7 points, and they got a 0 from Amari Cooper while the Bills offense otherwise went crazy this week. They didn't really have a chance to win this, but would've liked to have put up more of a fight.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Costo Guys will advance to the second round of the playoffs against the 1 seed Just Joshin pt. 2. Giving Me a Chubb will play in the 5th place game against Youngster Joey.
            </p>
        </div>
    )
}

// const MatchupArticleFive = () => {
//     return (
//         <div>
//             <ArticleHeader>Matchup #5</ArticleHeader>
//             <ArticleSubheader>Highest Team Score This Season</ArticleSubheader>
//             <p>
//                 Calvin's Cold Streak scored the most points of any team this season this week, with 182.12 points, beating the record set in week 2 by Kirk Thuggins & The Boys, who scored 177.12 points. Ja'Marr Chase and Jordan Addison went nuclear this week, both having over 39 points. Chase scored the 2nd most points of any WR started in this league this season, only behind himself in week 10 when he scored 55.4 points. Josh Jacobs chipped in 3 TDs of his own, and everyone else scored at least 9 points, including 17 from their kicker who sadly doinked in a game-winner for the Chiefs.
//             </p>
//             <p>
//                 This matchup was the 2nd highest scoring matchup of the season, with the 2 teams combining for 294 points this week. Contributing 38% of that total was Giving Me a Chubb. While this wasn't the most impressive performance, they still managed to clinch a playoff spot. Had they scored 25 fewer points, they would've missed the playoffs. Their defense wasn't any help this week, scoring -1 points. Nick Chubb wasn't great either, only scoring 4.8 points. The rest of their players put up enough points to get the job done.
//             </p>
//             <MatchupPlot data={starterData} matchupId={5} />
//             <p>
//                 Calvin's Cold Streak will play against Youngster Joey in round 1 of the playoffs, and Giving Me a Chubb will play against Costo Guys in the first round of the playoffs.
//             </p>
//         </div>
//     )
// }

// const MatchupArticleSix = () => {
//     return (
//         <div>
//             <ArticleHeader>Matchup #6</ArticleHeader>
//             <ArticleSubheader>Another Down Week For Costo Guys</ArticleSubheader>
//             <p>
//                 This was Costo Guys 3rd straight week under 110 points, and their 3rd straight loss. They had the playoff bye all but locked up 3 weeks ago, and now they don't have one anymore. James Cook did not cook this week, since Josh Allen did all the work for the Bills. Their best player this week was Chuba Hubbard. They didn't even leave that many points on their bench. This team will be looking to up their game for week 1 of the playoffs.
//             </p>
//             <p>
//                 Pink Pony Kupp had a solid week, scoring the 5th most points of any team this week. They had 5 players above 19 points this week, and could've won this matchup with just those 5 players. Bucky Irving got hurt, and they had Rico Dowdle on their bench who scored 15.1 points. They also had Juwan Johnson on their bench who scored 15 points.
//             </p>
//             <MatchupPlot data={starterData} matchupId={6} />
//             <p>
//                 Costo Guys will play against Giving Me a Chubb in week 15, while Pink Pony Kupp will be resting their players during their playoff bye.
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
                A new high this week, and another really low game as well.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                Interestingly a new high with the top 2 teams on bye, and another really low with the worst 2 teams on bye.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                Fortnite Master Builder earned their 3rd close victory, and are now 3-5 in close games this season. Njorkin da Tenis was handed their 4th close defeat, and move to 1-4 in close games. Kirk Thuggins & The Boys earned their 4th close victory, and move to 4-1 in close games. Twin Bowers was handed 2nd straight close defeat, and their 3rd of the season. They are now 2-3 in close games.
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
            <ArticleSubheader>MotW Videos</ArticleSubheader>
            <LeagueQuote>
                "Nikhil where's your video pal"<br />- Alec Maxwell
            </LeagueQuote>
            <p>
                Alec has reason to question his fellow manager, who released a trailer for his MotW video multiple weeks ago, with no release date. Releasing a trailer for a MotW video is a first, and league managers have no idea about the timeline of the actual video. Luckily Nikhil was able to win this matchup this week, or he would've lost 2 additional MotW's since this video was assigned to him.
            </p>
            <p>
                Anthony also released his MotW video this week, and kept it "short and sweet". One thing in his video was not short however.
            </p>
            <LeagueQuote>
                "Crazy cameo from Steven Adams"<br />- Josh K
            </LeagueQuote>
            <LeagueQuote>
                "Zach Edey is that you?"<br />- Devan
            </LeagueQuote>
            <ArticleSubheader>Other Submissions</ArticleSubheader>
            <LeagueQuote>
                "We should switch to a college football selection format because there is no way that Anthony should be in the playoffs"<br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                One playoff format that some leagues use is reserving the final playoff spot for the manager with the most points, regardless of record. In this format Nikhil would've made the playoffs over Anthony. This doesn't make any sense for our punishment league, as Alec would've been 32 points away from making the playoffs while being in last, but it is interesting to note. It is also interesting to note that Anthony was outside the top 6 in the power rankings, and if we used those as a selection committee both Nikhil and Alec would've made the playoffs over Anthony and Devan, the two lowest playoff teams.
            </p>
            <p>
                Alec, who was on bye in the toilet bowl this week and didn't even set his lineup, would've beaten any team that played this week besides Greg. His team popped off and he scored over 150 points, with Davante Adams, CeeDee Lamb, and Terry McLaurin all going crazy. Davante Adams led all scorers this week with 42.8 points, and Lamb and Terry were 15 and 16 respectively. If only this performance wasn't wasted on a bye week, and could've helped them win one more regular season game.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ecrp0.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ecrio.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Josh K</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ecsal.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ecsd1.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ecsxx.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ect93.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ectgm.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ectlr.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme9 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ectte.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme10 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9ecu7b.jpg"}>
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
    // {
    //     id: 6,
    //     content: MatchupArticleFive,
    // },
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
