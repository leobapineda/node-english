require("express-async-errors");
const ProductModel = require("../models/ProductModel");

const createProduct = async (req, res) => {
  const newProduct = await ProductModel.create({ ...req.body });
  res.status(201).json({ Product: newProduct, message: "Product Created" });
};

const getAllProducts = async (req, res) => {
  const newProduct = await ProductModel.find({});
  res.status(201).json({ Amount: newProduct.length, Products: newProduct });
};

const deleteAllProducts = async (req, res) => {
  await ProductModel.deleteMany();

  res.status(201).json({ msg: "ALL PRODUCTS DELETED" });
};

module.exports = { createProduct, getAllProducts, deleteAllProducts };
