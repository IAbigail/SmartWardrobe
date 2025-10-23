import React from "react";

const Closet: React.FC = () => {
  return (
    <div className="page">
      <h1>👚 Closet</h1>
      <p>Upload and organize your clothes here.</p>

      <button className="upload-btn">+ Add Clothing Item</button>

      <div className="closet-grid">
        <div className="clothing-item">👕 T-Shirt</div>
        <div className="clothing-item">👖 Jeans</div>
        <div className="clothing-item">🧥 Jacket</div>
      </div>
    </div>
  );
};

export default Closet;
