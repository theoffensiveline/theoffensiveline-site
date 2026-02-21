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
  ArticleCaption,
  LeagueQuote,
  AwardsGridV2,
  WeeklyScoringChart,
  WeeklyMarginTable,
} from "../../../components/newsletters/newsStyles";
import awardsData from "./awardsTable.json";
import efficiencyData from "./efficiencyData.json";
import leaderboardData from "./leaderboard.json";
import matchupData from "./matchupData.json";
import motwHistoryData from "./motwTable.json";
import shotsDistData from "./shotsDist.json";
import starterData from "./starters.json";
import { leagueIds } from "../../../components/constants/LeagueConstants";

export const newsDate = "2026-01-01";

const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week 17</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>
        The championship matchup was extremely underwhelming, aside from the fact that it was the
        closest game of the week. The Barkley Brawlers defeated Uncle Rico Went Pro by 8.82 points
        in the championship final. They had the best WR and DEF this week, and the most points left
        on the bench and the individual bench performance as well. The best loser of the week, Worst
        Management, scored more points than our champion did.
      </p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>
        The worst manager of the week was our champion The Barkley Brawlers at just 71.8%
        efficiency. Luckily for them their opponent was also low efficiency at just 75.1% this week
        with a lower ceiling.
      </p>
    </div>
  );
};

const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>Championship Game</ArticleSubheader>
      <p>
        The Barkley Brawlers ended their season on a fitting note, with their opponent scoring only
        102.16 points to win them the championship. The Saints carried this team this week with a
        combined 52.4 points from Chris Olave, Juwan Johnson, and NO DEF. Barkley, Cook, Moore and
        Dicker let them down but it didn't matter in the end.
      </p>
      <p>
        Uncle Rico Went Pro had a chance in this one on Monday Night Football with Matthew Stafford
        needing 21.6 points to get them the win, something he had done 8 times this season. He ended
        up having his 3rd worst game of the season with just 12.76 points. Chase Brown and Cam
        Little popped off this week but they couldn't overcome the hole that Jaylen Waddle left when
        he got injured early in his game.
      </p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>
        Congratulations to The Barkley Brawlers who have won their first championship in this
        league. Uncle Rico Went Pro will be doing 5 shots/dogs as a result of this loss.
      </p>
      <ArticleSubheader>Matchup of the Week 2025</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleCaption>
        <a href={`/league/${leagueIds.mainLeague}/hot-dogs`}>Full Matchup of the Week History</a>
      </ArticleCaption>
      <p>
        The Barkley Brawlers earned their 6th MotW victory, tied for 4th most all-time. Their 28
        shots/dogs given out is 4th most all-time. Uncle Rico Went Pro lost their 7th MotW and 3rd
        this season. Their 29 shots/dogs consumed is 5th most all-time.
      </p>
      <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
      <ShotsDistributionChart chartData={shotsDistData} />
    </div>
  );
};

const MatchupArticleTwo = () => {
  return (
    <div>
      <ArticleHeader>3rd Place Game</ArticleHeader>
      <ArticleSubheader>BBCU Yearns For Olave</ArticleSubheader>
      <p>
        BBCU put up 146.4 points last week in the playoff semi-finals, and 145.94 points this week
        in the 3rd place game. If they didn't do the Chris Olave for $100 FAAB and Ladd McConkey
        trade this season, they would've been the champion of the league. Instead they got 3rd place
        and Bijan and Trey McBride put up huge numbers in a meaningless game.
      </p>
      <p>
        Worst Management had Drake Maye go for 32.44, and their team total of 111.24 also would've
        won them the championship over either of the actual competitors. Omarion Hampton had 20 and
        Jonathan Taylor had 17.4 points in week 17.
      </p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>
        Both of these teams will regret their week 16 performances since they could've won it all if
        they had won week 16.
      </p>
    </div>
  );
};

