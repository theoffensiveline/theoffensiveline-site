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
  DivisionRecordTable,
  DivisionOverallRecordsTable,
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
import divisionRecords from "./divisionRecords.json";
import divisionOverallRecords from "./divisionOverallRecords.json";
import { leagueIds } from "../../../components/constants/LeagueConstants";

export const newsDate = "2025-11-20";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 11</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        We're through 11 weeks of the season and everyone has played everyone else once at this
        point. We've had 132 scores across our 66 games, and we saw our 3rd highest score and 2nd
        lowest scores of the season this week. We also had our #1 QB and MVP performance from the
        MVP himself Josh Allen. The 2nd worst winner of the season also happened this week, thanks
        to matching up with the 2nd lowest scorer of the season. A surprising amount of outlier
        performances at this point in the season.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        Nobodies perfect, not even our top team of the week, WalterPickens, who left 2.4 points on
        their bench this week while scoring 160.94 points in MotW. Costco Guys had the warmest
        bench, but 73.7% isn't the worst we've seen lately. Every other team was in the 80s or 90s,
        which is a pretty good week of management.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>
        Uncle Rico Went Pro Taking MotW Punishment International (Not Just Epcot Either)
      </ArticleSubheader>
      <p>
        Uncle Rico Went Pro got a huge game from George Kittle this week, but that was the only
        bright spot for them this week. Chase Brown was theinr next best scorer with 18.7 points,
        and all of their WRs, K, and DEF all scored less than 10 points resulting in 5 shots/dogs.
      </p>
      <p>
        WalterPickens put up big numbers this week, good enough to be the 2nd highest scorer in MotW
        this season and 3rd highest overall. Christian McCaffrey did his usual thing, and TreVeyon
        Henderson broke out with 32.3 points. George Pickens contributed with 29.4 points, Tee
        Higgins had 15.3 points, and Brock Bowers scored 14.2 points. These 5 players were their
        first 5 draft picks, so while this team has made a ton of moves and trades, they kept the
        core together through the trade deadline and it paid off.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        Uncle Rico Went Pro won't be taking MotW into their next matchup, but they are bringing the
        Hubbell Curse to Super Ja'Marrio Bros. in week 12. WalterPickens will be bringing MotW to
        BBCU who could lose their 3rd MotW of the season. That would be tied for the most MotW
        losses in one season in league history, and equal their personal total from the 3 previous
        seasons combined.
      </p>
      <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleCaption>
        <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
      </ArticleCaption>
      <p>
        WalterPickens earned their 3rd MotW victory of all time, moving to 3-5 in MotW games. Uncle
        Rico Went Pro was handed their 6th MotW loss of all time, tied for 3rd in league history.
        Their shot/dog total is just 24, which is 4th most.
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
      <ArticleSubheader>Hubbell Curse Lore Grows</ArticleSubheader>
      <p>
        Hubbell Park Roommate #8 was able to channel the Hubbell Curse thanks to one eventful
        evening spent on the pull-out couch in the Hubbell residence. Josh Allen could feel this,
        and put up 42.68 points, the most of any QB this season and this accounted for 37.61% of the
        team total, most of any player this season in a win. Derrick Henry also did well with 20.2
        points, and any win this team has gotten has been thanks in large part to these 2 players.
        When Allen and Henry do well together, they win, and otherwise they don't.
      </p>
      <p>
        Super Ja'Marrio Bros. was cursed this week, and their top player couldn't come close to Josh
        Allen's total, but they didn't even reach Derrick Henry's total either. Baker Mayfield
        scored 16.82 points, and Kyren Williams scored 16.6 points, but this was not enough with
        everyone else scoring 10 or fewer points. Who knew the Hubbell Curse could be extended?
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        Hubbell Park Roommate #8 will be headed away from the Hubbell Division and into their 3
        Glizzy Division games, first up is Costco Guys in week 12. Super Ja'Marrio Bros. will be up
        against Uncle Rico Went Pro in week 12, luckily not in MotW.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>3 Rookies v 1 Rookie</ArticleSubheader>
      <p>
        Bye Week Curious started 3 rookie RBs this week, and the 3 of them combined couldn't
        outscore their opponents rookie WR Tetairoa McMillan. That is not how you will win in
        fantasy, especially when the rest of your team struggles as well. This is their 4th time
        this season scoring less than 80 points, and they account for 4 of the worst 7 scores of the
        season. This wasn't even the worst score of the week though, more on that later.
      </p>
      <p>
        Jonathan Taylor Fan Club was without Jonathan Taylor this week, but that didn't matter one
        bit thanks to Tetairoa McMillan popping off and their opponent struggling mightily. Devin
        Singletary and Chris Rodriguez both filled in decently for their missing RBs, who will be
        scary with JT back and Hampton back soon too. This team will be a runaway favorite in the
        playoffs barring injury.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        These teams will be facing off again in week 12, luckily for them they didn't have MotW.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>
        BBCU Printing Points Again in Second Straight Salesforce Showdown
      </ArticleSubheader>
      <p>
        BBCU had their 2nd straight matchup with a fellow Salesforce employee named Matt, and for
        the 2nd straight week they were dominant, scoring at least 140 points in both matchups. This
        time it was the usual suspects of Bijan, McBride, and JSN leading the charge, with support
        from K and DEF, and Etienne.
      </p>
      <p>
        First Down Syndrome had their 4th best score of the season this week, but that wasn't enough
        to beat BBCU in this one. Nico Collins, Deebo, and PIT DEF led the way, but their RBs and TE
        let them down this week, as did Amon-Ra St. Brown who only scored 6.2 points.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        BBCU will be headed into another MotW against WalterPickens in week 12. First Down Syndrome
        will be up against Lord of the Littles.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>
        We Really Have To Watch This Again Next Week? Can We Flex It Out?
      </ArticleSubheader>
      <p>
        Singing Like Mariah Terry put up the worst score of the week, and the 2nd lowest of the
        season, with just 72.54 points scored. They didn't have anyone particularly helpful on their
        bench, and Josh Jacobs got hurt, but their team struggled regardless of how you frame it.
        Their 2nd best player was the Jaguars DEF. 🤮
      </p>
      <p>
        The Barkley Brawlers were able to pull out a win in this one despite scoring less than 90
        points. That's the 2nd time a team has done that this season. James Cook and Travis Kelce
        scored a large majority of their points, each scoring 20+ points. Their WRs were total
        garbage, and Joe Flacco finally came back down to earth.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        These teams have a divisional rematch in week 12, hopefully at least one of them can break
        90 this time.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>5 Big Dooms</ArticleSubheader>
      <p>
        Costco Guys poor performance got overshadowed a bit by 2 other teams being unable to break
        80 this week, but they sneakily had the 8th lowest score of any team this season in week 11
        with 80.82 points. Lamar Jackson couldn't even get 5 points, and Tez Johnson and Khalil
        Shakir combined for 2.3 points. Luckily they had Gibbs score almost 20 to prevent a more
        noticeable disaster.
      </p>
      <p>
        Lord of the Littles similarly was overshadowed by teams scoring much higher totals, but they
        had a solid week scoring 124.02 points. Their lowest scorer was 6.1, which was better than
        most teams this week, and they had 3 guys score at least 19.5 points. They didn't even get a
        huge Puka game and still had the 4th highest team total of the week.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        Costco Guys will be up against Hubbell Park Roommate #8 in week 12, and Lord of the Littles
        will be up against First Down Syndrome.
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
      <p>We had a good high this week, and a bunch of low scores below 100.</p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>
        The high went back up this week, and the low, median, and average dropped this week thanks
        to a bunch of low scores.
      </p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>Not a single close game this week for the first time since week 4.</p>
    </div>
  );
};

