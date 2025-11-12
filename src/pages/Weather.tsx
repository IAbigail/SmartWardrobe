import React from "react";
import { useWeather } from "../Context/WeatherContext";

const Weather: React.FC = () => {
  const { weather, loading, error } = useWeather();

  if (loading)
    return <div style={centerStyle}>Checking today’s weather...</div>;
  if (error || !weather)
    return <div style={centerStyle}>Unable to load weather data ☁️</div>;

  const { city, temperature, condition } = weather;

  // ☀️ calculate sunrise/sunset dynamically for Timișoara
  const getSunTimes = (date: Date, lat: number, lon: number) => {
    const rad = Math.PI / 180;
    const dayOfYear = Math.floor(
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(date.getFullYear(), 0, 0)) /
        86400000
    );

    const gamma =
      (2 * Math.PI / 365) *
      (dayOfYear - 1 + (date.getHours() - 12) / 24);

    const eqtime =
      229.18 *
      (0.000075 +
        0.001868 * Math.cos(gamma) -
        0.032077 * Math.sin(gamma) -
        0.014615 * Math.cos(2 * gamma) -
        0.040849 * Math.sin(2 * gamma));

    const decl =
      0.006918 -
      0.399912 * Math.cos(gamma) +
      0.070257 * Math.sin(gamma) -
      0.006758 * Math.cos(2 * gamma) +
      0.000907 * Math.sin(2 * gamma) -
      0.002697 * Math.cos(3 * gamma) +
      0.00148 * Math.sin(3 * gamma);

    const ha =
      Math.acos(
        Math.cos(90.833 * rad) /
          (Math.cos(lat * rad) * Math.cos(decl)) -
          Math.tan(lat * rad) * Math.tan(decl)
      ) / rad;

    const solarNoon = (720 - 4 * lon - eqtime) / 60;
    const sunrise = solarNoon - ha * 4 / 60;
    const sunset = solarNoon + ha * 4 / 60;

    return { sunrise, sunset };
  };

  const { sunrise, sunset } = getSunTimes(new Date(), 45.7489, 21.2087);
  const now = new Date();
  const localHour = now.getUTCHours() + 2 + now.getUTCMinutes() / 60;
  const isNight = localHour >= sunset || localHour < sunrise;
  const isSunset = localHour >= sunset - 1 && localHour < sunset;

  // 🌈 styles based on weather + time
  const getStyleForCondition = () => {
    const cond = condition.toLowerCase();

    if (cond.includes("clear")) {
      if (isNight)
        return {
          gradient:
            "linear-gradient(180deg, #1a1a3a 0%, #2a2350 40%, #3b2e50 70%, #FFD5AE 100%)",
          cardTint:
            "linear-gradient(180deg, rgba(20,20,45,0.45) 0%, rgba(25,25,55,0.55) 100%)",
          glow: "rgba(255, 240, 190, 0.35)",
          emoji: "🌙",
          textColor: "#FFE9B5",
          subTextColor: "#EFDFA5",
          vibe: "A calm and clear night under the stars.",
        };
      if (isSunset)
        return {
          gradient:
            "linear-gradient(180deg, #FFD59E 0%, #FFB085 50%, #FF9C8C 100%)",
          cardTint: "rgba(255, 235, 210, 0.9)",
          glow: "rgba(255, 200, 150, 0.8)",
          emoji: "🌇",
          textColor: "#5b3922",
          subTextColor: "#71462a",
          vibe: "Golden sunset vibes — warm and peaceful.",
        };
      return {
        gradient: "linear-gradient(180deg, #FFE7B2 0%, #FFC88B 100%)",
        cardTint: "rgba(255, 242, 220, 0.9)",
        glow: "rgba(255, 205, 130, 0.9)",
        emoji: "☀️",
        textColor: "#2a1d14",
        subTextColor: "#3d2f24",
        vibe: "Golden sunlight and soft warmth in the air.",
      };
    }

    if (cond.includes("cloud")) {
      if (isNight)
        return {
          gradient:
            "linear-gradient(180deg, #2a2755 0%, #1f1b3c 70%, #FFD5AE 100%)",
          cardTint:
            "linear-gradient(180deg, rgba(30,30,60,0.5) 0%, rgba(40,40,80,0.5) 100%)",
          glow: "rgba(180, 180, 255, 0.25)",
          emoji: "☁️",
          textColor: "#E8E2FF",
          subTextColor: "#CFC7E6",
          vibe: "Quiet clouds drifting through the night sky.",
        };
      return {
        gradient: "linear-gradient(180deg, #FFEAD6 0%, #FFD4B0 100%)",
        cardTint: "rgba(255, 240, 230, 0.9)",
        glow: "rgba(255, 205, 180, 0.8)",
        emoji: "⛅",
        textColor: "#2a1d14",
        subTextColor: "#3d2f24",
        vibe: "Gentle clouds and a calm cozy day.",
      };
    }

    // fallback
    return {
      gradient:
        "linear-gradient(180deg, #1e1e3a 0%, #2b2b54 60%, #FFD5AE 100%)",
      cardTint:
        "linear-gradient(180deg, rgba(30,30,50,0.45) 0%, rgba(35,35,60,0.55) 100%)",
      glow: "rgba(255, 240, 200, 0.25)",
      emoji: "🌙",
      textColor: "#FFE9B5",
      subTextColor: "#EFDFA5",
      vibe: "A peaceful night sky — unwind and rest easy.",
    };
  };

  const { gradient, cardTint, glow, emoji, vibe, textColor, subTextColor } =
    getStyleForCondition();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: gradient,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        transition: "background 1.5s ease",
      }}
    >
      <div
        style={{
          background: cardTint,
          borderRadius: "1.8rem",
          boxShadow:
            "0 15px 35px rgba(0,0,0,0.25), inset 0 0 25px rgba(255,255,255,0.06)",
          backdropFilter: "blur(22px) saturate(160%)",
          padding: "2.2rem 2rem",
          maxWidth: "400px",
          width: "95%",
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
            color: textColor || "#2a1d14",
            marginBottom: "0.6rem",
          }}
        >
          Weather
        </h1>

        <p
          style={{
            color: subTextColor || "#3d2f24",
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
            color: subTextColor || "#5b4535",
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

const centerStyle: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#9C7A56",
  fontWeight: 500,
};

export default Weather;
