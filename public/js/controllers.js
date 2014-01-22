

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', [function() {
    //
  }]).
  controller('PlaneCtrl', ['$scope', '$http', 'Planes', 'SearchFields', function($scope, $http, Planes, SearchFields) {
    console.log(SearchFields);


    /*
     *  Controllers
     */

    //Search page (find all planes)
    $scope.search = function() {
      //Visible fields defaults
      $scope.showHorsepower = true;
      $scope.searchFields = SearchFields;

      Planes.query(function(planes) {
        planes = addFullFuelUsableWeight(planes);

        $scope.planes = planes;
      });
    };


    //Create new plane (form submit handler)
    $scope.create = function() {
      console.log('create 26');
      $http({method: 'POST', url: '/api/v1/planes', data: $scope.plane}).
        success(function(data, status, headers, config) {
          $scope.plane = {};
        }).
        error(function(data, status, headers, config) {
          //todo
        });
    };




    /*
     *  Helpers
     */
    //Returns fullFuelUsableWeight for a plane
    //Gross weight - weight of fuel - empty weight = full fuel usable weight
    //weight of fuel = gallons of fuel * 6 lbs
    function addFullFuelUsableWeight(planes) {
      console.log(planes);
      planes.forEach(function(plane, i) {
        if(plane.grossWeightPounds && plane.emptyWeightPounds && plane.fuelCapacityGallons) {
          planes[i].fullFuelUsableWeight = (plane.grossWeightPounds-plane.emptyWeightPounds)-(plane.fuelCapacityGallons*6);
        }
      });

      return planes;
    }





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




  }]);
