import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSurvivorDeadlineInfo } from "../../utils/survivorUtils";
import { ColorConstants } from "../constants/ColorConstants";

const Banner = styled.div<{ locked: boolean; urgent: boolean }>`
  background: ${({ theme }) => theme.componentBackground};
  border-left: 4px solid
    ${({ locked, urgent }) =>
      locked
        ? "#f44336"
        : urgent
          ? ColorConstants.light.hotDogYellow
          : ColorConstants.light.newsBlue};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

export const formatRemaining = (ms: number): string => {
  const totalMinutes = Math.max(0, Math.floor(ms / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export const formatEt = (date: Date): string =>
  `${date.toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  })} ET`;

/** Ticking deadline info — re-evaluates every minute. */
export const useSurvivorDeadlineInfo = () => {
  const [info, setInfo] = useState(getSurvivorDeadlineInfo);

  useEffect(() => {
    const interval = setInterval(() => setInfo(getSurvivorDeadlineInfo()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return info;
};

/** Countdown to the Thursday 8 PM ET pick lock (or to the Tuesday reopen during blackout). */
const SurvivorDeadlineBanner: React.FC = () => {
  const info = useSurvivorDeadlineInfo();

  const remaining = info.deadline.getTime() - Date.now();
  const urgent = !info.locked && remaining < 24 * 60 * 60 * 1000;

  return (
    <Banner locked={info.locked} urgent={urgent}>
      {info.locked ? (
        <span>
          🔒 Picks are locked — submissions reopen <strong>{formatEt(info.deadline)}</strong>
        </span>
      ) : (
        <span>
          ⏰ Picks lock <strong>{formatEt(info.deadline)}</strong>
          {remaining > 0 && <> — {formatRemaining(remaining)} left</>}
        </span>
      )}
    </Banner>
  );
};

export default SurvivorDeadlineBanner;
