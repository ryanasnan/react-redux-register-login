const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const validatePostInput = require('../middlewares/validation/register');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;

	const { errors, isValid } = validatePostInput(req.body);
	// check input validation
	if (!isValid) {
		// console.log(errors);
		return next(new ErrorResponse("Error Input Validation", 400, errors));
	}

	const avatar = "https://ui-avatars.com/api/?size=256&name=" + name.split(' ').join('+');

	// using manual existed email validation, if mongoose have problem with unique index in schema validation
	const user = await User.findOne({ email: email });
	if (user) {
		return next(new ErrorResponse('Email Address Exists in Database', 400));
	} else {
		const user = await User.create({
			name,
			email,
			password,
			avatar
		});
	}

	res.status(200).json({ success: true });
});

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	const { errors, isValid } = validatePostInput(req.body);
	// check input validation
	if (!isValid) {
		// console.log(errors);
		return next(new ErrorResponse("Error Input Validation", 400, errors));
	}

	const user = await User.findOne({ email: email });
	if (user) {
		// Check if password matches
		const isMatch = await user.matchPassword(password);

		if (!isMatch) {
			return next(new ErrorResponse('Password wrong', 401));
		}
		sendTokenResponse(user, 200, res);
	} else {
		return next(new ErrorResponse('No Account, Please Register!!!', 401));
	}
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true
	};

	// If in production make the secure flag to true (if using https)
	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res
		.status(statusCode)
		.cookie('token', token, options)
		.json({
			success: true,
			token
		});
};

exports.getMe = asyncHandler(async (req, res, next) => {
	console.log(req.user);
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		data: user
	});
});