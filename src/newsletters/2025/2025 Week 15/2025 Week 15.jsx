import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, ArticleCaption, LeagueQuote, AwardsGridV2, WeeklyScoringChart, WeeklyMarginTable } from '../../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
import motwHistoryData from './motwTable.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';
import { leagueIds } from '../../../components/constants/LeagueConstants';

export const newsDate = '2025-12-18';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 15</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Just as everyone predicted, Kyle Pitts and Trevor Lawrence were the two players you would want the most in week 15. For many managers of these players, they still didn't get to advance in the playoffs because they were in the toilet bowl, which was true in this league. Kyle Pitts was this weeks MVP with over 30% of 2nd Half Team's points this week. His 45.6 points was obviously TE1 this season, and these points accounted for 7% of Kyle Pitts' career fantasy point total. Trevor Lawrence was our #1 Bench MVP of the season, putting up 44.3 points on the bench for Super Ja'Marrio Bros. this week, contributing to them have the 6th warmest bench of the season.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                It was a pretty inefficient week all around, with the best manager at 96.5% in the toilet bowl. WalterPickens scored the fewest points this week, but could've managed their way out of that if they started Jacoby Brissett over Joe Burrow, which would've pushed them over the edge in their matchup as well. The Barkley Brawlers scored the most points and had the most potential this week, but their opponent had the lowest potential of any team. Their Mickey Mouse schedule continues into the playoffs.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Reigning Champ Goes Down - 10 Dogs in 2 Weeks</ArticleSubheader>
            <p>
                Uncle Rico Went Pro got their 2nd straight win against WalterPickens and their 3rd straight MotW win against a divisional opponent. They didn't put up a great score this week, scoring less than 110 for the 2nd straight week, but both times it was enough to get the win. Jaxson Dart and George Kittle were the top scorers with each of them scoring more than 22 points. Chase Brown, Cam Little, Rashee Rice, and Davante Adams all put up double digits as well.
            </p>
            <p>
                WalterPickens is eating 5 hotdogs for the 2nd straight week, and both could've been avoided if they made the opposite QB start/sit decision in both weeks. Last week they started Brissett over Burrow and this week it was Burrow over Brissett, both were the wrong choice. TreVeyon Henderson tried his best to be a league winner, but couldn't overcome the rest of the teams shortcomings.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                After 3 MotW matches in 5 weeks between these 2 teams, they are finally safe from matching up with one-another for the rest of this season. Uncle Rico Went Pro moves into the semi-finals against 1st Half Team. WalterPickens will be in the 5th place game against Lord of the Littles.
            </p>
            <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleCaption>
                <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
            </ArticleCaption>
            <p>
                Uncle Rico Went Pro earned their 11th MotW victory, 2nd most all-time. Their 45 shots/dogs given out is also 2nd most all-time. WalterPickens lost their league record 4th MotW of the season, and 8th MotW of all time, tied for 2nd most all-time. Their 34 shots/dogs consumed is 2nd most all-time. Their 15 shots/dogs this season is the 2nd highest total for one manager in any season.
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
            <ArticleSubheader>Mickey Mouse Schedule Persists</ArticleSubheader>
            <p>
                Lord of the Littles had Puka Nacua go for 27.9 points this week but struggled to get points from the majority of their team which left them with a total of 108.06 points this week. They had 5 players with less than 10, and their QB scored less than 12 points. The only other player who did relatively well was De'Von Achane who scored 18.7 points.
            </p>
            <p>
                The Barkley Brawlers again didn't really care that they opponent shit the bed, since they scored the most points of any team who had a matchup this week at 152.08 points. Michael Wilson continues to be Puka Nacua when Marvin Harrison Jr doesn't play. His 37.2 points combined with Cameron Dicker's 22 and MIA's 17 would've won them this week without any other player contributing.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Lord of the Littles will be in the 5th place game against WalterPickens in week 15. The Barkley Brawlers will be up against the #2 seed BBCU who had the most PF this season and scored 175.2 points in week 15 against nobody.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Amon-Ra St. Brown Syndrome</ArticleSubheader>
            <p>
                First Down Syndrome was saving the 2nd highest score of the season for the first round of the toilet bowl. Their 138.2 points came largely from 4 players, Amon-Ra, Nico, Hurts, and D'Andre Swift. The rest of their players scored below 7.5 points this week.
            </p>
            <p>
                Super Ja'Marrio Bros. scored a respectable 124.58 points this week, which outscored 3 of the 4 playoff teams. Their defense was their only player below 7.5 points this week, but they didn't have any boom games like their opponent having Amon-Ra. Since this was a toilet bowl game, they will have to do 3 shots/dogs for their 2 RBs and their DEF, which isn't too bad to start off with.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                First Down Syndrome will be in the 8th place game against 2nd Half Team in week 15. Super Ja'Marrio Bros. gets flushed to a matchup with Bye Week Curious who is at risk of adding a music video to their punishment with 2 more losses.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Kyle Pitts Booms - Costco Guys Bust</ArticleSubheader>
            <p>
                2nd Half Team got one of the best TE performances in NFL history from Kyle Pitts this week who scored 45.6 points. Josh Allen and Jameson Williams also popped off for 24.52 and 26.4 points respectively. The rest of their team was also pretty strong aside from their defense who only scored 1 point.
            </p>
            <p>
                Costco Guys didn't have anyone score over 20 which makes it impossible to compete with Kyle Pitts. Kenneth Gainwell and Tony Pollard were their top scorers, which shows you why they are in the toilet bowl this season. Jahmyr Gibbs continues his every other week production, booming in even numbered weeks and busting in odd numbered weeks. Since this was a toilet bowl game, they will have to do 3 shots/dogs for Jahmyr Gibbs, Jake Ferguson and HOU DEF, which isn't too bad to start off with.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                2nd Half Team will be in the 8th place game against First Down Syndrome in week 15. Costco Guys gets flushed to a matchup with Singing Like Mariah Terry in round 2 of the toilet bowl.
            </p>
        </div>
    )
}

