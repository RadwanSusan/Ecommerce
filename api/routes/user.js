const User = require("../models/User");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
	const newUser = new User(req.body);

	try {
		const savedUser = await newUser.save();
		res.status(200).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
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
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("User has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
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

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	try {
		const data = await User.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					month: { $month: "$createdAt" },
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/statsDay", verifyTokenAndAdmin, async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	try {
		const data = await User.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					day: { $dayOfMonth: "$createdAt" },
				},
			},
			{
				$group: {
					_id: "$day",
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get("/wishlist/:userId", async (req, res) => {
   const { userId } = req.params;
	// const { productId } = req.body;
	const productId = req.query.pid;
	
  try {
	  const user = await User.findById(userId);

		const { wish } = user._doc;
	  
    const alreadyAdded =  wish.find((id) => id.toString() === productId);
    if (alreadyAdded) {
        let user = await User.findByIdAndUpdate(
          userId,
          {
            $pull: { wish: productId },
          },
          {
            new: true,
          }
        );
        res.json(user);
    //   res.send("ssss");
    } else {
      let user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { wish: productId },
        },
        {
          new: true,
        }
      );
      res.json(user);
      //   res.send("aaaaa");
    }
  } 
  catch (err) {
    res.status(500).json(err);
	//   res.send("rrrr");
  }
});
router.get("/is-available/:userId", (req, res) => {
	const value = req.query.value;
	const { userId } = req.params;
  if (value) {
    res.json(true);
  } else res.json(false);
});


module.exports = router;
