import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CAMERA_KEY = "smartwardrobe_camera";
const UPLOAD_KEY = "smartwardrobe_uploads";

const Closet: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<"blouse" | "pants" | "shoes">("blouse");
  const navigate = useNavigate();

  const handleAddItem = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "camera" | "upload"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = () => {
      const key = target === "camera" ? CAMERA_KEY : UPLOAD_KEY;
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      const newItem = {
        id: crypto.randomUUID(),
        name: file.name || "Photo",
        category,
        image: reader.result as string,
      };
      localStorage.setItem(key, JSON.stringify([...saved, newItem]));
      setLoading(false);
      navigate(target === "camera" ? "/camera-gallery" : "/upload-gallery");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="page-container">
      <div className="section">
        <h1>👕 Closet</h1>
        <p>Capture or upload clothes and assign them to categories.</p>

        {/* Category Selector */}
        <div style={{ margin: "1rem 0" }}>
          <label className="text-gray-700 font-medium mr-2">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as "blouse" | "pants" | "shoes")}
            className="add-btn px-3 py-1 text-sm"
          >
            <option value="blouse">👚 Blouse</option>
            <option value="pants">👖 Pants</option>
            <option value="shoes">👟 Shoes</option>
          </select>
        </div>

        {/* Hidden inputs */}
        <input
          id="cameraInput"
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={(e) => handleAddItem(e, "camera")}
        />

        <input
          id="uploadInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleAddItem(e, "upload")}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
          <button
            className="add-btn"
            onClick={() => document.getElementById("cameraInput")?.click()}
            disabled={loading}
          >
            {loading ? "Saving..." : "📸 Take Photo"}
          </button>

          <button
            className="add-btn"
            onClick={() => document.getElementById("uploadInput")?.click()}
            disabled={loading}
          >
            {loading ? "Saving..." : "🖼️ Upload Picture"}
          </button>
        </div>

        {/* Gallery Navigation */}
        <div style={{ marginTop: "2rem" }}>
          <button className="add-btn" onClick={() => navigate("/camera-gallery")} style={{ marginRight: "1rem" }}>
            📷 View Taken Photos
          </button>
          <button className="add-btn" onClick={() => navigate("/upload-gallery")}>
            🖼️ View Uploaded Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Closet;
