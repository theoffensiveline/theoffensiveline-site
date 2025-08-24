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


export const newsDate = '2024-11-28';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 12</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                There are a few awards here worth discussing from week 12. We have to start with Saquon Barkley, who scored 46.2 points, the most of any RB this season. Saquon accounted for nearly 36% of the points for Youngster Joey this week, the 2nd best MVP performance this season. Youngster Joey left nearly 30 points on their bench, so that helped this MVP performance have a high percentage.
            </p>
            <p>
                We also had a really close game this week, our second closest of the season in fact. Just Joshin pt. 2 beat First Down Syndrome by just 1.2 points, and earned Worst Winner in the process. This was the 7th worst winner of the season, only scoring 108.46 points this week. Meanwhile our Best Loser was Calvin's Cold Streak who scored 123.96 points this week.
            </p>
            <p>
                This far into the season, it is rare to get a new top 5 performance at a position, and this week we had 4 of those! Saquon was the RB1 like we discussed, Trey McBride was the 4th best TE performance, Wil Lutz was the 3rd best kicker performance, and SEA D was the 4th best DEF performance.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                We had our second week with 2 perfect managers, but their stories were very different this week. Pink Pony Kupp had 100% efficiency on their way to the #1 score in the league this week. If you count points left on the waiver wire, this team was not 100% efficient since they dropped Noah Gray for Isaiah Likely, which was a 20+ point difference. Kirk Thuggins & The Boys was the other perfect manager this week, but they only achieved the 7th most points and almost their entire bench was on bye. This isn't necessarily efficient management, but they were able to win their matchup on their big bye week, so you can't call it bad management either.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Hubbell Curse Remains</ArticleSubheader>
            <p>
                Youngster Joey was able to win their 3rd straight MotW this week, tying the streak from League Camera Prophecy that they ended. Their star in this matchup was Saquon Barkley, and SEA defense punched in another 20 points to help out. The rest of their team was not great, but it was enough to easily take down their opponent thanks in part to the Hubbell curse (and week 12 byes).
            </p>
            <p>
                Twin Bowers lost their first MotW appearance this season, and was unable to break the Hubbell curse. Their team scored less than 100 points, but they only came away with 5 shots/dogs thanks to Rachaad White and DEN D barely getting double digits. A.J. Brown was the only player on this team who did well this week, and they missed Chase Brown and Garrett Wilson sorely during their bye weeks this week.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Youngster Joey will bring MotW to Just a Hospital Ward, who will be looking to avoid another 6 shot/dog performance like they had in week 8. They are also looking to avoid last place, so this team will be hungry for a victory. Twin Bowers will play against Kirk Thuggins & The Boys in week 13, as both teams are searching for a playoff spot.
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
            <ArticleSubheader>Ladd Saves The Day</ArticleSubheader>
            <p>
                Going into Monday Night, First Down Syndrome had a 13.1 point lead over Just Joshin pt. 2 with just Ladd McConkey to play for Just Joshin pt. 2 on MNF. This lead was safe until the final drive for the Chargers, and Ladd McConkey made a 5 yard catch with 1:38 left in the game to seal this matchup for Just Joshin pt. 2 this week. They were able to be in this position thanks to big games from DJ Moore and Aaron Jones, who each scored TDs.
            </p>
            <p>
                First Down Syndrome had big games from Kittle and Pollard, but Saquon stealing the show for the Eagles meant Hurts only put up 15 points this week. Other players were disappointing as well, including Tyreek Hill who was greatly outscored by his teammate Jaylen Waddle. First Down Syndrome left Pittman and Odunze on the bench, either of which would've been enough to win if they played instead of Lockett.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Just Joshin pt. 2 will matchup with League Camera Prophecy in week 13, and First Down Syndrome gets matched up with Fortnite Master Builder.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Let's Make Everyone 5-7</ArticleSubheader>
            <p>
                This could've been a great MotW if the prophecy was fulfilled, but instead it was just a normal matchup between 2 teams trying to avoid last place. Fortnite Master Builder worked his way up the standings by securing this victory in dominant fashion. This was the 2nd highest score Fortnite Master Builder has scored this season, thanks to a bunch of players popping off. The Nix/Sutton/Lutz stack did well, as did Achane and Schoonmaker was able to fill in nicely too.
            </p>
            <p>
                League Camera Prophecy put up an okay game, scoring the 6th most points of any team this week, but that was not enough to win this one. Joe Mixon had an uncharacteristically bad game this week while a lot of other players on this team actually did well. Terry McLaurin had a good game, Jonnu Smith had an awesome game, and CeeDee Lamb did well given the circumstances. This team was let down by the RBs and DEF.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Fortnite Master Builder will matchup with First Down Syndrome in week 13, and League Camera Prophecy gets matched up with Just Joshin pt. 2.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Trade Wasn't Worth It</ArticleSubheader>
            <p>
                Just a Hospital Ward traded a lot of their week 12 bye players away in hopes of winning this matchup specifically to try to avoid last place. The trade definitely helped them put up points they otherwise wouldn't have, but Rhamondre Stevenson was extremely disappointing as was David Njoku. Jayden Daniels and Puka Nacua killed it this week, and Ameer Abdullah was a surprising hit, but the rest of their team was a let down.
            </p>
            <p>
                Kirk Thuggins & The Boys were able to squeak out a win this week, thanks in part to Keenan Allen having a great game, and MIA D putting up 12 points. CMC and JT were disappointing, and Kamara was on bye, so this team was able to win a game in which their 3 best players did poorly, unless you prefer Brandon Aubrey to CMC, which some might at this point.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Just a Hospital Ward gets brought into MotW against Youngster Joey in week 13, and Kirk Thuggins & The Boys will play against Twin Bowers.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Panthers RBs Couldn't Get It Done</ArticleSubheader>
            <p>
                Costo Guys was on the other side of the trade with Just a Hospital Ward, so they dealt with a couple of bye weeks this week. This caused them to have to start Jonathan Brooks at RB in his first game back from injury, alongside his teammate Chuba Hubbard. These 2 are no Sonic and Knuckles, so they weren't able to combine for much. This team at full strength is still scary, and they only have one more bye week to deal with when Lamar goes on bye in week 14.
            </p>
            <p>
                Giving Me a Chubb was able to win this one handily, thanks to big games from Patrick Mahomes, Trey McBride, and Jakobi Meyers. Each of these guys had at least 20 points, and almost everyone else put up 9 or more points. The only true disappointment for them this week was their defense.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Costo Guys will matchup with Calvin's Cold Streak in week 13, and Giving Me a Chubb will play against Pink Pony Kupp.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Tua Had The Right Kind of Boom</ArticleSubheader>
            <p>
                Pink Pony Kupp had Tua Tagovailoa fill in for Joe Burrow on bye this week, and he came through in a massive way against the Patriots defense. He had 4 TDs and put up nearly 30 fantasy points. They also got big games from Bucky Irving, Sonic and Knuckles, Cooper Kupp, and HOU DEF. Bye week fill in Isaiah Likely put up a goose egg, while Noah Gray went off on the waiver wire.
            </p>
            <p>
                Calvin's Cold Streak put up a strong fight, scoring the 5th most points of any team this week. Josh Jacobs and Jordan Addison had big games, but the 0 from Christian Watson and a bad game from Najee Harris were tough to overcome.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Pink Pony Kupp will face off with Giving Me a Chubb in week 13, and Calvin's Cold Streak will play against Costo Guys.
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
                Pretty average week here, not much to write home about.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                This week was one of the more consolidated weeks of the season, with a bunch of teams clustered near the median.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                Kirk Thuggins & The Boys got their 3rd close victory of the season this week, and Just a Hospital Ward had their 3rd close defeat. Just Joshin pt. 2 moves to 2-2 in close games, and First Down Syndrome falls to 3-2.
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
                Pink Pony Kupp has grabbed the top spot all to themselves, as they are the only team at 8-4 this season. We have 3 7-5 teams, led by Costo Guys, and 3 6-6 teams, led by Giving Me a Chubb. There are 5 teams tied for last, with 2 teams at the bottom within 0.12 points for of each other. This race will be exciting to watch down the stretch of the season.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Costo Guys continue to reside in the lucky and good part of this chart, and Pink Pony Kupp separated from the pack a little bit this week. First Down Syndrome and Just a Hospital Ward are far into the bad section of the chart. Everyone else is pretty clustered in the middle, with Twin Bowers still leading in terms of unluckiness.
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
                Costo Guys remains at the top of the power rankings, with Pink Pony Kupp close behind. Youngster Joey moved up to 3rd this week on the back of Saquon, matching their location in the standings. Twin Bowers fell 3 spots down to 9th after their 12th place performance this week. Just a Hospital Ward and First Down Syndrome are carrying up the rear, just like in the standings.
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
                Pink Pony Kupp has been deemed safe from last place, since the worst they could finish is 8-6, and there are already teams with 7 losses. All of these are before tiebreakers, so teams with 7 wins are very likely safe as well since they've got a massive PF advantage over the bottom 2 teams as it stands currently. The race for last place is still wide open, as anyone from 5th to 12th is realistically in contention. The simulations are giving teams with 7 losses a cumulative 99.9% of the chance to get last, but there is a small chance one of the 6-6 teams could fall all the way down.
            </p>
            <p>
                No team has secured a playoff spot, but since a few 6-6 teams play each other in week 14, I think Pink Pony Kupp is technically guaranteed one at this point. These numbers do not account for future matchups, so take that as you may. WalterPicks is giving Calvin's Cold Streak and Twin Bowers much better playoff odds than the simulations based on historical data only, so that is interesting to note. Giving Me a Chubb and League Camera Prophecy are getting dinged by WalterPicks, presumably due to upcoming bye weeks in week 14.
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
                Not much is different aside from League Camera Prophecy being 3 spots higher, and Fortnite Master Builder being 3 spots lower.
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
                Just a Hospital Ward only has themselves to blame if they lose the league this year, as they'd be in 2nd if they managed their team perfectly every week. They would still be close to the bottom in PF, but have lost a massive number of winnable matchups.
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
                We still have a winless possibility after 12 weeks, First Down Syndrome would be 0-12 with Twin Bowers schedule. Costo Guys would be 10-2 with League Camera Prohpecy's schedule. Just Joshin pt. 2 would be 10-2 with Costo Guys' schedule. Pink Pony Kupp has the best "worst possible record" at 6-6 with Twin Bowers schedule.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>4 Teams Still Left</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
            <p>
                There is an outcome here where Twin Bowers is right back in MotW 2 times in 3 weeks, both against former Hubbell residents. Will the curse continue, or will the group chat continue to be cursed by shitty "compliments"?
            </p>
            <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
            <ArticleImage src={motwFuture} />
            <ArticleCaption>This will get fixed eventually to be less shitty and not an image.</ArticleCaption>
        </div>
    )
}

