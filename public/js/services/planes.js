angular.module('myApp.services', ['ngResource']).
  service('Planes', ['$resource', function($resource) {
    return $resource('api/v1/planes/:planeId', {
      planeId: '@_id'
    }, {
        'update': {
            method: 'PUT'
        }
    });
  }]).


  service('SearchFields', [function() {
    var searchFields = [{
      label: 'Make', //0
      field: 'make',
      tooltip: 'Cool tooltip',
      type: 'string',
      visible: true,
    }, {
      label: 'Model', //1
      field: 'model',
      type: 'string',
      visible: true
    }, {
      label: 'Model No.', //2
      field: 'modelNumber',
      type: 'string',
      visible: true
    }, {
      label: 'POH',
      field: 'poh',
      type: 'file_with_preview',
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
      field: 'stallSpeedDirtyKts',
      type: 'numeric',
    }, {
      label: 'Landing gear', //6
      field: 'gear',
      type: 'select',
      options: [{
        value: '',
        label: 'Any'
      },{
        value: 'fixed',
        label: 'Fixed'
      }, {
        value: 'retractable',
        label: 'Retractable'
      }],
      visible: true
    }, {
      label: 'Mixture', //7
      field: 'mixture',
      type: 'select',
      options: [{
        value: '',
        label: 'Any'
      },{
        value: 'injected',
        label: 'Fuel injected'
      }, {
        value: 'carburated',
        label: 'Carburated'
      }],
      visible: true
    }, {
      label: 'Engine Make', //8
      field: 'engineMake',
      type: 'string',
      visible: true
    }, {
      label: 'Engine Model', //9
      field: 'engineModel',
      type: 'string',
      visible: true
    }, {
      label: 'Engine Model (Specific)', //10
      field: 'engineModelSpecific',
      type: 'string',
      visible: false
    }, {
      label: 'Horsepower', //11
      field: 'horsepower',
      type: 'numeric',
      visible: true
    }, {
      label: 'Gross Weight (lbs.)', //12
      field: 'grossWeightPounds',
      type: 'numeric',
      visible: true
    }, {
      label: 'Empty Weight (lbs.)', //13
      field: 'emptyWeightPounds',
      type: 'numeric',
      visible: true
    },
     {
      label: 'Usable Weight (lbs.)', //14
      field: 'usableWeight',
      type: 'numeric',
      visible: true
    }, {
      label: 'Full Fuel Usable Weight (lbs.)', //15
      field: 'fullFuelUsableWeight',
      type: 'numeric',
      visible: true
    }, {
      label: 'Fuel Capacity (gal.)', //16
      field: 'fuelCapacityGallons',
      type: 'numeric',
      visible: true
    }, {
      label: 'Range (nm)', //17
      field: 'rangeNM',
      type: 'numeric',
      visible: true
    }, {
      label: 'Take Off Ground Roll (ft.)', //18
      field: 'takeOffGroundRollFt',
      type: 'numeric',
      visible: false
    }, {
      label: 'Take Off Over 50 Ft. (ft.)', //19
      field: 'takeOffOver50FtFt',
      type: 'numeric',
      visible: false
    }, {
      label: 'Landing Ground Roll (ft.)', //20
      field: 'landingGroundRollFt',
      type: 'numeric',
      visible: false
    }, {
      label: 'Landing Over 50 Ft. (ft.)', //21
      field: 'landingOver50FtFt',
      type: 'numeric',
      visible: false
    }, {
      label: 'Climb Rate (fpm.)', //22
      field: 'climbRateFpm',
      type: 'numeric',
      visible: false
    }, {
      label: 'Ceiling (ft.)', //23
      field: 'ceilingFt',
      type: 'numeric',
      visible: false
    }];

    return searchFields
  }]);