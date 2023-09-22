import styled from "styled-components";
import LinkButton from "./LinkButton";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export default function NavBar() {
    return (
        <NavWrapper>
            <LinkButton destination="./" text="Home" />
            <LinkButton destination="news" text="News" />
            <LinkButton destination="submit" text="Contact" />
        </NavWrapper>
    );
}

