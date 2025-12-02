import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Outfits from "./pages/Outfits";
import Closet from "./pages/Closet";
import Favorites from "./pages/Favorites";
import CameraGallery from "./pages/CameraGallery";
import UploadGallery from "./pages/UploadGallery";
import "./App.css";

const App: React.FC = () => {
  const { currentUser, loading } = useAuth();

  console.log("App is rendering, currentUser:", currentUser, "loading:", loading);

  return (
    <Router>
      {/* 👇 NU RENDERUIESc NIMIC PÂNĂ NU SE ÎNCARCĂ SESIUNEA */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <h2>Loading...</h2>
        </div>
      ) : !currentUser ? (
        /* 👇 DOAR DUPĂ CE loading este false arătăm Login */
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <h1>👗 SmartWardrobe</h1>
          <Login />
        </div>
      ) : (
        <div className="app-container">
          <Menu />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/outfits" element={<Outfits />} />
            <Route path="/closet" element={<Closet />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/camera-gallery" element={<CameraGallery />} />
            <Route path="/upload-gallery" element={<UploadGallery />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default App;
