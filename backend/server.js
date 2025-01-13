const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth"); // Import authentication routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes); // Add authentication routes

// Default Route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the Course Helper API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
