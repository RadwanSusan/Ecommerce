const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cron = require('node-cron');
const UserAdmin = require('../models/UserAdmin'); // Assuming your user model is saved as User.js

const nodemailer = require('nodemailer');
const user = require('./user');

// router.post('/registerAdmin', async (req, res) => {
// 	const { username, email, password, role } = req.body;
// 	const hashedPassword = CryptoJS.AES.encrypt(
// 		password,
// 		process.env.PASS_SEC,
// 	).toString();

// 	const newUser = new UserAdmin({
// 		username,
// 		email,
// 		password: hashedPassword,
// 		role,
// 	});

// 	try {
// 		const savedUser = await newUser.save();
// 		res.status(201).json(savedUser);
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// });
router.post('/registerAdmin', async (req, res) => {
	const { username, email, password, role } = req.body;
  
	try {
	  const hashedPassword = CryptoJS.AES.encrypt(
		password,
		process.env.PASS_SEC
	  ).toString();
  
	  const newUser = new UserAdmin({
		username,
		email,
		password: hashedPassword,
		role,
	  });
  
	  const savedUser = await newUser.save();
	  res.status(201).json(savedUser);
	} catch (error) {
	  console.error('Error registering admin:', error);
	  if (error.code === 11000) {
		// Duplicate key error
		res.status(400).json({ message: 'Email already exists' });
	  } else {
		res.status(500).json({ message: 'Internal server error' });
	  }
	}
  });
// router.post('/register', async (req, res) => {
// 	const { username, email, phoneNumber, isAdmin, password } = req.body;
// 	const hashedPassword = CryptoJS.AES.encrypt(
// 		password,
// 		process.env.PASS_SEC,
// 	).toString();

// 	// Generate a verification token
// 	const verificationToken = crypto.randomBytes(20).toString('hex');
// 	const verificationTokenExpires = Date.now() + 300000; // Token expires in 5 minutes

// 	const newUser = new User({
// 		username,
// 		email,
// 		phoneNumber,
// 		isAdmin,
// 		verified: false,
// 		verificationToken,
// 		verificationTokenExpires,
// 		img: req.body.img,
// 		password: hashedPassword,
// 	});

// 	try {
// 		const savedUser = await newUser.save();

// 		const transporter = nodemailer.createTransport({
// 			service: 'Outlook',
// 			auth: {
// 				user: 'zaidaltamari50@outlook.com',
// 				pass: 'ebulddtefcgrgugw',
// 			},
// 			tls: {
// 				rejectUnauthorized: false,
// 			},
// 		});

// 		const verificationUrl = `http://localhost:5000/verifyEmail?token=${verificationToken}`;
// 		await transporter.sendMail({
// 			from: '"Your App" <zaidaltamari50@outlook.com>',
// 			to: savedUser.email,
// 			subject: 'Account Verification',
// 			html: `<p>Please verify your account by clicking the following link: <a href="${verificationUrl}">Verify Account</a></p>`,
// 		});

// 		res.status(201).json({
// 			message: 'User registered, please verify your email.',
// 		});
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// });

