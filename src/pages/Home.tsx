import React from "react";
import { useAuth } from "../Context/AuthContext";

const Home: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="home-container">
      {currentUser && (
        <header className="header">
          <div className="welcome">
            <h2>Welcome,</h2>
            <h3>{currentUser.email}</h3>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </header>
      )}

      <main>
        <h2>Welcome to SmartWardrobe 👋</h2>
        <p>Discover your daily outfit and stay stylish with ease!</p>
      </main>
    </div>
  );
};

export default Home;
