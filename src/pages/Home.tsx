import React from "react";
import { useAuth } from "../Context/AuthContext";
import wardrobeImage from "../assets/wardrobe.png";

const Home: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const rawName = currentUser?.email.split("@")[0] || "User";
  const userName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8f6f1] via-[#faf9f6] to-[#f4f1ea] p-8">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif font-extrabold text-[#3b3a36]">
          Welcome, <span className="text-[#b49a68]">{userName}</span> 👋
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#b49a68] text-white font-medium rounded-lg shadow-md hover:bg-[#a0885c] transition-all duration-300"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center w-full max-w-5xl mx-auto space-y-8">
        <div className="backdrop-blur-md bg-white/60 rounded-3xl shadow-lg p-10 border border-white/50 w-full">
          {/* Title */}
          <h2 className="text-5xl font-serif font-extrabold text-[#3b3a36] mb-4 tracking-tight">
            Best Outfits for You
          </h2>
          <p className="text-[#5e5b55] text-lg mb-8 max-w-2xl mx-auto">
            Timeless elegance meets effortless style. Explore curated wardrobe
            pieces and accessories inspired by classic luxury.
          </p>

          {/* Image Section */}
          <div className="relative flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#e4decd] max-w-2xl w-full">
              <img
                src={wardrobeImage}
                alt="Elegant wardrobe"
                className="object-contain w-full h-[320px] md:h-[400px] transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Soft gold glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#f5e7c3]/30 to-transparent rounded-2xl pointer-events-none"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto text-center text-[#7a766e] text-sm pt-8 font-light">
        © 2025 SmartWardrobe. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
