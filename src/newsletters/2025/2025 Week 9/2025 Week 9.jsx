import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, DangerTable, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable, PlayoffTable, TradesLineChart, KyleRecordChart } from '../../../components/newsletters/newsStyles';
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
import tradeHistory from './tradeHistory.json';
import { leagueIds } from '../../../components/constants/LeagueConstants';
import TikTokEmbed from '../../../components/shared/TikTokEmbed';

export const newsDate = '2025-11-06';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 9</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 9 was another exciting iteration of the greatest fantasy football league in our friend group. Matchup of the Week had a new low of total points this week, with both teams scoring less than 100 points. Most MoTWs (I think) was the most mismanaged team, scoring the 9th fewest points of any team this season with just 85.66 points. The Barkley Brawlers defeated them and were the worst winner this week, and the 2nd worst winner of the season with only 93.6 points. This contrasts nicely with another matchup that took place between our best managed team WalterPickens and our best loser BBCU. They were the #2 and #3 of these awards this season, both putting up massive numbers. Sometimes the schedule just be like that.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                WalterPickens scored the most points, but left Brock Bowers on their bench with 43.3 points, leaving them with pretty poor efficiency on a 200+ point ceiling. Uncle Rico Went Pro was the 2nd highest scorer, and they were at 100% efficiency, making them our only perfect manager of the week. The worst manager was the MotW winner The Barkley Brawlers, at just 75.8% efficiency and scoring the 2nd fewest points of any team this week.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>MotW Experience Doesn't Help</ArticleSubheader>
            <p>
                Most MoTWs (I think) does have the most MotWs, but that experience did not lead them to have a good performance in this one. They finished with only 85.66 points, and were let down by their entire team. Their best player relative to expectation was probably their kicker putting up 12.7 points, which is pretty sad. Their team left them with a huge amount of shots, as only 3 players scored in double digits.
            </p>
            <p>
                The Barkley Brawlers followed up an amazing week with an awful one, scoring nearly 100 points fewer than they did last week. They were still able to get the win though and avoided a 5 shot/dog loss. DJ Moore carried this game for them, including a passing TD on his stat line.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                #1 seed Most MoTWs (I think) will be up against #2 seed Lord of the Littles in week 10. The Barkley Brawlers will be bringing MotW into the Hubbell Division, into a matchup with Uncle Rico Went Pro.
            </p>
            <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleCaption>
                <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
            </ArticleCaption>
            <p>
                The Barkley Brawlers earned their 5th MotW victory. Most MoTWs (I think) earned their 8th loss, and 2nd of this season. This moves them up to 2nd all time in hotdogs/shots consumed, but they still have a very low shot/dog per loss ratio at just 4.0 shots/dogs.
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
            <ArticleSubheader>Matts are Mid</ArticleSubheader>
            <p>
                First Down Syndrome was barely able to break 100 this week, which typically means you're losing your matchup. That was true here, as they just didn't have the RB production to get the job done this week. A combined 4 points from RBs is not a recipe for success.
            </p>
            <p>
                Singing Like Mariah Terry had a pretty solid week from most of his players considering the names of the players on their team. Getting 7.5 points from Chimere Dike was huge, and 11.7 from Theo Johnson was a great way to fill in their David Njoku and Mason Taylor bye weeks. This win was ugly but a win is a win.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                First Down Syndrome will be up against 3-6 Bye Week Curious in week 10. Singing Like Mariah Terry will be in a matchup with 5-4 BBCU, and will be without star QB Patrick Mahomes who is on bye.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Little Breaks Records, Still Off Squad</ArticleSubheader>
            <p>
                Costco Guys was another team that barely broke 100 and lost this week. Lamar Jackson and Marvin Harrison did everything they could, but Jahmyr Gibbs and Jake Ferguson had disappointing weeks which didn't help the cause.
            </p>
            <p>
                Lord of the Littles was able to get the win this week, despite sticking with Matt (Doinker) Prater rather than going back to Cam Little, who broke the NFL record for longest FG this week. That kick alone would've been 6.8 points in this league, more than double what Prater scored for them.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Costco Guys will be up against Glizzy Division rival Beats By Al in week 10. Lord of the Littles will be up against Most MoTWs (I think).
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>What's the Punishment?</ArticleSubheader>
            <p>
                Beats By Al put up 111.32, which would usually be enough to beat Bye Week Curious, but that was not the case this week. Javonte Williams was their only hope to flip the script, and he put up only 7.3 points and had a late fumble that cost them the game. Josh Allen tried to be the hero, but it wasn't enough.
            </p>
            <p>
                Bye Week Curious put up 114.18, their 3rd highest score of the season, performing when it mattered most. Drake London scored a huge portion of these points, with his 38.8 points accounting for 34% of this teams total points, the highest percentage of any player in any win this season. Ashton Jeanty and BAL DEF put in some good performances as well to seal the victory.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Beats By Al will be up against 4-5 Costco Guys in week 10. Bye Week Curious will play 4-5 First Down Syndrome.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Hubbell Matchup #1</ArticleSubheader>
            <p>
                BBCU put up another great week, but it didn't matter because of their opponents output. Almost all of their players played well, so there isn't much to say here besides "skill issue".
            </p>
            <p>
                WalterPickens put up the #2 score of the season this week, and were 1 start/sit decision away from #1. Brock Bowers could've been started over Bam Knight, but they wanted to see how Bowers looked in his first game back. That mistake will never be made again. Caleb (Lucain) Williams went nuts, including 2 receptions and a receiving TD on his way to 38.7 points.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                BBCU will be up against 4-5 Sining Like Mariah Terry in week 10. WalterPickens will be in their 2nd of 6 straight Hubbell Division matchups, this one against Super Ja'Marrio Bros. in week 10.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Hubbell Matchup #2 - The Curse is Real</ArticleSubheader>
            <p>
                Super Ja'Marrio Bros. put up the 4th most points of any team this week and lost, which means all 4 top spots this week belonged to the Hubbell Division, yet only 2 of the 4 teams could win. They had a well rounded performance aside from Brandon Aubrey who put up a rare stinker. We will have more data below on the extent of the Hubbell Curse which plagues Super Ja'Marrio Bros. every year.
            </p>
            <p>
                Uncle Rico Went Pro put up the 2nd highest score of the week, at 147.14 points, as predetermined by the Hubbell Curse. Their entire QB/RB/WR outfit went crazy, with the lowest scorer in that group at 14.2 points. Rico Dowdle led the team once again with 28.1 points.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Super Ja'Marrio Bros. will not be able to escape the curse in week 10 in their matchup with WalterPickens. Uncle Rico Went Pro will be up against The Barkley Brawlers in a key matchup for the playoff race.
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
                The Hubbell Division was high this week and everyone else was low.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                Another high high this week, and the median did trend upward from last week as well.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                This was our first week with 3 close games, thanks to many teams scoring in the 90-110 range.
            </p>
        </div >
    )
}

