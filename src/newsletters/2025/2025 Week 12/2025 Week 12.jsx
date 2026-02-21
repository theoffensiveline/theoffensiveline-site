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
  LeaderboardTable,
  PfPaScatter,
  AltLeaderboardTable,
  ArticleCaption,
  LeagueQuote,
  AwardsGridV2,
  DangerTable,
  WeeklyScoringChart,
  PowerRankingsTable,
  ScheduleTable,
  WeeklyMarginTable,
  PlayoffTable,
  LineupScatter,
} from "../../../components/newsletters/newsStyles";
import awardsData from "./awardsTable.json";
import bestBallLbData from "./bestBallLb.json";
import efficiencyData from "./efficiencyData.json";
import leaderboardData from "./leaderboard.json";
import matchupData from "./matchupData.json";
import medianLbData from "./medianLb.json";
import motwHistoryData from "./motwTable.json";
import playoffData from "./playoffTable.json";
import powerRankingsData from "./powerRankings.json";
import scheduleData from "./scheduleData.json";
import shotsDistData from "./shotsDist.json";
import starterData from "./starters.json";
import dangerTable from "./dangerTable.json";
import startingLineupData from "./startingLineupData.json";
import motwFuture from "./motwFuture.png";
import { leagueIds } from "../../../components/constants/LeagueConstants";

export const newsDate = "2025-11-27";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 12</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        It's Thanksgiving, and on this beautiful holiday The Offensive Line is thankful for 3
        things:
        <ol>
          <li>The readers - you</li>
          <li>The great game of fantasy football</li>
          <li>The Hubbell Curse</li>
        </ol>
        The Hubbell Curse was in full effect this week, making Super Ja'Marrio Bros. 0-4 this season
        in official Hubbell Division games, and 0-1 in unofficial games. Their 71.58 point loss to
        Uncle Rico Went Pro was the 4th biggest blowout this season. This was their 2nd Hubbell
        Division matchup this season playing without JaMarr Chase, but that wouldn't have made a
        difference in this one. The other Hubbell Division matchup this week was MotW, and was a
        shootout with WalterPickens scoring 135.68 points in a losing effort, the 4th best loser of
        the season. 3 of the 4 highest scoring teams this week were from the Hubbell Division, with
        the cursed team putting up the least points of any team in the league.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        4 teams were far above the rest this week, but none of them managed perfectly. BBCU was the
        worst of the 4 with 88.4% efficiency leaving Hunter Henry on their bench who would've been
        the #1 TE this week. The lowest efficiency this week was Singing Like Mariah Terry at just
        78.3% which is brutal because 100% efficiency would've won them their matchup with The
        Barkley Brawlers who were only at 81% efficiency themselves.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>(BB) C U in the playoffs</ArticleSubheader>
      <p>
        BBCU put up another big performance, their 3rd time this season scoring 154.XX points, which
        is pretty insane to have that type of precision. Those 3 scores are 5th, 6th, and 7th among
        all scores this season. JSN did the thing again, scoring 37.1 points this week. Everyone
        else on their team chipped in as well, except for Romeo Doubs who only scored 4.3 points.
        This team is elite and should be a lock for the playoffs with the potential to earn a bye.
      </p>
      <p>
        WalterPickens had a strong week, and was the best loser in MotW this season. They only have
        2 shots/dogs as a result of their 135.68 point showing. George Pickens led the way with 29.6
        points, and CMC put up his usual 27.2 points in what was essentially the garbage time of
        this fantasy matchup. The 2 shots/dogs come as a result of their 2 WRs, Tee Higgins and
        Emeka Egbuka. Tee Higgins was on his way to 10 points when he went out with a concussion,
        and Egbuka was on his way to 10 points when Baker Mayfield left with an injury at halftime.
        We were potentially 2 injuries away from our first 0 shot/dog loss, but that's the way the
        dogs fall sometimes.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        BBCU will be taking MotW to their travel partner Uncle Rico Went Pro, who is already behind
        on their punishment from last week's loss to WalterPickens. These two will either be doing
        their punishment together, or BBCU will be watching Uncle Rico Went Pro double up on
        punishments. WalterPickens will be granted the Hubbell Curse next week against Super
        Ja'Marrio Bros. who dodged MotW again.
      </p>
      <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleCaption>
        <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
      </ArticleCaption>
      <p>
        BBCU earned their 7th MotW victory, good enough for 3rd all time. Their 33 shots/dogs given
        out is 2nd all time, but isn't even halfway to 1st. WalterPickens earned their 6th MotW
        loss, tied for 3rd most in league history. Their 24 shots/dogs consumed is tied for 4th
        most, and also isn't halfway to 1st.
      </p>
      <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
      <ShotsDistributionChart chartData={shotsDistData} />
    </div>
  );
};

