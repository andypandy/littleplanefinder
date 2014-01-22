angular.module('myApp.services', []).
  service('Planes', ['$resource', function($resource) {
    return $resource('/api/v1/planes', {});
  }]).


  service('SearchFields', [function() {
    var searchFields = ['horsepower', 'cruiseSpeedKts'];

    var searchFields = [{
      label: 'Make', //0
      visible: true
    }, {
      label: 'Model', //1
      visible: true
    }, {
      label: 'Model No.', //2
      visible: true
    }, {
      label: 'Cruise Speed (kts.)', //3
      visible: true
    }, {
      label: 'Top Speed (kts.)', //4
      visible: false
    }, {
      label: 'Stall Speed Dirty (kts.)', //5
    }, {
      label: 'Gear', //6
      visible: true
    }, {
      label: 'Mixture', //7
      visible: true
    }, {
      label: 'Engine Make', //8
      visible: true
    }, {
      label: 'Engine Model', //9
      visible: true
    }, {
      label: 'Engine Model (Specific)', //10
      visible: false
    }, {
      label: 'Horsepower', //11
      visible: true
    }, {
      label: 'Gross Weight (lbs.)', //12
      visible: true
    }, {
      label: 'Empty Weight (lbs.)', //13
      visible: true
    }, {
      label: 'Usable Weight (lbs.)', //14
      visible: true
    }, {
      label: 'Full Fuel Usable Weight (lbs.)', //15
      visible: true
    }, {
      label: 'Fuel Capacity (gal.)', //16
      visible: true
    }, {
      label: 'Range (nm)', //17
      visible: true
    }, {
      label: 'Take Off Ground Roll (ft.)', //18
      visible: false
    }, {
      label: 'Take Off Over 50 Ft. (ft.)', //19
      visible: false
    }, {
      label: 'Landing Ground Roll (ft.)', //20
      visible: false
    }, {
      label: 'Landing Over 50 Ft. (ft.)', //21
      visible: false
    }, {
      label: 'Climb Rate (fpm.)', //22
      visible: false
    }, {
      label: 'Ceiling (ft.)', //23
      visible: false
    }];

    /*searchFields.forEach(function(field, index) {
      searchFields[index].visible = true;
    });*/

    return searchFields
  }]);