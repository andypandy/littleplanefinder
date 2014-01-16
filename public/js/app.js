//var myApp = angular.module('myApp', []);

// Declare app level module which depends on filters, and services
angular.module('myApp', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
    	templateUrl: 'partial/search'
    }).
    when('/create', {
    	templateUrl: 'partial/create'
    }).
    when('/happy', {
    	templateUrl: 'partial/happy'
    }).
   	otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }]);