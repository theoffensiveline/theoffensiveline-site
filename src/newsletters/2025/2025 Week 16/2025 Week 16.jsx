import {
  MotWRules,
  ArticleHeader,
  ImageWrapper,
  ArticleImage,
  ArticleSubheader,
  EfficiencyChart,
  StackedHistogram,
  MatchupPlot,
  MotwTable,
  ShotsDistributionChart,
  ArticleCaption,
  LeagueQuote,
  AwardsGridV2,
  WeeklyScoringChart,
  WeeklyMarginTable,
} from "../../../components/newsletters/newsStyles";
import awardsData from "./awardsTable.json";
import efficiencyData from "./efficiencyData.json";
import leaderboardData from "./leaderboard.json";
import matchupData from "./matchupData.json";
import motwHistoryData from "./motwTable.json";
import shotsDistData from "./shotsDist.json";
import starterData from "./starters.json";
import { leagueIds } from "../../../components/constants/LeagueConstants";

export const newsDate = "2025-12-24";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 16</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        The best game of the year (so far) took place this week in the playoff semifinal matchup
        between The Barkley Brawlers and BBCU. The Barkley Brawlers scored 165.98 points, the 3rd
        most of any team this season and they also hold the #1 spot from their 191.58 points in week
        8. BBCU scored the most points that any team has scored in a loss this season at 146.40
        points. This was BBCU's 5th highest score this season, but none of their previous higher
        scores would've beaten The Barkley Brawlers this week.
      </p>
      <p>
        Meanwhile in the other playoff semifinal, the MotW trend of shitty games continued with
        Uncle Rico Went Pro winning their 4th straight MotW with their opponent scoring less than
        111 points. This trend will be one to keep an eye on in the championship, since both
        contenders now have Mickey Mouse schedule allegations from different points in the season.
        The top 2 seeds that had the bye will be fighting for 3rd, and 2 teams that snuck into the
        playoffs will be going for glory in the championship.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        We didn't have any perfect managers yet again this week, with our most efficient manager at
        96% against their opponent who was at just 76% just below them in total points. Every %
        point of the 96% was important in that victory. Half of the league was in the 70s this week,
        really putting on a strong showing for the playoffs.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>No QB Points, No Problem</ArticleSubheader>
      <p>
        You can't see him well on this chart, but Jaxson Dart did score positive points this week
        with just 0.02 points for Uncle Rico Went Pro. This is the lowest possible positive score
        for a player and would be even funnier if we made 0 points worth 2 shots/dogs instead of
        just 1. Not that it would've mattered since Uncle Rico Went Pro was able to win thanks to
        Chase Brown and George Kittle putting up big games, and some other guys chipping in as well.
      </p>
      <p>
        Worst Management has historically dominated MotW, but historically fallen apart in the
        playoffs too so something had to give here. Sadly for them, the MotW domination did not come
        through for them. Drake Maye put up 23.7 points as his Bakemas hot streak continues, but
        their WRs, TE, and DEF did not put up enough points to compete and they will be left with 4
        shots to do this week.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        Uncle Rico Went Pro will be advancing to the championship against The Barkley Brawlers.
        Uncle Rico Went Pro will be trying to bring the championship trophy to the Hubbell Division
        for the 3rd straight season. Worst Management will fight for 3rd place against BBCU.
      </p>
      <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleCaption>
        <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
      </ArticleCaption>
      <p>
        Uncle Rico Went Pro earned their 12th MotW victory, 2nd most all-time behind their opponent.
        Their 49 shots/dogs given out is also 2nd most all-time. Worst Management lost their 3rd
        MotW of the season, and 9th MotW of all time, 2nd most all-time. Their 37 shots/dogs
        consumed is 2nd most all-time. Their 14 shots/dogs this season is tied for the 3rd highest
        total for one manager in any season.
      </p>
      <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
      <ShotsDistributionChart chartData={shotsDistData} />
    </div>
  );
};

