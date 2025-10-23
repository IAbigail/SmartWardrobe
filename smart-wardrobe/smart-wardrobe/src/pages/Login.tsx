import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Register from "./Register"; // 👈 import nou

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false); // 👈 stare nouă

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError("Login failed: " + err.message);
    }
  };

  if (showRegister) return <Register />; // 👈 comută pe register

  return (
    <div className="flex flex-col items-center mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="bg-blue-500 p-2 rounded hover:bg-blue-600">
          Log in
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-300">
        Nu ai cont?{" "}
        <button
          onClick={() => setShowRegister(true)}
          className="text-green-400 hover:underline"
        >
          Creează unul
        </button>
      </p>
    </div>
  );
}
