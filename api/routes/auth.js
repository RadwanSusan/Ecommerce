const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
// const reset = require('../../admin/src/pages/reset/Reset');


//REGISTER
router.post('/register', async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		isAdmin: req.body.isAdmin,
		img: req.body.img,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC,
		).toString(),
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

//LOGIN

router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		// !user && res.status(400).json("Wrong user!");
		if (!user) {
			return res.status(401).json('Wrong user!');
		}
		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC,
		);
		const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
		// OriginalPassword !== req.body.password &&
		//   res.status(401).json("Wrong password!");
		if (OriginalPassword !== req.body.password) {
			return res.status(401).json('Wrong password!');
		}
		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: '3d' },
		);
		const { password, ...others } = user._doc;
		return res.status(200).json({ ...others, accessToken });
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.post('/forgot-password', async (req, res) => {
	try {
		const { email } = req.body;
		const oldUser = await User.findOne({ email: email });
		if (!oldUser) {
			return res.json({ status: 'User Not Exists' });
		}
		const secret = process.env.JWT_SEC + oldUser.password;
		const token = jwt.sign(
			{ email: oldUser.email, id: oldUser._id },
			secret,
			{
				expiresIn: '3d',
			},
		);
		const link = `http://localhost:4000/api/auth/reset-password/${oldUser._id}/${token}`;
		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false,
			auth: {
				user: 'danali444@outlook.com',
				pass: 'Outbox@007',
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
		const mailOptions = {
			from: 'danali444@outlook.com',
			to: 'radwansusan90@gmail.com',
			subject: 'Test email',
			text: `This is a test email sent using Nodemailer ${link}`,
		};
		await transporter.sendMail(mailOptions);
		console.log('Email sent');
		return res.json({ status: 'Email Sent' });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ status: 'There was a problem sending the email!' });
	}
});

router.get('/reset-password/:id/:token', async (req, res) => {
	const { id, token } = req.params;
	const oldUser = await User.findOne({ _id: id });
	if (!oldUser) {
		return res.json({ status: 'User not found' });
	}
	const secret = process.env.JWT_SEC + oldUser.password;
	try {
		const verify = jwt.verify(token, secret);
		res.render('index2', { email: verify.email, status: 'Not Verified' });
	} catch (e) {
		res.send(e);
	}
});

router.post('/reset-password/:id/:token', async (req, res) => {
	const { id, token } = req.params;
	const { password } = req.body;

	const oldUser = await User.findOne({ _id: id });
	if (!oldUser) {
		return res.json({ status: 'User not found' });
	}
	const secret = process.env.JWT_SEC + oldUser.password;
	try {
		const verify = jwt.verify(token, secret);
		const encrypted = await CryptoJS.AES.encrypt(
			password,
			process.env.PASS_SEC,
		).toString();
		await User.updateOne(
			{
				_id: id,
			},
			{
				$set: {
					password: encrypted,
				},
			},
		);
		//   res.send("Verified");
		// response.json({ status: 'passwd updated' });
		 res.render("index2", { email: verify.email, status: "verified" });
	} catch (e) {
		res.send('Not Verified');
	}
});

router.get("/checkEmail/:email", async (req, res) => {
	const email = req.params.email;
	const user = await User.findOne({ email });
	if (user) {
		return res.status(200).json("Email already exists!");
	}
	res.status(200).json("Email available!");
});

module.exports = router;
