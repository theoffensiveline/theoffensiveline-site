import React from 'react';
import { //MotWRules, AwardsTable, 
    ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, WeeklyScoringChart, MatchupPlot, MotwTable, ShotsDistributionChart, LeaderboardTable,
    //PfPaScatter, 
    PowerRankingsTable, PlayoffTable, AltLeaderboardTable,
    //ScheduleTable,
    ArticleCaption, LeagueQuote, AwardsGridV2
} from '../../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
import bestBallLbData from './bestBallLb.json';
import efficiencyData from './efficiencyData.json';
import leaderboardData from './leaderboard.json';
import matchupData from './matchupData.json';
import medianLbData from './medianLb.json';
import motwHistoryData from './motwtable.json';
import playoffData from './playoffTable.json';
import powerRankingsData from './powerRankings.json';
// import scheduleData from './scheduleData.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';

export const newsDate = '2023-11-30';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 12</ArticleSubheader>
            <AwardsGridV2 awardsData={awardsData} />
            <p>
                Week 12 was mostly chalk, with good teams beating bad teams, and little change in the standings. This
                was the 4th week where Just Joshin has been the best team, the most in the league this season. This
                was also the third time that League Camera Fund has been the worst team, tied for the most with the
                other boom/bust team, Dropping Like Flys. This was a boom week for Dropping Like Flys with the
                Widest Receiver and the Biggest D. We had 2 near 40 points bombs from the QB and RB positions, on
                Just Joshin and Travis Swift respectively. Just Joshin also delivered the 2nd biggest blowout of the
                season to League Camera Fund, defeating them by a whopping 69.1 points. This is second only to First
                Down Syndrome's victory over The Werbenjägermanjensens in week 4, which they won by 81.24 points.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                This week was really all or nothing with management, with only one manager barely in the 80-90%
                range. 4 teams had severe mis-management, but few of them would have been able to have a different
                outcome anyway.
            </p>
            <ArticleSubheader>Distribution of Scoring</ArticleSubheader>
            <StackedHistogram chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                This wasn't the boom week we were expecting with no byes, maybe due in part to mis-management, but we
                did see in uptick from last weeks scores. This would have been another entertaining week if we were
                a league that played against the median too.
            </p>
        </div>
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Blowout of the Week</ArticleSubheader>
            <p>
                Just Joshin had to be the one to break the trend of terrible scores in the last few MotWs. Every
                player besides their kicker and Austin Ekeler scored over 10 points, with many scoring 15+ points.
                League Camera Fund on the other hand only had 1 player score above 15 points, Trevor Lawrence. This
                was not a great performance from League Camera Fund, and they will have to do 5 shots/dogs after
                this one.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <ArticleCaption>MotW Results</ArticleCaption>
            <p>
                Just Joshin brings Dropping Like Flys into MotW for the 2nd time this season. League Camera Fund will
                play against League Kamara Fund in week 13, which is a massive game for the race for last place.
            </p>
            <ArticleSubheader>Matchup of the Week 2023-24</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
            <ShotsDistributionChart chartData={shotsDistData} />
        </div>
    )
}

const MatchupArticleOne = () => {
    return (
        <div>
            <ArticleHeader>Matchup #1</ArticleHeader>
            <ArticleSubheader>Bijan shih tzu playoff push?</ArticleSubheader>
            <p>
                Bijan shih tzu was in the bottom cluster of teams for a lot of this season, but this win is their
                second straight, and they are in 7th place with the same record as 6th. If they can win out, they
                will very likely be a playoff team. E.T.N Phone Home was hoping to make the playoffs as well, but
                now they are just hoping they can avoid last place. This loss dropped them down to 10th place, one
                game ahead of last place. Their kicker and defense really let them down this week, along with their
                WRs. Justin Jefferson's return would be great for this team, but it might be too little too late.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <ArticleCaption>Matchup Results</ArticleCaption>
            <p>
                Bijan shih tzu will play against Hurt Thuggins and the boys in week 13, and E.T.N Phone Home faces
                off with First Down Syndrome.
            </p>
        </div>
    )
}

const MatchupArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Matchup #2</ArticleHeader>
            <ArticleSubheader>Matt v Matt</ArticleSubheader>
            <p>
                Another week, another CMC carry job. First Down Syndrome also got good performances from Michael
                Pittman and Curtis Samuel, which was enough to beat Hurt Thuggins & the boys. They struggled to put
                together a good week, with 6 players below 10 points.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <ArticleCaption>Matchup Results</ArticleCaption>
            <p>
                First Down Syndrome will face off with E.T.N Phone Home in week 13, and Hurt Thugghins & the boys
                will play against Bijan shih tzu.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>A few stars are enough</ArticleSubheader>
            <p>
                Dropping Like Flys had 4 really good performances this week, and that was all they needed to secure
                the victory in this one. C.J. Stroud, Isiah Pacheco, Tyreek Hill, and MIA D combined for 103.16
                points this week, &gt; 101.5 points. League Kamara Fund had disappointing performances from Joshua
                Dobbs, Cooper Kupp, and CLE D, but their bench wasn't much better. Regardless of their management
                decisions, they would have lost this one. Dropping Like Flys got the win they needed to stay in the
                hunt for the playoffs, and League Kamara Fund remained alone at the bottom of the standings with
                this loss.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <ArticleCaption>Matchup Results</ArticleCaption>
            <p>
                Dropping Like Flys will play against Hurt Thuggins & the boys in week 13. League Kamara Fund gets a
                key game against League Camera Fund that they have had circled on their calendar for most of the
                season.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>Double Revenge Game Again</ArticleSubheader>
            <p>
                Last week we had two teams that traded with one another face off, and we had that again in this one.
                Travis Swift was able to take this win handily, thanks in part to former WR of The
                Werbenjägermanjensens, Mike Evans. Kyren Williams absolutely crushed it in his return from injury,
                and Travis Swift is built for the playoffs. The Werbenjägermanjensens are trying to avoid last
                place, and have had some decent performances from players acquired via trade including Rhamondre
                Stevenson and Cole Kmet.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <ArticleCaption>Matchup Results</ArticleCaption>
            <p>
                Travis Swift plays against Cook-ing a 0.2 in week 13, and The Werbenjägermanjensens will play against
                Njigba's in Paris.
            </p>
        </div>
    )
}

const MatchupArticleFive = () => {
    return (
        <div>
            <ArticleHeader>Matchup #5</ArticleHeader>
            <ArticleSubheader>Another Monday Night Showdown</ArticleSubheader>
            <p>
                This matchup was a toss-up after the sunday slate was completed, coming down to D.J. Moore vs T.J.
                Hockenson on MNF. Ultimately, D.J. Moore had yet another great performance with Justin Fields at QB,
                and T.J. Hockenson couldn't overcome the deficit. Njigba's in Paris would have liked to get more out
                of Tua this week, but the Jets D forced him into his worst fantasy game of the season. Cook-ing a
                0.2 won the Eagles battle in this one, with Jalen Hurts having a huge game and DeVonta Smith
                outperforming A.J. Brown.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <ArticleCaption>Matchup Results</ArticleCaption>
            <p>
                Cook-ing a 0.2 will play against Travis Swifty in week 13. Njigba's in Paris will play against The
                Werbenjägermanjensens.
            </p>
        </div>
    )
}

