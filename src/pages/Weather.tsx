import React from "react";
import { useWeather } from "../Context/WeatherContext";

const Weather: React.FC = () => {
  const { weather, loading, error } = useWeather();

  if (loading)
    return (
      <div style={centerStyle}>Checking today’s weather...</div>
    );
  if (error || !weather)
    return (
      <div style={centerStyle}>Unable to load weather data ☁️</div>
    );

  const { city, temperature, condition } = weather;

  // now we use stronger but still warm palettes
  const getStyleForCondition = () => {
    if (condition.toLowerCase().includes("clear"))
      return {
        gradient: "linear-gradient(180deg, #FFE7B2 0%, #FFC88B 100%)",
        cardTint: "rgba(255, 242, 220, 0.9)",
        glow: "rgba(255, 205, 130, 0.9)",
        emoji: "☀️",
        vibe: "Golden sunlight and soft warmth in the air.",
      };
    if (condition.toLowerCase().includes("cloud"))
      return {
        gradient: "linear-gradient(180deg, #FFEAD6 0%, #FFD4B0 100%)",
        cardTint: "rgba(255, 240, 230, 0.9)",
        glow: "rgba(255, 205, 180, 0.8)",
        emoji: "⛅",
        vibe: "Gentle clouds and a calm cozy day.",
      };
    if (condition.toLowerCase().includes("rain"))
      return {
        gradient: "linear-gradient(180deg, #FFDAB6 0%, #FFBC8B 100%)",
        cardTint: "rgba(255, 232, 210, 0.9)",
        glow: "rgba(230, 170, 120, 0.9)",
        emoji: "🌧️",
        vibe: "Soft rain, warm layers, and a calm rhythm.",
      };
    if (condition.toLowerCase().includes("snow"))
      return {
        gradient: "linear-gradient(180deg, #FFF2E5 0%, #FFE1CC 100%)",
        cardTint: "rgba(255, 247, 240, 0.9)",
        glow: "rgba(255, 240, 220, 0.9)",
        emoji: "❄️",
        vibe: "Crisp winter charm — stay snug and stylish.",
      };
    return {
      gradient: "linear-gradient(180deg, #FFEEDB 0%, #FFD5AE 100%)",
      cardTint: "rgba(255, 240, 225, 0.9)",
      glow: "rgba(255, 210, 160, 0.8)",
      emoji: "🌤️",
      vibe: "Balanced weather — enjoy your day in style.",
    };
  };

  const { gradient, cardTint, glow, emoji, vibe } = getStyleForCondition();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: gradient,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        transition: "background 1s ease",
      }}
    >
      <div
        style={{
          background: cardTint,
          borderRadius: "2rem",
          boxShadow: "0 25px 40px rgba(0,0,0,0.1)",
          backdropFilter: "blur(14px)",
          padding: "3rem 2.5rem",
          maxWidth: "440px",
          width: "100%",
          textAlign: "center",
          animation: "fadeIn 0.7s ease",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "0.8rem",
            textShadow: `0 0 35px ${glow}`,
            animation: "float 3s ease-in-out infinite",
          }}
        >
          {emoji}
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.1rem",
            color: "#2a1d14",
            marginBottom: "0.6rem",
          }}
        >
          Weather
        </h1>

        <p
          style={{
            color: "#3d2f24",
            fontSize: "1.2rem",
            fontWeight: 500,
            marginBottom: "1.2rem",
          }}
        >
          {city} • {temperature}°C • {condition}
        </p>

        <p
          style={{
            fontSize: "1rem",
            color: "#5b4535",
            opacity: 0.9,
            fontStyle: "italic",
          }}
        >
          {vibe}
        </p>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

// reused style object for loading/error
const centerStyle: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#9C7A56",
  fontWeight: 500,
};

export default Weather;
