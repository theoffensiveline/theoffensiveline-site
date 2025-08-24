import React from 'react';
import { MotWRules, AwardsTable, ArticleHeader, ImageWrapper, ArticleImage, ArticleSubheader, EfficiencyChart, StackedHistogram, WeeklyScoringChart, MatchupPlot, MotwTable, ShotsDistributionChart, ArticleCaption, LeagueQuote } from '../../../components/newsletters/newsStyles';
import awardsData from './awardsTable.json';
import efficiencyData from './efficiencyData.json';
import matchupData from './matchupData.json';
import motwHistoryData from './motwTable.json';
import shotsDistData from './shotsDist.json';
import starterData from './starters.json';

export const newsDate = '2023-12-21';

const AwardsAndRecapArticle = () => {
    return (
        <div>
            <ArticleHeader>Awards and Recap</ArticleHeader>
            <ArticleSubheader>Week 15</ArticleSubheader>
            <AwardsTable awardsData={awardsData} />
            <p>
                Week 15 was the first week of the playoffs and the toilet bowl. Out of the 4 games this week, 3 of them were upsets, which made things very interesting. Cinderella lived up to the name, taking down the 3 seed Hurt Thuggins & the boys. The other playoff game was also an upset, with Cook-ing a 0.2 besting Travis Swift and moving to 3-0 in the Josh bowl. So the 5 and 6 seeds advanced after round one, and move on to play the 2 and 1 seeds in round two.
            </p>
            <p>
                The toilet bowl is where MotW ended up, and Questionable came out on top thanks to their management being far superior to that of WalterFix. League Camera Fund was the toilet bowl member who managed to pull off the upset over First Down Syndrome. WalterFix and First Down Syndrome move on to face E.T.N Phone Home and The Werbenjägermanjensens respectively.
            </p>
            <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
            <EfficiencyChart chartData={efficiencyData} />
            <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
            <p>
                The bottom two teams here both had the chance to win their matchup with better management. Their opponents were perfect or near-perfect in their management. First Down Syndrome once again had the potential to win but came up short due to mis-management.
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
                This was had a narrow range, and teams were pretty evenly distributed across it.
            </p>
            <WeeklyScoringChart chartData={matchupData} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>
            <p>
                Crazy what this can look like when you take out the two best and more importantly the two worst teams. The minimum this week was higher than it has been all season, and the maximum was lower than usual.
            </p>
        </div >
    )
}

const MotwArticle = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week</ArticleHeader>
            <ArticleSubheader>Questionable Avoids MotW Loss #3</ArticleSubheader>
            <p>
                With WalterFix's win last week, MotW entered the toilet bowl. This dragged Questionable into the MotW for the third time this season, where they had previously been 0-2 in those games doing a total of 8 shots/dogs. WalterFix was 1-1 in MotW before this, and moves to 1-2 with a total of 9 shots/dogs. They have to do 5 as a result of this one thanks to their QB, 2 RBs, and their K and DEF. The only good performances they got were from Kamara, their WRs and Trey McBride. Questionable was able to pull this one off thanks to 3 players in particular, Baker Mayfield, Clyde Edwards-Helaire, and Miami D. All of these players put up 20+ points. If WalterFix was able to win, Questionable would have had to do 6 shots/dogs thanks to a -1 point performance from their kicker.
            </p>
            <MatchupPlot data={starterData} matchupId={4} />
            <p>
                Questionable carries MotW into the 7th place game against League Camera Fund where it will die. One of those teams will be making their 3rd video of the season, and the other will start with MotW next season. WalterFix continues further into the toilet bowl and faces off against 12 seeded E.T.N Phone Home in round 2.
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
            <ArticleSubheader>Josh Bowl #3</ArticleSubheader>
            <p>
                In this season's third Josh Bowl, Josh came out victorious for the third time. Cook-ing a 0.2 was able to have big games from players when it mattered, and Travis Swift was not. Travis Swift was let down by both of their namesake players, and multiple others including Justin Fields, Javonte Williams, and Stefon Diggs. Cook-ing a 0.2 got their best performances from Jordan Addison, Jalen Hurts, and Raheem Mostert. Everyone else on their team contributed enough to secure the win.
            </p>
            <MatchupPlot data={starterData} matchupId={1} />
            <p>
                Cook-ing a 0.2 will advance to the semi-finals and play against 1 seed Just Joshin. This will be the true test to see who fleeced who. Travis Swift goes into the 5th place game against Hurt Thuggins & the boys.
            </p>
        </div>
    )
}

const MatchupArticleThree = () => {
    return (
        <div>
            <ArticleHeader>Matchup #3</ArticleHeader>
            <ArticleSubheader>Cinderella Story Continues</ArticleSubheader>
            <p>
                Cinderella was able to pull off an upset for the second week in a row, last week to secure a playoff spot, and this week to advance to round 2 over the 3 seed Hurt Thuggins & the boys. James Cook was the MVP this week with a 36.1 point showing. Jaylen Waddle and David Njoku weren't far behind putting up 28.2 and 26.4 points respectively. These 3 players were able to cover up a few disappointments from others including Bijan Robinson, who scored 0.4 points. Hurt Thuggins & the boys had more than a few disappointments, including Saquon Barkley, Garrett Wilson, and Patrick Mahomes. All 3 of these players were acquired via trade in an attempt to improve their playoff outlook, and that didn't work out too well.
            </p>
            <MatchupPlot data={starterData} matchupId={2} />
            <p>
                Cinderella advances to round 2 to play against the current championship favorite Njigba's in Paris. Can they continue their Cinderella story all the way to the finals? Hurt Thuggins & the boys moves to the 5th place game against Travis Swift.
            </p>
        </div>
    )
}

