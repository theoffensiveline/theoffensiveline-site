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
  SurveyStackedBarChart,
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
import surveyData from "./surveyData.json";
import motwFuture from "./motwFuture.png";
import { leagueIds } from "../../../components/constants/LeagueConstants";

export const newsDate = "2025-10-30";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 8</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        Week 8 came with a lot of notable outcomes, including 5 #1 performances. We got a new high
        score for the season, 191.58 points from The Barkley Brawlers, which is the 2nd highest
        score in the PPR era of this league and the 3rd highest of all time. This is the highest
        score in MotW in league history. The Offensive Line will be building out more historical
        data on the site this off-season. This 191.58 point performance also unsurprisingly led to
        the biggest blowout of the season, with a 84.9 point margin in MotW. Our other #1
        performances were Uncle Rico Went Pro with the best loss of the season at 139.72 points, 3
        perfect managers, and the Tighest End Tucker Kraft with 33.3 points.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        After one of the worst managed weeks of all time, we followed it up with one of the best
        managed weeks of all time. Bye weeks certainly help eliminate bad choices, but not all
        managers had benches full of bye weeks. WalterPickens was the worst manager this week with
        just 75% efficiency, losing to Costco Guys who had 100% efficiency on a much lower potential
        point total due to byes.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>BBCU to the ICU</ArticleSubheader>
      <p>
        BBCU got pulverized in this matchup. They never stood a chance with their opponent putting
        up 191.58 points, but their players didn't even try to help them avoid shots/dogs either.
        The only major surprise player that went below 10 points was Bijan Robinson, who had an easy
        matchup with the Dolphins but only got 9 carries and 3 targets in the the blowout loss. This
        was his first game under 16 points this season. Better days ahead for this team, but 5
        shots/dogs is tough.
      </p>
      <p>
        The Barkley Brawlers had one of the best games in league history thanks to 3 players total
        over 100 points, and 5 more players in double figures. James Cook, Saquon Barkley and Tucker
        Kraft each had between 33.3 and 33.6 points. Their lowest scorer was their defense with 7
        points. This team got a statement win in MotW.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        BBCU is headed into a Hubbell Division matchup with WalterPickens in week 9. The Barkley
        Brawlers will be taking MotW back where it started the season, in a matchup with D.K's Dying
        Minions, who has the most MotW victories in league history.
      </p>
      <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleCaption>
        <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
      </ArticleCaption>
      <p>
        The Barkley Brawlers earned their 4th MotW victory, and 1st since 2023. BBCU earned their
        5th loss, and 2nd of this season, breaking their streak of only having one loss per season.
        This loss moves them up to 6th all time in terms of hot dogs/shots consumed at 20.
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
      <ArticleSubheader>*Two and six</ArticleSubheader>
      <p>
        One and six will need yet another name change after this week after their hard-fought
        victory over Uncle Rico Went Pro. This was an extremely well-rounded performance from their
        squad, with their lowest scorer having 8.4 points, and their other 8 players scoring between
        13.4 and 23.22 points. They didn't get an easy matchup again this week, but they were
        actually able to overcome it for once.
      </p>
      <p>
        Uncle Rico Went Pro put up a fight in this loss, becoming the best loser of the season so
        far, fittingly against One and six who can continue to claim the title of toughest schedule
        going. Uncle Rico Went Pro had big WR numbers from Rashee Rice and Troy Franklin, but their
        RBs didn't do enough to help them get over the hump.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        One and six will be in their most important matchup yet between fellow 2-6 team and Glizzy
        Division rival Bye Week Curious in week 9. The loser of this will be in firm possession of
        last place with only a few weeks left to course correct. Uncle Rico Went Pro will be going
        into a Hubbell Division matchup with Super Ja'Marrio Bros. where they will rely on the
        Hubbell Curse to get the win.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>
        D.K's Minions Are <b>Still</b> Back
      </ArticleSubheader>
      <p>
        D.K's Dying Minions don't seem to be dying anymore for the 2nd straight week. This team
        desperately needs a name change, sitting at 7-1 firmly in first place and putting up huge
        numbers every week. It was the usual suspects for them, Drake Maye and Jonathan Taylor, and
        TB DEF kicked in 26 points just to rub it in their opponents face.
      </p>
      <p>
        Super Ja'Marrio Bros. had an awful game, with Ja'Marr Chase's 21.1 points the only bright
        spot on this team. Newly acquired Woody Marks also put up 15.1 points, but the rest of their
        team was under 12 points with many all of their non-RB/WR players scoring 6 or less points.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        D.K's Dying Minions will be back in MotW again in week 9, taking on The Barkley Brawlers.
        Super Ja'Marrio Bros. will try to beat the Hubbell Curse against Uncle Rico Went Pro in week
        9.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>Somehow Not Our Worst Winner</ArticleSubheader>
      <p>
        Bye Week Curious made it really easy for their opponent to get the win this week, putting up
        less than 80 points for the 3rd time this season. They are responsible for 3 of the 4 lowest
        scoring weeks of the season among all teams. Daniel Jones and Daniel Goedert made this
        performance not look absolutely awful.
      </p>
      <p>
        Singing Like Mariah Terry had one of their only easy matchups of the season this week,
        luckily for them since they barely broke 100 points. Patrick Mahomes continues to be their
        best player, playing with a chip on his shoulder ever since they didn't want to draft him.
        Ka'imi Fairbairn was their 2nd highest scorer, followed by Mason Taylor and Justin
        Jefferson.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        Bye Week Curious will be giving us a potential preview of the shit bowl and a Glizzy
        Division matchup in week 9 up against fellow 2-6 team One and six. Singing Like Mariah Terry
        will be in an Avon Division matchup with First Down Syndrome in week 9.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>Skatteboo-boo Hurts</ArticleSubheader>
      <p>
        First Down Syndrome again didn't have a great week by any measure, but it was enough to get
        the win this time. Breece Hall had his best game of the season in the Jets first win, and he
        created a QB controversy between him and Justin Fields in the process. Chris Boswell knocked
        in 22 points to help this team get the W.
      </p>
      <p>
        Lord of the Littles might be cursed after dropping Cam Little, scoring just 90.12 points
        this week in their first game without their team mascot. Achane and Odunze continued to put
        up numbers, but the loss of Skattebo will hurt this team's RB output for the rest of the
        season. They will rely more heavily on their WRs to fill in the flex spot in their hunt for
        the playoffs.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        First Down Syndrome will be up against another Avon Division rival in week 9, Singing Like
        Mariah Terry. Lord of the Littles will be against Costco Guys in week 9.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>Monday Night Meltdown</ArticleSubheader>
      <p>
        Costco Guys looked like a longshot to win coming into MNF. They had less than 70 points, and
        Sleeper gave them less than 30% chance to win. They had Marcus Mariota, Kareem Hunt, and KC
        DEF left to play. With Mariota and KC DEF somewhat cancelling out, it was up to Kareem Hunt
        to be the difference maker, and he did just that with 2 TDs sealing the win for this team.
      </p>
      <p>
        WalterPickens experienced the first CMC dud of the season against a stout HOU DEF. This was
        McCaffrey's first game under 22.5 points this season. They also started ATL DEF this week
        against the Dolphins, which seemed like a lock for 5+ points. Somehow the Dolphins scored 34
        points against the Falcons, who only managed 1 sack on Tua, to net 0 points. These 2
        performances, along with a disappointing week from Lucian, cost this team a win and leaves
        them just 8.06 points ahead of the 7 seed.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        Costco Guys will be up against Lord of the Littles in week 9, and WalterPickens will be up
        against Hubbell Division Rival BBCU in week 9. This marks the first Hubbell Division game
        for WalterPickens this season, which means all of their remaining games will be within the
        Hubbell Division.
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
        This week was extremely boom or bust. We had our highest score of the season, and 2 other
        high scores, but the majority of the league was not good.
      </p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>This week had an extremely high high, but had our lowest median score of the season.</p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>
        One close game between two teams that scored less than 100 points this week, the rest of the
        games were not close.
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
        D.K's Dying Minions sit firmly in 1st place at 7-1, 2 games up on the pack. With 4 teams
        sitting at .500, the race for the playoffs is heating up. One and six crossed the 1000 PA
        threshold this week, and is the only team above that mark after 8 weeks. They earned their
        2nd win though, so they are up to 11th instead of 12th this week.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        Everyone is now lucky compared to One and six, they are basically off the chart in terms of
        PA now. There are only 4 teams with more PA than PF, and 8 teams on the other side of the
        line. D.K's Dying Minions is chilling in the Lucky and Good corner, explaining their 7-1
        record perfectly. The two 2-6 teams are also very extremely placed on this chart.
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
        D.K's Dying Minions reclaimed the #1 spot this week after BBCU struggled in MotW. Both teams
        are 63-25 against all teams this season. The Barkley Brawlers jumped 5 spots after their
        190+ point performance, and they are now 36-52 against all teams. One and six has the best
        record against all teams of any team in the bottom 6, but their schedule has prevented them
        from accruing many actual wins.
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
        The top 4 teams appear to be locks for the playoffs, sitting 1 game up on the rest of the
        pack with strong teams. D.K's Dying Minions could be safe from last place this week with a
        win and a loss from one of the 2-6 teams. The last 2 playoffs spots are fully up for grabs,
        with many teams in contention. The last few weeks of divisional matchups will be very
        important.
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
        The only motion here is that One and six would be in 10th instead of 11th. They still only
        have 3/8 wins against the median this season, proving that their schedule isn't the only
        reason they are 2-6.
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
        This world is very different, which shows how poor our management has been this season as a
        league. Uncle Rico Went Pro would be in 3rd place at 6-2. Bye Week Curious would be 0-8 if
        their opponents made the right start/sit decisions against them, and they wouldn't even have
        900 PF with their optimal lineups.
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
        BBCU would be 8-0 with Costco Guys schedule. One and six is the hardest schedule for 10/12
        teams. Costco Guys could be 6-2 with D.K's Dying Minions schedule, but would be 1-7 with One
        and six's schedule. Lord of the Littles would be 7-1 with D.K's Dying Minions schedule, but
        would be 3-5 with either 2-6 team's schedule.
      </p>
    </div>
  );
};

