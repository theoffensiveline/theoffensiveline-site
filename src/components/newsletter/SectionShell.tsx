import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ArticleHeader, ArticleSubheader } from "../newsletters/newsStyles";

interface SectionShellProps {
  id?: string;
  title: string;
  subtitle?: string;
  status: "pending" | "error" | "success";
  error?: Error | null;
  onRetry?: () => void;
  children?: React.ReactNode;
  skeleton?: React.ReactNode;
}

const SectionContainer = styled.section`
  margin: 24px 0;
  padding: 16px 0;
  box-sizing: border-box;
  scroll-margin-top: 80px; /* Account for sticky nav */
`;

const SkeletonWrapper = styled.div`
  padding: 20px 8px;
  opacity: 0.6;
`;

const SkeletonLine = styled.div<{ width?: string; height?: string }>`
  background: ${({ theme }) => theme.text};
  opacity: 0.1;
  border-radius: 4px;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "20px"};
  margin: 12px 0;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.2;
    }
  }
`;

const ErrorContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: ${({ theme }) => theme.componentBackground};
  border-radius: 4px;
  margin: 16px 8px;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.newsRed};
  font-family: "Playfair Display", serif;
  font-size: 16px;
  margin-bottom: 16px;
`;

const RetryButton = styled.button`
  background: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 10px 20px;
  font-family: "Playfair Display", serif;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const ContentWrapper = styled.div`
  /* Ensure smooth appearance */
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/**
 * SectionShell - Reusable wrapper for newsletter sections
 *
 * Provides:
 * - Consistent title/subtitle styling
 * - Loading skeleton during data fetch (custom or default)
 * - Minimum display time for skeletons (400ms) to prevent flicker
 * - Error state with retry button
 * - Smooth progressive rendering
 */
export const SectionShell: React.FC<SectionShellProps> = ({
  id,
  title,
  subtitle,
  status,
  error,
  onRetry,
  children,
  skeleton,
}) => {
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);

  // Track when loading starts
  useEffect(() => {
    if (status === "pending" && loadingStartTime === null) {
      setLoadingStartTime(Date.now());
    }
  }, [status, loadingStartTime]);

  // Handle minimum display time for skeleton (400ms)
  useEffect(() => {
    if (status === "success" && loadingStartTime !== null) {
      const elapsed = Date.now() - loadingStartTime;
      const minimumDisplayTime = 400;
      const remainingTime = Math.max(0, minimumDisplayTime - elapsed);

      const timer = setTimeout(() => {
        setShowContent(true);
        setLoadingStartTime(null);
      }, remainingTime);

      return () => clearTimeout(timer);
    } else if (status !== "success") {
      setShowContent(false);
    }
  }, [status, loadingStartTime]);

  // Determine what to show
  const shouldShowSkeleton = status === "pending" || (status === "success" && !showContent);

  return (
    <SectionContainer id={id} aria-live="polite" aria-busy={shouldShowSkeleton}>
      <ArticleHeader>{title}</ArticleHeader>
      {subtitle && <ArticleSubheader>{subtitle}</ArticleSubheader>}

      {shouldShowSkeleton && (
        <SkeletonWrapper role="status" aria-label="Loading content">
          {skeleton || (
            <>
              <SkeletonLine height="40px" />
              <SkeletonLine width="80%" />
              <SkeletonLine width="90%" />
              <SkeletonLine width="70%" />
              <SkeletonLine height="100px" />
            </>
          )}
        </SkeletonWrapper>
      )}

      {status === "error" && (
        <ErrorContainer role="alert">
          <ErrorMessage>
            {error?.message || "Failed to load this section"}
          </ErrorMessage>
          {onRetry && <RetryButton onClick={onRetry}>Retry</RetryButton>}
        </ErrorContainer>
      )}

      {status === "success" && showContent && (
        <ContentWrapper>{children}</ContentWrapper>
      )}
    </SectionContainer>
  );
};