router.post('/register', async (req, res) => {
	const { username, email, phoneNumber, isAdmin, password } = req.body;
	const hashedPassword = CryptoJS.AES.encrypt(
		password,
		process.env.PASS_SEC,
	).toString();

	const newUser = new User({
		username,
		email,
		phoneNumber,
		isAdmin,
		verified: true,
		img: req.body.img,
		password: hashedPassword,
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json({
			message: 'User registered successfully.',
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

// Email verification endpoint
router.get('/verifyEmail', async (req, res) => {
	const { token } = req.query;
	const user = await User.findOne({
		verificationToken: token,
		verificationTokenExpires: { $gt: Date.now() },
	});

	if (!user) {
		return res
			.status(400)
			.send('Verification token is invalid or has expired.');
	}

	user.verified = true;
	user.verificationToken = undefined;
	user.verificationTokenExpires = undefined;
	await user.save();

	res.status(200).json({ message: 'Email verified successfully!' });
	// res.redirect('http://localhost:4000/api/auth/login');
});

cron.schedule('* * * * *', async () => {
	const cutoff = Date.now() - 300000; // 5 minutes ago
	const unverifiedUsers = await User.find({
		verified: false,
		createdAt: { $lt: cutoff },
	});
	for (const user of unverifiedUsers) {
		await User.deleteOne({ _id: user._id });
	}
});

//LOGIN

// router.post('/login', async (req, res) => {
// 	try {
// 		const user = await UserAdmin.findOne({ email: req.body.email });
// 		if (!user) {
// 			return res.status(401).json('Wrong email!');
// 		}
// 		const hashedPassword = CryptoJS.AES.decrypt(
// 			user.password,
// 			process.env.PASS_SEC,
// 		);
// 		const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
// 		if (OriginalPassword !== req.body.password) {
// 			return res.status(401).json('Wrong password!');
// 		}
// 		const accessToken = jwt.sign(
// 			{ id: user._id, role: user.role },
// 			process.env.JWT_SEC,
// 			{
// 				expiresIn: '3d',
// 			},
// 		);
// 		// const { password, ...others } = user._doc;
// 		const { password, ...others } = user.toObject();
// 		res.status(200).json({ ...others, accessToken });
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

router.post('/login', async (req, res) => {
	try {
		// First, check in the UserAdmin collection
		let user = await UserAdmin.findOne({ email: req.body.email });

		// If not found in UserAdmin, check in the User collection
		if (!user) {
			user = await User.findOne({ email: req.body.email });
			if (!user) {
				return res.status(401).json('Wrong email!');
			}
		}

		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC,
		);
		const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
		if (OriginalPassword !== req.body.password) {
			return res.status(401).json('Wrong password!');
		}

		const accessToken = jwt.sign(
			{ id: user._id, role: user.role || 'user' },
			process.env.JWT_SEC,
			{ expiresIn: '3d' },
		);

		const { password, ...others } = user.toObject();
		res.status(200).json({ ...others, accessToken });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/forgot-password', async (req, res) => {
	try {
		const { email } = req.body;
		const oldUser = await User.findOne({ email: email });
		if (!oldUser) {
			return res.status(404).send('User not found');
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
				user: 'zaidaltamari50@outlook.com',
				pass: 'ebulddtefcgrgugw',
				// const { password, ...others } = user._doc,
				tls: {
					rejectUnauthorized: false,
				},
			},
		});

		const mailOptions = {
			from: 'zaidaltamari50@outlook.com',
			to: oldUser.email,
			subject: 'Password Reset Link',
			text: `Please click on the following link to reset your password: ${link}`,
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
		res.render('index2', {
			email: verify.email,
			status: 'Not Verified TEST',
		});
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
		res.render('index2', { email: verify.email, status: 'verified' });
	} catch (e) {
		res.send('Not Verified');
	}
});

router.get('/checkEmail/:email', async (req, res) => {
	const email = req.params.email;
	const user = await User.findOne({ email });
	if (user) {
		return res.status(200).json('Email already exists!');
	}
	res.status(200).json('Email available!');
});

router.post('/sendEmail', async (req, res) => {
	try {
		const { email } = req.body;

		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false,
			auth: {
				user: 'zaidalt505@outlook.com',
				pass: '1234#$abcd',
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
		const mailOptions = {
			from: 'zaidalt505@outlook.com',
			to: 'zaidaltamari5@gmail.com',
			subject: 'Test email',
			text: `buy product`,
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
router.post('/sendEmailAdmin', async (req, res) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false,
			auth: {
				user: 'zaidalt505@outlook.com',
				pass: '1234#$abcd',
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
		const mailOptions = {
			from: 'zaidalt505@outlook.com',
			to: 'zaidalt505@outlook.com',
			subject: 'Test email',
			text: `new order`,
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

module.exports = router;