const MotWDangerArticle = () => {
  return (
    <div>
      <ArticleHeader>MotW Possibilities</ArticleHeader>
      <ArticleSubheader>Divisions Run MotW</ArticleSubheader>
      <DangerTable data={dangerTable} />
      <ArticleCaption>MotW Danger Metric</ArticleCaption>
      <p>
        MotW is back in the Glizzy Division again, and if D.K's Dying Minions wins this week, MotW
        could be trapped in the Glizzy Division the rest of the season. With divisional matchups
        each of the last 3 weeks, the MotW will be trapped. If D.K's Dying Minions wins this week,
        the Hubbell Division will be safe from MotW for the rest of the season. If they lose, the
        Glizzy Division will be safe from MotW for the rest of the season. The Avon Division is at
        risk of being stuck with MotW in either case.
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
      <ArticleSubheader>Alec Cheating The MotW System?</ArticleSubheader>
      <p>
        Alec had to do a 5 shot/dog punishment this week from his MotW loss. He sent the league a
        video of him failing to eat 5 hotdogs in one sitting, after boldly claiming he could eat 10
        hot dogs if he needed to. His claim was that he "wasn't hungry", but to him 5 hotdogs should
        be nothing, since he said "I think I could eat 10 hotdogs in one go" just 2 weeks ago.
      </p>
      <p>
        Alec followed this failed attempt with a video of him doing "5 shots", which the group had
        multiple qualms with. The first issue is that the alcohol of choice was only 27% ABV, hardly
        making these 5 shots 5 alcoholic drinks. The second issue is that Alec poured about 20% of
        each shot on the table instead of into the glass, making this more like 4 shots instead of
        5. Alec's nice jacket could not distract the group from his complete lack of integrity.
      </p>
      <ArticleSubheader>Shots or Dogs?</ArticleSubheader>
      <p>
        Last week the group had a discussion about whether you would choose shots or dogs based on
        the number you had to do for MotW. This week we have multiple data points based on a
        league-wide survey and historical data in the post-hotdog era to settle this debate once and
        for all. This poll had 11 respondents, and we have had 11 participants in MotW history,
        which makes sense. Here are the results:
      </p>
      <SurveyStackedBarChart surveyData={surveyData.surveyData} />
      <ArticleCaption>
        Survey results show preferences for shots vs. hot dogs based on quantity. Historical data
        shows actual choices made in MotW.
      </ArticleCaption>
      <p>
        It was interesting to see the group's opinion get more narrow as the numbers got larger.
        Most people did not have a preference if the number was 4 or fewer, but as the number
        increased, people have a clear preference between shots and dogs, with only 1 person
        claiming they would do either shots or dogs at 6 or more. This person claimed either for
        every single value of shots/dogs. Two other interesting submissions: One that would prefer
        hot dogs for 1-7, but shots for 8+, and someone else that would prefer shots for 1-7 and hot
        dogs for 8+. These opinions basically cancelled each other out, but are very interesting
        polar opposites in this survey.
      </p>
      <p>
        This survey matched reality relatively closely. About 40% of people preferred hot dogs when
        the total is &lt;= 3, and many of the either group lean towards shots in reality to fill out
        the other 60%. For 4 shots/dogs the either group is a little more split in reality. For 5
        shots/dogs this is where we see a difference in survey vs. reality. More people who have had
        to do 5 opt for dogs than the survey showed. This could be due to small sample size of 5
        shot/dog MotW punishments, but 7/9 people who have had to do this chose hotdogs. For &gt;= 6
        shots/dogs, the majority of the survey said hotdogs, but the majority of reality has chosen
        to do shots. This is definitely personal bias due to limited sample size, with only 7 data
        points. I broke it down by 6+ here because the survey results were the same for 6, 7, and
        8+, but our actual results for 7 and 8 have all been shots historically, so it will be
        interesting to see if anyone ever eats 7+ hotdogs.
      </p>
      <ArticleSubheader>League Submissions</ArticleSubheader>
      <LeagueQuote>
        "For the first time in awhile I think everything is going to be okay"
        <br />- Alec
      </LeagueQuote>
      <p>
        A little crazy to say after your 2nd win out of 8 games, especially when you have to play
        the other 2-win team this week, but go off king.
      </p>
      <LeagueQuote>
        "Shout out Matt Smith and Jake for hyping me up in the chat! Y'all are real ones"
        <br />- Alec
      </LeagueQuote>
      <p>Alec getting hyped up in the chat is rare, especially given the name of the chat.</p>
      <LeagueQuote>
        A question to ponder on this merry week.
        <br />
        Why call it Football when we don't use out feet?
        <br />
        <br />
        Handball's been claimed so that's not an option.
        <br />
        But Football is too, yet it made adoption.
        <br />
        <br />
        What a weird name, who really cares the name choice.
        <br />
        All we want is some touchdowns and to watch them rejoice.
        <br />
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>Chief Correspondent ChatGPT weighs in on another anonymous poem:</p>
      <p>
        This poem charmingly captures a common curiosity about American football's name through
        accessible rhyming couplets and a conversational tone that feels genuinely playful. However,
        the meter stumbles awkwardly, particularly in the middle lines, and the poem ultimately
        abandons its own question with a shrug—"who really cares"—before pivoting to touchdowns,
        which feels less like clever resolution and more like giving up on an actually interesting
        linguistic puzzle it set out to explore.
      </p>
      <LeagueQuote>
        "I live by a set of rules. I don't trade with my opponent of the week."
        <br />- Nikhil
      </LeagueQuote>
      <p>Maybe this is the secret to being 7-1?</p>
    </div>
  );
};

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
      <ArticleImage src={"https://i.imgur.com/f1qTg7D.png"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/YcepqHq.png"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/JDFLFia.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/0rifRsc.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/zDqhSwh.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/g4xB5BV.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/FnHgQ74.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/84064vn.png"}></ArticleImage>
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
