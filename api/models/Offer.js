const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		desc: { type: String, required: true },
		img: { type: String, required: true },
		categories: { type: Array },
		size: { type: Array },
		color: { type: Array },
		price: { type: Number, required: true },
		originalPrice: { type: Number, required: true },
		inStock: { type: Boolean, default: true },
		quantity: { type: Number, required: true },
		timeLeft: { type: String },
		width: { type: Number, required: true },
		height: { type: Number, required: true },
		length: { type: Number, required: true },
		weight: { type: Number, required: true },
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Offer", OfferSchema);
