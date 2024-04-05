const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//@desc  Post users
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Complete user registration information is required');
	}

	const UserExist = await User.findOne({ email });
	if (UserExist) {
		res.status(400);
		throw new Error('User already exists');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create User

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(404);
		throw new Error('User already exists');
	}
});

//@desc  Post users
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const checkedUser = await User.findOne({ email });

	if (checkedUser && (await bcrypt.compare(password, checkedUser.password))) {
		res.json({
			_id: checkedUser._id,
			name: checkedUser.name,
			email: checkedUser.email,
			token: generateToken(checkedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//@desc  Get users
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user._id);
	res.status(200).json({
		id: _id,
		name,
		email,
	});
});

//Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
