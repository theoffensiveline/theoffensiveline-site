import React from 'react';
import { MotWRules, AwardsTable, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, WeeklyScoringChart, MatchupPlot, ArticleCaption, LeagueQuote, MotwTable, ShotsDistributionChart } from '../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
import efficiencyData from './efficiencyData.json';
import matchupData from './matchupData.json';
import motwHistoryData from './motwTable.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';

export const newsDate = '2024-01-04';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 17</ArticleSubheader>
            <AwardsTable awardsData={awardsData} />
            <p>
                Week 17 was the final week of the 2023 fantasy football season. This week we had 4 matchups, and only 1 that actually mattered. The championship game between Njigba's in Paris and Just Joshin was never really in doubt. Njigba's in Paris put up the most points of any team this week, and had over 145 points again, exceeding that total in both of their playoff games and for the 7th time this season. They had the #1 RB this week in Breece Hall, and the #1 WR in CeeDee Lamb. CeeDee Lamb was the MVP this week putting up 27.54% of Njigba's in Paris 145.98 points.
            </p>
            <p>
                With MotW coming to a close last week, the toilet bowl got a lot less exciting. The Werbenjägermanjensens took home the trophy, after their defeat at the hands of WalterFix. The Werbenjägermanjensens were the worst team this week, but had the biggest D, as expected with their roster construction.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                Good (or good enough) management where it counted this week. Cook-ing a 0.2 had the lowest efficiency this week, followed closely by E.T.N Phone Home. Just Joshin had the highest efficiency but that wasn't enough to win the championship.
            </p>
        </div>
    )
}

const ScoringDistributionArticle = () => {
    return (
        <div>
            <ArticleHeader>Scoring Distributions</ArticleHeader>
            <ArticleSubheader> Distribution of Scoring</ArticleSubheader>
            <StackedHistogram chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>
            <p>
                Pretty middle of the road scores from everyone besides the big winner.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                Another week with a relatively high floor.
            </p>
        </div >
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            {/* <ArticleSubheader>MotW Gets A Week Off</ArticleSubheader>
                <p>
                    Questionable won MotW for the 2nd week in a row while having negative points from their kicker. They would've been on the hook for 4 shots/dogs if Tim's Team managed their team properly. Luckily for them Tim's Team managed about as poorly as they could've, besides their kicker slot. Their mistakes put them into 7 shot/dog territory, the most of any team in MotW this season. These 7 shots/dogs are thanks to everyone except Justin Tucker and Rachaad White.
                </p>
                <MatchupPlot data={starterData} matchupId={6} />
                <p>
                    Questionable will be taking MotW into week 1 of next season, hopefully they draft well. Tim's Team retires for the season, and will hope to improve next season.
                </p> */}
            <ArticleSubheader>Matchup of the Week 2023-24</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
            <ShotsDistributionChart chartData={shotsDistData} />
        </div>
    )
}

const ChampionshipGameArticle = () => {
    return (
        <div>
            <ArticleHeader>Championship Game</ArticleHeader>
            <ArticleSubheader>One Real Njigba</ArticleSubheader>
            <p>
                Njigba's in Paris took home the trophy and defeated Just Joshin in the championship game this season. CeeDee Lamb put up a monster 40.2 fantasy points to help propel them to victory. Breece Hall also contributed 27.6 points, and the rest of their players did sufficiently well besides Jahmyr Gibbs. Just Joshin had fairly strong performances all around as well, exlcuding Ja'Marr Chase and Raiders D. They lacked that one true star performance though, as their highest output was Josh Allen with 21.16 points.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Njigba's in Paris gets to ride the championship high until next season, and Just Joshin can appreciate that 2nd is a lot better than last!
            </p>
        </div>
    )
}

const ThirdPlaceGameArticle = () => {
    return (
        <div>
            <ArticleHeader>3rd Place Game</ArticleHeader>
            <ArticleSubheader>Cinderella Takes Bronze</ArticleSubheader>
            <p>
                Cinderella may have been eliminated from championship contention this past week, but they were able to win the 3rd place game over Cook-ing a 0.2 this week. They had pretty good scoring from Aiyuk, Flowers and Njoku in this one, and Cook-ing a 0.2 had DJ Moore and Jaylen Warren do well.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
        </div>
    )
}

const ToiletBowlFinalsArticle = () => {
    return (
        <div>
            <ArticleHeader>Toilet Bowl Finals</ArticleHeader>
            <ArticleSubheader>The Werbenjägermanjensens Are #1 After All</ArticleSubheader>
            <p>
                The Werbenjägermanjensens took an L in the shit bowl finale against WalterFix. Jerome Ford and Najee Harris both put up numbers, and WalterFix had a better supporting cast than The Werbenjägermanjensens to secure the W. Both of these teams were willing to make this a MotW if the championship teams agreed, but Just Joshin didn't want to, so this game really didn't matter.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
        </div>
    )
}

