import React from "react";

const Weather: React.FC = () => {
  return (
    <div className="page">
      <h1>🌤 Weather</h1>
      <p>Check today’s weather and get outfit recommendations!</p>

      <div className="weather-card">
        <h2>25°C · Sunny</h2>
        <p>It’s a great day for light casual wear ☀️</p>
      </div>
    </div>
  );
};

export default Weather;