const MatchupArticleTwo = () => {
  return (
    <div>
      <ArticleHeader>Playoff Semifinal #2</ArticleHeader>
      <ArticleSubheader>Mickey Mouse Got Jacked</ArticleSubheader>
      <p>
        BBCU has been elite all season and continued that trend this week putting up 146.4 points in
        their first ever playoff semifinal appearance. It was most of the usual suspects for them
        this week with Justin Herbert, Bijan, and JSN putting up huge numbers. Trey McBride was
        notably missed this week with his 6.7 (!!!) point performance. Zay Flowers, Travis Etienne,
        and Ladd McConkey tried to pick up the slack, but it wasn't enough to overcome Chris Olave.
        If they had just kept Chris Olave instead of trading him for Ladd McConkey they would've won
        this game since Olave scored 22.5 more points than Ladd and BBCU only lost by 19.58 points.
      </p>
      <p>
        The Barkley Brawlers finally had a tough opponent, but it still didn't matter since they
        decided to score the 3rd most points that any team has scored this season. Chris Olave led
        the way with 36.8 points, followed by James Cook with 26.4, DJ Moore with 21.9, Saquon with
        21.2 and NO DEF with 19. Travis Kelce shit the bed but it didn't matter since everyone else
        popped off.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        BBCU will be fighting for 3rd place against the 1 seed Worst Management. The Barkley
        Brawlers will be advancing to the championship against current MotW champion Uncle Rico Went
        Pro. They will look to avenge their 2023 championship loss to another Hubbell Division
        opponent.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>5th Place Game</ArticleHeader>
      <ArticleSubheader>CMC Causes Monday Night Edging</ArticleSubheader>
      <p>
        Lord of the Littles had Puka Nacua put up 46.5 points on Thursday Night Football and this
        matchup looked like it was over before it started. They also got 22.8 from Diggs, 19.16 from
        Dak, and 18 from Achane. This type of performance will usually get you a win in this league,
        and it barely did that this week.
      </p>
      <p>
        WalterPickens was down big going into MNF thanks to TreVeyon Henderson getting concussed at
        just 2.2 points and Emeka Egbuka taking a back seat for the Buccaneers. CMC needed to have a
        Puka level game in order to pull off the win, and he almost did that. He was a few yards shy
        of being able to pull out this win. This is the 3rd straight week that WalterPickens has
        lost due to starting the wrong QB between Jacoby Brissett and Joe Burrow. Those 2 QBs face
        off in week 17, but WalterPickens will not have to make that decision for a 4th time.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        Both of these teams can rest now that their season is over a little earlier than they
        would've liked. They both outscored the two playoff teams in matchup of the week and
        would've loved to be in their shoes instead.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Toilet Bowl Semifinal #1</ArticleHeader>
      <ArticleSubheader>IR Curious</ArticleSubheader>
      <p>
        Bye Week Curious started 2 players this week who have been ruled out for the season. Daniel
        Jones is still somehow in their starting lineup after his injury in week 14. Devaughn Vele
        also started for them this week despite being put on season-ending IR. Their rookie RB duo
        tried to overcome the deficit but it was ultimately not enough with the lack of help they
        received.
      </p>
      <p>
        Super Ja'Marrio Bros. got out of this one shot/dog free thanks to their opponent not setting
        their lineup. Jaylen Warren put up 29.1 points and Ja'Marr Chase had 19.9 points to help
        secure the win. They had some guys go off on their bench, but luckily they won't regret that
        since they got the win anyway.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        Bye Week Curious will be advancing to the toilet bowl final against Worse Management. Super
        Ja'Marrio Bros. will be in the 10th place game against Costco Guys.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Toilet Bowl Semifinal #2</ArticleHeader>
      <ArticleSubheader>Tony Pollard &gt; Josh Jacobs</ArticleSubheader>
      <p>
        Costco Guys was led by Kenneth Gainwell with 23.8 points this week and Jahmyr Gibbs follwed
        closely with 22.8 points. Dalton Schultz, HOU DEF, Tony Pollard, and Chase McLaughlin round
        out the rest of their double digit scorers. Their lowest scorers were Brian Thomas and Lamar
        Jackson so they were lucky to get out of this one with a win while putting up less than 110
        points.
      </p>
      <p>
        Worse Management, not to be confused with the playoff team Worst Management, struggled to
        score this week and only got a total of 6.2 points from their RBs while their opponent got
        56.8 points from theirs. They won the WR battle in a similar but slightly worse fashion, and
        couldn't make up the gap at any other position either.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        Costco Guys will be in the 10th place game against Super Ja'Marrio Bros. next week. Worse
        Management will be advancing to the toilet bowl final against Bye Week Curious.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>8th Place Game</ArticleHeader>
      <ArticleSubheader>7 shots/dogs with 3 9.Xs</ArticleSubheader>
      <p>
        2nd Half Team put up exactly 100 points this week and had a majority of it come from 3
        players, Derrick Henry with 22.8 points, Harold Fannin with 19.5 points, and Kyle Pitts with
        18.7 points. The only other double digit scorer on their team was Jameson Williams with 12
        points. They were lucky to win this one as they would've had to do 5 shots/dogs including
        one for Josh Allen.
      </p>
      <p>
        First Down Syndrome did not do well in the matchup and has an impressive 7 shots/dogs to
        consume while scoring a relatively respectable 83.8 points in the process. A lot of their
        players edged the 10 point threshold but only 2 could get over the line this week. The
        Offensive Line doesn't have a good metric for this currently, but this might be the
        unluckiest 7 shot/dog performance of all time.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        These teams are done for the season early after winning their first round toilet bowl
        matchups and fighting for 7th and 8th place.
      </p>
    </div>
  );
};

