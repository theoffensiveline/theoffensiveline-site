import React from 'react';
import AwardsTable, { ArticleImage, ArticleHeader, ImageWrapper, ArticleSubheader, StyledTable } from '../../components/newsStyles';
import awardsData from './awardsTable.json';

export const newsDate = '2023-11-09';

export const articles = [
    {
        id: 1,
        title: 'Article 1',
        content: (
            <div>
                <ArticleHeader>Awards and Recap</ArticleHeader>
                <ArticleSubheader>Week 9</ArticleSubheader>
                <AwardsTable awardsData={awardsData} />
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
