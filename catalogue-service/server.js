const express = require("express");
const mongoose = require("mongoose");
const pinoHttp = require("pino-http");
const logger = require("./logger");

const productRoutes = require("./routes/products");
const Product = require("./models/Product");

const app = express();
app.use(express.json());

// Log all HTTP requests
app.use(pinoHttp({ logger }));

// MongoDB connection logs
mongoose.connection.on("connected", () => {
  logger.info("MongoDB connected (catalogue-service)");
});
mongoose.connection.on("error", (err) => {
  logger.error({ err }, "MongoDB connection error");
});

// Connect to DB
const mongoUrl = process.env.MONGO_URL || "mongodb://mongo:27017/cataloguedb";

mongoose.connect(mongoUrl)
  .then(() => {
    logger.info("MongoDB connection successful");
    seedDefaultProducts();
  })
  .catch((err) => logger.error({ err }, "MongoDB connection failed"));

app.use("/products", productRoutes);

// Global error handler
app.use((err, req, res, next) => {
  logger.error({ err }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`Catalogue service running on ${port}`));

async function seedDefaultProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: "Laptop", price: 1200 },
      { name: "Smartphone", price: 800 },
      { name: "Headphones", price: 150 }
    ]);
    logger.info("Default products seeded");
  }
}