const MatchupArticleTwo = () => {
  return (
    <div>
      <ArticleHeader>Matchup #2</ArticleHeader>
      <ArticleSubheader>Who's Little Now?</ArticleSubheader>
      <p>
        First Down Syndrome didn't have the best week, but it was enough for them to get the win
        over their divisional opponent. Jalen Hurts and Amon-Ra St. Brown led the way for this team,
        combining for over 60 points. The rest of their team was pretty bad, but they got the W so
        they don't care.
      </p>
      <p>
        Lord of the Littles put up a little amount of points this week, scoring less than 90 for the
        2nd time this season. Dak Prescott had 27.06 points for them, but the rest of their team
        outside of Puka struggled. This would've been a 6 shot/dog loss in MotW, but this team
        doesn't even know what that is.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        First Down Syndrome will be fighting for a playoff spot against their Avon Division rival in
        week 13, Singing Like Mariah Terry, who is fighting to avoid last place. Lord of the Littles
        will be against The Barkley Brawlers in an important game for the playoff race between two
        7-5 teams.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>Shocking Upset Shortens Survivor</ArticleSubheader>
      <p>
        Bye Week Curious turned it up when they needed it most, scoring their 4th most points of the
        season and earning a hard-fought victory. Ashton Jeanty led the way with 24.8 points, and
        was helped by Daniel Jones, Darnell Mooney, Harrison Butker, and Jauan Jennings who all
        scored at least 15 points. Every point mattered in this matchup, even the 3.5 they got from
        Kayshon Boutte.
      </p>
      <p>
        JonathanTaylorFansCrying got the 2nd JT stinker in his last 3 games, and they've lost both
        of those games. Taylor scored 8.6 points this week in a tough matchup against the Chiefs.
        This was anti-correlated with their opponents QB Indiana Jones, which made this sting a
        little extra. Emanuel Wilson did his best Jonathan Taylor impression, but the rest of their
        team struggled as well and they couldn't get the job done on Monday Night when Tetairoa
        McMillan got outscored by Jauan Jennings.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        After facing off in back-to-back weeks, these teams won't have to deal with each other again
        this season. Bye Week Curious will be in the all-important battle for last place next week
        against 36 Spikeball Pro Nets. JonathanTaylorFansCrying will be up against Costco Guys in
        week 13.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>Hubbell Curse Hits Hard</ArticleSubheader>
      <p>
        Super Ja'Marrio Bros. is absolutely cursed. This was their 2nd Hubbell Division matchup this
        season without JaMarr Chase, with the last one coming during his week 10 bye where they lost
        by less than 2 points to WalterPickens. This time JaMarr Chase wouldn't have made a
        difference though, with a massive gap on the scoreboard. Wan'Dale Robinson channeled JaMarr
        Chase this week, but nobody else on the team did much of anything.
      </p>
      <p>
        Uncle Rico Went Pro benefitted from the curse this week, with all of their players scoring
        over 10 points. None of their players scored more than their opponents Wan'Dale Robinson,
        but all but 1 of their players scored more than their opponents 3rd best player, Jaylen
        Warren.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        Super Ja'Marrio. Bros will be taking the Hubbell Curse into a matchup with WalterPickens in
        week 13. Uncle Rico Went Pro will be pulled right back into MotW against BBCU.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>55 Big Booms</ArticleSubheader>
      <p>
        36 Spikeball Pro Nets just lost their 9th game of the season, and this is their 8th loss
        while scoring below the league median for that week. So you could argue this is the 8th loss
        they've deserved out of their 9 losses. This week they didn't get nearly enough points from
        Josh Allen who only scored 8.12 points. They also got 0 from Jameson Williams and only 4.5
        from Kyle Pitts. Their bench didn't have enough firepower to get the win, so they can't feel
        too bad about this one, especially since they scored below the median.
      </p>
      <p>
        Costco Guys had a huge week, driven in large part by Jahmyr Gibbs 55.4 points. This
        accounted for 38.3% of their total points this week, which is the #1 MVP performance this
        season. The rest of their team wasn't too bad either, with 5 more players scoring 10+
        points. Lamar Jackson, Sean Tucker, and Chase McLaughlin weren't good, but Gibbs more than
        made up for it.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        36 Spikeball Pro Nets is in their biggest game of the season in week 13 against the 4-8 #11
        seed Bye Week Curious. Costco Guys will be up against 9-3 #1 seed JonathanTaylorFansCrying.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>Second Straight Shit Show</ArticleSubheader>
      <p>
        Singing Like Mariah Terry scored more than they did last week, but that isn't saying much.
        This is their 3rd straight game scoring less than 100 points, and the last 2 have both been
        against The Barkley Brawlers. A.J. Brown had 25 points, but the rest of their team sucked in
        this one.
      </p>
      <p>
        The Barkley Brawlers scored more than last week as well, and got their 2nd straight win
        against Singing Like Mariah Terry. This win was driven by James Cook and Michael Wilson who
        both scored 20+ points. The rest of their team wasn't great, but they got the job done this
        week in an easy matchup.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        Singing Like Mariah Terry will be up against First Down Syndrome in week 13. The Barkley
        Brawlers will be facing off with Lord of the Littles.
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
      <p>This week had 4 strong teams, 5 middling teams, and 3 weak teams.</p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>
        The average ticked up this week thanks to some big weeks from 4 teams, bu the median
        remained stagnant with the average performance of many teams.
      </p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>We had our 2nd closest game of the season this week, decided by less than 1 point.</p>
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

const StandingsArticle = () => {
  return (
    <div>
      <ArticleHeader>Standings & Points</ArticleHeader>
      <ArticleSubheader>Current Standings</ArticleSubheader>
      <LeaderboardTable leaderboardData={leaderboardData} />
      <p>
        JonathanTaylorFansCrying continues to sit comfortably on top of the leaderboard despite
        their loss this week. Uncle Rico Went Pro took the last playoff spot from Super Ja'Marrio.
        Bros. in their win against them this week. 36 Spikeball Pro Nets fell into last place after
        Bye Week Curious was able to defeat JonathanTaylorFansCrying.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        This chart might continue to say that 36 Spikeball Pro Nets is unlucky, but those of us who
        are avid readers of The Offensive Line know that is not true if you really look at the data.
        BBCU continues to be good while being unlucky, and JonathanTaylorFansCrying continues to be
        lucky while being pretty good.
      </p>
      <ArticleSubheader>Starting Lineup Analysis</ArticleSubheader>
      <LineupScatter data={startingLineupData} />
      <p>
        This new chart analyzes how balanced a team's starting lineup is, compared to the overall
        strength of their team. The y-axis represents the balance of the team, with higher ranking
        teams having more good players, and lower ranking teams relying on a few stars and/or boom
        games for the majority of their points. The x-axis is the average PPG by a starting player
        for the team. Please provide any feedback on this chart to The Offensive Line!
      </p>
      <p>
        r/TopRightBBCU is going crazy with this one, they are by far the most consistent team and
        they are also by far the best. Their average starter is scoring 15 points, which is a pretty
        wild stat, an entire point better than the next best team. Bye Week Curious is on the
        complete opposite end of the spectrum, with an average starter scoring less than 11 points
        and relying heavily on boom games from their players to get any victories.
      </p>
    </div>
  );
};

const PowerRankingsArticle = () => {
  return (
    <div>
      <ArticleHeader>Power Rankings</ArticleHeader>
      <ArticleSubheader>Current Power Rankings</ArticleSubheader>
      <PowerRankingsTable powerRankingsData={powerRankingsData} />
      <ArticleCaption>
        Team Ability of 100 would mean you were the best team every week, and 1 would mean that you
        were the worst team every week.
        <br />
        Strength of Schedule of 100 would mean you played the best team every week, and 1 would mean
        that you played the worst team every week.
      </ArticleCaption>
      <p>
        BBCU stayed atop the power rankings again this week after their #2 finish, and Uncle Rico
        Went Pro moved up 2 spots after their #1 finish. Super Ja'Marrio Bros. moved down to 7th
        after their #12 finish this week, but it will be tough for anyone to crack the bottom tier
        with how wide the gap is. There was no movement in the bottom tier this week.
      </p>
    </div>
  );
};

const PlayoffOutlookArticle = () => {
  return (
    <div>
      <ArticleHeader>Playoff / Last Place Outlook</ArticleHeader>
      <ArticleSubheader>Magic Numbers and Simulations</ArticleSubheader>
      <PlayoffTable playoffData={playoffData} />
      <ArticleCaption>
        Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of
        each team's scores this year. It does not take projections or byes into account. It uses
        that data to run 10,000 monte carlo simulations of each matchup given a team's average score
        and standard deviation. We are now also sourcing playoff odds from WalterPicks! These are
        based on future projections, rather than historical data.
        <br />
        Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot
        outright before tiebreakers
        <br />
        Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from
        the race outright before tiebreakers
        <br />
        *12th place calculation adds 12th place losses - 11th place losses because they have to
        overtake 11th place.
      </ArticleCaption>
      <p>
        Nobody officially clinched a playoff spot this week, but BBCU is one win or one 6-6 team
        loss away from clinching. The top 8 teams are safe from last place, and Super Ja'Marrio
        Bros. is very close to being safe as well since Bye Week Curious and 36 Spikeball Pro Nets
        play each other this week. 36 Spikeball Pro Nets can no longer make the playoffs, but they
        are fighting for their life to avoid last place.
      </p>
      <p>
        The simulations from FFHub still like Bye Week Curious for last place, but it is an uphill
        battle for 36 Spikeball Pro Nets since they are 1 game behind at the moment. The simulations
        are also higher on First Down Syndrome than WalterPicks playoff odds are. WalterPicks likes
        the 2 teams ahead of them to make the playoffs a lot more than them.
      </p>
    </div>
  );
};

const AlternateUniverseArticleOne = () => {
  return (
    <div>
      <ArticleHeader>Alternate Universe #1</ArticleHeader>
      <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
      <AltLeaderboardTable data={medianLbData} />
      <ArticleCaption>
        If everyone played their matchup each week, and also played against the median, this is what
        the leaderboard would look like.
      </ArticleCaption>
      <p>
        Singing Like Mariah Terry would be in last in this universe, with just 2 wins against the
        median all season.
      </p>
    </div>
  );
};

const AlternateUniverseArticleTwo = () => {
  return (
    <div>
      <ArticleHeader>Alternate Universe #2</ArticleHeader>
      <ArticleSubheader>Best Ball Standings</ArticleSubheader>
      <AltLeaderboardTable data={bestBallLbData} />
      <ArticleCaption>
        If everyone played their best lineup every week, this is what the standings would look like.
        All columns include hypothetical totals.
      </ArticleCaption>
      <p>
        Uncle Rico Went Pro would be 9-3 and tied for 1st if they made the right start/sit decisions
        every single week. There would be a tie for last place with a couple of 2-10 teams.
      </p>
    </div>
  );
};

const AlternateUniverseArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Alternate Universe #3</ArticleHeader>
      <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
      <ScheduleTable data={scheduleData} />
      <p>
        BBCU would be 12-0 with Costco Guys schedule, the last remaining undefeated scenario.
        JonathanTaylorFansCrying might be 9-3, but 6-6 Costco Guys would be 10-2 with that cupcake
        schedule. Singing Like Mariah Terry would be 1-11 with 36 Spikeball Pro Nets' schedule, so
        they better be thankful for whoever put that "random" schedule into Sleeper. Bye Week
        Curious would be 1-11 with BBCU or WalterPickens schedule. The Barkley Brawlers have had the
        best possible schedule for them, and would be 2-10 with Super Ja'Marrio Bros.' or
        WalterPickens' schedule.
      </p>
    </div>
  );
};

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

