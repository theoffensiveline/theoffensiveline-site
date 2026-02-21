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
import { leagueIds } from "../../../components/constants/LeagueConstants";

export const newsDate = "2025-10-02";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 3</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        Week 3 brought us our first perfect manager of the season, one of the biggest upsets in
        league history, and a new best loser of the season. It will also be tough for anyone to top
        32 points put up by MIN DEF for the rest of the season.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        We finally had our first perfect manager this week. Super Ja'Marrio Bros. achieved 100%
        efficiency, leaving zero points on their bench. On the flip side, Deep Shot to Kirk was our
        least skilled manager, only getting 67.9% of their possible points. They left 34.76 points
        on the bench, which would have been more than enough to win their matchup.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>D.K. Lost a Minion Stays Perfect in MotW</ArticleSubheader>
      <p>
        D.K. Lost a Minion continued their perfect start to the season with a victory over
        WalterPickens in MotW. They were led by Jonathan Taylor's 32.8 points and got solid
        contributions from Jordan Mason and the IND DEF. This win keeps them as one of only two 3-0
        teams in the league, and extends their MotW winning streak to 4 games dating back to last
        season.
      </p>
      <p>
        WalterPickens had a decent week with 113.64 points but couldn't keep up with D.K. Lost a
        Minion's explosion. They got good games from Christian McCaffrey and Will Reichard, but
        their quarterback situation continues to be a problem. This loss drops them to 1-2 and puts
        them in danger of falling out of playoff contention.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        D.K. Lost a Minion will look to stay perfect against fellow undefeated team BBCU in week 4.
        WalterPickens will face off against Bye Week Curious in week 4 in a must win games for both
        of these 1-2 teams.
      </p>
      <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleCaption>
        <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
      </ArticleCaption>
      <p>
        D.K. Lost a Minion gets their 13th MotW victory, and WalterPickens gets their 5th loss, tied
        for 3rd most in league history.
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
      <ArticleSubheader>BBCU Gets a Mickey Mouse Win</ArticleSubheader>
      <p>
        BBCU continued their dominant start to the season with a narrow victory over Lord of the
        Littles. They were led by their defense and got solid contributions from Jaxon Smith-Njigba
        and Trey McBride. This undeserved win makes them one of only two 3-0 teams in the league.
      </p>
      <p>
        Lord of the Littles had a strong showing with 131.4 points but started an injured QB so they
        gave the game away for free. They got excellent games from Garrett Wilson and Cam Skattebo,
        but their boneheaded mistake made none of that matter. This loss drops them to 2-1 but they
        remain in good position in the standings despite their blunder.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        BBCU will face off against D.K. Lost a Minion in week 4's MotW, a battle between two of the
        league's best teams. Lord of the Littles will look to bounce back against Luck of the Dog in
        week 4.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>Upset of the Century</ArticleSubheader>
      <p>
        Bye Week Curious scored less than 73 points each of the first two weeks, but the A.J. Brown
        revenge game put them over the hump this week and they put up a whopping 85.92 points. Those
        22.9 points from A.J. Brown were the most that this team has had from any player this
        season, and they were somehow the MVP of the week, scoring an embarrassing 26.7% of this
        team's points this week.
      </p>
      <p>
        Deep Shot to Kirk had their worst week of the season with only 73.56 points. They would've
        beaten Bye Week Curious in either week 1 or week 2 with this score, but it wasn't enough in
        week 3. This cost everyone to lose in survivor this week, since nobody thought that Bye Week
        Curious could win a game with this lineup. If they hadn't traded A.J. Brown to Bye Week
        Curious, they very likely would've won this matchup.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        Bye Week Curious will look to build on this win against WalterPickens in week 4. Deep Shot
        to Kirk will face off against another winless team in week 4, Singing Like Mariah Terry.
        Let's see if they struggle again against a winless team.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>Costo Guys Get First Win</ArticleSubheader>
      <p>
        Costo Guys finally broke through with their first win of the season, defeating Singing Like
        Mariah Terry handily. They were led by Lamar Jackson, Jahmyr Gibbs, and Jake Ferguson. This
        win keeps them from falling to 0-3 and gives them hope for the rest of the season. Their WR
        room is awful, and they continue to play the Ravens defense every week despite them going
        negative twice now.
      </p>
      <p>
        Singing Like Mariah Terry had a disappointing week with only 88.76 points, leaving 38.3
        points on their bench. This was their first week being let down by Patrick Mahomes, and
        everyone else continued to disappoint them as well as they have in previous weeks. Ricky
        Pearsall was the only bright spot this week with nearly 20 points.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        Costo Guys will look to build on this win in their matchup against Super Ja'Marrio Bros. in
        week 4. Singing Like Mariah Terry will face off against Deep Shot to Kirk in week 4, hoping
        to avoid falling to 0-4.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>First Down Syndrome Dominates</ArticleSubheader>
      <p>
        First Down Syndrome absolutely crushed, scoring 145.64 points which was the second highest
        score of any team this season. They were led by Jalen Hurts and Mark Andrews, with solid
        contributions from Amon-Ra St. Brown and Nico Collins as well. This win did not go
        unnoticed, and they had the top QB and TE of the week.
      </p>
      <p>
        Luck of the Dog had a decent week with 125.12 points, but it wasn't nearly enough to compete
        with First Down Syndrome. They got good games from Josh Allen, Kenneth Walker, and Keenan
        Allen, but Derrick Henry and Kyle Pitts let them down. This loss drops them to 1-2 but they
        remain in the 6th spot in the standings thanks to their strong PF.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        First Down Syndrome will face off against The Barkley Brawlers in week 4 in a division
        matchup. Luck of the Dog will look to bounce back against Lord of the Littles.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>The Barkley Bawlers</ArticleSubheader>
      <p>
        Super Ja'Marrio Bros. had their second best week of the season with a victory over The
        Barkley Brawlers. They were led by Courtland Sutton, Kyren Williams, and SEA DEF. Their only
        disappointments were Ja'Marr Chase, Sam LaPorta, and Brandon Aubrey, who all scored less
        than 10 points. They got the win despite that, which moves them to 2-1.
      </p>
      <p>
        The Barkley Brawlers had a disappointing week with only 98.28 points. They are rostering 3
        QBs and 3 TEs and still can't manage to get more than 13 points from either position. Their
        WR didn't do great either, and Saquon scoring less than 10 points makes it really hard for
        them to win a game. If their kicker and defense didn't put up double digits, this could've
        been one of the worst performances of the season.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        Super Ja'Marrio Bros. will look to continue their strong play against Costo Guys in week 4.
        The Barkley Brawlers will face off against First Down Syndrome in week 4.
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
      <p>
        This week had some higher scoring teams clustered up, and had another low score, as is a
        weekly trend so far.
      </p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>
        This chart is beginning to take shape, with all 3 weeks being pretty similar, but week 3 had
        the highest median score so far this season. The one really low score every week is very
        funny and hopefully it continues for the sake of content.
      </p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>
        Week 3 had BBCU's 4.9 point victory over Lord of the Littles being the single close game of
        the week. Only having 2 close games so far this season is interesting to say the least.
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
        BBCU and D.K. Lost a Minion remain the only undefeated teams at 3-0, while Singing Like
        Mariah Terry is the only winless team at 0-3. Bye Week Curious finally got their first win
        but still has the lowest points for in the league. Deep Shot to Kirk has some of the lowest
        points against in the league, but sits at 1-2 in 10th place due to their PF being below 300.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        Saying BBCU is lucky is an understatement. They got a free win this week thanks to Lord of
        the Littles starting an injured QB. You can't take away that they have the highest points
        for in the league, but you can say they are extremely lucky. Bye Week Curious continues to
        be really bad, but is moving in the lucky direction after their win this week against Deep
        Shot to Kirk.
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
        Deep Shot to Kirk is unsurprisingly the biggest faller this week, dropping 6 spots down to
        11th place after their brutal loss to Bye Week Curious. The biggest riser is First Down
        Syndrome, jumping 4 spots up to 5th place. Glizzy Gobblers and Singing Like Mariah Terry
        have had the toughest schedules this season, and are at 1-2 and 0-3 respectively, but rank
        much better in the Power Rankings thanks to their strong performances in their losses.
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
        BBCU and D.K. Lost a Minion are the two 3-0 teams and WalterPicks has them both around 95%
        to make the playoffs. Deep Shot to Kirk has the next highest playoff odds at 80% despite
        being 1-2 and in 10th place. Remember these playoff odds are based on future projections,
        and they have Rashee Rice waiting to cook everyone starting in week 7. WalterPicks really
        doesn't believe in Costo Guys, WalterPickens, or Singing Like Mariah Terry, all below 30% to
        make the playoffs. Bye Week Curious remains at 1% playoff odds despite getting their first
        win this week.
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
        BBCU and D.K. Lost a Minion are both 3-0 against the median, showing their dominance isn't
        just due to schedule. Singing Like Mariah Terry is 0-3 against the median, confirming
        they've been the worst team through 3 weeks. The median standings closely mirror the actual
        standings, showing that any luck hasn't really swung anything too far yet.
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
        BBCU sitting at the top with the most PF and the fewest PA in the league is interesting.
        They have been dominant but have also caught people in their worst weeks. Deep Shot to Kirk
        would be the biggest riser since they would've won this week, and First Down Syndrome would
        be the biggest faller.
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
        This is starting to be somewhat helpful. 3-0 BBCU would be 1-2 with Glizzy Gobblers
        schedule. 1-2 Costo Guys would be 3-0 with D.K. Lost a Minion's schedule. 3-0 D.K. Lost a
        Minion would be 1-2 with Singing Like Mariah Terry's schedule. 0-3 Singing Like Mariah Terry
        would be 2-1 with a ton of different schedules.
      </p>
    </div>
  );
};

