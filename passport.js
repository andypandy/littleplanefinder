//Required files
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');


//
module.exports = function(passport) {

  // Serialize the user id to push into the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the user object based on a pre-serialized token (user.id) 
  //This returns everything in user doc except salt and hashed_password
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashed_password', function(err, user) {
      done(err, user);
    });
  });

  // Use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        //Error connecting to DB
        if(err) {
          return done(err);
        }

        //No user returned
        if(!user) {
          return done(null, false, {
            message: 'Unkown user.'
          });
        }

        //Wrong password
        if(!user.authenticate(password)) {
          return done(null, false, {
            message: 'Invalid password.'
          });
        }

        //Else return that user!
        return done(null, user);
      });
    }
  ));
};