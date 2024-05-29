const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
	type: { type: String, enum: ['simple', 'variable'], required: true },
	title: { type: String, required: true },
	title_ar: { type: String, required: true },
	desc: { type: String, required: false },
	desc_ar: { type: String, required: true },
	categories: [
		{
			name: { type: String, required: true },
			name_ar: { type: String, required: true },
		},
	],
	inStock: { type: Boolean, default: true },
	width: { type: Number, required: true },
	height: { type: Number, required: true },
	length: { type: Number, required: true },
	weight: { type: Number, required: true },
	price: { type: Number },
	originalPrice: { type: Number },
	images: [{ type: String }],
	variants: [
		{
			key: { type: String },
			value: { type: String },
			images: [{ type: String }],
			price: { type: Number },
			originalPrice: { type: Number },
		},
	],
	supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAdmin' },
});
ProductSchema.pre('validate', function (next) {
	if (
		this.type === 'variable' &&
		(!this.variants || this.variants.length === 0)
	) {
		next(new Error('Variants field is required when type is "variable"'));
	} else {
		next();
	}
});
module.exports = {
	Product: mongoose.model('Product', ProductSchema),
};
