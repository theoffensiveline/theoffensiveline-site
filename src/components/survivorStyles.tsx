import styled, { keyframes } from "styled-components";
import { ColorConstants, colorsByPosition } from "./constants/ColorConstants.ts";

export const SurvivorContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 8px;
  font-family: "Playfair Display", sans-serif;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  box-sizing: border-box;
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

export const SurvivorMatchupContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "motw",
})<{ motw?: boolean }>`
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-columns: 45% 10% 45%;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: ${({ theme }) => theme.componentBackground};
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  border: 2px solid ${({ motw }) => (motw ? ColorConstants.light.hotDogYellow : "transparent")};
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

export const SurvivorMatchupTeamInfo = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "selected" && prop !== "selectable",
})<{ selected?: boolean; selectable?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid ${({ selected, theme }) => (selected ? theme.primary : "transparent")};
  background: ${({ selected, theme }) => (selected ? `${theme.primary}1A` : "transparent")};
  cursor: ${({ selectable }) => (selectable ? "pointer" : "default")};
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${({ selected, selectable, theme }) =>
      selected ? `${theme.primary}1A` : selectable ? `${theme.primary}0D` : "transparent"};
  }

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
export const SurvivorMatchupPosition = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "position",
})<{ position: string }>`
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
  justify-self: center;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.neutral2};
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
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

interface SurvivorButtonProps {
  isSelected?: boolean;
  title?: string;
}

export const SurvivorButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<SurvivorButtonProps>`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.isSelected ? ColorConstants["light"].success : ColorConstants["light"].newsBlue};
  border: none;
  border-radius: 5px;
  color: ${ColorConstants["light"].background};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled && !props.isSelected ? 0.6 : 1)};
  transition: all 0.2s ease;
  position: relative;

  /* Tooltip styles */
  &::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 10;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover {
    background-color: ${(props) =>
      props.isSelected
        ? ColorConstants["light"].successDark
        : props.disabled
          ? ColorConstants["light"].newsBlue
          : ColorConstants["light"].newsBlueDark};
    transform: ${(props) => (!props.disabled ? "translateY(-1px)" : "none")};
  }

  &:active {
    transform: ${(props) => (!props.disabled ? "translateY(0)" : "none")};
  }
`;

/* Full-width pill variant used inside matchup team panels */
export const SurvivorSelectButton = styled(SurvivorButton)`
  width: 100%;
  border-radius: 20px;
`;

export const SurvivorWeekNav = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

export const UsedLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.65;
  margin-top: 4px;
  font-style: italic;
`;

export const PickHistory = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const PickChip = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "status",
})<{ status?: string }>`
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 10px;
  white-space: nowrap;
  background: ${({ theme }) => theme.neutral1};
  color: ${({ status }) =>
    status === "win" ? "#4caf50" : status === "loss" ? "#f44336" : "inherit"};
`;

export const SelectionReason = styled.div`
  color: #e6a800;
  font-size: 0.9rem;
  text-align: center;
  margin: 5px 0 15px;
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
