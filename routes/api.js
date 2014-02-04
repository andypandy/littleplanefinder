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


exports.findOnePlane = function (req, res) {
  Plane.findOne({_id: req.params.planeId}, function(err, plane) {
    if (err) console.log(err);

    res.json(plane);
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
  var id = req.body._id;
  delete req.body._id;  

  Plane.update({_id: id}, {$set: req.body}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Plane updated: ' + req.body.make + ' ' + req.body.model);
      res.send(200);
    }
  });


/*

  var plane = new Plane(req.body);


  plane.update(function(err) {
    if(err) {
      console.log(err); 
      res.send(500);
    } else {
      console.log('Plane updated: ' + plane.make + ' ' + plane.model);
      console.log(plane);
      res.send(200);
    }
  });
*/
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