const ScoringDistributionArticle = () => {
  return (
    <div>
      <ArticleHeader>Scoring Distributions</ArticleHeader>
      <ArticleSubheader>Distribution of Scoring</ArticleSubheader>
      <StackedHistogram chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>
      <p>The playoffs brought us a couple new higher scores but otherwise it was a low week.</p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>
        This week had another new high which is the 4th straight week we have increased the maximum.
        The average, median, and minimum did not continue their upward trend.
      </p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>
        We had our 2nd closest game of the season this week in perhaps the least relevant game of
        the season.
      </p>
    </div>
  );
};

// const TradingVolumeArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Trading Volume</ArticleHeader>
//             <TradesLineChart tradeHistory={tradeHistory} />
//             <p>
//                 We didn't see much action right before the trade deadline, with just 1.5 trades happening this week. It is only 1.5 because one of the trades was a correction of the Travis Hunter collusion trade that happened last week. The other trade also involved Super Ja'Marrio Bros. as they sent out Trey Benson for Oronde Gadsden to fill the slot left open by a surprising Sam LaPorta IR stint.
//             </p>
//         </div>
//     )
// }

// const StandingsArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Standings & Points</ArticleHeader>
//             <ArticleSubheader>Current Standings</ArticleSubheader>
//             <LeaderboardTable leaderboardData={leaderboardData} />
//             <p>
//                 Standings are locked in now, with not much movement this week. There was no consequential movement that changed anything. The biggest change was the playoff seeds swapping opponents and moving MotW around.
//             </p>
//             <ArticleSubheader>PF Vs. PA</ArticleSubheader>
//             <PfPaScatter leaderboardData={leaderboardData} />
//             <p>
//                 All 6 of the playoff teams are on the good side of the PF/PA line, and Costco Guys is the 7 seed with at .500 record who is also on the good side of the line. The other 5 toilet bowl teams are on the bad side of the line. It is tough to win when you are outscored on average.
//             </p>
//             <ArticleSubheader>Starting Lineup Analysis</ArticleSubheader>
//             <LineupScatter data={startingLineupData} />
//             <p>
//                 BBCU continues to sit in the top right, but it is tough to see movement in this chart week to week this late in the season. The last place team is in the bottom left, we will see if that trend continues next season, and The Offensive Line may do some work in the off-season to analyze historical trends as well.
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
//             <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 1 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 1 would mean that you played the worst team every week.</ArticleCaption>
//             <p>
//                 The power rankings going into the playoffs have 5 of the 6 playoff teams in the top-6 teams. The Barkley Brawlers are the 3-seed but are 9th in the playoff rankings. They would be 64-90 against all teams this season which shows how easy their schedule has been to get the 3-seed. They had the easiest schedule this season with a difficulty of 32.5. This was slightly harder than playing against Bye Week Curious every week who only had a team ability of 26.74.
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
//                 Three more teams clinched a playoff spot this week, and there are now two spots left to fill. There will be 4 teams fighting for those 2 spots, and they all have a shot at them if things break right. Costco Guys is the least likely team to make it thanks to their low PF. It looks extremely likely that Uncle Rico Went Pro will make it in, and Lord of the Littles is likely to make it as well.
//             </p>
//             <p>
//                 While it is technically true that Super Ja'Marrio Bros. and Singing Like Mariah Terry can finish with the same 5-9 record as Bye Week Curious and 36 Spikeball Pro Nets, it is virtually impossible for them to get last since they have a massive PF lead on Bye Week Curious. So the 2 teams in true contention for last are the 4-9 teams. Bye Week Curious can avoid last with a win and a loss from 36 Spikeball Pro Nets, which the simulations give a 26% chance of.
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
//                 The Barkley Brawlers would've snuck into the playoffs as the 6 seed, but all the playoff teams would remain unchanged in this universe. The last place team would also remain the same.
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
//                 Uncle Rico Went Pro would be 11-3 and in 1st if they made the right start/sit decisions every single week. Bye Week Curious would still be in last at 2-12.
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
//                 BBCU has had the worst possible schedule for them, sitting at 9-5 in the wosrt case, matching their current record. They would be 13-1 with Costco Guys or Lord of the Littles schedule. Super Ja'Marrio Bros. has also had the worst possible schedule at 5-9, and could be 10-4 with The Barkley Brawlers schedule. The Barkley Brawlers are the easiest possible schedule for 10/12 teams in the league. Cockroach are the hardest schedule for 8/12 teams in the league. The worst possible record is Bye Week Curious at 1-13 with BBCU or WalterPickens schedules.
//             </p>
//         </div>
//     )
// }

