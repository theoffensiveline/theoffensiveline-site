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

export const newsDate = '2024-10-24';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 7</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 7 had a wide range of outcomes, including the 3rd highest score of the season and the 3rd lowest score. MOTW Prophecy Believer put up the 3rd highest score of the season on their way to victory in MOTW, which was also the biggest blowout of the week. Despite the blowout, Pink Pony Kupp put up a decent fight as they were awarded Best Loser this week. The 3rd lowest score of the season came from First Down Syndrome, who now has the 1st and 3rd lowest scores to their name, and is sitting in last place.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                Twin Bowers had the lowest percentage this week, at 77.2% of their maximum. Rachaad White was the Bench MVP this week, scoring 29.1 points. If they started White over Zach Charbonnet, they would've been the 2nd highest scorer of the week and won their matchup against Costo Guys. Costo Guys was out most efficient manager this week, scoring 99.3% of their maximum. This was a pretty inefficient week league-wide outside of Costo Guys, with many of the top teams leaving points on the bench.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>The Prophecy Can't Be Broken</ArticleSubheader>
            <p>
                Anyone who reads this publication on a weekly basis was aware that Poor Management has the opportunity to be back in MotW in week 9, and that the only way for that to happen was for MOTW Prophecy Believer to win. Of course, they were the top scoring team this week, leaving no doubt that the prophecy must be fulfilled. Baker Mayfield, Javonte Williams, and Joe Mixon all scored above 26 points, and Dicker the Kicker and Rams DEF chipped in much more than projected as well.
            </p>
            <p>
                Pink Pony Kupp got good games from Jahmyr Gibbs and Austin Seibert this week, but nobody else really stepped up to give them a chance to win. Tank Dell put up a big fat 0, and David Montgomery, KC DEF, and Darnell Mooney were one fumble/sack/catch away from breaking 10 points. These 4 are responsible for 4 shots/dogs of punishment for Pink Pony Kupp.
            </p>
            <p>
                Trevor foolishly selected himself in the survivor pool for the second straight week, going against the prophecy. It also worth noting that no team this season has defended the MotW title for even 1 week. Every winner has lost the next week. He eliminated himself from the survivor pool with this terrible selection and performance.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                MOTW Prophecy Believer will bring ACL Hospital Ward into MotW and the battle of the abbreviation teams. If ACL Hospital Ward wins, then Poor Management will be in MotW after that. Pink Pony Kupp matches up with Twin Bowers in week 8.
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
            <ArticleSubheader>Worst Down Syndrome</ArticleSubheader>
            <p>
                ACL Hospital Ward started Tyler (Will have more points than trey sermon this week) Goodson as a meme, and that ended up working out, as Goodson was the highest scoring RB on their roster. Jayden Daniels left early with an injury, as did Brandon Aiyuk. That did not matter, as their other receivers, their TE, and their defense got them enough points to win against First Down Syndrome.
            </p>
            <p>
                First Down Syndrome had standout games from Kittle and Hurts for the 2nd straight week, but was yet again let down by every other player in their lineup. Tua will be coming back next week, which should help Tyreek Hill get back to form, 2.3 points from him is brutal. There might be no hope for Pittman though unless Anthony Richardson gets hurt again. Funny those two WRs are hoping for QB changes, but one is hoping for the starter to get hurt.
            </p>
            <p>
                No manager picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                ACL Hospital Ward will be in MotW against MOTW Prophecy Believer in week 8. First Down Syndrome will play against Giving Me a Chubb.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Kirk Lets The Boys Down</ArticleSubheader>
            <p>
                Just Joshin pt. 2 had a boom week from enough of their players to overcome the bust weeks from the rest of them. 6 players at or over 17 points is impressive, and the other 3 players combining for less than 17 is also impressive.
            </p>
            <p>
                Kirk Thuggins & The Boys had a few guys let them down, including team captain Kirk Cousins. Cousins was the 2nd lowest scorer of the week, only beaten by Josh Downs who is absolutely terrible when Anthony Richardson is the QB. Kamara and Kincaid were not particularly great this week either. Tank Bigsby had another impressive week without Etienne active, and might just be better than him.
            </p>
            <p>
                No manager picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Just Joshin pt. 2 will play against Costo Guys in week 8, in the battle of the 5-2 teams. Kirk Thuggins & The Boys will play against Poor Management.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Closest Game of the Week</ArticleSubheader>
            <p>
                This matchup was between the 10th and 11th highest scorers this week, with Calvin's Cold Streak having just enough to grab a W from this game, notching their 2nd close victory of the season. They had 5 players put up reasonably solid numbers, and were let down by Diggs, Kelce, and NYJ DEF, who put up -3 points this week.
            </p>
            <p>
                Poor Management had a tough outing this week, with only Kareem Hunt, Justin Jefferson, and MIN DEF coming through for them. C.J. Stroud was extremely disappionting, Mike Evans injury was unlucky, and Juwan Johnson and Harrison Butker did nothing.
            </p>
            <p>
                Jake incorrectly picked Poor Management to win this matchup in the survivor pool, and was eliminated. No managers picked Calvin's Cold Streak.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Calvin's Cold Streak will play against Youngster Joey in week 8. Poor Management plays against Kirk Thuggins & The Boys.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Costo Guys Bring The Boom</ArticleSubheader>
            <p>
                Costo Guys had 3 guys absolutely boom this week, with the QB1 and TE1 on the week, and 26.1 points from Breece Hall. The rest of their players were at or below expectations, but that was enough to be the 2nd highest scorer this week.
            </p>
            <p>
                Twin Bowers could've won this week if they had started Rachaad White instead of Zach Charbonnet. Zach Charbonnet was subbed in right at 12:59pm on Sunday, as Rachaad White was questionable for his Monday Night Football game, and they would've been left without a replacement if he didn't play. Outside of RB and Jayden Reed, this team's players showed up to play this week, but that wasn't enough to topple Costo Guys.
            </p>
            <p>
                Alec correctly picked Costo Guys to win in the survivor pool, and is the last man standing in the pool, emerging victorious! Congratulations to them.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Costo Guys will play against Just Joshin pt. 2 in week 8, and Twin Bowers will play against Pink Pony Kupp.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Battle of the RBs</ArticleSubheader>
            <p>
                These two teams have the best RB rooms in the league, especially after Pink Pony Kupp gave away Jonathan Taylor this past week. These teams proved that to be the case this week, with their RBs taking up a lot of space on these bars. For Giving Me a Chubb, Derrick Henry and Kyren Williams are TD machines, and Amari Cooper showed out in his first game as a Bill. Zay Flowers, Patrick Mahomes, and NO DEF let them down though as they narrowly lost this matchup.
            </p>
            <p>
                Youngster Joey had huge games from 5 players, Kyler, KWIII, Saquon, Pickens, and SEA DEF. The rest of their players combined for only 9.9 points. Those 9.9 points made the difference in this matchup though, so they've gotta be proud of those guys getting just enough to win.
            </p>
            <p>
                No managers picked either team in this matchup to win in the survivor pool.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Youngster Joey will play against Calvin's Cold Streak in week 8, and Giving Me a Chubb will play against First Down Syndrome.
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
                3rd highest score and 3 lowest score of the season this week, with everyone else pretty bunched in the middle.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                3rd straight week with a similar distribution. The range is widening, but the middle is getting more clustered.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                Calvin's Cold Streak and Youngster Joey both had their 2nd close victory of the season this week, and both moved to 3-4. Both teams could easily be 1-6 with slighly different outcomes. Poor Management had their 3rd close defeat of the season, and is 2-5 on the season. Tough luck.
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
                Costo Guys holds on to first place, and Just Joshin pt. 2 breaks away from the pack to claim 2nd place. These two teams face off this week, so we will have a 6-2 team alone on top of the leaderboard next week. First Down Syndrome and Poor Management both dropped to the bottom at 2-5. First Down Syndrome is last in PF by a fair margin at this point after MOTW Prophecy Believer scored 150+ points this week.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Costo Guys has moved into the 2023 Just Joshin tier of "lucky and good" in the bottom right corner. A lot of teams are pretty even in terms of PF and PA, crowding the line here.
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
                Costo Guys jumps back up to #1 on the power rankings after scoring the 2nd most points this week. MOTW Prophecy Believer jumped 5 spots up to #7 after blowing out the competition this week and scoring 150+ points. Poor Management takes over the bottom spot here, and has the lowest "Team Ability" score. ACL Hospital Ward's schedule has been easier than playing Poor Management every week.
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
                The biggest difference here is still First Down Syndrome not being in last if we played the median every week. Their weeks where they actually scored points would have them at 6-8, while the worst team is Poor Management at 3-11.
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
                If this were a best ball league, ACL Hospital Ward would be 7-0. They have had the ability to win their matchup every single week, but they are 4-3 in the actual standings. They would also have the least PA in this universe.
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
                Giving Me a Chubb would be 7-0 with Poor Management's schedule, and Twin Bowers would be 7-0 with Just Joshin pt. 2's schedule. First Down Syndrome would be 0-7 with Twin Bower's schedule, and MOTW Prophecy Believer would be 1-6 with Poor Management's schedule. Crazy the variety of outcomes possible with Poor Management's schedule.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>4 Teams Are Pretty Safe</ArticleSubheader>
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
            <ArticleSubheader>Even More Trades</ArticleSubheader>
            <p>
                There was blatant collusion this week from 2 managers, that went largely ignored by league officials despite outrage from managers.
            </p>
            <LeagueQuote>
                "I am outraged at the collusion that just happened...Explicitly against the rukes"<br />- Anthony
            </LeagueQuote>
            <p>
                The trade was Kyle receiving $6 FAAB and Josh receiving $9 FAAB (nice). The only comment from the commissioner was "lmao faab fines might have to become a thing". No action was taken to reverse this trade, or punish either manager involved.
            </p>
            <p>
                There was another trade that went down that already has a winner declared. Trevor traded Jonathan Taylor to Matt Smith for Chris Godwin, who shattered his ankle in the final seconds of his game this week. Smitty fleeced in this one.
            </p>
            <p>
                After that, Alec started making moves to improve their likelihood of fulfilling the prophecy, trading away Chris Olave and Bengals DEF for Baker Mayfield and $17 FAAB. *Insert Jerreld The Art of the Deal here* The prophecy was fulfilled for this week, but the winner of this trade is not yet clear.
            </p>
            <p>
                Alec started rostering defenses in his open roster spot after this deal in order to prevent Trevor from having a good defense in MotW. He picked up a few defenses in the 1pm slate, and then continued picking up defenses as Sunday went on. Trevor was hoping to get the Chargers or Chiefs defense after Cooper Kupp was officially ruled out. Alec put in a claim for $5 FAAB on the Chargers, and Anthony swooped in and added the Chiefs before Kupp was officially ruled out. Anthony then charged Trevor all $4 of his FAAB dollars for the Chiefs D, who still ended up costing him a shot/dog in the end. Anthony basically claimed the Chiefs D for -$4 by immediately selling them.
            </p>
            <p>
                There was a three part trade that went down just yesterday, involving many of the teams that were active leading into the week. These trades were all fired off within minutes of each other, all involving Anthony. The first one was Noah Fant (immediately dropped) and $10 FAAB for Austin Seibert. Anthony immediately send his other kicker to Alec for Mark Andrews to replace Fant. With 3 TEs rostered, Anthony sent Dalton Schultz to Josh K for $1 FAAB.
            </p>
            <LeagueQuote>
                "lmao Anthony must really like Fortnite"<br />- Matt Smith
            </LeagueQuote>
            <LeagueQuote>
                "modern day triangular trade"<br />- Anthony
            </LeagueQuote>
            <ArticleSubheader>Survivor is Over After 7 Weeks</ArticleSubheader>
            <LeagueQuote>
                "I will put the funds generated from my survivor win towards a league camera"<br />- Alec
            </LeagueQuote>
            <p>
                Congratulations to Alec on his survivor win, and may we continue this pool next season, with any suggestions of how to improve it put in Discord in the meantime.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/97sxq8.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/97t6fu.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/97ta3p.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Alec</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/97tao6.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/97taxd.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/97tb8s.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/97tbd6.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/97tbit.jpg"}>
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
