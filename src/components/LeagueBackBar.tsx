/**
 * Route-aware back affordance for the league-keyed pages (browser Back was
 * the only way out). Hierarchy: newsletter (/n/:id) → season league home
 * (/home/:leagueId) → league pages. Mounted once in App above the routes;
 * renders nothing on pages that have their own navigation (builder, reader,
 * newsletter home, login flows).
 */
import React from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getSelectedNewsletterId } from "../utils/selectedNewsletter";

const Bar = styled.div`
  padding: 10px 20px 0;
  text-align: left;
`;

const BackLink = styled.button`
  background: none;
  border: 1px solid ${({ theme }: any) => theme.newsBlue}66;
  color: ${({ theme }: any) => theme.newsBlue};
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }: any) => theme.newsBlue};
  }
`;

/** League-keyed routes whose parent is the league home. */
const LEAGUE_PAGE_PATTERNS = [
  "/league/:leagueId/league-overview",
  "/league/:leagueId/recent-activity",
  "/league/:leagueId/league-history",
  "/league/:leagueId/league-rosters",
  "/league/:leagueId/weekly-recap/:week",
  "/league/:leagueId/hot-dogs",
  "/league/:leagueId/llws",
  // NOT /league/:leagueId/newsletters — the discovery page is an entry point
  // from the platform login flows, where "back to league home" makes no sense.
  "/submit/:leagueId",
  "/bylaws/:leagueId",
  "/leaderboards/:leagueId",
  "/survivorHome/:leagueId",
  "/survivor/:leagueId",
  "/newsletter/:leagueId/:issue",
];

function LeagueBackBar(): React.ReactElement | null {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // League home → back up to the selected newsletter's seasons index.
  const homeMatch = matchPath("/home/:leagueId", pathname);
  if (homeMatch) {
    const newsletterId = getSelectedNewsletterId();
    if (!newsletterId) return null;
    return (
      <Bar>
        <BackLink onClick={() => navigate(`/n/${newsletterId}`)}>← Back to newsletter</BackLink>
      </Bar>
    );
  }

  // Any other league-keyed page → back up to that league's home.
  for (const pattern of LEAGUE_PAGE_PATTERNS) {
    const match = matchPath(pattern, pathname);
    if (match?.params.leagueId) {
      const { leagueId } = match.params;
      return (
        <Bar>
          <BackLink onClick={() => navigate(`/home/${leagueId}`)}>← Back to league home</BackLink>
        </Bar>
      );
    }
  }

  return null;
}

export default LeagueBackBar;
