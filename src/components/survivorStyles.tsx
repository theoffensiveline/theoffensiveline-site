import styled, { keyframes } from "styled-components";
import {
  ColorConstants,
  colorsByPosition,
} from "./constants/ColorConstants.ts";

export const SurvivorContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 4px;
  font-family: "Playfair Display", sans-serif;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
`;

export const SurvivorTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-size: 48px;
  text-transform: uppercase;
  line-height: 36px;
  margin-bottom: 10px;
  max-width: 100%;
  text-align: center;
`;

export const SurvivorMatchupContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-columns: 45% 10% 45%;
  align-items: center;
  margin-bottom: 20px;
`;

export const SurvivorMatchupTitle = styled.h2`
  font-weight: 500;
  font-style: italic;
  font-size: 30px;
  box-sizing: border-box;
  padding: 10px 0 10px 0;
  text-align: center;
  line-height: normal;
  font-family: "Playfair Display", serif;
  display: block;
  margin: 0 auto;
  grid-column: 1 / span 3;
`;

export const SurvivorMatchupTeamRow = styled.div`
  display: contents;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const SurvivorMatchupTeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  margin-bottom: 10px;

  img {
    width: 75px;
    height: 75px;
    margin-bottom: 10px;
  }

  h3 {
    font-weight: 500;
    font-size: 24px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    text-align: center;
    font-family: "Playfair Display", serif;
    display: block;
    margin: 0 auto;
  }

  p {
    font-weight: 500;
    font-size: 16px;
    box-sizing: border-box;
    padding: 0 0 10px 0;
    text-align: center;
    font-family: "Playfair Display", serif;
    display: block;
    margin: 0 auto;
  }
`;

export const SurvivorMatchupPlayerRows = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-left: 3px;
  margin-right: 3px;

  h4 {
    text-align: center;
    display: block;
  }
`;

export const SurvivorMatchupPositions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

// Styled component with conditional background based on position
export const SurvivorMatchupPosition = styled.div<{ position: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) =>
    props.position === "FLEX"
      ? `
        linear-gradient(to right, 
          ${colorsByPosition.RB} 33%, 
          ${colorsByPosition.WR} 33% 66%, 
          ${colorsByPosition.TE} 100%
        )
      `
      : colorsByPosition[props.position] || ColorConstants["light"].background};
  width: 100%;
`;

export const SurvivorMatchupVs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 24px;
  box-sizing: border-box;
  padding: 10px 0 10px 0;
  text-align: center;
  font-family: "Playfair Display", serif;
  display: block;
  margin: 0 auto;
`;

export const SurvivorMatchupSectionTitle = styled.h3`
  font-weight: 500;
  font-style: italic;
  font-size: 24px;
  box-sizing: border-box;
  padding: 10px 0 10px 0;
  text-align: center;
  line-height: normal;
  font-family: "Playfair Display", serif;
  display: block;
  margin: 0 auto;
  grid-column: 1 / span 3;
`;

export const SurvivorButton = styled.button`
  padding: 10px 20px;
  background-color: ${ColorConstants["light"].newsBlue};
  border: none;
  border-radius: 5px;
  color: ${ColorConstants["light"].background};
  cursor: pointer;
`;

export const SurvivorWeekNav = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

// Keyframes for the spinning animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled spinner component
const Spinner = styled.div`
  border: 8px solid #f3f3f3; /* Light grey background */
  border-top: 8px solid ${ColorConstants["light"].newsBlue}; /* Blue spinner */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

// Container to center the spinner
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
`;

export const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

// Updated Team Points Row
export const TeamPointsRow = styled.div`
  display: contents;
  justify-content: center; /* Center items horizontally */
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 5px;

  div {
    text-align: center;
  }
`;
