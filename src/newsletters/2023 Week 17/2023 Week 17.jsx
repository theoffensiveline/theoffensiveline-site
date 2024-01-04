import React from 'react';
import { AwardsTable, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, WeeklyScoringChart, MatchupPlot, ArticleCaption, LeagueQuote, MotwTable, ShotsDistributionChart } from '../../components/newsStyles';
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

export const newsDate = '2024-01-04';

export const articles = [
    {
        id: 1,
        content: (
            <div>
                <ArticleHeader>Awards and Recap</ArticleHeader>
                <ArticleSubheader>Week 17</ArticleSubheader>
                <AwardsTable awardsData={awardsData} />
                <p>
                    Week 17 was the final week of the 2023 fantasy football season. This week we had 4 matchups, and only 1 that actually mattered. The championship game between Njigba's in Paris and Just Joshin was never really in doubt. Njigba's in Paris put up the most points of any team this week, and had over 145 points again, exceeding that total in both of their playoff games and for the 7th time this season. They had the #1 RB this week in Breece Hall, and the #1 WR in CeeDee Lamb. CeeDee Lamb was the MVP this week putting up 27.54% of Njigba's in Paris 145.98 points.
                </p>
                <p>
                    With MotW coming to a close last week, the toilet bowl got a lot less exciting. The Werbenjägermanjensens took home the trophy, after their defeat at the hands of WalterFix. The Werbenjägermanjensens were the worst team this week, but had the biggest D, as expected with their roster construction.
                </p>
                <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
                <EfficiencyChart chartData={efficiencyData} />
                <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
                <p>
                    Good (or good enough) management where it counted this week. Cook-ing a 0.2 had the lowest efficiency this week, followed closely by E.T.N Phone Home. Just Joshin had the highest efficiency but that wasn't enough to win the championship.
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
                    Pretty middle of the road scores from everyone besides the big winner.
                </p>
                <WeeklyScoringChart chartData={matchupData} />
                <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
                <p>
                    Another week with a relatively high floor.
                </p>
            </div >
        ),
    },
    {
        id: 3,
        content: (
            <div>
                <ArticleHeader>Matchup of the Week</ArticleHeader>
                {/* <ArticleSubheader>MotW Gets A Week Off</ArticleSubheader>
                <p>
                    Questionable won MotW for the 2nd week in a row while having negative points from their kicker. They would've been on the hook for 4 shots/dogs if Tim's Team managed their team properly. Luckily for them Tim's Team managed about as poorly as they could've, besides their kicker slot. Their mistakes put them into 7 shot/dog territory, the most of any team in MotW this season. These 7 shots/dogs are thanks to everyone except Justin Tucker and Rachaad White.
                </p>
                <MatchupPlot data={starterData} matchupId={6} />
                <p>
                    Questionable will be taking MotW into week 1 of next season, hopefully they draft well. Tim's Team retires for the season, and will hope to improve next season.
                </p> */}
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
                <ArticleHeader>Championship Game</ArticleHeader>
                <ArticleSubheader>One Real Njigba</ArticleSubheader>
                <p>
                    Njigba's in Paris took home the trophy and defeated Just Joshin in the championship game this season. CeeDee Lamb put up a monster 40.2 fantasy points to help propel them to victory. Breece Hall also contributed 27.6 points, and the rest of their players did sufficiently well besides Jahmyr Gibbs. Just Joshin had fairly strong performances all around as well, exlcuding Ja'Marr Chase and Raiders D. They lacked that one true star performance though, as their highest output was Josh Allen with 21.16 points.
                </p>
                <MatchupPlot data={starterData} matchupId={1} />
                <p>
                    Njigba's in Paris gets to ride the championship high until next season, and Just Joshin can appreciate that 2nd is a lot better than last!
                </p>
            </div>
        ),
    },
    {
        id: 5,
        content: (
            <div>
                <ArticleHeader>3rd Place Game</ArticleHeader>
                <ArticleSubheader>Cinderella Takes Bronze</ArticleSubheader>
                <p>
                    Cinderella may have been eliminated from championship contention this past week, but they were able to win the 3rd place game over Cook-ing a 0.2 this week. They had pretty good scoring from Aiyuk, Flowers and Njoku in this one, and Cook-ing a 0.2 had DJ Moore and Jaylen Warren do well.
                </p>
                <MatchupPlot data={starterData} matchupId={2} />
            </div>
        ),
    },
    {
        id: 6,
        content: (
            <div>
                <ArticleHeader>Toilet Bowl Finals</ArticleHeader>
                <ArticleSubheader>The Werbenjägermanjensens Are #1 After All</ArticleSubheader>
                <p>
                    The Werbenjägermanjensens took an L in the shit bowl finale against WalterFix. Jerome Ford and Najee Harris both put up numbers, and WalterFix had a better supporting cast than The Werbenjägermanjensens to secure the W. Both of these teams were willing to make this a MotW if the championship teams agreed, but Just Joshin didn't want to, so this game really didn't matter.
                </p>
                <MatchupPlot data={starterData} matchupId={4} />
            </div>
        ),
    },
    {
        id: 8,
        content: (
            <div>
                <ArticleHeader>9th Place Game</ArticleHeader>
                <ArticleSubheader>Lamar Not MVP Here</ArticleSubheader>
                <p>
                    E.T.N Phone Home might have taken the punishment, but they earned a 9th place playoff finish in this one with their win over First Down Syndrome. Jordan Love and ETN were big in this one, and were enough to get past Lamar and an injured CMC.
                </p>
                <MatchupPlot data={starterData} matchupId={5} />
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
                <ArticleSubheader>End of Season Recap</ArticleSubheader>
                <p>
                    The Offensive Line will be providing an end of season recap at some point in the next few weeks. The goal is to improve on what was done last season, and take any additional feedback from the league. If you have any suggestions or things you'd like to see please submit them!
                </p>
                <ArticleSubheader>Planning For Next Season Reminder</ArticleSubheader>
                <p>
                    With many teams eliminated from meaningful fantasy games, the league has started brainstorming ideas for next season. Ideas have been floated for how to pick the draft pick pick order, how we can convert hotdogs/shots to other forms of punishment, and what we can do in the off-season to improve The Offensive Line. Any ideas should be submitted on the site or in discord so they can be tracked to ensure they are considered for next season.
                </p>
                <ArticleSubheader>League Superlatives Reminder</ArticleSubheader>
                <p>One of our esteemed league managers took it upon themselves to create a google form for managers to submit superlative ideas for other managers. This form <a href='https://forms.gle/xKe7bebfiAQxTveH6'>can be found here.</a> Managers should fill this out since it is fun.</p>
                <ArticleSubheader>Submissions</ArticleSubheader>
                <LeagueQuote>"Nobody remembers the winner, but everyone remembers the loser"<br />- Anonymous League Manager</LeagueQuote>
            </div>
        ),
    },
    {
        id: 16,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8b7hxl.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 17,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8b7i6f.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
                <ArticleCaption>Devan would've had the same exact result as Jake (losing in the championship) if he had his schedule.</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 18,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8b7j5s.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 19,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8b7isk.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 20,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8b7jlq.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted The Offensive Line</ArticleCaption>
                <ArticleCaption><a href='https://www.si.com/nba/grizzlies/news/ja-morant-reacts-to-major-hypocrisy-over-celebration-outrage'>for the uninformed</a></ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 21,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8b7lu6.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by Just Joshin</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 22,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8b7kre.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 23,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8b7ldm.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 24,
        content: (
            <div>
                <ArticleHeader>Thank You</ArticleHeader>
                <p>
                    I wanted to thank everyone for their participation in the league, as well as in MotW, and for submitting content to The Offensive Line. I enjoy putting this together every week and am excited to put together the end of season recap, along with making some additions to the site in the off-season.
                </p>
            </div>
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
