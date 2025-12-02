import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./Menu.css";

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // redirecționează spre login
  };

  return (
    <nav className="menu">
      <NavLink to="/" className="menu-item">🏠</NavLink>
      <NavLink to="/weather" className="menu-item">🌤️</NavLink>
      <NavLink to="/outfits" className="menu-item">👕</NavLink>
      <NavLink to="/closet" className="menu-item">📸</NavLink>
      <NavLink to="/favorites" className="menu-item">❤️</NavLink>

      {/* 🔥 Buton nou de logout */}
      <button onClick={handleLogout} className="menu-item logout-btn">
        🚪
      </button>
    </nav>
  );
};

export default Menu;
