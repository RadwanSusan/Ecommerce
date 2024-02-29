const router = require('express').Router();
const { Stripe } = require('stripe');
const stripe = new Stripe(
	'sk_test_51MmDtYCeaBijWGLTDjlT4bMeyCb8Rxmaj5EmHBzYvjqOLnB1NIc3J7oX7kfQxa6N3jWEX2ocmJNp3kzDG3rRiVDi0005ZXc62N',
);

router.post('/payment', async (req, res) => {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: req.body.amount,
			currency: 'usd',
		});
		res.status(200).json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
