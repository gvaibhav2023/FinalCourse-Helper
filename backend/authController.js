const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const pool = require("./db/connection");

// Signup Controller
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully!",
      userId: result.rows[0].id,
    });
  } catch (error) {
    if (error.code === "23505") {
      // Handle unique constraint violation for duplicate usernames
      return res.status(400).json({ message: "Username already exists." });
    }
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Login Controller
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = result.rows[0];

        if (!user) {
            res.setHeader("Content-Type", "application/json");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.setHeader("Content-Type", "application/json");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY }
        );

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
};

  

// Middleware to Verify Token
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
