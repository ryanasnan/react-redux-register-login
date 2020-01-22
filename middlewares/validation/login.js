const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
