import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, DangerTable, WeeklyScoringChart, PowerRankingsTable, ScheduleTable } from '../../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
import medianLbData from './medianLb.json';
import motwHistoryData from './motwTable.json';
// import playoffData from './playoffTable.json';
import powerRankingsData from './powerRankings.json';
import scheduleData from './scheduleData.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';
import dangerTable from './dangerTable.json';
import motwFuture from './motwFuture.png';
import { ColorConstants } from '../../../components/constants/ColorConstants';

export const newsDate = '2024-09-19';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 2</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 2 was one of the worst weeks for injuries in recent memory, and many teams in our league will look noticeably different for at least the next few weeks, if not longer. There were some really close games this week that went down to the wire on Monday Night Football, and these were 3 of closest games in league history. Half of the matchups this week were decided by 4 points or less. The closest one was Matchup of the Week, decided by 1.02 points. This weeks top team Kirk Thuggins & The Boys was led by MVP Alvin Kamara, who put up 44 points, just as many points as the Saints put up on the Cowboys this week.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                Similarly to last week, there was only one perfect manager this week. Youngster Joey needed every single point in order to win their matchup, and Friendship is Magic had just enough points on their bench to beat them if they had optimized perfectly. Poor Management stands out here, hence their rebrand, as a team that did not capitalize on their potential, and lost MotW because of it. Hot Dog Enjoyer finds themselves near the bottom of this chart for the 2nd straight week, and might want to consider changing their name to Fortnite Enjoyer.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>A Nail Biter on MNF</ArticleSubheader>
            <p>
                This matchup looked like it was over after Thursday Night Football when Achane put up nearly 30 points, and Tyreek Hill only put up 6.6 points. First Down Syndrome was able to have solid performances from Kittle, Pacheco, Pollard, and Pittsburgh D to mount a comeback. Poor Management started Tank Dell who put up 2.3 points, while watching Rasheed Shaheed and Jaxon Smith-Njigba put up over 20 points each on their bench.
            </p>
            <p>
                All of this led to First Down Syndrome needing more than 22.8 points from Jalen Hurts on Monday Night Football to win, a reasonable total to expect from one of the top QBs. Hurts passed this mark in the 4th quarter as the Eagles marched down the field to attempt to secure the game. Instead they kicked a field goal and let the Falcons have a game-winning drive. The Eagles got the ball back with 34 seconds left, and Hurts decided he was pro-edging and threw an interception to lose 2 fantasy points and end the game.
            </p>
            <p>
                Four managers correctly picked First Down Syndrome to win in the survivor pool, and were all on the edge of their seats watching this one finish out. No managers picked Poor Management to win.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                First Down Syndrome ropes Hot Dog Enjoyer back into MotW only one week after they ate corn dogs. Poor Management faces off against Just Joshin pt. 2 in week 3.
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
            <ArticleSubheader>Just Joshin pt. 2 moves to 2-0</ArticleSubheader>
            <p>
                This matchup was between the 9th and 11th highest scorers this week, with Just Joshin pt. 2 having just enough to grab a W from this game. DeVonta Smith put up big numbers on MNF with AJ Brown out to secure the W. Younghoe Koo didn't get the opportunities to give Hot Dog Enjoyer a chance.
            </p>
            <p>
                Three managers correctly picked Just Joshin pt. 2 to win in the survivor pool. No managers picked Hot Dog Enjoyer to win.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Just Joshin pt. 2 will play against the reigning MotW loser for the 2nd straight week, narrowly avoiding his own MotW inclusion again,this time it's against Poor Management. Hot Dog Enjoyer gets pulled back into MotW against First Down Syndrome.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Twin Bowers Come Crashing Down</ArticleSubheader>
            <p>
                You can't do much when your opponent has the #1 RB, two of the top 6 WR, the #1 DEF and a top 5 K of the week. In this matchup, Twin Bowers would have been beaten by only 4 of Kirk Thuggins & The Boys players. This is a metric we are planning to add to all matchup recaps in the near future.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Twin Bowers will be taking on Friendship is Magic in week 3, while Kirk Thuggins & The Boys will face off against Youngster Joey in week 3.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Youngster Joey Snagged Naming Rights</ArticleSubheader>
            <p>
                Another super close matchup this week that had implications outside of the leaderboard. Youngster Joey was able to get massive performances from his Cardinals stack and Davante Adams in order to secure the W over the team he earned the right to rename to Friendship is Magic.
            </p>
            <LeagueQuote>
                "I have opened the MLP wiki too many times...This is a punishment for me"<br />- Youngster Joey
            </LeagueQuote>
            <p>
                Friendship is Magic scored the 3rd most points this week and took the L, something that has only happened a few times in league history. If they had started Kmet over Likely, they would've won this matchup.
            </p>
            <p>
                Two managers correctly picked Youngster Joey to win in the survivor pool, and stayed alive by doing so. One non-manager incorrectly picked Friendship is Magic, and has been eliminated from the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Youngster Joey plays against Kirk Thuggins & The Boys in week 3, while Friendship is Magic will face off against Twin Bowers.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Battle of the non-RBs</ArticleSubheader>
            <p>
                This matchup was full of good RB performances that basically cancelled each other out, so it came down to the non-RBs to decide this one. Giving Me a Chubb outperformed Pink Pony Kupp at every other position, which led to a dominant win. Ka'imi Fairbairn was their top scorer, with Flowers not far behind. Trey McBride had a great game too. This team could be dangerous while CMC remains out, and they might be looking to find a reliable WR2.
            </p>
            <p>
                Two managers lost their perfect record in the survivor pool by incorrectly picking Pink Pony Kupp to win. No managers picked Giving Me a Chubb to win.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Giving Me a Chubb will play against Calvin's Cold Streak in week 3, while Pink Pony Kupp will face off against Cinderella.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Cinderella moves to 2-0</ArticleSubheader>
            <p>
                Cinderella might need a rebrand after a hot start to this new season, putting up the most points last week, and the 4th most points this week. Malik Nabers, Nico Collins, Breece Hall, and Rhamondre Stevenson combined for 97.6 points, which was enough to beat Calvin' Cold Streak. Another matchup where the loser would've been beaten by just 4 players from the winners team.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Calvin's Cold Streak will play against Giving Me a Chubb in week 3, and Cinderella will face off against Pink Pony Kupp.
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
                This week was certainly higher scoring across the board than last week. The 2-4 highest scorers this week were similar to the top 3 scorers last week.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            {/* <p>
                This week was certainly higher scoring across the board than last week.
            </p> */}
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
                Cinderella remains atop the leaderboard after 2 week with the most PF, and the lowest PA. Kirk Thuggins & The Boys are up 8 spots, going from the lowest PF to the 3rd most. 8 teams are 1-1, so there will be a big battle to try to avoid moving towards the bottom of the leaderboard.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Cinderella is looking like this year's Just Joshin after 2 weeks, we will see if they can keep it up. Hot Dog Enjoyer also stands out here with the least PF.
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
                No surprise here that Cinderella is on the top and Hot Dog Enjoyer is on the bottom. Pink Pony Kupp dropped 7 spots after their last place performance this week. Youngster Joey and Friendship is Magic both moved up after their game against each other this week.
            </p>
        </div>
    )
}