// const TradingVolumeArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Trading Volume</ArticleHeader>
//             <TradesLineChart tradeHistory={tradeHistory} />
//             <p>
//                 This season had the highest trading volume in recorded history, even if you remove all of the FAAB for FAAB meme trades. The trade analysis at the end of the season will be epic.
//             </p>
//         </div>
//     )
// }

const LeagueBuzzArticle = () => {
    return (
        <div>
            <ArticleHeader>League Buzz</ArticleHeader>
            <ArticleSubheader>Commissioner Might Not Be Fit For Office</ArticleSubheader>
            <LeagueQuote>
                "So who are the Costco guys"<br />- Commissioner Matthew Smith
            </LeagueQuote>
            <p>
                This quote shows how out of touch the commissioner is, and that he is aging rapidly.
            </p>
            <LeagueQuote>
                "I'm sorry you don't have the mental ability that Anthony has...go back to 6th grade English Matt Smith"<br />- Alec
            </LeagueQuote>
            <p>
                This decline in mental aptitude is similar to that of the president and president-elect, which many are claiming to be unfit for office. This league should be held to similar, or arguably higher standards than that of the US Government, and the commissioner should have to release his health records, tax forms, and take an IQ test in order to prove that he is fit for re-appointment next season.
            </p>
            <ArticleSubheader>Anthony Compliments Get Worse</ArticleSubheader>
            <LeagueQuote>
                "Anthony 100% Minecraft Dungeons"<br />- Alec
            </LeagueQuote>
            <p>
                This isn't true, and isn't even a compliment. Many people would say that this is an insult.
            </p>
            <LeagueQuote>
                "Anthony makes an adequate bowl of pasta"<br />- Alec
            </LeagueQuote>
            <p>
                Is adequate really a compliment? Other managers pointed out that this likely isn't true either, depending on who is consuming the pasta.
            </p>
            <ArticleSubheader>Nikhil Put Out A MotW Video</ArticleSubheader>
            <p>
                This is a newsworthy event, but this isn't even the video we've been waiting on for weeks now. This is a video from a more recent loss in MotW that Nikhil suffered. This is a first in league history where a video has been put out by a manager who is actively working on a prior video.
            </p>
            <ArticleSubheader>Schedule Too Hard?</ArticleSubheader>
            <LeagueQuote>
                "Fantasy football has literally made me hate football"<br />- Kyle
            </LeagueQuote>
            <p>
                Someone is mad because their schedule has been the hardest in the league. Maybe the Giants are also contributing to this problem as well. Losing to a 40-bomb from Saquon is tough for a Giants fan.
            </p>
            <LeagueQuote>
                "Dear Mr. Barkley,
                <br />
                <br />Thanks.
                <br />
                <br />Kind Regards,
                <br />Anthony"<br />
            </LeagueQuote>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9bwf8w.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9bwfbm.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9bwe9k.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Anthony</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9bwekw.gif"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Alec</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9bweu4.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Josh K</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9bwffs.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Trevor</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9bwflu.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9bwfyr.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

// const Meme9 = () => {
//     return (
//         <ImageWrapper>
//             <ArticleImage src={"https://i.imgflip.com/9aooxz.jpg"}>
//             </ArticleImage>
//             <ArticleCaption>Submitted by Anthony</ArticleCaption>
//         </ImageWrapper>
//     )
// }

// const Meme10 = () => {
//     return (
//         <ImageWrapper>
//             <ArticleImage src={"https://i.imgflip.com/9b9zah.jpg"}>
//             </ArticleImage>
//             <ArticleCaption>Submitted by Greg</ArticleCaption>
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
    // {
    //     id: 16,
    //     content: TradingVolumeArticle,
    // },
    {
        id: 17,
        content: LeagueBuzzArticle,
    },
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
    // {
    //     id: 26,
    //     content: Meme9,
    // },
    // {
    //     id: 27,
    //     content: Meme10,
    // },
    {
        id: 30,
        content: MotWRules,
    },
];
