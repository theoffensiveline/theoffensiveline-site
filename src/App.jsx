import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider as CustomThemeProvider, useTheme } from "./ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ColorConstants } from "./components/constants/ColorConstants";
import NavBar from "./components/NavBar";
import SleeperLogin from "./pages/SleeperLogin";
import Home from "./pages/Home";
import News from "./pages/News";
import Submit from "./pages/Submit";
import Default from "./pages/Default";
import Bylaws from "./pages/Bylaws";
import Newsletter from "./pages/Newsletter";
import CommissionerNote from "./league/commishNote1";
import Survivor from "./pages/Survivor";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Box } from "@mui/material";
import { LeagueOverview } from "./pages/LeagueOverview";
import RecentActivity from "./pages/RecentActivity";
import LeagueHistory from "./pages/LeagueHistory";
import LeagueRosters from "./pages/LeagueRosters";
import LeaderboardsHome from "./components/leaderboard/LeaderboardsHome";
import Leaderboard from "./components/leaderboard/Leaderboard";
import OverallLeaderboard from "./components/leaderboard/OverallLeaderboard";
import HotDogs from "./pages/hotDogTracker/HotDogTracker";

const BackgroundWrapper = styled.div`
  background: ${({ $background }) => $background};
  min-height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
  }

  a {
    color: ${({ theme }) => theme.link};
  }
`;

const ThemeWithStyledThemeProvider = () => {
  const { theme } = useTheme();
  const currentTheme = ColorConstants[theme];

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <BackgroundWrapper $background={currentTheme.background}>
        <BrowserRouter>
          <NavBar />
          <Box sx={{ paddingTop: "64px" }}>
            <Routes>
              <Route path="/" element={<SleeperLogin />} />
              <Route path="/home/:leagueId" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/submit/:leagueId" element={<Submit />} />
              <Route path="/bylaws/:leagueId" element={<Bylaws />} />
              <Route path="/newsletter/:leagueId" element={<Newsletter />} />
              <Route
                path="/leaderboards/:leagueId"
                element={<LeaderboardsHome />}
              />
              <Route
                path="/leaderboard/:leaderboardId"
                element={<Leaderboard />}
              />
              <Route
                path="/leaderboard/overall"
                element={<OverallLeaderboard />}
              />
              <Route path="/survivor/:leagueId" element={<Survivor />} />
              <Route path="*" element={<Default />} />
              <Route
                path="/league/commishNote1"
                element={<CommissionerNote />}
              />
              <Route
                path="/league/:leagueId/league-overview"
                element={<LeagueOverview />}
              />
              <Route
                path="/league/:leagueId/recent-activity"
                element={<RecentActivity />}
              />
              <Route
                path="/league/:leagueId/league-history"
                element={<LeagueHistory />}
              />
              <Route
                path="/league/:leagueId/league-rosters"
                element={<LeagueRosters />}
              />
              <Route path="/league/:leagueId/hot-dogs" element={<HotDogs />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </BackgroundWrapper>
    </StyledThemeProvider>
  );
};

const App = () => (
  <CustomThemeProvider>
    <ThemeWithStyledThemeProvider />
  </CustomThemeProvider>
);

export default App;
