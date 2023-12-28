import React from 'react';
import { AwardsTable, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, WeeklyScoringChart, MatchupPlot, MotwTable, ShotsDistributionChart, ArticleCaption, LeagueQuote } from '../../components/newsStyles';
import awardsData from './awardsTable.json';
// import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
// import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
// import medianLbData from './medianLb.json';
import motwHistoryData from './motwTable.json';
// import playoffData from './playoffTable.json';
// import powerRankingsData from './powerRankings.json';
// import scheduleData from './scheduleData.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';

export const newsDate = '2023-12-28';

export const articles = [
    {
        id: 1,
        content: (
            <div>
                <ArticleHeader>Awards and Recap</ArticleHeader>
                <ArticleSubheader>Week 16</ArticleSubheader>
                <AwardsTable awardsData={awardsData} />
                <p>
                    Week 16 was the second round of the playoffs, and there weren't any upsets in the top half of the bracket this week. Njigba's in Paris was the #1 team of the week yet again, putting up over 145 points for the 6th time this season. They ended the Cinderella story, but Cinderella put up a fight. They would have beaten either of the other 2 remaining playoff teams this week. Just Joshin got lucky yet again and barely won their matchup against Cook-ing a 0.2 to advance to the finals. We will see the #1 seed and the #2 seed face off in the championship game in week 17.
                </p>
                <p>
                    MotW continued tearing through the toilet bowl this week, giving out the most shots/dogs of the season. This is what you expect in the toilet bowl, but if you look up at Warmest Bench, things could've looked a lot different. This was the most points any team has left on the bench this season, and it's not even close. Tim's Team really dropped the ball on this one and it's gonna cost them. The other toilet bowl games saw The Werbenjägermanjensens and WalterFix lose and advance to the final round.
                </p>
                <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
                <EfficiencyChart chartData={efficiencyData} />
                <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
                <p>
                    Tim's Team left more points on their bench than they scored, giving them a below 50% efficiency. This is by far the lowest of the season, and is presumably the lowest of all time. They had the potential to be a top 3 team this week, and instead barely edged out the worst team. Cinderella didn't stand a chance in their matchup, and there was nothing they could've done differently to change the outcome. Cook-ing a 0.2 however could've changed their outcome with some better management, or just one fewer injury.
                </p>
            </div>
        ),
    },
    {
        id: 2,
        content: (
            <div>
                <ArticleHeader>Scoring Distributions</ArticleHeader>
                <ArticleSubheader> Distribution of Scoring</ArticleSubheader>
                <StackedHistogram chartData={matchupData} />
                <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>
                <p>
                    This week had a wide range, but didn't reach the extremes of prior weeks.
                </p>
                <WeeklyScoringChart chartData={matchupData} />
                <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
                <p>
                    The toilet bowl showed out this week and brought the minimum back down where it belongs.
                </p>
            </div >
        ),
    },
    {
        id: 3,
        content: (
            <div>
                <ArticleHeader>Matchup of the Week</ArticleHeader>
                <ArticleSubheader>Tim's Team Gets 3rd MotW Loss of Season</ArticleSubheader>
                <p>
                    Questionable won MotW for the 2nd week in a row while having negative points from their kicker. They would've been on the hook for 4 shots/dogs if Tim's Team managed their team properly. Luckily for them Tim's Team managed about as poorly as they could've, besides their kicker slot. Their mistakes put them into 7 shot/dog territory, the most of any team in MotW this season. These 7 shots/dogs are thanks to everyone except Justin Tucker and Rachaad White.
                </p>
                <MatchupPlot data={starterData} matchupId={6} />
                <p>
                    Questionable will be taking MotW into week 1 of next season, hopefully they draft well. Tim's Team retires for the season, and will hope to improve next season.
                </p>
                <ArticleSubheader>Matchup of the Week 2023-24</ArticleSubheader>
                <MotwTable motwHistoryData={motwHistoryData} />
                <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
                <ShotsDistributionChart chartData={shotsDistData} />
            </div>)
    },
    {
        id: 4,
        content: (
            <div>
                <ArticleHeader>Semi-Finals Game #1</ArticleHeader>
                <ArticleSubheader>Cook-ing an L</ArticleSubheader>
                <p>
                    Cook-ing a 0.2 was unable to complete their 2nd straight upset, barely losing to Just Joshin. Just Joshin was without one of their Josh's in this one, but Zamir White was a solid replacement. They had a solid all around performances in this one from everyone except Sam LaPorta. Cook-ing a 0.2 had Jordan Addison and DJ Moore get injured in this one, so we have a classic what could've been. They also left points on their bench from the likes of Dicker the Kicker and Dallas Goedert.
                </p>
                <MatchupPlot data={starterData} matchupId={1} />
                <p>
                    Just Joshin advances to the championship game, and Cook-ing a 0.2 will move to the 3rd place game.
                </p>
            </div>
        ),
    },
    {
        id: 5,
        content: (
            <div>
                <ArticleHeader>Semi-Finals Game #2</ArticleHeader>
                <ArticleSubheader>Cinderella Story Concludes</ArticleSubheader>
                <p>
                    Cinderella wasn't able to pull off yet another upset, losing to Njigba's in Paris. Breece Hall went absolutely nuclear in this one putting up 43.1 points. This was the third most of any RB started in this league this season. Cinderella finally played Calvin Ridley in a game where he went off, but that wasn't enough to overcome the deficit. Cinderella was let down by James Cook, Jaylen Waddle, and Dustin Hopkins.
                </p>
                <MatchupPlot data={starterData} matchupId={2} />
                <p>
                    Njigba's in Paris advances to the championship game, and Cinderella will move to the 3rd place game.
                </p>
            </div>
        ),
    },
    {
        id: 6,
        content: (
            <div>
                <ArticleHeader>5th Place Game</ArticleHeader>
                <ArticleSubheader>2 More Teams That Would've Beaten Just Joshin</ArticleSubheader>
                <p>
                    Hurt Thuggins & the boys popped off in this one to secure the 5th place playoff finish. Both of these teams did well when it didn't really matter for them anymore. Travis Swift was let down by Stefon Diggs and Travis Kelce, two players who have underperformed expectations all season. Hurt Thuggins & the boys was really only let down by their D putting up 0 points, but has nothing to be upset about here, besides the fact that this was the 5th place game.
                </p>
                <MatchupPlot data={starterData} matchupId={3} />
                <p>
                    Both of these teams are done for the season, and will start brainstorming rule changes they want to see for next season.
                </p>
            </div>
        ),
    },
    {
        id: 7,
        content: (
            <div>
                <ArticleHeader>Shit Bowl Semi-Finals Game #1</ArticleHeader>
                <ArticleSubheader>True Shit Bowl Game</ArticleSubheader>
                <p>
                    The chart makes it very clear that this was a blowout, and in fact it was the 3rd biggest blowout of the season. WalterFix put up the 5th lowest point total of any team this season, which is surprisingly high given how bad this chart looks. They were outscored by E.T.N Phone Home at every position except for defense, and that's with an extra RB. E.T.N Phone Home had a statement game in the shit bowl after they earned the regular season punishment.
                </p>
                <MatchupPlot data={starterData} matchupId={4} />
                <p>
                    E.T.N Phone Home moves into the 9th place game, and WalterFix advances to the Shit Bowl Final.
                </p>
            </div>
        ),
    },
    {
        id: 8,
        content: (
            <div>
                <ArticleHeader>Shit Bowl Semi-Finals Game #2</ArticleHeader>
                <ArticleSubheader>CMC Does It Again</ArticleSubheader>
                <p>
                    First Down Syndrome has been able to coast on CMC and Lamar all season, just enough to never be worried about getting last place. Those two and Tee Higgins carried them this time to a win over The Werbenjägermanjensens. The Werbenjägermanjensens didn't do horrible compared to their standards, but this still wasn't enough to win.
                </p>
                <MatchupPlot data={starterData} matchupId={5} />
                <p>
                    First Down Syndrome moves into the 9th place game, and The Werbenjägermanjensens advance to the Shit Bowl Final.
                </p>
            </div>
        ),
    },
    // {
    //     id: 9,
    //     content: (
    //         <div>
    //             <ArticleHeader>Standings & Points</ArticleHeader>
    //             <ArticleSubheader>Current Standings</ArticleSubheader>
    //             <LeaderboardTable leaderboardData={leaderboardData} />
    //             <p>
    //                 The two things that were left to be decided have been decided. Cinderella got the last playoff spot, and E.T.N Phone Home got last place. They had the third most PA in the league.
    //             </p>
    //             <ArticleSubheader>PF Vs. PA</ArticleSubheader>
    //             <PfPaScatter leaderboardData={leaderboardData} />
    //             <p>
    //                 The top two seeds are now the only teams well ahead of the PF/PA line, and the 3 and 4 seeds are right around the line. Everyone else has more PA than PF.
    //             </p>
    //         </div>
    //     ),
    // },
    // {
    //     id: 10,
    //     content: (
    //         <div>
    //             <ArticleHeader>Power Rankings</ArticleHeader>
    //             <ArticleSubheader>Current Power Rankings</ArticleSubheader>
    //             <PowerRankingsTable powerRankingsData={powerRankingsData} />
    //             <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 0 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 0 would mean that you played the worst team every week.</ArticleCaption>
    //             <p>
    //                 Just Joshin's schedule is still easier than playing against The Werbenjägermanjensens every week! This will be the final update to power rankings this season given that the regular season is over.
    //             </p>
    //         </div>
    //     ),
    // },
    // {
    //     id: 11,
    //     content: (
    //         <div>
    //             <ArticleSubheader>Playoff / Last Place Outlook</ArticleSubheader>
    //             {/* <PlayoffTable playoffData={playoffData} /> */}
    //             <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation. I want to build this out in-house using Walter's ROS projections at some point, maybe next season.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
    //             </ArticleCaption>
    //             <p>
    //                 As described in good detail in the matchup summaries, the playoff race is down the 3 teams fighting for the 6 seed, and 4 teams are in contention for last place. The simulations do not like The Werbenjägermanjensens chances, but if they win it is very likely that one of the other 3 teams will get last instead. They somewhat control their own destiny.
    //             </p>
    //         </div>
    //     ),
    // },
    // {
    //     id: 12,
    //     content: (
    //         <div>
    //             <ArticleHeader>Alternate Universe #1</ArticleHeader>
    //             <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
    //             <AltLeaderboardTable data={medianLbData} />
    //             <ArticleCaption>If everyone played their matchup each week, and also played against the median, this is what the leaderboard would look like.</ArticleCaption>
    //             <p>
    //                 In this hypothetical timeline, not much changes besides First Down Syndrome getting the last playoff spot over Cinderella. Cinderella struggled against the median this season, and had a lot of lucky wins. E.T.N Phone Home would still have gotten the punishment, and the same two teams would get playoff byes, but Njigba's in Paris would be the 1 seed over Just Joshin.
    //             </p>
    //         </div>
    //     ),
    // },
    // {
    //     id: 13,
    //     content: (
    //         <div>
    //             <ArticleHeader>Alternate Universe #2</ArticleHeader>
    //             <ArticleSubheader> Best Ball Standings</ArticleSubheader>
    //             <AltLeaderboardTable data={bestBallLbData} />
    //             <ArticleCaption>If everyone played their best lineup every week, this is what the standings would look like. All columns include hypothetical totals.</ArticleCaption>
    //             <p>
    //                 This also shows Cinderella had some lucky wins where their opponent did not play their best players. They would have done the punishment if this was a best ball league.
    //             </p>
    //         </div>
    //     ),
    // },
    // {
    //     id: 14,
    //     content: (
    //         <div>
    //             <ArticleHeader>Alternate Universe #3</ArticleHeader>
    //             <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
    //             <ScheduleTable data={scheduleData} />
    //             <p>Just Joshin finished the season 11-3. 5 other teams that would have finished the season 11-3 or better with their schedule, including 5-9 WalterFix, and 4-10 E.T.N Phone Home. There are 6 schedules where E.T.N Phone Home would have been 4-10 with though, which shows just how easy Just Joshin's schedule was. The Werbenjägermanjensens would have been 2-12 with Questionable's schedule, the worst possible record on this chart.</p>
    //         </div>
    //     ),
    // },
    {
        id: 15,
        content: (
            <div>
                <ArticleHeader>League Buzz</ArticleHeader>
                <ArticleSubheader>Planning For Next Season</ArticleSubheader>
                <p>
                    With many teams eliminated from meaningful fantasy games, the league has started brainstorming ideas for next season. Ideas have been floated for how to pick the draft pick pick order, how we can convert hotdogs/shots to other forms of punishment, and what we can do in the off-season to improve The Offensive Line. Any ideas should be submitted on the site or in discord so they can be tracked to ensure they are considered for next season.
                </p>
                <ArticleSubheader>League Superlatives</ArticleSubheader>
                <p>One of our esteemed league managers took it upon themselves to create a google form for managers to submit superlative ideas for other managers. This form <a href='https://forms.gle/xKe7bebfiAQxTveH6'>can be found here.</a> Managers should fill this out since it is fun.</p>
                <ArticleSubheader>Submissions</ArticleSubheader>
                <LeagueQuote>"I fear that my previous comments may come back to haunt me - submitted 12/22/23"<br />- League Camera Fund</LeagueQuote>
                <LeagueQuote>"“I am not worried - I will force a puke”"
                    <br />- Alec in my dms</LeagueQuote>
                <LeagueQuote>"some people in this league clearly don't value the commissioners time and will make him do work for some dumb joke they could've done without dropping their whole team"
                    <br />- Anonymous League Manager
                </LeagueQuote>
                <LeagueQuote>"alec should get an extra shot/dog for what he did"
                    <br />- Anonymous League Manager
                </LeagueQuote>
            </div>
        ),
    },
    {
        id: 16,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8am31d.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 17,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8am2ne.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 18,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8am37j.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 19,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8am8vk.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted Anonymously</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 20,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8ap93q.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted Anonymously</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 21,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://media.discordapp.net/attachments/419164550575816704/1190048472565551185/image.png?ex=65a06201&is=658ded01&hm=7bca3dc50abcfe4ebc5163a53e73105335d64f3b7dbda9e1e913d14a39ea67e5&=&format=webp&quality=lossless&width=411&height=624"}>
                </ArticleImage>
                <ArticleCaption>Submitted by Cinderella</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 22,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8ap9eh.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 23,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8ap9kh.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by WalterFix</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 24,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8apa1e.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 25,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8apa48.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted Anonymously</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 26,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8apbef.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 30,
        content: (
            <div>
                <ArticleHeader>Matchup of the Week Rules</ArticleHeader>
                <p>1. The loser must send their video before next Monday Nights's kickoff.</p>
                <p>2. The loser must count their starters below 10 points, and add another for any under 0 points,
                    and
                    do that number of shots or eat that number of hotdogs.</p>
                <p>3. The winner will be the incumbent champion in next week's Matchup of the Week.</p>
                <p>4. In the case of a tie (pls no), both teams will complete their respective shots or dogs, and
                    both
                    teams will be the incumbent members in the next week's Matchups of the Week.</p>
            </div>
        ),
    },
];
