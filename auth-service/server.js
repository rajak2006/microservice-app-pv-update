const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pinoHttp = require("pino-http");
const logger = require("./logger");

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Log all HTTP requests
app.use(pinoHttp({ logger }));

// MongoDB connection logging
mongoose.connection.on("connected", () => {
  logger.info("MongoDB connected (auth-service)");
});
mongoose.connection.on("error", (err) => {
  logger.error({ err }, "MongoDB connection error");
});

mongoose.connect(process.env.MONGO_URI || "mongodb://mongo:27017/authdb");

app.use("/auth", authRoutes);

// Global error logging
app.use((err, req, res, next) => {
  logger.error({ err }, "Unhandled server error");
  res.status(500).json({ error: "Internal Error" });
});

app.listen(4000, () => logger.info("Auth service running on port 4000"));

