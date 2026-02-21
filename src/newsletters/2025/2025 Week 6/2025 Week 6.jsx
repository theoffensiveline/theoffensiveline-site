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

export const newsDate = "2025-10-16";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 6</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        The main headline this week was our Matchup of the Week. This 74.92 point margin was the
        biggest blowout of this season, and also the biggest blowout in MotW history, surpassing the
        2023 week 3 MotW where Hurt Thuggins & the boys (Matt Smith) defeated E.T.N Phone Home
        (Devan) by 65.08 points. BBCU and Costco Guys were our best and worst teams of the week,
        respectively, which will almost always result in a massive blowout like this.
      </p>
      <p>
        Super Ja'Marrio Bros. let themselves down this week as they had the warmest bench and were
        the best loser, a combination you hate to see as they could've won their matchup with better
        management. Lord of the Littles on the other hand had some good luck, getting worst winner
        in the closest game of the week, with the MVP of the week Cam Skattebo getting them there
        with 31 points. For the Barkley Brawlers, Cameron Dicker had a revenge game against the meme
        The Offensive Line posted about him last week as he was the top kicker and had the #2
        kicking performance of the season thus far.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        This was not a great week, we had no perfect managers and lots of managers in the 70s and
        80s for efficiency. The best manager by every metric was BBCU with the most points at the
        highest efficiency. The worst manager in terms of efficiency was Anthony's Eskimo Brother,
        and the lowest point total was Costco Guys, but they didn't have a high potential total so
        they were pretty efficient.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>3 v 9 Still Results in 7 Shots</ArticleSubheader>
      <p>
        BBCU had a dominant week in their first MotW appearance of the season. The hotdog prophecy
        wouldn't have let any other result occur in this matchup. They would've won this matchup
        with just Bijan Robinson, Jaxon Smith-Njigba, and one of Ladd McConkey, Trey McBride, or
        Justin Herbert. Only needing 3 players to win your matchup says a lot about your player's
        performance, but it also says a lot about how poorly the other team performed.
      </p>
      <p>
        Costco Guys had the first 7 shot MotW loss of the season this week, and only the 4th 7+ shot
        loss in MotW history. They just couldn't get anything going. The only players that saved
        them from shots were Brian Thomas and Jake Ferguson. Luckily for them their defense managed
        to stay positive with just 3 points on the week. They didn't have anything better on their
        bench either, their top bench player was Evan Engram with 9.9 points.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        BBCU keeps MotW in the Glizzy division when they take on Anthony's Eskimo Brother in week 7.
        Costco Guys will be up against fellow 2-4 team Bye Week Curious in a game that will have
        huge implications in the standings.
      </p>
      <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleCaption>
        <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
      </ArticleCaption>
      <p>
        BBCU earns their 5th MotW victory of all time, moving up to a tie for 4th with Anthony's
        Eskimo Brother. Costco Guys is now alone in 3rd all time with 6 MotW losses, but they are
        2nd in dogs/shots consumed at 31. They are now one of 4 managers averaging over 5 shots/dogs
        per loss in MotW.
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
      <ArticleSubheader>Back-to-Back Incoming?</ArticleSubheader>
      <p>
        Anthony's Eskimo Brother had another rough week this week, putting up only 82.4 points. This
        poor performance got overshadowed by that of the Costco Guys in MotW, but this one was just
        as ugly. They only had 3 players break 10 points with their highest scorer at 15.4 points.
        If the Raiders DEF is your 2nd highest scorer, you know you're in trouble.
      </p>
      <p>
        The Barkley Brawlers needed this game to avoid dropping to 2-4, and their team showed up
        when they needed to. This was a very well rounded performance with 6 players scoring between
        13 and 20 points. James Cook and Saquon Barkley were disappointing with just 8.7 points
        each, but they were still able to get the win thanks to their other players.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        Anthony's Eskimo Brother will be in MotW again against BBCU in week 7. The Barkley Brawlers
        will be up against fellow 3-3 team WalterPickens.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>Survivor Success</ArticleSubheader>
      <p>
        Singing Like Mariah Terry needed to win their own matchup to have a shot at winning survivor
        this week, and they were able to get the job done. Josh Jacobs and Patrick Mahomes put this
        team on their backs when it mattered most. They combined for a whopping 63.48 points, over
        55% of this teams total points this week. The rest of their team did enough to get the win.
      </p>
      <p>
        WalterPickens had a similar team build, with Christian McCaffrey and George Pickens leading
        the charge for them. Their other players didn't do enough to get the win though. Justin
        Fields and JK Dobbins were particularly bad, each scoring under 5 points. Emeka Egbuka
        getting injured also changed the course of this matchup dramatically since he only ended
        with 4.4 points too.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        Singing Like Mariah Terry will be up against 5-1 D.K's Dying Minions in week 7.
        WalterPickens will face off with fellow 3-3 team The Barkley Brawlers.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>Dallas + London = W</ArticleSubheader>
      <p>
        Bye Week Curious had big games from his players that are named after locations this week,
        and if you lump Indiana Jones in there you can say there were 3 players included. Drake
        London had 31.8 points and Dallas Goedert had 26 points, both outscoring the top player on
        their opponent's team this week. They earned their 2nd win of the season and handed their
        opponent their 2nd loss.
      </p>
      <p>
        Super Ja'Marrio Bros. was one start/sit decision away from winning this week, but they
        started Jauan Jennings and Courtland Sutton over Kayshon Boutte who went off for 26.3 points
        on their bench. Otherwise their team was pretty solid and they were the best loser this week
        after scoring the 4th most points of any team.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        Bye Week Curious will be up against fellow 2-4 team Costco Guys in week 7. Super Ja'Marrio
        Bros. will face off with the 5-1 #1 seed Lord of the Littles.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>Love Hurts Taylor Swift Butker</ArticleSubheader>
      <p>
        D.K's Dying Minions lost another minion this week, Calvin Ridley, who has been bad enough
        that he might as well have been injured all along anyway. The other minions were able to
        score enough points to get them the win, with Jonathan Taylor leading the charge yet again.
        Taylor could not outscore Swift this week, and Love couldn't outscore Hurts either, but
        Butker outscored McPherson and they won some other positional matchups to get the win.
      </p>
      <p>
        First Down Syndrome had big weeks from D'Andre Swift and Rachaad White, but the rest of
        their team kinda shit the bed. Deebo Samuel, Breece Hall, Mark Andrews and Evan McPherson
        all scored under 6.7 points this week. They will need better performances from their role
        players in the future.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        D.K's Dying Minions will be up against survivor champion Singing Like Mariah Terry in week
        7. First Down Syndrome will face off with 2-4 Uncle Rico Went Pro.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>Running Back Battle</ArticleSubheader>
      <p>
        Lord of the Littles has been dominant this season, but this was not a continuation of that
        dominance. They were able to pull out an ugly win this week thanks to both of their RBs
        scoring 31 points, Jayden Daniels scoring 21.64 points, and their DEF putting up 13 points.
        Team mascot Cam Little put up -2 points, but that did not end up breaking the bank for them
        this week.
      </p>
      <p>
        Uncle Rico Went Pro had a real shot at a win this week, but their rookie RBs were not up to
        the task. Bill and Judkins just couldn't get it done on the ground this week, and their
        receivers couldn't get it done through the air either. A single TD was the difference in
        this one. This team will reload at WR with Rashee Rice coming off of suspension in week 7.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        Lord of the Littles will face off with 4-2 Super Ja'Marrio Bros. in week 7. Uncle Rico Went
        Pro will be up against 3-3 First Down Syndrome.
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
      <p>Not a great week aside from the one super high score from BBCU.</p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>Another downward trend this week for everything but the maximum.</p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>
        We had our first week with 2 close games, with both teams atop the leaderboard getting those
        close wins. The rich get richer.
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
        There was a lot of jostling this week, and we now have 4 teams sitting at 2-4 clustered up
        above the 1-5 Anthony's Eskimo Brother. Their PA is just 1.5 points away from being higher
        than any individual team's PF. They have had it rough and are 8th in PF but sitting in last
        place.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        Lord of the Littles remains alone in the Lucky and Good corner. Bye Week Curious is making
        up ground on the bad side every week, with Uncle Rico Went Pro and The Barkley Brawlers
        quickly approaching bad territory. Anthony's Eskimo Brother is still firmly on the unlucky
        side. The 3 3-3 teams are all hugging the PF/PA line, but one of them is much lower on the
        line than the other 2.
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
        Lord of the Littles remains in the top spot this week despite their ugly victory. BBCU moves
        up 2 spots thanks to their dominant victory, and Costco Guys moved down 2 spots from that
        loss. Bye Week Curious took the biggest jump, up 4 spots to 8th after earning their 2nd
        victory of the season. Uncle Rico Went Pro moved into last place and have the fewest Play
        All Wins this season with just 20. Anthony's Eskimo Brother's schedule is nearly as hard as
        playing Lord of the Littles every single week.
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
        The divide between good teams and bad teams gets clearer every week. You can see it on the
        PF/PA chart, the power rankings, and it stands out here too. FFHub has the top 6 teams
        making the playoffs 80% of the time. WalterPicks is slightly less optimistic, but it still
        puts the 6 seed WalterPickens at 63% playoff odds. The Barkley Brawlers and Uncle Rico Went
        Pro appear to be the only teams in the bottom half with real hope of making the playoffs
        according to WalterPicks.
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
        Not much moves in this universe, D.K's Dying Minions takes the one seed since Lord of the
        Littles did not beat the median this week in their victory.
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
        Lots of movement here that is tough to analyze all at once. This shows how bad everyone in
        this league has been at setting their lineup this season.
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
        There is only one remaining 0-6 schedule combination, The Barkley Brawlers playing Super
        Ja'Marrio Bros. schedule. There are still 3 teams who could be 6-0 in alternate universes,
        BBCU, First Down Syndrome, and Lord of the Littles.
      </p>
    </div>
  );
};

