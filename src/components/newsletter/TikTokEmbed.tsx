/**
 * TikTokEmbed (#137) — renders a TikTok video/photo post via TikTok's
 * embed.js, given any bare TikTok URL: canonical @user/video/{id} links are
 * parsed locally and /t/, vm., vt. short links are resolved through TikTok's
 * public oEmbed endpoint (CORS-enabled, follows their redirects server-side)
 * via resolveTikTokUrl.
 *
 * Unlike Instagram/Twitter there's no public re-process API: each embed.js
 * execution rescans the document for unprocessed .tiktok-embed blockquotes,
 * so we append a fresh script tag per mount — the same pattern TikTok's own
 * embed markup uses (one script tag per embed). The blockquote is injected
 * imperatively so React never reconciles a node embed.js rewrites in place.
 * If the URL can't be resolved or the script is blocked, a plain "View on
 * TikTok" link remains as the fallback.
 */
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { resolveTikTokUrl } from "../../utils/submissionUtils";

const EmbedWrapper = styled.div`
  margin-top: 4px;
  max-width: 605px;

  /* Pre-transform the blockquote is just the fallback links — drop the
     browser's default 40px side margins so it aligns like other embeds. */
  blockquote.tiktok-embed {
    margin: 1px 0;
  }
`;

interface TikTokEmbedProps {
  /** Any bare TikTok URL — canonical @user/video/{id} or a short link. */
  url: string;
}

export function TikTokEmbed({ url }: TikTokEmbedProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;
    /* url is raw submission text — build the fallback anchor via DOM APIs so
       a quote in the URL can't break out of the attribute. */
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = "View on TikTok";
    el.replaceChildren(anchor);
    resolveTikTokUrl(url)
      .then((data) => {
        if (cancelled || !data) return;
        /* All three fields come from getTikTokEmbedData's whitelisted charset
           groups ([A-Za-z0-9_.] and \d), so they can't break out of the
           attributes to inject markup. */
        el.innerHTML = `<blockquote class="tiktok-embed" cite="${data.url}" data-video-id="${data.videoId}" style="max-width:605px;min-width:325px;"><section><a target="_blank" rel="noreferrer" title="@${data.username}" href="https://www.tiktok.com/@${data.username}?refer=embed">@${data.username}</a> <a target="_blank" rel="noreferrer" href="${data.url}">View on TikTok</a></section></blockquote>`;
        /* StrictMode double-mount: the remount rewrites innerHTML and appends
           another script tag; whichever scan runs second sees the blockquote
           already processed (embed.js marks handled nodes with an id). */
        const script = document.createElement("script");
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      })
      .catch(() => {
        /* Fallback link stays. */
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
