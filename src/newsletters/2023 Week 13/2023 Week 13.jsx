import React from 'react';
import { AwardsTable, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, WeeklyScoringChart, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, PowerRankingsTable, PlayoffTable, AltLeaderboardTable, ScheduleTable, ArticleCaption, LeagueQuote } from '../../components/newsStyles';
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

export const newsDate = '2023-12-07';

export const articles = [
    {
        id: 1,
        content: (
            <div>
                <ArticleHeader>Awards and Recap</ArticleHeader>
                <ArticleSubheader>Week 13</ArticleSubheader>
                <AwardsTable awardsData={awardsData} />
                <p>
                    Week 13 was a crucial week for a lot of teams. One of the most important games of the season for the race for last place was this week, and was a thrilling matchup. More on that later. This week also had a lot of extremes in terms of awards. This late in the season it is impressive to have this many top 3-5 values of the season. We had the 2nd lowest score of any team this season, with The Werbenjägermanjensens gunning for their own record. We had the #3 tight end performance, with Sam LaPorta going off yet again for Just Joshin. We had the 3rd highest scoring loser of this season, and in MotW to boot. MotW was also the 4th closest game of the season, decided by only 1.44 points.We had the 2nd biggest blowout of the season, and if you couldn't guess it was The Werbenjägermanjensens taking the L in that one.
                </p>
                <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
                <EfficiencyChart chartData={efficiencyData} />
                <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
                <p>
                    This week we had 2 perfect managers and Hurt Thuggins & the boys was not one of them, despite what Sleeper might try to tell you. Just Joshin is lucky to have won their matchup, as they left so many points on their bench. Murray Hater also left some points on their bench and could have won if they managed better. League Camera Fund left just enough to points on the bench to have a chance to win their matchup as well.
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
                    The 2nd lowest score of the season falls into a bucket with a few other scores, and we had a lot of above average scores this week.
                </p>
                <WeeklyScoringChart chartData={matchupData} />
                <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
                <p>
                    As anticipated this week was worst than last week, thanks to having some fantasy relevant teams on their bye weeks.
                </p>
            </div >
        ),
    },
    {
        id: 3,
        content: (
            <div>
                <ArticleHeader>Matchup of the Week</ArticleHeader>
                <ArticleSubheader>Closest MotW This Season</ArticleSubheader>
                <p>
                    Just Joshin and Murray Hater had the closet MotW this season, decided by only 1.44 points. This barely edged out week 7s MotW when Travis Swift defeated WalterFix by 1.56 points. Murray Hater had multiple players get 0 points in this one, but luckily for them everyone else except their kicker got over 10 points. If their kicker had gotten over 10 points they would have won this matchup. Just Joshin got absolutely carried by Nico Collins, Ja'Marr Chase and Sam LaPorta in this one, and also had a huge performance from DK Metcalf on their bench.
                </p>
                <MatchupPlot data={starterData} matchupId={4} />
                <p>
                    Just Joshin will bring WalterFix back into MotW, who is looking to guarantee they avoid last place with a win. Murray Hater will play against League Camera Fund in week 14, who is in the same boat as WalterFix. Murray Hater is also hoping to make the playoffs, and they need to win and either have Bijan shih tzu win, and/or outscore First Down Syndrome by nearly 27 points.
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
                <ArticleSubheader>Another Close Game</ArticleSubheader>
                <p>
                    E.T.N Phone Home and First Down Syndrome played a close game this week with both teams QBs putting up big numbers. Brock Purdy and Dak Prescott were QB1 and QB2 this week respectively, and basically cancelled each other out in this one. The real edge for First Down Syndrome to come away with the victory was their WR play, mainly Michael Pittman who put up another great game, and has been so quietly successful this season. E.T.N Phone Home got solid performances all around besides their D and Singletary, neither of which was projected to do very much anyway.
                </p>
                <MatchupPlot data={starterData} matchupId={1} />
                <p>
                    First Down Syndrome will be in a battle for a playoff spot with Bijan shih tzu in week 14, and needs to win and outscore Murray Hater + 27 points to get in. E.T.N Phone Home plays against Hurt Thuggins & the boys in week 14, and can avoid last place with a win. Hurt Thuggins & the boys is looking to get a bye in the playoffs, but would need to win and outscore Njigba's in Paris by about 63 points.
                </p>
            </div>
        ),
    },
    {
        id: 5,
        content: (
            <div>
                <ArticleHeader>Matchup #3</ArticleHeader>
                <ArticleSubheader>Overshadowed Blowout</ArticleSubheader>
                <p>
                    With The Werbenjägermanjensens getting blown out in the fashion they did, Bijan shih tzu was able to fly under the radar. They had one of their worst games of the season, and got crushed by Hurt Thuggins & the boys. Hurt Thuggins & the boys put it nicely when they said they wasted this performance against Bijan shih tzu. They had really good games from their defense, Puka, Conner, and Taysom Hill. Bijan shih tzu on the other hand didn't have a good game from anyone but Charbonnett.
                </p>
                <MatchupPlot data={starterData} matchupId={2} />
                <p>
                    Hurt Thuggins & the boys will play against E.T.N Phone Home in week 14, Bijan shih tzu will be pushing for a playoff spot in their matchup with First Down Syndrome.
                </p>
            </div>
        ),
    },
    {
        id: 6,
        content: (
            <div>
                <ArticleHeader>Matchup #4</ArticleHeader>
                <ArticleSubheader>Race for Last Place Heats Up</ArticleSubheader>
                <p>
                    League Camera Fund and WalterFix are both very much in the running for last place, and subsequently the punishment. WalterFix had this game marked on their calendar for a long time, and their team performed over expectations. They made some key trades and acquisitions planning for this week in particular, including trading away Saquon Barkley who was on bye this week. They also acquired the Falcons D a few weeks ago, who had a great matchup this week. These moves helped them secure a victory in a hard-fought matchup with League Camera Fund. League Camera Fund had great MNF performances from Trevor Lawrence and Joe Mixon, but it wasn't enough to overcome the lead WalterFix had built up.
                </p>
                <MatchupPlot data={starterData} matchupId={3} />
                <p>
                    Both of these teams are looking to win next week to avoid last place. League Camera Fund plays against Murray Hater, and WalterFix plays against the #1 seed Just Joshin. Either of these teams also avoid last place with a loss from The Werbenjägermanjensens.
                </p>
            </div>
        ),
    },
    {
        id: 7,
        content: (
            <div>
                <ArticleHeader>Matchup #5</ArticleHeader>
                <ArticleSubheader>The Big One</ArticleSubheader>
                <p>
                    This matchup is extremely indicative of both of these team's performance this year. Njigba's in Paris has been one of the best teams in the league, and The Werbenjägermanjensens have been one of the worst. The Werbenjägermanjensens would have lost to CeeDee Lamb + Deebo Samuel + (insert any starting Njigba here) in this matchup. How much else can be said about this one?
                </p>
                <MatchupPlot data={starterData} matchupId={5} />
                <p>
                    Njigba's in Paris is hoping to win to secure a playoff bye in their matchup next week against Travis Swift. The Werbenjägermanjensens are hoping to win to avoid last place, and they are matchup up against Cook-ing a 0.2 in week 14. If they win, they also need at least one of WalterFix, League Camera Fund, and E.T.N Phone Home to lose.
                </p>
            </div>
        ),
    },
    {
        id: 8,
        content: (
            <div>
                <ArticleHeader>Matchup #6</ArticleHeader>
                <ArticleSubheader>Josh vs. Josh</ArticleSubheader>
                <p>
                    This Josh battle is a rematch of the week 2 Josh face-off in which Cook-ing a 0.2 defeated Travis Swift 113.92 - 113.14 points. So Cook-ing a 0.2 was able to sweep the Josh series, but there is a chance these two teams could meet a third time in the playoffs. Cook-ing a 0.2 succeeded due in large part to the Eagles and Evan Engram. Travis Swift had a great game from Mike Evans, and Kyren Williams, but Travis Kelce has been disappointing lately.
                </p>
                <MatchupPlot data={starterData} matchupId={6} />
                <p>
                    Cook-ing a 0.2 will play against The Werbenjägermanjensens in week 14. Travis Swift will play against Njigba's in Paris, and if they win by at least 92 points and outscore Hurt Thuggins & the boys by 31 points, they will earn a playoff bye. Let's see if they can do the impossible.
                </p>
            </div>
        ),
    },
    {
        id: 9,
        content: (
            <div>
                <ArticleHeader>Standings & Points</ArticleHeader>
                <ArticleSubheader>Current Standings</ArticleSubheader>
                <LeaderboardTable leaderboardData={leaderboardData} />
                <p>
                    Lots of movement for both the playoff race and the race for last place. WalterFix won their matchup and was able to jump up to 9th place, creating a 4 way tie at 4-9. First Down Syndrome also won, and created a 3 way tie at 6-7, with only one team making the playoffs.
                </p>
                <ArticleSubheader>PF Vs. PA</ArticleSubheader>
                <PfPaScatter leaderboardData={leaderboardData} />
                <p>
                    The extremes of PF and PA both still stick way out. Just Joshin now has slightly higher PA than The Werbenjägermanjensens do PF.
                </p>
            </div>
        ),
    },
    {
        id: 10,
        content: (
            <div>
                <ArticleHeader>Power Rankings</ArticleHeader>
                <ArticleSubheader>Current Power Rankings</ArticleSubheader>
                <PowerRankingsTable powerRankingsData={powerRankingsData} />
                <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 0 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 0 would mean that you played the worst team every week.</ArticleCaption>
                <p>
                    Just Joshin's schedule is easier than playing against The Werbenjägermanjensens every week! They fell this week to #2 in our power rankings after Njigba's in Paris was the #1 team yet again. WalterFix is at #5 despite being eligible for last place, thanks to their ability to be a top 3 team in 4 of the last 6 weeks.
                </p>
            </div>
        ),
    },
    {
        id: 11,
        content: (
            <div>
                <ArticleSubheader>Playoff / Last Place Outlook</ArticleSubheader>
                <PlayoffTable playoffData={playoffData} />
                <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation. I want to build this out in-house using Walter's ROS projections at some point, maybe next season.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
                </ArticleCaption>
                <p>
                    As described in good detail in the matchup summaries, the playoff race is down the 3 teams fighting for the 6 seed, and 4 teams are in contention for last place. The simulations do not like The Werbenjägermanjensens chances, but if they win it is very likely that one of the other 3 teams will get last instead. They somewhat control their own destiny.
                </p>
            </div>
        ),
    },
    {
        id: 12,
        content: (
            <div>
                <ArticleHeader>Alternate Universe #1</ArticleHeader>
                <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
                <AltLeaderboardTable data={medianLbData} />
                <ArticleCaption>If everyone played their matchup each week, and also played against the median, this is what the leaderboard would look like.</ArticleCaption>
                <p>
                    In this world, the playoff race would include WalterFix instead of Bijan shih tzu, and the race for last place would be between E.T.N Phone Home and The Werbenjägermanjensens.
                </p>
            </div>
        ),
    },
    {
        id: 13,
        content: (
            <div>
                <ArticleHeader>Alternate Universe #2</ArticleHeader>
                <ArticleSubheader> Best Ball Standings</ArticleSubheader>
                <AltLeaderboardTable data={bestBallLbData} />
                <ArticleCaption>If everyone played their best lineup every week, this is what the standings would look like. All columns include hypothetical totals.</ArticleCaption>
                <p>
                    WalterFix would be struggling record-wise in this hypothetical, and Murray Hater could gain a ton if they managed their team better.
                </p>
            </div>
        ),
    },
    {
        id: 14,
        content: (
            <div>
                <ArticleHeader>Alternate Universe #3</ArticleHeader>
                <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
                <ScheduleTable data={scheduleData} />
                <p>We finally got around to doing this ourselves after Walter forced us to. This format is a lot more digestible and interesting, and shows just how easy Just Joshin's schedule has been. Teams are sorted alphabetically for now, might sort them by standings eventually.</p>
            </div>
        ),
    },
    {
        id: 15,
        content: (
            <div>
                <ArticleHeader>League Buzz</ArticleHeader>
                <ArticleSubheader>Shirtless Fantasy?</ArticleSubheader>
                <p>
                    One of our esteemed managers had quite the tale to tell this weekend, and Chief Correspondent Chat GPT did some reporting.
                </p>
                <p style={{ textIndent: "2em" }}>
                    In a surprising turn of events, a man's quiet night at home transforms into a wild adventure at a gay club. Reluctantly joining friends at a VIP booth, he finds himself in the spotlight when a drag performer demands the straight guys strip down. Forced into an unexpected shirtless display, the man undergoes a hilarious yet uncomfortable ordeal, earning him a "never-again" attitude towards public shirt removal. To cap off the night, a bold 34-year-old woman approaches, and against all odds, he leaves with her number. In a plot twist nobody saw coming, this ordinary evening turns into a tale of unexpected antics and a newfound fear of shirtless escapades. Stay tuned for the next episode of "The Unforeseen Adventures of Reluctant Reveler"!
                </p>
                <ArticleSubheader>Scoring Changes?</ArticleSubheader>
                <p>
                    Some possible scoring changes were discussed this week, including giving players points for being disqualified from games, and changes to the defensive scoring system. It seemed like if it were to be put to a vote, that DQs would be worth some amount of points, assuming Sleeper allows that. The commissioner could always add custom points, but league members would have to be on the lookout for DQs. The defense change talk was sparked by quite the interesting question:
                </p>
                <LeagueQuote>"why does Team defense points allowed 21-27 not worth anything"<br />- Just Joshin</LeagueQuote>
                <p>
                    This lead to the conclusion that this range is about the average points allowed, and that defenses shouldn't be rewarded or punished for this range. League members are encouraged to do their own research and come up with alternative ways to make defense scoring a better system.
                </p>
            </div>
        ),
    },
    {
        id: 16,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/88mnby.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 17,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/88mniy.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 18,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/88mnp5.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 19,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/88mntg.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 20,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/88mo07.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            </ImageWrapper>
        )
    },
    {
        id: 21,
        content: (
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/88moiv.jpg"}>
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
                <p>Keep an eye out for the full league bylaws in the next few weeks which will contain all rules!
                </p>
            </div>
        ),
    },
];
