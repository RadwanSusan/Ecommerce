const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const OfferRoute = require('./routes/offer');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const reviewRoute = require('./routes/review');
const cors = require('cors');
const app = express();
dotenv.config();
app.use((req, res, next) => {
	const start = Date.now();
	res.on('finish', () => {
		const duration = Date.now() - start;
		console.log(
			`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`,
		);
	});
	next();
});
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('DB Connection Successful!'))
	.catch((err) => {
		console.log(err);
	});
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/offer', OfferRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/review', reviewRoute);
app.use('/api/checkout', stripeRoute);
app.listen(process.env.PORT || 4000, () => {
	console.log(
		`Backend server is running! on port ${process.env.PORT || 4000}`,
	);
});
