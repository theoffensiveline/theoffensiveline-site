import React, {useEffect} from 'react';
import {styled} from "styled-components";

const ResultContainer = styled.div`
    width: 100%;
    height: 3rem;
    align-items: center;
    color: black;
    display: flex;
    border-top: 2px solid indianred;
`;

const Row = styled.div`
    width: 100%;
    height: 100%;
`;

const Rank = styled.div`
    width: 10%;
`;

const Name = styled.a`
    width: 40%
`;

const Time = styled.div`
    width: 20%;
`;

const LeaderboardResult = ({ props }) => {
    const { name, minutes, seconds, link, hs, iter } = props;

    return (
      <ResultContainer>
        <Rank>{iter}</Rank>
        <Name href={link} target="_blank">{name}</Name>
        <Time>{minutes}m&nbsp;{seconds}.{hs}s</Time>
      </ResultContainer>
    );
};

export default LeaderboardResult;