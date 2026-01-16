import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";


// 🎨 Fashion icons
import {
  GiRunningShoe,
  GiHandBag,
  GiHoodie,
  GiDress,
  GiHighHeel,
  GiWinterHat,
} from "react-icons/gi";


const Home: React.FC = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();


  const rawName = currentUser?.email ? currentUser.email.split("@")[0] : "";
  const userName = rawName ? rawName.charAt(0).toUpperCase() + rawName.slice(1) : "";
  

  const fashionIcons = [
    { icon: GiRunningShoe, label: "Shoes", color: "#c47a4a" },
    { icon: GiHandBag, label: "Bags", color: "#7c6f64" },
    { icon: GiHoodie, label: "Hoodies", color: "#b56b7a" },
    { icon: GiDress, label: "Dresses", color: "#9c7a56" },
    { icon: GiHighHeel, label: "Heels", color: "#8b5a73" },
    { icon: GiWinterHat, label: "Accessories", color: "#6f7a7a" },
  ];
  
  const decorativeIcons = [
    {
      Icon: GiRunningShoe,
      size: 72,
      color: "#c47a4a",
      top: "6%",
      left: "4%",
      rotate: -18,
      opacity: 0.22,
    },
    {
      Icon: GiHandBag,
      size: 65,
      color: "#7c6f64",
      top: "8%",
      right: "10%",
      rotate: 16,
      opacity: 0.14,
    },
    {
      Icon: GiHandBag,
      size: 45,
      color: "#7c6f64",
      top: "62%",
      right: "55%",
      rotate: -7,
      opacity: 0.20,
    },
    {
      Icon: GiHoodie,
      size: 56,
      color: "#d7a2ad",
      top: "29%",
      left: "13%",
      rotate: -7,
      opacity: 0.30,
    },
    {
      Icon: GiHoodie,
      size: 46,
      color: "#d7a2ad",
      top: "50%",
      left: "58%",
      rotate: 7,
      opacity: 0.20,
    },
    {
      Icon: GiDress,
      size: 75,
      color: "#9c7a56",
      bottom: "25%",
      left: "5%",
      rotate: -6,
      opacity: 0.20,
    },
    {
      Icon: GiRunningShoe, // same icon, different color & position
      size: 40,
      color: "#e0a87a",
      bottom: "14%",
      left: "30%",
      rotate: 8,
      opacity: 0.20,
    },
    {
      Icon: GiDress,
      size: 60,
      color: "#9c7a56",
      top: "40%",
      right: "8%",
      rotate: 10,
      opacity: 0.20,
    },
    {
      Icon: GiHighHeel,
      size: 44,
      color: "#8b5a73",
      bottom: "25%",
      right: "20%",
      rotate: -10,
      opacity: 0.22,
    },
    {
      Icon: GiWinterHat,
      size: 42,
      color: "#6f7a7a",
      bottom: "8%",
      right: "12%",
      rotate: 14,
      opacity: 0.18,
    },
    {
      Icon: GiWinterHat,
      size: 32,
      color: "#6f7a7a",
      top: "44%",
      left: "28%",
      rotate: -8,
      opacity: 0.10,
    },
  ];
  

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#f7d1b5] via-[#e5b28a] to-[#d59468] overflow-hidden pt-24">
     {/* Welcome */}
{currentUser?.email && (
  <div className="text-center mb-10 z-10">
    <p className="text-stone-700 text-sm mb-2">
      Welcome, <span className="font-semibold">{userName}</span>
    </p>
  </div>
)}


    {/* 👗 Decorative fashion icons */}
<div className="absolute inset-0 pointer-events-none">
  {decorativeIcons.map((item, index) => {
    const Icon = item.Icon;
    return (
      <Icon
        key={index}
        size={item.size}
        style={{
          position: "absolute",
          top: item.top,
          bottom: item.bottom,
          left: item.left,
          right: item.right,
          color: item.color,
          opacity: item.opacity,
          transform: `rotate(${item.rotate}deg)`,
        }}
      />
    );
  })}
</div>


      {/* Hero */}
      <div className="relative w-[340px] sm:w-[400px] md:w-[440px] flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg text-center mb-4">
          Best Outfit
        </h1>

        <p className="text-white/90 text-center text-base mb-8">
          ✨ Get your look — fast, fashionable & effortless ✨
        </p>

        <button
        onClick={() => navigate("/outfits")}
        className="w-full max-w-xs bg-[#e3a172] text-white py-3 rounded-full font-semibold text-sm shadow hover:bg-[#d38b59] transition"
      >
        Get Started
      </button>

      </div>
    </div>
  );
};

export default Home;