const TradingVolumeArticle = () => {
    return (
        <div>
            <ArticleHeader>Trading Volume</ArticleHeader>
            <TradesLineChart tradeHistory={tradeHistory} />
            <p>
                This season is on pace to have the lowest trading volume in recorded league history, with just 7 trades involving players through 9 weeks of action. Jake needs to get back on the horse and send out more offers.
            </p>
        </div>
    )
}

const KyleRecordArticle = () => {
    return (
        <div>
            <ArticleHeader>Kyle's All-Time Record</ArticleHeader>
            <KyleRecordChart />
            <p>
                Kyle has a 12-12 record against Hubbell Division members, but a much stronger 31-13 against everyone else. The Hubbell Curse is very real.
            </p>
        </div>
    )
}

const StandingsArticle = () => {
    return (
        <div>
            <ArticleHeader>Standings & Points</ArticleHeader>
            <ArticleSubheader>Current Standings</ArticleSubheader>
            <LeaderboardTable leaderboardData={leaderboardData} />
            <p>
                Most MoTWs (I think) continues to sit comfortably on top of the leaderboard despite their ugly loss in MotW. They were the only team who did not move around this week. Lord of the Littles jumped up to #2 this week before their matchup with the #1 seed. First Down Syndrome dropped out of the playoff hunt at 4-5, and all of those 4-5 teams are trying to claw their way up over them. Beats By Al takes over last place from Bye Week Curious after losing to them, but they still have the PF advantage and these teams face off again in week 13.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Beats By Al continues to be unlucky, but it is arguable if they are more unlucky than Bye Week Curious is bad. BBCU is unlucky and good, while Most MoTWs (I think) is lucky and good. Many teams are chilling in the middle, similar to the standings.
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
                BBCU reclaimed the number one spot in the rankings despite the loss this week, as they were the #3 scorer and are teh only team with more than 63 Play All Ws. This 72-27 record is very impressive, and Bye Week Curious' 28-71 record is just as impressive on the opposite end of the spectrum. The Barkley Brawlers dropped 4 spots to #11 after their ugly win, and Beats By Al moved up 1 spot despite the loss. Their schedule has been just as hard as playing BBCU every week.
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
                The top 4 from last week was pretty clear, but now the top 4 is a top 3 in terms of 90+% playoff odds. Most MoTWs (I think) is one win or last place loss away from being safe from last place. The sims still give Bye Week Curious the highest last place odds, largely due to their extremely low PF.
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
                Beats By Al would be in last in this universe as well, so maybe they should quit bitching about their schedule.
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
                There is so much motion on this one that it is hard to reckon with. WalterPickens would lead the league in PF, showing that they can't make the right start/sit decisions, just like this week with Brock Bowers.
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
                BBCU would be 9-0 with Costco Guys schedule, the last remaining undefeated scenario. Beats By Al is the hardest schedule for 9/12 teams. 2 teams would be worse off than Beats By Al if they had their schedule, Costco Guys and Singing Like Mariah Terry, who would both be 1-8 with Beats By Al's schedule. Bye Week Curious would be 1-8 with BBCU or WalterPickens schedule.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>Glizzy Division Saved From More Glizzies</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
            <p>
                Lord of the Littles dodged week 10 MotW, but they still have a chance to get it in week 13 this season if it gets stuck in the Avon Division. Alternatively it could get stuck in the Hubbell Division, which has already lost 4 MotWs this season collectively.
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
            <ArticleSubheader>Divisions Ruining MotW?</ArticleSubheader>
            <p>
                This offseason the league changed to have divisions as part of an effort to randomize the schedule. When changing to a random schedule, we needed some way to determine who each team would play twice since we have 11 opponents and 14 weeks. The divisions were born to solve this problem, but some managers think they caused more problems than they solved:
            </p>
            <LeagueQuote>
                "I think the divisions were a good idea to try, but are not the solution we are looking for. I don't like how I play the same teams so close back to back to back. Also, I feel like it traps the MOTW."<br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                The league is constantly changing every year, and is open to suggestions on how to improve this issue going forward. Any ideas can be submitted and discussed in the league Discord.
            </p>
            <ArticleSubheader>What is the Punishment?</ArticleSubheader>
            <p>
                Everyone here knows this is a punishment league, and we thought everyone was aware of what the punishment for the season was, especially if you're in contention for last place. That was proven false this week, during the battle of the leagues 2 worst teams.
            </p>
            <LeagueQuote>
                "What's the punishment this year"<br />- Devan
            </LeagueQuote>
            <LeagueQuote>
                "Album??"<br />- Devan
            </LeagueQuote>
            <p>
                Nobody did give him an answer to these questions, but it is pretty obvious if you've been following along at all.
            </p>
            <ArticleSubheader>League Submissions</ArticleSubheader>
            <ImageWrapper>
                <ArticleImage src={"https://i.imgur.com/Jhu4zly.png"}>
                </ArticleImage>
                <ArticleCaption>Submitted by Alec</ArticleCaption>
            </ImageWrapper>
            <p>
                Alec would've beaten Devan if he made this trade instead of Trevor trading with Devan, so maybe this trade was good after all.
            </p>
            <LeagueQuote>
                Alec's schedule is oh very hard.<br />
                No one has any regard.<br />
                But its not the competition,<br />
                Its just his player attrition.<br />
                His team is full of r-tards.<br />
                <br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                Chief Correspondent ChatGPT weighs in on another anonymous poem:
            </p>
            <p>
                This limerick uses dark humor to mock a fantasy league manager named Alec, suggesting his team's poor performance stems not from tough matchups but from his own poor player choices. The poem employs the classic limerick AABBA rhyme scheme but ends with an offensive slur that undermines what could have been playful trash talk, crossing into mean-spirited territory typical of competitive fantasy sports banter at its worst.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleSubheader>Everyone after Alec loses another fantasy match and decides to end it all</ArticleSubheader>
            <TikTokEmbed videoId="7285879731226955039" />
            <ArticleCaption>Submitted by Alec</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/eA1kt1X.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/MpuOoTe.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/Av7mkai.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/6ZAtRlm.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/p1XkWyy.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/wyopDNB.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/oikW3g0.png"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme9 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgur.com/2cEGc7C.png"}>
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
        content: TradingVolumeArticle,
    },
    {
        id: 10,
        content: KyleRecordArticle,
    },
    {
        id: 11,
        content: StandingsArticle,
    },
    {
        id: 12,
        content: PowerRankingsArticle,
    },
    {
        id: 13,
        content: PlayoffOutlookArticle,
    },
    {
        id: 14,
        content: AlternateUniverseArticleOne,
    },
    {
        id: 15,
        content: AlternateUniverseArticleTwo,
    },
    {
        id: 16,
        content: AlternateUniverseArticleThree,
    },
    {
        id: 17,
        content: MotWDangerArticle,
    },
    {
        id: 18,
        content: LeagueBuzzArticle,
    },
    // {
    //     id: 19,
    //     content: VideoMeme,
    // },
    {
        id: 19,
        content: Meme1,
    },
    {
        id: 20,
        content: Meme2,
    },
    {
        id: 21,
        content: Meme3,
    },
    {
        id: 22,
        content: Meme4,
    },
    {
        id: 23,
        content: Meme5,
    },
    {
        id: 24,
        content: Meme6,
    },
    {
        id: 25,
        content: Meme7,
    },
    {
        id: 26,
        content: Meme8,
    },
    {
        id: 27,
        content: Meme9,
    },
    {
        id: 30,
        content: MotWRules,
    },
];

const newsletterData = {
    newsDate: newsDate,
    articles: articles,
    meta: {
        title: "2025 Week 9",
        description: "Testing this feature out to see if it works",
        image: "/banner_logo.png"
    }
};

export default newsletterData;
