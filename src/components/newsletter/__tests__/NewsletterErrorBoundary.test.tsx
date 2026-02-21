import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NewsletterErrorBoundary } from "../NewsletterErrorBoundary";

// Suppress expected console output from React error boundary internals
const originalError = console.error;
const originalGroup = console.group;
const originalInfo = console.info;
beforeEach(() => {
  console.error = jest.fn();
  console.group = jest.fn();
  console.info = jest.fn();
});
afterEach(() => {
  console.error = originalError;
  console.group = originalGroup;
  console.info = originalInfo;
});

// ---------------------------------------------------------------------------
// A component that throws on demand
// ---------------------------------------------------------------------------

const ThrowingComponent: React.FC<{ shouldThrow: boolean; message?: string }> = ({
  shouldThrow,
  message = "Test render error",
}) => {
  if (shouldThrow) throw new Error(message);
  return <div>Rendered successfully</div>;
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("NewsletterErrorBoundary", () => {
  it("renders children normally when no error occurs", () => {
    render(
      <NewsletterErrorBoundary sectionKey="awards">
        <ThrowingComponent shouldThrow={false} />
      </NewsletterErrorBoundary>
    );

    expect(screen.getByText("Rendered successfully")).toBeTruthy();
  });

  it("catches a render error and shows fallback UI instead of crashing", () => {
    render(
      <NewsletterErrorBoundary sectionKey="awards">
        <ThrowingComponent shouldThrow={true} />
      </NewsletterErrorBoundary>
    );

    // Children should not be visible
    expect(screen.queryByText("Rendered successfully")).toBeNull();

    // Fallback UI should appear (Retry button)
    expect(screen.getByRole("button", { name: /retry/i })).toBeTruthy();
  });

  it("shows actionable error copy derived from the thrown error", () => {
    render(
      <NewsletterErrorBoundary sectionKey="efficiency">
        <ThrowingComponent shouldThrow={true} message="Network error occurred" />
      </NewsletterErrorBoundary>
    );

    // Should show friendly network error copy, not the raw error message
    expect(screen.getByText(/network connection issue/i)).toBeTruthy();
  });

  it("resets and renders children again when Retry is clicked", () => {
    const { rerender } = render(
      <NewsletterErrorBoundary sectionKey="awards">
        <ThrowingComponent shouldThrow={true} />
      </NewsletterErrorBoundary>
    );

    // Boundary is in error state
    expect(screen.getByRole("button", { name: /retry/i })).toBeTruthy();

    // Update child props first so that when the boundary resets it won't re-throw
    rerender(
      <NewsletterErrorBoundary sectionKey="awards">
        <ThrowingComponent shouldThrow={false} />
      </NewsletterErrorBoundary>
    );

    // Now click retry — boundary resets and renders the (now non-throwing) child
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    expect(screen.getByText("Rendered successfully")).toBeTruthy();
  });

  it("auto-resets when resetKeys change (simulating navigation)", () => {
    const { rerender } = render(
      <NewsletterErrorBoundary
        sectionKey="awards"
        leagueId="league-1"
        week={1}
        resetKeys={["league-1", 1, "awards"]}
      >
        <ThrowingComponent shouldThrow={true} />
      </NewsletterErrorBoundary>
    );

    // Error state
    expect(screen.getByRole("button", { name: /retry/i })).toBeTruthy();

    // Navigate to a different week — resetKeys change
    rerender(
      <NewsletterErrorBoundary
        sectionKey="awards"
        leagueId="league-1"
        week={2}
        resetKeys={["league-1", 2, "awards"]}
      >
        <ThrowingComponent shouldThrow={false} />
      </NewsletterErrorBoundary>
    );

    // Boundary should have reset and now show children
    expect(screen.getByText("Rendered successfully")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /retry/i })).toBeNull();
  });

  it("calls onError callback when a render error is caught", () => {
    const onError = jest.fn();

    render(
      <NewsletterErrorBoundary sectionKey="standings" onError={onError}>
        <ThrowingComponent shouldThrow={true} message="Standings render crash" />
      </NewsletterErrorBoundary>
    );

    expect(onError).toHaveBeenCalledTimes(1);
    const [passedError, passedKey] = onError.mock.calls[0];
    expect(passedError).toBeInstanceOf(Error);
    expect(passedKey).toBe("standings");
  });

  it("renders custom fallback when provided", () => {
    const customFallback = (retry: () => void) => (
      <div>
        <span>Custom fallback UI</span>
        <button onClick={retry}>Custom Retry</button>
      </div>
    );

    render(
      <NewsletterErrorBoundary sectionKey="awards" fallback={customFallback}>
        <ThrowingComponent shouldThrow={true} />
      </NewsletterErrorBoundary>
    );

    expect(screen.getByText("Custom fallback UI")).toBeTruthy();
    expect(screen.getByRole("button", { name: /custom retry/i })).toBeTruthy();
  });

  it("does not unmount sibling boundaries when one section errors", () => {
    render(
      <div>
        <NewsletterErrorBoundary sectionKey="awards">
          <ThrowingComponent shouldThrow={true} />
        </NewsletterErrorBoundary>
        <NewsletterErrorBoundary sectionKey="standings">
          <ThrowingComponent shouldThrow={false} />
        </NewsletterErrorBoundary>
      </div>
    );

    // First boundary is in error state — retry button present
    expect(screen.getByRole("button", { name: /retry/i })).toBeTruthy();
    // Second boundary renders fine
    expect(screen.getByText("Rendered successfully")).toBeTruthy();
  });
});
