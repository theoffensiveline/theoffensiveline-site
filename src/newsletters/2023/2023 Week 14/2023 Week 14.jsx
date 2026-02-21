import React from "react";
import {
  AwardsTable,
  ArticleHeader,
  ImageWrapper,
  ArticleImage,
  ArticleSubheader,
  EfficiencyChart,
  StackedHistogram,
  WeeklyScoringChart,
  MatchupPlot,
  MotwTable,
  ShotsDistributionChart,
  LeaderboardTable,
  PfPaScatter,
  PowerRankingsTable,
  AltLeaderboardTable,
  ScheduleTable,
  ArticleCaption,
  LeagueQuote,
  MotWRules,
} from "../../../components/newsletters/newsStyles";
import awardsData from "./awardsTable.json";
import bestBallLbData from "./bestBallLb.json";
import efficiencyData from "./efficiencyData.json";
import leaderboardData from "./leaderboard.json";
import matchupData from "./matchupData.json";
import medianLbData from "./medianLb.json";
import motwHistoryData from "./motwTable.json";
import powerRankingsData from "./powerRankings.json";
import scheduleData from "./scheduleData.json";
import shotsDistData from "./shotsDist.json";
import starterData from "./starters.json";

export const newsDate = "2023-12-14";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 14</ArticleSubheader>
      <AwardsTable awardsData={awardsData} />
      <p>
        Week 14 decided the fate of the race for last place, as well as the final playoff spot. The
        race for last place was won by the underdog, E.T.N Phone Home. They went on a 6 game losing
        streak to lose the league after their 4-4 start to the season. This race for last place was
        The Werbenjägermanjensens to lose, and luckily for them Drake London was able to carry them
        to a victory in their matchup. WalterFix was also at risk of losing, and just skated by as
        the worst winner of the week. League Camera Fund was the other team tied for last coming
        into this week, but they put up another big week to ensure they did not have to do the
        punishment again.
      </p>
      <p>
        The final playoff spot was earned by Cinderella. Once it was clear that Questionable was not
        a threat, Cinderella had a win-and-you're-in scenario, and they were able to get the W.
        Their game was the closest game of the week, and their opponent First Down Syndrome was the
        best loser. First Down Syndrome also left 35.52 points on their bench and could have easily
        won if they had set their lineup. Njigba's in Paris was the top team for the 5th time this
        season, and has been on a roll lately. They had the top RB, WR, and K this week, which
        helped them secure largest blowout as well. They are a top contender for the championship.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        There was a lot of shitty management this week, especially from teams that really could've
        used their best effort. First Down Syndrome could've gotten into the playoffs if they set
        their lineup, and E.T.N Phone Home could've avoided last place had they made a few different
        decisions. Starting Love over Dak certainly was a choice, but that alone would not have been
        enough. Just Joshin had the lowest potential points for this week, but gets a playoff bye
        thanks to their cupcake schedule.
      </p>
    </div>
  );
};

