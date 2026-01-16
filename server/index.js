// server/index.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .query("SELECT 1")
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database error", err));

// JWT helper
function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ======================
// REGISTER
// ======================
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email`,
      [email, hashedPassword]
    );

    const user = result.rows[0];
    const token = createToken(user);

    res.json({ user, token });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    if (err.code === "23505") {
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(500).json({ error: "Server error" });
  }
});

// ======================
// LOGIN
// ======================
app.post("/api/login", async (req, res) => {
  try {
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

    res.json({
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
