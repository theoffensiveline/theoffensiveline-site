import { useEffect, useMemo, useState } from "react";
import { getLeague } from "../utils/api/FantasyAPI";

export const useCompletedWeeks = (leagueId?: string, enabled: boolean = true) => {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCompletedWeeks = async () => {
      if (!enabled || !leagueId) {
        setCompletedWeeks([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const league = await getLeague(leagueId);
        const lastScoredLeg = league?.settings?.last_scored_leg;
        const lastReport = league?.settings?.last_report;
        const count =
          typeof lastScoredLeg === "number" && lastScoredLeg > 0
            ? lastScoredLeg
            : typeof lastReport === "number" && lastReport > 0
              ? lastReport
              : 0;

        const weeks = Array.from({ length: count }, (_, i) => i + 1);

        if (!cancelled) {
          setCompletedWeeks(weeks);
        }
      } catch (e) {
        console.error("Error fetching league for completed weeks:", e);
        if (!cancelled) {
          setCompletedWeeks([]);
          setError("Failed to load completed weeks");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCompletedWeeks();

    return () => {
      cancelled = true;
    };
  }, [enabled, leagueId]);

  const completedWeeksDesc = useMemo(() => {
    if (completedWeeks.length === 0) return [];
    return [...completedWeeks].sort((a, b) => b - a);
  }, [completedWeeks]);

  return {
    completedWeeks,
    completedWeeksDesc,
    loading,
    error,
  };
};
