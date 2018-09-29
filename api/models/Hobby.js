/**
 * Hobby.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    myhobby: {
      type: 'string',
      required: true
    },
    owner: { // I just copied this and I dont know what happened here
      model: 'user'
    }

  },

};
