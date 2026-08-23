const LLB_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/baseball/llb/scoreboard";

export interface LLWSTeam {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
}

export interface LLWSGame {
  id: string;
  date: string;
  status: string;
  /** ESPN status detail, e.g. "Bottom 4th" for in-progress games or "Final" for completed. */
  detail: string;
  /** ESPN state: "pre" (scheduled), "in" (in progress), or "post" (completed). */
  state: "pre" | "in" | "post";
  completed: boolean;
  round: string;
  homeTeam: LLWSTeam;
  awayTeam: LLWSTeam;
  homeScore: number;
  awayScore: number;
  winner: "home" | "away" | null;
}

export interface LLWSScoreboardResponse {
  events: ESPNScoreboardEvent[];
}

interface ESPNScoreboardEvent {
  id: string;
  date: string;
  name: string;
  season: { type: number; slug: string };
  status: {
    type: {
      state: string;
      completed: boolean;
      description: string;
      detail: string;
    };
  };
  notes: { headline: string }[];
  competitions: {
    competitors: {
      homeAway: "home" | "away";
      winner?: boolean;
      team: {
        id: string;
        name: string;
        abbreviation: string;
        logo?: string;
      };
      score: string;
    }[];
  }[];
}

export async function fetchLLWSScoreboard(year: number = 2026): Promise<LLWSGame[]> {
  const datesParam = `${year}0801-${year}0831`;
  const url = `${LLB_SCOREBOARD_URL}?dates=${datesParam}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`ESPN LLB API error: ${res.status} ${res.statusText}`);
  }
  const allEvents: ESPNScoreboardEvent[] = (await res.json()).events ?? [];

  // Only include post-season games (type 3) — the actual LLWS double
  // elimination tournament in Williamsport. Regional championships are
  // type 2 (regular-season) and should not count toward draft order.
  const data = allEvents.filter(
    (e) =>
      e.season?.type === 3 && e.competitions?.[0]?.competitors?.some((c) => c.team.name !== "TBD")
  );

  return data.map((event) => {
    const comp = event.competitions[0];
    const homeComp = comp.competitors.find((c) => c.homeAway === "home")!;
    const awayComp = comp.competitors.find((c) => c.homeAway === "away")!;

    let winner: "home" | "away" | null = null;
    if (homeComp.winner === true) winner = "home";
    else if (awayComp.winner === true) winner = "away";

    return {
      id: event.id,
      date: event.date,
      status: event.status.type.description,
      detail: event.status.type.detail ?? event.status.type.description,
      state: (event.status.type.state as "pre" | "in" | "post") ?? "pre",
      completed: event.status.type.completed,
      round: event.notes?.[0]?.headline ?? "Little League World Series",
      homeTeam: {
        id: homeComp.team.id,
        name: homeComp.team.name,
        abbreviation: homeComp.team.abbreviation,
        logo: homeComp.team.logo ?? "",
      },
      awayTeam: {
        id: awayComp.team.id,
        name: awayComp.team.name,
        abbreviation: awayComp.team.abbreviation,
        logo: awayComp.team.logo ?? "",
      },
      homeScore: parseInt(homeComp.score, 10) || 0,
      awayScore: parseInt(awayComp.score, 10) || 0,
      winner,
    };
  });
}
