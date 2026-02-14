import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const MatchupWrapper = styled.div`
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MatchupRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${({ theme }) => theme.componentBackground};
  border-radius: 8px;
`;

const PlayerInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScoreBox = styled.div`
  width: 60px;
  height: 40px;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.text}10 0%,
    ${({ theme }) => theme.text}20 20%,
    ${({ theme }) => theme.text}10 40%,
    ${({ theme }) => theme.text}10 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const SkeletonBox = styled.div<{ width?: string; height?: string }>`
  height: ${({ height }) => height || "16px"};
  width: ${({ width }) => width || "100%"};
  border-radius: 4px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.text}10 0%,
    ${({ theme }) => theme.text}20 20%,
    ${({ theme }) => theme.text}10 40%,
    ${({ theme }) => theme.text}10 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.text}10;
  margin: 8px 0;
`;

/**
 * Skeleton loader for matchup plot sections
 * Approximates player matchup visualization
 */
export const MatchupSkeleton: React.FC = () => {
  return (
    <MatchupWrapper role="status" aria-label="Loading matchup">
      {[...Array(9)].map((_, i) => (
        <React.Fragment key={i}>
          <MatchupRow>
            <PlayerInfo>
              <SkeletonBox height="18px" width="70%" />
              <SkeletonBox height="14px" width="50%" />
            </PlayerInfo>
            <ScoreBox />
          </MatchupRow>
          {i === 4 && <Divider />}
        </React.Fragment>
      ))}
    </MatchupWrapper>
  );
};
