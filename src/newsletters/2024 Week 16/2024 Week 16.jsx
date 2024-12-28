import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, ArticleCaption, LeagueQuote, AwardsGridV2, WeeklyScoringChart, WeeklyMarginTable } from '../../components/newsStyles';
import awardsData from './awardsTable.json';
// import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
// import medianLbData from './medianLb.json';
// import motwHistoryData from './motwTable.json';
// import playoffData from './playoffTable.json';
// import powerRankingsData from './powerRankings.json';
// import scheduleData from './scheduleData.json';
// import shotsDistData from './shotsDist.json';
import starterData from './starters.json';

export const newsDate = '2024-12-26';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 16</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 16 saw all 12 teams in action for the final time this season, and was very consequential for the championship race as well as the new toilet bowl punishment. 3 of the top 4 scoring teams this week were in the toilet bowl, with Fortnite Master Builder leading the pack scoring 166.14 points, the 6th most of any team this season. They defeated our Best Loser Kirk Thuggins & The Boys, who scored 141.32 points, the 2nd most points of any losing team this season. Kirk Thuggins & The Boys were led by the #3 RB performance of the season and the #4 K performance of the season, and Fortnite Master Builder had the #11 WR performance of the season.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                Costo Guys was the most efficient manager this week, only leaving 1 point on their bench. Pink Pony Kupp left the most points on their bench, but did not have the lowest percentage this week. Pink Pony Kupp left 36.7 points on their bench, at 78.8% efficiency. Njorkin da Tenis had an even lower 76.6% efficiency, but with a lower point total.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Playoff Semi-Final #1</ArticleHeader>
            <ArticleSubheader>#1 Seed Falls After Bye</ArticleSubheader>
            <p>
                Costo Guys was able to score nearly 150 points this week, with their 2 RBs combining for over 60 points. Lamar Jackson also poured in 20+ points, and all their WRs scored 13+ points. This team didn't get too much out of their TE, K, or DEF, but they got enough points to win this all-important matchup against the #1 seed.
            </p>
            <p>
                Just Joshin pt. 2 was let down by their QB and namesake Josh Allen this week, who scored over 40 points last week while this team was on bye, and only scored 11.16 points this week. Bijan Robinson and James Conner did their fair share, each scoring over 24 points. CIN D was the next highest scorer, putting up 19 points this week. This team was also let down by their kicker and TE, who combined for less than their opposing players on the winning team. This team will not be headed to back-to-back finals appearances.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Costo Guys advances to the championship against Pink Pony Kupp, and Just Joshin pt. 2 will be headed to the third place game against Calvin's Cold Streak.
            </p>
            {/* <ArticleSubheader>Matchup of the Week 2023-24</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
            <ShotsDistributionChart chartData={shotsDistData} /> */}
        </div>
    )
}

const MatchupArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Playoff Semi-Final #2</ArticleHeader>
            <ArticleSubheader>Some Duds on Both Sides</ArticleSubheader>
            <p>
                Calvin's Cold Streak was hoping to bounce back after a loss in the semi-finals last season, but couldn't break the streak and suffered their 2nd straight loss in the semis, this time at the hands of Pink Pony Kupp. Najee Harris put up a stinker this week, as did TB DEF and Travis Kelce. The rest of their players did about as well as or better than expected, but getting 4.2 points from your RB2 makes it tough to win in the playoffs.
            </p>
            <p>
                Pink Pony Kupp got carried by the Falcons DEF who scored 2 TDs in their matchup with the Giants this week. They had been stashed on their bench for a while in anticipation for the playoffs, so the -1 bench spot paid off for them. This team had 4 guys disappoint this week, including 2 Jaguars players that should not have been trusted this late in the season with Mac Jones at QB. The other players who actually helped get this win were Joe Burrow, Jahmyr Gibbs, Bucky Irving, and the good Jaguar Brian Thomas.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Pink Pony Kupp advances to the championship against Costo Guys, while Calvin's Cold Streak will be headed to the third place game against Just Joshin pt. 2.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>5th Place Game</ArticleHeader>
            <ArticleSubheader>Two Terrible Teams Try To Take (Ten / Two)th</ArticleSubheader>
            <p>
                Giving Me a Chubb only scored 92.56 points in the quarter-finals last week, so they at least improved their score in their second playoff game. There are a lot of players bunched up at the bottom of their bar in the chart who scored 6.1 points or less. These players are not worth discussing besides Trey McBride, who had his worst game of the season this week. Their top 4 players put up decent numbers, but it wasn't enough to get the win in this 5th place game nobody will remember.
            </p>
            <p>
                Youngster Joey redeemed themselves this week after scoring less than 80 points last week in their first playoff game, but it is too little too late as this game only got them 5th place. Saquon was the MVP this week, but that mostly was because this team didn't put up a ton of points. Kyler and Jake Elliott were the 2nd and 3rd highest scorers this week for this team, and both their WRs scored less than 8 points. They were able to get the W in this game despite all of that.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                These 2 teams will watch the final week from the sidelines, waiting for the toilet bowl single to drop.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Toilet Bowl Semi-Final #1</ArticleHeader>
            <ArticleSubheader>Njorkin da Tenis Gets Flushed Further</ArticleSubheader>
            <p>
                League Loser Prophecy was able to eliminate themselves from potentially having to write a song, something that it seemed like they were really looking forward to doing. Don't be surprised to see them featured and/or credited on the toilet bowl song that does eventually drop. This team had a well rounded performance this week to earn the win, with only IND D and Joe Mixon scoring less than 10 points. This team would've beaten 3 out of the 4 teams that competed in the playoffs this week, for what it is worth.
            </p>
            <p>
                Njorkin da Tenis had a big game from Jayden Daniels, but couldn't get enough points together outside of that to avoid the toilet bowl loss. Patrick Taylor and Quentin Johnston in the starting lineup is a great showcase of why this team ended up making the toilet bowl finals. This team has suffered through so many injuries this season, and might end up dropping a single because of it.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                League Loser Prophecy will play in the 10th place game against Twin Bowers, while Njorkin da Tenis will be headed to the toilet bowl final against First Down Syndrome.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Toilet Bowl Semi-Final #2</ArticleHeader>
            <ArticleSubheader>Battle Between Bad Bottom-Dwelling Bowl Boys</ArticleSubheader>
            <p>
                First Down Syndrome will be advancing to the Toilet Bowl Final after a sad showing this week against Twin Bowers. Their top scorer was Jameson Williams who scored 26 points. Their next highest scorer was their kicker Jason Sanders who scored 23.7 points. They had 5 other players who barely combined to outscore their kicker, with Hurts, Pacheco, Pollard, Pittman, and PIT combining for 23.94 points. Now if Jalen Hurts didn't get hurt they probably win this game, but sometimes that is the way the cookie crumbles.
            </p>
            <p>
                Twin Bowers was able to edge this one out thanks to the Hurts injury, which also caused Kenny Pickett to give A.J. Brown a 60% target share in this game. That helped Brown be the top scorer for this team, followed closely by namesake Brock Bowers who put up over 20 points for the 4th time this season. They didn't have any massive duds this week which helped them pull out the W and avoid the new toilet bowl punishment.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                First Down Syndrome will advance to the toilet bowl final against Njorkin da Tenis, while Twin Bowers will be headed to the 10th place game against League Loser Prophecy.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>8th Place Game</ArticleHeader>
            <ArticleSubheader>Huge Numbers In The Most Meaningless Game</ArticleSubheader>
            <p>
                Fortnite Master Builder and Kirk Thuggins & The Boys combined for the 2nd most points in any matchup this season in this game with 307.46 total points. Fortnite Master Builder led the way with 166.14 points, and Justin Jefferson led them with 36.4 points to his name. They only had their defense score less than 10 points, and had Devon Achane score over 30 as well. This team had some big spike weeks this season, but those aren't helpful if you can't make the playoffs.
            </p>
            <p>
                Kirk Thuggins & The Boys also scored a ton of points this week, with Jonathan Taylor, Keenan Allen, and Brandon Aubrey leading the way for them. Jamaal Williams, Jerry Jeudy, and Pat Freiermuth all scored less than 5, so their performance just wasn't well rounded enough to beat Fortnite Master Builder.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Both of these teams will watch from the sidelines as the season concludes in week 17.
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
                A top-6 score was the highlight of the week.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                The league got a little more clustered with everyone returning to action this week, with a higher median and average than most weeks this season.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                There weren't any close games this week for the first time since week 3. One game barely missed the cut since it was decided by 10.04 points.
            </p>
        </div >
    )
}

