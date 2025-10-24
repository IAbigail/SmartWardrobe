import React from "react";

const Outfits: React.FC = () => {
  return (
    <div className="page-container">
      <div className="app-container">
        <div className="section">
          <h1>👗 Outfits</h1>
          <p>Discover new outfit ideas curated for you.</p>

          <div className="outfit-grid">
            <div className="outfit-card">Casual Day</div>
            <div className="outfit-card">Work Smart</div>
            <div className="outfit-card">Night Out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outfits;
