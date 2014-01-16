/*
 * Serve JSON to our AngularJS client
 */

var mongoose = require('mongoose');
var Plane = mongoose.model('Plane');

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



