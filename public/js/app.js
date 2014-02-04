// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngResource',
	'ngRoute',
	'myApp.services',
  'myApp.directives',
	'myApp.controllers'
  ]).

  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
    	templateUrl: 'partial/search'
    }).
    when('/planes/:planeId', {
      templateUrl: 'partial/edit'
    }).
    /*when('/signup', {
      templateUrl: 'partial/signup'
    }).*/
    when('/create', {
      templateUrl: 'partial/create'
    }).
   	otherwise({redirectTo: '/'});
  }])

  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
  }]);