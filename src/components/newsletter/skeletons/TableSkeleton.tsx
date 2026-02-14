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

const TableWrapper = styled.div`
  padding: 16px 8px;
  overflow-x: auto;
`;

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  gap: 8px;
  padding: 12px 8px;
  border-bottom: 2px solid ${({ theme }) => theme.text}20;
  margin-bottom: 8px;
`;

const TableRow = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  gap: 8px;
  padding: 12px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.text}10;
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

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

/**
 * Skeleton loader for table sections (standings, leaderboards, etc.)
 * Approximates table layout with headers and rows
 */
export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 10,
  columns = 5,
}) => {
  return (
    <TableWrapper role="status" aria-label="Loading table">
      <Table>
        <TableHeader $columns={columns}>
          {[...Array(columns)].map((_, i) => (
            <SkeletonBox key={i} height="18px" width="80%" />
          ))}
        </TableHeader>
        {[...Array(rows)].map((_, rowIndex) => (
          <TableRow key={rowIndex} $columns={columns}>
            {[...Array(columns)].map((_, colIndex) => (
              <SkeletonBox
                key={colIndex}
                height="16px"
                width={colIndex === 0 ? "60%" : "40%"}
              />
            ))}
          </TableRow>
        ))}
      </Table>
    </TableWrapper>
  );
};
