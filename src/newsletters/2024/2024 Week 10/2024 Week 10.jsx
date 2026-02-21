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

export const newsDate = "2024-11-14";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 10</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        We have a new low this season, thanks to Just a Hospital Ward putting up only 61.58 points.
        This was their second straight week with the lowest score, and was also their second
        straight week playing against the top team of the week in the biggest blowout of the season.
        They have lost the last two weeks by a combined 163.06 points.
      </p>
      <p>
        After being the highest scorer in the biggest blowout last week, Fortnite Master Builder was
        the worst winner in the closest matchup this week. They were able to beat Twin Bowers by
        1.88 points this week while scoring 103.82 points. This is the 4th lowest score of any
        winner this season. Twin Bowers finally had an easy game and they couldn't get the win. Talk
        about playing to the level of your competition.
      </p>
      <p>
        Just Joshin pt. 2 was the best loser for the second straight week, this time with the 4th
        highest score, going up against the 3rd highest scorer, Calvin's Cold Streak. Calvin's Cold
        Streak was able to achieve this victory thanks to the #1 MVP performance of the season from
        Ja'Marr Chase, scoring 55.4 points for over 40% of the teams points this week. They also had
        the #1 TE this week, Travis Kelce, score 20.4 points.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        This was a great week for management, with the highest points left on the bench was only
        13.8 points from Just Joshin pt. 2, and the lowest % of maximum points was 84% from Just a
        Hospital Ward. Giving Me a Chubb was at 100% efficiency, and Calvin's Cold Streak was really
        close at 99.6% efficiency.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>The Prophecy Must Continue</ArticleSubheader>
      <p>
        League Camera Prophecy's MotW win streak came to an end this week in an ugly fashion, losing
        by over 40 points to Youngster Joey and resulting in 6 shots/dogs. Their only players above
        10 points were Brock Purdy, Joe Mixon, and Terry McLaurin. Everyone else cost them a
        shot/dog, and the only bench player that could've helped them avoid one of those was ARI D
        instead of LAC.
      </p>
      <p>
        Youngster Joey had a monster week, scoring the 2nd most points of any team, and the 4th most
        points in any MotW game this season. If you said before the week that Saquon and DeAndre
        Hopkins were going to get single digit points, and they were going to start NYG defense,
        most managers would've guessed they'd be doing a record number of shots/dogs. Instead, all
        of their other players clutched up and scored at least 15 points, securing them the victory
        in MotW.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        As noted in the last edition of The Offensive Line, the MotW Prophecy is so back. League
        Camera Prophecy took the loss to Youngster Joey, pulling Fortnite Master Builder back into
        the MotW. Fortnite Master Builder can bring League Camera Prophecy back in if they can beat
        Youngster Joey next week. League Camera Prophecy will play against Twin Bowers in week 11
        and will anxiously await the MotW results.
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
      <ArticleSubheader>QB1 vs QB3</ArticleSubheader>
      <p>
        Besides Jalen Hurts and George Kittle, First Down Syndrome struggled to score points again
        this week, but that was outshadowed by the worst performance of the season from Just a
        Hospital Ward. This team wins when their players not named Hurts or Kittle do well, and they
        lose when they don't. They also had a -4 point performance from their defense this week,
        which is the lowest performance of the season from any player.
      </p>
      <p>
        Pink Pony Kupp had a solid week this week, putting up the 5th most points in the league. Joe
        Burrow had his second straight week as the QB1, and their other players all put up good
        enough numbers. Jake Moody could've put up a Joe Burrow style performance, but he missed 3
        long field goals.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        First Down Syndrome will matchup with Calvin's Cold Streak in week 11, and Pink Pony Kupp
        will face off against fellow 6-4 team, Just Joshin pt. 2.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>The Ja'Marr Chase Game</ArticleSubheader>
      <p>
        This was the matchup between the 3rd and 4th highest scoring teams of the week, and
        currently the 2nd and 4th teams in the standings. Calvin's Cold Streak is on a 4 game win
        streak, going from 2-4 to 6-4 and from 10th place to 4th place in the standings. Their top
        player this week, Ja'Marr Chase, scored 40% of their points, the most of any player this
        season. Their top 3 players combined for over 100 points. If Chase can keep having boom
        weeks, this team is a playoff threat.
      </p>
      <p>
        Just Joshin pt. 2 scored the 4th most points this week, but that was not enough to get the
        win to move to 7-3. Instead they fall to 6-4 after their 2nd straight loss as the best
        loser. Bijan was the RB1 this week, but Devonta Smith and the Josh Allen stack with Shakir
        let them down this week. If their loss streak continues they could be in trouble.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        Calvin's Cold Streak will play against First Down Syndrome in week 11, looking to build on
        their 4 game win streak. Just Joshin pt. 2 will face off against Pink Pony Kupp in week 11.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>Twin Bowers Chokes Rare Easy Game</ArticleSubheader>
      <p>
        This was the closest game of the week, and the 3rd closest game this season. This game was
        decided by less than 2 points, and the winner was not clear until the final play of the
        Monday Night Football game. A Matthew Stafford interception or De'Von Achane fumble could've
        changed the outcome of this one. For Fortnite Master Builder, their best performers were
        Courtland Sutton and Kareem Hunt. That is not a top duo that inspires victory, but everyone
        on their team put up at least 7 points, which is a solid floor.
      </p>
      <p>
        Twin Bowers has had the hardest schedule in the league this season, and they finally had a
        game where their opponent could barely score triple digits. Sadly, they could also barely
        score triple digits in this one. Sam Darnold only scored 6.44 points in a super easy matchup
        against Jacksonville, where QBs have been dominant all season. The Vikings won that game
        12-7 on 4 field goals. If Darnold even came close to his projections Twin Bowers would have
        won this game.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        Fortnite Master Builder will play against Youngster Joey in MotW in week 11, and Twin Bowers
        will face off against League Camera Prophecy in week 11.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>BUF D Outscores Everyone</ArticleSubheader>
      <p>
        Giving Me a Chubb did not reach triple digit points this week, but they did manage their
        team perfectly with 0 points on their bench. It is a tough look when your maximum possible
        points is 99.04 points. Their top scorer was Patrick Mahomes with 16.54 points, and Tyrone
        Tracy was a close second with 15.4 points. Their WRs were not up to the task this week, only
        totaling 13.7 points between the 2 of them. This team has lost 4 out of their last 5 games
        after starting 4-1.
      </p>
      <p>
        Kirk Thuggins & The Boys were able to put up an above average performance this week, scoring
        120.94 points. Their RBs and WRs put in their fair share, but their top scorer was the
        biggest D this week, BUF D. This is the #4 DEF performance of the season. This was the first
        time this season that a defense was the #1 scorer in a matchup.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        Giving Me a Chubb will play against Just a Hospital Ward in week 11, while Kirk Thuggins &
        The Boys will face off against Costo Guys.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>Unlikely Trade Partners</ArticleSubheader>
      <p>
        Costo Guys put up the most points in the league this week with 146.6 points, more than
        doubling the score of their opponent. We were less than 5 points away from this being a
        victory that was achievable with only 2 players. Lamar and Chuba combined for 57.8 points
        this week, which was almost enough to beat Just a Hospital Ward. PHI D chipped in another 19
        points, so it is still pretty to get crushed by a QB, a Panthers RB, and a defense. They
        would've also won with the combination of Panthers RB, TE, K and DEF.
      </p>
      <p>
        Just a Hospital Ward put up the lowest score of any team this season, scoring only 61.58
        points. This was also the only time this season any team has had the potential for a 7
        shot/dog loss, and luckily for them this was not MotW. The only two players above 10 points
        were James Cook and Amon-Ra St. Brown, who they promptly traded to Costo Guys after this
        matchup.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        Costo Guys will play against Kirk Thuggins & The Boys in week 11, while Just a Hospital Ward
        will face off against Giving Me a Chubb.
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
      <p>A new low this week, but within 5 points of the previous low from this season.</p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>
        The upwards trend had to end eventually, and we took a dive this week at the top and at the
        bottom.
      </p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>
        Fortnite Master Builder got their 2nd close victory this week, after their 78 point victory
        last week. Twin Bowers suffered their first close defeat in that matchup. None of the other
        matchups this week were particularly close.
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
        Costo Guys retakes first place, with the most PF and the least PA, both by a pretty wide
        margin. The only team who did not move was First Down Syndrome, who remained in 11th place.
        Fortnite Master Builder jumped them moving up to 10th, and Just a Hostpital Ward took hold
        of 12th, by just a 4.5 PF margin.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        There are a lot of teams in the middle of this chart now, similar to how crowded the
        standings are. Costo Guys have cemented themselves fully in the lucky and good corner, and
        First Down Syndrome and Just a Hospital Ward have claimed the bad side of the chart. Twin
        Bowers moved closer to the rest of the group this week, but remains on the unlucky side of
        things.
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
        Costo Guys also reclaimed the top spot in the power rankings this week, which look pretty
        similar to the standings right now. Youngster Joey is up in 4th here, compared to 7th in the
        standings. They have been performing well in recent weeks, hence their jump. Twin Bowers has
        fallen down to 9th, which is the same as their standings position. This team could be on
        punishment watch if their schedule remains difficult, but their team ability is a fair bit
        ahead of the 3 teams below them.
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
        and standard deviation.
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
        The simulations have Just a Hospital Ward as a heavy favorite to do the punishment now, with
        over 50% odds. It remains true that nobody is truly safe, since there is only a 2 game gap
        between the top and bottom of the standings. This truly is the closest year yet.
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
      <p>Fortnite Master Builder would still be in last in this universe.</p>
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
        Just a Hospital Ward took their 3rd straight best ball loss this week. Giving Me a Chubb
        would be in first place if this were a best ball league.
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
        We still have a winless possibility after 10 weeks, First Down Syndrome would be 0-10 with
        Twin Bowers schedule. Costo Guys would be 9-1 with League Camera Prohpecy's schedule. Just
        Joshin pt. 2 would be 9-1 with Costo Guys' schedule. Costo Guys, Just Joshin pt. 2, Giving
        Me a Chubb, and Twin Bowers have the largest hypothetical gains from having another team's
        schedule, all gaining 3 wins from their current record.
      </p>
    </div>
  );
};

