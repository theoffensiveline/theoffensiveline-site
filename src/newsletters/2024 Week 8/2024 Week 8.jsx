import { MotWRules, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable, PfPaScatter, AltLeaderboardTable, ArticleCaption, LeagueQuote, AwardsGridV2, DangerTable, WeeklyScoringChart, PowerRankingsTable, ScheduleTable, WeeklyMarginTable, PlayoffTable } from '../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
import medianLbData from './medianLb.json';
import motwHistoryData from './motwTable.json';
import playoffData from './playoffTable.json';
import powerRankingsData from './powerRankings.json';
import scheduleData from './scheduleData.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';
import dangerTable from './dangerTable.json';
import motwFuture from './motwFuture.png';

export const newsDate = '2024-10-31';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 8</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Did you guys know it was National Tight End Day in week 8? We had the #1 highest scoring TE of the season this week when Cade Otton put up 29.1 points for Just Johsin pt. 2. Other top TE performances included Kyle Pitts (25.1 points), Travis Kelce (25 points), George Kittle (24.8 points), and Trey McBride (21.4 points). You know it was national tight end day when the highest scoring TE outscored the highest scoring RB.
            </p>
            <p>
                The top scoring player this week was CeeDee Lamb, who scored a whopping 39.6 points, which was the #2 WR performance of the season. They were on the #2 highest scoring team of the season, League Camera Prophecy. League Camera Prophecy defeated Just a Hospital Ward by 62.96 points, the #2 highest margin of victory of the season. Lots of #2 for League Camera Prophecy this week.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                There were no perfect managers this week, but Pink Pony Kupp came extremely close, only leaving 0.48 points on their bench, for 99.7% of their maximum score. Giving Me a Chubb had the worst management of the season so far, at only 66.5% of their maximum, leaving a season high 50.84 points on their bench. They had the 3rd highest potential score this week and had the 11th highest actual score. Not much to get a Chubb about there.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>"Prophecies are often mistaken."</ArticleSubheader>
            <p>
                In order to get Fortnite Master Builder back into matchup of the week, Just a Hospital Ward would have had to win this game. That was not in the cards after half of their team was injured in previous weeks, and they were forced to start players like Tyler Allgeier and Troy Franklin. Cole Kmet didn't get the memo that it was National Tight End Day either. The only 3 players that played well were Jayden Daniels (thanks mostly to a hail mary), James Cook, and Keon Coleman. This will result in 6 shots/dogs, tying the season high.
            </p>
            <p>
                League Camera Prophecy put up the highest score in the league for the second straight week, breaking the MotW prophecy along the way. They could've beaten Just a Hospital Ward with only 4 of their players, CeeDee Lamb, Brock Purdy, Joe Mixon, and one of Terry/Kraft/LAC. They became the first team to defend the MotW title this season, and have moved all the way up to 7th in the standings in the process.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                League Camera Prophecy will play against fellow 4-4 team Kirk Thuggins & The Boys in week 9. Just a Hospital Ward gets matched up against the 2-6 last place team Fortnite Master Builder.
            </p>
            <ArticleSubheader>Matchup of the Week 2023-24</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
            <ShotsDistributionChart chartData={shotsDistData} />
        </div>
    )
}

const MatchupArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Matchup #2</ArticleHeader>
            <ArticleSubheader>All Chubbed Up With Nowhere to Go</ArticleSubheader>
            <p>
                Now here's a guy who doesn't have any help at receiver...kinda like Patrick Mahomes. Romeo Doubs and Amari Cooper combined for less points than either of the receivers on the bench for Giving Me a Chubb. Patrick Mahomes also sat on the bench in this game, and nearly doubled the starting QBs point total, as Caleb Williams couldn't even get double digits this week. In hindsight, that wasn't even the biggest mistake of the week. Starting Nick Chubb over Tyrone Tracy cost this team nearly 20 points this week. All around a tough week for Giving Me a Chubb, who just lost their 3rd straight game after a 4-1 start.
            </p>
            <p>
                First Down Syndrome had standout games from Kittle and Hurts for the 3rd straight week, and was able to get the win this time, thanks to the support they got from Tyreek Hill, their RBs, and their defense. Kittle and Hurts have been absolutely carrying this team every week, and that is unlikely to change, unless Tyreek Hill starts joining the carry too now that Tua is back.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                First Down Syndrome will matchup with Costo Guys in week 9, and Giving Me a Chubb will play against Just Joshin pt. 2.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>One Two-Loss Team Remains</ArticleSubheader>
            <p>
                Just Joshin pt. 2 became only the 6th team to break 150 this week, putting up 150.02 points. Their only super disappointing players were DJ Moore and Chase McLaughlin. They had the top TE of the week in Cade Otton, and the top DEF this week in DET. The rest of their team put decent to great numbers as well on their way to their 6th victory this season.
            </p>
            <p>
                Costo Guys was the 4th highest scoring team this week, but that wasn't enough to win this matchup between the top two teams in the standings. Lamar Jackson and Rhamondre Stevenson put up over 23 points each, but Breece Hall didn't bring the boom as he couldn't reach double digits again this week.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Just Joshin pt. 2 looks to give Giving Me a Chubb their 4th straight loss in week 9, and Costo Guys will play against 3-5 First Down Syndrome.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Kirk Thuggins Narrowly Avoids 3-5 Start</ArticleSubheader>
            <p>
                This matchup was between the 7th and 9th highest scorers this week, both teams finishing below the league median. Kirk Thuggins & The Boys got the win this week, lifting them up to a 4-4 record and the #4 spot in the standings thanks to their impressive PF. Kirk Cousins, Alvin Kamara, and newly acquired Jonathan Taylor were instrumental to their success this week. Brandon Aubrey had a down week after his jury duty stint this week.
            </p>
            <p>
                Fortnite Master Builder lost their 4th game decided by less than 10 points this season, to fall to last place in the standings with a 2-6 record. They had 4 players put up respectable numbers this week, but were let down by the rest of their squad. Jake Ferguson was another TE that missed the memo this week, and Wil Lutz continued his "every other week" pattern that has plagued him all season.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Kirk Thuggins & The Boys will play against League Camera Prophecy in week 9. Fortnite Master Builder will try to earn their third win in a matchup with Just a Hospital Ward.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>"The Hubble Curse Holds True"</ArticleSubheader>
            <p>
                Twin Bowers has a history of losing to any former residents of the Hubbell residence, and that trend continued this week in this loss to Pink Pony Kupp. Jordan Love getting injured didn't help, as this stopped him and Jayden Reed's scores from reaching their potential. Even if Love continued, it is unlikely those 2 make up the remaining points needed to take down the #2 team this week.
            </p>
            <p>
                Pink Pony Kupp had only their kicker and defense below 10 points, one week after having to eat 4 hot dogs thanks to a worse performance when the stakes were higher. This week over half of their starting lineup scored more than 15 points, with David Montgomery coming very close to that mark as well. Kyle Pitts was one of the big beneficiaries of National Tight End Day, scoring a team high 25.1 points this week.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                Pink Pony Kupp will play against Youngster Joey in week 9, and Twin Bowers will play against Calvin's Cold Streak, a winnable game against a non-Hubbell foe.
            </p>
        </div>
    )
}

const MatchupArticleSix = () => {
    return (
        <div>
            <ArticleHeader>Matchup #6</ArticleHeader>
            <ArticleSubheader>Battle of the RBs</ArticleSubheader>
            <p>
                In this matchup between two 3-4 teams, Calvin's Cold Streak was able to come out ahead and move to 4-4 on the season. They needed the points from most of their players, but most of their points came from Josh Jacobs, Travis Kelce, Ja'Marr Chase and Najee Harris. Stefon Diggs was having a decent game as well before blowing up his knee. The other team members didn't do very well, but did enough to help get the team the W.
            </p>
            <p>
                Youngster Joey usually relies on his RBs to score big to win, and that didn't happen this week. Saquon was the top RB scorer with 12.1 points, and had 3 TDs vultured by Jalen Hurts. Marvin Harrison and Kyler Murray played well, both scoring over 22 points, but they can't be the only ones cooking if this team wants to win games. Mark Andrews extended his TD streak for National Tight End Day, but that was one of the few highlights from this team. George Pickens nearly had 2 TDs in his MNF game, but ended up with 0 TDs instead. If either of those had counted, Youngster Joey would've won this matchup.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Calvin's Cold Streak will play against Twin Bowers in week 9. Youngster Joey will play against Pink Pony Kupp in week 9.
            </p>
        </div>
    )
}

