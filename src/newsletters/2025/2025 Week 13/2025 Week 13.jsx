import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable, PlayoffTable, LineupScatter } from '../../../components/newsletters/newsStyles';
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
import startingLineupData from './startingLineupData.json';
import { leagueIds } from '../../../components/constants/LeagueConstants';

export const newsDate = '2025-12-04';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 13</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                The highest scoring team of the week played against the lowest scoring team of the season this week, and it still wasn't our biggest blowout of the season despite a margin of victory of 82.54 points. This matchup was pretty irrelevant in the grand scheme of things though, especially in comparison to the closest game of the week, and the most important game of the season up to this point for the 2 teams involved. The worst winner of the week, 36 Spikeball Pro Nets, was able to defeat Bye Week Curious by 4.88 points, moving themselves up from 12th into 11th place and putting all the pressure on Bye Week Curious to win in week 14 and avoid last place.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                This was a very poor week of management across the board, shown by all of the gray on this chart. The only managers above 90% were the most efficient manager of the week, WalterPickens, at 98.5%, and the top manager of the week, JonathanTaylorFansCrying, at 90.6% with the most points scored. There were 5 managers in the 70s of efficiency, including 4 of the bottom 5 teams in the standings.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Uncle Rico Making a Playoff Push</ArticleSubheader>
            <p>
                BBCU put up a measly 110.54 points this week, and will have to do 4 shots because of it. This was their 3rd lowest weekly total of the season, and they have yet to win a game where they score less than 125 points. Bijan and McBride did their part, but JSN had his worst week of the season when it mattered most and it cost them the game.
            </p>
            <p>
                Uncle Rico Went Pro had a good week, led by their elite WR duo of Rashee Rice and Davante Adams. Rice is a PPR monster and Adams is a TD machine. Everyone else on their team chipped in a reasonable amount, aside from their DEF, but they still won the DEF battle with their opponent.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Uncle Rico Went Pro will be out for revenge in week 14 against a depleted WalterPickens who defeated them in MotW just 3 weeks ago. BBCU will be looking to finish off the Hubbell Curse and make it a clean 0-6 for Super Ja'Marrio Bros. in division this season.
            </p>
            <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleCaption>
                <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
            </ArticleCaption>
            <p>
                Uncle Rico Went Pro earned their 9th MotW victory, 2nd most all-time. Their 35 shots/dogs given out is also 2nd most all-time, but is only halfway to the #1 spot. BBCU lost their 3rd MotW of the season, the most of any team this season so far. The loser of week 14 will tie them at 3 losses this season. This loss was their 6th loss all-time, which is tied for 3rd with 3 other teams. Their 24 hot dogs/shots consumed is tied for 4th, with half of those coming this season.
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
            <ArticleSubheader>Last Place Race</ArticleSubheader>
            <p>
                36 Spikeball Pro Nets knew that they had to win this week if they wanted a chance at avoiding last place this season. They came out swinging with a massive 98.12 points this week, which is more often than not enough to beat Bye Week Curious. Prior to this week, Bye Week Curious had scored less than 95 points in 7/12 of their games. That moved to 8/12, so 36 Spikeball Pro Nets was able to pull out the win in this important matchup.
            </p>
            <p>
                Bye Week Curious had an above average week by their standards, but they were edged out by their opponent again this week. RJ Harvey led the way with 21.2 points, but 6.7 from TE and 4 from your K isn't going to cut it. It is also tough to have 2 of your WR combine for about 10 points, but their opponent had some worse WRs somehow.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                36 Spikeball Pro Nets will be up against the #1 seed, JonathanTaylorFansCrying, in week 14. That is a tough matchup they would prefer to win, especially since Bye Week Curious gets a winnable matchup with Costco Guys, who just put up the lowest total of any team this season in week 13.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Beat by a DEF and a WR</ArticleSubheader>
            <p>
                Costco Guys got EMBARRASSED this week by JonathanTaylorFansCrying, and would've lost to just their DEF and CeeDee Lamb. Their top player was Jahmyr Gibbs with 11.6 pionts, and their K was the only other player above 10 points. Their 3 WRs combined for 7.1 points, which was barely better than their opponents lowest scoring player who had 6 points. They didn't have much firepower on their bench either, with their maximum possible score being below 75 points.
            </p>
            <p>
                JonathanTaylorFansCrying cruised to a win this week, led by SEA DEF, CeeDee Lamb, and Drake Maye. This team continues a dominant season and has the #1 seed locked up for their playoff run.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Costco Guys will be up against 4-9 Bye Week Curious in week 14, and JonathanTaylorFansCrying will be up against 4-9 36 Spikeball Pro Nets.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>AJ Brown Goes to Town on First Down</ArticleSubheader>
            <p>
                First Down Syndrome scored exactly 101 points this week, which makes this chart look a little strange. Amon-Ra St. Brown had an unfortunate 0 point week after getting injured early, which could've swung the result of this matchup in the other direction. They had big games from Nico and D'Andre Swift, but Jalen Hurts didn't do enough to fully offset his teammate A.J. Brown on the other side of this matchup.
            </p>
            <p>
                Singing Like Mariah Terry was carried in this one by A.J. Brown and Patrick Mahomes, who combined for 56% of this teams points this week. A.J. Brown has been passed around this league this season, being traded 3 times and being on 4 different teams. He finally found his home on Singing Like Mariah Terry, and has scored 25 and 35.2 over the last 2 weeks.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                First Down Syndrome will be up against The Barkley Brawlers, who has already secured their playoff spot. Singing Like Mariah Terry has been eliminated from the playoffs, and will be up against Lord of the Littles in week 14.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Hubbell Curse Undefeated</ArticleSubheader>
            <p>
                Super Ja'Marrio Bros. knew the Hubbell Curse was bad, but nobody expected 0-5 in divisional play this season. They weren't able to get the job done this week, only scoring 103.76 points. A bunch of their players scored 10+ points, but their highest scoring player only had 18 points, which usually isn't enough to win unless everyone has 15-18 points.
            </p>
            <p>
                WalterPickens was able to get the job done, and Brock Bowers led the way against his former manager. All of his other players contributed, with the lowest scorer being 6 points from their DEF.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Super Ja'Marrio Bros. will be up against BBCU in week 14 in what could be their final Hubbell Division game of the season if the other 3 division members make the playoffs. WalterPickens will be back in MotW in week 14 against Uncle Rico Went Pro for a week 11 rematch.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>No Idea What To Put Here</ArticleSubheader>
            <p>
                Lord of the Littles couldn't get the job done again this week, this is their 5th loss in 7 weeks after a 5-1 start to the season. Dak Prescott and Devon Achane led the way, but nobody else did anything notable so they struggled to score points.
            </p>
            <p>
                The Barkley Brawlers broke 100 this week, which luckily for them was enough to get the win this week. They had a pretty balanced approach with their worst player scoring 5.6 points and their best player scoring 18.7 points.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Lord of the Littles will be up against Singing Like Mariah Terry in week 14, and The Barkley Brawlers will be up against First Down Syndrome.
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
                This week was pretty evenly distributed outside of our new low of the season.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                We had to add some room on the bottom of this chart this week, and the maximum was also very low as well.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                We had another close game for Bye Week Curious this week, but they came out on the wrong side of it this time.
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
                JonathanTaylorFansCrying secured the #1 seed this week now that they are 2 games up with 2 games to go. They have the lowest PA of any team in the league. BBCU has the highest PF so they remain in 2nd place with 2 other teams sitting at 8-5 below them. The Barkley Brawlers are 8-5 with the 10th most PF and the 11th most PA, so they have had some matchup luck along the way to this record. Bye Week Curious drops to 12th after their loss to 36 Spikeball Pro Nets. They will need a win and a loss from the 11 seed to avoid last place with how wide the PF gap is at this point.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                The top 3 seeds are all on the good side of the graph, and then there is the 4 seed The Barkley Brawlers, who has fewer PF than the 11 seed 36 Spikeball Pro Nets. Luck is the main differentiator between those teams after 13 games. Bye Week Curious is so far on the bad side that it is only right for them to be in last.
            </p>
            <ArticleSubheader>Starting Lineup Analysis</ArticleSubheader>
            <LineupScatter data={startingLineupData} />
            <p>
                Costco Guys is the most boom/bust team in the league, and this week their entire team busted resulting in the lowest score of any team this season. BBCU showed off their consistency this week, scoring 110 in a "bad week" for them, more than double what Costco Guys scored.
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
                No movement in the top 4 teams in the power rankings this week. First Down Syndrome and Super Ja'Marrio Bros. both jumped over Lord of the Littles who has been on a skid as of late. Bye Week Curious is still in last, and broke 100 play all losses this week. 9th in the power rankings is a team that has already secured a playoff spot, The Barkley Brawlers, so playoff teams might be jockeying to get a first round matchup with them if they can't get the bye.
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
                Three more teams clinched a playoff spot this week, and there are now two spots left to fill. There will be 4 teams fighting for those 2 spots, and they all have a shot at them if things break right. Costco Guys is the least likely team to make it thanks to their low PF. It looks extremely likely that Uncle Rico Went Pro will make it in, and Lord of the Littles is likely to make it as well.
            </p>
            <p>
                While it is technically true that Super Ja'Marrio Bros. and Singing Like Mariah Terry can finish with the same 5-9 record as Bye Week Curious and 36 Spikeball Pro Nets, it is virtually impossible for them to get last since they have a massive PF lead on Bye Week Curious. So the 2 teams in true contention for last are the 4-9 teams. Bye Week Curious can avoid last with a win and a loss from 36 Spikeball Pro Nets, which the simulations give a 26% chance of.
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
                The Barkley Brawlers would not be in the playoffs in this universe since they would be below .500, with their 4-9 record against the median this season. Last place would be more exciting of a race with 3 teams tied at 8-18 in last place.
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
                Uncle Rico Went Pro would be 10-3 and in 1st if they made the right start/sit decisions every single week. Bye Week Curious would still be in last at 2-11.
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
                BBCU would've lost with Costco Guys schedule this week, taking away the last undefeated scenario. BBCU has had the worst possible schedule for them, sitting at 8-5 in the wosrt case, matching their current record. They would be 12-1 with Costco Guys or Lord of the Littles schedule. Super Ja'Marrio Bros. has also had the worst possible schedule at 5-8, and could be 9-4 with 3 different schedules. The Barkley Brawlers have had the best possible schedule, as have JonathanTaylorFansCrying, since neither improve their record with anyone else's schedule. The worst possible record is Bye Week Curious at 1-12 with BBCU or WalterPickens schedules.
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
                "Greg putting up 53.04 points pisses me off"<br />- Anonymous League Manager
            </LeagueQuote>
            <p>This one is truly anonymous, it is unclear who would be upset about this aside from Greg. Greg's matchup was largely irrelevant in the grand scheme of the league.</p>
        </div >
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://imgur.com/44bvXn2.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/7acw23S.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/EnBIPdk.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/C0aRHXA.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/N3NhCtE.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/WU1YrCB.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/x9riaLW.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/Dv2ZfX8.png"}>
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
        title: "2025 Week 13",
        description: "Testing this feature out to see if it works",
        image: "/banner_logo.png"
    }
};

export default newsletterData;