// const StandingsArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Standings & Points</ArticleHeader>
//             <ArticleSubheader>Current Standings</ArticleSubheader>
//             <LeaderboardTable leaderboardData={leaderboardData} />
//             <p>
//                 Just Joshin pt. 2 took the #1 seed from Pink Pony Kupp this week, but both teams still have the round 1 playoff bye. Calvin's Cold Streak jumped up to claim the 3 seed to earn the right to play Youngster Joey in the first round. Costo Guys fell to the 4th seed, and will play against 5 seed Giving Me a Chubb in round 1 of the playoffs.
//             </p>
//             <ArticleSubheader>PF Vs. PA</ArticleSubheader>
//             <PfPaScatter leaderboardData={leaderboardData} />
//             <p>
//                 Costo Guys threw the massive PF lead they had all season, being overtaken by Just Joshin pt. 2 this week. Pink Pony Kupp is a close 3rd in PF. Giving Me a Chubb took over the PA lead from Twin Bowers this week, and League Loser Prophecy nearly closed the gap as well. Njorkin da Tenis and First Down Syndrome are still clearly behind in PF, but they scored those points when it mattered most.
//             </p>
//         </div>
//     )
// }

// const PowerRankingsArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Power Rankings</ArticleHeader>
//             <ArticleSubheader>Current Power Rankings</ArticleSubheader>
//             <PowerRankingsTable powerRankingsData={powerRankingsData} />
//             <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 0 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 0 would mean that you played the worst team every week.</ArticleCaption>
//             <p>
//                 Just Joshin pt. 2 reclaimed the top spot in the power rankings. Interestingly, League Loser Prophecy moved up to 4th, despite being last in the league. They have a positive record against all teams this season, something only 6 teams can say. 5 of those 6 teams are in the playoffs, and League Loser Prophecy is in last instead.
//             </p>
//         </div>
//     )
// }

// const PlayoffOutlookArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Playoff / Last Place Outlook</ArticleHeader>
//             <ArticleSubheader>Magic Numbers and Simulations</ArticleSubheader>
//             <PlayoffTable playoffData={playoffData} />
//             <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation. We are now also sourcing playoff odds from  WalterPicks! These are based on future projections, rather than historical data.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
//             </ArticleCaption>
//             <p>
//                 This table looks so much different than last week, when 8 teams were truly in contention for last place. This became a two team race overnight, because the losing team will have 5 wins and 9 losses, and only 2 teams can achieve that feat since they play each other this week. PF are out the window, and it all comes down to one week. The simulations give League Loser Prophecy the advantage, but they don't know how many bye weeks he is dealing with this week. WalterPicks doesn't have last place odds, but if they did they'd probably be close to the reverse of these simulations.
//             </p>
//             <p>
//                 The playoff picture is slightly more clear than it was last week. All playoff teams will have at least 7 wins. The two teams with 8 wins are in, the teams with 7 wins can control their own destiny this week, and the teams with 6 wins need to win and need some luck on their side. The winner of the matchup between Giving Me a Chubb and Calvin's Cold Streak will automatically make the playoffs, so that leaves 3 spots up for grabs. Costo Guys has a sizeable PF advantage, so even if they lost it is extremely unlikely they will miss the playoffs. That leaves only 2 spots for Youngster Joey, the loser of Giving Me a Chubb and Calvin's Cold Streak, Fortnite Master Builder, Twin Bowers, and Kirk Thuggins & The Boys. Njorkin da Tenis is able to get a 7th win, but without scoring like 300 points they will not win the tiebreaker over any team with 7 wins already, so they are essentially eliminated in the same way Costo Guys is essentially clinched. Matchups to watch for the playoff race include:
//             </p>
//             <p>
//                 <ul>
//                     <li>MOTW: Njorkin da Tenis (6-7) vs. Twin Bowers (6-7)</li>
//                     <li>Kirk Thuggins & The Boys (6-7) vs. Youngster Joey (7-6)</li>
//                     <li>Giving Me a Chubb (7-6) vs. Calvin's Cold Streak (7-6)</li>
//                     <li>Just Joshin pt. 2 (8-5) vs. Fortnite Master Builder (6-7)</li>
//                 </ul>
//             </p>
//         </div>
//     )
// }

