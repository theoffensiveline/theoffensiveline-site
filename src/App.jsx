import './App.css';
import Home from "./pages/Home";
import News from "./pages/News";
import Submit from "./pages/Submit";
import Default from "./pages/Default";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="news" element={<News />} />
                <Route path="submit" element={<Submit />} />
                <Route path="*" element={<Default />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
