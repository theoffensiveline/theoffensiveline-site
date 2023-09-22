import styled from "styled-components";
import LinkButton from "./LinkButton";

const NavWrapper = styled.div`
    background-color: green;
`;

const NavButtonStyles = `
    background-color: blue;
    height: 50%;
`;

export default function NavBar() {
    return (
        <NavWrapper>
            <h1>The Offensive Line</h1>
            <LinkButton
                destination='/'
                styles={NavButtonStyles}
                text="Home"
            />
            <LinkButton
                destination='/News'
                styles={NavButtonStyles}
                text="News"
            />
            <LinkButton
                destination='/submit'
                styles={NavButtonStyles}
                text="Submit"
            />
        </NavWrapper>
    );
};