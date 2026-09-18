import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Check, Share } from "lucide-react";

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid ${({ theme }) => theme.newsBlue}66;
  color: ${({ theme }) => theme.newsBlue};
  border-radius: 20px;
  padding: 6px 14px;
  font-family: "Playfair Display", serif;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const CenteredWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

interface ShareButtonProps {
  /** Share-sheet title — defaults to the document title. */
  title?: string;
  /** Optional blurb shown with the link in the share sheet. */
  text?: string;
  /** URL to share — defaults to the current page URL. */
  url?: string;
  /** Center on its own row (newsletter headers) vs. inline with other pill buttons. */
  centered?: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url, centered }) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const handleClick = async () => {
    const shareUrl = url ?? window.location.href;

    // Native share sheet: iOS/Android, plus desktop Safari/Chrome/Edge.
    if (navigator.share) {
      try {
        await navigator.share({ title: title ?? document.title, text, url: shareUrl });
      } catch {
        // Sheet dismissed or share failed — nothing to surface.
      }
      return;
    }

    // No share sheet (e.g. desktop Firefox): copy the link instead.
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", shareUrl);
    }
  };

  const button = (
    <Button type="button" onClick={handleClick} aria-label="Share this page">
      {copied ? <Check size={14} /> : <Share size={14} />}
      {copied ? "Link copied" : "Share"}
    </Button>
  );

  return centered ? <CenteredWrap>{button}</CenteredWrap> : button;
};

export default ShareButton;