const ScoringDistributionArticle = () => {
  return (
    <div>
      <ArticleHeader>Scoring Distributions</ArticleHeader>
      <ArticleSubheader> Distribution of Scoring</ArticleSubheader>
      <StackedHistogram chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>
      <p>This was a week with a very wide range, but still pretty normally distributed.</p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>
        As seen above, this week had a wide range, and a cluster of teams in the middle. This week
        had a much lower average and median than the past few weeks, thanks to bye weeks and
        injuries piling up late in the season. We also saw a decent amount of mismanagement, but not
        an unexpectedly high amount.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>Second Six Shot Sucker</ArticleSubheader>
      <p>
        Just Joshin, the first place team and the team with the most points for coming into this
        week, will have to do 6 shots or eat 6 dogs after this performance. The only other 6 shot
        loss in MotW this season was Cinderella in week 9 when they lost to The
        Werbenjägermanjensens. Both of these teams put up less than 85 points in their losses. Just
        Joshin was let down by Josh Jacobs, Nico Collins, Ja'Marr Chase, Sam LaPorta, and Matt Gay
        who earned him double duty. WalterFix did not have an impressive week, but put up triple
        digits which was enough to get the win and avoid last place. They had a well rounded RB/WR
        performance, and got some stinkers from QB/TE/K.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        Just Joshin will have a bye next week in the first round of the playoffs, and WalterFix will
        take MotW into the shit bowl. They play against Questionable, and the winner of that will
        take MotW into week 1 of next season.
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
      <ArticleSubheader>E.T.N Choke Home</ArticleSubheader>
      <p>
        All E.T.N Phone Home had to do to avoid last place was win this matchup against Hurt
        Thuggins & the boys. If you knew before this week started that they got 21 points from their
        D, 16.6 points from TE, and a combined 35.3 points from RB, you would have guessed that they
        had an easy win, especially with Jefferson coming back and Dak at QB with the Cooks stack.
        Sadly for them, Jefferson got hurt again, and they decided to play Love over Dak because
        their Eagles fandom got the best of them. Hurt Thuggins & the boys put up solid numbers,
        with big contributions from Saquon Barkley, Isaiah Likely, and Garrett Wilson. Their trades
        with WalterFix helped set their team up for success this week, despite poor performances
        from Amon Ra and Mahomes.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        E.T.N Phone Home gets a bye in the shit bowl, and Hurt Thuggins & the boys will play against
        Cinderella in Round 1 of the playoffs.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>Playoff Spot Determined</ArticleSubheader>
      <p>
        The winner of this matchup ultimately earned a playoff spot once Questionable didn't perform
        well this week. Cinderella wasn't the popular pick to win this matchup, but viewers would
        have expected a different lineup configuration from First Down Syndrome. Rumblings around
        the league are calling for an investigation into the decisions made by First Down Syndrome
        this week, and whether or not they were influenced by their opponent. Cinderella regularly
        jokes about paying people off, and if there was ever a time do actually do so this would be
        it. Playing Roschon Johnson over Kenneth Walker is a very interesting move to make. So is
        Brock Purdy over Lamar, but that one is a little less egregious.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        Cinderella will play against Hurt Thuggins & the boys in Round 1 of the playoffs. First Down
        Syndrome plays against League Camera Fund in Round 1 of the shit bowl.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>Free W for League Camera Fund</ArticleSubheader>
      <p>
        After losing to WalterFix last week, League Camera Fund was once again at risk of getting
        last place. Their team showed up to play with their backs against the wall this week, but it
        didn't really matter with how poorly Questionable played against them. League Camera Fund
        had all but one player in double digits, and Questionable only had 3 players in double
        digits. Gabe Davis put up a 0, and C.J. Stroud scored less than 4 points before getting
        injured. Even Tyreek Hill only managed 10.1 points due to his injury. Both of League Camera
        Funds RBs scored 21.5 points, and the rest of his non-defense players scored between 12 and
        16 points.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        Both of these teams play in Round 1 of the shit bowl, Questionable against WalterFix, and
        League Camera Fund against First Down Syndrome.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>Drake London MVP</ArticleSubheader>
      <p>
        The Werbenjägermanjensens needed a win to even have a chance of avoiding last place, and
        Drake London made sure that they could get that win. He caught 10 balls for 172 yards with a
        two-point conversion to put up 29.2 points in this game. Cook-ing a 0.2 had a chance to come
        back and claim victory with his Eagles stack, but the Eagles were proven fraudulent against
        the Cowboys. If Cook-ing a 0.2 had played their recently traded for Evan Engram, Just
        Joshin's old team core would have carried them to victory in this one. Mostert put up 23 and
        Moore put up 26.8, with Engram having 32.5 points on the bench. They absolutely fleeced Just
        Joshin, and might have a chance to beat them in the playoffs.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        Cook-ing a 0.2 plays in the third Josh bowl of the season in Round 1 of the playoffs against
        Travis Swift. They are 2-0 against Travis Swift this season. If they win that one they will
        go up against Just Joshin, in the ultimate revenge game. The Werbenjägermanjensens will get
        a bye in the shit bowl.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>(Not much of a) Fight for Playoff Bye</ArticleSubheader>
      <p>
        Njigba's in Paris went all out against Travis Swift this week, putting up massive numbers at
        almost every position. Their worst player had more points than Travis Swift's WR combined.
        Ezekiel Elliott looks fantastic with Stevenson out, and Deebo continues to have huge weeks.
        Brandon Aubrey had the game of his life putting up 24.4 fantasy points, the most of any
        started kicker this season. This team is a scary matchup every week, and is primed to make a
        playoff run.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        Njigba's in Paris will get a bye in the first round of the playoffs, and Travis Swift will
        play against Cook-ing a 0.2 in Round 1.
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
        The two things that were left to be decided have been decided. Cinderella got the last
        playoff spot, and E.T.N Phone Home got last place. They had the third most PA in the league.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        The top two seeds are now the only teams well ahead of the PF/PA line, and the 3 and 4 seeds
        are right around the line. Everyone else has more PA than PF.
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
        Just Joshin's schedule is still easier than playing against The Werbenjägermanjensens every
        week! This will be the final update to power rankings this season given that the regular
        season is over.
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
        In this hypothetical timeline, not much changes besides First Down Syndrome getting the last
        playoff spot over Cinderella. Cinderella struggled against the median this season, and had a
        lot of lucky wins. E.T.N Phone Home would still have gotten the punishment, and the same two
        teams would get playoff byes, but Njigba's in Paris would be the 1 seed over Just Joshin.
      </p>
    </div>
  );
};

