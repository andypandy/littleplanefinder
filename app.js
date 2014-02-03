
/**
 * Module dependencies.
 */

var express = require('express');
var db = require('./db/connect');
var routes = require('./routes');
var user = require('./routes/user');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var passport = require('passport');

require('./passport.js')(passport);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('your secret herezzzzzzzy890 '));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/**
 * Routes
 */

//Index
app.get('/', routes.index);

//User login/signup
app.post('/signup', user.signup);
app.post('/login', user.login);
app.get('/logout', user.logout);

//Angular partial templates
app.get('/partial/:name', routes.partial);

// JSON API
app.get('/api/v1/planes', api.findPlanes);
app.post('/api/v1/planes', api.createPlane);
app.put('/api/v1/planes/:planeId', api.updatePlane);
app.del('/api/v1/planes/:planeId', api.deletePlane);

//Reroute everything else to angular
app.get('*', routes.index);



/**
 * Start server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
