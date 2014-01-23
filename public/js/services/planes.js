angular.module('myApp.services', []).
  service('Planes', ['$resource', function($resource) {
    return $resource('/api/v1/planes', {});
  }]).


  service('SearchFields', [function() {
    var searchFields = [{
      label: 'Make', //0
      field: 'make',
      type: 'string',
      visible: true
    }, {
      label: 'Model', //1
      field: 'model',
      type: '',
      visible: true
    }, {
      label: 'Model No.', //2
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Cruise Speed (kts.)', //3
      field: 'cruiseSpeedKts',
      type: 'numeric',
      visible: true
    }, {
      label: 'Top Speed (kts.)', //4
      field: 'topSpeedKts',
      type: 'numeric',
      visible: false
    }, {
      label: 'Stall Speed Dirty (kts.)', //5
      field: '',
      type: 'numeric',
    }, {
      label: 'Gear', //6
      field: '',
      type: 'numeric',
      visible: true
    }, {
      label: 'Mixture', //7
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Engine Make', //8
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Engine Model', //9
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Engine Model (Specific)', //10
      field: '',
      type: '',
      visible: false
    }, {
      label: 'Horsepower', //11
      field: 'horsepower',
      type: 'numeric',
      visible: true
    }, {
      label: 'Gross Weight (lbs.)', //12
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Empty Weight (lbs.)', //13
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Usable Weight (lbs.)', //14
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Full Fuel Usable Weight (lbs.)', //15
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Fuel Capacity (gal.)', //16
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Range (nm)', //17
      field: '',
      type: '',
      visible: true
    }, {
      label: 'Take Off Ground Roll (ft.)', //18
      field: '',
      type: '',
      visible: false
    }, {
      label: 'Take Off Over 50 Ft. (ft.)', //19
      field: '',
      type: '',
      visible: false
    }, {
      label: 'Landing Ground Roll (ft.)', //20
      field: '',
      type: '',
      visible: false
    }, {
      label: 'Landing Over 50 Ft. (ft.)', //21
      field: '',
      type: '',
      visible: false
    }, {
      label: 'Climb Rate (fpm.)', //22
      field: '',
      type: '',
      visible: false
    }, {
      label: 'Ceiling (ft.)', //23
      field: '',
      type: '',
      visible: false
    }];

    return searchFields
  }]);