const MatchupArticleThree = () => {
  return (
    <div>
      <ArticleHeader>Toilet Bowl Final</ArticleHeader>
      <ArticleSubheader>RB Hell</ArticleSubheader>
      <p>
        Bye Week Curious got a win in the toilet bowl championship by putting up 95.48 points, led
        by Colston Loveland who had 21.4 points this week. RJ Harvey had 18.6 and PHI DEF had 13
        points. This was enough to avoid a music video getting tacked on to the punishment they
        already have.
      </p>
      <p>
        Worse Management had a rough week at the RB and TE position, which are all barely legible on
        this chart. Josh Jacobs had 1.3 points with 4 carries for 3 yards and 1 catch for no yards.
        Tyjae Spears had 1.1 points with 6 carries for 2 yards and 1 catch for -1 yard. Taysom Hill
        had 0 points with 3 carries for 0 yards. Their bench TE option was Darren Waller who had 1
        point with 1 catch for 0 yards. Their 75.32 points was really low but was not the lowest of
        all teams this week.
      </p>
      <MatchupPlot data={starterData} matchupId={4} />
      <p>
        The argument about the punishment for this matchup is still ongoing, with the league
        commissioner in line for the punishment making the discussion very interesting.
      </p>
    </div>
  );
};

const MatchupArticleFour = () => {
  return (
    <div>
      <ArticleHeader>10th Place Game</ArticleHeader>
      <ArticleSubheader>8 BIG DOOMS</ArticleSubheader>
      <p>
        Costco Guys started 9 healthy players this week and only one of those players scored over 10
        points. Tony Pollard was their highest scorer with 11.5 points. Their total of 68.08 points
        was the 2nd lowest score of any team this season, only above their own week 13 score of
        53.04 points.
      </p>
      <p>
        Super Ja'Marrio Bros. nearly doubled up on their opponent this week with 132.14 points.
        Ja'Marr Chase and Wan'Dale Robinson both had over 22 points and Baker Mayfield, Kyren
        Williams and Brandon Aubrey all had 16+ points. They would've won this game with only any 4
        of these 5 players.
      </p>
      <MatchupPlot data={starterData} matchupId={5} />
      <p>Costco Guys will have 8 shots/dogs to consume thanks to this loss.</p>
    </div>
  );
};

// const MatchupArticleFive = () => {
//     return (
//         <div>
//             <ArticleHeader>Toilet Bowl Semifinal #2</ArticleHeader>
//             <ArticleSubheader>Tony Pollard &gt; Josh Jacobs</ArticleSubheader>
//             <p>
//                 Costco Guys was led by Kenneth Gainwell with 23.8 points this week and Jahmyr Gibbs follwed closely with 22.8 points. Dalton Schultz, HOU DEF, Tony Pollard, and Chase McLaughlin round out the rest of their double digit scorers. Their lowest scorers were Brian Thomas and Lamar Jackson so they were lucky to get out of this one with a win while putting up less than 110 points.
//             </p>
//             <p>
//                 Worse Management, not to be confused with the playoff team Worst Management, struggled to score this week and only got a total of 6.2 points from their RBs while their opponent got 56.8 points from theirs. They won the WR battle in a similar but slightly worse fashion, and couldn't make up the gap at any other position either.
//             </p>
//             <MatchupPlot data={starterData} matchupId={5} />
//             <p>
//                 Costco Guys will be in the 10th place game against Super Ja'Marrio Bros. next week. Worse Management will be advancing to the toilet bowl final against Bye Week Curious.
//             </p>
//         </div>
//     )
// }

// const MatchupArticleSix = () => {
//     return (
//         <div>
//             <ArticleHeader>8th Place Game</ArticleHeader>
//             <ArticleSubheader>7 shots/dogs with 3 9.Xs</ArticleSubheader>
//             <p>
//                 2nd Half Team put up exactly 100 points this week and had a majority of it come from 3 players, Derrick Henry with 22.8 points, Harold Fannin with 19.5 points, and Kyle Pitts with 18.7 points. The only other double digit scorer on their team was Jameson Williams with 12 points. They were lucky to win this one as they would've had to do 5 shots/dogs including one for Josh Allen.
//             </p>
//             <p>
//                 First Down Syndrome did not do well in the matchup and has an impressive 7 shots/dogs to consume while scoring a relatively respectable 83.8 points in the process. A lot of their players edged the 10 point threshold but only 2 could get over the line this week. The Offensive Line doesn't have a good metric for this currently, but this might be the unluckiest 7 shot/dog performance of all time.
//             </p>
//             <MatchupPlot data={starterData} matchupId={6} />
//             <p>
//                 These teams are done for the season early after winning their first round toilet bowl matchups and fighting for 7th and 8th place.
//             </p>
//         </div>
//     )
// }

