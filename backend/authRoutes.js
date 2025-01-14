const express = require("express");
const { body } = require("express-validator");
const { signup, login, verifyToken } = require("./authController");

const router = express.Router();

// Signup Route
router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  signup
);

// Login Route
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  login
);

// Protected Route Example
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Access granted!", user: req.user });
});

module.exports = router;

