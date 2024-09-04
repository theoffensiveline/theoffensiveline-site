import React from 'react';
import { ArticleCaption, ArticleHeader, ArticleImage, ArticleSubheader, LeagueQuote, ImageWrapper } from '../../components/newsStyles';
import tyrantMatt from './Tyrant_Matt.png';

export const newsDate = '2024-09-04';

const TopStoryArticle = () => {
    return (
        <div>
            <ArticleHeader>Is The Commissioner Crooked?</ArticleHeader>
            <ArticleSubheader>Happy Meal Challenge Suspicions</ArticleSubheader>
            <p>
                There is concern among league members that the commissioner of the league is crooked. The first allegation against him is that he cheated in the happy meal challenge.
            </p>
            <ArticleImage src={tyrantMatt}></ArticleImage>
            <ArticleCaption>Tyrant Matt - Submitted Anonymously</ArticleCaption>
            <LeagueQuote>
                "#CrookedComish blatantly cheated in the happy meal challenge, refused to provide any defense, and then used the media to sweep the issue under the rug #StartTheCount"<br />- Jake on 9/3 at 9:33 PM ET
            </LeagueQuote>
            <LeagueQuote>
                "If you watch the video you can clearly see the #CrookedComish touch the happy meal multiple times before starting the timer this resulting in his stolen victory #StartTheCount"<br />- Greg on 9/3 at 9:34 PM ET
            </LeagueQuote>
            <LeagueQuote>
                "The commissioners table on his “winning” happy meal challenge looked like Shamu was trying to escape his tank again #StolenVictory #JusticeForJosh"<br />- Anthony on 9/3 at 9:36 PM ET
            </LeagueQuote>
            <LeagueQuote>
                "It has never been more clear to me that the media and the comish are in kahoots rigging this league"<br />- Nikhil on 9/3 at 9:37 PM ET
            </LeagueQuote>
            <LeagueQuote>
                "The comish's happy meal challenge time was totally fair and valid #GetOverIt"<br />- Trevor on 9/3 at 9:37 PM ET
            </LeagueQuote>
            <LeagueQuote>
                "Is anyone really surprised that The Offensive Line's editor in chief is towing the commissioner's line #fakenews"<br />- Josh on 9/3 at 9:41 PM ET
            </LeagueQuote>
            <p>
                Looking at the timestamps on these submissions, and the consistent misspelling of "comish", it is hard to imagine these submissions are legitimate. The Offensive Line is not in kahoots with the commissioner, but is a neutral reporter on the happenings of the league. We are not interested in reporting fake news, and do not claim to agree or disagree with any of the opinions shared by these so-called "readers". We will be working very soon on validating user submissions to limit the fake news that may be spread via our submission box.
            </p>
            <ArticleSubheader>Other Allegations</ArticleSubheader>
            <LeagueQuote>
                "Comish is delaying the uploading of draft picks to stop the facilitation of trading for his own personal gain"<br />- Kyle on 9/4 at 9:25 AM ET
            </LeagueQuote>
            <LeagueQuote>
                "I can't prove it but comish has given himself extra FAAB budget. I know it!"<br />- Josh K on 9/4 at 9:32 AM ET
            </LeagueQuote>
            <LeagueQuote>
                "All I'm saying is I don't trust the guy. Did you see his happy meal challenge? That wasn't legit!"<br />- Alec on 9/4 at 9:33 AM ET
            </LeagueQuote>
            <p>
                These "readers" believe that the commissioner, or "comish" is crooked, but their sources are questionable at best. The commissioner has a lot on his plate this time of year, which these critics likely aren't considering.
            </p>
        </div >
    )
}

const NextSeasonArticle = () => {
    return (
        <div>
            <ArticleHeader>"New Rules" - Dua Lipa</ArticleHeader>
            <ArticleSubheader>Reviewing Changes Made For 2024</ArticleSubheader>
            <p>
                After much ado about changing the rules and voting on potential punishments, we have come to an agreement on all rule changes and punishments. To summarize the changes, we have moved defensive fumble scoring to be 1 point for fumble forced and 1 point for fumble recovered, instead of 0 for forced and 2 for recovered. We have also added FAAB waivers, which are different from rotating priority waivers we had previously. The buy-in also increased from $25 to $50 for this season. Somehow the biggest point of contention was the buy-in changing from $25 to $50, and there was even discussion of paying out 11th place!
            </p>
            <p>
                The punishment for 2024 is a 24 hour Fortnite livestream. The full rules are still TBD, but there are some ideas floating around. The one rule that has been determined concretely is that you must be on camera for the entire 24 hours unless you are actively pissing or shitting. The league is considering funding some amount of DoorDash or other food delivery services to maximize screen time, as well as adding a charity element to the livestream to maximize outside viewer engagement, and allow for further punishments to be thrust upon the streamer. Something like donate $10 to make them do pushups, donate $250 to make them shave their head, or some things along those lines. Please send ideas in the chat for any additional rules you would like to add.
            </p>
            <p>
                Some changes here at The Offensive Line have taken place too, we've hired a graphic designer who has designed 2 logos thus far, and may be working on some exciting in-season content as well, so keep an eye out for that!
            </p>
            <ImageWrapper>
                <ArticleImage src="https://i.imgflip.com/92fg7h.jpg" />
                <ArticleCaption>Graphic Designer</ArticleCaption>
            </ImageWrapper>
            <ArticleSubheader>Previewing The 2024 Season</ArticleSubheader>
            <p>
                The commissioner, whether people like it or not, has the first pick in the draft tonight. The rest of the draft order was also pretty close to the actual happy meal results; people did not want the later first round picks this year after what felt like a frenzy for them last year. Smitty and Devan are on fully opposite ends of the draft board as they were last year. One league manager is really looking forward to the season:
            </p>
            <LeagueQuote>
                "Last night, God spoke to me in a dream and told me not to draft a certain player. This is my year  by Mandate of Heaven."<br />- 2024 League Champion
            </LeagueQuote>
            <p>
                This person is clearly confident that they have received word from god that they will win this season. We will see if God is with them in this battle, or if their players will suffer at the hands of God after this proclamation.
            </p>
        </div>
    )
}

const AlecMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src="https://i.imgflip.com/92fbvx.jpg" />
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const SquirrelMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/8b7lu6.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted by Jake</ArticleCaption>
        </ImageWrapper>
    )
}

const WaterMeme = () => {
    return (
        <ImageWrapper>
            <ArticleImage src={"https://i.imgflip.com/92fdwt.jpg"}>
            </ArticleImage>
            <ArticleCaption>Submitted Anonymously</ArticleCaption>
        </ImageWrapper>
    )
}

const closingArticle = () => {
    return (
        <div>
            <ArticleHeader>Good Luck to Everyone</ArticleHeader>
            <ArticleSubheader>Another Great Year Ahead</ArticleSubheader>
            <p>
                This year looks like it will be another exciting one, good luck to all league managers and may the best team win.
            </p>
        </div>
    )
}

export const articles = [
    {
        id: 1,
        content: TopStoryArticle,
    },
    {
        id: 2,
        content: NextSeasonArticle,
    },
    {
        id: 3,
        content: AlecMeme,
    },
    {
        id: 4,
        content: WaterMeme,
    },
    {
        id: 5,
        content: SquirrelMeme,
    },
    {
        id: 6,
        content: closingArticle,
    },
];