const MotWDangerArticle = () => {
  return (
    <div>
      <ArticleHeader>MotW Possibilities</ArticleHeader>
      <ArticleSubheader>First Down Syndrome and BBCU in MotW Danger</ArticleSubheader>
      <DangerTable data={dangerTable} />
      <ArticleCaption>MotW Danger Metric</ArticleCaption>
      <p>
        With D.K. Lost a Minion and BBCU battling in week 4, Costo Guys and Deep Shot to Kirk are in
        the direct line of fire for MotW. Deep Shot to Kirk could come back into MotW against BBCU
        after losing week 1's MotW to D.K. Lost a Minion. Lord of the Littles is 2 weeks away from
        their first every MotW appearance, they'd need a BBCU win and then a Deep Shot to Kirk win
        in week 5 to get put into it.
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
      <ArticleSubheader>Losing by 4.9 with an Out QB</ArticleSubheader>
      <p>
        Lord of the Littles lost by 4.9 points to BBCU with an out QB. This type of mistake allowing
        another team to start out 3-0 is so tough to see for any manager that is competing for the
        championship, not just trying to avoid last place. Being a top seed is so important to get
        the bye week, and every win matters along the way. Allowing someone to win because you
        didn't set your lineup in week 3 could alter the course of the entire season. Maybe you'd be
        the one with 95% playoffs odds instead of them.
      </p>
      <ArticleSubheader>League Submissions</ArticleSubheader>
      <LeagueQuote>
        "Commish doesn't even know you can double click the bottom corner of a cell to have it fill
        in the rest of a column's info - pathetic "<br />- Anonymous League Manager
      </LeagueQuote>
      <p>
        This really is a personal preference issue here, don't think this is as egregious as this{" "}
        <i>anonymous</i> league manager is making it out to be.
      </p>
      <LeagueQuote>
        "I didn't say that"
        <br />- josh
      </LeagueQuote>
      <p>I wonder what this is in reference to?</p>
      <LeagueQuote>
        "Anthony has an undeserved win"
        <br />- josh
      </LeagueQuote>
      <p>Oh maybe this? Interesting...</p>
      <LeagueQuote>
        "Let's highlight the manager named Trevor.
        <br />
        He thought himself oh very clever.
        <br />
        With Walter steering him awry,
        <br />
        And his players not scoring so high,
        <br />
        His chances of winning were: Never."
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>
        Funny to write this one up about the reigning champion of the league. See that little gold
        medal in Sleeper? Who has that? Oh right, Trevor does. Scoreboard.
      </p>
      <LeagueQuote>
        "Good QB lmao"
        <br />- Anthony
      </LeagueQuote>
      <p>
        Anthony clearly throwing some shade at Josh Little for starting a QB who was out this week.
        Weird to throw shade at someone who let you get a free win, but agree with the sentiment as
        someone who didn't directly benefit from this action (or lack thereof).
      </p>
    </div>
  );
};

const VideoMeme = () => {
  return (
    <ImageWrapper>
      <iframe
        title="Streamable Video"
        width="100%"
        height="320"
        src="https://streamable.com/e/8y12dg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <ArticleCaption>Submitted by Colin</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme1 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a78d3z.jpg"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a78f9g.jpg"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a78dpb.gif"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a78ezh.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a78fkc.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by Alec</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a78fpw.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a78g63.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a78gdk.jpg"}></ArticleImage>
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
    content: LeagueBuzzArticle,
  },
  {
    id: 17,
    content: VideoMeme,
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
