import React from 'react';
import { MotWRules, AwardsTable, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, WeeklyScoringChart, MatchupPlot, MotwTable, ShotsDistributionChart, ArticleCaption, LeagueQuote } from '../../components/newsStyles';
import awardsData from './awardsTable.json';
import efficiencyData from './efficiencyData.json';
import matchupData from './matchupData.json';
import motwHistoryData from './motwTable.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';

export const newsDate = '2023-12-28';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 16</ArticleSubheader>
            <AwardsTable awardsData={awardsData} />
            <p>
                Week 16 was the second round of the playoffs, and there weren't any upsets in the top half of the bracket this week. Njigba's in Paris was the #1 team of the week yet again, putting up over 145 points for the 6th time this season. They ended the Cinderella story, but Cinderella put up a fight. They would have beaten either of the other 2 remaining playoff teams this week. Just Joshin got lucky yet again and barely won their matchup against Cook-ing a 0.2 to advance to the finals. We will see the #1 seed and the #2 seed face off in the championship game in week 17.
            </p>
            <p>
                MotW continued tearing through the toilet bowl this week, giving out the most shots/dogs of the season. This is what you expect in the toilet bowl, but if you look up at Warmest Bench, things could've looked a lot different. This was the most points any team has left on the bench this season, and it's not even close. Tim's Team really dropped the ball on this one and it's gonna cost them. The other toilet bowl games saw The Werbenjägermanjensens and WalterFix lose and advance to the final round.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                Tim's Team left more points on their bench than they scored, giving them a below 50% efficiency. This is by far the lowest of the season, and is presumably the lowest of all time. They had the potential to be a top 3 team this week, and instead barely edged out the worst team. Cinderella didn't stand a chance in their matchup, and there was nothing they could've done differently to change the outcome. Cook-ing a 0.2 however could've changed their outcome with some better management, or just one fewer injury.
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
                This week had a wide range, but didn't reach the extremes of prior weeks.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                The toilet bowl showed out this week and brought the minimum back down where it belongs.
            </p>
        </div >
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Tim's Team Gets 3rd MotW Loss of Season</ArticleSubheader>
            <p>
                Questionable won MotW for the 2nd week in a row while having negative points from their kicker. They would've been on the hook for 4 shots/dogs if Tim's Team managed their team properly. Luckily for them Tim's Team managed about as poorly as they could've, besides their kicker slot. Their mistakes put them into 7 shot/dog territory, the most of any team in MotW this season. These 7 shots/dogs are thanks to everyone except Justin Tucker and Rachaad White.
            </p>
            <MatchupPlot data={starterData} matchupId={6} />
            <p>
                Questionable will be taking MotW into week 1 of next season, hopefully they draft well. Tim's Team retires for the season, and will hope to improve next season.
            </p>
            <ArticleSubheader>Matchup of the Week 2023-24</ArticleSubheader>
            <MotwTable motwHistoryData={motwHistoryData} />
            <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
            <ShotsDistributionChart chartData={shotsDistData} />
        </div>
    )
}

const SemiFinalsArticleOne = () => {
    return (
        <div>
            <ArticleHeader>Semi-Finals Game #1</ArticleHeader>
            <ArticleSubheader>Cook-ing an L</ArticleSubheader>
            <p>
                Cook-ing a 0.2 was unable to complete their 2nd straight upset, barely losing to Just Joshin. Just Joshin was without one of their Josh's in this one, but Zamir White was a solid replacement. They had a solid all around performances in this one from everyone except Sam LaPorta. Cook-ing a 0.2 had Jordan Addison and DJ Moore get injured in this one, so we have a classic what could've been. They also left points on their bench from the likes of Dicker the Kicker and Dallas Goedert.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Just Joshin advances to the championship game, and Cook-ing a 0.2 will move to the 3rd place game.
            </p>
        </div>
    )
}

const SemiFinalsArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Semi-Finals Game #2</ArticleHeader>
            <ArticleSubheader>Cinderella Story Concludes</ArticleSubheader>
            <p>
                Cinderella wasn't able to pull off yet another upset, losing to Njigba's in Paris. Breece Hall went absolutely nuclear in this one putting up 43.1 points. This was the third most of any RB started in this league this season. Cinderella finally played Calvin Ridley in a game where he went off, but that wasn't enough to overcome the deficit. Cinderella was let down by James Cook, Jaylen Waddle, and Dustin Hopkins.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Njigba's in Paris advances to the championship game, and Cinderella will move to the 3rd place game.
            </p>
        </div>
    )
}

const FifthPlaceArticle = () => {
    return (
        <div>
            <ArticleHeader>5th Place Game</ArticleHeader>
            <ArticleSubheader>2 More Teams That Would've Beaten Just Joshin</ArticleSubheader>
            <p>
                Hurt Thuggins & the boys popped off in this one to secure the 5th place playoff finish. Both of these teams did well when it didn't really matter for them anymore. Travis Swift was let down by Stefon Diggs and Travis Kelce, two players who have underperformed expectations all season. Hurt Thuggins & the boys was really only let down by their D putting up 0 points, but has nothing to be upset about here, besides the fact that this was the 5th place game.
            </p>
            <MatchupPlot data={starterData} matchupId={3} />
            <p>
                Both of these teams are done for the season, and will start brainstorming rule changes they want to see for next season.
            </p>
        </div>
    )
}