const AlternateUniverseArticleTwo = () => {
  return (
    <div>
      <ArticleHeader>Alternate Universe #2</ArticleHeader>
      <ArticleSubheader> Best Ball Standings</ArticleSubheader>
      <AltLeaderboardTable data={bestBallLbData} />
      <ArticleCaption>
        If everyone played their best lineup every week, this is what the standings would look like.
        All columns include hypothetical totals.
      </ArticleCaption>
      <p>
        This also shows Cinderella had some lucky wins where their opponent did not play their best
        players. They would have done the punishment if this was a best ball league.
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
        Just Joshin finished the season 11-3. 5 other teams that would have finished the season 11-3
        or better with their schedule, including 5-9 WalterFix, and 4-10 E.T.N Phone Home. There are
        6 schedules where E.T.N Phone Home would have been 4-10 with though, which shows just how
        easy Just Joshin's schedule was. The Werbenjägermanjensens would have been 2-12 with
        Questionable's schedule, the worst possible record on this chart.
      </p>
    </div>
  );
};

const LeagueBuzzArticle = () => {
  return (
    <div>
      <ArticleHeader>League Buzz</ArticleHeader>
      <ArticleSubheader>Chat, is it cringe to brush your teeth at work?</ArticleSubheader>
      <p>Chat's cousin and Chief Correspondent ChatGPT weighs in:</p>
      <p style={{ textIndent: "2em" }}>
        No, it's not inherently cringe to brush your teeth at work. Personal hygiene is important,
        and taking care of your teeth is a normal part of daily self-care. However, the
        appropriateness of brushing your teeth at work might depend on the workplace culture and
        facilities available.
      </p>
      <p style={{ textIndent: "2em" }}>
        If your workplace has designated areas or facilities for personal grooming, such as
        bathrooms with private sinks, it's generally acceptable to brush your teeth there. On the
        other hand, if your workplace doesn't have suitable facilities, it might be more considerate
        to brush your teeth at home before or after work.
      </p>
      <p style={{ textIndent: "2em" }}>
        Ultimately, it's essential to be mindful of your surroundings and coworkers' comfort levels.
        If you're unsure about the norms in your workplace, observe the behavior of your colleagues
        or check with your supervisor to ensure you're following appropriate etiquette.
      </p>
      <ArticleSubheader>The punishment: 3 of each?</ArticleSubheader>
      <p>
        In a surprising turn of events, a misunderstanding has cropped up regarding the last place
        punishment. The standard punishment involves 30 total units of donuts eaten, miles run, and
        beers consumed. However, a mix-up has arisen, with some managers falsely believing that
        there's a minimum requirement of three units for each aspect. This misconception, akin to an
        old wives' tale, has divided opinions within the league, as some managers are now under
        scrutiny for spreading this false notion.
        <br />
        <br />
        Despite previous clarifications, the league is now dealing with the aftermath of this
        misinterpretation. The commissioners are actively working to clear up the confusion and
        reaffirm that there's no mandatory minimum of three units per category. The aim is to
        maintain the original spirit of the punishment and ensure that future seasons don't fall
        prey to the pitfalls of this peculiar misunderstanding.
      </p>
      <ArticleSubheader>Submissions</ArticleSubheader>
      <LeagueQuote>
        "[Cinderella] acts like there wasn't a trade deadline"
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>
        Cinderella made multiple references to trading this week in a confusing display. The trade
        deadline has well passed and they are insinuating that managers should send them trade
        offers.
      </p>
      <LeagueQuote>
        "Playing Jordan Love over Dak Prescott may be the most highly regarded management decision
        in League History"
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>
        This would have looked so much worse if this one decision stood between them not getting the
        punishment. Their team underperformed so hard that they'll get less shit than they should
        for this.
      </p>
      <LeagueQuote>
        "Much like the Philadelphia Eagles, Kirk Thuggins & the Boys is a fraudulent team. Looking
        forward to seeing their first round exit against the real Cinderella story of the league."
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>
        Curious to see who put this one in. Kirk Thuggins & the boys isn't even a top 2 most
        fraudulent playoff team.
      </p>
      <LeagueQuote>
        "[E.T.N Phone Home] losing 6 straight games is the biggest choke job of all time, even [The
        Werbenjägermanjensens] won 💀"
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>Tough look for E.T.N Phone Home. Going from 4-4 to 4-10 is crazy.</p>
      <LeagueQuote>
        "I really wanted to see [League Camera Fund] do another punishment"
        <br />- Not [League Camera Fund]
      </LeagueQuote>
      <p>
        The Offensive Line has receipts that League Camera Fund wouldn't have been upset if they had
        to do the punishment.
      </p>
    </div>
  );
};

