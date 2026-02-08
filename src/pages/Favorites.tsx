import React, { useEffect, useState } from "react";

const FAVORITES_KEY = "smartwardrobe_saved_outfits";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      console.log("RAW FAVORITES:", raw);

      if (!raw) {
        setFavorites([]);
        return;
      }

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        console.warn("Favorites is not array");
        setFavorites([]);
        return;
      }

      setFavorites(parsed);
    } catch (e) {
      console.error("Favorites parse error", e);
      setFavorites([]);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fefcf9 0%, #fbe7d3 100%)",
        display: "flex",
        justifyContent: "center",
        padding: "1.6rem",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          background: "rgba(255,255,255,0.9)",
          borderRadius: "2.2rem",
          padding: "1.8rem 1.5rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>💖 Favorites</h1>

        {favorites.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            No saved outfits yet
          </p>
        )}

{favorites
  .filter((f) => f.items && f.items.length > 0)
  .map((fav, index) => (
          <div
            key={fav.outfitId || index}
            style={{
              background: "#fff",
              borderRadius: "1.5rem",
              padding: "1rem",
              marginTop: "1.2rem",
              boxShadow: "0 6px 14px rgba(0,0,0,0.07)",
            }}
          >
            <h3 style={{ textAlign: "center" }}>
              ❤️ Outfit {index + 1}
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(58px, 1fr))",
                gap: "0.5rem",
              }}
            >
              {(fav.items || []).map((item: any) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "0.65rem",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