const StandingsArticle = () => {
    return (
        <div>
            <ArticleHeader>Standings & Power Rankings</ArticleHeader>
            <ArticleSubheader>Current Standings</ArticleSubheader>
            <LeaderboardTable leaderboardData={leaderboardData} />
            <p>
                Not a ton of movement this week. Travis Swift is pushing to try and get a playoff bye.
            </p>
            <ArticleSubheader>Weekly Scoring Rankings</ArticleSubheader>
            <ImageWrapper>
                <ArticleImage src="/oldNews/FantasyFootball23/Week12/Rank Plot.png" alt="Weekly Scoring Rankings" />
            </ImageWrapper>
            <p>
                As mentioned previously, this week was nearly chalk. This was the second straight week that Njigba's
                in Paris lost their matchup while beating the league median.
            </p>
            <ArticleSubheader>PF vs PA</ArticleSubheader>
            <ImageWrapper>
                <ArticleImage src="/oldNews/FantasyFootball23/Week12/PF PA Plot.png" alt="PF vs PA" />
            </ImageWrapper>
            <p>
                The middle of the pack has further separated themselves from the bottom, and there are now 3 clear
                tiers of 4 teams.
            </p>
            <ArticleSubheader>Power Rankings</ArticleSubheader>
            <PowerRankingsTable powerRankingsData={powerRankingsData} />
            <ArticleCaption>
                Team Ability of 100 would mean you were the best team every week, and 0
                would mean that you were the worst team every week. <br /> Strength of Schedule of 100 would mean you
                played the best team every week, and 0 would mean that you played the worst team every week.
            </ArticleCaption>
            <p>
                The top tier of 4 teams is even more evident here in the power rankings. The rest of the teams still
                appear to be one big cluster, besides The Werbenjägermanjensens. Luckily for them their schedule has
                been the 3rd most favorable, so that has helped to keep them out of last place in the actual
                standings.
            </p>
            <ArticleSubheader>Playoff / Last Place Outlook</ArticleSubheader>
            <PlayoffTable playoffData={playoffData} />
            <ArticleCaption>
                Odds sourced from <a
                    href="https://www.theffhub.com/PlayoffOdds?site=sleeper&leagueId=996445270105714688&userId=&s2=&swid=">FFHub</a>
                for now. *Note: These odds are calculated purely from the history of each team's scores this year.
                It does not take projections or byes into account. It uses that data to run 10,000 monte carlo
                simulations of each matchup given a team's average score and standard deviation. I want to build
                this out in-house using Walter's ROS projections at some point, maybe this season, maybe
                next.<br />Playoff <a href='https://en.wikipedia.org/wiki/Magic_number_(sports)'>Magic #</a> = # of
                your wins + # of
                7th place losses for you to clinch a playoff spot outright before tiebreakers<br />Last Place Magic #
                = # of your wins + # of last place losses for you to be eliminated from the race outright before
                tiebreakers<br />*12th place calculation adds 12th place losses - 11th place losses because they have
                to overtake 11th place.
            </ArticleCaption>
            <p>
                League Kamara Fund has been eliminated from playoff contention. There are now only 5 teams
                mathematically eligible for last place.
            </p>
        </div>
    )
}

const AlternateUniversesArticle = () => {
    return (
        <div>
            <ArticleHeader>Alternate Universes</ArticleHeader>
            <ArticleSubheader>Played Against The Median Standings</ArticleSubheader>
            <AltLeaderboardTable data={medianLbData} />
            <ArticleCaption>
                If everyone played their matchup each week, and also played against the
                median, this is what the leaderboard would look like.
            </ArticleCaption>
            <p>
                If we instituted this rule, the playoff outlook would be essentially the same, and the bottom half of
                the league would be a lot different.
            </p>
            <ArticleSubheader>Best Ball Standings</ArticleSubheader>
            <AltLeaderboardTable data={bestBallLbData} />
            <ArticleCaption>
                If everyone played their best lineup every week, this is what the
                standings would look like. All columns include hypothetical totals.
            </ArticleCaption>
            <ArticleSubheader>Schedule Comparisons</ArticleSubheader>
            <ImageWrapper>
                <ArticleImage src="/oldNews/FantasyFootball23/Week12/Schedule Comparison.png" alt="Schedule Comparisons" />
            </ImageWrapper>
            <ArticleCaption>
                Weekly Schedule Comparisons: sourced from <a
                    href="https://www.theffhub.com/ScheduleComparison?site=sleeper&leagueId=996445270105714688&userId=&s2=&swid=">FFHub</a>
                for now
            </ArticleCaption>
            <p>
                Travis Swift stays undefeated with Just Joshin's schedule, and League Kamara Fund would be 9-3
                instead of 3-9. E.T.N Phone Home would be 10-2 instead of 4-8. Basically, every team would gain 2+
                wins with Just Joshin's schedule besides League Camera Fund and Bijan shih tzu, who would each gain
                only 1 win.
            </p>
        </div>
    )
}

