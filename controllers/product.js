const { response } = require('express');

const Product = require('../models/products');

const productGet = async (req, res = response) => {
  const { limit = 5, desde = 0 } = req.query;

  const products = await Product.find()
    .skip(Number(desde))
    .limit(Number(limit));

  res.json({ products });
};

const productPost = async (req, res = response) => {
  const { nameProduct, img, description, precio, moneda } = req.body;

  const product = new Product({
    nameProduct,
    img,
    description,
    precio,
    moneda,
  });

  await product.save();

  res.status(200).json({
    msg: 'Creado correctamente ',
  });
};

module.exports = {
  productGet,
  productPost,
};
