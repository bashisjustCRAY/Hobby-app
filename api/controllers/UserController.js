/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var passport = require('passport');

module.exports = {
  signin: function (req, res) {
    passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          authStatus: false,
        });
      }
      req.session.authenticated = true;
      return res.json({
        authStatus: true,
      });
    })(req, res);
  },

  signup: function (req, res) {
    User.findOrCreate({
      username: req.body.username,
      email: req.body.email
    }, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    }, (err, existingUser, newUser) => {
      if (err) {
        return res.json({
          statusMessage: 'Check your datapage again',
        });
      }
      if (newUser) {
        return res.json({
          statusMessage: 'User Successfully added',
        });
      } else {
        return res.json({
          statusMessage: 'This user already exists',
        });
      }
      // res.redirect('/login');
    });
  }
};



//This was what I was using before but its too long so explain yours to me

// if (_.isUndefined(req.param('email'))){
//   return res.badRequest('An email address must be provided.');
// }
// if (_.isUndefined(req.param('password') || req.param('password').length < 6)){
//   return res.badRequest('A password must be provided.');
// }
// if (!(_.isString(req.param('password'))) || req.param('password').match(/[^a-z0-9]/i)){
//   return res.badRequest('Your password must consist of only letters and numbers.');
// }
// if (_.isUndefined(req.param('firstname'))){
//   return res.badRequest('Your firstname must be provided.');
// }
// if (_.isUndefined(req.param('lastname'))){
//   return res.badRequest('Your lastname must be provided.');
// }
