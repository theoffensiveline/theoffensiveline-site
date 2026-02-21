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
  TradesLineChart,
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
import motwFuture from "./motwFuture.png";
import tradeHistory from "./tradeHistory.json";

export const newsDate = "2024-11-21";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 11</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        This is the 4th straight week that the highest scoring team has played the lowest scoring
        team, and the 5th straight week that the highest scoring team has served up the biggest
        blowout. This was the 2nd straight week that Costo Guys were the top team of the week,
        putting up the 4th highest score of any team this season. They played against the team that
        scored the 3rd lowest score of the season, Kirk Thuggins & The Boys. This resulted in the
        2nd biggest blowout of the season.
      </p>
      <p>
        We also had a pretty close game this week, being decided by only 2.82 points, 5th closest
        this season, between First Down Syndrome and Calvin's Cold Streak. First Down Syndrome was
        the worst winner this week in this game. First Down Syndrome got carried by the MVP and
        Tightest End this week, Taysom Hill. Hill scored 41.52 points, the #1 TE of the season, and
        scored 35.53% of First Down Syndrome's points, the 2nd highest percentage of the season.
      </p>
      <p>
        The best loser had 8 more points than the worst winner did, with League Camera Prophecy
        scoring 124.46 points. They lost despite having the #3 RB performance of the season, Joe
        Mixon scoring 35.3 points. They left 45.5 points on their bench in this game, so they easily
        could've avoided the title of best loser.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        The Costo Guys were the best manager of the week on all fronts, putting up the most points
        at 100% efficiency. League Camera Prophecy had the 5th most points, but only had 73.2%
        efficiency. The 2nd lowest percentage was from the team in last this week, Kirk Thuggins &
        The Boys, who scored 80.1% of their maximum, but still had the lowest potential maximum
        points.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>The Prophecy Did Not Continue</ArticleSubheader>
      <p>
        Youngster Joey was not a believer of the MotW Prophecy, ruining the opportunity for a
        Fortnite Master Builder victory by scoring more points than them. These points came
        primarily from Justin Herbert and Saquon Barkley, with help from the rest of their skill
        position players too. Their kicker and defense weren't much help, but they were important to
        getting the W as well.
      </p>
      <p>
        Fortnite Master Builder had great performances from Bo Nix and Achane, both putting up over
        20 points. They even got double digit points from the defense in this one, but their RBs
        were outclassed by Youngster Joey's RBs. Brandon McManus also shit the bed, only chipping in
        2 points. Luckily they only ended up with 3 shots/dogs, but this will likely increase after
        another delayed video.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        Youngster Joey will bring MotW to Twin Bowers in week 12 in a classic Hubbell vs Hubbell
        matchup. Fortnite Master Builder will play against League Camera Prophecy in the failed
        prophecy rematch.
      </p>
      <ArticleSubheader>Matchup of the Week 2023-24</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
      <ShotsDistributionChart chartData={shotsDistData} />
    </div>
  );
};

