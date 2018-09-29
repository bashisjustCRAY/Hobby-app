/**
 * HobbyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addhobby: async function (req, res) {
    var myhobby = req.param('myhobby').trim();
    var hobbyowner = req.param('hobbyowner').trim();

    if (myhobby !== undefined || hobbyowner !== undefined || myhobby.length === 0 || hobbyowner.length === 0) {
      await User.find({
        id: hobbyowner,
      });
      //var message = `Hello ${user.firstname} ${user.lastname}, you just added a new hobby.`;
      await Hobby.findOrCreate({
        myhobby: myhobby,
        owner: hobbyowner,
      }, {
        myhobby: myhobby,
        owner: hobbyowner,
      }, (error, existingHobby, newHobby) => {
        if (error) {
          return res.json({
            error: error,
          });
        } else if (newHobby) {
          return res.status(200).json({
            message: 'You have added a new hobby',
          });
        } else {
          return res.json({
            message: 'Hobby Previously Added',
          });
        }
      });
    } else {
      return res.json({
        error: 'Incomplete Credentials',
      });
    }
  }

};
