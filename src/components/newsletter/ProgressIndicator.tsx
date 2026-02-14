import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";

interface ProgressIndicatorProps {
  totalSections: number;
  readySections: number;
}

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const IndicatorWrapper = styled.div`
  position: sticky;
  top: 60px;
  z-index: 100;
  background: ${({ theme }) => theme.background};
  padding: 12px 16px;
  margin: -8px -8px 16px -8px;
  border-bottom: 1px solid ${({ theme }) => theme.text}20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Playfair Display", serif;
  transition: opacity 0.3s ease;

  @media (min-width: 769px) {
    margin: -8px 0 16px 0;
  }
`;

const ProgressText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.text}20;
  border-top-color: ${({ theme }) => theme.newsRed};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  max-width: 200px;
  height: 6px;
  background: ${({ theme }) => theme.text}10;
  border-radius: 3px;
  overflow: hidden;
  margin-left: 16px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.newsRed},
    ${({ theme }) => theme.newsBlue}
  );
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const StatusText = styled.span<{ isComplete: boolean }>`
  font-weight: ${({ isComplete }) => (isComplete ? "600" : "400")};
  animation: ${({ isComplete }) => (isComplete ? "none" : pulse)} 2s infinite;
`;

/**
 * ProgressIndicator - Shows loading progress for newsletter sections
 *
 * Displays a sticky indicator at the top showing how many sections have loaded.
 * Includes a progress bar and spinner while loading, disappears when complete.
 */
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  totalSections,
  readySections,
}) => {
  const progress = useMemo(() => {
    if (totalSections === 0) return 0;
    return Math.round((readySections / totalSections) * 100);
  }, [readySections, totalSections]);

  const isComplete = readySections === totalSections;

  // Hide indicator once all sections are loaded
  if (isComplete) {
    return null;
  }

  return (
    <IndicatorWrapper role="status" aria-live="polite">
      <ProgressText>
        {!isComplete && <Spinner aria-hidden="true" />}
        <StatusText isComplete={isComplete}>
          {readySections} / {totalSections} sections ready
        </StatusText>
      </ProgressText>
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
    </IndicatorWrapper>
  );
};