const MatchupArticleTwo = () => {
  return (
    <div>
      <ArticleHeader>Matchup #2</ArticleHeader>
      <ArticleSubheader>The Taysom Hill Game</ArticleSubheader>
      <p>
        George Kittle out? No problem for First Down Syndrome since they've got Taysom Hill to fill
        in and put up an MVP performance in this game. T. Hill putting up more than 40 points for
        First Down Syndrome wouldn't have been too surprising to start the season, but the fact that
        it has only happened once and it wasn't Tyreek is very surprising. Jalen Hurts had a floor
        game with Saquon going off, but 18 is a great floor which helped secure the win.
      </p>
      <p>
        Calvin's Cold Streak didn't get enough points from their TE, K or DEF this week. They had
        enough points from their QB, RB and WRs if they just got average performances from their
        other players. Ja'Marr Chase and Josh Jacobs both put up over 20 points, and Najee, Addison,
        and Geno all put up double digits. They will need Kelce to get more than 3 if they want to
        win any more games this season.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        First Down Syndrome will matchup with Just Joshin pt. 2 in week 12, and Calvin's Cold Streak
        will play against Pink Pony Kupp.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>Fight For 7-4</ArticleSubheader>
      <p>
        This was a matchup of 2 6-4 teams, and only one could come out of this game at 7-4. Pink
        Pony Kupp was successful in that, putting up the 2nd most points this week behind 7-4 Costo
        Guys. Joe Burrow was the QB1 this week with 29.04 points, and Cooper Kupp and David
        Montgomery also put up 24 or more. HOU Defense also decided to drop 20 points after this
        matchup was already decided.
      </p>
      <p>
        Just Joshin pt. 2 only had Josh Allen go over 20 points this week, and only put up the 8th
        most points of any team this week. Bijan, Devonta Smith, and Aaron Jones let them down this
        week. Everyone else put up respectable numbers, but it was tough to beat Pink Pony Kupp
        without some boom games.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        Pink Pony Kupp will matchup with Calvin's Cold Streak in week 12, and Just Joshin pt. 2 will
        play against First Down Syndrome.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>Twin Bowers Booms</ArticleSubheader>
      <p>
        Brock Bowers got overshadowed by Taysom Hill this week, but he went for 31.3 points in this
        one, propelling Twin Bowers to victory over League Camera Prophecy. Twin Bowers also got
        solid production from Jordan Love, Chase Brown, D'Andre Swift, and his K and DEF. Their WRs
        were underwhelming this week, but luckily they outscored the other teams TE by 31.3 points.
      </p>
      <p>
        League Camera Prophecy got a huge game from Joe Mixon, but wasted it by leaving 45.5 points
        on their bench. Tucker Kraft ended with 0 points, and their benched TE Jonnu Smith ended
        with 28.1 points. That one decision could haunt them if they end up falling down towards the
        last place punishment.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        Twin Bowers will head into MotW against Youngster Joey in week 12, and League Camera
        Prophecy will face off against Fortnite Master Builder in week 12.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>Costo Guys Still Bringin' It</ArticleSubheader>
      <p>
        Costo Guys absolutely dominated their opponent for the 2nd straight week, winning by the 2nd
        widest margin of any game this season. Amon-Ra and Breece nearly combined for enough to win
        this matchup, and Chris Boswell also scored 25.3 points, 2nd only to Jake Moody's 27.3
        points for Costo Guys in week 1. This team could go undefeated the rest of the way and run
        away with the championship with the roster they've built this season.
      </p>
      <p>
        Kirk Thuggins & The Boys had an awful week this week. You can barely read their players on
        this chart it was so bad. Kamara, JT, and CMC were thought to be a deadly threesome, but
        instead they couldn't outscore Amon-Ra with their 3 scores combined.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        Costo Guys will matchup with Giving Me a Chubb in week 12, and Kirk Thuggins & The Boys will
        play against Just a Hospital Ward.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>Win-Win Trade?</ArticleSubheader>
      <p>
        Just a Hospital Ward put up the most points they've put up since week 5 this week, thanks in
        part to the players they were able to acquire via trade after their loss last week. They
        traded away James Cook and Amon-Ra St. Brown for Rhamondre, Puka, and Njoku. All 5 of these
        guys did well this week, and helped lead their teams to victory. Both of their teams would
        have won regardless, but this trade could have long-lasting impact on both the last place
        race and the championship race.
      </p>
      <p>
        Giving Me A Chubb did not have much success this week. Their highest scoring player was Will
        Dissly. That is not a recipe for success. Patrick Mahomes continues to be a bad fantasy QB,
        and they chose to start Noah Brown over Nick Chubb or Amari Cooper. Could this be another
        fall from grace this season?
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        Just a Hospital Ward will matchup with Kirk Thuggins & The Boys in week 12, and Giving Me a
        Chubb will face off against Costo Guys.
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
      <p>A wide range of outcomes this week, with the top 2 teams playing each other yet again.</p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>This week looks like a slightly better version of last week by every measure here.</p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>
        Fortnite Master Builder had their 5th close defeat this past week, and are now 2-5 in games
        decided by less than 10 points this season. First Down Syndrome, who is one spot ahead of
        them in the standings, had their 3rd close victory of the season this week, winning by only
        2.82 points.
      </p>
    </div>
  );
};

const StandingsArticle = () => {
  return (
    <div>
      <ArticleHeader>Standings & Points</ArticleHeader>
      <ArticleSubheader>Current Standings</ArticleSubheader>
      <LeaderboardTable leaderboardData={leaderboardData} />
      <p>
        Costo Guys retakes first place, with the most PF and the least PA, both by an even wider
        margin than last week. The only teams who did not move were them and First Down Syndrome,
        who remained in 11th place. Youngster Joey moved up 3 spots thanks to their win, and Twin
        Bowers moved up into the playoff hunt with their win.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        Costo Guys continue to make the middle of this chart appear more and more crowded with how
        far away they are getting from everyone else on both axes. Just a Hospital Ward and First
        Down Syndrome remain on the bad side, and Twin Bowers remains on the unlucky side but is
        getting approached by Kirk Thuggins & The Boys and Giving Me a Chubb.
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
        Team Ability of 100 would mean you were the best team every week, and 0 would mean that you
        were the worst team every week.
        <br />
        Strength of Schedule of 100 would mean you played the best team every week, and 0 would mean
        that you played the worst team every week.
      </ArticleCaption>
      <p>
        Costo Guys remains at the top of the power rankings, and won't be coming down any time soon.
        Pink Pony Kupp overtook 2nd from Just Joshin pt. 2, and Twin Bowers jumped 3 spots to #6.
        Kirk Thuggins & The Boys fell to #10, but remain firmly ahead of the bottom 2 teams.
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
        WalterPicks is working on a playoff odds calculation, and this is the first ever output of
        that. This is based on the future projections that WalterPicks has, and accounts for
        upcoming bye weeks and matchup difficulty. The big differences here are that the projections
        hate Just a Hostpital Ward and League Camera Prophecy, and are higher on Calvin's Cold
        Streak and the bottom dwellers.
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
        Not much is different aside from Giving Me a Chubb being 4 spots higher, and Calvin's Cold
        Streak being 4 spots lower.
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
        Just a Hospital Ward remains in first place in the best ball standings after breaking their
        3 game losing streak. Giving Me a Chubb would also be much higher in a best ball world.
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
        We still have a winless possibility after 11 weeks, First Down Syndrome would be 0-11 with
        Twin Bowers schedule. Costo Guys would be 10-1 with League Camera Prohpecy's schedule. Just
        Joshin pt. 2 would be 10-1 with Costo Guys' schedule. Just Joshin pt. 2 has the largest
        hypothetical gains from having another team's schedule, gaining 4 wins from their current
        record. Calvin's Cold Streak has had their best possible schedule so far this season.
      </p>
    </div>
  );
};

