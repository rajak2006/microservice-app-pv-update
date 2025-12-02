const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const productRoutes = require("./routes/products");

const app = express();
app.use(express.json());

// Connect to MongoDB (using environment variable for DB URL)
const mongoUrl = process.env.MONGO_URL || "mongodb://mongo:27017/cataloguedb";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  seedDefaultProducts(); // seed products only if collection is empty
}).catch(err => console.error("MongoDB connection error:", err));

app.use("/products", productRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Catalogue service running on port ${port}`));

// Seed default products if none exist
async function seedDefaultProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    const defaultProducts = [
      { name: "Laptop", price: 1200 },
      { name: "Smartphone", price: 800 },
      { name: "Headphones", price: 150 },
    ];
    await Product.insertMany(defaultProducts);
    console.log("Default products seeded");
  }
}
