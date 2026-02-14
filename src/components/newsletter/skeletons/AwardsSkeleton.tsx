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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 16px 8px;
`;

const AwardCard = styled.div`
  background: ${({ theme }) => theme.componentBackground};
  border-radius: 8px;
  padding: 16px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SkeletonBox = styled.div<{ width?: string; height?: string }>`
  height: ${({ height }) => height || "20px"};
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

/**
 * Skeleton loader for awards grid sections
 * Approximates the AwardsGridV2 layout
 */
export const AwardsSkeleton: React.FC = () => {
  // Render 6 award cards to approximate typical awards section
  return (
    <Grid role="status" aria-label="Loading awards">
      {[...Array(6)].map((_, i) => (
        <AwardCard key={i}>
          <SkeletonBox height="24px" width="70%" />
          <SkeletonBox height="32px" width="90%" />
          <SkeletonBox height="16px" width="50%" />
        </AwardCard>
      ))}
    </Grid>
  );
};
