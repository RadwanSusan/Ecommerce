const Product = require('../models/Product');
const router = require('express').Router();
router.post('/', async (req, res) => {
	const newProduct = new Product({
		...req.body,
		supplier: req.body.supplierId,
	});
	try {
		const savedProduct = await newProduct.save();
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
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
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/:productId/variants/:variantId', async (req, res) => {
	try {
		const { productId, variantId } = req.params;
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		const variant = product.variants.find(
			(v) => v._id && v._id.toString() === variantId,
		);
		if (!variant) {
			return res.status(404).json({ message: 'Variant not found' });
		}
		res.status(200).json({ availableQuantity: variant.quantity });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
});
router.get('/adminsupplier', async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	const qSupplierId = req.query.supplierId;
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
		} else if (qSupplierId) {
			products = await Product.find({ supplier: qSupplierId });
		} else {
			products = await Product.find();
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
			products = await Product.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else if (qSupplier) {
			products = await Product.find({ supplier: qSupplier });
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

router.get('/productsFromSuppliers', async (req, res) => {
	const { supplier } = req.query;
	try {
		const products = await Product.find({ supplier });
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
