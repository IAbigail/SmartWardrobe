import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";

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

  console.log("App render → currentUser:", currentUser, "loading:", loading);

  return (
    <Router>
      {loading ? (
        // ⏳ LOADING
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <h2>Loading...</h2>
        </div>
      ) : !currentUser ? (
        // 🔒 NOT LOGGED IN → ALWAYS LOGIN / REGISTER
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <h1>👗 SmartWardrobe</h1>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      ) : (
        // 🔓 LOGGED IN → APP
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
