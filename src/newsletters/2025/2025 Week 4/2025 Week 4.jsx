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
import { leagueIds } from '../../../components/constants/LeagueConstants';

export const newsDate = '2025-10-02';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 4</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                D.K. might've lost a minion, but that didn't stop them from putting up the #1 score of the season this week in a matchup between the league's last two undefeated teams. They stand alone at the top of the leaderboard after a dominant performance. On the other hand, Deep Shot to Kirk did not rebound well after their embarrassing week 3 loss and put up another stinker this week. Their 97.28 points was the 10th lowest score of any team this season, and their loss to Singing Like Mariah Terry was the 3rd biggest blowout of the season. Bye Week Curious continued their hot streak, but had some unlucky matchup luck this week, and they are now the Best Loser of the season after scoring 134.98 points in a losing effort. They had the #1 RB and #1 TE of the week, but it wasn't enough.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                After our first perfect manager last week, we had 2 more this week, Lord of the Littles and First Down Syndrome. Both of these managers were able to win their matchups thanks in part to their perfect management, and the mismanagement of their opponents. First Down Syndrome defeated the least efficient manager, The Barkley Brawlers, who had the potential to win their matchup with better management.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Anthony Loses Matchup, Nikhil Loses $5</ArticleSubheader>
            <p>
                BBCU scored the 7th most points of any team this week, and left a decent amount of points on their bench as well. Chris Olave cost them a shot, and they immediately shipped them off roster, more on that later. Their other two shots will be due to their kicker and defense, common culprits of shots during MotW. Their only player above 20 points was Bijan Robinson, which won't get the job done against a team that is scoring over 150 points.
            </p>
            <p>
                D.K. Lost a Minion had a massive week, including huge games from Jordan Love, Omarion Hampton, and DK Metcalf. They also did not have ANY starters below 10 points this week, which had the potential to be our first ever 0 shot loss in MotW. Sadly for them, they won this matchup, so they will continue edging the punishment every week until they eventually go down, hopefully in ugly fashion for all the MotW spectators.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                D.K. Lost a Minion will look to stay perfect in week 5 against 1-3 Costo Guys in this Glizzy division matchup. Jordan Love and DK Metcalf will be on bye for D.K. Lost a Minion. BBCU will go up against 1-3 Deep Shot to Kirk in a Hubbell division matchup. BBCU will be without Bijan Robinson who is on bye.
            </p>
            <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleCaption>
                <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
            </ArticleCaption>
            <p>
                D.K. Lost a Minion gets their 15th MotW victory, more than doubling the next highest team total. BBCU gets their 4th loss, the only team with exactly one loss in every season of MotW.
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
            <ArticleSubheader>Turning Point for Mariah Terry?</ArticleSubheader>
            <p>
                Deep Shot to Kirk had the worst week of any team, and that was in part due to the injury to Malik Nabers, which has season derailing potential for them. They still have Rashee Rice waiting in the wings to replace him, but he is still suspended for a few more weeks. Quinshon Judkins is the bright spot on this team right now, highlighting the 0 RB strategy this team employed during the draft.
            </p>
            <p>
                Singing Like Mariah Terry dominated in this one to get their first win of the season. They finally got all their players to do well in the same week. Mahomes, Jacobs, QJ and JJ all had over 20 points which carried them to victory. They are hoping to have more weeks like this going forward.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Deep Shot to Kirk will face off with BBCU in a Hubbell Division matchup in week 5, avoiding a potential MotW feature thanks to BBCU's week 4 loss. Singing Like Mariah Terry will play against Lord of the Littles in an Avon Division matchup. They will go into that matchup as huge underdogs and will be without Josh Jacobs who is on bye.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Shootout Between 1-2 Teams</ArticleSubheader>
            <p>
                Bye Week Curious scored less than 86 points each of the first three weeks, but their team got up for this matchup against WalterPickens and scored 134.98 points. Sadly for them this wasn't enough to get them their second win of the season. Getting such big games from their star players like Jeanty and London, and some role players like Worthy and Goedert, should be encouraging for their outlook going forward. Rhamondre Stevenson might warrant an upgrade at RB2 though.
            </p>
            <p>
                WalterPickens went into Sunday Night Football in a big deficit, but George Pickens and Justin Fields were able to have elite games on Sunday and Monday to help them complete a huge comeback. CMC and Egbuka continue to put up 20+ point games for this team as well, helping them eclipse 150 points this week.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Bye Week Curious will face off with fellow 1-3 team The Barkley Brawlers in week 5. They have to deal with Drake London being on bye, so we will see if they truly are Bye Week Curious. WalterPickens faces off with Luck of the Dog in week 5, and has no bye weeks to deal with yet.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>The Bench Brawlers</ArticleSubheader>
            <p>
                First Down Syndrome had one of the most well-rounded performances in league history in this one, with all but 1 player in double digits. Amon-Ra and Deebo were the only 2 players to break 20, but that was more than enough to get the job done this week against their mismanaged opponent.
            </p>
            <p>
                The Barkley Brawlers left a ton of points on the bench this week, including Bo Nix and Kenneth Gainwell. Leaving Gainwell on the bench with Warren out in favor of flexing a TE was a big mistake for them in this one, and cost them a win that could've put them at 2-2. Instead they fall to 1-3 and are in 10th place.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                First Down Syndrome will face off with fellow 3-1 team Super Ja'Marrio Bros. in week 5. They have to deal with a bye week for DeAndre Swift in that one. The Barkley Brawlers will face off with fellow 1-3 team Bye Week Curious in week 5, and will have to contend with bye weeks from Kenneth Gainwell, DJ Moore, and Tucker Kraft. We all know they have enough TE to handle a Kraft bye week though.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Absolute Mid-Off</ArticleSubheader>
            <p>
                Costo Guys only had 2 players under 10 points this week, but their overall output wasn't nearly as prolific as other teams with that same fact. Their top scorer only had 18.6 points, and their defense had -3 points. They continue to start the the Ravens defense despite them missing basically all of their starters and going negative in 3 out of 4 games this season. They are the #31 ranked defense in PPG.
            </p>
            <p>
                Super Ja'Marrio Bros. squeaked out a win this week as the Worst Winner. Bucky Irving stole the show in this one, but his injury outlook is not great after this one. They didn't have any other huge games, but they had decent performances from anyone which was enough to beat Costo Guys.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Costo Guys will go into MotW in a Glizzy Division matchup with D.K. Lost a Minion. They will be without star QB Lamar Jackson for the next 3 weeks due to injury and then a bye week. Super Ja'Marrio Bros. will face off with fellow 3-1 team First Down Syndrome in week 5. They will be dealing with the Steelers bye for Jaylen Warren, and injuries to Trey Benson and Bucky Irving. They quickly went from having no RB depth, to a lot of RB depth, back to no RB depth in a matter of a couple weeks.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Dog Remains Unlucky</ArticleSubheader>
            <p>
                Lord of the Littles had another dominant week, scoring nearly 150 points. Puka Nacua and Rome Odunze are both great WR, and Garrett Wilson had a great week as well. Dak Prescott put up over 30 points which helped them put up such a big score. This team is dangerous.
            </p>
            <p>
                Luck of the Dog did not have any matchup luck this week, a trend that has followed them so far this season. They got good games from Josh Allen, Javonte Williams, and Kyle Pitts, but these were not enough with how bad the rest of their team was. Derrick Henry has been a huge disappointment for them, and loses the advantage of having Lamar Jackson at QB for the next few weeks.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Lord of the Littles will face off with 1-3 Singing Like Mariah Terry in an Avon Division matchup in week 5. They will be without Rome Odunze who is on bye. Luck of the Dog matches up with 2-2 WalterPickens, and will be without Kyle Pitts who is on bye, and Mike Evans who is injured.
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
                This was a high scoring week all around, and we almost had our first week with all teams over 100 points.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                Upward trends in all metrics this week, but with bye weeks starting up we aren't expecting this trend to continue across the board.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                Only having 2 close games through 4 weeks is wild. This entire league has been boom or bust so far this season.
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
                D.K. Lost a Minion remains the only undefeated teams at 4-0 after taking down BBCU this week. Half of the league sits at 1-3, so last place is anyone's to take right now. Bye Week Curious made up some ground in the PF department this week, but still is below everyone else. Luck of the Dog has by far the highest PA and is the only team above 500.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Lord of the Littles and D.K. Lost a Minion are the lucky and good teams. BBCU got a lot less lucky this week after getting crushed by D.K. Lost a Minion. Luck of the Dog is unlucky and mid, and Bye Week Curious was able to get less bad this week and pull some other teams into the bad territory.
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
                D.K. Lost a Minion took over the top spot this week as the only remaining undefeated team, swapping spots with BBCU. This looks very similar to the actual standings which is interesting to see. Luck of the Dog has by far the hardest schedule so far, but they are not positive against everyone, so it's not like it matters that much.
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
                The playoff odds and last place odds from FFHub are finally populated after 4 weeks, but their algorithm is still pretty ass in my opinion. I might try to do the last place odds on WalterPicks and fully scrap FFHub at some point this season. With the standings looking the way they are, I think the biggest surprise here is Deep Shot to Kirk having over 50% playoff odds from WalterPicks.
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
                D.K. Lost a Minion is the only undefeated team, and the only team who has yet to lose to the median as well. BBCU lost to both this week to go from 6-0 to 6-2.
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
                First Down Syndrome falls 6 spots in these rankings, showing that they have benefitted greatly from opponent mis-management. The Barkley Brawlers jump up 4 spots, showing that they need to do better at managing their lineup.
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
                You can see how hard Luck of the Dog's schedule has been in this one, they are the hardest schedule for a lot of teams. First Down Syndrome and BBCU have the widest range of outcomes, being able to go from 4-0 with an easy schedule to 1-3 with a hard schedule. Costo Guys and Singing Like Mariah Terry are similar, but range from 3-1 to 0-4. Bye Week Curious has the narrowest range of outcomes, being 1-3 with almost every schedule including their own, and 0-4 with 3 schedules.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>BBCU Back in Danger</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
            <p>
                Costo Guys getting pulled into MotW brings BBCU right back in the fold after their loss this week. First Down Syndrome would be the next victim of D.K. Lost a Minion if they can get past Costo Guys this week. The funniest arc here is Costo Guys winning, bringing back BBCU, and then BBCU winning and bringing back Luck of the Dog. Lord of the Littles remains safe and could have yet another season of dodging MotW entirely.
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
            <ArticleSubheader>Anthony Wins $5 and a Security Values in Action Award</ArticleSubheader>
            <p>
                One of our esteemed managers won a $5 bet against themselves this week. They also won a Security Values in Action Award, a very prestigious award for the most secure employees at SalesForce. Anthony exemplifies everything CyberSecurity, and winning this award is a great recognition for his commitment to the cause. We have received reports of his generosity as well, with reports saying that he will be contributing 50% of the award to the league. The commissioner vouched to match any contributions. This type of investment in the league could allow us to get a trophy and productionize this publication to a global audience.
            </p>
            <ArticleSubheader>Survivor Update</ArticleSubheader>
            <p>
                After just 4 weeks, only 2 teams remain in Survivor. The crooked commissioner Matt Smith and reigning Survivor champion Alec are the only 2 left. Alec is looking to defend his title, and avoid any insider action from the commissioner. Insider action will be much tougher to do soon, with The Offensive Line working diligently on an official survivor system to submit picks privately. This system should be able to work well for our next contest.
            </p>
            <ArticleSubheader>Trade Evaluation</ArticleSubheader>
            <p>
                There was a trade this week between Jake and Anthony, a surprising development given the league's criticism of Jake's trading methodology. Anthony acquired Ladd McConkey and sent Jake Chris Olave and $100 FAAB in the deal. This deal received mixed reviews across the league, with 6 managers agreeing that Jake won the trade, and 3 agreeing that Anthony won.
            </p>
            <p>
                The case for Jake winning is clear, Olave is 2nd among all WR in targets, 5th in target share and receptions, and we play in a PPR league. He also got $100 FAAB and is now at $300 total so he can claim any player he wants off of waivers at any time with nobody able to stop him. Ladd has been the WR3 on the Chargers through 4 weeks and hasn't lived up to his draft capital at all this season. Through this lens, it seems like Jake fleeced Anthony.
            </p>
            <p>
                The case for Anthony winning the trade is less clear, but it can be made. Ladd McConkey has been disappointing this season, but he is still 4th among all WRs in routes run and has a competent QB who he showed elite chemistry with last season when he was the WR22 in PPG as a rookie. McConkey has yet to score a TD, but he has a lot more TD upside on the Chargers than Olave does on the Saints. Ladd should see some positive regression as the season continues. Olave is a concussion prone WR on a bad offense with limited TD upside. It was strange to see Jake trade for an injury prone WR when he has 0 WR depth. However, the $100 FAAB in this deal is tough to comprehend from Anthony's POV. Assuming Anthony thinks FAAB is worthless, it helped him get his guy and get the Justin Herbert stack.
            </p>
            <p>
                The official Offensive Line take is that Anthony slightly won this trade and will see more benefit from it than Jake. This could easily change if Jake gets a league winning player off of waivers with his extra $100 FAAB, but we are willing to bet against that at this point in the season.
            </p>
            <ArticleSubheader>League Submissions</ArticleSubheader>
            <LeagueQuote>
                "Matthew Smith is AMAZING at fantasy football. Even if he didn't start the Eagles defense. Which was a mistake. But other than that, he is the fucking best. Go birds."<br />- Anonymous League Manager
            </LeagueQuote>
            <p>
                Matthew Smith also has poor taste in baseball teams.
            </p>
            <LeagueQuote>
                "How do I go about getting a Mickey Mouse Schedule?"<br />- Alec
            </LeagueQuote>
            <p>
                This is a great question that I would also like the answer to.
            </p>
            <LeagueQuote>
                "Anthony bet on Nikhil, not himself - five bucks won,<br />
                While half the league sits at one-three, season nearly done."
                <br />- Backup Poet
            </LeagueQuote>
            <p>
                It appears the league poet is OOO this week, but the backup poet saved the day with a late submission.
            </p>
        </div>
    )
}

// const VideoMeme = () => {
//     return (
//         <ImageWrapper>
//             <iframe
//                 title="Streamable Video"
//                 width="100%"
//                 height="320"
//                 src="https://streamable.com/e/8y12dg"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//             />
//             <ArticleCaption>Submitted by Colin</ArticleCaption>
//         </ImageWrapper>
//     )
// }

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a7x7sf.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a7x9m2.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a7xa2r.gif"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a7x9wh.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a7xboj.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a7xf3j.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a7xf73.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/a7xkrw.jpg"}>
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
    {
        id: 16,
        content: LeagueBuzzArticle,
    },
    // {
    //     id: 17,
    //     content: VideoMeme,
    // },
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
        id: 30,
        content: MotWRules,
    },
];
