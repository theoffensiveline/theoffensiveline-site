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

export const newsDate = '2025-10-09';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 5</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Lord of the Littles found themselves on top of the weekly leaderboard for the 2nd time this season, and they have taken over 1st place on the overall leaderboard from D.K's Dying Minions who took their first loss of the season after their 4 game win streak in MotW. Lord of the Littles also had the 2nd biggest blowout of the season with a 54.5 point victory over our worst team of the week, Singing Like Mariah Terry. First Down Syndrome and Super Ja'Marrio Bros. faced off in an epic high scoring battle with both managers at 100% efficiency, but Super Ja'Marrio Bros. came out on top and made First Down Syndrome the Best Loser of the season so far at 136.9 points.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                First Down Syndrome and Super Ja'Marrio Bros. weren't the only 2 managers who were perfect this week, BBCU was perfect as well, marking our first week with 3 perfect managers this season. This does get easier to do with bye weeks since some players are guaranteed to score 0, but impressive nonetheless. Our lowest skilled manager was also our lowest scoring, with Singing Like Mariah Terry scoring 80% of their possible maximum, but they had a 0% chance to win their matchup anyway.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>This MotW Gets 4 Big Booms</ArticleSubheader>
            <p>
                Costco Guys was able to finally take down our reigning MotW champion and end his reign of terror, handing him a 4 shot loss. This matchup wasn't particularly close thanks to a well rounded performance from Costco Guys. Matthew Stafford and Jake Ferguson led the way, and almost everyone else scored in double figures. They didn't miss Lamar Jackson at all this week with Stafford putting up 25+ points.
            </p>
            <p>
                D.K's Dying Minions put up a stinker this week, as the prophecy foretold. They scored less than 100 points and were very close to being our worst team of the week. They had their DEF go negative, which will cost them 2 shots, and they got a 0 from Jalen Tolbert and only 4 from Harrison Butker. The rest of their team was decent, but they could've used more from Drake Maye despite his great play in real life.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Costco Guys will take MotW back to BBCU, who just lost to D.K's Dying Minions in week 4. D.K's Dying Minions will face off against First Down Syndrome in week 6, a battle between the 3 and 4 seeds.
            </p>
            <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleCaption>
                <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
            </ArticleCaption>
            <p>
                Costco Guys gets their 3rd MotW victory of all time. D.K's Dying Minions gets their 7th MotW loss, and moves up to 2nd in terms of total shots/dogs consumed at 26, not counting all of their penalty shots for late videos. They are in 2nd with 26 behind Anthony's Eskimo Brother who has 47 shots/dogs consumed in just 9 losses.
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
            <ArticleSubheader>Welcome To The League Gus</ArticleSubheader>
            <p>
                Anthony's Eskimo Brother wasn't able to get a win this week, which also cost them a good shot at becoming the back-to-back league survivor champion. Their survivor pick was also correct, so they can redeem themselves next week. Their main struggle this week was with their K, DEF, and Derrick Henry. Henry struggled without Lamar Jackson, but he hasn't exactly been doing well with him either. This team drops to 1-4 thanks in part to having the toughest schedule in the league.
            </p>
            <p>
                WalterPickens had an extremely boom or bust team this week, with 4 players scoring 23+ points and 4 players scoring 7 or less. The stars were Justin Fields, CMC, Jaylen Waddle, and Emeka Egbuka. The duds were Woody Marks, Tommy Tremble, Will Reichard (who got scammed out of 5-6 points), and CLE DEF. Team mascot Pickens was the odd man in the middle of all of that with a 13.7 point game.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Anthony's Eskimo Brother will be up against The Barkley Brawlers in week 6. WalterPickens will be up against Anthony's Eskimo Brother's survivor competition, Singing Like Mariah Terry, in week 7. Will Anthony's Eskimo Brother choose their opponent's opponent again this week?
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>One Of These Teams Gets To Be 2-3</ArticleSubheader>
            <p>
                Bye Week Curious had a good week last week, despite the loss, but is back down in the trenches this week. At least they broke 100 this week! Sadly their opponent broke 100 as well, albeit barely. This was a pretty well rounded performance from Bye Week Curious, but it's tough to win when your highest scorer has 16.68 points. They need some star players to help give them a big boost.
            </p>
            <p>
                The Barkley Brawlers had another week right around 100 points, their 4th game within 10 points of 100 in 5 weeks. This time they were able to win their matchup, but they won't always be so lucky in the future if they can't step it up. Jared Goff, Saquon Barkley, and Travis Kelce were all good in this one and helped them get the win.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Bye Week Curious will face off with Super Ja'Marrio Bros. and is coming in as massive underdogs in that one. The Barkley Brawlers will be up against Anthony's Eskimo Brother in week 6.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Bros Beat Up On Syndrome</ArticleSubheader>
            <p>
                First Down Syndrome put up an extremely respectable 136.9 points this week, but had some schedule issues. They had 6 players with 16+ points this week, but they really needed those other 3 players to contribute more than they did. Mark Andrews was very disappointing without Lamar Jackson in at QB for him. Seems like a theme is appearing among losers this week.
            </p>
            <p>
                Super Ja'Marrio Bros. was half a point off from having their 2nd week as the best team of the week this week. If they got anything remotely reasonable from Tyjae Spears or LAR DEF they could've taken the top spot this week, but I doubt they will be upset since they got the important win. Ja'Marr Chase balled out for once with Browning, but Kyren Williams was the star of the team this week with 31.1 points.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                First Down Syndrome will have another tough matchup next week against 4-1 D.K's Dying Minions. Super Ja'Marrio Bros. will face off with 1-4 Bye Week Curious.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>The Shrader Effect</ArticleSubheader>
            <p>
                BBCU had the opportunity to acquire Spencer Shrader to complete the BBCU team theme, but they opted not to do so. That decision meant that Shrader had to ensure that his team won the revenge game. He did everything he could to help his team win, and shredded his leg in the process. Now the BBCU will never be complete. JSN was the only bright spot on BBCU this week. They should consider killing off some characters to freshen up the show.
            </p>
            <p>
                Deep Shot to Kirk is not afraid of killing off characters. They killed of Shrader just to prove a point in this matchup to BBCU. The intimidation tactics worked and they got an easy win, led by waiver wire hero Rico Dowdle. The IND DEF stepped up once Shrader went down and carried the load for the special teams for Deep Shot to Kirk.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                BBCU will be up against Costco Guys in week 6 in MotW again. Deep Shot to Kirk will be up against the #1 seed Lord of the Littles.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Season Snapshot</ArticleSubheader>
            <p>
                Lord of the Littles has been dominant this season, sitting at the #1 seed with the most PF in the league. This was their 2nd week with the highest score of any team, and their 3rd time scoring over 140 points. This performance was very representative of how their season has gone to this point.
            </p>
            <p>
                Singing Like Mariah Terry is off to a 1-4 start and is sitting in the 11th seed right now. This was their 4th week scoring less than 120 points, and this was an ugly one. Aside from Patrick Mahomes, David Montgomery, and Justin Jefferson, the rest of their team was ass this week. They had David Njoku on their bench who scored 18.7 points, and started Zach Ertz who scored 0 points. These points could matter greatly as the race for last place heats up.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Lord of the Littles will face off with 2-3 Deep Shot to Kirk in week 6. Singing Like Mariah Terry will be up against 3-2 WalterPickens.
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
                No super low scores this week, but a decent amount of teams on the lower end.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                As expected with bye weeks starting, week 5 was slightly down from week 4 but the floor was still relatively similar.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                We finally had another close game this week, but it was another game where both teams barely broke 100 points. Our one shootout was still decided by nearly 12 points.
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
                D.K. Lost a Minion falls 2 spots after their first loss of the season. Lord of the Littles and Super Ja'Marrio Bros. are decently ahead of them in the PF department, and Lord of the Littles is doing laps around everyone in the PA department. Anthony's Eskimo Brother fell 3 spots this week after another brutal loss. This league has 3 teams at 4-1, 3 teams at 3-2, 3 teams at 2-3, and 3 teams at 1-4. The balance here is nice to look at. The top 6 teams are in PF order, and the bottom 6 teams are not at all. Anthony's Eskimo Brother has the most PF of the bottom 6 teams, but is in 10th thanks to their PA.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Lord of the Littles now stands alone in the Lucky and Good corner. There is a cluster of 4-1 and 3-2 teams in the pretty Good and slightly Lucky zone. Bye Week Curious is still firmly on the Bad side and Anthony's Eskimo Brother is pulling away on the Unlucky side, with Singing Like Mariah Terry not far behind.
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
                Lord of the Littles takes the top spot back again this week, as they are clearly an elite team. Haters will say that they have benefitted from an extremely easy schedule, but they don't get to choose who they play. Anthony's Eskimo Brother stands out on this chart in 8th with an extremely tough schedule. Bye Week Curious is still firmly on the bottom of the rankings with just 11 total wins against all teams through 5 weeks. Lord of the Littles got 11 wins against all teams this week alone.
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
                The playoff odds and last place odds from FFHub still pretty ass after 5 weeks, but they help accentuate the tiers of the league relatively well. The WalterPicks playoff odds having Bye Week Curious 1% playoff odds is pretty tough, but most other teams have a shot. This is of course subject to change if teams make trades or players get injured as well.
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
                Not much moves in this universe, The Barkley Brawlers get exposed slightly for some of their easy matchups, but they only move down 2 spots in the standings.
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
                First Down Syndrome falls 7 spots in these rankings, showing that they have benefitted greatly from opponent mis-management. That was not the case this week as their matchup had both managers at 100% efficiency like they were playing best ball anyway.
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
                This is getting better to read now as schedules diversify more and more. BBCU has an interesting range of outcomes, they are 5-0 with 2 of the easier schedules, and 1-4 with Anthony's Eskimo Brother's schedule. Anthony's Eskimo Brother's schedule has been insanely difficult, it would be the hardest schedule for 8 teams, including 3 teams who would be 0-5 with their schedule.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>BBCU Back In</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
            <p>
                BBCU got thrusted back into MotW this week after Costco Guys win. They have the chance to complete the funniest outcome if they can win and pull Anthony's Eskimo Brother into MotW. MotW is running through the Glizzy division either way, since a Costco Guys win would pull Bye Week Curious in a Glizzy Division MotW matchup. Lord of the Littles remains untouchable with the lowest danger metric and no chance to appear until at least week 9.
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
            <ArticleSubheader>Alec Goes to The Land of the Bidet</ArticleSubheader>
            <p>
                Alec went to Japan this week, and the first update the group received was fantastic. Japan Airlines has bidets on the plane, and once he landed he said:
            </p>
            <LeagueQuote>
                "There are bidets everywhere - truly a magical place"
            </LeagueQuote>
            <p>
                Alec has been on a couple of adventures after that, with his clean butthole tagging along. He went to a maid cafe and sent a picture of a group surrounding a clearly uncomfortable employee in a maid outfit. It is unclear whether Alec's presence caused the discomfort, or just the fact that her job is catering to dumb American's like that in general. Alec next sent a photo of deep fried hotdogs, but failed to send along a video review of them which was highly requested.
            </p>
            <LeagueQuote>
                "I pissed on the imperial palace grounds"<br />- Alec
            </LeagueQuote>
            <p>
                This adventure was more of a mistake than any other one yet, but Alec did not have access to a bidet here, otherwise he would've shit on imperial palace grounds.
            </p>
            <LeagueQuote>
                "Here's mt. Fuji"<br />- Alec
            </LeagueQuote>
            <p>
                Alec sent an image of Mt. Fuji, and later sent along another image of a bamboo forest, similar to the one created in one of our minecraft servers in college. This trip has been very entertaining for Alec so far, but we will see if it impacts his survivor and/or fantasy football management this week.
            </p>
            <ArticleSubheader>League Submissions</ArticleSubheader>
            <LeagueQuote>
                "I am the worst fantasy football player."<br />- Anthony
            </LeagueQuote>
            <p>
                The self deprecation here is a bit of a stretch, but it would be hard to find a manager who would argue strongly against this one.
            </p>
            <LeagueQuote>
                "Shall I compare thee to a Jake Trade?<br />
                Thou art more shitty and more crazy:<br />
                Bad players do find themselves proposed,<br />
                And the ask in return soars so high;<br />
                Sometimes too humorous for the winds of the chest,<br />
                And oft a source of time waste for all;<br />
                And every coach sometimes may judgement lapse,<br />
                By our nature is not perfection;<br />
                But thy eternal shall broker folly,<br />
                Nor lose thy relentlessness;<br />
                Nor shall rejection stop thou pedaling,<br />
                When in each week eternal thou try:<br />
                So long as men can breathe or eyes can see,<br />
                So long lives this, and this gives life to thee."<br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                Another week, another commentary on Jake Trades. This is the longest poem yet from our anonymous league poet, and many begin to wonder if the poet is using some sort of AI to generate their poetry.
            </p>
        </div>
    )
}

// const VideoMeme = () => {
//     return (
//         <ImageWrapper>
//             <iframe
//                 title="Streamable Video"
//                 width="100%"
//                 height="320"
//                 src="https://streamable.com/e/8y12dg"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//             />
//             <ArticleCaption>Submitted by Colin</ArticleCaption>
//         </ImageWrapper>
//     )
// }

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://imgur.com/LkGrHnH.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://imgur.com/A2m3sNq.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://imgur.com/WTtvoUv.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://imgur.com/6vNPrPo.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://imgur.com/On8xRYN.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://imgur.com/tTEf4lT.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://imgur.com/DGOU4Kf.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://imgur.com/worjRPc.jpg"}>
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
    // {
    //     id: 17,
    //     content: VideoMeme,
    // },
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
        id: 30,
        content: MotWRules,
    },
];
