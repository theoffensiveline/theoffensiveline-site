import styled from "styled-components";
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
  color: ${ColorConstants.text};
  background-color: ${ColorConstants.background};
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
  grid-template-rows: auto auto auto;
  grid-template-columns: 45% 10% 45%;
  align-items: center;
  margin-bottom: 20px;
`;

export const SurvivorMatchupGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  justify-content: center;
  padding: 20px;
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
`;

export const SurvivorMatchupPlayerRows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
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
      : colorsByPosition[props.position] || ColorConstants.background};
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

export const SurvivorSelectTeamButton = styled.button`
  padding: 10px 20px;
  background-color: ${ColorConstants.newsBlue};
  border: none;
  border-radius: 5px;
  color: ${ColorConstants.background};
  cursor: pointer;
`;