const MotWDangerArticle = () => {
  return (
    <div>
      <ArticleHeader>MotW Possibilities</ArticleHeader>
      <ArticleSubheader>Hubbell Curse 2.0</ArticleSubheader>
      <DangerTable data={dangerTable} />
      <ArticleCaption>MotW Danger Metric</ArticleCaption>
      <p>
        The Hubbell Division is dealing with the MotW trap, and hoping it doesn't linger too long
        into the playoffs. It is possible for at least 3 of these teams to make the playoffs, but
        MotW could also get sucked into the toilet bowl if things break right.
      </p>
      <p>
        Super Ja'Marrio Bros. has not been in MotW this season, and they got their second step to
        dodging it with a BBCU win in week 12. Now they just need an Uncle Rico Went Pro win in week
        13 to successfully dodge MotW in the Hubbell Curse gauntlet.
      </p>
      <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
      <ArticleImage src={motwFuture} />
      <ArticleCaption>
        This will get fixed eventually to be less shitty and not an image.
      </ArticleCaption>
    </div>
  );
};

const LeagueBuzzArticle = () => {
  return (
    <div>
      <ArticleHeader>League Buzz</ArticleHeader>
      <ArticleSubheader>The Gang Goes Green</ArticleSubheader>
      <p>
        This week the groupchat suddenly turned green. Many people were quick to blame Alec, who
        sent a message that divided the groupchat into 2, but Alec claimed it was not his fault. The
        real blame goes on Anthony and Josh who are traveling right now and turned the groupchat
        green during their travels. Josh requested an extension on his video due to the lack of
        shots/dogs available in Tunisia, but this request came after his initial deadline, so the
        validity is unclear since he had plenty of time to do this before he left.
      </p>
      <LeagueQuote>
        "Requesting extension bc they don't have alc or hot dogs here
        <br />
        If denied I will turn on my roaming and blow up the group chat like Anthony this is not a
        negotiation"- josh in Discord at 1:54AM ET on Tuesday 11/25/25
      </LeagueQuote>
      <p>
        Josh is going back into MotW in week 13, so it is possible he racks up another punishment
        before he is able to do this one. This is all due to the fact that the schedule was
        incorrect last week, and would've been avoided had Greg actually lost MotW in week 11 like
        he should've.
      </p>
      <ArticleSubheader>League Submissions</ArticleSubheader>
      <LeagueQuote>
        "I'm starting to think Alec might not be that good at Fantasy Football..."
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>You can say that again.</p>
      <LeagueQuote>
        "Devan should be the loser this year not me!"
        <br />- Alec
      </LeagueQuote>
      <p>Good one Alec.</p>
      <LeagueQuote>
        "Happy Thanksgiving! &lt;3"
        <br />- Jake
      </LeagueQuote>
      <p>
        Happy Thanksgiving! The Offensive Line is thankful for everyone here and for the Sleeper
        API.
      </p>
      <LeagueQuote>
        "Desert winds and fantasy scores,
        <br />
        My camel trots through sandy floors.
        <br />
        While checking stats on mobile screen,
        <br />
        The dunes ahead stay vast and green.
        <br />
        <br />
        My running back just scored a touchdown—
        <br />
        The camel grunts, keeps plodding down.
        <br />
        Two worlds collide in strangest way:
        <br />
        Ancient ride meets modern play."
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>Chief Correspondent ChatGPT weighs in on another anonymous poem:</p>
      <p>
        This playful poem succeeds in capturing the absurdity of modern life intruding on ancient
        landscapes, with the image of checking fantasy scores atop a plodding camel offering genuine
        charm. The rhyme scheme moves along breezily, and there's real wit in the contrast between
        "ancient ride meets modern play." However, some phrases feel rushed—particularly the
        puzzling "dunes ahead stay vast and green"—and the forced rhyme of "touchdown/plodding down"
        disrupts the otherwise smooth rhythm. Still, it's an entertaining bit of light verse that
        manages to smile at our screen-addicted culture without taking itself too seriously.
      </p>
    </div>
  );
};

