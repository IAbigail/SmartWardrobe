import React, { useEffect, useState } from "react";
import { useWeather } from "../Context/WeatherContext";

interface OutfitSuggestion {
  title: string;
  emoji: string;
  description: string;
}

const Outfits: React.FC = () => {
  const { weather, loading, error } = useWeather();
  const [outfits, setOutfits] = useState<OutfitSuggestion[]>([]);

  useEffect(() => {
    if (!weather) return;

    const t = weather.temperature;
    const suggestions: OutfitSuggestion[] = [];

    if (t <= -5) {
      suggestions.push(
        { title: "Arctic Explorer", emoji: "🧊", description: "Heavy parka, insulated boots, gloves & wool hat." },
        { title: "Snow Day", emoji: "❄️", description: "Layered hoodie, snow pants & thermal undershirt." }
      );
    } else if (t <= 5) {
      suggestions.push(
        { title: "Winter Cozy", emoji: "🧣", description: "Puffer jacket, scarf & jeans with ankle boots." },
        { title: "Urban Chill", emoji: "🧥", description: "Wool coat over turtleneck & leather boots." }
      );
    } else if (t <= 10) {
      suggestions.push(
        { title: "Crisp Casual", emoji: "🍂", description: "Jacket, sweater & jeans for crisp mornings." },
        { title: "Autumn Vibe", emoji: "👖", description: "Cardigan & trousers with warm layers." }
      );
    } else if (t <= 20) {
      suggestions.push(
        { title: "Spring Layers", emoji: "🌸", description: "Light denim jacket, tee & chinos." },
        { title: "Weekend Stroll", emoji: "👟", description: "Cotton top & rolled-up jeans." }
      );
    } else {
      suggestions.push(
        { title: "Summer Ease", emoji: "☀️", description: "Linen shirt & shorts for sunshine days." },
        { title: "Beach Mood", emoji: "🏖️", description: "Tank, slides & sun hat for hot weather." }
      );
    }

    setOutfits(suggestions);
  }, [weather]);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "3rem", fontSize: "1.1rem", color: "#777" }}>
        Loading outfit inspiration...
      </div>
    );

  if (error || !weather)
    return (
      <div style={{ textAlign: "center", marginTop: "3rem", color: "#777" }}>
        Unable to fetch outfit suggestions ☁️
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fefcf9 0%, #fbe7d3 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          background: "rgba(255,255,255,0.8)",
          borderRadius: "2rem",
          padding: "2.5rem 2rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          backdropFilter: "blur(8px)",
          textAlign: "center",
          animation: "fadeIn 0.7s ease",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>👗</div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.9rem",
            marginBottom: "0.4rem",
            color: "#1a1a1a",
          }}
        >
          Outfit Suggestions
              </h1>
              <p
        style={{
          color: "#777",
          fontSize: "1rem",
          marginBottom: "2rem",
        }}
      >
        Tailored for today’s weather in{" "}
        <b style={{ color: "#333" }}>{weather.city}</b>.
      </p>


        <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
          {outfits.map((fit, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.85)",
                borderRadius: "1.2rem",
                padding: "1.5rem",
                boxShadow: "0 6px 15px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.06)";
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  marginBottom: "0.6rem",
                  color: "#222",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>{fit.emoji}</span> {fit.title}
              </h3>
              <p
                style={{
                  color: "#555",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  maxWidth: "90%",
                  margin: "0 auto",
                }}
              >
                {fit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Outfits;