const MotwPossibilitiesArticle = () => {
    return (
        <div>
            <ArticleHeader>MotW Possibilities</ArticleHeader>
            <ArticleSubheader>League Camera Fund Could Be Back</ArticleSubheader>
            <ImageWrapper>
                <ArticleImage src="/oldNews/FantasyFootball23/Week12/MotW_Next3.png" alt="MotW Tree - Next 2 Weeks" />
            </ImageWrapper>
            <ArticleCaption>MotW Tree - Next 2 Weeks</ArticleCaption>
            <p>League Camera Fund of League Kamara Fund?</p>
            <ArticleSubheader>Danger Metric</ArticleSubheader>
            <ImageWrapper>
                <ArticleImage src="/oldNews/FantasyFootball23/Week12/danger_kable.html" alt="MotW Danger Metric" />
            </ImageWrapper>
            <ArticleCaption>
                MotW Danger Metric<br />
                NPG = Next Possible Game<br /> RPA = Remaining Possible Appearances
            </ArticleCaption>
            <ImageWrapper>
                <ArticleImage src="/oldNews/FantasyFootball23/Week12/Future MotW by Week.png" alt="MotW Danger Metric Visualized" />
            </ImageWrapper>
            <ArticleCaption>MotW Danger Metric Visualized</ArticleCaption>
        </div>
    )
}

const LeagueBuzzArticle = () => {
    return (
        <div>
            <ArticleHeader>League Buzz</ArticleHeader>
            <ArticleSubheader>The Boys Build a Parlay</ArticleSubheader>
            <LeagueQuote>
                "Fellas I have $140 to use by 11/30 and $75 to use by 12/7 of free money on fan
                duel - I gotta start making some bets and I need advice"
                <br />- League Camera Fund
            </LeagueQuote>
            <p>
                League Camera Fund took a lot of the matters into their own hands, but allowed league members to
                build a parlay with some of the money. There was also a straight bet on Calvin Ridley TD scorer
                which cashed thanks to Bijan shih tzu benching him. There was also a donation to FanDuel of Jets
                -15.5 which sounds like something out of Calvin Ridley's Betting Corner. The league parlay consisted
                of D.J. Moore over 4.5 receptions (he had 11), Giants Patriots under 34 (they scored 17), and Josh
                Allen over 1.5 passing TDs (he had 2). This win turned $10 into over $50, and the bettors will be
                back at it with 2 $25 parlays in week 13.
            </p>
            <ArticleSubheader>Sandbagging</ArticleSubheader>
            <LeagueQuote>
                "[Dropping Like Flys] is always downplaying his teams chances to win and I'm
                sick and tired of it"
                <br />- League Kamara Fund
            </LeagueQuote>
            <p>
                Dropping Like Flys is a known sandbagger, but has taken it to a new level this season. Every bit of
                news or opinion piece is just another opportunity to appear extremely worried about their chances.
                A righteous manager has confidence in their players to get the job done. Even after building up a
                massive lead and looking like a heavy favorite, they said:
            </p>
            <LeagueQuote>
                "...it also only Friday"
                <br />- Dropping Like Flys
            </LeagueQuote>
            <p>Points on Friday don't matter according to this sandbagger.</p>
            <ArticleSubheader>Cheerios & Spaghetti-O's</ArticleSubheader>
            <LeagueQuote>
                "...Are cheerios the breakfast version of spaghettios?"
                <br />- First Down Syndrome
            </LeagueQuote>
            <p>
                This sparked discussion that resolved with a no. Spaghetti-O's are instead the non-breakfast version
                of Cheerios, and also the Italian Cheerio.
            </p>
            <ArticleSubheader>Bills vs Eagles</ArticleSubheader>
            <ImageWrapper>
                <ArticleImage src="/oldNews/FantasyFootball23/Week12/devan.jpg" alt="Bills vs Eagles" />
            </ImageWrapper>
            <p>
                With fans on both sides of this game, and other managers with players in the game, the SNF matchup
                was intense. Many things were said, bets were sweat, and fantasy matchups were swayed. But the
                Eagles got the last laugh.
            </p>
            <ArticleSubheader>Another Late Submission</ArticleSubheader>
            <p>
                The Werbenjägermanjensens missed the deadline for their video submission this week, and will have to
                do an additional shot/dog, bringing their total up from 4 to 5. If they were late another week, it
                would increase by 2 up to a total of 7. Another week would mean 3 more, up to 10. You get the idea,
                but some regarded managers struggle to comprehend the complexity.
            </p>
            <ArticleSubheader>League Submissions</ArticleSubheader>
            <LeagueQuote>
                "Go birds"
                <br />- Anonymous League Manager
            </LeagueQuote>
            <LeagueQuote>
                "Wow [League Kamara Fund] has lost a lot of really close matches. RIP"
                <br />- Grge
            </LeagueQuote>
            <p>
                Losses include:
            </p>
            <ul>
                <li>Week 5 loss to Bijan shih tzu by 0.52 points (closest game in the league this season)</li>
                <li>Week 7 loss to Travis Swift by 1.56 points (scored 123.64 points)</li>
                <li>Week 8 loss to Njigba's in Paris by 39.48 points (scored 144.48 points and was #2 team that
                    week)</li>
            </ul>
            <LeagueQuote>
                "I am so blessed to have been signed back to an NFL deal this week. Thank you
                God for bringing me this opportunity."
                <br />- Tim Tebow
            </LeagueQuote>
            <p>I think Tim might be a little confused about the difference between fantasy and reality.</p>
            <ArticleSubheader>Breaking News</ArticleSubheader>
            <ImageWrapper>
                <ArticleImage src="/oldNews/FantasyFootball23/Week12/grge.jpg" alt="Breaking News" />
            </ImageWrapper>
            <ArticleCaption>Submitted by Bijan shih tzu</ArticleCaption>
            <p>
                Just Joshin currently rosters 4 QBs, and doesn't have a playable RB on their roster for this week.
                They are playing against the current 6 seed, Dropping Like Flys. This matchup has direct playoff
                implications, and it appears that Just Joshin may be throwing to try to hand select a future playoff
                opponent. Should the league step in to force Just Joshin to have a valid lineup?
            </p>
            <p>We reached out to Just Joshin for a statement on the matter:</p>
            <LeagueQuote style={{ fontSize: '100px' }}>
                "&#128514;"
                <br />- Just Joshin
            </LeagueQuote>
        </div>
    )
}

