const User = require('../models/User');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();
//CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newUser = new User(req.body);

	try {
		const savedUser = await newUser.save();
		res.status(200).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
	if (req.body.password) {
		req.body.password = CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC,
		).toString();
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);
		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json('User has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL USER
router.get('/', verifyTokenAndAdmin, async (req, res) => {
	const query = req.query.new;
	try {
		const users = query
			? await User.find().sort({ _id: -1 }).limit(5)
			: await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET USER STATS

router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	try {
		const data = await User.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					month: { $month: '$createdAt' },
				},
			},
			{
				$group: {
					_id: '$month',
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/statsDay', verifyTokenAndAdmin, async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	try {
		const data = await User.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					day: { $dayOfMonth: '$createdAt' },
				},
			},
			{
				$group: {
					_id: '$day',
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/wishlist/:userId', async (req, res) => {
	const { userId } = req.params;
	const productId = req.query.pid;
	try {
		const user = await User.findById(userId);
		const { wish } = user._doc;
		const alreadyAdded = wish.find((id) => id.toString() === productId);
		if (alreadyAdded) {
			let user = await User.findByIdAndUpdate(
				userId,
				{
					$pull: { wish: productId },
				},
				{
					new: true,
				},
			);
			res.json(user);
		} else {
			let user = await User.findByIdAndUpdate(
				userId,
				{
					$push: { wish: productId },
				},
				{
					new: true,
				},
			);
			res.json(user);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
// Use .lean() when querying the User collection to retrieve plain
// JavaScript objects instead of Mongoose documents.
// This can improve the performance of your queries.
router.get('/userWishListArray/:userId', async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(userId).lean();
		const { wish } = user;
		if (wish) {
			res.json(wish);
		} else res.json([]);
	} catch (err) {
		res.send('err');
	}
});

// Find user by email
router.get('/findByEmail', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.query.email });
		if (user) {
			const { password, ...otherDetails } = user._doc;
			res.status(200).json(otherDetails);
		} else {
			res.status(404).json('User not found');
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
