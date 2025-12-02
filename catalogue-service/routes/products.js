const express = require("express");
const Product = require("../models/Product");
const logger = require("../logger");

const router = express.Router();

// List all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  logger.info({ count: products.length }, "Fetched product list");
  res.json(products);
});

// Add a new product
router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;

    logger.info({ name, price }, "Creating new product");

    const product = new Product({ name, price });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    logger.error({ err }, "Product creation failed");
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      logger.warn({ id: req.params.id }, "Product not found");
      return res.status(404).json({ error: "Product not found" });
    }

    logger.info({ id: req.params.id }, "Product updated");
    res.json(updated);

  } catch (err) {
    logger.error({ err }, "Product update failed");
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      logger.warn({ id: req.params.id }, "Product not found for delete");
      return res.status(404).json({ error: "Product not found" });
    }

    logger.info({ id: req.params.id }, "Product deleted");
    res.json({ message: "Product deleted" });

  } catch (err) {
    logger.error({ err }, "Delete failed");
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;

