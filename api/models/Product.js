const mongoose = require('mongoose');
const PromoSchema = new mongoose.Schema(
	{
		code: { type: String },
		startDate: { type: Date },
		endDate: { type: Date },
	},
	{ _id: false },
);
const DiscountSchema = new mongoose.Schema(
	{
		startDate: { type: Date },
		endDate: { type: Date },
		discount: { type: Number },
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
		title_ar: { type: String, required: true },
		// desc: { type: String, required: true },
		desc: { type: String, required: false },
		desc_ar: { type: String, required: true },
		variants: { type: [ProductVariantSchema], required: true },
		categories: { type: Array },
		price: { type: Number, required: true },
		originalPrice: { type: Number },
		inStock: { type: Boolean, default: true },
		width: { type: Number, required: true },
		height: { type: Number, required: true },
		length: { type: Number, required: true },
		weight: { type: Number, required: true },
		supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAdmin' },
		promo: PromoSchema,
		discount: DiscountSchema,
	},
	{ timestamps: true },
);
// ProductSchema.pre('save', function (next) {
// 	// Assuming `this.supplier` holds the supplier's ID and you can determine the supplier's type
// 	// You might need to fetch the supplier's type from the database if it's not part of the document
// 	if (this.isModified('desc') && supplierType === 'supplierType1') {
// 		this.desc = undefined; // Remove the desc field
// 	}
// 	next();
// });
module.exports = mongoose.model('Product', ProductSchema);
