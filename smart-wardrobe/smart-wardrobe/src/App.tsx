import { useAuth } from "./Context/AuthContext";
import Login from "./pages/Login";

function App() {
  const { currentUser, logout } = useAuth();

  return (
    <div style={{ color: "white", textAlign: "center", marginTop: "4rem" }}>
      <h1>🔥 SmartWardrobe Login</h1>
      {currentUser ? (
        <>
          <p>Bun venit, {currentUser.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
