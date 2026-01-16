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

    if (result.error) {
      setError(result.error);
    } else {
      navigate("/"); // redirect după login
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Autentificare</h2>

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
          placeholder="Parolă"
          className="p-2 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button className="bg-blue-500 p-2 rounded hover:bg-blue-600">
          Intră în cont
        </button>
      </form>
    </div>
  );
}
