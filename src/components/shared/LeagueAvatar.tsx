/**
 * LeagueAvatar — circular league image with a generic football fallback.
 *
 * League rows look inconsistent when some leagues have avatars and others
 * don't; this renders a 🏈 placeholder circle when there's no image (or the
 * image fails to load) so every row gets the same layout.
 *
 * Extend with styled() to add spacing: styled(LeagueAvatar)`margin-right: 12px;`
 */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Photo = styled.img<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const Placeholder = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: any) => theme.neutral3}33;
  font-size: ${({ $size }) => Math.round($size * 0.55)}px;
  flex-shrink: 0;
`;

interface LeagueAvatarProps {
  /** Image URL; the placeholder shows when absent. */
  src?: string | null;
  alt: string;
  /** Diameter in px. */
  size?: number;
  className?: string;
}

function LeagueAvatar({ src, alt, size = 36, className }: LeagueAvatarProps): React.ReactElement {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <Placeholder className={className} $size={size} role="img" aria-label={alt}>
        🏈
      </Placeholder>
    );
  }
  return (
    <Photo className={className} $size={size} src={src} alt={alt} onError={() => setFailed(true)} />
  );
}

export default LeagueAvatar;
