import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider as CustomThemeProvider, useTheme } from './ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ColorConstants } from './components/constants/ColorConstants';
import NavBar from "./components/NavBar";
import SleeperLogin from "./pages/SleeperLogin";
import Home from "./pages/Home";
import News from "./pages/News";
import Submit from "./pages/Submit";
import Default from "./pages/Default";
import Bylaws from './pages/Bylaws';
import Newsletter from "./pages/Newsletter";
import ComingSoon from "./pages/ComingSoon";
import CommissionerNote from './league/commishNote1';
import Eaterboard from "./pages/Eaterboard";
import Survivor from "./pages/Survivor";
import WalterPicks from "./pages/WalterPicks";
import NewsletterWalter from "./pages/NewsletterWalterPicks";
import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
  background: ${({ background }) => background};
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
            <BackgroundWrapper background={currentTheme.background}>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<SleeperLogin />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/walterPicks" element={<WalterPicks />} />
                        <Route path="/newsletterWalterPicks" element={<NewsletterWalter />} />
                        <Route path="/coming-soon" element={<ComingSoon />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/submit" element={<Submit />} />
                        <Route path="/bylaws" element={<Bylaws />} />
                        <Route path="/newsletter" element={<Newsletter />} />
                        <Route path="/leaderboard" element={<Eaterboard />} />
                        <Route path="/survivor" element={<Survivor />} />
                        <Route path="*" element={<Default />} />
                        <Route path="/league/commishNote1" element={<CommissionerNote />} />
                    </Routes>
                </BrowserRouter>
            </BackgroundWrapper>
        </StyledThemeProvider>
    );
}

const App = () => (
    <CustomThemeProvider>
        <ThemeWithStyledThemeProvider />
    </CustomThemeProvider>
);

export default App;
