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

export const newsDate = "2025-09-18";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 2</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        Things are starting to take shape in week 2. Players are building on past performances,
        we're getting more data on which teams are good and which teams are bad, and we're leaving
        tons of points on the bench collectively for the 2nd straight week. We had a new high score,
        another low score by Bye Week Curious, and the closest matchup in league history decided by
        only 0.04 points. This is mathematically the closest a game can be without tying, given that
        a passing yard is worth 0.04 points.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        There were no perfect managers again this week, and our least skilled manager was The
        Barkley Brawlers who only managed to get 65.4% of their total possible points. They could've
        been the top team this week if they optimized their lineup. Bye Week Curious could've gotten
        100% of his possible points and still would've lost to anyone's unoptimized lineup from this
        week. The most skilled manager this week was the winner in MotW, D.K's Minions Return?, who
        managed well when it mattered most.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>Hotdogs Are Afraid of Nikhil</ArticleSubheader>
      <p>
        D.K's Minions Return continued their win streak in MotW, defeating Glizzy Gobblers handily
        and handing out 5 dogs in the process. They had this weeks #1 QB and #1 RB in Drake Maye and
        Jonathan Taylor, and got decent points from almost everyone else as well. Omarion Hampton
        let them down again this week after being a very unpopular 3rd round "reach" pick amongst
        the league managers.
      </p>
      <p>
        Glizzy Gobblers will be gobbling 5 glizzies this week after being let down by Derrick Henry,
        DeVonta Smith, Kyle Pitts, Jake Bates, and DAL DEF who narrowly avoided a 6th dog with just
        1 point. They are lucky that the J Williams' popped off, and Mike Evans was able to eek out
        more than 10 points this week. These 5 glizzies actually bring down their average glizzies
        per MotW loss to 5.2 glizzies.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        D.K's Minions Return? brings WalterPickens into MotW, the 3rd time these two have faced off
        in MotW, with a 1-1 record in those matchups. Glizzy Gobblers will face off with First Down
        Syndrome in week 3 after a tough division loss this week.
      </p>
      <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleCaption>
        <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
      </ArticleCaption>
      <p>
        This is Nikhil's 13th MotW victory, and Alec's 9th loss, both are by far the highest
        respectively.
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
      <ArticleSubheader>BBCU Domination</ArticleSubheader>
      <p>
        BBCU cruised to an easy victory this week, making any and all lineup decisions they had to
        make irrelevant to the outcome of the game. They made mostly the right decisions, and scored
        the 4th most points of any team this week. They got double digits from all but 2 players,
        leading them to this free win.
      </p>
      <p>
        Bye Week Curious had the opposite week this week, having only one player break double
        digits. It is going to be tough to win games when Tyrone Tracy is your second highest
        scoring player. This team is 0-2 and is off to maybe the worst start in league history.
        Everyone is routinely betting against them in survivor, but we will see if they can turn the
        tide and ruin a lot of hopes in that pool.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        BBCU plays against Lord of the Littles in week 3, a matchup between 2 of the league's 3
        undefeated teams. One team will emerge 3-0 and be in a great spot to avoid last place. Bye
        Week Curious plays against Burrowing in McAnus in week 3, where they hope to create an upset
        in a lopsided matchup.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>One For the History Books</ArticleSubheader>
      <p>
        As stated previously, this is the narrowest possible margin of victory without tying, and
        sadly for Costo Guys, they ended up one the wrong side of the history books. They are now
        0-2 and were so close to being 0-1-1 or 1-1. If only Lamar Jackson had 226 passing yards
        instead of 225 and we would've had the first tie in league history. This publication is very
        glad that was not the case, since it would've broken everything. Evan Engram and Marvin
        Harrison Jr. seemed to be the difference this week, and BTJ didn't help either.
      </p>
      <p>
        First Down Syndrome must feel pretty good winning by 0.04 points in week 2 and avoiding an
        0-2 start to the season because of it. Amon-Ra St. Brown absolutely crushed this week,
        scoring nearly 34% of this team's points. That will stand as one of the best MVP
        performances of the season, and couldn't have come in a better matchup.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        Costo Guys will look to get their first win in week 3 in their matchup against Losing is
        Terry. First Down Syndrome will face off with Glizzy Gobblers.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>Heavy WR Draft Strategy Paid Off</ArticleSubheader>
      <p>
        In this Hubbell Division matchup, Burrowing in McAnus had two huge games from his WR this
        week, with Malik Nabers 37.7 points leading the way. Nabers performance was overshadowed by
        Amon-Ra in terms of awards this week, but he helped lead this team to victory without a
        doubt. Davante Adams also popped for more than 20 points, and Harold Fannin outscored Brock
        Bowers, making WalterPickens regret their entire draft.
      </p>
      <p>
        WalterPickens got another great game from CMC, but was let down by Justin Fields who
        struggled mightily against the Bills defense while Dak Prescott put up over 22 points on his
        bench against the Giants. These 22 points wouldn't have been enough on their own, but
        starting Dobbins over Henderson as well would've been enough to win. This manager needs to
        figure their shit out if they want to repeat as back-to-back champions.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        Burrowing in McAnus will play against Bye Week Curious in week 3 in a highly anticipated
        matchup. WalterPickens begins his 3 week road trip through the Glizzy Division, starting
        fittingly with a MotW matchup against D.K's Minions Return? in week 3. They will be hoping
        to go on a hot streak and rain glizzies all over the Glizzy Division over the next 3 weeks.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>Avon Division Battle</ArticleSubheader>
      <p>
        Lord of the Littles is off to a 2-0 start this season, with Puka Nacua and De'Von Achane
        leading the way for them in week 2. It is nice when your high draft picks return on the
        cost, and this week was a great example of that. They didn't get much help from others, but
        got enough to win their matchup which is all that matters. They were our worst winner this
        week, but a winner is a winner.
      </p>
      <p>
        The Barkley Brawlers were aptly lead by their RBs this week with James Cook and Saquon
        Barkley scoring in numbers. Their main issues this week came from QB, WR, and DEF. This team
        will have to find the best QB to start on a weekly basis, but they certainly are not short
        on options. It is tough to lose to a divisional opponent though, especially when you left so
        many points on your bench.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        Lord of the Littles faces off with fellow 2-0 opponent BBCU in week 3. The Barkley Brawlers
        will be up against Super Ja'Marrio Bros. in week 3, with both teams sitting at 1-1 and
        looking to avoid falling behind early.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>Commish in a Hole After 2 Weeks</ArticleSubheader>
      <p>
        Losing is Terry finally renamed their team this week, but that didn't help them win their
        matchup in week 2. They didn't get enough points from anyone besides Patrick Mahomes, who
        has been shockingly good for fantasy to start the season. However, just like the Chiefs, the
        commish is 0-2 after 2 games.
      </p>
      <p>
        Super Ja'Marrio Bros. only got 4.6 points from Ja'Marr Chase last week, but they got their
        money's worth this week with Chase going off for 36.5 points in week 2. They also got 24.5
        points from their kicker this week, which might be a new league record, but we have been
        unable to confirm that at this time. They avoid the 0-2 start, and sent the commish packing.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        Losing is Terry will be up against Costo Guys in week 3, where both teams will be looking
        for their first win. Super Ja'Marrio Bros. will play against The Barkley Brawlers in week 3.
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
      <p>Similar distribution to last week, with a slight trend upward.</p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>This chart is still kinda ass until we have more data.</p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>
        We had our closest ever matchup this week, the closest possible matchup without being a tie.
        That was the only close matchup this season thus far.
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
        Bye Week Curious is the only team to score less than 200 points this season, and they aren't
        even close to that mark. Losing is Terry has faced 2 high scoring teams through 2 weeks,
        resulting in the highest PA.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        Bye Week Curious continues to be unlucky and bad, but is slightly less unlucky than Losing
        is Terry. They are the only team on the left half of this chart though, which makes them
        very bad. 3 teams are clustered in the lucky and good corner, a trend that should break
        soon.
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
        BBCU might be one of the laughing stocks of the groupchat, but maybe they are just good at
        fantasy football after all. They top the power rankings after 2 weeks with their impressive
        record of 18-4 against all teams thus far. Lord of the Littles is 2-0 but falls 3 spots in
        the power rankings thanks to their extremely easy schedule this season.
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
        The FFHub playoff predictions don't work with only two weeks of data, but the WP ones do!
        The WP projections are based on future projections, rather than historical data which we
        don't have enough of yet. BBCU has the highest WalterPicks playoff odds of any team at 90%,
        followed closely by D.K's Minions Return? at 82% and Burrowing in McAnus at 80%. Bye Week
        Curious in last place has only 3% chance of making the playoffs, while fellow 0-2 team
        Losing is Terry has over 50% chance according to WalterPicks.
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
        Only one team through 12 games has won a matchup where they lost to the median. Losing is
        Terry can't fully blame their schedule for their 0-2 start, since they're also 0-2 against
        the median.
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
        There is some more movement here than there was last week, but still nothing drastic stands
        out with all teams maintaining their current record aside from Costo Guys going to 1-1 and
        First Down Syndrome moving down to 0-2.
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
      <p>This is still ass after week 2.</p>
    </div>
  );
};

