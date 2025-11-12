import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Closet: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // CAMERA PHOTOS STORAGE
  const CAMERA_KEY = "smartwardrobe_camera";
  // UPLOAD PHOTOS STORAGE
  const UPLOAD_KEY = "smartwardrobe_uploads";

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
        image: reader.result as string,
      };
      localStorage.setItem(key, JSON.stringify([...saved, newItem]));
      setLoading(false);
      // navigate to correct gallery after upload
      navigate(target === "camera" ? "/camera-gallery" : "/upload-gallery");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="page-container">
      <div className="section">
        <h1>👕 Closet</h1>
        <p>Capture or upload clothes and view them in separate galleries.</p>

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
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
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

        {/* Links to view galleries */}
        <div style={{ marginTop: "2rem" }}>
          <button
            className="add-btn"
            onClick={() => navigate("/camera-gallery")}
            style={{ marginRight: "1rem" }}
          >
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
