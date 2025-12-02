import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Register from "./Register";

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  // LOGIN NORMAL
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError("Login failed: " + error.message);
    } else {
      navigate("/");
    }
  };

  // LOGIN GOOGLE
  const handleGoogleLogin = async () => {
    const { data, error } = await signInWithGoogle();
  
    if (error) {
      console.error(error);
      setError("Google login error: " + error.message);
    }
  };
  

  if (showRegister) return <Register />;

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

      <div className="mt-6">
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          🔐 Log in with Google
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-300">
        Don't have an account?{" "}
        <button
          onClick={() => setShowRegister(true)}
          className="text-green-400 hover:underline"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
