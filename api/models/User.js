const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
		},
		verificationTokenExpires: {
			type: Date,
		},
		img: {
			type: String,
			required: true,
			default: 'https://via.placeholder.com/350x150',
		},
		wish: { type: Array },
	},

	{ timestamps: true },
);
module.exports = mongoose.model('User', UserSchema);
