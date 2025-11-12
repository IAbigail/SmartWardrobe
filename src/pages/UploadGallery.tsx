import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UPLOAD_KEY = "smartwardrobe_uploads";

const UploadGallery: React.FC = () => {
  const [photos, setPhotos] = useState<{ id: string; name: string; category: string; image: string }[]>([]);
  const [filter, setFilter] = useState<"blouse" | "pants" | "shoes" | "all">("all");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(UPLOAD_KEY);
    if (saved) setPhotos(JSON.parse(saved));
  }, []);

  const deletePhoto = (id: string) => {
    const filtered = photos.filter((p) => p.id !== id);
    setPhotos(filtered);
    localStorage.setItem(UPLOAD_KEY, JSON.stringify(filtered));
  };

  return (
    <div className="page-container">
      <div className="section">
        <h1>🖼️ Uploaded Pictures</h1>
        <button className="add-btn" onClick={() => navigate("/closet")}>
          ← Back to Closet
        </button>

        {/* Category Filters */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          {["all", "blouse", "pants", "shoes"].map((cat) => (
            <button key={cat} className="add-btn px-3 py-1 text-sm" onClick={() => setFilter(cat as any)}>
              {cat === "blouse" ? "👚 Blouses" : cat === "pants" ? "👖 Pants" : cat === "shoes" ? "👟 Shoes" : "All"}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {photos
            .filter((p) => filter === "all" || p.category === filter)
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
                  {p.category === "blouse" ? "👚 Blouse" : p.category === "pants" ? "👖 Pants" : "👟 Shoes"}
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

export default UploadGallery;