const ScoringDistributionArticle = () => {
  return (
    <div>
      <ArticleHeader>Scoring Distributions</ArticleHeader>
      <ArticleSubheader>Distribution of Scoring</ArticleSubheader>
      <StackedHistogram chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>
      <p>Who knew the playoffs would be so low scoring?</p>
      <WeeklyScoringChart chartData={matchupData} />
      <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
      <p>Downwards trends all around in the final week of the season.</p>
      <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
      <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      <p>
        The championship was the only close game this week, and the only close game in either main
        bracket in the playoffs.
      </p>
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

// const StandingsArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Standings & Points</ArticleHeader>
//             <ArticleSubheader>Current Standings</ArticleSubheader>
//             <LeaderboardTable leaderboardData={leaderboardData} />
//             <p>
//                 Standings are locked in now, with not much movement this week. There was no consequential movement that changed anything. The biggest change was the playoff seeds swapping opponents and moving MotW around.
//             </p>
//             <ArticleSubheader>PF Vs. PA</ArticleSubheader>
//             <PfPaScatter leaderboardData={leaderboardData} />
//             <p>
//                 All 6 of the playoff teams are on the good side of the PF/PA line, and Costco Guys is the 7 seed with at .500 record who is also on the good side of the line. The other 5 toilet bowl teams are on the bad side of the line. It is tough to win when you are outscored on average.
//             </p>
//             <ArticleSubheader>Starting Lineup Analysis</ArticleSubheader>
//             <LineupScatter data={startingLineupData} />
//             <p>
//                 BBCU continues to sit in the top right, but it is tough to see movement in this chart week to week this late in the season. The last place team is in the bottom left, we will see if that trend continues next season, and The Offensive Line may do some work in the off-season to analyze historical trends as well.
//             </p>
//         </div>
//     )
// }

// const PowerRankingsArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Power Rankings</ArticleHeader>
//             <ArticleSubheader>Current Power Rankings</ArticleSubheader>
//             <PowerRankingsTable powerRankingsData={powerRankingsData} />
//             <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 1 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 1 would mean that you played the worst team every week.</ArticleCaption>
//             <p>
//                 The power rankings going into the playoffs have 5 of the 6 playoff teams in the top-6 teams. The Barkley Brawlers are the 3-seed but are 9th in the playoff rankings. They would be 64-90 against all teams this season which shows how easy their schedule has been to get the 3-seed. They had the easiest schedule this season with a difficulty of 32.5. This was slightly harder than playing against Bye Week Curious every week who only had a team ability of 26.74.
//             </p>
//         </div>
//     )
// }

// const PlayoffOutlookArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>Playoff / Last Place Outlook</ArticleHeader>
//             <ArticleSubheader>Magic Numbers and Simulations</ArticleSubheader>
//             <PlayoffTable playoffData={playoffData} />
//             <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation. We are now also sourcing playoff odds from  WalterPicks! These are based on future projections, rather than historical data.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
//             </ArticleCaption>
//             <p>
//                 Three more teams clinched a playoff spot this week, and there are now two spots left to fill. There will be 4 teams fighting for those 2 spots, and they all have a shot at them if things break right. Costco Guys is the least likely team to make it thanks to their low PF. It looks extremely likely that Uncle Rico Went Pro will make it in, and Lord of the Littles is likely to make it as well.
//             </p>
//             <p>
//                 While it is technically true that Super Ja'Marrio Bros. and Singing Like Mariah Terry can finish with the same 5-9 record as Bye Week Curious and 36 Spikeball Pro Nets, it is virtually impossible for them to get last since they have a massive PF lead on Bye Week Curious. So the 2 teams in true contention for last are the 4-9 teams. Bye Week Curious can avoid last with a win and a loss from 36 Spikeball Pro Nets, which the simulations give a 26% chance of.
//             </p>
//         </div>
//     )
// }

// const AlternateUniverseArticleOne = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #1</ArticleHeader>
//             <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
//             <AltLeaderboardTable data={medianLbData} />
//             <ArticleCaption>If everyone played their matchup each week, and also played against the median, this is what the leaderboard would look like.</ArticleCaption>
//             <p>
//                 The Barkley Brawlers would've snuck into the playoffs as the 6 seed, but all the playoff teams would remain unchanged in this universe. The last place team would also remain the same.
//             </p>
//         </div>
//     )
// }

// const AlternateUniverseArticleTwo = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #2</ArticleHeader>
//             <ArticleSubheader>Best Ball Standings</ArticleSubheader>
//             <AltLeaderboardTable data={bestBallLbData} />
//             <ArticleCaption>If everyone played their best lineup every week, this is what the standings would look like. All columns include hypothetical totals.</ArticleCaption>
//             <p>
//                 Uncle Rico Went Pro would be 11-3 and in 1st if they made the right start/sit decisions every single week. Bye Week Curious would still be in last at 2-12.
//             </p>
//         </div>
//     )
// }

// const AlternateUniverseArticleThree = () => {
//     return (
//         <div>
//             <ArticleHeader>Alternate Universe #3</ArticleHeader>
//             <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
//             <ScheduleTable data={scheduleData} />
//             <p>
//                 BBCU has had the worst possible schedule for them, sitting at 9-5 in the wosrt case, matching their current record. They would be 13-1 with Costco Guys or Lord of the Littles schedule. Super Ja'Marrio Bros. has also had the worst possible schedule at 5-9, and could be 10-4 with The Barkley Brawlers schedule. The Barkley Brawlers are the easiest possible schedule for 10/12 teams in the league. Cockroach are the hardest schedule for 8/12 teams in the league. The worst possible record is Bye Week Curious at 1-13 with BBCU or WalterPickens schedules.
//             </p>
//         </div>
//     )
// }

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

// const MotWDangerArticle = () => {
//     return (
//         <div>
//             <ArticleHeader>MotW Possibilities</ArticleHeader>
//             <ArticleSubheader>Hubbell Curse 2.0</ArticleSubheader>
//             <DangerTable data={dangerTable} />
//             <ArticleCaption>MotW Danger Metric</ArticleCaption>
//             <p>
//                 The Hubbell Division is dealing with the MotW trap, and hoping it doesn't linger too long into the playoffs. It is possible for at least 3 of these teams to make the playoffs, but MotW could also get sucked into the toilet bowl if things break right.
//             </p>
//             <p>
//                 Super Ja'Marrio Bros. has not been in MotW this season, and they got their second step to dodging it with a BBCU win in week 12. Now they just need an Uncle Rico Went Pro win in week 13 to successfully dodge MotW in the Hubbell Curse gauntlet.
//             </p>
//             <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
//             <ArticleImage src={motwFuture} />
//             <ArticleCaption>This will get fixed eventually to be less shitty and not an image.</ArticleCaption>
//         </div>
//     )
// }

const LeagueBuzzArticle = () => {
  return (
    <div>
      <ArticleHeader>League Buzz</ArticleHeader>
      <ArticleSubheader>League Submissions</ArticleSubheader>
      <LeagueQuote>
        "Matt smith is a fucking pussy - make the song"
        <br />- Alec
      </LeagueQuote>
      <p>
        Alec is taking a strong stance here, but much of the league agrees with his sentiment. Matt
        Smith is being a stickler for the "rules" and is avoiding a punishment in a punishment
        league.
      </p>
    </div>
  );
};

const Meme1 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/3lOw8pD.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme2 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/HWcgdRn.jpeg"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme3 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/GLCw5sn.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme4 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/YdWNOHq.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme5 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/v1NabQZ.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme6 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/LWYbCiU.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme7 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/veHPtXh.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme8 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/PpKPy3j.png"}></ArticleImage>
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </ImageWrapper>
  );
};

