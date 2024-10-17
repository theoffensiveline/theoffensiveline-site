import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, DangerTable, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable } from '../../components/newsStyles';
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
import artOfTheDeal from '../2024 Week 4/The_Art_of_the_Deal.jpg';

export const newsDate = '2024-10-17';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 6</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 6 was pretty crazy, with some impressive performances on both ends of the spectrum. The 2 highest scoring teams of the week faced off, and Twin Bowers was able to put up the #3 highest score of the season in that game to win it. Giving Me a Chubb was the runner up in that game, and was the 2nd best loser of the season as well. Youngster Joey managed to score the 4th lowest score of the season this week, and proceeded to get fleeced in a trade they proposed. You will notice there are more awards than normal, with 2 "Biggest D" awards getting shared this week. I didn't want to just pick one at random (I think this is exactly what happens for "Heavist Top" but shhhh I will fix that another time). All of the position awards will now have multiple recipients if there is ever a tie. I'm surprised it took 6 weeks to have a tie in these awards.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                As sort of mentioned above, there were 2 perfect managers this week, Pink Pony Kupp and Costo Guys. Pink Pony Kupp got the award, which is fitting because they were the better manager of the two this week, scoring more points than Costo Guys. Costo Guys also cheesed their way to this 100% this week, by having all injured or BYE players on their bench. The lowest percentage this week was an awful 69.8% from Crashee Rice. This was the 7th most points left on a bench this season.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Another 3-Shot/Dog Loss for Poor Management</ArticleSubheader>
            <p>
                Poor Management came into this week with one goal; to be the first manager to have a 0-shot/dog loss in MotW. If Mike Evans didn't get injured, they would've likely had one less shot/dog to worry about. GB came really close to that 10 point threshold, and the Cowboys got absolutely murdered which somehow meant Ferguson did nothing. We've yet to see a 0-shot/dog loss in MotW, but maybe we will someday.
            </p>
            <p>
                Pink Pony Kupp was feeling the pressure this week, after they bet on themselves in the survivor pool. Their team showed up to play, and 4 of their players got over 18 points. Bucky Irving put up big numbers with Rachaad White out, and David Montgomery scored a TD as he always does. Tank Dell also shined without Nico Collins.
            </p>
            <p>
                Trevor selected himself in the survivor pool, and stayed alive by doing so. No managers selected Poor Management to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Pink Pony Kupp's win brings Hot Dog Enjoyer back to the MotW for the 3rd time this season. Poor Management will play against Calvin's Cold Streak in week 7.
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
            <ArticleSubheader>Closest Mat(t)ch of Week 7</ArticleSubheader>
            <p>
                This matchup between two Matt's was a close one, and the victorious Matt was carried by Chris Godwin. Godwin was the MVP this week, scoring a whopping 28.13% of this team's points, #2 on the season. These 35.5 points were also the #2 WR performance of the season in our league. Kamara, Aubrey, and London also did their parts, as they have done all season for this team.
            </p>
            <p>
                First Down Syndrome had standout games from Kittle and Hurts, but was ultimately let down by Tyler Bass on Monday Night. Tyler Bass missing a FG and an XP cost this team the game this week. Rome Odunze and Jaleel McLaughlin were also disappointing, but Tyler Bass hurt the most. The Bills signed a kicker to their practice squad this week, indicating that Bass' time in Buffalo could be up soon.
            </p>
            <p>
                Two managers correctly selected Kirk Thuggins & The Boys to win in the survivor pool. Jake and Alec barely stayed alive with that pick. No managers selected First Down Syndrome to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                First Down Syndrome will play against Crashee Rice in week 7. Kirk Thuggins & The Boys get a matchup with 4-2 Just Joshin pt. 2.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Crashee Rice Has Negative RB Points</ArticleSubheader>
            <p>
                Crashee Rice had -0.1 points between their two RBs this week. Travis Etienne ended up with -0.1 points because he went out after getting injured, and James Cook put up a 0 after he was a surprise inactive on Monday Night Football. Cole Kmet and Jayden Daniels were the only truly impressive players on the team this week.
            </p>
            <p>
                Just Joshin pt. 2 was able to get big games from Josh Allen and Bijan Robinson, and non-0 games from all of their other players, which was enough to beat their opponent this week. DJ Moore was disappointing, thanks to the big game from Cole Kmet, but that didn't end up making a difference in this matchup.
            </p>
            <p>
                No manager picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Just Joshin pt. 2 will play against Kirk Thuggins & The Boys in week 6, and Crashee Rice gets matched up against First Down Syndrome.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Hot Dog Enjoyer Enjoys a W</ArticleSubheader>
            <p>
                Hot Dog Enjoyer was able to get their 2nd win of the season this week, thanks to 4 big performances from Brock Purdy, Joe Mixon, Terry McLaurin and HOU DEF. CeeDee Lamb did his part as well. This team is now in a 5-way tie for last, which is better than where they were last week.
            </p>
            <p>
                Calvin's Cold Streak got 0.9 points from Calvin Ridley this week, and only had Najee Harris above 20 points. This wasn't a terrible performance from them, but they ultimately fell short in this matchup. They did leave some points on their bench that could've helped them win, which is always frustrating.
            </p>
            <p>
                No manager picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Hot Dog Enjoyer will play against Pink Pony Kupp in MotW in week 6, and Calvin's Cold Streak gets matched up against Poor Management.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Two Heavy Hitters Face Off</ArticleSubheader>
            <p>
                Twin Bowers was able to secure the victory in this one, thanks to a well rounded team performance. 4 players scored over 21 pints for them, and 3 more had 14 or more. Their K and DEF each had 6, which isn't great but isn't bad. This was a dominant performance and was the 3rd most points by a team this season.
            </p>
            <p>
                Giving Me a Chubb had a chance to win this matchup, as they left Jakobi Meyers in their starting lineup while being out in their game. We've got autosub for a reason, and they elected not to use it. They left a lot of points on the bench, and had the highest potential score in the league. Derrick Henry was a beast again, and Caleb Williams had a breakout game. This team is still rolling despite the loss, as they had the 2nd most points by a team this week.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Twin Bowers will play against Costo Guys in week 7, and Giving Me a Chubb gets matched up against Youngster Joey.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>The Week's Biggest Blowout</ArticleSubheader>
            <p>
                Youngster Joey did not put up a fight in this game, only scoring 85.16 points, the 4th lowest point total of any team this season. Marvin Harrison put up a big fat donut after getting concussed, and Saquon had a disappointing 7.4 points. If Courtland Sutton is your 2nd highest scoring player, you probably lost that week.
            </p>
            <p>
                Costo Guys (still don't understand Costo) cruised to an easy win in this one. Breece Hall, Lamar, Diontae Johnson, and Chris Boswell put up numbers this week, and Ray-Ray McCloud and Alec Pierce did not. Not much else to say about this one since this matchup was not close.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Youngster Joey will play against Giving Me a Chubb in week 7, and Costo Guys gets matched up against Twin Bowers.
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
                Pretty middle of the road week for most teams, with a few low scores and a high score on the ends.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                This week was pretty similar to last week, with a slightly lower average and median.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                Kirk Thuggins & The Boys had their first close victory this week, while First Down Syndrome had their first close defeat. Hot Dog Enjoyer had their first close victory, and Calvin's Cold Streak had their first close defeat.
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
                Costo Guys re-takes first place this week, and has the most PF and least PA this season. Twin Bowers is in 3rd place while having the most PA, impressive stuff from them. Hot Dog Enjoyer remains on the bottom, but has entered a 5-way tie for last rather than being alone down there. Crashee Rice fell 4 spots to 7th place, as the lower scoring team of the two 3-3 teams. The 5-way tie for 1st is interesting to note, still anyone's game for first or last place.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                There is a pretty even distribution here, no teams directly on the line anymore. The closest we have to "unlucky and bad" (will bring back the labels at some point), is Calvin's Cold Streak and First Down Syndrome, but neither team is very unlucky or very bad thus far.
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
                Giving Me a Chubb reclaims the #1 spot in the power rankings this week after their loss. This seems to be a trend this season of moving up after losing your matchup. Putting up the #2 performance in a week will usually mean you trend up. The easiest schedules by this measure are Costo Guys and Just Joshin pt. 2, closely followed by Crashee Rice and Hot Dog Enjoyer. Twin Bowers has had a very hard schedule so far.
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
                There aren't many differences in the standings if we had an extra game against the median in week. First Down Syndrome is still the main benefactor of this.
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
                If this were a best ball league, Crashee Rice would be 6-0. They have had the ability to win their matchup every single week, but they are 3-3 in the actual standings. They would also have the least PA in this universe.
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
                Giving Me a Chubb would be 6-0 with Poor Management's schedule, and Twin Bowers would be 6-0 with Just Joshin pt. 2's schedule. First Down Syndrome would be 0-6 with Twin Bower's schedule, and Hot Dog Enjoyer would be 0-6 with Poor Management's schedule. Crazy the variety of outcomes possible with Poor Management's schedule.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>Big Week for ROS Safety</ArticleSubheader>
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
            <ArticleSubheader>Trades on Trades on Trades</ArticleSubheader>
            <p>
                The league saw many trades happen this week, some were better than others. Many clown emojis were reacted in the Sleeper chat. Memes were made, and managers were clowned on. Allen Lazard got passed around countless times, literally sold for FAAB dollars on the open market.
            </p>
            <LeagueQuote>
                "What's FAAB? I thought we used the Waiver Wire?"<br />- Anthony
            </LeagueQuote>
            <p>
                It appears some managers don't even know what FAAB is or how Lazard was traded for such currency. This league can be illiterate at times, which is ironic with how much written content is made available to them every week. There is a meme about just how illiterate this league can be in the meme section.
            </p>
            <ArticleSubheader>Embarring Standings</ArticleSubheader>
            <LeagueQuote>
                "I'm embarrassed to have the same record as Alec"<br />- Anthony
            </LeagueQuote>
            <LeagueQuote>
                "I'm embarrassed to have the same record as Anthony"<br />- Alec
            </LeagueQuote>
            <p>
                The 5 way tie for last is getting in managers heads. Being in last is embarrassing, and these managers are rightfully embarrassed.
            </p>
            <ArticleSubheader>Other Submissions</ArticleSubheader>
            <LeagueQuote>
                "DOUBLE CHOCOLATE CHUNK COOKIE"<br />- Costo Guys
            </LeagueQuote>
            <p>
                Can't spell their own name right or get the quote right smh.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9735kk.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/96s49v.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9736ie.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Jake</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9736l7.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Greg</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={artOfTheDeal}>
            </ArticleImage>
            <ArticleCaption>Submitted by Alec</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/97378f.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9737ct.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9737iv.jpg"}>
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
        id: 23,
        content: Meme7,
    },
    {
        id: 24,
        content: Meme8,
    },
    {
        id: 30,
        content: MotWRules,
    },
];
