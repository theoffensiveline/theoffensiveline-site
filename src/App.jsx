import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as CustomThemeProvider, useTheme } from "./ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ColorConstants } from "./components/constants/ColorConstants";
import NavBar from "./components/NavBar";
import SleeperLogin from "./pages/SleeperLogin";
import Login from "./pages/Login";
import Home from "./pages/Home";
import News from "./pages/News";
import Submit from "./pages/Submit";
import Bylaws from "./pages/Bylaws";
import Newsletter from "./pages/Newsletter";
import CommissionerNote from "./league/commishNote1";
import Survivor from "./pages/Survivor";
import SurvivorHome from "./pages/SurvivorHome";
import Profile from "./pages/Profile";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Box } from "@mui/material";
import { LeagueOverview } from "./pages/LeagueOverview";
import RecentActivity from "./pages/RecentActivity";
import LeagueHistory from "./pages/LeagueHistory";
import LeagueRosters from "./pages/LeagueRosters";
import LeagueWeeklyRecap from "./pages/LeagueWeeklyRecap";
import LeaderboardsHome from "./components/leaderboard/LeaderboardsHome";
import Leaderboard from "./components/leaderboard/Leaderboard";
import OverallLeaderboard from "./components/leaderboard/OverallLeaderboard";
import HotDogs from "./pages/hotDogTracker/HotDogTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Snowfall from "react-snowfall";

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

  const isWinterMonth = () => {
    const month = new Date().getMonth();
    return month === 11 || month === 0;
  };

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <BackgroundWrapper $background={currentTheme.background}>
        <BrowserRouter>
          {isWinterMonth() && <Snowfall
            style={{
              position: "fixed",
              width: '100vw',
              height: '100vh',
              zIndex: 9999
            }}
          />}
          <NavBar />
          <Box sx={{ paddingTop: "64px" }}>
            <AppRoutes />
          </Box>
        </BrowserRouter>
      </BackgroundWrapper>
    </StyledThemeProvider>
  );
};

// This component will render its children (the matched route) if authenticated
const ProtectedLayout = () => {
  return <Outlet />; // This renders the matched child route
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/sleeper-login" element={<SleeperLogin />} />
      <Route path="/" element={<Navigate to="/sleeper-login" replace />} />

      {/* Protected routes */}
      <Route element={
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      }>
        <Route path="/home/:leagueId" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/submit/:leagueId" element={<Submit />} />
        <Route path="/bylaws/:leagueId" element={<Bylaws />} />
        <Route path="/newsletter/:leagueId/:issue" element={<Newsletter />} />
        <Route path="/leaderboards/:leagueId" element={<LeaderboardsHome />} />
        <Route path="/leaderboard/:leaderboardId" element={<Leaderboard />} />
        <Route path="/leaderboard/overall" element={<OverallLeaderboard />} />
        <Route path="/survivorHome/:leagueId" element={<SurvivorHome />} />
        <Route path="/survivor/:leagueId" element={<Survivor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/league/commishNote1" element={<CommissionerNote />} />
        <Route path="/league/:leagueId/league-overview" element={<LeagueOverview />} />
        <Route path="/league/:leagueId/recent-activity" element={<RecentActivity />} />
        <Route path="/league/:leagueId/league-history" element={<LeagueHistory />} />
        <Route path="/league/:leagueId/league-rosters" element={<LeagueRosters />} />
        <Route path="/league/:leagueId/weekly-recap/:week" element={<LeagueWeeklyRecap />} />
        <Route path="/league/:leagueId/hot-dogs" element={<HotDogs />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomThemeProvider>
          <ThemeWithStyledThemeProvider />
        </CustomThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
