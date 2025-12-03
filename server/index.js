// server/index.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, hash]
    );

    const user = result.rows[0];
    const token = createToken(user);

    return res.json({ user, token });
  } catch (err) {
    if (err.code === "23505")
      return res.status(400).json({ error: "Email already exists" });

    console.error(err);
    return res.status(500).json({ error: "Server error" });
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

app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:" + process.env.PORT);
});
