const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db/connection");

const router = express.Router();
const JWT_SECRET = "your_jwt_secret"; // Replace with a secure secret in production

// Sign-Up Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
    res.status(201).send("User created");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Server Error");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Server Error");
  }
});

// Protected Route (Example)
router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const result = await pool.query("SELECT username FROM users WHERE id = $1", [payload.userId]);
    const user = result.rows[0];
    res.json(user);
  } catch (err) {
    console.error("Invalid token:", err);
    res.status(401).send("Unauthorized");
  }
});

module.exports = router;
