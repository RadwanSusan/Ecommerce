const { Product, Category } = require('../models/Product');
const router = require('express').Router();

router.post('/', async (req, res) => {
	const newProduct = new Product({
		...req.body,
		supplier: req.body.supplierId,
	});

	try {
		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
	} catch (err) {
		res.status(500).json(err);
		console.error(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
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

router.delete('/:id', async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json('Product has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/find/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id).populate(
			'categories',
		);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/adminsupplier', async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	const qSupplierId = req.query.supplierId;

	try {
		let products;

		if (qNew) {
			products = await Product.find()
				.sort({ createdAt: -1 })
				.limit(1)
				.populate('categories');
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			}).populate('categories');
		} else if (qSupplierId) {
			products = await Product.find({ supplier: qSupplierId }).populate(
				'categories',
			);
		} else {
			products = await Product.find().populate('categories');
		}

		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/', async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	const qSupplier = req.query.supplier;

	try {
		let products;

		if (qNew) {
			products = await Product.find()
				.sort({ createdAt: -1 })
				.limit(1)
				.populate('categories');
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			}).populate('categories');
		} else if (qSupplier) {
			products = await Product.find({ supplier: qSupplier }).populate(
				'categories',
			);
		} else {
			products = await Product.find().populate('categories');
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
			}).populate('categories');
		} else {
			products = await Product.find({
				title: { $regex: req.params.key },
			}).populate('categories');
		}

		res.status(200).json(products);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
});

router.get('/productsFromSuppliers', async (req, res) => {
	const { supplier } = req.query;

	try {
		const products = await Product.find({ supplier }).populate('categories');

		if (products.length === 0) {
			return res
				.status(404)
				.json({ message: 'No products found for the specified supplier' });
		}

		res.status(200).json(products);
	} catch (error) {
		console.error('Error fetching products by supplier:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = router;
