function AppCtrl($scope) {

}


//Controller for searching
function PlaneCtrl($scope, $http) {
  /*
   *  Controllers
   */

  //Search page (find all planes)
  $scope.search = function() {
    $http({method: 'GET', url: '/api/v1/planes'}).
      success(function(data, status, headers, config) {
        $scope.planes = data;
      }).
      error(function(data, status, headers, config) {
        //
      });
  };


  //Create new plane (form submit handler)
  $scope.create = function() {
    console.log('create 26');
    $http({method: 'POST', url: '/api/v1/planes', data: $scope.plane}).
      success(function(data, status, headers, config) {
        console.log('success 29');
        $scope.plane = {};
      }).
      error(function(data, status, headers, config) {
        console.log('fail 33');
      });
  };




  /*
   *  Filters
   */

  //Horsepower filter
  $scope.horsepowerFilter = function(plane) {
    var ret = true;

    if ($scope.minHorsepower && $scope.minHorsepower > plane.horsepower) {
      ret = false;
    }

    if ($scope.maxHorsepower && $scope.maxHorsepower < plane.horsepower) {
      ret = false;
    }

    return ret;
  };
}

//Edit controller