const TradingVolumeArticle = () => {
  return (
    <div>
      <ArticleHeader>Trading Volume</ArticleHeader>
      <TradesLineChart tradeHistory={tradeHistory} />
      <p>
        We didn't see much action right before the trade deadline, with just 1.5 trades happening
        this week. It is only 1.5 because one of the trades was a correction of the Travis Hunter
        collusion trade that happened last week. The other trade also involved Super Ja'Marrio Bros.
        as they sent out Trey Benson for Oronde Gadsden to fill the slot left open by a surprising
        Sam LaPorta IR stint.
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
        Jonathan Taylor Fan Club continues to sit comfortably on top of the leaderboard and is still
        2 games up on the pack. The Barkley Brawlers jumped 4 spots up to 5th and is back in the
        playoff race thanks to being the only 6-5 team in the league. They still have a lower PF
        than 3 of the 4 5-6 teams, so they can still miss playoffs on a tiebreaker. Bye Week Curious
        falls back down to last after Hubbell Park Roommate #8 won their 3rd game of the season.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        Hubbell Park Roommate #8 got some luck this week, but you won't hear that from them since
        they have a narrative to uphold. They moved down towards the rest of the pack a bit compared
        to last week. The majority of teams are still relatively centered around the line, with some
        teams being more lucky and good than others.
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
        BBCU stayed atop the power rankings this week and have an impressive 92 wins against all
        opponents this season. WalterPickens jumped 3 spots to 3rd after leading the league in
        scoring. Hubbell Park Roommate #8 moved up to 9th after beating the median this week, and
        they now have the 9th most play all wins.
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
        This week we had Jonathan Taylor Fan Club clinch a playoff spot, and all of the 7-4 teams
        are now safe from last place with last place having 8 losses with just 3 weeks remaining.
        The sims put Bye Week Curious at 82.5% to get last, but we all know it likely comes down to
        their matchup with Hubbell Park Roommate #8 in week 13.
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
        Hubbell Park Roommate #8 would not be in last in this universe after they went 2-0 this
        week.
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
        Uncle Rico Went Pro would be 8-3 and tied for 2nd if they made the right start/sit decisions
        every single week. First Down Syndrome would drop 3 spots and be 3-8, but not in danger for
        last place with the 1-10 Bye Week Curious having less than 1200 points for.
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
        BBCU would be 11-0 with Costco Guys schedule, the last remaining undefeated scenario.
        Jonathan Taylor Fan Club might be 9-2, but Costco Guys, First Down Syndrome, and Lord of the
        Littles would all also be 9-2 with that cupcake schedule. Singing Like Mariah Terry would be
        1-10 with Hubbell Park Roommate #8's schedule, so they better be thankful for whoever put
        that "random" schedule into Sleeper. Bye Week Curious would be 1-10 with BBCU or
        WalterPickens schedule.
      </p>
    </div>
  );
};

