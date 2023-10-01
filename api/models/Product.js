const mongoose = require('mongoose');

const ProductVariantSchema = new mongoose.Schema({
	color: { type: Array, required: true },
	size: { type: Array, required: true },
	quantity: { type: Number, required: true },
	img: { type: Array, required: true },
});

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		desc: { type: String, required: true },
		variants: { type: [ProductVariantSchema], required: true },
		categories: { type: Array },
		price: { type: Number, required: true },
		originalPrice: { type: Number, required: true },
		inStock: { type: Boolean, default: true },
		width: { type: Number, required: true },
		height: { type: Number, required: true },
		length: { type: Number, required: true },
		weight: { type: Number, required: true },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Product', ProductSchema);
