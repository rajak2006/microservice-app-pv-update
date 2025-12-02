const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../logger");

const router = express.Router();

const SECRET = "MY_SECRET_KEY";

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  logger.info({ action: "register", email }, "User registering");

  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, password: hash });

    logger.info({ email }, "User registration success");
    res.json({ message: "User registered" });

  } catch (err) {
    logger.error({ err, email }, "Registration failed");

    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  logger.info({ action: "login", email }, "Login attempt");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn({ email }, "Login failed: User not found");
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      logger.warn({ email }, "Login failed: Invalid credentials");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, SECRET);

    logger.info({ email }, "Login success");
    res.json({ token });

  } catch (err) {
    logger.error({ err }, "Login error");
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/logout", (req, res) => {
  logger.info("Logout called");
  res.json({ message: "Logged out" });
});

module.exports = router;

