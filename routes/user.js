/*
 * User login/signup stuff
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');


//post /signup
exports.signup = function(req, res, next) {
  var user = new User(req.body);
  var message = null;

  user.save(function(err) {
    if(err) {

      if(err.code == 11000 || err.code == 11001) {
        message = 'Email address already registered.';
      } else {
        message = 'Please fill all the required fields';
      }

      return res.send(200, {
        message: message,
        user: {email: user.email}
      });
    }
    
    req.login(user, function(err) {
      if(err) return next(err);

      return res.redirect('/');
    });

  });
};



//post /login
exports.login = function(req, res, next) {
  
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    }

    if (!user) { 
      return res.send(200, {
        success: 0,
        message: 'Incorrect username or password.'
      });
    }
    
    req.login(user, function(err) {
      if (err) { 
        return next(err); 
      }
      
      return res.send(200, {
        success: 1
      });
    });
  })(req, res, next);
};


//get /logout, log them them then refresh
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};








exports.findPlanes = function (req, res) {

  Plane.find(function(err, planes) {
    if (err) console.log(err);

    res.json(planes);
  });
};


//Create plane
exports.createPlane = function (req, res) {
  var plane = new Plane(req.body);

  plane.save(function(err) {
    if(err) {
      console.log(err); 
    } else {
      console.log('Plane added: ' + plane.make + ' ' + plane.model);
      console.log(plane);
      res.send(200);
    }
  });
};


//Update plane
exports.updatePlane = function(req, res) {
  //req.param.id
  var plane = req.plane;
  plane.save(function(err) {
    if(err) {
      console.log(err); 
    } else {
      console.log('Plane updated: ' + plane.make + ' ' + plane.model);
      console.log(plane);
      res.send(200);
    }
  });
};



//Deletes planes
exports.deletePlane = function(req, res) {
  /*console.log(req.plane);
  var plane = req.plane;
  plane.remove(function(err) {
    if(err) {
       console.log(err);
    } else {
      console.log('Plane deleted: ' + plane.make + ' ' + plane.model);
      res.send(200);
    }

  });*/

  Plane.remove({_id: req.params.planeId}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Plane deleted: _id : ' + req.params.planeId);
      res.send(200);
    }
  });
};



