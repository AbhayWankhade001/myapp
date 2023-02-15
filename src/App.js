import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Component/slider";
import About from "./Pages/About";
import ErrorPage from "./Pages/ErrorPage";

import ImageSelector from "./Component/ImageSelector";
import SlidesA from "./Pages/Slides";
import MainoPage from "./Pages/MainoPage";
import OtpVerification from "./Component/OtpVerification";
import NavBar from "./Component/NavBar";
import picSele from "./Pages/OtpSec"
function App() {
  
 
 
  return (
    <Router>

      {/* <nav>
    
        <Link to="/about"> About </Link>
        <Link to="/ChaRoom"> Profile </Link>
        <Link to="/profile-selection">otpAp</Link>
        <Link to="/Slides">bjkdkvshjc</Link>
        <Link to="/ChatRoom">sahhjzhsvdhj</Link>
        <Link to="/OtpSec">kjrdhoghseiudk</Link>
        <Link to="/ChatRoom">015236435</Link>
        <Link to="/VerifyOTP">AAAAAAAAAAA</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile-selection" element={<ImageSelector />} />
        <Route path="/Slides" element={<SlidesA />} />
        <Route path="/ImageSelector" element={<ImageSelector />} />
        <Route path="/MainoPage" element={<MainoPage />} />

        <Route path="/VerifyOTP" element={<OtpVerification />} />
        <Route path="*" element={<ErrorPage />} />
     </Routes> 


    </Router>
  );
}

export default App;