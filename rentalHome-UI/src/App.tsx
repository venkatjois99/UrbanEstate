import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/landingPage/landing";
import ListPage from "./components/Property/ListPage/listpage";
import About from "./components/Quick Links/About/About";
import PrivacyPolicy from "./components/Quick Links/PrivacyPolicy/Privacypolicy";
import SellPage from "./components/Sell/sellpage";
import { Provider } from "react-redux";
import myAppStore from "./store/myAppStore";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/rent" element={<ListPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/about-us" element={<About />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
      <Provider store={myAppStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/rent" element={<ListPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
