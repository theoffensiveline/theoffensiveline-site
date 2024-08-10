import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    background-color: #ECECDF;
    color: #333;
    text-align: center;
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