// const AlternateUniverseArticleOne = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #1</ArticleHeader>
//             <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
//             <AltLeaderboardTable data={medianLbData} />
//             <ArticleCaption>If everyone played their matchup each week, and also played against the median, this is what the leaderboard would look like.</ArticleCaption>
//             <p>
//                 League Loser Prophecy would've finished 7th in this universe, and Njorkin da Tenis would've ended up doing the last place punishment. Remember this one for the meme section.
//             </p>
//         </div>
//     )
// }

// const AlternateUniverseArticleTwo = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #2</ArticleHeader>
//             <ArticleSubheader>Best Ball Standings</ArticleSubheader>
//             <AltLeaderboardTable data={bestBallLbData} />
//             <ArticleCaption>If everyone played their best lineup every week, this is what the standings would look like. All columns include hypothetical totals.</ArticleCaption>
//             <p>
//                 First Down Syndrome would've been in last place in this scenario, only winning 4 games.
//             </p>
//         </div>
//     )
// }

// const AlternateUniverseArticleThree = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #3</ArticleHeader>
//             <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
//             <ScheduleTable data={scheduleData} />
//             <p>
//                 League Loser Prophecy could've been 10-4 (#1 seed) with 2 different schedules, and their worst possible record is only 1 more loss than they ended up with. League Loser Prophecy would've made the playoffs with 7 other managers schedules, and there are only 2 schedules where they get last place.
//             </p>
//             <p>
//                 First Down Syndrome would've be 1-13 with Twin Bowers schedule, only winning their first game this past week. There are 3 teams who could've outright lost to League Loser Syndrome had they had different schedules: First Down Syndrome, Kirk Thuggins & The Boys, and Njorkin da Tenis. Count yourself lucky if you're one of those teams. Njorkin da Tenis would've been 3-11 with the infamous schedule of League Loser Prophecy.
//             </p>
//         </div>
//     )
// }

