import React from "react";
import { useAuth } from "../Context/AuthContext";

// 🖼️ Import outfit images
import outfit1 from "../assets/Screenshot_2025_11_12_17_58_58.png";
import outfit2 from "../assets/Screenshot_2025_11_12_17_59_09.png";
import outfit3 from "../assets/Screenshot_2025_11_12_17_59_38.png";
import outfit4 from "../assets/Screenshot_2025_11_12_18_00_01.png";
import outfit5 from "../assets/Screenshot_2025_11_12_18_00_09.png";
import outfit6 from "../assets/Screenshot_2025_11_12_18_00_17.png";
import outfit7 from "../assets/Screenshot_2025_11_12_18_00_40.png";
import outfit8 from "../assets/Screenshot_2025_11_12_18_00_59.png";
import outfit9 from "../assets/Screenshot_2025_11_12_18_01_18.png";

const Home: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const rawName = currentUser?.email.split("@")[0] || "User";
  const userName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const images = [
    outfit1,
    outfit2,
    outfit3,
    outfit4,
    outfit5,
    outfit6,
    outfit7,
    outfit8,
    outfit9,
  ];

  // Shuffle the images so they’re not sequential (1,2,3,...)
  const shuffledImages = React.useMemo(() => {
    return [...images].sort(() => Math.random() - 0.5);
  }, []);

  // Floating style helper
  const floatStyle = (delay: string, duration: string) => ({
    animationDelay: delay,
    animationDuration: duration,
  });

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f7d1b5] via-[#e5b28a] to-[#d59468] overflow-hidden">
      {/* 🌸 Floating outfit images */}
      <div className="absolute inset-0 overflow-hidden">
        {shuffledImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`outfit ${index + 1}`}
            className="absolute rounded-xl object-cover shadow-md animate-float"
            style={{
              width: `${60 + Math.random() * 40}px`,
              height: `${60 + Math.random() * 40}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
              filter: `blur(${Math.random() * 0.6}px)`,
              opacity: `${0.75 + Math.random() * 0.25}`,
              ...floatStyle(`${index * 0.8}s`, `${8 + Math.random() * 4}s`),
            }}
          />
        ))}
      </div>

      {/* Welcome + Logout */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-20">
        <p className="text-stone-700 text-sm mb-2">
          Welcome, <span className="font-semibold">{userName}</span>
        </p>
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-full bg-[#d67a47] text-white text-sm font-medium shadow-md hover:bg-[#c46c3f] transition"
        >
          Logout
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative w-[340px] sm:w-[400px] md:w-[440px] flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg text-center mb-4">
          Best Outfit<br />  
        </h1>
        <p className="text-white/90 text-center text-base mb-8">
        ✨ Get your look — fast, fashionable & effortless ✨
        </p>
        <button className="w-full max-w-xs bg-[#e3a172] text-white py-3 rounded-full font-semibold text-sm shadow hover:bg-[#d38b59] transition">
          Get Started
        </button>
      </div>

    

      {/* Floating animation keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
          }
          .animate-float {
            animation-name: float;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
