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

const ChartWrapper = styled.div`
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChartArea = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.text}10 0%,
    ${({ theme }) => theme.text}20 20%,
    ${({ theme }) => theme.text}10 40%,
    ${({ theme }) => theme.text}10 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  position: relative;
  overflow: hidden;
`;

const ChartBars = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 20px;
  gap: 8px;
`;

const Bar = styled.div<{ height: string }>`
  flex: 1;
  height: ${({ height }) => height};
  background: ${({ theme }) => theme.text}05;
  border-radius: 4px 4px 0 0;
`;

const Legend = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const SkeletonBox = styled.div<{ width?: string; height?: string }>`
  height: ${({ height }) => height || "16px"};
  width: ${({ width }) => width || "100px"};
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
 * Skeleton loader for chart sections
 * Approximates chart visualizations with bars and legend
 */
export const ChartSkeleton: React.FC = () => {
  const barHeights = ["60%", "75%", "50%", "85%", "65%", "70%", "55%", "80%"];

  return (
    <ChartWrapper role="status" aria-label="Loading chart">
      <ChartArea>
        <ChartBars>
          {barHeights.map((height, i) => (
            <Bar key={i} height={height} />
          ))}
        </ChartBars>
      </ChartArea>
      <Legend>
        {[...Array(3)].map((_, i) => (
          <SkeletonBox key={i} width="80px" height="16px" />
        ))}
      </Legend>
    </ChartWrapper>
  );
};
