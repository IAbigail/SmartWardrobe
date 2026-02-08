import React, { useEffect, useState } from "react";
import { useWeather } from "../Context/WeatherContext";

/* ---------- STORAGE KEYS ---------- */
const UPLOAD_KEY = "smartwardrobe_uploads";
const SAVED_OUTFITS_KEY = "smartwardrobe_saved_outfits";

/* ---------- TYPES ---------- */
interface OutfitSuggestion {
  title: string;
  emoji: string;
  description: string;
}
type Category =
  | "tshirt"
  | "blouse"
  | "sweater"
  | "pants"
  | "dresses"
  | "shoes"
  | "jackets"
  | "accessories";

interface ClosetItem {
  id: string;
  category: Category;
  image: string;
}


/* ---------- HELPERS ---------- */
const getOutfitId = (outfit: ClosetItem[]) =>
  outfit.map((i) => i.id).sort().join("-");

const getWeatherProfile = (weather: any) => {
  const t = weather.temperature;
  if (t <= 5) return "cold";
  if (t <= 15) return "cool";
  return "warm";
};

/* ---------- COMPONENT ---------- */
const Outfits: React.FC = () => {
  const { weather, loading, error } = useWeather();

  const [generic, setGeneric] = useState<OutfitSuggestion[]>([]);
  const [closetOutfits, setClosetOutfits] = useState<ClosetItem[][]>([]);
  const [savedOutfitIds, setSavedOutfitIds] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  /* ---------- GENERIC ---------- */
  useEffect(() => {
    setGeneric([
      {
        title: "Winter Cozy",
        emoji: "🧣",
        description: "Puffer jacket, scarf & jeans with ankle boots.",
      },
      {
        title: "Urban Chill",
        emoji: "🧥",
        description: "Wool coat over turtleneck & leather boots.",
      },
    ]);
  }, []);



  /* ---------- FAVORITE TOGGLE ---------- */
  const toggleOutfitFavorite = (outfit: ClosetItem[]) => {
    const id = getOutfitId(outfit);
  
    const stored = JSON.parse(
      localStorage.getItem(SAVED_OUTFITS_KEY) || "[]"
    );
  
    const exists = stored.find(
      (o: any) => getOutfitId(o.items) === id
    );
  
    const updated = exists
      ? stored.filter((o: any) => getOutfitId(o.items) !== id)
      : [...stored, { items: outfit }];
  
    localStorage.setItem(
      SAVED_OUTFITS_KEY,
      JSON.stringify(updated)
    );
  
    // 🔥 AICI era problema — actualizare DIRECTĂ de state
    setSavedOutfitIds(updated.map((o: any) => getOutfitId(o.items)));
  };
  

  /* ---------- BUILD OUTFITS ---------- */
  useEffect(() => {
    if (!weather) return;

    const items: ClosetItem[] = JSON.parse(
      localStorage.getItem(UPLOAD_KEY) || "[]"
    );

    const weatherType = getWeatherProfile(weather);

    const tops = items.filter((i) => {
      if (weatherType === "cold") {
        // ❄️ iarna: FĂRĂ tricou
        return i.category === "blouse" || i.category === "sweater";
      }
    
      // 🌤 restul: tricou permis
      return (
        i.category === "blouse" ||
        i.category === "tshirt" ||
        i.category === "sweater"
      );
    });
    
    

    const bottoms = items.filter(
      (i) => i.category === "pants" || i.category === "dresses"
    );

    const shoes = items.filter((i) => i.category === "shoes");


    const jackets = items.filter((i) => i.category === "jackets");
    const bags = items.filter((i) => i.category === "accessories");


    
    if (!tops.length || !bottoms.length) {
      setClosetOutfits([]);
      return;
    }

    const outfits: ClosetItem[][] = [];

    for (let i = 0; i < 6; i++) {
      const o: ClosetItem[] = [];
      o.push(tops[Math.floor(Math.random() * tops.length)]);
      o.push(bottoms[Math.floor(Math.random() * bottoms.length)]);
      if (shoes.length)
        o.push(shoes[Math.floor(Math.random() * shoes.length)]);

      // ❄️ geacă OBLIGATORIE la cold
      if (weatherType === "cold" && jackets.length)
        o.push(jackets[Math.floor(Math.random() * jackets.length)]);

      // 🌥 uneori la cool
      if (weatherType === "cool" && jackets.length && Math.random() > 0.4)
        o.push(jackets[Math.floor(Math.random() * jackets.length)]);

      if (bags.length)
        o.push(bags[Math.floor(Math.random() * bags.length)]);

      outfits.push(o);
    }

    setClosetOutfits(outfits.slice(0, 2));
  }, [weather, refreshKey]);

  if (loading || error || !weather) return null;

  /* ---------- UI ---------- */
  return (
    <div
      style={{
        minHeight: "calc(100vh - 90px)",
        paddingBottom: "90px",
        background: "linear-gradient(180deg, #fefcf9 0%, #fbe7d3 100%)",
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "2rem",
          padding: "1.2rem",
        }}
      >
        <h1 style={{ textAlign: "center" }}>👗 Outfit Suggestions</h1>

        {generic.map((g, i) => (
          <div
            key={i}
            style={{
              background: "#fdebd3",
              borderRadius: "1rem",
              padding: "0.8rem",
              marginBottom: "0.8rem",
              textAlign: "center",
            }}
          >
            <strong>{g.emoji} {g.title}</strong>
            <p style={{ margin: 0 }}>{g.description}</p>
          </div>
        ))}

        <h2 style={{ textAlign: "center", margin: "0.6rem 0" }}>
          ✨ Styled From Your Closet
        </h2>

        <button
          onClick={() => setRefreshKey(Date.now())}
          style={{
            display: "block",
            margin: "0 auto 0.4rem",
            background: "#f4c89c",
            border: "none",
            borderRadius: "0.8rem",
            padding: "0.3rem 0.8rem",
            fontSize: "0.85rem",
          }}
        >
          🔄 New outfits
        </button>

        {closetOutfits.map((outfit, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              borderRadius: "1.2rem",
              padding: "0.8rem",
              marginTop: "0.8rem",
              position: "relative",
            }}
          >
            <strong>
              {idx === 0 ? "🌟 Best Match" : "✨ Alternative"}
            </strong>

            <button
              onClick={() => toggleOutfitFavorite(outfit)}
              style={{
                position: "absolute",
                top: "8px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                zIndex: 10,

              }}
            >
              {savedOutfitIds.includes(getOutfitId(outfit)) ? "❤️" : "🤍"}
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
                gap: "0.4rem",
                marginTop: "0.4rem",
              }}
            >
              {outfit.map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
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

export default Outfits;
  