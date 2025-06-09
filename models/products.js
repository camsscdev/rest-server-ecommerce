const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  nameProduct: {
    type: String,
    required: [true, 'Nombre de producto obligatorio'],
  },
  img: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Descripción requerida'],
  },
  precio: {
    type: Number,
    required: [true],
  },
  moneda: {
    type: String,
    required: [true],
    enum: ['COP', 'USD', 'QTZ'],
  },
});

module.exports = model('product', ProductSchema);
