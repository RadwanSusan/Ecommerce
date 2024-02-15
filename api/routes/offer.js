const Offer = require('../models/Offer');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newOffer = new Offer(req.body);
	try {
		const savedOffer = await newOffer.save();
		res.status(200).json(savedOffer);
	} catch (err) {
		res.status(500).json(err);
	}
});

//UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		const updatedOffer = await Offer.findByIdAndUpdate(
// 			req.params.id,
// 			{
// 				$set: req.body,
// 			},
// 			{ new: true },
// 		);
// 		res.status(200).json(updatedOffer);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });
router.put('/:id', async (req, res) => {
	try {
		const updatedOffer = await Offer.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);
		res.status(200).json(updatedOffer);
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Offer.findByIdAndDelete(req.params.id);
		res.status(200).json('Offer has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
});
//GET Offer
router.get('/find/:id', async (req, res) => {
	try {
		const offer = await Offer.findById(req.params.id);
		res.status(200).json(offer);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL Offer
router.get('/', async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let offer;
		if (qNew) {
			offer = await Offer.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			offer = await Offer.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			offer = await Offer.find();
		}
		res.status(200).json(offer);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
