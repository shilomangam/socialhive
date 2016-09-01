/**
 * Created by i327364 on 21/08/2016.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	function(username, password, done) {
		User.findOne({email: username}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					success: false,
					message: 'User not found'
				});
			}
			if (!user.validPassword(password)) {
				return done(null, false, {
					success: false,
					message: 'Password is wrong'
				});
			}
			return done(null, {
				success: true,
				data: user
			});
		});
	}
));



