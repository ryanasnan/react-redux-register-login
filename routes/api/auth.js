const express = require('express');
const router = express.Router();
const {
	register,
	login,
	getMe
} = require('../../controllers/auth');

const { authWithPassport } = require('../../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authWithPassport, getMe);

module.exports = router;