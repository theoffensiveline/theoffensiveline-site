import styled from "styled-components";

export default function NavBar({someText}) {
    return (
        <NavWrapper>
            <h1>{someText}</h1>
        </NavWrapper>
    );
};

const NavWrapper = styled.div`
    background-color: green;
`;
