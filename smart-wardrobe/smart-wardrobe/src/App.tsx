import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h1>👗 SmartWardrobe</h1>
        <Login />
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <div className="header">
          <h2>Welcome, {currentUser.email}</h2>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/closet" element={<Closet />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>

        <Menu />
      </div>
    </Router>
  );
};

export default App;
