// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'ngResource',
	'myApp.services',
  'myApp.directives',
	'myApp.controllers'
  ]).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
    	templateUrl: 'partial/search'
    }).
    /*when('/create', {
    	templateUrl: 'partial/create'
    }).
    when('/happy', {
    	templateUrl: 'partial/happy'
    }).*/
   	otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }]);