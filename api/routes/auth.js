const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const UserAdmin = require('../models/UserAdmin');
const nodemailer = require('nodemailer');
router.post('/registerAdmin', async (req, res) => {
	const { username, email, password, role } = req.body;
	try {
		const hashedPassword = CryptoJS.AES.encrypt(
			password,
			process.env.PASS_SEC,
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
			res.status(400).json({ message: 'Email already exists' });
		} else {
			res.status(500).json({ message: 'Internal server error' });
		}
	}
});
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
router.post('/registerAPP', async (req, res) => {
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
			customerId: savedUser._id,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});
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
});
cron.schedule('* * * * *', async () => {
	const cutoff = Date.now() - 300000;
	const unverifiedUsers = await User.find({
		verified: false,
		createdAt: { $lt: cutoff },
	});
	for (const user of unverifiedUsers) {
		await User.deleteOne({ _id: user._id });
	}
});
router.post('/login', async (req, res) => {
	try {
		let user = await UserAdmin.findOne({ email: req.body.email });
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
		const link = `http://194.195.86.67:4000/api/auth/reset-password/${oldUser._id}/${token}`;
		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false,
			auth: {
				user: 'danali444@outlook.com',
				pass: 'ozutptxpikkndxec',
				tls: {
					rejectUnauthorized: false,
				},
			},
		});
		const mailOptions = {
			from: 'danali444@outlook.com',
			to: oldUser.email,
			subject: 'Password Reset Link',
			text: `Please click on the following link to reset your password: ${link}`,
		};
		await transporter.sendMail(mailOptions);
		return res.json({ status: 'Email Sent' });
	} catch (error) {
		return res
			.status(500)
			.json({ status: 'There was a problem sending the email!' });
	}
});
router.post('/change-password/:id', async (req, res) => {
	const { id } = req.params;
	const { currentPassword, newPassword } = req.body;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC,
		);
		const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
		if (originalPassword !== currentPassword) {
			return res.status(401).json({ message: 'Invalid current password' });
		}
		const encryptedPassword = CryptoJS.AES.encrypt(
			newPassword,
			process.env.PASS_SEC,
		).toString();
		user.password = encryptedPassword;
		await user.save();
		res.status(200).json({ message: 'Password changed successfully' });
	} catch (error) {
		console.error('Error changing password:', error);
		res.status(500).json({ message: 'Internal server error' });
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
		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false,
			auth: {
				user: 'danali444@outlook.com',
				pass: 'ozutptxpikkndxec',
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
		const mailOptions = {
			from: 'danali444@outlook.com',
			to: 'radwansusan90@gmail.com',
			subject: 'Test email',
			text: `buy product`,
		};
		await transporter.sendMail(mailOptions);
		return res.json({ status: 'Email Sent' });
	} catch (error) {
		console.error(error);
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
				user: 'danali444@outlook.com',
				pass: 'ozutptxpikkndxec',
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
		const mailOptions = {
			from: 'danali444@outlook.com',
			to: 'radwansusan90@gmail.com',
			subject: 'Test email',
			text: `new order`,
		};
		await transporter.sendMail(mailOptions);
		return res.json({ status: 'Email Sent' });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ status: 'There was a problem sending the email!' });
	}
});
module.exports = router;
