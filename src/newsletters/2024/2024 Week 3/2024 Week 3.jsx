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

export const newsDate = '2024-09-26';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 3</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 3 was full of upsets in the NFL, with many of the most heavily favored teams losing their matchups, and taking many of the remaining players out of their survivor pools. Luckily for many of the members of our league's survivor pool, the most heavily favored team this week was able to win their matchup. Three managers were knocked out of the survivor pool this week, thanks in part to the worst performance of the season so far from First Down Syndrome. Their 64.44 points was by far the fewest in a game this season, and is the 6th lowest in recorded league history (including a 4 point output from Gay Bills in week 17 of 2022), and the 3rd lowest since we switched to PPR scoring. All that being said, 6 shots/dogs is not the most that have been done in one week, so they've got that going for them.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                This was the first week this season with 0 perfect managers. Cinderella was the only perfect manager last week, then this week they left the most points on their bench of any manager this season. Their 67.4% of the maximum is the least of any team this season, and if they managed their team perfectly they could've had their second week as the league's leading scorer. Just Joshin pt. 2 and Youngster Joey had similar stories this week, with low percentages of their maximum points. Just Joshin pt. 2 was able to come away victorious, but Youngster Joey and Cinderella lost their matchups. First Down Syndrome also managed their team poorly, but even if they were perfect they would still have scored the fewest points in the league. Perfect management could've saved them one shot/dog.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Edging 9 Shots/Dogs</ArticleSubheader>
            <p>
                This was a very tough week for First Down Syndrome, who came into this matchup with a 1-1 record. Injuries really hit this team hard during the first two weeks, losing Isaiah Pacheco, and basically losing Tyreek Hill because of the injury to Tua. George Kittle also missed this week, so they had to find a substitute tight end as well. Jameson Williams had his first dud of the season with the Lions being very run heavy in their game, and Tony Pollard also struggled due to game script and a tough matchup.
            </p>
            <p>
                Hot Dog Enjoyer on the other hand had a pretty good week by their standards. Interestingly, they would've also had to do 6 shots/dogs if First Down Syndrome put up any kind of a fight. They got carried by 3 players in this matchup, and those 3 players would have combined to beat First Down Syndrome all on their own. For those keeping track, that is the record for that stat this season, and will be added to future editions of the Line whenever we get around to calculating it.
            </p>
            <p>
                Kyle incorrectly picked First Down Syndrome to win in the survivor pool to earn their first strike (out of two of course). Josh K correctly picked Hot Dog Enjoyer to win in the survivor pool, staying perfect on the season.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Hot Dog Enjoyer will welcome Cinderella to the Matchup of the Week in week 4. Cinderella ate 4 hot dogs this week as a practice run, and has some pre-cooked in anticipation of losing in week 4. First Down Syndrome will play against fellow 1-2 manager Twin Bowers in week 4. This matchup between two teams plagued by injury will be very important in the race to last place.
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
            <ArticleSubheader>Still Just Joshin</ArticleSubheader>
            <p>
                This game was full of players from the awards section. Just Joshin pt. 2 had the MVP and QB1 of the week in Josh Allen, and the Biggest D in Green Bay. Poor Management had the Tightest End in Jake Ferguson, and Das Boot Harrison Butker. Unfortunately for Poor Management, their only other player to perform well was Justin Jefferson. It's tough to win when your QB gets outscored by 20 and your 2nd best player puts up less than 10 points.
            </p>
            <p>
                No managers selected either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Just Joshin pt. 2 will look to stay undefeated as they play against Youngster Joey in week 4. Poor Management look to avoid starting 1-3 and faces off against Giving Me a Chubb in week 4.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Friendship <i>is</i> Magic</ArticleSubheader>
            <p>
                Rainbow Dash shined in primetime on MNF this week, lighting up a weak CIN D (who Friendship is Magic interestingly also played this week). Sweetie Belle nearly had another 25+ point week, they almost caught a deep TD pass before the game got out of hand. Queen Chrysalis disappointed a bit, but the injury to Tank Bigsby helped make sure they saw most of the workload. Sunset Shimmer had a great game despite a low pass volume from the Lions. Fluttershy got massively outplayed by Jauan Jennings. Pinky Pie is looking like the potential WR1 on the season at this rate. Applejack was disappointing and will likely get benched for Scootaloo next week. Izzy Moonbow didn't do a ton this week, but they will bounce back in the future as their offense continues cooking.
            </p>
            <p>
                Twin Bowers had a second straight week of disappointment, primarily driven by injuries and a lack of efficient RBs. Zach Charbonnet was the bright spot on this team, which isn't saying a lot when his job will likely be gone again next week. This team is desperately missing Jordan Love, AJ Brown, and Deebo Samuel. Hopefully for their sake they will get Love back in week 4, and the other guys back soon after.
            </p>
            <p>
                Six managers correctly picked Friendship is Magic to win in the survivor pool. Three of those managers remain perfect, and three of those managers stayed alive by picking correctly. No managers picked Twin Bowers to win in the survivor pool. It seems like Josh always has a side bet on their matchup, and this week's side bet allows them to pick Kyle's survivor pool pick next week. Something to keep an eye on as Kyle is trying to avoid elimination.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Friendship is Magic plays against the 0-3 Calvin's Cold Streak in week 4, and Twin Bowers will play against First Down Syndrome in a must win game for both injured squads.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>The Boys Come Through for Kirk Thuggins</ArticleSubheader>
            <p>
                This matchup featured the first and fourth highest scoring teams this week. This is the second week that Youngster Joey has been the best loser, and they narrowly avoided that title in week 2 as well. Lopunny is carrying this team on their back 😩 so far this season, and Slugma has been doing well after their dud in week 1. If this team can keep it up they should have some schedule regression and win some games handily.
            </p>
            <p>
                This is the second straight week that Kirk Thuggins & The Boys have been the best managed team, both without the #1 overall draft pick CMC. Dak went off in the loss to the Ravens because he had to throw so much. DK went for over 20 for the second straight week, and Aubrey is one of the top players in the league.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Kirk Thuggins & The Boys will play against Pink Pony Kupp in week 4. Youngster Joey will face off with 3-0 Just Joshin pt. 2, so maybe the schedule regression won't come until week 5.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Calvin's Cold Streak Continues</ArticleSubheader>
            <p>
                Giving Me a Chubb had monster 30+ point performances from both Fast Guy and Tank in this matchup, which helped propel them to victory. For those keeping track at home, they would've beaten Calvin's Cold Streak with only 4 of their players totals: Kyren, Henry, Amari, and Kermit. This team's RB room is a threat to put up 75 combined points every week, which is scary to face off against.
            </p>
            <p>
                Calvin's Cold Streak had a rough week, lowlighted by Justin Tucker missing yet another FG and Anthony Richardson looking worse than Justin Fields and Daniel Jones. Ja'Marr Chase was the main bright spot on this team, him and Burrow are in a groove and should be able to keep up this type of production on a regular basis, although playing the Commies does help.
            </p>
            <p>
                Matt Robinson was eliminated from the survivor pool this week because of their incorrect selection of Calvin's Cold Streak. No managers picked Giving Me a Chubb to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Calvin's Cold Streak looks for their first win in week 4 against 2-1 Friendship is Magic. Giving Me a Chubb will play against Poor Management in week 4.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Cinderella Drops the Ball</ArticleSubheader>
            <p>
                Cinderella put up 102.68 points this week, and had nearly half of that total riding on their bench. It is fair to not believe in the Panthers until you see it, so it is understandable that they did this. They actually reached out to their opponent for start/sit advice earlier in the week, and Pink Pony Kupp gave no comment on the matter while knowing Diontae Johnson was a smash start.
            </p>
            <p>
                Pink Pony Kupp is another team relying heavily on RB points to win, since their WR and TE are injured and/or underperforming. They similarly did not believe in the Panthers offense, playing the Raiders defense against them for -2 points. The Lions run heavy offense got them nearly 40 points since they had both RBs, and Jonathan Taylor is a legit RB1 in the Colts offense despite Anthony Richardson's struggles.
            </p>
            <p>
                Devan and Smitty were eliminated from the survivor pool this week because of their incorrect selection of Cinderella. No managers picked Pink Pony Kupp to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Cinderella will play against Hot Dog Enjoyer in week 4 in Matchup of the Week. Pink Pony Kupp will play against Kirk Thuggins & The Boys in week 4 after eliminating them from the survivor pool this week.
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
                Pretty evenly distributed week, and we added a new season low!
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
                Just Joshin pt. 2 claims the top spot on the leaderboard after 3 weeks. They've got the 2nd lowest points allowed, and the 5th most points for. Kirk Thuggins is in the 2 spot with the most points for, and Youngster Joey is down at 7 despite having the 3rd most points for. Hot Dog Enjoyer has the least points against but is in 11th place.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Hot Dog Enjoyer owning the bottom left of this chart, and Youngster Joey owning the top right. Both teams have a 1-2 record. Twin Bowers is also 1-2 with the most points against in the league.
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
                Youngster Joey takes over the #1 spot in the power rankings this week despite their 1-2 record. They've had the toughest schedule in the league to date, and have consistently been one of the top 5 teams each week. Our only 3-0 team, Just Joshin pt. 2, is 6th in the power rankings, and has yet again benefitted from the easiest schedule in the league. That easiest schedule is tied with Hot Dog Enjoyer, who is dead last in the power rankings.
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
                Youngster Joey really wishes we played the median right about now.
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
                Cinderella would be 3-0 if this was best ball, and First Down Syndrome would be 0-3 because of tougher matchups.
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
                There are a few teams that would understandably be 0-3 with Youngster Joey's schedule and 3-0 with Poor Management, Hot Dog Enjoyer and Just Joshin pt. 2's schedules. Youngster Joey would be 0-3 with Twin Bowers' schedule, which is a testament to how hard their schedule has truly been. Kirk Thuggins & The Boys remains 2-1 in every possible configuration due to being 12th, 1st, and 1st in weekly scoring through 3 weeks.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>Giving Me A Chubb rooting for Cinderella</ArticleSubheader>
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
            <ArticleSubheader>The League Gets Into Finance?</ArticleSubheader>
            <LeagueQuote>
                "Sometime soon we should have a financial discussion night...setting up 'mega back door Roth 401k' type stuff"<br />- Anthony
            </LeagueQuote>
            <p>
                It's clear there's a class divide in this league. Some managers can afford to strategize their Roth 401k, while the rest of us are just trying to strategize our next FAAB bid. On the bright side, if they handle their real money like they handle their FAAB, retirement is gonna look a lot closer for all of us.
            </p>
            <ArticleSubheader>Glizzy Gobbling For Gain?</ArticleSubheader>
            <p>
                There was discussion led by Greg that each hot dog eaten during the week should be worth 1 point. This was after Greg gobbled 4 glizzies with the goal of getting their opponent to sit Joe Burrow. Their opponent would never break the league rules anyway, so this was all in vain.
            </p>
            <LeagueQuote>
                "1 dog = 1 point"<br />- Silent Majority
            </LeagueQuote>
            <LeagueQuote>
                "If I could eat chicken cutlets for a pt each I'd do it"<br />- Anthony
            </LeagueQuote>
            <LeagueQuote>
                "If I could delay my motw video by another week for a point, I'd do it"<br />- Nikhil
            </LeagueQuote>
            <LeagueQuote>
                "Not the biggest fan of needing to eat dogs every week, I think we should do dumplings"<br />- Jake
            </LeagueQuote>
            <LeagueQuote>
                "EvErY dOg Is OnE pOiNt"<br />- Greg
            </LeagueQuote>
            <LeagueQuote>
                "I'm gay"<br />- Alec
            </LeagueQuote>
            <LeagueQuote>
                "I love hot dogs"<br />- Trevor
            </LeagueQuote>
            <LeagueQuote>
                "BRING ON THE DOGS!!"<br />- Josh
            </LeagueQuote>
            <LeagueQuote>
                "I want to have a dog off next season"<br />- Devan
            </LeagueQuote>
            <p>
                This string of submissions felt very natural and realistic to all come in right after the discussion in the groupchat went nowhere. The Offensive Line cannot confirm any of these quotes are true, but some appear to be more trustworthy than others.
            </p>
            <ArticleSubheader>Leagues First Trade of 2024</ArticleSubheader>
            <p>
                The league had it's first trade of 2024 this week, and some managers got flashbacks from it. The trade was J.K. Dobbins for Tank Dell, and it was between Pink Pony Kupp and Poor Management.
            </p>
            <LeagueQuote>
                "This deal is Metcalf for Harris all over again. Absolute fleece job!"<br />- Veto Enjoyer
            </LeagueQuote>
            <p>
                It appears some managers believed one side of this deal fleeced the other side, but it is not clear which side is which.
            </p>
            <ArticleSubheader>Kickers 📈 Tight Ends 📉</ArticleSubheader>
            <p>
                Brandon Aubrey (K1) has 53.7 points this season. This point total would make him the QB9, the RB11, the WR8, the TE1, and the DEF1.
            </p>
            <p>
                There are 14 kickers that have over 30 points this season. There are only 5 tight ends who have done that. There are also 8 defenses with over 30 points on the season.
            </p>
            <p>
                The PPR TE1 is Dallas Goedert, who scored 66% of his points (on the bench) in week 3 alone. The PPR WR4 is Jauan Jennings, who scored 73% of his points (on the bench) in week 3 alone.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/94ousn.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Pink Pony Kupp</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/94pz7e.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/94pzle.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/94pzor.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/94pzq7.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Pink Pony Kupp</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/94pzvb.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/94q00b.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

// const Meme8 = () => {
//     return (
//         <ImageWrapper>
//             <ArticleImage src={"https://i.imgflip.com/94q05a.jpg"}>
//             </ArticleImage>
//             <ArticleCaption>Submitted by Jake</ArticleCaption>
//         </ImageWrapper>
//     )
// }

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
    // {
    //     id: 24,
    //     content: Meme8,
    // },
    {
        id: 30,
        content: MotWRules,
    },
];
