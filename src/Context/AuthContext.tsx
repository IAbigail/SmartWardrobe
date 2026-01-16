import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔴 APEL DIRECT CĂTRE BACKEND (FĂRĂ PROXY)
const API_URL = "http://localhost:4000";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      setLoading(false);
      return;
    }
  
    // optionally decode token later
    setCurrentUser({ id: 0, email: "loading@user" });
    setLoading(false);
  }, []);
  

  // ✅ REGISTER
  const signUp = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data?.error || "Register failed" };
      }

      localStorage.setItem("authToken", data.token);
      setCurrentUser(data.user);

      return {};
    } catch (err) {
      console.error(err);
      return { error: "Network error" };
    }
  };

  // ✅ LOGIN
  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data?.error || "Login failed" };
      }

      localStorage.setItem("authToken", data.token);
      setCurrentUser(data.user);

      return {};
    } catch (err) {
      console.error(err);
      return { error: "Network error" };
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        signUp,
        signIn,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
