import React from "react";
import Home from "./pages/Home";
import News from "./pages/News";
import Submit from "./pages/Submit";
import Default from "./pages/Default";
import Bylaws from './pages/Bylaws';
import Newsletter from "./pages/Newsletter";
import NavBar from "./components/NavBar";
import CommissionerNote from './league/commishNote1';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

const BackgroundWrapper = styled.div`
  background: #ECECDF;
`;

function App() {
    return (
        <BackgroundWrapper>
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="news" element={<News />} />
                        <Route path="submit" element={<Submit />} />
                        <Route path="bylaws" element={<Bylaws />} />
                        <Route path="newsletter" element={<Newsletter />} />
                        <Route path="*" element={<Default />} />
                        <Route path="league/commishNote1" element={<CommissionerNote />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </BackgroundWrapper>
    );
}

export default App;
