const express = require("express");
const router = new express.Router();
const Product = require("../models/productsModel");

router.get("/", async (req, res, next) => {
  try {
    let products = await Product.getAll();
    return res.json(products);
  } catch (err) {
    return next(err);
  }
});

router.get("/:type", async (req, res, next) => {
  try {
    const { type } = req.params;
    let products = await Product.getAllType(type);
    return res.json(products);
  } catch (err) {
    return next(err);
  }
});

router.get("/id/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let product = await Product.getProduct(id);
    return res.json(product);
  } catch (err) {
    return next(err);
  }
});

// TODO: Add product if ADMIN

// TODO: Remove product if ADMIN

// TODO: Edit Product if ADMIN

module.exports = router;
