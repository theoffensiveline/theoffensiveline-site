/**
 * TweetEmbed (#submit) — renders a tweet preview via Twitter's official
 * widgets.js, loaded lazily on first use. Falls back to a plain link if the
 * script or tweet fails to load (deleted/protected tweets, blocked
 * third-party scripts, etc.).
 */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../../ThemeContext";

const EmbedWrapper = styled.div`
  margin-top: 4px;
  max-width: 550px;
`;

declare global {
  interface Window {
    twttr?: {
      ready?: (cb: () => void) => void;
      widgets?: {
        createTweet: (
          tweetId: string,
          el: HTMLElement,
          options?: { theme?: "light" | "dark" }
        ) => Promise<HTMLElement | undefined>;
      };
    };
  }
}

type Twttr = NonNullable<Window["twttr"]>;

let widgetsPromise: Promise<Twttr> | null = null;

/** Load platform.twitter.com/widgets.js once, resolving when twttr.widgets is ready. */
function loadTwitterWidgets(): Promise<Twttr> {
  if (widgetsPromise) return widgetsPromise;
  widgetsPromise = new Promise<Twttr>((resolve, reject) => {
    if (window.twttr?.widgets) {
      resolve(window.twttr);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => {
      // twttr.ready fires once the widgets hub is initialized
      if (window.twttr?.ready) {
        window.twttr.ready(() => resolve(window.twttr!));
      } else if (window.twttr?.widgets) {
        resolve(window.twttr);
      } else {
        widgetsPromise = null;
        reject(new Error("Twitter widgets unavailable"));
      }
    };
    script.onerror = () => {
      widgetsPromise = null;
      reject(new Error("Failed to load Twitter widgets"));
    };
    document.body.appendChild(script);
  });
  return widgetsPromise;
}

interface TweetEmbedProps {
  tweetId: string;
  /** Original tweet URL — used for the fallback link if embedding fails. */
  url: string;
}

export function TweetEmbed({ tweetId, url }: TweetEmbedProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;
    setFailed(false);
    el.innerHTML = "";
    loadTwitterWidgets()
      .then((twttr) =>
        twttr.widgets!.createTweet(tweetId, el, { theme: theme === "dark" ? "dark" : "light" })
      )
      .then((rendered) => {
        // StrictMode double-mounts effects in dev: the stale run's createTweet
        // can resolve after cleanup and append a duplicate embed — remove it.
        if (cancelled) {
          rendered?.remove();
        } else if (!rendered) {
          setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [tweetId, theme]);

  return (
    <EmbedWrapper>
      <div ref={containerRef} />
      {failed && (
        <a href={url} target="_blank" rel="noreferrer">
          View tweet
        </a>
      )}
    </EmbedWrapper>
  );
}
