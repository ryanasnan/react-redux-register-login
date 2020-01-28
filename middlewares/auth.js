const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const passport = require('passport');

// authentication with JWT
exports.authWithJWT = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1];
	}
	// Set token from cookie
	// else if (req.cookies.token) {
	//   token = req.cookies.token;
	// }

	// Make sure token exists
	if (!token) {
		return next(new ErrorResponse('Not authorized to access this route', 401));
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(decoded.id);

		next();
	} catch (err) {
		return next(new ErrorResponse('Not authorized to access this route', 401));
	}
});

// Authentication with passport
exports.authWithPassport = asyncHandler(async (req, res, next) => {
	passport.authenticate('jwt', { session: false, }, async (error, token) => {
		if (error || !token) {
			next(new ErrorResponse('Not authorized to access this route', 401));
		}

		try {
			req.user = await User.findById(token.id);
		} catch (error) {
			next(error);
		}
		next();
	})(req, res, next);
});