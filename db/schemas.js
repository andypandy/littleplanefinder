var mongoose = require('mongoose');
var crypto = require('crypto');




//User
var UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  hashed_password: String,
  salt: String
});


//Set password virtual attr
UserSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
}).get(function() {
  return this._password;
});


//Validations
UserSchema.path('email').validate(function(email) {
    return (typeof email === 'string' && email.length > 0);
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    return (typeof hashed_password === 'string' && hashed_password.length > 0);
}, 'Password cannot be blank');


//Methods
UserSchema.methods = {
  //Authenticate - check if the passwords are the same
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  //Make per user salt
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  //Encrypt password (make hash)
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};


mongoose.modal('User', UserSchema);




//Planes
var PlaneSchema = mongoose.Schema({
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

mongoose.model('Plane', PlaneSchema);