const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	// spread err and store to variable error
	let error = { ...err };

	error.message = err.message;

	// Log to console for dev
	console.log(err);

	// Handling Mongoose bad format ObjectID
	if (err.name === 'CastError') {
		const message = `Resource not found with id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400)
	}

	// Mongoose Validation Error
	if (err.name === 'ValidationError') {
		const message = 'Database Field Validation';
		const errors = Object.keys(err.errors).reduce(function (result, key) {
			result[key] = err.errors[key].message;
			return result
		}, {});

		error = new ErrorResponse(message, 400, errors);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error || 'Server Error'
	});
};

module.exports = errorHandler;