const ComicsArticle = () => {
    return (
        <div>
            <ArticleHeader>Comics</ArticleHeader>
            <ImageWrapper>
                <ArticleImage src="https://i.imgflip.com/87t7to.jpg" alt="Comic 1" />
            </ImageWrapper>
            <ArticleCaption>Submitted by League Kamara Fund</ArticleCaption>
            <ImageWrapper>
                <ArticleImage src="https://i.imgflip.com/87t8g5.jpg" alt="Comic 2" />
            </ImageWrapper>
            <ArticleCaption>Submitted by League Kamara Fund</ArticleCaption>
            <ImageWrapper>
                <ArticleImage src="https://i.imgflip.com/87t989.jpg" alt="Comic 3" />
            </ImageWrapper>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            <ImageWrapper>
                <ArticleImage src="https://i.imgflip.com/87ta40.jpg" alt="Comic 4" />
            </ImageWrapper>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </div>
    )
}

const MotwRulesArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week Rules</ArticleHeader>
            <p>1. The loser must send their video before next Monday Nights's kickoff.</p>
            <p>2. The loser must count their starters below 10 points, and add another for any under 0 points,
                and
                do that number of shots or eat that number of hotdogs.</p>
            <p>3. The winner will be the incumbent champion in next week's Matchup of the Week.</p>
            <p>4. In the case of a tie (pls no), both teams will complete their respective shots or dogs, and
                both
                teams will be the incumbent members in the next week's Matchups of the Week.</p>
            <p>Keep an eye out for the full league bylaws in the next few weeks which will contain all rules!</p>
        </div>
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
        content: MatchupArticleOne,
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
        content: StandingsArticle,
    },
    {
        id: 9,
        content: AlternateUniversesArticle,
    },
    {
        id: 10,
        content: MotwPossibilitiesArticle,
    },
    {
        id: 11,
        content: LeagueBuzzArticle,
    },
    {
        id: 12,
        content: ComicsArticle,
    },
    {
        id: 30,
        content: MotwRulesArticle,
    },
];
