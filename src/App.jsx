import './App.css';
import Home from "./pages/Home";
import News from "./pages/News";
import Submit from "./pages/Submit";
import Default from "./pages/Default";
import Bylaws from './pages/Bylaws';
import NavBar from "./components/NavBar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

const BackgroundWrapper = styled.div`
    background: #ECECDF;
    height: 100%;
    width: 100%;
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
                        <Route path="*" element={<Default />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </BackgroundWrapper>
    );
}

export default App;