const MotWDangerArticle = () => {
  return (
    <div>
      <ArticleHeader>MotW Possibilities</ArticleHeader>
      <ArticleSubheader>Lord of the Littles Remains Untouched</ArticleSubheader>
      <DangerTable data={dangerTable} />
      <ArticleCaption>MotW Danger Metric</ArticleCaption>
      <p>
        BBCU and Bye Week Curious are sitting directly in the danger zone with their week 4
        opponents facing off in the week 3 MotW. Lord of the Littles is sitting pretty with their
        next possible appearance in week 6, and having never participated in MotW before. Glizzy
        Gobblers is potentially 2 weeks away after just losing this week, as is the curse of the
        Glizzy Division.
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
      <ArticleSubheader>League Submissions</ArticleSubheader>
      <LeagueQuote>
        "Wouldn't be fantasy without [Trevor] blowing all the FAAB in week 1"
        <br />- Nikhil
      </LeagueQuote>
      <p>Very true, as is tradition.</p>
      <LeagueQuote>
        "Why does nobody accept my trades!"
        <br />- Jake
      </LeagueQuote>
      <p>Great question, I think other submissions and memes may give us a clue.</p>
      <LeagueQuote>
        "Jake is a raccoon looking for scraps"
        <br />- Greg
      </LeagueQuote>
      <p>Unclear whether this is related or unrelated to the squirrel meme.</p>
      <LeagueQuote>
        "Fellas I'm moving into a new apartment and I think I need to rejoin the bidet life after a
        troubled past. Any recs?"
        <br />- Anthony
      </LeagueQuote>
      <p>
        This was submitted after Alec responded to Anthony in the groupchat. Anthony clearly does
        not trust the opinion of Alec, despite his best intentions and proven track record of bidet
        recommendations.
      </p>
      <LeagueQuote>
        J - Just the worst trades possible
        <br />
        A - Awful and unbalanced
        <br />
        K - Keeps sending them over and over
        <br />
        E - Everyone gets the same shitty deal
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>The anonymous poet is back for week 2, with another banger.</p>
    </div>
  );
};

const Meme1 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a6ipr2.jpg"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a6ipvj.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by "Everyone"</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a6iq3p.gif"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a6iqmm.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a6ir1c.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a6irir.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a6irxt.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/a6is4f.jpg"}></ArticleImage>
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
