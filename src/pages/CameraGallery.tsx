import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CAMERA_KEY = "smartwardrobe_camera";

type Category = "blouse" | "pants" | "shoes" | "jackets" | "dresses" | "accessories";

const CameraGallery: React.FC = () => {
  const [photos, setPhotos] = useState<{ id: string; name: string; category: Category; image: string }[]>([]);
  const [category, setCategory] = useState<Category | "all">("all");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(CAMERA_KEY);
    if (saved) setPhotos(JSON.parse(saved));
  }, []);

  const deletePhoto = (id: string) => {
    const filtered = photos.filter((p) => p.id !== id);
    setPhotos(filtered);
    localStorage.setItem(CAMERA_KEY, JSON.stringify(filtered));
  };

  const categories: { key: Category | "all"; label: string; emoji?: string }[] = [
    { key: "all", label: "All" },
    { key: "blouse", label: "Blouses", emoji: "👚" },
    { key: "pants", label: "Pants", emoji: "👖" },
    { key: "shoes", label: "Shoes", emoji: "👟" },
    { key: "jackets", label: "Jackets", emoji: "🧥" },
    { key: "dresses", label: "Dresses", emoji: "👗" },
    { key: "accessories", label: "Accessories", emoji: "👜" },
  ];

  return (
    <div className="page-container">
      <div className="section">
        <h1>📸 Camera Photos</h1>
        <button className="add-btn mb-4" onClick={() => navigate("/closet")}>
          ← Back to Closet
        </button>

        {/* Category Selector */}
        <div style={{ margin: "1rem 0", textAlign: "center" }}>
          <label className="text-gray-700 font-medium mr-2">Select Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | "all")}
            className="add-btn px-3 py-1 text-sm rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.emoji ? `${cat.emoji} ${cat.label}` : cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Photo Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {photos
            .filter((p) => category === "all" || p.category === category)
            .map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "#ffe6cc",
                  borderRadius: "1rem",
                  padding: "0.6rem",
                  textAlign: "center",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "1rem" }}
                />
                <p style={{ fontSize: "0.9rem", margin: "0.3rem 0" }}>
                  {p.category === "blouse"
                    ? "👚 Blouse"
                    : p.category === "pants"
                    ? "👖 Pants"
                    : p.category === "shoes"
                    ? "👟 Shoes"
                    : p.category === "jackets"
                    ? "🧥 Jacket"
                    : p.category === "dresses"
                    ? "👗 Dress"
                    : "👜 Accessories"}
                </p>
                <button
                  onClick={() => deletePhoto(p.id)}
                  style={{
                    background: "#ff6b6b",
                    border: "none",
                    color: "white",
                    borderRadius: "0.6rem",
                    padding: "0.3rem 0.6rem",
                    marginTop: "0.4rem",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CameraGallery;