const MotWDangerArticle = () => {
  return (
    <div>
      <ArticleHeader>MotW Possibilities</ArticleHeader>
      <ArticleSubheader>4 Teams Left</ArticleSubheader>
      <DangerTable data={dangerTable} />
      <ArticleCaption>MotW Danger Metric</ArticleCaption>
      <p>
        This table is an embodiment of why there was a contingent of managers asking for a more
        random schedule before the season. We now have a closed loop of 4 managers who will be
        completing 3 MotW punishments between them to end the regular season. Youngster Joey and
        Twin Bowers are both in a position where they could have to do it twice in 3 weeks.
      </p>
      <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
      <ArticleImage src={motwFuture} />
      <ArticleCaption>
        This will get fixed eventually to be less shitty and not an image.
      </ArticleCaption>
    </div>
  );
};

const TradingVolumeArticle = () => {
  return (
    <div>
      <ArticleHeader>Trading Volume</ArticleHeader>
      <TradesLineChart tradeHistory={tradeHistory} />
      <p>
        This season had the highest trading volume in recorded history, even if you remove all of
        the FAAB for FAAB meme trades. The trade analysis at the end of the season will be epic.
      </p>
    </div>
  );
};

const LeagueBuzzArticle = () => {
  return (
    <div>
      <ArticleHeader>League Buzz</ArticleHeader>
      <ArticleSubheader>Anthony Gets Some Backhanded Compliments</ArticleSubheader>
      <LeagueQuote>
        "Anthony doesn't like pickles and that's okay because he's a pretty cool dude"
        <br />- Alec
      </LeagueQuote>
      <LeagueQuote>
        "Anthony is a good kisser..."
        <br />- Alec
      </LeagueQuote>
      <p>Not letting this one slip by without a mention.</p>
      <LeagueQuote>
        "Anthony adds good value to the group because he is easy to bully..."
        <br />- Alec
      </LeagueQuote>
      <LeagueQuote>
        "Anthony's bad haircuts bring out his beautiful baby blues"
        <br />- Alec
      </LeagueQuote>
      <p>
        Some managers thought this was a one week arrangement as a result of their previous matchup,
        but apparently it is based on the next loss. New rule of thumb, don't make bets that extend
        beyond your realm of control. We should not be punished because Nikhil couldn't score enough
        points.
      </p>
      <ArticleSubheader>The Offensive Line Gets Noticed By Sleeper</ArticleSubheader>
      <LeagueQuote>
        "My friends bf works for Sleeper so I showed him the Line and he asked me for the link to
        take it back to work"
        <br />- Alec
      </LeagueQuote>
      <p>
        Guys it's been a good run, but we're big time now. This newspaper will either be fully AI
        generated or super right wing republican when we go corporate, so get ready for that.
      </p>
      <ArticleSubheader>Trade Deadline Has Passed</ArticleSubheader>
      <LeagueQuote>
        "The players Jake tried to trade me last week are now on the waver wire #fleeced"
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>
        Now that the trade deadline is over, a few players that were trade bait have been dropped by
        those managers. Absolutely fleeced.
      </p>
    </div>
  );
};

const Meme1 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9b3oq1.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9b3plq.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9b3p1c.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by Anthony</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9b3p3g.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by Anthony</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9b3pam.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by Josh K</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9b3po8.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9b3pxm.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9b3q36.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme9 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9aooxz.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by Anthony</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme10 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9b9zah.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by Greg</ArticleCaption>
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
    content: TradingVolumeArticle,
  },
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