// const MatchupArticleFive = () => {
//     return (
//         <div>
//             <ArticleHeader>Matchup #5</ArticleHeader>
//             <ArticleSubheader>Hubbell Curse Stays Undefeated in 2025</ArticleSubheader>
//             <p>
//                 BBCU used the Hubbell Curse to their advantage this week, cursing Ladd McConkey and Oronde Gadsden on MNF and allowing Justin Herbert to get enough points with his legs to get the win in this matchup. JSN did his usual thing, and instead of Bijan and Trey McBride it was Travis Etienne and Zay Flowers this week carrying the rest of the load.
//             </p>
//             <p>
//                 Super Ja'Marrio Bros. knew they were up against it this week, but put up their best effort in the loss. They only had 2 players below double digits this week which makes it pretty impressive to only score 115.88 points. Brandon Aubrey's 25.7 points is the most points of any kicker this season, and he is now the only player in NFL history with 3 made 50+ yard FG in the same game.
//             </p>
//             <MatchupPlot data={starterData} matchupId={5} />
//             <p>
//                 BBCU will be on bye in round 1 of the playoffs, and Super Ja'Marrio Bros. will be up against First Down Syndrome in round 1 of the toilet bowl.
//             </p>
//         </div>
//     )
// }

// const MatchupArticleSix = () => {
//     return (
//         <div>
//             <ArticleHeader>Matchup #6</ArticleHeader>
//             <ArticleSubheader>Bye Week Furious</ArticleSubheader>
//             <p>
//                 Bye Week Curious scored only 73.4 points this week. It also looks like they did not start a QB this week, but that was because Daniel Jones scored just 0.8 points before he died. RJ Harvey put up 22 points this week, but was the only player who did much of anything for their team in the most important matchup of the season.
//             </p>
//             <p>
//                 Costco Guys scored 132.26 points this week, with Jahmyr Gibbs scoring 37 points again this week. This is his 4th game this season over 37 points, which is a major reason why this team has been very boom or bust. Lamar Jackson is another contributor to this, but he had a good week this week with 21.06 points.
//             </p>
//             <MatchupPlot data={starterData} matchupId={6} />
//             <p>
//                 Bye Week Curious will be on bye in round 1 of the toilet bowl. Costco Guys will be up against Cockroach in round 1 of the toilet bowl.
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
                If we included teams that didn't have any matchups here, the distribution would be a lot wider.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                This week had a higher floor that usual, but we had 4 fewer teams playing. We would've had a lower low and a higher high if we included all teams.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                There were no close games in the first round of the playoffs; we will see if that trend continues next week.
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

