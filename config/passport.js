const { Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const mongoose = require('mongoose');
const User = require('../models/User');

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret
};

module.exports = passport => {
	passport.use(new Strategy(opts, (jwt_payload, done) => {
		User.findById(jwt_payload.id)
			.then(user => {
				if (user) {
					return done(null, user);
				}
				return done(null, false);
			}).catch(err => console.error('err'));
	}));
};