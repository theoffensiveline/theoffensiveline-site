import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { styled } from "styled-components";
import { useFeedback } from "../contexts/FeedbackContext";

// Position the wrapper, not the Fab — MUI's Fab injects its own styles that
// can override styled-components positioning. The wrapper keeps layout
// stable while the Fab inherits theme colors from styled-components.
const FabWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1300;
  // Desktop only — hidden on mobile to avoid being intrusive.
  // On mobile, feedback is accessible via the NavBar user menu.
  display: none;

  @media (min-width: 900px) {
    display: block;
  }

  .MuiFab-root {
    background-color: ${({ theme }) => theme.newsBlue};
    color: ${({ theme }) => theme.background};

    &:hover {
      background-color: ${({ theme }) => theme.newsBlue}dd;
    }
  }
`;

const FloatingFeedbackButton = () => {
  const { openFeedback } = useFeedback();

  return (
    <FabWrapper>
      <Tooltip title="Send Feedback" placement="left">
        <Fab onClick={openFeedback} aria-label="send feedback">
          <FeedbackIcon />
        </Fab>
      </Tooltip>
    </FabWrapper>
  );
};

export default FloatingFeedbackButton;