const DevanMemeOne = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89e73w.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by League Camera Fund</ArticleCaption>
    </ImageWrapper>
  );
};

const DevanMemeTwo = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89e7g2.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by League Camera Fund</ArticleCaption>
    </ImageWrapper>
  );
};

const DevanMemeThree = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89e7kt.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by League Camera Fund</ArticleCaption>
    </ImageWrapper>
  );
};

const DevanMemeFour = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89e80x.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by WalterFix</ArticleCaption>
    </ImageWrapper>
  );
};

const DevanMemeFive = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89e8cb.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const GregMeme = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89e9p5.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const JakeMeme = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89e8k2.jpg"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const JakeMemeTwo = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89ea5s.jpg"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const GregBrickWallMeme = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89eb6g.gif"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const AnthonyMeme = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89ebeu.jpg"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const AnthonyMemeTwo = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgflip.com/89ec2y.jpg"}></ArticleImage>
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
    content: ScoringDistributionArticle,
  },
  {
    id: 3,
    content: MotwArticle,
  },
  {
    id: 4,
    content: MatchupArticleTwo,
  },
  {
    id: 5,
    content: MatchupArticleThree,
  },
  {
    id: 6,
    content: MatchupArticleFour,
  },
  {
    id: 7,
    content: MatchupArticleFive,
  },
  {
    id: 8,
    content: MatchupArticleSix,
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
    content: LeagueBuzzArticle,
  },
  {
    id: 16,
    content: DevanMemeOne,
  },
  {
    id: 17,
    content: DevanMemeTwo,
  },
  {
    id: 18,
    content: DevanMemeThree,
  },
  {
    id: 19,
    content: DevanMemeFour,
  },
  {
    id: 20,
    content: DevanMemeFive,
  },
  {
    id: 21,
    content: GregMeme,
  },
  {
    id: 22,
    content: JakeMeme,
  },
  {
    id: 23,
    content: JakeMemeTwo,
  },
  {
    id: 24,
    content: GregBrickWallMeme,
  },
  {
    id: 25,
    content: AnthonyMeme,
  },
  {
    id: 26,
    content: AnthonyMemeTwo,
  },
  {
    id: 30,
    content: MotWRules,
  },
];