const MotWDangerArticle = () => {
  return (
    <div>
      <ArticleHeader>MotW Possibilities</ArticleHeader>
      <ArticleSubheader>4 Teams Became Safe Last Week</ArticleSubheader>
      <DangerTable data={dangerTable} />
      <ArticleCaption>MotW Danger Metric</ArticleCaption>
      <p>
        This week 4 more teams will be safe from regular season MotW possibilities. If you want to
        know who to root for this week for selfish reasons, look at this table. If you want to know
        who to root for this week for the prophecy to be fulfilled, root for Fortnite Master
        Builder.
      </p>
      <p>
        There is a world where League Camera Prophecy has to do 2 more punishments this season. If
        Fortnite Master Builder wins this week, they will play League Camera Prophecy next week. If
        League Camera Prophecy loses that, that is 1 punishment. Then Fortnite Master Builder plays
        First Down Syndrome week 13. If First Down Syndrome wins that, they will bring MotW back to
        League Camera Prophecy in week 14, which could result in a 2nd punishment.
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
        With the trade deadline looming, we wanted to showcase how the volume of trades this season
        compares to previous seasons. The addition of FAAB has increased the overall trading volume
        a ton. The solid blue line includes all trades this season. The dotted line includes only
        trades that had at least one player in them, removing any meme trades like $1 for $1 or $6
        for $9. Either way, we are on pace to set a league record in total number of trades,
        assuming we get a few more trades in before the deadline.
      </p>
    </div>
  );
};

