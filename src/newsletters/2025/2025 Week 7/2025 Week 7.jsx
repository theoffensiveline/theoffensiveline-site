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

export const newsDate = "2025-10-23";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 7</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        This week had the chance to be an all-timer, but many inefficient managers kept us from an
        insane number of fantasy points. Our most efficient teams barely hit 90% efficiency this
        week, and we had multiple managers in the 60s and 70s. If all managers managed better, this
        could've been an extremely high scoring week. That didn't stop BBCU from topping the record
        they set themselves last week for #1 score of the season. They did this on only 86%
        efficiency, and of course they did this against Tragedy of an Unlucky Man, who continues to
        have the hardest schedule, maybe ever. Luck is not their only problem though, skill is also
        an issue. They left 46.5 points on their bench this week, which is the 3rd most this season
        of any team.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        This might be one of the worst managed weeks of all time in this league. Our top manager was
        at 91.9% and our bottom manager was at 70.4%. This 70.4% was largely driven by the best
        bench player of the season, Bo Nix, who scored 39.96 fantasy points. This start/sit decision
        cost The Barkley Brawlers a close matchup. Uncle Rico Went Pro was also very inefficient at
        just 71.6%, but they won their close matchup against First Down Syndrome who had a much
        lower ceiling.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>Glizzy Division Getting Glizzied</ArticleSubheader>
      <p>
        BBCU defeated a Glizzy Division member for the 2nd straight week, this time handing out 5
        glizzies to Tragedy of an Unlucky Man. This win was another easy one. This week they needed
        4 players to win though, compared to the 3 they needed last week. All the same faces made
        the cut this week, with Herbert, Bijan, JSN and McBride leading the charge and totaling
        104.8 points.
      </p>
      <p>
        Tragedy of an Unlucky Man struggled this week, but it was partially their own doing. They
        left a lot of points, and saved dogs, on their bench including Kyle Pitts with 13.2 points
        and DeVonta Smith with 33.3 points. Mike Evans and Darren Waller both put up 0 points, so
        all those points could've directly contributed to their total instead. Sam Darnold, Kenneth
        Walker, and Jake Bates contributed the last 3 dogs for this manager.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        BBCU will be taking MotW to the Avon division in a matchup against The Barkley Brawlers.
        They will be without star players JSN, McBride, and Travis Etienne who are all on a week 8
        bye. Tragedy of an Unlucky Man will be trying to get their 2nd win against 3-4 Uncle Rico
        Went Pro.
      </p>
      <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleCaption>
        <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
      </ArticleCaption>
      <p>
        We will see if BBCU can go on a run like D.K's Dying Minions did to start the season. BBCU
        earns their 6th MotW victory of all time, moving up to a tie for 3rd with Singing Like
        Mariah Terry. Tragedy of an Unlucky Man took this opportunity to grow their lead, earning
        their 10th loss and is up to 52 hotdogs/shots consumed, both the most of any manager by far.
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
      <ArticleSubheader>Bye Week Furious</ArticleSubheader>
      <p>
        Bye Week Curious put up a sad 88.22 points this week, but this is actually their 4th highest
        score through 7 weeks. They didn't even have any players on bye this week, although you
        might think that seeing Tyler Allgeier starting at RB for them. They left Rhamondre
        Stevenson against the Titans on their bench, but ultimately their start/sit decisions did
        not matter, since they wouldn't have had enough points to beat Costco Guys even at 100%
        efficiency.
      </p>
      <p>
        Costco Guys put up nearly 130 points this week and was led by Jahmyr Gibbs with 36.8 points.
        Stafford chipped in 27.38 points and Jake Ferguson had 21.9 points as well. They had
        disappointments from all of their WRs, but it did not matter since they were easily able to
        get the W this week.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        Bye Week Curious will be up against fellow 2-5 team Singing Like Mariah Terry in week 8, but
        this time they will have to worry about bye weeks from Ashton Jeanty and Kyler Murray. This
        matchup will be important in the race for last place. Costco Guys will be up against 4-3
        WalterPickens, but will be without a number of players including Stafford, Gibbs, Marv, and
        BTJ. Lamar Jackson may miss this week as well due to injury, so they've got an uphill battle
        in this one.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Matchup #3</ArticleHeader>
      <ArticleSubheader>D.K's Minions Are Back</ArticleSubheader>
      <p>
        D.K's Dying Minions don't seem to be dying anymore. CeeDee Lamb returned this week and put
        up 22 points in his return. Jonathan Taylor and Drake Maye continued to put this team on
        their back again this week with stellar performances. They got some help from Tyler Warren
        as well who had a great game. This team is on a roll and looks like the team to beat this
        season.
      </p>
      <p>
        Singing Like Mariah Terry on the other hand, struggled again this week. Patrick Mahomes
        continues to be the main bright spot on this team, but he cannot do enough by himself to get
        these wins. He needs more help from Justin Jefferson and their RBs. Mason Taylor only had
        6.1 points, which was not super helpful either.
      </p>
      <MatchupPlot data={starterData} matchupId={3} />
      <p>
        D.K's Dying Minions will play a shorthanded Super Ja'Marrio Bros. in week 8. Singing Like
        Mariah Terry will be up against fellow 2-5 team Bye Week Curious.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>Matchup #4</ArticleHeader>
      <ArticleSubheader>Little Lord Literally Levelled</ArticleSubheader>
      <p>
        Lord of the Littles did not have a good week, partially due to their own mismanagement. They
        played an injured Puka Nacua in their flex spot on London time this week. They didn't have
        much better options on their bench, but this is still some blatant mismanagement. Their
        kicker and team mascot Cam Little also put up 0 points, but he was not injured, just bad. He
        has since been cut from the squad.
      </p>
      <p>
        Super Ja'Marrio Bros. was once again narrowly behind the top team of the week, sneaking
        under the radar as a very scary team to face off with. The weekly ceiling for this team is
        extremely high, especially when Ja'Marr Chase gets 23 targets in a game. If Baker Mayfield
        had one of his typical games, this team easily would've had the highest week of the season
        this week.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        Lord of the Littles will be in an Avon Division matchup with First Down Syndrome in week 8,
        and it seems like they will be setting their lineup in advance this time. Super Ja'Marrio
        Bros. will be up against the #1 seed D.K's Dying Minions in week 8.
      </p>
    </div>
  );
};

