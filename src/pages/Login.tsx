import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn(email, password);

    if (result?.error) {
      setError(result.error);
    } else {
      navigate("/"); // redirect după login
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Autentificare</h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Parolă"
          className="p-2 rounded border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
        >
          Intră în cont
        </button>
      </form>

      {/* 🔽 REGISTER LINK */}
      <p className="mt-4 text-sm">
        Nu ai cont?{" "}
        <span
          className="text-orange-600 font-semibold cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Creează un cont
        </span>
      </p>
    </div>
  );
}
