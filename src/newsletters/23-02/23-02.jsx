import React from 'react';
import { ArticleImage, ArticleHeader, ImageWrapper, ArticleSubheader, StyledTable } from '../../components/newsStyles';
import ReactMarkdown from 'react-markdown';

export const newsDate = '2023-11-09';

const AwardsTable = `
| Superlative | Winner + Description |
| ----------- | --------------------- |
| Best Managed Team | Njigba’s in Paris - 183.96 points (#1 this season) |
| Most Mismanaged Team | Dropping Like Flys - 97.5 points (#19 this season) |
| Literally Throwing | WalterVick played Sam Howell - 30.98 points (#5 this season) |
| Running Wild | Njigba’s in Paris played Jahmyr Gibbs - 29.9 points (#7 this season) |
| Widest Receiver | Njigba’s in Paris played CeeDee Lamb - 41 points (#6 this season) |
| Tighest End | E.T.N Phone Home played George Kittle - 23.9 points (#6 this season) |
| Das Boot | Dropping Like Flys played Brandon McManus - 17.6 points (#6 this season) |
| Biggest D | Just Joshin played DAL - 15 points (#11 this season) |
| MVP | First Down Syndrome played DeAndre Hopkins - 25.28% of points (#14 this season) |
| Worst Winner | Bijan shih tzu - 120.42 points (#10 this season) |
| Best Loser | WalterVick - 144.48 points (#1 this season) |
| Deadest Horse | Njigba’s in Paris defeated WalterVick by 39.48 points (#15 this season) |
| Photo Finish | Bijan shih tzu defeated Travis Swift by 6.12 points (#6 this season) |
| Warmest Bench | The Werbenjägermanjensens left 31.34 points on the bench (#10 this season) |
| Optimizer | Travis Swift left 0 points on the bench (#1 this season) |
`;

export const articles = [
    {
        id: 1,
        title: 'Article 1',
        content: (
            <div>
                <ArticleHeader>Awards and Recap</ArticleHeader>
                <ArticleSubheader>Week 9</ArticleSubheader>
                <StyledTable>
                    <ReactMarkdown>{AwardsTable}</ReactMarkdown>
                </StyledTable>
                <ImageWrapper><ArticleImage src="https://picsum.photos/800/300" alt="Article 1" /></ImageWrapper>
                <p>
                    This is the content of Article 1. It can include text, images, and other elements.
                </p>
            </div>
        ),
    },
    {
        id: 2,
        title: 'Article 2',
        content: (
            <div>
                <ArticleHeader>This is the Title of Article 2</ArticleHeader>
                <ImageWrapper><ArticleImage src="https://picsum.photos/400/400" alt="Article 2" /></ImageWrapper>
                <p>
                    This is the content of Article 2. It can include text, images, and other elements.
                </p>
            </div>)
    },
    {
        id: 3,
        title: 'Article 3',
        content: (
            <div>
                <ArticleHeader>This is the Title of Article 3</ArticleHeader>
                <ImageWrapper><ArticleImage src="https://picsum.photos/900/600" alt="Article 3" /></ImageWrapper>
                <p>
                    This is the content of Article 3. It can include text, images, and other elements.
                </p>
            </div>
        ),
    },
];