// const PlayoffOutlookArticle = () => {
//     return (
//         <div>
//             <ArticleSubheader>Playoff / Last Place Outlook</ArticleSubheader>
//             <PlayoffTable playoffData={playoffData} />
//             <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation. I want to build this out in-house using Walter's ROS projections at some point, maybe next season.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
//             </ArticleCaption>
//             <p>
//                 As described in good detail in the matchup summaries, the playoff race is down the 3 teams fighting for the 6 seed, and 4 teams are in contention for last place. The simulations do not like The Werbenjägermanjensens chances, but if they win it is very likely that one of the other 3 teams will get last instead. They somewhat control their own destiny.
//             </p>
//         </div>
//     )
// }

const AlternateUniverseArticleOne = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universe #1</ArticleHeader>
            <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
            <AltLeaderboardTable data={medianLbData} />
            <ArticleCaption>If everyone played their matchup each week, and also played against the median, this is what the leaderboard would look like.</ArticleCaption>
            <p>
                Cinderella is the only team that is 4-0 if we played against the median, and we have 2 teams that would be 0-4 in that scenario.
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
                Poor Management is aptly on top of this leaderboard, with the second most potential PF. Kirk Thuggins & The Boys have the most potential PF, but would still be 1-1.
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
                With this many 1-1 teams, it makes sense that many teams would be 2-0 with the best possible schedule, and 0-2 with the worst possible schedule. Kirk Thuggins & The Boys are an interesting case, since they scored the least points in week 1, and the most points in week 2, they would be 1-1 with any schedule.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>Hot Dog Enjoyer Potentially Safe After Another Loss</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
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
            <ArticleSubheader>The First Survivor Pool Death</ArticleSubheader>
            <p>
                The first survivor pool death has been reported. Non-league manager Chris went 0-2 in the first two weeks of the survivor pool. Small sample size, but it seems that insider knowledge is beneficial to success in this competition. Journalist Alec Maxwell reached out to Chris for comment on his performance:
            </p>
            <LeagueQuote>
                "Fucking josh fucked me twice. CMC goes down and I loose week 1 than the eagles throw a pick and I loose week 2"<br />- Chris
            </LeagueQuote>
            <p>
                Clearly they were upset about the losses, or looses? Unclear. When asked if they had any response to the haters that think this poor survivor performance should prevent him from being eligible to join the league, he answered:
            </p>
            <LeagueQuote>
                "Idk maybe if I had the app I would have been better able to analyze the teams in real time. Logging into the website wasn't exactly easy"<br />- Chris
            </LeagueQuote>
            <p>
                They can blame the crooked commissioner for their struggles logging into the site. When asked for any last comments, he answered:
            </p>
            <LeagueQuote>
                "It would've looked bad if I did well in the survivor pool because than people wouldn't want me to join because I'm better than them"<br />- Chris
            </LeagueQuote>
            <p>
                Sounds like a sore loser mentality, although I do agree this performance does help his case to join the league. We appreciate Journalist Alec for their strong reporting this week.
            </p>
            <ArticleSubheader>Commissioner Drama</ArticleSubheader>
            <LeagueQuote>
                "The commish ain't so bad"<br />- Alec
            </LeagueQuote>
            <p>
                It seems the commissioner is no longer under scrutiny from the league.
            </p>
            <ArticleSubheader>Fly Eagles Fly</ArticleSubheader>
            <p>
                Two managers fates were decided by Nick Sirianni this week, and wrote submissions to the Line hoping that Sirianni would see them in our publication. Here they are:
            </p>
            <hr style={{ borderColor: ColorConstants.text }} />
            <p style={{ marginLeft: '2em' }}>
                Dear Nick Sirianni,<br />
                <br />
                I'm writing to personally thank you for your management of the Philadelphia Eagles. I have Saquon Barkley and Jake Elliott on my fantasy team and always appreciate when you get to highlight their skills on the field. Each week I face a new dilemma; I am an Eagles hater but very invested in the success of my fantasy team.<br />
                <br />
                I have nothing but praise for you this past week. During the fourth quarter, your choice to stop the push down the field and instead have Jake score a field goal was perfect to give me the last few points I needed to topple my opponent in my fantasy league. The cherry on top though was that this stupid choice to kick the ball gave the Falcons a less yards they needed to get a game winning touchdown. The stars aligned perfect and they ended up stealing the win right out from under you! Your mismanagement was a perfect demonstration of my management.<br />
                <br />
                Thank you again for your service to Bill's fans and fantasy managers alike. I hope you continue your coaching style of supporting fantasy managers at the expense of your team's NFL success.<br />
                <br />
                Cheers,<br />
                Anthony "Youngster Joey" DiCarlo
            </p>
            <hr style={{ borderColor: ColorConstants.text }} />
            <p>
                A touching piece from a caring manager. "Bill's fans" is interesting, not sure who Bill is in this scenario. Now the other letter is a little less positive.
            </p>
            <hr style={{ borderColor: ColorConstants.text }} />
            <p style={{ marginLeft: '2em' }}>
                Dear Nick Sirianni,<br />
                <br />
                Dumb ass coach. I hope a bird shits on your head and you drop your entire plate of food on the floor tomorrow. I can only assume you personally wanted me to lose in fantasy this week, because clearly you weren't focused on winning the game. You're a playoff choker and will never fill the diabetic soled shoes of Andy Reid. Enjoy your 3 healthy weeks of Saquon Barkley. When Jalen Hurts can't bury his face in Taylor Swift's boyfriends brother's ass, he's nothing more than a zesty Justin Fields. You look like McLovin got divorced and turned to alcoholism. Good luck winning a superbowl, dipshit.<br />
                <br />
                Sincerely,
                Josh Kraines
            </p>
            <hr style={{ borderColor: ColorConstants.text }} />
            <p>
                This manager appears to be a little upset with Sirianni's coaching decisions. They probably sent him an angry Instagram DM after the game too.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9422nz.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Anster</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/942349.jpg"}>
            </ArticleImage>
            <ArticleCaption>Breaking News Submitted by Leanna</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9423bk.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/94248i.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9424d9.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Jake</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9425df.jpg"}>
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
    // {
    //     id: 11,
    //     content: PlayoffOutlookArticle,
    // },
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
    {
        id: 17,
        content: Meme1,
    },
    {
        id: 18,
        content: Meme2,
    },
    {
        id: 19,
        content: Meme3,
    },
    {
        id: 20,
        content: Meme4,
    },
    {
        id: 21,
        content: Meme5,
    },
    {
        id: 22,
        content: Meme6,
    },
    {
        id: 30,
        content: MotWRules,
    },
];
