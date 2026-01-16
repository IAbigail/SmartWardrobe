import { useState } from "react";
import { useAuth } from "../Context/AuthContext"; 

export default function Register() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await signUp(email, password);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Cont creat cu succes! Te poți loga 👏");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Creează cont</h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-64">
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
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <button className="bg-green-500 p-2 rounded hover:bg-green-600">
          Creează cont
        </button>
      </form>
    </div>
  );
}
