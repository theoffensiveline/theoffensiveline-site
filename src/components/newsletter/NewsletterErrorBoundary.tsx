import React from "react";
import { logNewsletterError } from "../../utils/logger/newsletterError";
import { getErrorCopy } from "./errorCopy";

interface Props {
  children: React.ReactNode;
  /** Stable identifier for the section (e.g. "awards") */
  sectionKey: string;
  /** League ID passed through for telemetry */
  leagueId?: string;
  /** Week number passed through for telemetry */
  week?: number;
  /**
   * Changing any of these values resets the boundary so the child can
   * attempt to render again (e.g. on leagueId / week navigation).
   */
  resetKeys?: Array<string | number | undefined>;
  /** Called when the boundary catches an error — lets parent show a toast etc. */
  onError?: (error: Error, sectionKey: string) => void;
  /** Fallback render callback — receives a retry fn */
  fallback?: (retry: () => void) => React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  /** Snapshot of resetKeys at the time the error was caught */
  errorResetKeys?: Array<string | number | undefined>;
}

/**
 * NewsletterErrorBoundary — catches render-time JavaScript errors inside a
 * newsletter section and shows an inline fallback rather than blanking the
 * entire page.
 *
 * Wire `resetKeys` to [leagueId, week, sectionKey] so that navigation
 * automatically resets the boundary without a full page reload.
 */
export class NewsletterErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    logNewsletterError(error, {
      sectionKey: this.props.sectionKey,
      leagueId: this.props.leagueId,
      week: this.props.week,
      detail: info.componentStack ?? undefined,
    });

    this.props.onError?.(error, this.props.sectionKey);
  }

  /**
   * Reset the boundary when resetKeys change — mirrors react-error-boundary's
   * behaviour so navigating to a new week always clears the error state.
   */
  static getDerivedStateFromProps(
    props: Props,
    state: State,
  ): Partial<State> | null {
    if (!state.hasError) return null;

    const { resetKeys } = props;
    const { errorResetKeys } = state;

    if (
      resetKeys &&
      errorResetKeys &&
      resetKeys.some((key, i) => key !== errorResetKeys[i])
    ) {
      return { hasError: false, error: null, errorResetKeys: undefined };
    }

    // Store the resetKeys snapshot so we can detect future changes
    if (resetKeys && !errorResetKeys) {
      return { errorResetKeys: resetKeys };
    }

    return null;
  }

  private reset = () => {
    this.setState({ hasError: false, error: null, errorResetKeys: undefined });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.reset);
      }
      // Default inline fallback — styled minimally to avoid theme dependencies
      const copy = getErrorCopy(this.state.error);
      return (
        <RenderErrorFallback
          title={copy.title}
          description={copy.description}
          onRetry={this.reset}
        />
      );
    }

    return this.props.children;
  }
}

// ---------------------------------------------------------------------------
// Inline fallback UI (no styled-components — avoids ThemeProvider dependency)
// ---------------------------------------------------------------------------

interface FallbackProps {
  title: string;
  description: string;
  onRetry: () => void;
}

const RenderErrorFallback: React.FC<FallbackProps> = ({
  title,
  description,
  onRetry,
}) => (
  <div
    role="alert"
    aria-live="assertive"
    tabIndex={-1}
    style={{
      padding: "20px",
      textAlign: "center",
      border: "1px solid rgba(255, 51, 102, 0.3)",
      borderRadius: "4px",
      margin: "16px 8px",
    }}
  >
    <p
      style={{
        color: "#FF3366",
        fontFamily: '"Playfair Display", serif',
        fontSize: "16px",
        marginBottom: "8px",
        fontWeight: 600,
      }}
    >
      {title}
    </p>
    <p
      style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: "13px",
        marginBottom: "16px",
        opacity: 0.75,
      }}
    >
      {description}
    </p>
    <button
      onClick={onRetry}
      style={{
        background: "#555555",
        color: "#e7e7e7",
        border: "none",
        padding: "10px 20px",
        fontFamily: '"Playfair Display", serif',
        fontSize: "14px",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Retry
    </button>
  </div>
);