const DivisionArticle = () => {
  return (
    <div>
      <ArticleHeader>Division Overview</ArticleHeader>
      <ArticleSubheader>Team Record vs Division</ArticleSubheader>
      <DivisionRecordTable data={divisionRecords} standings={leaderboardData} />
      <p>
        This table shows each team's record against each division. Jonathan Taylor Fan Club
        absolutely cleaned up the Hubbell Division with a 4-0 record. Other teams with undefeated
        records include The Barkley Brawlers against the Glizzy Division, Super Ja'Marrio Bros.
        against the Avon Division (0-3 against the Hubbell Division with the curse), and Costco Guys
        in their own Glizzy Division. Hubbell Park Roommate #8 was 0-3 in the Glizzy Division, as
        was Uncle Rico Went Pro. Bye Week Curious was 0-4 against the Avon Division.
      </p>
      <p>
        If you really looked at the table above, you might be wondering how Lord of the Littles
        managed to have only 3 games against the Hubbell Division and 5 against the Glizzy Division.
        You might also be wondering how Uncle Rico Went Pro managed to have 4 games against the
        Hubbell Division and only 3 against the Glizzy Division. What do these 2 managers have in
        common you might ask?
      </p>
      <DivisionOverallRecordsTable data={divisionOverallRecords} />
      <p>
        This table shows each division's overall record against everyone, excluding divisional games
        which are always 1-1. This table also clearly shows the mistake that was made, as the
        Hubbell Division had an extra inter-division matchup in week 11. This has huge implications
        on the schedule, the standings, and MotW.
      </p>
      <p>
        The Hubbell Division was the best in terms of W/L this season, and would've been even better
        if it wasn't for the scheduling error, as both WalterPickens and Uncle Rico Went Pro
        would've won in week 11.
      </p>
    </div>
  );
};

