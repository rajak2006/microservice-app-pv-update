const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const SECRET = "MY_SECRET_KEY";

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    res.json({ message: "User registered" });
  } catch (err) {
    console.error("Registration error:", err.message);
    if (err.code === 11000) {
      // Duplicate email
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out" });
});

module.exports = router;