const Meme9 = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://i.imgur.com/F1xJeY9.png"}></ArticleImage>
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
  // {
  //     id: 6,
  //     content: MatchupArticleFive,
  // },
  // {
  //     id: 7,
  //     content: MatchupArticleSix,
  // },
  {
    id: 8,
    content: ScoringDistributionArticle,
  },
  // {
  //     id: 9,
  //     content: TradingVolumeArticle,
  // },
  // {
  //     id: 10,
  //     content: StandingsArticle,
  // },
  // {
  //     id: 11,
  //     content: PowerRankingsArticle,
  // },
  // {
  //     id: 12,
  //     content: PlayoffOutlookArticle,
  // },
  // {
  //     id: 13,
  //     content: AlternateUniverseArticleOne,
  // },
  // {
  //     id: 14,
  //     content: AlternateUniverseArticleTwo,
  // },
  // {
  //     id: 15,
  //     content: AlternateUniverseArticleThree,
  // },
  // {
  //     id: 16,
  //     content: DivisionArticle,
  // },
  // {
  //     id: 17,
  //     content: MotWDangerArticle,
  // },
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
  {
    id: 28,
    content: Meme9,
  },
  {
    id: 30,
    content: MotWRules,
  },
];

const newsletterData = {
  newsDate: newsDate,
  articles: articles,
  meta: {
    title: "2025 Week 17",
    description: "Testing this feature out to see if it works",
    image: "/banner_logo.png",
  },
};

export default newsletterData;