const MatchupArticleFour = () => {
    return (
        <div>
            <ArticleHeader>Matchup #4</ArticleHeader>
            <ArticleSubheader>CMC Wasn't Enough</ArticleSubheader>
            <p>
                This toilet bowl matchup had 2 of the 3 highest scoring teams of this week in it. First Down Syndrome put up a good fight, but their oustanding performances from CMC, Kenneth Walker, and Tee Higgins (what a TD btw) were not enough to overcome the all-around dominance by League Camera Fund. They had every player except their D in double digits, and had 26.1 from Terry, 24.1 from Davante, and 21.9 from Rachaad White.
            </p>
            <MatchupPlot data={starterData} matchupId={5} />
            <p>
                League Camera Fund will be in MotW next week in the 7th place game against Questionable. First Down Syndrome moves further into the toilet bowl against The Werbenjägermanjensens.
            </p>
        </div>
    )
}

const LeagueBuzzArticle = () => {
    return (
        <div>
            <ArticleHeader>League Buzz</ArticleHeader>
            <ArticleSubheader>Boys Bring Back Betting Because Birds</ArticleSubheader>
            <p>
                The Werbenjägermanjensens floated a bet to E.T.N Phone Home at even odds that the Seahawks would beat the Eagles on MNF. This looked foolish with sportsbooks having the Eagles as heavy favorites in this one, and E.T.N Phone Home could have taken advantage of the inefficient market and made free money. The bet was initially floated at $5, but once E.T.N Phone Home saw it, they wanted to make it $10. The game was close throughout, and Jalen Hurts was playing through an illness. The Seahawks also had Drew Lock at QB, and he led them down the field 90+ yards for a game-winning TD drive.
            </p>
            <LeagueQuote>
                "What's your Venmo [The Werbenjägermanjensens]"
                <br />- E.T.N Phone Home
            </LeagueQuote>
            <ArticleSubheader>Commissioner Caught Cheating...Collusion?</ArticleSubheader>
            <p>Evidence was provided by multiple league members this week that the commissioner may once again be attempting to rig the league and force their advancement into the playoffs. They showed up as the opponent for everyone's matchup, a tactic that would give them pretty solid odds to win the championship and the toilet bowl in the same season. This feat would never be accomplished again, cementing the commissioners spot in the record book. It remains unclear what the commissioners goals were, but after the outcry the matchups are back to normal.</p>
            <ArticleSubheader>Submissions</ArticleSubheader>
            <LeagueQuote>"The New York Jets are bad at football."<br />- Anonymous League Manager</LeagueQuote>
            <LeagueQuote>"My team has been hand crafted all season long for weeks 15-17. It's only natural that I dominated this week."
                <br />- League Camera Fund</LeagueQuote>
            <p>
                Playing for the toilet bowl is a move, and it helped them get into MotW for the third time.
            </p>
        </div>
    )
}

const JakeMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://steamuserimages-a.akamaihd.net/ugc/496888905833936637/1FB14E3072B26661D4119295C7FE9505C236C36B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Just Joshin</ArticleCaption>
        </ImageWrapper>
    )
}

const GregMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://pbs.twimg.com/media/D5WK5qkWwAATWyV.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Cinderella</ArticleCaption>
        </ImageWrapper>
    )
}

const BijanMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8a0y9i.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const JakeTradeMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8a0yh1.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const AlecMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8a0zci.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const KyleMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8a0zmu.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const JakeMemeMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8a106l.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const JakeClownMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8a0zkf.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const MattMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8a10r8.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const AnthonyDMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8a11w3.gif"}>
            </ArticleImage>
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </ImageWrapper>
    )
}

const WalterMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8a12n1.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by WalterFix</ArticleCaption>
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
        id: 15,
        content: LeagueBuzzArticle,
    },
    {
        id: 16,
        content: JakeMeme,
    },
    {
        id: 17,
        content: GregMeme,
    },
    {
        id: 18,
        content: BijanMeme,
    },
    {
        id: 19,
        content: JakeTradeMeme,
    },
    {
        id: 20,
        content: AlecMeme,
    },
    {
        id: 21,
        content: KyleMeme,
    },
    {
        id: 22,
        content: JakeMemeMeme,
    },
    {
        id: 23,
        content: JakeClownMeme,
    },
    {
        id: 24,
        content: MattMeme,
    },
    {
        id: 25,
        content: AnthonyDMeme,
    },
    {
        id: 26,
        content: WalterMeme,
    },
    {
        id: 30,
        content: MotWRules,
    },
];