const ScoringDistributionArticle = () => {
    return (
        <div>
            <ArticleHeader>Scoring Distributions</ArticleHeader>
            <ArticleSubheader>Distribution of Scoring</ArticleSubheader>
            <StackedHistogram chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>
            <p>
                2nd highest score of the season this week, and a pretty evenly distributed week otherwise, with a pretty high floor.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                4th straight week with an increased maximum score, and the other metrics all are up from last week as well. Solid week across the board.
            </p>
            <WeeklyMarginTable matchupData={matchupData} leaderboardData={leaderboardData} />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
            <p>
                As discussed earlier, Fortnite Master Builder suffered their 4th close defeat of the season this week, the most in the league. Calvin's Cold Streak won their 3rd close victory of the season, out of 4 total victories.
            </p>
        </div >
    )
}

const StandingsArticle = () => {
    return (
        <div>
            <ArticleHeader>Standings & Points</ArticleHeader>
            <ArticleSubheader>Current Standings</ArticleSubheader>
            <LeaderboardTable leaderboardData={leaderboardData} />
            <p>
                Just Joshin pt. 2 takes over 1st place in the standings, with the 2nd lowest PA in the league, only to League Camera Prophecy. Kirk Thuggins & The Boys has the 2nd highest PF, but is .500 so they sit atop the 6-way tie in the middle of the standings. Fortnite Master Builder falls to last place, as the only team with 6 losses. They have the 3rd fewest PF this season.
            </p>
            <ArticleSubheader>PF Vs. PA</ArticleSubheader>
            <PfPaScatter leaderboardData={leaderboardData} />
            <p>
                Segmenting this chart, we have 4 bad teams, 1 good team, 4 lucky teams, and 1 unlucky team. We have 4 teams in the middle that don't fit any of those criteria from this chart alone.
            </p>
        </div>
    )
}

const PowerRankingsArticle = () => {
    return (
        <div>
            <ArticleHeader>Power Rankings</ArticleHeader>
            <ArticleSubheader>Current Power Rankings</ArticleSubheader>
            <PowerRankingsTable powerRankingsData={powerRankingsData} />
            <ArticleCaption>Team Ability of 100 would mean you were the best team every week, and 0 would mean that you were the worst team every week.<br />Strength of Schedule of 100 would mean you played the best team every week, and 0 would mean that you played the worst team every week.</ArticleCaption>
            <p>
                Lots of movement here this week, aside from either end of the power rankings. Pink Pony Kupp moves up to the 2 spot after another solid week in the top half of league scoring. Just Joshin pt. 2 moves up to #3 after defeating Costo Guys this week and putting up the 2nd most points in the league. League Camera Prophecy made another leap to #4 after their 2nd straight week of scoring the most points. Twin Bowers fell 3 spots to #6, but has had by far the most difficult schedule of any team. Giving Me a Chubb fell 5 spots to #7 after scoring the 2nd fewest points this week and losing their 3rd straight game.
            </p>
        </div>
    )
}

const PlayoffOutlookArticle = () => {
    return (
        <div>
            <ArticleHeader>Playoff / Last Place Outlook</ArticleHeader>
            <ArticleSubheader>Magic Numbers and Simulations</ArticleSubheader>
            <PlayoffTable playoffData={playoffData} />
            <ArticleCaption>Odds sourced from FFHub for now. *Note: These odds are calculated purely from the history of each team's scores this year. It does not take projections or byes into account. It uses that data to run 10,000 monte carlo simulations of each matchup given a team's average score and standard deviation.<br />Playoff Magic # = # of your wins + # of 7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic # = # of your wins + # of last place losses for you to be eliminated from the race outright before tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have to overtake 11th place.
            </ArticleCaption>
            <p>
                After 8 weeks, we have brought back the playoff outlook article. There are 3 teams sitting above the 6-way tie in the middle of the standings. The simulations give those teams pretty good playoff odds, and miniscule odds for last place. There are also 3 teams below the 6-way tie, and the bottom 2 teams are the teams that are most likely to get last place according to the simulations.
            </p>
        </div>
    )
}