const MotWDangerArticle = () => {
  return (
    <div>
      <ArticleHeader>MotW Possibilities</ArticleHeader>
      <ArticleSubheader>Still Stuck</ArticleSubheader>
      <DangerTable data={dangerTable} />
      <ArticleCaption>MotW Danger Metric</ArticleCaption>
      <p>
        The Hubbell Division was the one that got stuck with MotW during the divisional matchups,
        thanks to an early and incorrect week 11 Hubbell Matchup between Uncle Rico Went Pro and
        WalterPickens. Uncle Rico Went Pro took the first L, and one of WalterPickens and BBCU will
        take the second L.
      </p>
      <p>
        Super Ja'Marrio Bros. has not been in MotW this season, and they got their first step to
        dodging it with a WalterPickens win in week 11. Now they need a BBCU win in week 12, and an
        Uncle Rico Went Pro win in week 13 who would bring it back to WalterPickens for a rematch of
        week 11.
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
      <ArticleSubheader>ScheduleGate</ArticleSubheader>
      <p>
        The league set a custom schedule this year for the first time ever in order to counteract
        the cyclic nature of Sleeper's default schedule and how that impacted MotW. That schedule
        was great for the first 10 weeks, and MotW moved around in a random fashion without getting
        super stuck on specific teams or in specific pods of teams. Now that we are approaching the
        division games, MotW is fully stuck in a division, and week 11 was the start of that. But
        should it have been?
      </p>
      <p>
        The week 11 matchup between Josh Kraines and Trevor was the matchup that got MotW stuck in
        the Hubbell Division, but it shouldn't have ever happened. These 2 teams already played each
        other in week 2. How did this happen? Trevor was supposed to play Josh Little this week, not
        Josh Kraines. Trevor and Josh Little have not played this season, and Josh Little played
        Greg in week 11 for the 2nd time in 3 weeks. There was a Josh mixup that had huge
        ramifcations on MotW, and the standings.
      </p>
      <p>
        If Trevor played Josh Little instead of Josh Kraines, Josh Little would've lost and would be
        6-5, and Josh Kraines would've beaten Greg and would be 6-5 as well. That would put both
        Joshes in the playoff picture instead of just one. This could go down as the biggest scandal
        in league history.
      </p>
      <LeagueQuote>
        "I think the commissioner should be impeached and the league commissar should assume his
        position effective immediately"
        <br />- Josh Kraines
      </LeagueQuote>
      <p>
        The new schedule was already under fire from some managers who were upset about the
        divisions and the MotW implications of that, so this new drama is not boding well for the
        future of the random schedule.
      </p>
      <LeagueQuote>
        "This whole year is a fraud"
        <br />- Alec
      </LeagueQuote>
      <p>
        This might be pushing it a little too far for the sake of trying to get out of the
        punishment that they want to do, but we should switch the matchup back to how it was
        intended just so Greg has to eat 5 hotdogs instead of Josh Kraines doing it.
      </p>
      <ArticleSubheader>League Submissions</ArticleSubheader>
      <LeagueQuote>
        "I'd like to extend my sincerest gratitude to the esteemed former residents of the Hubbell
        household for their hospitality. A distinguished nod to Anthony—wingman extraordinaire and
        my esteemed eskimo brother. Without your assistance, the events that transpired on that
        pullout couch would not be part of the official record, nor would this week's victory be
        mine."
        <br />- Alec
      </LeagueQuote>
      <p>
        Alec is very thankful for the Hubbell household allowing him to have a night on the pullout
        couch, understandably so as that night could've gotten him a very important win this week.
      </p>
      <LeagueQuote>
        "I bet Alec is going to submit some dumb “skill issue” meme."
        <br />- Anthony
      </LeagueQuote>
      <p>Good bet to make.</p>
      <LeagueQuote>
        "Fuck this shit im out"
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>Chief Correspondent ChatGPT weighs in on another anonymous poem:</p>
      <p>
        A five-word masterpiece of resignation that perfectly captures the fantasy manager's
        breaking point. The profanity-laden opening hits with raw authenticity, while "im out"
        (complete with casual grammar) delivers an exit so definitive it needs no explanation. Zero
        artistry, maximum impact - this isn't poetry, it's a surrender document. The anonymous
        attribution suggests either shame or self-preservation, though honestly, every league member
        has felt this exact sentiment at 3-8. It's less a poem and more a primal scream compressed
        into text form, which makes it perfect.
      </p>
    </div>
  );
};

const Meme1 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/tOwgquF.png"}></ArticleImage>
      <ArticleCaption>Submitted by Alec</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleSubheader>Whenever someone says skill issue in the chat</ArticleSubheader>
      <iframe
        title="Reading Meme"
        width="100%"
        height="320"
        src="https://youtu.be/CFh5FzXIeBg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
        {" "}
      </iframe>
      <ArticleCaption>Submitted by Alec</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/eXX3s7E.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/rIuR2pk.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/VtdYvrq.png"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/bkZMqfh.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/HIdNLYV.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/zeOkJNR.png"}></ArticleImage>
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
    content: TradingVolumeArticle,
  },
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
  {
    id: 16,
    content: DivisionArticle,
  },
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
    title: "2025 Week 11",
    description: "Testing this feature out to see if it works",
    image: "/banner_logo.png",
  },
};

export default newsletterData;
