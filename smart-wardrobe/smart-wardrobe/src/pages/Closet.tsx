import React from "react";

const Closet: React.FC = () => {
  return (
    <div className="page-container">
      <div className="section">
        <h1>👕 Closet</h1>
        <p>Upload and organize your clothes here.</p>

        <button className="add-btn">+ Add Clothing Item</button>

        <div className="closet-items">
          <div>👔 T-Shirt</div>
          <div>👖 Jeans</div>
          <div>🧥 Jacket</div>
        </div>
      </div>
    </div>
  );
};

export default Closet;
