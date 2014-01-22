angular.module('myApp.services', []).
  service('Planes', ['$resource', function($resource) {
    return $resource('/api/v1/planes', {});
  }]).
  service('SearchFields', [function() {
  	var searchFields = ['horsepower', 'cruiseSpeedKts'];
  	var searchFields = [{
  		name: 'horsepower',
  		label: 'Horsepower',
  		type: 'numeric',
  		visible: true
  	}, {
  		name: 'cruiseSpeedKts',
  		label: 'Cruise Speed (kts.)',
  		type: 'numeric',
  		visible: true
  	}];
  	return searchFields
  }]);