const AlternateUniverseArticleOne = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universe #1</ArticleHeader>
            <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
            <AltLeaderboardTable data={medianLbData} />
            <ArticleCaption>If everyone played their matchup each week, and also played against the median, this is what the leaderboard would look like.</ArticleCaption>
            <p>
                First Down Syndrome, despite having the fewest PF, would be 8-8 if we also played against the median each week. Fortnite Master Builder would be 3-13 and solidly in last place.
            </p>
        </div>
    )
}

const AlternateUniverseArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universe #2</ArticleHeader>
            <ArticleSubheader>Best Ball Standings</ArticleSubheader>
            <AltLeaderboardTable data={bestBallLbData} />
            <ArticleCaption>If everyone played their best lineup every week, this is what the standings would look like. All columns include hypothetical totals.</ArticleCaption>
            <p>
                Just a Hospital Ward finally took a best ball loss this week. 7-1 if this was a best ball league is impressive. The standings look a lot different, showcasing how much your management decisions impact the outcomes each week.
            </p>
        </div>
    )
}

const AlternateUniverseArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universe #3</ArticleHeader>
            <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
            <ScheduleTable data={scheduleData} />
            <p>
                We no longer have any hypothetically undefeated teams, but we still have an 0-8 possibility, First Down Syndrome with Twin Bowers schedule. The widest range of outcomes belongs to a few different teams, all with a best possible record of 7-1 and a worst possible record of 2-6. Those teams are Giving Me a Chubb, Just Joshin pt. 2 and Twin Bowers. Just Joshin pt. 2 is 6-2 and the other teams are 4-4.
            </p>
        </div>
    )
}

const MotWDangerArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>This Week Will Guarantee Safety For 4 Teams</ArticleSubheader>
            <DangerTable data={dangerTable} />
            <ArticleCaption>MotW Danger Metric</ArticleCaption>
            <p>
                With a League Camera Prophecy victory this week, 4 teams could be eliminated from regular season MotW possibilities. Those teams are Giving Me a Chubb, Costo Guys, Calvin's Cold Streak, and Pink Pony Kupp.
            </p>
            <p>
                With a Kirk Thuggins & The Boys victory this week, 4 teams could be eliminated from regular season MotW possibilities. Those teams are League Camera Prophecy (after this punishment, which is inevitable anyway), Fortnite Master Builder, First Down Syndrome, and Just Joshin pt. 2.
            </p>
            <ArticleSubheader>Previewing Future MotW</ArticleSubheader>
            <ArticleImage src={motwFuture} />
            <ArticleCaption>This will get fixed eventually to be less shitty and not an image.</ArticleCaption>
        </div>
    )
}

const LeagueBuzzArticle = () => {
    return (
        <div>
            <ArticleHeader>League Buzz</ArticleHeader>
            <ArticleSubheader>League Managers Flee The Country</ArticleSubheader>
            <p>
                A few league managers wanted to try to get their eyes on some real football to try and get a leg up against the rest of the league. They decided to go to Europe in hopes of finding some football to watch, but little did they know football means something else over there. Their research trip was a waste of their time and money, unless they decide to stick around to watch the Giants and Panthers game in week 10, but that isn't likely to help them in fantasy football either. At least they will be able to dominate the 3am post-waiver free-agent market as long as they stay over there.
            </p>
            <LeagueQuote>
                "Their hotdogs are on a mini baguette"<br />- Alec
            </LeagueQuote>
            <p>
                Their research did yield one interesting factoid, but sadly Alec won MotW so we will have to wait to get an international dog eating performance.
            </p>
            <ArticleSubheader>Fantasy Football Haters</ArticleSubheader>
            <LeagueQuote>
                "'I think I'd be a happier person if I didn't do fantasy football'" - Alec<br />- Kyle
            </LeagueQuote>
            <p>
                Kyle has suffered through the most difficult schedule in the league, while Alec has suffered through the most hot dogs in the league.
            </p>
            <ArticleSubheader>League Trophy?</ArticleSubheader>
            <p>
                This league needs a trophy, and Josh K found a Weinermobile pedal car on marketplace that is a great candidate. A little pricy, but it could be worth it.
            </p>
        </div>
    )
}

const Meme1 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/98kkme.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme2 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/98kjbl.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme3 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/98kl84.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme4 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/98klfg.gif"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme5 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/98klnj.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme6 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/98klrz.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Trevor</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme7 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/98kn5f.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const Meme8 = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/98ko4b.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

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
