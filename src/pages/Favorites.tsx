import React from "react";

const Favorites: React.FC = () => {
  return (
    <div className="page">
      <h1>💖 Favorites</h1>
      <p>Your saved outfits live here — revisit them anytime!</p>

      <div className="favorites-list">
        <div className="favorite-card">🌤 Sunny Day Outfit</div>
        <div className="favorite-card">🌧 Rainy Day Chic</div>
      </div>
    </div>
  );
};

export default Favorites;
