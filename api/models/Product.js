const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: Array, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    length: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