const MatchupArticleFive = () => {
  return (
    <div>
      <ArticleHeader>Matchup #5</ArticleHeader>
      <ArticleSubheader>Criminals Make The Difference</ArticleSubheader>
      <p>
        First Down Syndrome didn't have a great week by any measure, but it was pretty middle of the
        road. They had a chance to win on MNF, but Nico Collins let them down with just 6.7 points
        (6 7). Their defense struggled in the Unc Bowl and ended up with -1 point, so a different
        defensive selection could've made all the difference in this one.
      </p>
      <p>
        Uncle Rico Went Pro had 4 massive performances that helped them secure this victory, with 2
        criminals leading the way. Rashee Rice was excellent in his return from suspenion, scoring
        23.2 points on a limited number of snaps, scoring his points as quickly as he could.
        Quinshon Judkins also put in 26.4 points this week and beat up on a weak Miami defense. NE
        Defense and Davante Adams were the other two boomers this week.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>
        First Down Syndrome will be up against Avon Division rival Lord of the Littles in week 8.
        Uncle Rico Went Pro will be up against 1-6 Tragedy of an Unlucky Man, where they're all but
        a lock for 150 points.
      </p>
    </div>
  );
};

const MatchupArticleSix = () => {
  return (
    <div>
      <ArticleHeader>Matchup #6</ArticleHeader>
      <ArticleSubheader>CMC Torture</ArticleSubheader>
      <p>
        The Barkley Brawlers had this game in the bag for most of the week, as their early players
        exceeded expectations while their opponents players struggled. Chris Olave and Tucker Kraft
        did their job, scoring 26.8 and 16.8 points respectively. The rest of their team struggled
        this week, so they didn't even end up cracking 100 points. Bo Nix was resting on their bench
        with nearly 40 points, which is one struggle of rostering multiple QBs.
      </p>
      <p>
        WalterPickens was in a rough spot until Sunday Night Football, where CMC put on a
        masterclass. In his first game with George Kittle back, he was able to rack up over 100
        yards rushing and still had his normal WR stat line of 7 catches for 72 yards too. All of
        that came along with 2 TDs, for a total of 39.1 points, the most of any RB this season. This
        gave WalterPickens a 20 point lead going into MNF, where it was Jared Goff vs Cade Otton +
        20 points, and Otton ended up outscoring Goff straight up thanks to Gibbs monster game on
        the ground.
      </p>
      <MatchupPlot data={starterData} matchupId={6} />
      <p>
        The Barkley Brawlers will be in MotW in week 8 against 5-2 BBCU. WalterPickens will be
        facing the 3-4 Costco Guys.
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
        A couple of top-tier weeks, but mostly a big week of mismanagement cost us some high scores.
      </p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>This week was very similar to last week, but with more mismanagement.</p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>Only 1 close game this week, the rest of the matchups were not close at all.</p>
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
        Another week with a lot of movement. Lord of the Littles lost their top spot and fell all
        the way to 4 after they struggled to score points this week. The cluster of 3-4 teams
        shifted around a lot based on W/L and PF changes. The bottom of the leaderboard saw no
        change, with Bye Week Curious and Tragedy of an Unlucky Man remaining in the last 2 spots.
      </p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>
        Almost everyone looks lucky now with how unlucky Tragedy of an Unlucky Man has been. Singing
        Like Mariah Terry is the only other team on the unlucky half of the chart at this point. The
        lucky and good corner is getting crowded with our top 4 teams all trying to get there. BBCU
        took over the very bottom corner from Lord of the Littles this week.
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
        BBCU takes over the top spot this week after their 2nd straight week leading the league in
        scoring. Lord of the Littles fell 3 spots here, just like they did in the actual standings.
        Tragedy of an Unlucky Man's schedule is officially harder than playing our best individual
        team every week, with a difficulty of 75.61, and BBCU only at 74.26 ability. Bye Week
        Curious dropped down to 11th, and The Barkley Bralwers took over last place from Uncle Rico
        Went Pro, who jumped up to 9th.
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
        Despite what the standings look like, it appears that last place is Bye Week Curious' to
        lose, assuming Tragedy of an Unlucky Man has a change of luck. Bye Week Curious has over 50%
        chance to get last in the simulations, Tragedy of an Unlucky Man would have to win a game to
        make this happen. The top 4 teams are clearly a class above the rest, all with over 95%
        chance to make the playoffs in both simulations. According to WalterPicks the final playoff
        spot is up for grabs for a number of teams, and nobody is fully out yet, not even Tragedy of
        an Unlucky Man.
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
        No motion here, this shows how many weeks we have had where all the top teams win and all
        the bottom teams lose, just like this week.
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
        league. BBCU could have over 1k PF and not even be in first place. Bye Week Curious would be
        0-7 if their opponents made the right start/sit decisions against them, and they wouldn't
        even have 800 PF with their optimal lineups.
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
        Tragedy of an Unlucky Man is the hardest schedule for 10/12 teams, yet another metric to
        show just how tough they've had it so far. The Barkley Brawlers are the easiest schedule for
        6/12 teams. BBCU would be 7-0 with either Costco Guys or Lord of the Littles schedule, but
        just 3-4 with Tragedy of an Unlucky Man's schedule.
      </p>
    </div>
  );
};