const NinthPlaceGameArticle = () => {
    return (
        <div>
            <ArticleHeader>9th Place Game</ArticleHeader>
            <ArticleSubheader>Lamar Not MVP Here</ArticleSubheader>
            <p>
                E.T.N Phone Home might have taken the punishment, but they earned a 9th place playoff finish in this one with their win over First Down Syndrome. Jordan Love and ETN were big in this one, and were enough to get past Lamar and an injured CMC.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
        </div>
    )
}

const LeagueBuzzArticle = () => {
    return (
        <div>
            <ArticleHeader>League Buzz</ArticleHeader>
            <ArticleSubheader>End of Season Recap</ArticleSubheader>
            <p>
                The Offensive Line will be providing an end of season recap at some point in the next few weeks. The goal is to improve on what was done last season, and take any additional feedback from the league. If you have any suggestions or things you'd like to see please submit them!
            </p>
            <ArticleSubheader>Planning For Next Season Reminder</ArticleSubheader>
            <p>
                With many teams eliminated from meaningful fantasy games, the league has started brainstorming ideas for next season. Ideas have been floated for how to pick the draft pick pick order, how we can convert hotdogs/shots to other forms of punishment, and what we can do in the off-season to improve The Offensive Line. Any ideas should be submitted on the site or in discord so they can be tracked to ensure they are considered for next season.
            </p>
            <ArticleSubheader>League Superlatives Reminder</ArticleSubheader>
            <p>One of our esteemed league managers took it upon themselves to create a google form for managers to submit superlative ideas for other managers. This form <a href='https://forms.gle/xKe7bebfiAQxTveH6'>can be found here.</a> Managers should fill this out since it is fun.</p>
            <ArticleSubheader>Submissions</ArticleSubheader>
            <LeagueQuote>"Nobody remembers the winner, but everyone remembers the loser"<br />- Anonymous League Manager</LeagueQuote>
        </div>
    )
}

const JakeMemeOne = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8b7hxl.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const DevanMemeOne = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8b7i6f.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
            <ArticleCaption>Devan would've had the same exact result as Jake (losing in the championship) if he had his schedule.</ArticleCaption>
        </ImageWrapper>
    )
}

const GregMemeOne = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8b7j5s.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const KyleMemeOne = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8b7isk.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const JaMorantMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8b7jlq.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted The Offensive Line</ArticleCaption>
            <ArticleCaption><a href='https://www.si.com/nba/grizzlies/news/ja-morant-reacts-to-major-hypocrisy-over-celebration-outrage'>for the uninformed</a></ArticleCaption>
        </ImageWrapper>
    )
}

const SquirrelMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8b7lu6.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Just Joshin</ArticleCaption>
        </ImageWrapper>
    )
}

const ChampionshipMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8b7kre.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const JakeMemeTwo = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8b7ldm.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const ThankYou = () => {
    return (
        <div>
            <ArticleHeader>Thank You</ArticleHeader>
            <p>
                I wanted to thank everyone for their participation in the league, as well as in MotW, and for submitting content to The Offensive Line. I enjoy putting this together every week and am excited to put together the end of season recap, along with making some additions to the site in the off-season.
            </p>
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
        content: ScoringDistributionArticle,
    },
    {
        id: 3,
        content: MotwArticle,
    },
    {
        id: 4,
        content: ChampionshipGameArticle,
    },
    {
        id: 5,
        content: ThirdPlaceGameArticle,
    },
    {
        id: 6,
        content: ToiletBowlFinalsArticle,
    },
    {
        id: 7,
        content: NinthPlaceGameArticle,
    },
    {
        id: 8,
        content: LeagueBuzzArticle,
    },
    {
        id: 9,
        content: JakeMemeOne,
    },
    {
        id: 10,
        content: DevanMemeOne,
    },
    {
        id: 11,
        content: GregMemeOne,
    },
    {
        id: 12,
        content: KyleMemeOne,
    },
    {
        id: 13,
        content: JaMorantMeme,
    },
    {
        id: 14,
        content: SquirrelMeme,
    },
    {
        id: 15,
        content: ChampionshipMeme,
    },
    {
        id: 16,
        content: JakeMemeTwo,
    },
    {
        id: 17,
        content: ThankYou,
    },
    {
        id: 18,
        content: MotWRules,
    },
];
