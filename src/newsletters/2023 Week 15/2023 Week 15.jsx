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

export const newsDate = '2023-12-21';

export const articles = [
    {
        id: 1,
        content: (
            <div>
                <ArticleHeader>Awards and Recap</ArticleHeader>
                <ArticleSubheader>Week 15</ArticleSubheader>
                <AwardsTable awardsData={awardsData} />
                <p>
                    Week 15 was the first week of the playoffs and the toilet bowl. Out of the 4 games this week, 3 of them were upsets, which made things very interesting. Cinderella lived up to the name, taking down the 3 seed Hurt Thuggins & the boys. The other playoff game was also an upset, with Cook-ing a 0.2 besting Travis Swift and moving to 3-0 in the Josh bowl. So the 5 and 6 seeds advanced after round one, and move on to play the 2 and 1 seeds in round two.
                </p>
                <p>
                    The toilet bowl is where MotW ended up, and Questionable came out on top thanks to their management being far superior to that of WalterFix. League Camera Fund was the toilet bowl member who managed to pull off the upset over First Down Syndrome. WalterFix and First Down Syndrome move on to face E.T.N Phone Home and The Werbenjägermanjensens respectively.
                </p>
                <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
                <EfficiencyChart chartData={efficiencyData} />
                <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
                <p>
                    The bottom two teams here both had the chance to win their matchup with better management. Their opponents were perfect or near-perfect in their management. First Down Syndrome once again had the potential to win but came up short due to mis-management.
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
                    This was had a narrow range, and teams were pretty evenly distributed across it.
                </p>
                <WeeklyScoringChart chartData={matchupData} />
                <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
                <p>
                    Crazy what this can look like when you take out the two best and more importantly the two worst teams. The minimum this week was higher than it has been all season, and the maximum was lower than usual.
                </p>
            </div >
        ),
    },
    {
        id: 3,
        content: (
            <div>
                <ArticleHeader>Matchup of the Week</ArticleHeader>
                <ArticleSubheader>Questionable Avoids MotW Loss #3</ArticleSubheader>
                <p>
                    With WalterFix's win last week, MotW entered the toilet bowl. This dragged Questionable into the MotW for the third time this season, where they had previously been 0-2 in those games doing a total of 8 shots/dogs. WalterFix was 1-1 in MotW before this, and moves to 1-2 with a total of 9 shots/dogs. They have to do 5 as a result of this one thanks to their QB, 2 RBs, and their K and DEF. The only good performances they got were from Kamara, their WRs and Trey McBride. Questionable was able to pull this one off thanks to 3 players in particular, Baker Mayfield, Clyde Edwards-Helaire, and Miami D. All of these players put up 20+ points. If WalterFix was able to win, Questionable would have had to do 6 shots/dogs thanks to a -1 point performance from their kicker.
                </p>
                <MatchupPlot data={starterData} matchupId={4} />
                <p>
                    Questionable carries MotW into the 7th place game against League Camera Fund where it will die. One of those teams will be making their 3rd video of the season, and the other will start with MotW next season. WalterFix continues further into the toilet bowl and faces off against 12 seeded E.T.N Phone Home in round 2.
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
                <ArticleHeader>Matchup #2</ArticleHeader>
                <ArticleSubheader>Josh Bowl #3</ArticleSubheader>
                <p>
                    In this season's third Josh Bowl, Josh came out victorious for the third time. Cook-ing a 0.2 was able to have big games from players when it mattered, and Travis Swift was not. Travis Swift was let down by both of their namesake players, and multiple others including Justin Fields, Javonte Williams, and Stefon Diggs. Cook-ing a 0.2 got their best performances from Jordan Addison, Jalen Hurts, and Raheem Mostert. Everyone else on their team contributed enough to secure the win.
                </p>
                <MatchupPlot data={starterData} matchupId={1} />
                <p>
                    Cook-ing a 0.2 will advance to the semi-finals and play against 1 seed Just Joshin. This will be the true test to see who fleeced who. Travis Swift goes into the 5th place game against Hurt Thuggins & the boys.
                </p>
            </div>
        ),
    },
    {
        id: 5,
        content: (
            <div>
                <ArticleHeader>Matchup #3</ArticleHeader>
                <ArticleSubheader>Cinderella Story Continues</ArticleSubheader>
                <p>
                    Cinderella was able to pull off an upset for the second week in a row, last week to secure a playoff spot, and this week to advance to round 2 over the 3 seed Hurt Thuggins & the boys. James Cook was the MVP this week with a 36.1 point showing. Jaylen Waddle and David Njoku weren't far behind putting up 28.2 and 26.4 points respectively. These 3 players were able to cover up a few disappointments from others including Bijan Robinson, who scored 0.4 points. Hurt Thuggins & the boys had more than a few disappointments, including Saquon Barkley, Garrett Wilson, and Patrick Mahomes. All 3 of these players were acquired via trade in an attempt to improve their playoff outlook, and that didn't work out too well.
                </p>
                <MatchupPlot data={starterData} matchupId={2} />
                <p>
                    Cinderella advances to round 2 to play against the current championship favorite Njigba's in Paris. Can they continue their Cinderella story all the way to the finals? Hurt Thuggins & the boys moves to the 5th place game against Travis Swift.
                </p>
            </div>
        ),
    },
    {
        id: 6,
        content: (
            <div>
                <ArticleHeader>Matchup #4</ArticleHeader>
                <ArticleSubheader>CMC Wasn't Enough</ArticleSubheader>
                <p>
                    This toilet bowl matchup had 2 of the 3 highest scoring teams of this week in it. First Down Syndrome put up a good fight, but their oustanding performances from CMC, Kenneth Walker, and Tee Higgins (what a TD btw) were not enough to overcome the all-around dominance by League Camera Fund. They had every player except their D in double digits, and had 26.1 from Terry, 24.1 from Davante, and 21.9 from Rachaad White.
                </p>
                <MatchupPlot data={starterData} matchupId={5} />
                <p>
                    League Camera Fund will be in MotW next week in the 7th place game against Questionable. First Down Syndrome moves further into the toilet bowl against The Werbenjägermanjensens.
                </p>
            </div>
        ),
    },
    // {
    //     id: 7,
    //     content: (
    //         <div>
    //             <ArticleHeader>Matchup #5</ArticleHeader>
    //             <ArticleSubheader>Drake London MVP</ArticleSubheader>
    //             <p>
    //                 The Werbenjägermanjensens needed a win to even have a chance of avoiding last place, and Drake London made sure that they could get that win. He caught 10 balls for 172 yards with a two-point conversion to put up 29.2 points in this game. Cook-ing a 0.2 had a chance to come back and claim victory with his Eagles stack, but the Eagles were proven fraudulent against the Cowboys. If Cook-ing a 0.2 had played their recently traded for Evan Engram, Just Joshin's old team core would have carried them to victory in this one. Mostert put up 23 and Moore put up 26.8, with Engram having 32.5 points on the bench. They absolutely fleeced Just Joshin, and might have a chance to beat them in the playoffs.
    //             </p>
    //             <MatchupPlot data={starterData} matchupId={5} />
    //             <p>
    //                 Cook-ing a 0.2 plays in the third Josh bowl of the season in Round 1 of the playoffs against Travis Swift. They are 2-0 against Travis Swift this season. If they win that one they will go up against Just Joshin, in the ultimate revenge game. The Werbenjägermanjensens will get a bye in the shit bowl.
    //             </p>
    //         </div>
    //     ),
    // },
    // {
    //     id: 8,
    //     content: (
    //         <div>
    //             <ArticleHeader>Matchup #6</ArticleHeader>
    //             <ArticleSubheader>(Not much of a) Fight for Playoff Bye</ArticleSubheader>
    //             <p>
    //                 Njigba's in Paris went all out against Travis Swift this week, putting up massive numbers at almost every position. Their worst player had more points than Travis Swift's WR combined. Ezekiel Elliott looks fantastic with Stevenson out, and Deebo continues to have huge weeks. Brandon Aubrey had the game of his life putting up 24.4 fantasy points, the most of any started kicker this season. This team is a scary matchup every week, and is primed to make a playoff run.
    //             </p>
    //             <MatchupPlot data={starterData} matchupId={6} />
    //             <p>
    //                 Njigba's in Paris will get a bye in the first round of the playoffs, and Travis Swift will play against Cook-ing a 0.2 in Round 1.
    //             </p>
    //         </div>
    //     ),
    // },
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
                <ArticleSubheader>Boys Bring Back Betting Because Birds</ArticleSubheader>
                <p>
                    The Werbenjägermanjensens floated a bet to E.T.N Phone Home at even odds that the Seahawks would beat the Eagles on MNF. This looked foolish with sportsbooks having the Eagles as heavy favorites in this one, and E.T.N Phone Home could have taken advantage of the inefficient market and made free money. The bet was initially floated at $5, but once E.T.N Phone Home saw it, they wanted to make it $10. The game was close throughout, and Jalen Hurts was playing through an illness. The Seahawks also had Drew Lock at QB, and he led them down the field 90+ yards for a game-winning TD drive.
                </p>
                <LeagueQuote>
                    "What's your Venmo [The Werbenjägermanjensens]"
                    <br />- E.T.N Phone Home
                </LeagueQuote>
                <ArticleSubheader>Commissioner Caught Cheating...Collusion?</ArticleSubheader>
                <p>Evidence was provided by multiple league members this week that the commissioner may once again be attempting to rig the league and force their advancement into the playoffs. They showed up as the opponent for everyone's matchup, a tactic that would give them pretty solid odds to win the championship and the toilet bowl in the same season. This feat would never be accomplished again, cementing the commissioners spot in the record book. It remains unclear what the commissioners goals were, but after the outcry the matchups are back to normal.</p>
                <ArticleSubheader>Submissions</ArticleSubheader>
                <LeagueQuote>"The New York Jets are bad at football."<br />- Anonymous League Manager</LeagueQuote>
                <LeagueQuote>"My team has been hand crafted all season long for weeks 15-17. It's only natural that I dominated this week."
                    <br />- League Camera Fund</LeagueQuote>
                <p>
                    Playing for the toilet bowl is a move, and it helped them get into MotW for the third time.
                </p>
            </div>
        ),
    },
    {
        id: 16,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://steamuserimages-a.akamaihd.net/ugc/496888905833936637/1FB14E3072B26661D4119295C7FE9505C236C36B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"}>
                </ArticleImage>
                <ArticleCaption>Submitted by Just Joshin</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 17,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://pbs.twimg.com/media/D5WK5qkWwAATWyV.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by Cinderella</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 18,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8a0y9i.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 19,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8a0yh1.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 20,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8a0zci.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 21,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8a0zmu.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 22,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8a106l.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 23,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8a0zkf.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted Anonymously</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 24,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8a10r8.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted Anonymously</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 25,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8a11w3.gif"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 26,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/8a12n1.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by WalterFix</ArticleCaption>
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
                <p>Keep an eye out for the full league bylaws in the next few weeks which will contain all rules!
                </p>
            </div>
        ),
    },
];