// const MotWDangerArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>MotW Possibilities</ArticleHeader>
//             <ArticleSubheader>4 Teams Still Left</ArticleSubheader>
//             <DangerTable data={dangerTable} />
//             <ArticleCaption>MotW Danger Metric</ArticleCaption>
//             <p>
//                 There is an outcome here where Twin Bowers is right back in MotW 2 times in 3 weeks, both against former Hubbell residents. Will the curse continue, or will the group chat continue to be cursed by shitty "compliments"?
//             </p>
//             <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
//             <ArticleImage src={motwFuture} />
//             <ArticleCaption>This will get fixed eventually to be less shitty and not an image.</ArticleCaption>
//         </div>
//     )
// }

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
            <ArticleSubheader>Toilet Bowl Punishment</ArticleSubheader>
            <LeagueQuote>
                "The four members of the toilet bowl have made a unanimous decision to impose a penalty on the loser. The loser will be required to record and release a single"<br />- Josh Kraines
            </LeagueQuote>
            <p>
                If any CEOs are reading this, this is evidence that the best work gets done in person. The four losers and Nikhil met up over brunch this past Saturday, and this idea was the result of that brunch. How much Nikhil was involved in swaying this decision remains unclear to the media at this time, but this punishment league had a severe lack of toilet bowl punishment, so it is great that a unanimous conclusion was reached among the four losers. This sets a solid precedent going forward for future toilet bowl participants.
            </p>
            <ArticleSubheader>League Members Rob The Strip</ArticleSubheader>
            <LeagueQuote>
                "Tab for 10 at the strip: 120...It's a magical place"<br />- Josh Kraines
            </LeagueQuote>
            <p>
                A few league managers were at the strip this weekend, and despite their best efforts they were only charged $120 at the end of the night. This does not include the money that Alec lost to Matt playing Yahtzee, or the money spent on Dragon Ascent, pool, or darts, but the drink tab should've definitely been higher than $120. Matt also gave out some shots to the group when he pretended to remember us from 2-3 years ago, which was a nice gesture.
            </p>
            <ArticleSubheader>Planning The Next League Meeting</ArticleSubheader>
            <p>
                Nikhil had so much fun in Rochester last weekend that he already started planning for 4th of July 2025. It looks like we might have trouble finding a big enough place if we wait much longer, so everyone be sure to let him know soon if you're planning on attending or not. We should also plan in advance if we want to do something during that time to decide the draft order, as well as vote on any rule changes, punishments, etc. during that time to save ourselves the headache come Labor Day Weekend.
            </p>
            <ArticleHeader>Fortnite Livestream</ArticleHeader>
            <ArticleSubheader>Livestream Schedule Announcement From Alec</ArticleSubheader>
            <p>
                On Sunday, December 29, 2024, at 8:00 PM EST, I'll be going live on Twitch to play Fortnite for 24 straight hours. While this started as a punishment, I'm turning it into a night (and day) of fun, packed with special guests, activities, and plenty of surprises.
            </p>
            <p>
                I'm inviting everyone to join in, whether you want to cheer me on, challenge me in the game, or just witness the joy of Fortnite. This might be a punishment, but I'm determined to make it a great time for everyone watching.
            </p>
            <p>
                Event Details:
                <ul>
                    <li>When: Sunday, December 29, 2024, at 8:00 PM EST to Monday, December 30, 2024, at 8:00 PM EST</li>
                    <li>Where: link to be sent Sunday prior to the event</li>
                    <li>What to Expect: 24 hours of Fortnite gameplay, guest appearances, and interactive activities for viewers.</li>
                </ul>
            </p>
            <ImageWrapper>
                <ArticleImage src={"https://i.imgflip.com/9f0yca.jpg"}>
                </ArticleImage>
                <ArticleCaption>Submitted by Alec Maxwell</ArticleCaption>
            </ImageWrapper>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exvw6.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exwaf.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exwez.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exwia.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exwmh.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exwqz.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exwu1.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exwxg.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme9 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exx76.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme10 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/9exxfw.jpg"}>
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
    // {
    //     id: 9,
    //     content: StandingsArticle,
    // },
    // {
    //     id: 10,
    //     content: PowerRankingsArticle,
    // },
    // {
    //     id: 11,
    //     content: PlayoffOutlookArticle,
    // },
    // {
    //     id: 12,
    //     content: AlternateUniverseArticleOne,
    // },
    // {
    //     id: 13,
    //     content: AlternateUniverseArticleTwo,
    // },
    // {
    //     id: 14,
    //     content: AlternateUniverseArticleThree,
    // },
    // {
    //     id: 15,
    //     content: MotWDangerArticle,
    // },
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
    {
        id: 26,
        content: Meme9,
    },
    {
        id: 27,
        content: Meme10,
    },
    {
        id: 30,
        content: MotWRules,
    },
];
