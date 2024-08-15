import React from 'react';
import styled from 'styled-components';
import { ColorConstants } from '../components/constants/ColorConstants';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: ${ColorConstants.background};
    color: ${ColorConstants.text};
    text-align: center;

    @media (max-width: 600px) {
        padding: 10px;
    }
`;

const Heading = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
`;

const Message = styled.p`
    font-size: 1.25rem;
    margin: 0;
`;

function ComingSoon() {
    return (
        <Container>
            <Heading>Coming Soon</Heading>
            <Message>Features for all Sleeper leagues coming soon</Message>
        </Container>
    );
}

export default ComingSoon;
