/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {
  schema: true,

  attributes: {
    username: {
      type: 'string',
      unique: 'true',
      required: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6
    },
    phonenumber: {
      type: 'string',
      minLength: 14,
      maxLength: 14
    },
    email: {
      type: 'string',
      required: true
    },
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    hobbies: { // I just copied this and I dont understand what happemed here
      collection: 'hobby',
      via: 'owner'
    }
  },
  customToJSON: function () {
    return _.omit(this, ['password']);
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return console.log(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          user.password = hash;
        }
        cb();
      });
    });
  }
};
