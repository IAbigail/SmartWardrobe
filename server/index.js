// server/index.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost"],
    credentials: true
  }));
  
// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query("SELECT 1")
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection failed:", err));


// Create JWT token
function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Auth middleware
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// REGISTER
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN ATTEMPT:", email);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    if (!user.password_hash) {
      console.error("❌ password_hash missing in DB row");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = createToken(user);

    return res.json({
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rowCount === 0)
    return res.status(400).json({ error: "Invalid email or password" });

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);

  if (!match)
    return res.status(400).json({ error: "Invalid email or password" });

  const token = createToken(user);

  return res.json({ user: { id: user.id, email: user.email }, token });
});

// GET CURRENT USER
app.get("/api/me", requireAuth, (req, res) => {
  return res.json({ user: { id: req.user.id, email: req.user.email } });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

