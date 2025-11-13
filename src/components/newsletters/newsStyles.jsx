import styled from 'styled-components';
import { ColorConstants } from '../constants/ColorConstants.ts';
import React from 'react';

export const NewsletterContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 8px;
    font-family: 'Playfair Display', sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    box-sizing: border-box;
`;

export const NewsletterTitle = styled.h1`
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: 48px;
    text-transform: uppercase;
    line-height: 36px;
    margin-bottom: 10px;
    max-width: 100%;
    text-align: center;
`;

export const DateBar = styled.div`
    text-transform: uppercase;
    border-bottom: 2px solid ${({ theme }) => theme.text};
    border-top: 2px solid ${({ theme }) => theme.text};
    padding: 12px 0 12px 0;
    text-align: center;
`;

export const ArticleHeader = styled.h2`
    font-weight: 500;
    font-style: italic;
    font-size: 24px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    text-align: center;
    line-height: normal;
    font-family: 'Playfair Display', serif;
    display: block;
    margin: 0 auto;
`;

export const ArticleSubheader = styled.div`
    font-weight: 500;
    font-size: 16px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    text-align: center;
    line-height: normal;
    font-family: 'Playfair Display', serif;
    display: block;
    margin: 0 auto;

    &:before {
        border-top: 1px solid ${({ theme }) => theme.text};
        content: '';
        width: 250px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }

    &:after {
        border-bottom: 1px solid ${({ theme }) => theme.text};
        content: '';
        width: 250px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }
`;

export const ArticleBlock = styled.div`
    padding: 8px;
    margin: 8px 0;
    width: 100%;
    text-align: justify;
    box-sizing: border-box;
`;

export const LeagueQuote = styled.div`
    font-weight: 500;
    font-size: 24px;
    box-sizing: border-box;
    display: block;
    font-style: italic;
    padding: 10px 0 10px 0;
    text-align: center;
`

export const BigLetter = styled.span`
font-size: 48px;
`;

export const ImageWrapper = styled.div`
    max-width: 100%;
`;

export const ArticleImage = styled.img`
    max-width: 100%;
    width: 100%;
`;

export const ArticleCaption = styled.figcaption`
    text-align: center;
    font-style: italic;
    font-size: 12px;
    font-family: 'Playfair Display', serif;
    color: ${({ theme }) => theme.text};
`;

export const AwardsGridV2 = ({ awardsData }) => {
    if (!awardsData || awardsData.length === 0) {
        return <p>No awards data available</p>;
    }

    return (
        <AwardsContainer>
            {awardsData.map((award, index) => (
                <Award key={index}>
                    <img src={award.photo} alt={award.name} />
                    <h2>{award.award}</h2>
                    <h3>{award.name}</h3>
                    <h4>{award.value}</h4>
                    <p>{award.description}</p>
                </Award>
            ))}
        </AwardsContainer>
    );
};

const AwardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
`;

const Award = styled.div`
    border: 1px solid ${({ theme }) => theme.text};
    border-radius: 8px;
    overflow: hidden;
    width: 100%;

    img {
        width: 100%;
        height: auto;
    }

    h2 {
        font-family: 'Playfair Display', serif;
        font-weight: 800;
        font-size: 1.5rem;
        text-align: center;
        margin: 10px 0;
    }

    h3 {
        font-family: 'Playfair Display', serif;
        font-weight: 550;
        font-size: 1.2rem;
        text-align: center;
        margin: 10px 0;
    }

    h4 {
        font-family: 'Playfair Display', serif;
        font-weight: 400;
        font-size: 1rem;
        text-align: center;
        margin: 10px 0;
    }

    p {
        font-family: 'Playfair Display', serif;
        font-weight: 200;
        font-size: 0.8rem;
        text-align: center;
        margin: 10px 0;
        padding: 0 10px;
    }
`;

export const StyledButton = styled.button`
    background-color: ${ColorConstants.background};
    border: 1px solid ${ColorConstants.newsBlue};
    border-radius: 50px;
    padding: 14px;
    cursor: pointer;
    text-align: center;
    color: ${ColorConstants.newsBlue};
`;

export const MotWRules = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week Rules</ArticleHeader>
            <p>1. The loser must send their video before next Monday Nights's kickoff.</p>
            <p>2. The loser must count their starters below 10 points, and add another for any under 0 points,
                and
                do that number of shots or eat that number of hotdogs.</p>
            <p style={{ textIndent: "2em" }}>2a. If the loser fails to submit their video on time, they must add 1 extra shot or hotdog for the first week it's late, 2 extra for the second week, 3 extra for the third week, and so on. The additional penalty grows each week, and all penalties are added to their original total.</p>
            <p style={{ textIndent: "2em" }}>2b. Nikhil Clause - If you are granted an extension, and do not meet the extended deadline, the extension is revoked and you owe the full amount of shots or dogs as if it was a normal late penalty.</p>
            <p>3. The winner will be the incumbent champion in next week's Matchup of the Week.</p>
            <p>4. In the case of a tie (pls no), both teams will complete their respective shots or dogs, and
                both
                teams will be the incumbent members in the next week's Matchups of the Week.</p>

        </div>
    )
}

export * from './tableStyles.jsx';
export * from './chartStyles.jsx';
