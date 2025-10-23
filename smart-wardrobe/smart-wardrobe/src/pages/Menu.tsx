import { NavLink } from "react-router-dom";
import "./Menu.css";

const Menu: React.FC = () => {
  return (
    <nav className="menu">
      <NavLink to="/" className="menu-item">🏠</NavLink>
      <NavLink to="/weather" className="menu-item">🌤️</NavLink>
      <NavLink to="/outfits" className="menu-item">👕</NavLink>
      <NavLink to="/closet" className="menu-item">📸</NavLink>
      <NavLink to="/favorites" className="menu-item">❤️</NavLink>
    </nav>
  );
};

export default Menu;
