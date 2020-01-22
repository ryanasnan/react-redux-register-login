class ErrorResponse extends Error {
	constructor(message, statusCode, details = {}) {
		super();
		this.message = message;
		this.statusCode = statusCode;
		this.details = details;
	}
}

module.exports = ErrorResponse;