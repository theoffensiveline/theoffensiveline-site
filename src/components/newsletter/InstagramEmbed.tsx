/**
 * InstagramEmbed (#136) — renders an Instagram reel/post via Instagram's
 * official embed.js, loaded lazily on first use. The blockquote markup is
 * injected imperatively so React never reconciles a node that embed.js
 * rewrites in place. If the script is blocked or fails, the link inside the
 * blockquote stays visible as the fallback. IG embeds are always light-themed.
 */
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const EmbedWrapper = styled.div`
  margin-top: 4px;
  max-width: 540px;

  /* Pre-transform the blockquote is just the fallback link — drop the
     browser's default 40px side margins so it aligns like a tweet embed. */
  blockquote.instagram-media {
    margin: 1px 0;
  }
`;

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

let embedPromise: Promise<void> | null = null;

/** Load www.instagram.com/embed.js once, resolving when instgrm.Embeds is ready. */
function loadInstagramEmbed(): Promise<void> {
  if (embedPromise) return embedPromise;
  embedPromise = new Promise<void>((resolve, reject) => {
    if (window.instgrm?.Embeds) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.instgrm?.Embeds) {
        resolve();
      } else {
        embedPromise = null;
        reject(new Error("Instagram embed unavailable"));
      }
    };
    script.onerror = () => {
      embedPromise = null;
      reject(new Error("Failed to load Instagram embed"));
    };
    document.body.appendChild(script);
  });
  return embedPromise;
}

interface InstagramEmbedProps {
  /** Canonical instagram.com/{p|reel}/{id}/ permalink from getInstagramEmbedUrl. */
  url: string;
}

export function InstagramEmbed({ url }: InstagramEmbedProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;
    // url is canonicalized by getInstagramEmbedUrl from an [A-Za-z0-9_-] id, so
    // it can't break out of the attribute.
    el.innerHTML = `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}" data-instgrm-version="14"><a href="${url}" target="_blank" rel="noreferrer">View on Instagram</a></blockquote>`;
    loadInstagramEmbed()
      .then(() => {
        /* StrictMode double-mount: a stale run resolving after cleanup is a
           no-op — process() only transforms blockquotes still in the document. */
        if (!cancelled) window.instgrm?.Embeds?.process();
      })
      .catch(() => {
        /* Fallback link inside the blockquote stays visible. */
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <EmbedWrapper>
      <div ref={containerRef} />
    </EmbedWrapper>
  );
}
