const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema(
	{
		code: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
	},
	{ _id: false },
); // _id is not needed for this sub-document

const DiscountSchema = new mongoose.Schema(
	{
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		discount: { type: Number, required: true },
	},
	{ _id: false },
);

const ProductVariantSchema = new mongoose.Schema({
	color: { type: Array, required: true },
	size: { type: Array, required: true },
	quantity: { type: Number, required: true },
	img: { type: Array, required: true },
});

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		title_ar: { type: String, required: true }, // Arabic title
		desc: { type: String, required: true },
		desc_ar: { type: String, required: true }, // Arabic description
		variants: { type: [ProductVariantSchema], required: true },
		categories: { type: Array },
		price: { type: Number, required: true },
		originalPrice: { type: Number, required: true },
		inStock: { type: Boolean, default: true },
		width: { type: Number, required: true },
		height: { type: Number, required: true },
		length: { type: Number, required: true },
		weight: { type: Number, required: true },
		promo: PromoSchema, // new field for the promo code
		discount: DiscountSchema,
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Product', ProductSchema);