// const DivisionArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Division Overview</ArticleHeader>
//             <ArticleSubheader>Team Record vs Division</ArticleSubheader>
//             <DivisionRecordTable data={divisionRecords} standings={leaderboardData} />
//             <p>
//                 This table shows each team's record against each division. Jonathan Taylor Fan Club absolutely cleaned up the Hubbell Division with a 4-0 record. Other teams with undefeated records include The Barkley Brawlers against the Glizzy Division, Super Ja'Marrio Bros. against the Avon Division (0-3 against the Hubbell Division with the curse), and Costco Guys in their own Glizzy Division. Hubbell Park Roommate #8 was 0-3 in the Glizzy Division, as was Uncle Rico Went Pro. Bye Week Curious was 0-4 against the Avon Division.
//             </p>
//             <p>
//                 If you really looked at the table above, you might be wondering how Lord of the Littles managed to have only 3 games against the Hubbell Division and 5 against the Glizzy Division. You might also be wondering how Uncle Rico Went Pro managed to have 4 games against the Hubbell Division and only 3 against the Glizzy Division. What do these 2 managers have in common you might ask?
//             </p>
//             <DivisionOverallRecordsTable data={divisionOverallRecords} />
//             <p>
//                 This table shows each division's overall record against everyone, excluding divisional games which are always 1-1. This table also clearly shows the mistake that was made, as the Hubbell Division had an extra inter-division matchup in week 11. This has huge implications on the schedule, the standings, and MotW.
//             </p>
//             <p>
//                 The Hubbell Division was the best in terms of W/L this season, and would've been even better if it wasn't for the scheduling error, as both WalterPickens and Uncle Rico Went Pro would've won in week 11.
//             </p>
//         </div>
//     )
// }

