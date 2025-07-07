import { ArticleCaption, ArticleHeader, ArticleImage, ArticleSubheader, LeagueQuote, StyledTable } from '../../components/newsletters/newsStyles';
import challengeData from './challengeData.json';

export const newsDate = '2025-07-06';

const ChallengeResultsArticle = () => {

    return (
        <div>
            <ArticleHeader>2025 Draft Order for the Draft Order Challenge Results</ArticleHeader>
            <ArticleSubheader>5 managers competed, 5 others participated, and 2 failed to submit at all</ArticleSubheader>
            <p>
                When this challenge was dreamed up, many managers thought it would be too much to handle given this leagues history of participation, organization, and agreeability. However, many managers enjoyed the 12 challenge format, since it was a great way to get everyone involved in the process and start some friendly competition. Some challenges were more engaging than others, and some were downright awful to attempt. At the end of the day, Jake came out on top with 235 points, and the rights to the first pick in the draft order selection process. He will be able to choose any draft pick he wants, and the rest of the league will have to wait to see what he chooses. The Offensive Line reached out to Jake for comment on his victory, and he had this to say:
            </p>
            <LeagueQuote>
                "I'm disappointed by Matt R and Devan."<br />- Jake
            </LeagueQuote>
            <p>
                Humble and direct. Matt Robinson and Devan did not submit any challenges. Robinson did make a 45 yard field goal on Saturday, but did not submit it. Devan has been MIA for the entire length of the challenge period. We are all curious as to what Devan would have been able to do on the football field and the basketball court. He would've added some fierce competition to those challenges, but we will never know.
            </p>
            <LeagueQuote>
                "After seeing some of the field goals submitted, the Bills are aggressively pursuing both Matts in a bid to move on from Tyler Ass"<br />- Josh K
            </LeagueQuote>
            <ArticleSubheader>Final Standings</ArticleSubheader>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Points</th>
                        <th>1st Place Wins</th>
                        <th>Top 3 Finishes</th>
                        <th>Challenges Completed</th>
                        <th>Total Submissions</th>
                    </tr>
                </thead>
                <tbody>
                    {challengeData.map((entry, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{entry.rank}</td>
                            <td style={{ fontWeight: 'bold' }}>{entry.team}</td>
                            <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{entry.points}</td>
                            <td style={{ fontSize: '0.9em' }}>
                                {entry.firstPlace.length > 0 ? (
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        {entry.firstPlace.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        <li>None</li>
                                    </ul>
                                )}
                            </td>
                            <td style={{ fontSize: '0.9em' }}>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    {entry.top3.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </td>
                            <td style={{ textAlign: 'center' }}>{entry.completed}</td>
                            <td style={{ textAlign: 'center' }}>{entry.submissions}</td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
            <ArticleCaption>Final Challenge Results - Points determine draft order for the draft order (* = tie for 1st)</ArticleCaption>
        </div>
    );
};

const MemeArticle = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/9zjm2j.jpg" />
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </div>
    );
};

const MemeArticle2 = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/9zjm5n.jpg" />
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </div>
    );
};

const MemeArticle3 = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/9zjmmz.jpg" />
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </div>
    );
};

const MemeArticle4 = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/9zjmw6.jpg" />
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </div>
    );
};

const MemeArticle5 = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/9zjmqb.jpg" />
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </div>
    );
};

const MemeArticle6 = () => {
    return (
        <div>
            <ArticleImage src="https://i.imgflip.com/9zjn04.jpg" />
            <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
        </div>
    );
};

export const articles = [
    {
        id: 1,
        content: ChallengeResultsArticle,
    },
    {
        id: 2,
        content: MemeArticle,
    },
    {
        id: 3,
        content: MemeArticle2,
    },
    {
        id: 4,
        content: MemeArticle3,
    },
    {
        id: 5,
        content: MemeArticle4,
    },
    {
        id: 6,
        content: MemeArticle5,
    },
    {
        id: 7,
        content: MemeArticle6,
    },
];