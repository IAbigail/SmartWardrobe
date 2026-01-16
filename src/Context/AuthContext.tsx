import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: any }>;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = " "; // backend server

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Check if we have a valid JWT token on startup
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    // Validate token with backend
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
        } else {
          localStorage.removeItem("authToken");
          setCurrentUser(null);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("authToken");
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // REGISTER USER
  const signUp = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.error };
      }

      localStorage.setItem("authToken", data.token);
      setCurrentUser(data.user);

      return {};
    } catch (err) {
      console.error(err);
      return { error: "Network error" };
    }
  };

  // LOGIN USER
  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.error };
      }

      localStorage.setItem("authToken", data.token);
      setCurrentUser(data.user);

      return {};
    } catch (err) {
      console.error(err);
      return { error: "Network error" };
    }
  };

  // LOGOUT
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