// const MotWDangerArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>MotW Possibilities</ArticleHeader>
//             <ArticleSubheader>Hubbell Curse 2.0</ArticleSubheader>
//             <DangerTable data={dangerTable} />
//             <ArticleCaption>MotW Danger Metric</ArticleCaption>
//             <p>
//                 The Hubbell Division is dealing with the MotW trap, and hoping it doesn't linger too long into the playoffs. It is possible for at least 3 of these teams to make the playoffs, but MotW could also get sucked into the toilet bowl if things break right.
//             </p>
//             <p>
//                 Super Ja'Marrio Bros. has not been in MotW this season, and they got their second step to dodging it with a BBCU win in week 12. Now they just need an Uncle Rico Went Pro win in week 13 to successfully dodge MotW in the Hubbell Curse gauntlet.
//             </p>
//             <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
//             <ArticleImage src={motwFuture} />
//             <ArticleCaption>This will get fixed eventually to be less shitty and not an image.</ArticleCaption>
//         </div>
//     )
// }

const LeagueBuzzArticle = () => {
  return (
    <div>
      <ArticleHeader>League Buzz</ArticleHeader>
      <ArticleSubheader>Championship Preview</ArticleSubheader>
      <p>
        The leagues championship comes down to 2 teams and 2 managers who have a lot of playoff
        experience, Jake and Josh.
      </p>
      <p>
        Jake was the 1 seed in 2023 and 2024, losing in the semifinals last year and in the finals 2
        years ago. They are looking to right those wrongs this year and win their first championship
        after heartbreaking losses in the playoffs. Their team doesn't have Josh Allen this year
        like it did each of the last 2 years, who has a history of heartbreaking playoff losses
        himself. We will see if that shift in culture can get them over the hump this season.
      </p>
      <p>
        Josh has more playoff success than Jake with a Mickey Mouse championship in 2019 and a real
        championship in 2021. Outside of his championships, he took 5th place in 2022, and 6th place
        in 2023. Josh has never lost a game in the playoff semifinals or championship, and will be
        looking to build a GOAT case similar to Michael Jordan's where he either has a first round
        exit or wins the finals. Josh drafted immediately after doing 5 shots for his extremely late
        MotW punishment from the 2024 season. This (at least partially) led him to draft 12 WRs and
        RBs in the first 12 rounds of the draft, and he is only staring 2 of those 12 players in the
        championship.
      </p>
      <ArticleSubheader>Toilet Bowl Punishment Gaslighting</ArticleSubheader>
      <p>
        The Offensive Line did some digging this week in regards to the toilet bowl punishment
        discussion that was had this week. Some league members were under the impression that the
        toilet bowl punishment was always going to be singing a song, and others were adamant that
        it was never decided to be that. After a thorough investigation, The Offensive Line found no
        evidence supporting the case that the toilet bowl punishment was supposed to always be a
        song. If anyone has any evidence in favor of that argument, please send it to The Offensive
        Line immediately. The{" "}
        <a href="../1253779168802377728/2024%20Week%2016">2024 Week 16 newsletter</a> has coverage
        of the discussion that was had, but no mention of this punishment persisting year to year.
      </p>
      <ArticleSubheader>League Submissions</ArticleSubheader>
      <LeagueQuote>
        "Good game Jake Peterson."
        <br />- Anthony at 4:11 PM ET on 12/21/25
      </LeagueQuote>
      <p>
        This submission was clearly a sandbagging violation by Anthony trying to turn the tides in
        his favor by conceding an early defeat while he still had a chance to win.
      </p>
      <LeagueQuote>
        "Thank you, praise the lord Mickey Mouse for allowing me this opportunity! 🙏🏻"
      </LeagueQuote>
      <ImageWrapper>
        <ArticleImage
          src={
            "https://thejesusquestion.org/wp-content/uploads/2011/10/mickey-mouse-sermon-on-the-mount_alexander-savich.jpg"
          }
        ></ArticleImage>
      </ImageWrapper>
      <LeagueQuote>- Jake</LeagueQuote>
      <LeagueQuote>"Championship Inbound"</LeagueQuote>
      <ImageWrapper>
        <ArticleImage
          src={"https://media.tenor.com/tu7pkA0JFM8AAAAM/captain-ocean.gif"}
        ></ArticleImage>
      </ImageWrapper>
      <LeagueQuote>- Jake</LeagueQuote>
      <LeagueQuote>
        "Jake beating Anthony is like the eagles beating the chiefs"
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>Very true, everybody lost this one.</p>
      <LeagueQuote>
        "It's safe to say Anthony got fleeced…"
        <br />- Alec
      </LeagueQuote>
      <LeagueQuote>
        "I never would have made that trade"
        <br />- Greg
      </LeagueQuote>
      <p>
        Anthony definitely got fleeced, he lost by less than the difference between Olave and
        McConkey's score. These two players were traded before week 5, and The Offensive Line
        checked every matchup from week 5 to week 15 for these two teams. None of those matchups
        would've had a different outcome if this trade had never happened, so there isn't even an
        alternate reality for Anthony to fall back on where this playoff matchup doesn't happen this
        week and he doesn't get the win without doing this trade.
      </p>
      <LeagueQuote>
        "Pitts is TE#2…fuck all the haters"
        <br />- Alec
      </LeagueQuote>
      <p>Hope you're enjoying your 7th place finish with TE2 buddy.</p>
    </div>
  );
};

