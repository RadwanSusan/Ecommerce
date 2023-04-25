const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { response } = require("express");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

//REGISTER
router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		// !user && res.status(400).json("Wrong user!");
		if (!user) {
			return res.status(401).json("Wrong user!");
		}
		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC,
		);
		const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
		// OriginalPassword !== req.body.password &&
		//   res.status(401).json("Wrong password!");
		if (OriginalPassword !== req.body.password) {
			return res.status(401).json("Wrong password!");
		}
		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: "3d" },
		);
		const { password, ...others } = user._doc;
		return res.status(200).json({ ...others, accessToken });
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.post("/forgot-password", async (req, res) => {
	const { email } = req.body;
	try {
		const oldUser = await User.findOne({ email: email });
		if (!oldUser) {
			return res.json({status: "User Not Exists"});
		}
		const secret = process.env.JWT_SEC + oldUser.password;
		const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
			expiresIn: "3d",
		});
		const link = `http://localhost:4000/reset-password/${oldUser._id}/${token}`;
	// 	var transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "youremail@gmail.com",
    //     pass: "yourpassword",
    //   },
    // });

    // var mailOptions = {
    //   from: "zaid@gmail.com",
    //   to: "myfriend@yahoo.com",
    //   subject: "password Reset",
    //   text: link,
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
		console.log(link);
	
	} catch (err) { }
});
router.get('/reset-password/:id/:token', async (req, res) => {
	const { id, token } = req.params;
	console.log(req.params);
	const oldUser = await User.findOne({ _id: id });
	if (!oldUser) { 
		return res.json({status: 'User not found'});
	}
	const secret = process.env.JWT_SEC + oldUser.password;
	try {
		const verify = jwt.verify(token, secret);
		res.render("/reset", { email: verify.email, status: "Not verify" });
		// res.send("Verified");
		// console.log("Verified");
		
	} catch (e) { 
		res.send("Not Verified");
	}
});
router.post("/reset-password/:id/:token", async (req, res) => {
	const { id, token } = req.params;
	const { password } = req.body;
	
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User not found" });
  }
  const secret = process.env.JWT_SEC + oldUser.password;
  try {
	  const verify = jwt.verify(token, secret);
	  const encrypted = await CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
	  await User.updateOne(
		  {
			  _id:id,
		  },
		  {
			  $set: {
				  password: encrypted,	  
			  },
		  }
	  );
	//   res.send("Verified");
	  response.json({status:"passwd updated"});
		res.render("/reset", { email: verify.email, status: "verify" });
	  
  } catch (e) {
    res.send("Not Verified");
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
