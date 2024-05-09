const Order = require('../models/Order');
const Product = require('../models/Product');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('./verifyToken');
const router = require('express').Router();
router.post('/', async (req, res) => {
	const newOrder = new Order(req.body);
	try {
		const savedOrder = await newOrder.save();
		res.status(200).json(savedOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);
		res.status(200).json(updatedOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json('Order has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/find/:userId', async (req, res) => {
	try {
		const orders = await Order.find({ userId: req.params.userId });
		console.log(orders);
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/', verifyTokenAndAdmin, async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
	const supplierId = req.query.sid;
	console.log('Supplier ID:', supplierId);

	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(
		new Date().setMonth(lastMonth.getMonth() - 1),
	);
	console.log('Previous Month:', previousMonth);

	try {
		console.log('Supplier ID:', supplierId);
		console.log(
			'Product IDs:',
			await Product.find({ supplier: supplierId }).distinct('_id'),
		);

		const orders = await Order.find({
			createdAt: { $gte: previousMonth },
			...(supplierId && {
				'products._id': {
					$in: await Product.find({ supplier: supplierId }).distinct(
						'_id',
					),
				},
			}),
		});
		const allOrders = await Order.find({
			createdAt: { $gte: previousMonth },
		});
		console.log('All Orders:', allOrders);

		console.log('Matched Orders:', orders);
		const productIds = await Product.find({ supplier: supplierId }).distinct(
			'_id',
		);

		const income = await Order.aggregate([
			{
				$match: {
					createdAt: { $gte: previousMonth },
					...(supplierId && { 'products._id': { $in: productIds } }),
				},
			},
			{
				$project: {
					month: { $month: '$createdAt' },
					sales: '$amount',
					salesOrigin: '$amountOrgin',
				},
			},
			{
				$group: {
					_id: '$month',
					total: { $sum: '$sales' },
					totalOrigin: { $sum: '$salesOrigin' },
				},
			},
		]);

		console.log('Aggregated Income:', income);
		res.status(200).json(income);
	} catch (err) {
		console.error('Error fetching income:', err);
		res.status(500).json(err);
	}
});
module.exports = router;
