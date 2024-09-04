import React from 'react';
import { ArticleCaption, ArticleHeader, ArticleImage, ArticleSubheader, LeagueQuote } from '../../components/newsStyles';
import img2920 from './IMG_2920.jpeg';

export const newsDate = '2024-04-25';

const TopStoryArticle = () => {
    return (
        <div>
            <ArticleHeader>Highway Robbery In Progress</ArticleHeader>
            <ArticleSubheader>League Funds Have Gone AWOL</ArticleSubheader>
            <p>
                In a developing story, the league funds have yet to be allocated where they belong, 5 months after the season has ended. We've received multiple alerts from concerned readers and local bylaw enforcement officers.
            </p>
            <LeagueQuote>
                "We're receiving reports of a Black Toyota Corolla with New York plates racing towards the Mexican border. It's estimated the driver is fleeing with a small fortune stolen from their fellow fantasy football managers."<br />- Austin PD
            </LeagueQuote>
            <p>
                Chief Correspondent ChatGPT was able to get a photo of the Corolla on it's way to the border.
            </p>
            <ArticleImage src={img2920} />
            <ArticleCaption>Submitted by Chief Correspondent ChatGPT</ArticleCaption>
            <p>
                It remains unclear whether this is an inside job or not, but we reached out to the league office for comment on the matter.
            </p>
            <LeagueQuote>
                "The commissioners office is aware of the situation and is in an information gathering phase. No further comment at this time"
            </LeagueQuote>
            <p>
                It is responsible for the league to take this stance without all the evidence available to them, but readers will have to continue to push if they'd like to see this story resolve.
            </p>
        </div>
    )
}

const NextSeasonArticle = () => {
    return (
        <div>
            <ArticleHeader>Looking Ahead</ArticleHeader>
            <ArticleSubheader>Planning For Next Season</ArticleSubheader>
            <p>
                While we are still waiting for last season's reward and punishment, next season is quickly approaching. The NFL draft is today, and the fantasy draft is only a few months away. There were a number of ideas floated during and after last season for new punishments, rule changes, and MotW changes. This article serves to refresh everyone's memory of them, and spark a conversation about what they'd like to see. Ultimately we will want to vote before our draft and buy in.
            </p>
            <p>
                <b>Punishment ideas that have been completed / discussed previously include:</b>
                <ul>
                    <li>Take the ACT/SAT</li>
                    <li>Calendar where every other league member chooses 1 photo concept</li>
                    <li>30 Donuts/Beers/Miles</li>
                    <li>24 hour Fortnite stream</li>
                    <li>24 hours Denny's/IHOP/Waffle House challenge</li>
                    <li>Play an expensive round of golf with an imaginary ball</li>
                    <li>33 days of Tiktok where every other league member chooses 3 video concepts</li>
                    <li>Tiktok until you get 10k likes on a post</li>
                    <li>Killing yourself with an IKEA x50crmov15</li>
                    <li>Stand with "RIT Killed Our Son" Guy in protest for one day</li>
                    <li>Gracie's Challenge</li>
                    <li><a href="https://i2-prod.dailystar.co.uk/incoming/article24465473.ece/ALTERNATES/s1200e/0_JmTLxztjpeg.jpg">Circle Beard</a></li>
                    <li>Covered in peanut butter at the dog park for one hour</li>
                    <li>Write a 150 page book</li>
                    <li>50 BK Nuggets and 10 Bud Lights during Super Bowl</li>
                    <li>Volunteering in Missouri</li>
                    <li>Picking up trash on the highway with inmates</li>
                    <li>12 hours of Tiktok NPC livestreaming</li>
                    <li>Spartan race</li>
                    <li>5 drive thrus, order everything car in front did and eat it all</li>
                    <li>Fantasy football quilt</li>
                    <li>Open mic night</li>
                    <li>Flying Spirit Airlines all weekend</li>
                    <li>Community college course - must pass</li>
                </ul>
            </p>
            <p>
                <b>MotW punishment ideas that have been discussed previously include:</b>
                <ul>
                    <li>Hot Dogs / Shots for players under 10</li>
                    <li>Adding more options to above format like McDonalds ice cream cone, wings, loaf of bread, etc.</li>
                    <li>Podcast recapping previous weeks events</li>
                    <li>Tiktok dance or other Tiktok content - maybe just posting current punishment videos on Tiktok to try to fund league</li>
                </ul>
            </p>
            <p>
                <b>Rule changes that have been discussed previously include:</b>
                <ul>
                    <li>1 point for forced fumble and 1 point for fumble recovery instead of 0/2 split</li>
                    <li>Modifying defense scoring</li>
                    <li>4th down stops are a point</li>
                    <li>DQ worth points</li>
                    <li>2 IR Spots</li>
                    <li>Flex everything except QB</li>
                    <li>Punters</li>
                    <li>PPFD</li>
                    <li>Half PPR</li>
                    <li>Half PPR Half PPFD</li>
                    <li>Improve the schedule to be more random for MotW chaos purposes</li>
                </ul>
            </p>
        </div>
    )
}

const AlecMeme = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/8nxu58.jpg" />
            <ArticleCaption>Submitted by Alec</ArticleCaption>
        </div>
    )
}

const AnthonyMeme = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/8nxuqh.jpg" />
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </div>
    )
}

const JakeMeme = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/8nxvgk.jpg" />
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </div>
    )
}

const MattMeme = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/8nxw7l.jpg" />
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
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
        content: AnthonyMeme,
    },
    {
        id: 5,
        content: JakeMeme,
    },
    {
        id: 6,
        content: MattMeme,
    },
];
