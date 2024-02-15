const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newProduct = new Product(req.body);

	try {
		const savedProduct = await newProduct.save();
		console.log(`🚀  file: product.js:19  savedProduct =>`, savedProduct);
		console.log(res.status(200).json(savedProduct));
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});
router.put('/:id', async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUp_date(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);
		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json('Product has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/find/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/', async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let products;

		if (qNew) {
			products = await Product.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			products = await Product.find();
		}

		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/search/:key/', async (req, res) => {
	const qCategory = req.query.category;
	try {
		let products;
		if (qCategory) {
			products = await Product.find({
				categories: qCategory,
				title: { $regex: req.params.key },
			});
		} else {
			products = await Product.find({
				title: { $regex: req.params.key },
			});
		}
		res.status(200).json(products);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
});
module.exports = router;