const Meme1 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/UdlpQcC.png"}></ArticleImage>
      <ArticleCaption>Submitted by Greg</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <div
        dangerouslySetInnerHTML={{
          __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DRcPW-7kWjL/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DRcPW-7kWjL/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DRcPW-7kWjL/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by @jpsoccer59_cards</a></p></div></blockquote>
            <script async src="//www.instagram.com/embed.js"></script>`,
        }}
      />
      <ArticleCaption>Submitted by Jake</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/NLZqEMX.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/AkSoPEe.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/7dMpwB9.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/snAixCp.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/haZfaff.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/aZv9S0W.png"}></ArticleImage>
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
  {
    id: 10,
    content: StandingsArticle,
  },
  {
    id: 11,
    content: PowerRankingsArticle,
  },
  {
    id: 12,
    content: PlayoffOutlookArticle,
  },
  {
    id: 13,
    content: AlternateUniverseArticleOne,
  },
  {
    id: 14,
    content: AlternateUniverseArticleTwo,
  },
  {
    id: 15,
    content: AlternateUniverseArticleThree,
  },
  // {
  //     id: 16,
  //     content: DivisionArticle,
  // },
  {
    id: 17,
    content: MotWDangerArticle,
  },
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
    title: "2025 Week 12",
    description: "Testing this feature out to see if it works",
    image: "/banner_logo.png",
  },
};

export default newsletterData;
