// const mongoose = require('mongoose');

// const PromoSchema = new mongoose.Schema(
// 	{
// 		code: { type: String },
// 		startDate: { type: Date },
// 		endDate: { type: Date },
// 	},
// 	{ _id: false },
// );

// const DiscountSchema = new mongoose.Schema(
// 	{
// 		startDate: { type: Date },
// 		endDate: { type: Date },
// 		discount: { type: Number },
// 	},
// 	{ _id: false },
// );

// const ProductVariantSchema = new mongoose.Schema({
// 	name: { type: String, required: true },
// 	value: { type: String, required: true },
// });

// const CategorySchema = new mongoose.Schema({
// 	name: { type: String, required: true },
// 	name_ar: { type: String, required: true },
// });

// const ProductSchema = new mongoose.Schema({
// 	type: { type: String, enum: ['simple', 'variable'], required: true },
// 	title: { type: String, required: true },
// 	title_ar: { type: String, required: true },
// 	desc: { type: String, required: false },
// 	desc_ar: { type: String, required: true },
// 	categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
// 	price: { type: Number, required: true },
// 	originalPrice: { type: Number },
// 	inStock: { type: Boolean, default: true },
// 	width: { type: Number, required: true },
// 	height: { type: Number, required: true },
// 	length: { type: Number, required: true },
// 	weight: { type: Number, required: true },
// 	variants: [ProductVariantSchema], // Assuming ProductVariantSchema is defined elsewhere
// });

// ProductSchema.pre('validate', function (next) {
// 	if (this.type === 'variable' && !this.variants) {
// 		next(new Error('Variants field is required when type is "variable"'));
// 	} else {
// 		next();
// 	}
// });

// module.exports = {
// 	Product: mongoose.model('Product', ProductSchema),
// 	Category: mongoose.model('Category', CategorySchema),
// };
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

const CategorySchema = new mongoose.Schema({
	name: { type: String, required: true },
	name_ar: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema({
	type: { type: String, enum: ['simple', 'variable'], required: true },
	title: { type: String, required: true },
	title_ar: { type: String, required: true },
	desc: { type: String, required: false },
	desc_ar: { type: String, required: true },
	categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
	price: { type: Number, required: true },
	originalPrice: { type: Number },
	inStock: { type: Boolean, default: true },
	width: { type: Number, required: true },
	height: { type: Number, required: true },
	length: { type: Number, required: true },
	weight: { type: Number, required: true },
	variants: [
		{
			key: { type: String, required: true },
			value: { type: String, required: true },
			image: { type: String },
		},
	],
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
	Category: mongoose.model('Category', CategorySchema),
};