const Meme1 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/T4bNgX7.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/1qZzfE0.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/idLJiTR.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/28n0lh9.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/nSbdzdI.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/fn7Tb9Q.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/ub3CvXq.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/UxUJJoi.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

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
  //     content: TradingVolumeArticle,
  // },
  // {
  //     id: 10,
  //     content: StandingsArticle,
  // },
  // {
  //     id: 11,
  //     content: PowerRankingsArticle,
  // },
  // {
  //     id: 12,
  //     content: PlayoffOutlookArticle,
  // },
  // {
  //     id: 13,
  //     content: AlternateUniverseArticleOne,
  // },
  // {
  //     id: 14,
  //     content: AlternateUniverseArticleTwo,
  // },
  // {
  //     id: 15,
  //     content: AlternateUniverseArticleThree,
  // },
  // {
  //     id: 16,
  //     content: DivisionArticle,
  // },
  // {
  //     id: 17,
  //     content: MotWDangerArticle,
  // },
  {
    id: 18,
    content: LeagueBuzzArticle,
  },
  // {
  //     id: 20,
  //     content: VideoMeme,
  // },
  {
    id: 20,
    content: Meme1,
  },
  {
    id: 21,
    content: Meme2,
  },
  {
    id: 22,
    content: Meme3,
  },
  {
    id: 23,
    content: Meme4,
  },
  {
    id: 24,
    content: Meme5,
  },
  {
    id: 25,
    content: Meme6,
  },
  {
    id: 26,
    content: Meme7,
  },
  {
    id: 27,
    content: Meme8,
  },
  // {
  //     id: 28,
  //     content: Meme9,
  // },
  {
    id: 30,
    content: MotWRules,
  },
];

const newsletterData = {
  newsDate: newsDate,
  articles: articles,
  meta: {
    title: "2025 Week 16",
    description: "Testing this feature out to see if it works",
    image: "/banner_logo.png",
  },
};

export default newsletterData;
