var mongoose = require('mongoose');

var planeSchema = mongoose.Schema({
  created:              Date,
  make:                 String,
  model:                String,
  modelNumber:          String,
  modelNumberSpecific:  String,
  cruiseSpeedKts:       Number,
  topSpeedKts:          Number,
  stallSpeedDirtyKts:   Number,
  gear:                 String,
  mixture:              String,
  engineMake:           String,
  engineModel:          String,
  engineModelSpecific:  String,
  horsepower:           Number,
  grossWeightPounds:    Number,
  emptyWeightPounds:    Number,
  fuelCapacityGallons:  Number,
  rangeNM:              Number,
  takeOffGroundRollFt:  Number,
  takeOffOver50FtFt:    Number,
  landingGroundRollFt:  Number,
  landingOver50FtFt:    Number,
  climbRateFpm:         Number,
  ceilingFt:            Number
});

mongoose.model('Plane', planeSchema);