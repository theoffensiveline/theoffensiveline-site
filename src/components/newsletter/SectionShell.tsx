import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ArticleHeader, ArticleSubheader } from "../newsletters/newsStyles";
import { NewsletterErrorBoundary } from "./NewsletterErrorBoundary";
import { getErrorCopy } from "./errorCopy";
import { logNewsletterError } from "../../utils/logger/newsletterError";

interface SectionShellProps {
  id?: string;
  title: string;
  subtitle?: string;
  status: "pending" | "error" | "success";
  error?: Error | null;
  onRetry?: () => void;
  children?: React.ReactNode;
  skeleton?: React.ReactNode;
  /** Passed to the error boundary for telemetry and auto-reset */
  sectionKey?: string;
  leagueId?: string;
  week?: number;
  /** Timestamp of the last successful data fetch, shown in the error panel */
  lastUpdated?: Date;
  /** Called when the inner error boundary catches a render error */
  onBoundaryError?: (error: Error, sectionKey: string) => void;
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
  border: 1px solid rgba(255, 51, 102, 0.3);
  border-radius: 4px;
  margin: 16px 8px;
`;

const ErrorTitle = styled.p`
  color: ${({ theme }) => theme.newsRed};
  font-family: "Playfair Display", serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ErrorDescription = styled.p`
  font-family: "Playfair Display", serif;
  font-size: 13px;
  margin-bottom: 16px;
  opacity: 0.75;
`;

const LastUpdatedNote = styled.p`
  font-family: "Playfair Display", serif;
  font-size: 11px;
  opacity: 0.5;
  margin-bottom: 12px;
`;

const ErrorDetail = styled.p`
  font-family: monospace;
  font-size: 11px;
  opacity: 0.55;
  margin-bottom: 12px;
  word-break: break-word;
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

function formatLastUpdated(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * SectionShell - Reusable wrapper for newsletter sections.
 *
 * Provides:
 * - Consistent title/subtitle styling
 * - Loading skeleton during data fetch (custom or default)
 * - Minimum display time for skeletons (400ms) to prevent flicker
 * - Error state with actionable copy and retry button
 * - React ErrorBoundary wrapping children to catch render-time JS errors
 * - Keyboard focus moves to the error panel when it appears
 * - lastUpdated timestamp shown in the error panel
 * - Smooth progressive rendering
 *
 * Wrapped in React.memo so sections that haven't changed don't re-render
 * when sibling sections finish loading (status/children unchanged = no work).
 */
const SectionShellInner: React.FC<SectionShellProps> = ({
  id,
  title,
  subtitle,
  status,
  error,
  onRetry,
  children,
  skeleton,
  sectionKey,
  leagueId,
  week,
  lastUpdated,
  onBoundaryError,
}) => {
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  const errorContainerRef = useRef<HTMLDivElement>(null);

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

  // Move keyboard focus to error panel for accessibility
  useEffect(() => {
    if (status === "error" && errorContainerRef.current) {
      errorContainerRef.current.focus();
    }
  }, [status]);

  // Log API-level errors via the centralized logger
  useEffect(() => {
    if (status === "error" && error) {
      logNewsletterError(error, {
        sectionKey: sectionKey ?? id ?? title,
        leagueId,
        week,
        lastUpdated,
      });
    }
    // Only re-run when the error itself changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // Determine what to show
  const shouldShowSkeleton = status === "pending" || (status === "success" && !showContent);

  const errorCopy = getErrorCopy(error ?? null);

  const resetKeys: Array<string | number | undefined> = [leagueId, week, sectionKey ?? id];

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
        <ErrorContainer role="alert" aria-live="assertive" tabIndex={-1} ref={errorContainerRef}>
          <ErrorTitle>{errorCopy.title}</ErrorTitle>
          <ErrorDescription>{errorCopy.description}</ErrorDescription>
          {error?.message && <ErrorDetail>{error.message}</ErrorDetail>}
          {lastUpdated && (
            <LastUpdatedNote>
              Last successful load: {formatLastUpdated(lastUpdated)}
            </LastUpdatedNote>
          )}
          {onRetry && <RetryButton onClick={onRetry}>Retry</RetryButton>}
        </ErrorContainer>
      )}

      {status === "success" && showContent && (
        <NewsletterErrorBoundary
          sectionKey={sectionKey ?? id ?? title}
          leagueId={leagueId}
          week={week}
          resetKeys={resetKeys}
          onError={onBoundaryError}
        >
          <ContentWrapper>{children}</ContentWrapper>
        </NewsletterErrorBoundary>
      )}
    </SectionContainer>
  );
};

export const SectionShell = React.memo(SectionShellInner);