const MotWDangerArticle = () => {
  return (
    <div>
      <ArticleHeader>MotW Possibilities</ArticleHeader>
      <ArticleSubheader>Glizzy Division Stuck</ArticleSubheader>
      <DangerTable data={dangerTable} />
      <ArticleCaption>MotW Danger Metric</ArticleCaption>
      <p>
        Anthony's Eskimo Brother keeps the MotW in the Glizzy division this week after BBCU defeated
        Costco Guys last week. Team in immediate danger are Uncle Rico Went Pro and The Barkley
        Brawlers. Each week that we do this, Lord of the Littles continues to be the team in the
        least danger, so Anthony's Eskimo Brother could pull off a win if we expect that trend to
        continue.
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
      <ArticleSubheader>Survivor Strategy or Collusion?</ArticleSubheader>
      <p>
        With a potential survivor championship on the line, Alec dropped multiple players in order
        to hoard every possible TE for MNF to try to help Josh K beat Josh L. Josh L had Dalton
        Kincaid at TE who was ruled out 90 min before kickoff of MNF. Matt Smith picked Josh L in
        survivor, and Alec's pick Trevor had already lost. This was a last ditch attempt from Alec
        to try to get Matt Smith to also lose so that survivor could continue on another week. There
        was some discussion about whether or not this is collusion, but survivor throws an
        interesting wrinkle into the discussion.
      </p>
      <LeagueQuote>
        "Follow the money"
        <br />- Josh Kraines
      </LeagueQuote>
      <p>
        Because Alec had money riding on survivor, it was in his best interest to help Josh K beat
        Josh L. Let's examine the collusion section of the league bylaws for more details:
      </p>
      <blockquote>
        Collusion occurs when two teams work together against the rest of the league, or one team
        makes moves to benefit another team without trying to improve its own position. Collusion
        undermines the ethic of good sportsmanship as well as the competitive balance of the league.
        Examples include: one-sided trades; dropping a player so that another team may pick up that
        player; transactions that involve future considerations or preferential treatment; and
        swapping players to cover bye weeks or injury.
      </blockquote>
      <p>
        This is arguably collusion based on this definition, but the case isn't cut and dry. Alec
        did make moves that benefit another team, but you could argue that they were trying to
        improve their own position by doing so. Their position in this case just happened to be in
        survivor and not in the league itself. Whether or not this would hold up in the league court
        is unknown, but it ultimately didn't work and ended up costing Alec $11 FAAB to pick up Kyle
        Pitts, who he dropped to do this in the first place. Kyle Pitts was not bid on by any other
        league member, so this $11 FAAB and public shaming can be considered punishment for Alec's
        potential collusion that didn't work anyway.
      </p>
      <ArticleSubheader>League Submissions</ArticleSubheader>
      <LeagueQuote>
        "O Tight End! my Tight End! our fearful week is done;
        <br />
        <br />
        The team has weather'd every sack, the prize we sought is won;
        <br />
        <br />
        The game is near, the whistle I hear, the people all exulting,
        <br />
        <br />
        While follow eyes the steady kneel, the game grim and daring:
        <br />
        <br />
        But O heart! heart! heart!
        <br />
        <br />
        O the bleeding drops of red,
        <br />
        <br />
        Where on the bench my Tight End lies,
        <br />
        <br />
        Fallen cold and dead."
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>
        This poem is a nod to O Captain, My Captain by Walt Whitman. Our anonymous league poet has
        outdone themselves this week. Chief Correspondent ChatGPT is back from their hiatus and
        wrote an analysis on this poem for our readers this week:
      </p>
      <p>
        This parody of Walt Whitman's "O Captain! My Captain!" draws from the original's mourning of
        Abraham Lincoln's assassination, using victory marred by tragedy. However, the metaphor has
        some flaws: tight ends don't "weather" sacks—that's a quarterback's domain, not a TE's. The
        "steady kneel" line is also puzzling, perhaps meant as a nod to end-of-game rituals, but it
        feels forced and disrupts the rhythm. That said, the poem effectively captures the
        bittersweet sting of fantasy football injuries, shifting from triumph to grief. A solid
        effort from the anonymous poet, though a bit more football savvy would elevate it to true
        literary heights.
      </p>
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
      <ArticleSubheader>Jake Trade</ArticleSubheader>
      <div
        dangerouslySetInnerHTML={{
          __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DPBv5iRDdOU/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DPBv5iRDdOU/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DPBv5iRDdOU/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by House of Pigskin (@houseofpigskin)</a></p></div></blockquote><script async src="//www.instagram.com/embed.js"></script>`,
        }}
      />
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleSubheader>Greg after reading Outlive</ArticleSubheader>
      <div
        dangerouslySetInnerHTML={{
          __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DPw0EqeEurp/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DPw0EqeEurp/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DPw0EqeEurp/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by The Raw Milk Kid (@owenstubblebine)</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>`,
        }}
      />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleSubheader>Nikhil 24/7</ArticleSubheader>
      <div
        dangerouslySetInnerHTML={{
          __html: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DNcN371RSiJ/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DNcN371RSiJ/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DNcN371RSiJ/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Memes (@nochillshaggy)</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>`,
        }}
      />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/IEGHGII.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/nR2jRKc.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/XKoyXRi.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/pmzfF7Z.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/1kzQKvv.png"}></ArticleImage>
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