const ShitBowlSemiFinalsArticleOne = () => {
    return (
        <div>
            <ArticleHeader>Shit Bowl Semi-Finals Game #1</ArticleHeader>
            <ArticleSubheader>True Shit Bowl Game</ArticleSubheader>
            <p>
                The chart makes it very clear that this was a blowout, and in fact it was the 3rd biggest blowout of the season. WalterFix put up the 5th lowest point total of any team this season, which is surprisingly high given how bad this chart looks. They were outscored by E.T.N Phone Home at every position except for defense, and that's with an extra RB. E.T.N Phone Home had a statement game in the shit bowl after they earned the regular season punishment.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                E.T.N Phone Home moves into the 9th place game, and WalterFix advances to the Shit Bowl Final.
            </p>
        </div>
    )
}

const ShitBowlSemiFinalsArticleTwo = () => {
    return (
        <div>
            <ArticleHeader>Shit Bowl Semi-Finals Game #2</ArticleHeader>
            <ArticleSubheader>CMC Does It Again</ArticleSubheader>
            <p>
                First Down Syndrome has been able to coast on CMC and Lamar all season, just enough to never be worried about getting last place. Those two and Tee Higgins carried them this time to a win over The Werbenjägermanjensens. The Werbenjägermanjensens didn't do horrible compared to their standards, but this still wasn't enough to win.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                First Down Syndrome moves into the 9th place game, and The Werbenjägermanjensens advance to the Shit Bowl Final.
            </p>
        </div>
    )
}

const LeagueBuzzArticle = () => {
    return (
        <div>
            <ArticleHeader>League Buzz</ArticleHeader>
            <ArticleSubheader>Planning For Next Season</ArticleSubheader>
            <p>
                With many teams eliminated from meaningful fantasy games, the league has started brainstorming ideas for next season. Ideas have been floated for how to pick the draft pick pick order, how we can convert hotdogs/shots to other forms of punishment, and what we can do in the off-season to improve The Offensive Line. Any ideas should be submitted on the site or in discord so they can be tracked to ensure they are considered for next season.
            </p>
            <ArticleSubheader>League Superlatives</ArticleSubheader>
            <p>One of our esteemed league managers took it upon themselves to create a google form for managers to submit superlative ideas for other managers. This form <a href='https://forms.gle/xKe7bebfiAQxTveH6'>can be found here.</a> Managers should fill this out since it is fun.</p>
            <ArticleSubheader>Submissions</ArticleSubheader>
            <LeagueQuote>"I fear that my previous comments may come back to haunt me - submitted 12/22/23"<br />- League Camera Fund</LeagueQuote>
            <LeagueQuote>"“I am not worried - I will force a puke”"
                <br />- Alec in my dms</LeagueQuote>
            <LeagueQuote>"some people in this league clearly don't value the commissioners time and will make him do work for some dumb joke they could've done without dropping their whole team"
                <br />- Anonymous League Manager
            </LeagueQuote>
            <LeagueQuote>"alec should get an extra shot/dog for what he did"
                <br />- Anonymous League Manager
            </LeagueQuote>
        </div>
    )
}

const BushMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8am31d.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const CommissionerMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8am2ne.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const CommissionerMemeTwo = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8am37j.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const BylawsMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8am8vk.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const WeenieMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8ap93q.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const SquirrelMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/92fci3.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Cinderella</ArticleCaption>
        </ImageWrapper>
    )
}

const HotDogMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8ap9eh.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const WalterMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8ap9kh.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by WalterFix</ArticleCaption>
        </ImageWrapper>
    )
}

const DevanMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8apa1e.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const JakeMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8apa48.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const JailMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8apbef.jpg"}>
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
        content: ScoringDistributionArticle,
    },
    {
        id: 3,
        content: MotwArticle,
    },
    {
        id: 4,
        content: SemiFinalsArticleOne,
    },
    {
        id: 5,
        content: SemiFinalsArticleTwo,
    },
    {
        id: 6,
        content: FifthPlaceArticle,
    },
    {
        id: 7,
        content: ShitBowlSemiFinalsArticleOne,
    },
    {
        id: 8,
        content: ShitBowlSemiFinalsArticleTwo,
    },
    {
        id: 15,
        content: LeagueBuzzArticle,
    },
    {
        id: 16,
        content: BushMeme,
    },
    {
        id: 17,
        content: CommissionerMeme,
    },
    {
        id: 18,
        content: CommissionerMemeTwo,
    },
    {
        id: 19,
        content: BylawsMeme,
    },
    {
        id: 20,
        content: WeenieMeme,
    },
    {
        id: 21,
        content: SquirrelMeme,
    },
    {
        id: 22,
        content: HotDogMeme,
    },
    {
        id: 23,
        content: WalterMeme,
    },
    {
        id: 24,
        content: DevanMeme,
    },
    {
        id: 25,
        content: JakeMeme,
    },
    {
        id: 26,
        content: JailMeme,
    },
    {
        id: 30,
        content: MotWRules,
    },
];
