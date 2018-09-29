var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(((username, password, done) => {
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, {
        message: 'I see you want to hack this account!'
      });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) {
        return done(null, false, {
          message: 'There has been an error',
        });
      }
      if (!res) {
        return done(null, false, {
          message: 'I see you want to hack this account!'
        });
      }
      return done(null, user, 'Welcome Back');
    });
  });
})));
