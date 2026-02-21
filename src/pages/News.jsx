import { styled } from "styled-components";

const NewsHolder = styled.iframe`
  height: 100vh;
  width: 100vw;
`;

export default function News() {
  return (
    <>
      <NewsHolder src="https://trevormart.in/FantasyFootball23/Week12/Week12.html" />
    </>
  );
}
