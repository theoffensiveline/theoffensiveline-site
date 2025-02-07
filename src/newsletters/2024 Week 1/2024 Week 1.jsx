import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, DangerTable } from '../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
import medianLbData from './medianLb.json';
import motwHistoryData from './motwTable.json';
// import playoffData from './playoffTable.json';
// import powerRankingsData from './powerRankings.json';
// import scheduleData from './scheduleData.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';
import dangerTable from './dangerTable.json';
import motwFuture from './motwFuture.png';

export const newsDate = '2024-09-12';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 1</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 1 is the start of a new season, which typically comes with a few surprises, but this year felt like more than usual. The 1.01 CMC was shockingly ruled out 90 minutes before the game, and could miss an extended period of time with achilles tendonitis. Fantasy managers everywhere that didn't draft Jordan Mason are irate with the 49ers for the way they have handled this situation. This CMC situation is one reason that the most mismanaged team this week was Kirk Thuggins & The Boys. Many of the leagues managers were disappointed with this outcome because they chose Kirk Thuggins & The Boys in the survival pool this week, more on this later. SUN GOD'S CHOSEN was able to beat Kirk Thuggins & The Boys as the worst winner despite leaving a bunch of points on their bench. The best managed team this week was Cinderella, and they had the biggest blowout as well. Youngster Joey was the best loser this week, with the 5th highest scoring output of the week.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                There was only one perfect manager this week, and they were also the highest scorer of the week. Four teams had the potential to outscore Cinderella, but failed as managers. It was a really tough week for Kirk Thuggins & The Boys, as previously covered. They nearly scored a nice percentage of their potential points. This chart shows that it might've been a worse week for IKEA x50crmov15, since they had the lowest potential points of any team.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Rematch of the Last MotW</ArticleSubheader>
            <p>
                These two teams faced off in week 15 last year, where IKEA x50crmov15 earned 7 shots/dogs, which were the most anyone did last season. Questionable eliminated themselves from the toilet bowl with that victory, which meant they would start this season with it as well. When the schedule was randomly generated, IKEA x50crmov15 was unlucky enough to be the other team in MotW yet again. They did the MotW punishment 3 times last season, and now they are the first one to do so this season.
            </p>
            <p>
                IKEA x50crmov15 invoked the corn dog clause and ate 6 corn dogs immediately after the Sunday night slate finished up, just in case Brock Purdy got below 10 points on Monday night. That 6th dog was not necessary, but Purdy edged that 10 point threshold in this one. The only bright spots for IKEA x50crmov15 were their RBs who both performed above expectations in week 1.
            </p>
            <p>
                Questionable also had 5 players below 10 points, but the players above 10 points all had 15 or more, which helped them secure the victory. De'Von Achane was hyper efficient yet again, but did get injured in this game. Mike Evans did Mike Evans things, and Justin Jefferson did not seem too negatively affected Darnold at QB.
            </p>
            <p>
                The survivor pool adds a new element of excitement to MotW this year, as it is likely that multiple managers will have a rooting interest in the outcome every week. Two managers correctly chose Questionable to win this week, and 1 manager incorrectly chose IKEA x50crmov15 to win.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Questionable will face off against First Down Syndrome in MotW in week 2, while IKEA x50crmov15 will play against Just Joshin pt. 2.
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
            <ArticleSubheader>Just Joshin Continues Regular Season Dominance in pt. 2</ArticleSubheader>
            <p>
                Josh Allen was QB1 in week 1, leading the way for Just Joshin pt. 2 in their victory over First Down Syndrome. Looking at Just Joshin pt. 2 you would think this is a keeper league, with Josh Allen, DJ Moore, Sam LaPorta and DAL D returning from their squad last year. They made a point in the draft to get their guys again this year. First Down Syndrome put up a respectable amount of points in this matchup, but it was not enough to get the W. Solid performances all around for this team lead of course by Tyreek Hill.
            </p>
            <p>
                No managers chose either team in this matchup in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Just Joshin pt. 2 will play against reigning MotW loser IKEA x50crmov15 in week 2, and First Down Syndrome gets pulled into MotW against Questionable.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Gotta Catch 'Em All (unless you're Marvin Harrison Jr.)</ArticleSubheader>
            <p>
                Twin Bowers is the reigning champion of the league, and starts of 1-0 in this new season with a narrow win over Youngster Joey. Youngster Joey put up a good fight this week as the best loser, and was a solid Marvin Harrison Jr. debut away from winning this matchup. Saquon was the overall #1 player this week, after Youngster Joey was upset when they drafted him. Twin Bowers had biggest D this week help them get the W, playing MIN D against his own Giants.
            </p>
            <p>
                One manager correctly chose Twin Bowers to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Twin Bowers will be taking on the crooked commish Kirk Thuggins & The Boys in week 2, while Youngster Joey faces off with SUN GOD'S CHOSEN. Sources say that game will be extremely high stakes, as the winner will get full naming rights to the loser's team and players.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>High Drama In Week 1</ArticleSubheader>
            <p>
                This game had the most drama of any week 1 matchup by a longshot. Going into Monday Night, Kirk Thuggins & The Boys had a decent chance to win with CMC in the lineup. Once CMC was ruled out, there was no way for them to get 20+ points since Jordan Mason was already on a roster. The CMC situation is not the only reason there was drama in this one.
            </p>
            <p>
                Four managers incorrectly chose Kirk Thuggins & The Boys to win in the survivor pool. More on this in League Buzz.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Kirk Thuggins & The Boys will face off against Twin Bowers in week 2, and SUN GOD's CHOSEN plays for naming rights of Youngster Joey and their players.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Cinderella Beats On Chubb</ArticleSubheader>
            <p>
                Cinderella got a hard carry from kicker Jake Moody, the highest starting kicker score of the week. Lamar, Rhamondre, Breece, and Nico also added strong contributions. This team is dealing with multiple injuries after week 1 though, including Puka and Njoku. They were already rostering 2 injured players as well in Hockenson and Brooks. This team will be going through it over the next few weeks before bye weeks even start. Giving Me a Chubb struggled mightily in this one, with their top scorer also being their kicker, but at a much lower point total. The Ravens on this team didn't put up big numbers like Lamar did, and Mahomes wasn't great for fantasy in week 1 either.
            </p>
            <p>
                Four managers correctly chose Cinderella to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Cinderella plays against Cook-ing a 0.2 in week 2, and Giving Me a Chubb plays against Pink Pony Kupp.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Cooking a 0.2 or a 2?</ArticleSubheader>
            <p>
                Cook-ing a 0.2 played the NYJ defense in this one, who put up a 2 on MNF, but that was the least of this team's concerns this week. Travis Kelce was not very involved in the Chiefs offense this week and Jordan Addison came down with an ankle injury. The bright spot was Anthony Richardson looking elite, but we will see if the long TD passes are sustainable. Pink Pony Kupp got carried by Cooper Kupp who had 14 receptions this week. Kyle Pitts had a TD which helped salvage an otherwise underwhelming performance where Kirk Cousins looked awful.
            </p>
            <p>
                No managers chose either team in this matchup in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Cook-ing a 0.2 will play against Cinderella in week 2, and Pink Pony Kupp will play against Giving Me a Chubb.
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
                This section isn't super interesting in week 1.
            </p>
            {/* <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                This section is even less interesting in week 1.
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
                Cinderella sits atop the leaderboard after 1 week with the most PF, and the third lowest PA. Just Joshin pt. 2 has PA in the red after 1 week, maybe it'll be different than last season for them.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                This is a pretty normal distribution after 1 week, we will see if it gets as extreme as last season over time.
            </p>
        </div>
    )
}

// const PowerRankingsArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Power Rankings</ArticleHeader>
//             <ArticleSubheader>Current Power Rankings</ArticleSubheader>
//             <PowerRankingsTable powerRankingsData={powerRankingsData} />
//             <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 0 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 0 would mean that you played the worst team every week.</ArticleCaption>
//             <p>
//                 Just Joshin's schedule is easier than playing against The Werbenjägermanjensens every week! They fell this week to #2 in our power rankings after Njigba's in Paris was the #1 team yet again. WalterFix is at #5 despite being eligible for last place, thanks to their ability to be a top 3 team in 4 of the last 6 weeks.
//             </p>
//         </div>
//     )
// }

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
                Youngster Joey and First Down Syndrome lost their matchups this week despite being in the top half of the league in points.
            </p>
        </div>
    )
}

const AlternateUniverseArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universe #2</ArticleHeader>
            <ArticleSubheader> Best Ball Standings</ArticleSubheader>
            <AltLeaderboardTable data={bestBallLbData} />
            <ArticleCaption>If everyone played their best lineup every week, this is what the standings would look like. All columns include hypothetical totals.</ArticleCaption>
            <p>
                Twin Bowers could've put up huge numbers, and IKEA x50crmov15 had a very low ceiling in week 1. First Down Syndrome had the fourth highest maximum points, but still would have lost their matchup.
            </p>
        </div>
    )
}

// const AlternateUniverseArticleThree = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #3</ArticleHeader>
//             <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
//             <ScheduleTable data={scheduleData} />
//             <p>We finally got around to doing this ourselves after Walter forced us to. This format is a lot more digestible and interesting, and shows just how easy Just Joshin's schedule has been. Teams are sorted alphabetically for now, might sort them by standings eventually.</p>
//         </div>
//     )
// }

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>IKEA x50crmov15 Remains in Danger</ArticleSubheader>
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
            <ArticleSubheader>Are Managers Sandbagging For Survivor Pool Bait?</ArticleSubheader>
            <p>
                The Offensive Line has received multiple reports this week of managers intentionally excluding players from their starting lineup to bait other managers into choosing their opponent for the survivor pool. At least one manager chose Kirk Thuggins & The Boys to win in the survivor pool this week because SUN GOD'S CHOSEN didn't have their K or DEF in their lineup. This meant the Sleeper matchup preview showed a percent chance to win at the time of selection that did not reflect the true outcome. There were reports that other teams may have been doing this as well. At least one league manager thinks this is a shitty move.
            </p>
            <LeagueQuote>
                "Coaches pulling players to muddy the survivor pool games goes against the spirit of the game. My organization is committed to making sure our roster is as up to date as can be so everyone has a chance to make eductated decisions."<br />- IKEA x50crmov15
            </LeagueQuote>
            <p>Other league managers that have voiced concern about this strategy remained anonymous in their reports, and did not give any specific quotes about the situation when asked for comment. One league manager came out with the following statement backing the move:</p>
            <LeagueQuote>
                "Ultimately it is a skill issue on your part if you pick your survivor pool winner based solely on the Sleeper matchup preview, do your own research."<br />- Pink Pony Kupp
            </LeagueQuote>
            <ArticleSubheader>More Complaints</ArticleSubheader>
            <p>
                One manager is upset about the pre-stated punishment for not doing the draft order challenge.
            </p>
            <LeagueQuote>
                "The draft of the draft should not affect the draft. It is bullshit that I lost my pick because I didn't participate in league activities"<br />- Anthony
            </LeagueQuote>
            <p>
                Shortly after that submission was made, another submission was made.
            </p>
            <LeagueQuote>
                "I rightfully lost my pick because I didn't participate in the happy meal challenge"<br />- Anthony
            </LeagueQuote>
            <p>
                This managers comments are confusing to say the least. There was another submission that complained about the results of the Happy Meal challenge.
            </p>
            <LeagueQuote>
                "Looking at the leaderboard this afternoon, I see that the commish is in dead last. Who wants a loser to be in charge of the league? Sad!"<br />- Donald J. Trump
            </LeagueQuote>
            <p>
                The crooked commissioner was quick to respond to these allegations.
            </p>
            <LeagueQuote>
                "Despite the negative press covfefe"<br />- Matthew T. Smith
            </LeagueQuote>
            <ArticleSubheader>Other Submissions</ArticleSubheader>
            <LeagueQuote>
                "cum"<br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                Not this again.
            </p>
            <LeagueQuote>
                "Anthony Richardson should be a hooping, not playing QB"<br />- God Shammgod
            </LeagueQuote>
            <p>
                True.
            </p>
        </div>
    )
}

const GiantsMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/93bbgg.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const SquirrelMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/93bbkj.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Jake</ArticleCaption>
        </ImageWrapper>
    )
}

const SurvivorMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/93bdus.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Pink Pony Kupp</ArticleCaption>
        </ImageWrapper>
    )
}

const TonyMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/93bf61.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const SmittyMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/93bfbo.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const ElmoMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/93bfnq.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const GregMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/93bgqg.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const CmcMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/93bfg7.jpg"}>
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
    // {
    //     id: 10,
    //     content: PowerRankingsArticle,
    // },
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
    // {
    //     id: 14,
    //     content: AlternateUniverseArticleThree,
    // },
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
        content: GiantsMeme,
    },
    {
        id: 18,
        content: SquirrelMeme,
    },
    {
        id: 19,
        content: SurvivorMeme,
    },
    {
        id: 20,
        content: TonyMeme,
    },
    {
        id: 21,
        content: SmittyMeme,
    },
    {
        id: 22,
        content: ElmoMeme,
    },
    {
        id: 23,
        content: GregMeme,
    },
    {
        id: 24,
        content: CmcMeme,
    },
    {
        id: 30,
        content: MotWRules,
    },
];