// const StandingsArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Standings & Points</ArticleHeader>
//             <ArticleSubheader>Current Standings</ArticleSubheader>
//             <LeaderboardTable leaderboardData={leaderboardData} />
//             <p>
//                 Standings are locked in now, with not much movement this week. There was no consequential movement that changed anything. The biggest change was the playoff seeds swapping opponents and moving MotW around.
//             </p>
//             <ArticleSubheader>PF Vs. PA</ArticleSubheader>
//             <PfPaScatter leaderboardData={leaderboardData} />
//             <p>
//                 All 6 of the playoff teams are on the good side of the PF/PA line, and Costco Guys is the 7 seed with at .500 record who is also on the good side of the line. The other 5 toilet bowl teams are on the bad side of the line. It is tough to win when you are outscored on average.
//             </p>
//             <ArticleSubheader>Starting Lineup Analysis</ArticleSubheader>
//             <LineupScatter data={startingLineupData} />
//             <p>
//                 BBCU continues to sit in the top right, but it is tough to see movement in this chart week to week this late in the season. The last place team is in the bottom left, we will see if that trend continues next season, and The Offensive Line may do some work in the off-season to analyze historical trends as well.
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
//             <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 1 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 1 would mean that you played the worst team every week.</ArticleCaption>
//             <p>
//                 The power rankings going into the playoffs have 5 of the 6 playoff teams in the top-6 teams. The Barkley Brawlers are the 3-seed but are 9th in the playoff rankings. They would be 64-90 against all teams this season which shows how easy their schedule has been to get the 3-seed. They had the easiest schedule this season with a difficulty of 32.5. This was slightly harder than playing against Bye Week Curious every week who only had a team ability of 26.74.
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
//                 Three more teams clinched a playoff spot this week, and there are now two spots left to fill. There will be 4 teams fighting for those 2 spots, and they all have a shot at them if things break right. Costco Guys is the least likely team to make it thanks to their low PF. It looks extremely likely that Uncle Rico Went Pro will make it in, and Lord of the Littles is likely to make it as well.
//             </p>
//             <p>
//                 While it is technically true that Super Ja'Marrio Bros. and Singing Like Mariah Terry can finish with the same 5-9 record as Bye Week Curious and 36 Spikeball Pro Nets, it is virtually impossible for them to get last since they have a massive PF lead on Bye Week Curious. So the 2 teams in true contention for last are the 4-9 teams. Bye Week Curious can avoid last with a win and a loss from 36 Spikeball Pro Nets, which the simulations give a 26% chance of.
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
//                 The Barkley Brawlers would've snuck into the playoffs as the 6 seed, but all the playoff teams would remain unchanged in this universe. The last place team would also remain the same.
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
//                 Uncle Rico Went Pro would be 11-3 and in 1st if they made the right start/sit decisions every single week. Bye Week Curious would still be in last at 2-12.
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
//                 BBCU has had the worst possible schedule for them, sitting at 9-5 in the wosrt case, matching their current record. They would be 13-1 with Costco Guys or Lord of the Littles schedule. Super Ja'Marrio Bros. has also had the worst possible schedule at 5-9, and could be 10-4 with The Barkley Brawlers schedule. The Barkley Brawlers are the easiest possible schedule for 10/12 teams in the league. Cockroach are the hardest schedule for 8/12 teams in the league. The worst possible record is Bye Week Curious at 1-13 with BBCU or WalterPickens schedules.
//             </p>
//         </div>
//     )
// }

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
            <ArticleSubheader>Suvivor 2025 2.0 Complete</ArticleSubheader>
            <p>
                Congratulations to Nikhil for winning a very drawn out 2nd round of survivor after picking Alec to win this week. Josh hedged his bets and picked Trevor to beat him in the playoffs, and won the game but lost survivor. They lost the fight but they could still win the battle if they can advance to the finals they will make more money than they would've from survivor. The website will be updated next season to properly support multiple rounds of survivor and the special case where people all lose the last week and it keeps going.
            </p>
            <ArticleSubheader>League Submissions</ArticleSubheader>
            <LeagueQuote>
                "Jake is America's team"<br />- Anonymous League Manager
            </LeagueQuote>
            <p>There are a couple different ways this could be interpreted. The first, most obvious, and likely intended way is that they are America's team in the same way that whoever is playing the Chiefs is America's team since he is playing Anthony in the playoffs. The other way this could be interpreted is that they are America's team in the same way that the Patriots are America's team this year and they have by far the easiest schedule in the league.</p>

        </div >
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/UQ1nSaT.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/OGHnP7m.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/GQnuUHy.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/zwBt4Bf.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/DQM6g9e.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/kkbzSpN.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/zAfBFLw.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/30CtIaq.png"}>
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
    //     content: TradingVolumeArticle,
    // },
    // {
    //     id: 10,
    //     content: StandingsArticle,
    // },
    // {
    //     id: 11,
    //     content: PowerRankingsArticle,
    // },
    // {
    //     id: 12,
    //     content: PlayoffOutlookArticle,
    // },
    // {
    //     id: 13,
    //     content: AlternateUniverseArticleOne,
    // },
    // {
    //     id: 14,
    //     content: AlternateUniverseArticleTwo,
    // },
    // {
    //     id: 15,
    //     content: AlternateUniverseArticleThree,
    // },
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