const LeagueBuzzArticle = () => {
  return (
    <div>
      <ArticleHeader>League Buzz</ArticleHeader>
      <ArticleSubheader>Another Update on League Managers Who Fled The Country</ArticleSubheader>
      <LeagueQuote>
        "Anthony has a nice smile"
        <br />- Alec
      </LeagueQuote>
      <p>
        Something must've happened overseas between the two league managers who left the country.
        Alec has had Anthony on his mind when he wakes up every morning, telling the group chat
        something about Anthony that pleases him.
      </p>
      <LeagueQuote>
        "So what bet did Alec lose?"
        <br />- Matthew Smith
      </LeagueQuote>
      <p>
        Anthony is living rent free in Alec's head after their trip, and after beating him last week
        in fantasy.
      </p>
      <ArticleSubheader>An Update on Video Extensions</ArticleSubheader>
      <LeagueQuote>
        "I thought the Nikhil clause was already in effect"
        <br />- Nikhil
      </LeagueQuote>
      <p>
        Apparently Nikhil has been doing the appropriate amount of shots/dogs as a part of his
        submissions. It is not clear whether or not Josh did this last week, but his video was
        punishment enough either way.
      </p>
    </div>
  );
};

const Meme1 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9aek31.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9aekhr.jpg"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9aekpe.jpg"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9aelxx.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9aem8a.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9aemxx.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9aen8v.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/9aenk2.jpg"}></ArticleImage>
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
    id: 30,
    content: MotWRules,
  },
];
