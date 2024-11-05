import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/landingPage/landing";
import ListPage from "./components/Property/PropertyList/ListPage/listpage";
import About from "./components/Quick Links/About/About";
import PrivacyPolicy from "./components/Quick Links/PrivacyPolicy/Privacypolicy";
import SellPage from "./components/Sell/sellpage";
import { Provider } from "react-redux";
import myAppStore from "./store/myAppStore";
import PropertyDetails from "./components/Property/SinglePage/propertyDetails";
import Faq from "./components/Quick Links/FAQ/faq";
import TermsAndConditions from "./components/Quick Links/T&C/terms";
import Unauthorized from "./components/errorPages/unauthorized";
import LoginExpired from "./components/errorPages/loginExpired";
import ProtectedRoute from "./utils/protectedRoute";
import 'react-toastify/dist/ReactToastify.css';

import Profile from"./components/additional-Components/Profile/profile";
import MyChats from"./components/additional-Components/ChatBox/mychats";
import DashboardLayout from "./components/Dashboard/dashboardLayout";
import RateUs from "./components/Dashboard/RateUs";
import Favorites from "./components/Dashboard/favorites";


function App() {
  return (
    <>
      <Provider store={myAppStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/rent" element={<ListPage />} />
            <Route path="/sell" element={<ProtectedRoute requiredRoles={['admin', 'owner', 'tenant']} component={<SellPage />} />} />
            <Route path="/single/:id" element={<PropertyDetails />} />
            {/* <Route path="/sell" element={<SellPage />} /> */}
            <Route path="/about-us" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/faq's" element={<Faq />} />
            <Route path="/terms-&-conditions" element={<TermsAndConditions />} />
            <Route path="/propertyDetails" element={<PropertyDetails />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/loginExpired" element={<LoginExpired />} />
           
            
           
            <Route path="/unauthorized" element={<Unauthorized/>}/>
            <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<MyChats/>} />
            <Route path="rate-us" element={<RateUs />} />
            <Route path="favorites" element={<Favorites />} />
            </Route>            
           

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
