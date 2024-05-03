const Review = require('../models/Review');
const router = require('express').Router();

router.get('/:productId', async (req, res) => {
	try {
		const reviews = await Review.find({ productId: req.params.productId });
		res.json(reviews);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