const MotWDangerArticle = () => {
  return (
    <div>
      <ArticleHeader>MotW Possibilities</ArticleHeader>
      <ArticleSubheader>Glizzy Division Could Come Back</ArticleSubheader>
      <DangerTable data={dangerTable} />
      <ArticleCaption>MotW Danger Metric</ArticleCaption>
      <p>
        Now that BBCU has run through the Glizzy Division, it is time to hand off the baton to The
        Barkley Brawlers, who could bring MotW back to D.K's Dying Minions in week 9. This is also
        the best shot we will have at getting Lord of the Littles into MotW for the first time ever,
        since they play D.K's Dying Minions in week 10.
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
      <ArticleSubheader>More Collusion From Alec</ArticleSubheader>
      <p>
        Alec blatantly tried to collude with Anthony this week texting him "I think you should throw
        for the bit" after almost everyone picked against him in survivor. This is the second
        straight week where Alec is involved in a collusion allegation involving survivor.
      </p>
      <ArticleSubheader>The Little Lineup Unset</ArticleSubheader>
      <p>
        Josh Little did not set his lineup properly before the London game this week, leaving an
        injured Puka Nacua in his starting lineup. This decision ended up being inconsequential, but
        it did cause some unrest amongst fellow league managers. Some managers did not fault Josh
        Little for not setting his lineup:
      </p>
      <LeagueQuote>
        "9:30 games should be against the law it's unamerican"
        <br />- Josh Kraines
      </LeagueQuote>
      <p>
        Josh Little did not know there was an early game this week, but had multiple days between
        when Puka was ruled out and when the game started to make changes. The commissioner did not
        comment on this matter.
      </p>
      <ArticleSubheader>Shots or Dogs?</ArticleSubheader>
      <p>
        The league had an interesting debate after Greg did 7 shots at once for his MotW video; what
        is the number of shots/dogs where you choose to do one over the other? The Offensive Line
        did not do enough investigative reporting on this, but will have results in next week's
        edition summarizing the thoughts of the league. Anecdotally, some managers said more than 2
        hotdogs is too many, where others would prefer to eat hotdogs if it gets above 4. Alec even
        mentioned that he could eat 10 hotdogs in one sitting, which Anthony doubted heavily. Alec
        may one day have to eat 10 hotdogs given his luck in MotW historically.
      </p>
      <ArticleSubheader>League Submissions</ArticleSubheader>
      <LeagueQuote>
        "I don't feel bad for Alex. "<br />- Anthony
      </LeagueQuote>
      <p>
        Anthony beat the snot out of Alec this week, and doesn't even care enough to get his name
        right. Alec has had the toughest schedule in the league this season, and is in prime
        position to do his 3rd punishment because of it.
      </p>
      <LeagueQuote>
        Gobbling glizzies
        <br />
        Prophesied by distant gods -<br />
        Lords of schedules.
        <br />- Anonymous League Manager
      </LeagueQuote>
      <p>
        Another banger from the anonymous league poet, this time in reference to Alec and his MotW
        woes. May the random schedule always be going through the Glizzy Division.
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
      <ArticleImage src={"https://i.imgur.com/GaR0sYS.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/RREioXk.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/Wc6Qj0x.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/jajmHzr.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/QNIIj61.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/ierOp6z.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/iet2vOs.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/dKoe0WL.png"}></ArticleImage>
      <ArticleCaption>Submitted Anonymously</ArticleCaption>
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
