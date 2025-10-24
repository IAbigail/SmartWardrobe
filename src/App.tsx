import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Outfits from "./pages/Outfits";
import Closet from "./pages/Closet";
import Favorites from "./pages/Favorites";
import "./App.css";

const App: React.FC = () => {
  const { currentUser } = useAuth();

  // 🔒 Dacă utilizatorul nu e logat → arată Login
  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h1>👗 SmartWardrobe</h1>
        <Login />
      </div>
    );
  }

  // ✅ Dacă e logat → afișează aplicația
  return (
    <Router>
      <div className="app-container">
        {/* 🧭 Meniu vizibil pe toate paginile */}
        <Menu />

        {/* 🔀 Rutele aplicației */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/closet" element={<Closet />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
