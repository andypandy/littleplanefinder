var myApp = angular.module('myApp', []);

function MyCtrl($scope) {
  //Horsepower filter
  $scope.horsepowerFilter = function (plane) {
    var ret = true;

    if ($scope.minHorsepower && $scope.minHorsepower > plane.horsepower) {
      ret = false;
    }

    if ($scope.maxHorsepower && $scope.maxHorsepower < plane.horsepower) {
      ret = false;
    }

    return ret;
  };


  //Planes db
  $scope.planes = [{
      'make': 'Piper',
      'model': 'Arrow',
      'modelNumber': 'PA-28R-180',
      'horsepower': 180,
      'gear': 'retractable',
    }, {
      'make': 'Piper',
      'model': 'Arrow',
      'modelNumber': 'PA-28R-200',
      'horsepower': 200,
      'gear': 'retractable',
    }, {
      'make': 'Piper',
      'model': 'Arrow III',
      'modelNumber': 'PA-28R-201',
      'horsepower': 200,
      'gear': 'retractable',
    }, {
      'make': 'Piper',
      'model': 'Cherokee',
      'modelNumber': 'PA-28-150',
      'horsepower': 150,
      'gear': 'fixed',
    }, {
      'make': 'Piper',
      'model': 'Cherokee',
      'modelNumber': 'PA-28-160',
      'horsepower': 160,
      'gear': 'fixed',
    }, ];
}