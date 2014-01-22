

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', [function() {
    //
  }]).
  controller('PlaneCtrl', ['$scope', '$http', 'Planes', 'SearchFields', function($scope, $http, Planes, SearchFields) {


    //Search page (find all planes)
    $scope.search = function() {
      //Visible fields defaults
      $scope.searchFields = SearchFields;
      $scope.hiddenPlanes = [];
      $scope.hiddenPlanesPlaceholder = [];
      $scope.showAllPlanesText = 'Show hidden planes';
      $scope.showAllPlanes = false;


      //Get planes from Planes service
      Planes.query(function(planes) {
        //Add display fields
        planes.forEach(function(plane, index) {
          planes[index].hidden = false;
        });

        //Add full fuel usable weight
        addFullFuelUsableWeight(planes, function(updatedPlanes) {
          planes = updatedPlanes;

          //Add usable weight
          addUsableWeight(planes, function(updatedPlanes) {
            $scope.planes = updatedPlanes;
          });
        });
      });


      //Toggle show all planes
      $scope.toggleShowAllPlanes = function() {
        if($scope.showAllPlanes == false) {
          //Put items in $scope.hiddenPlanes into placeholder and empty that array
          //$scope.hiddenPlanesPlaceholder = $scope.hiddenPlanes;
          $scope.showAllPlanesText = 'Rehide hidden planes';
          //$scope.hiddenPlanes = [];
          $scope.showAllPlanes = true;
        } else {
          //Put planes back in $scope.hiddenPlanes
          //$scope.hiddenPlanes = $scope.hiddenPlanesPlaceholder;
          $scope.showAllPlanesText = 'Show hidden planes';
          //$scope.hiddenPlanesPlaceholder = [];
          $scope.showAllPlanes = false;
        }
      };


      //Toggle an item hidden
      $scope.toggleHidden = function(plane) {
        if(plane.hidden == true) {
          plane.hidden = false;
        } else {
          plane.hidden = true;
        }
      };


      //Returns fullFuelUsableWeight for a plane
      //Gross weight - weight of fuel - empty weight = full fuel usable weight
      //weight of fuel = gallons of fuel * 6 lbs
      function addFullFuelUsableWeight(planes, callback) {
        planes.forEach(function(plane, i) {
          if(plane.grossWeightPounds && plane.emptyWeightPounds && plane.fuelCapacityGallons) {
            planes[i].fullFuelUsableWeight = (plane.grossWeightPounds-plane.emptyWeightPounds)-(plane.fuelCapacityGallons*6);
          }
        });

        return callback(planes);
      }

      function addUsableWeight(planes, callback) {
        planes.forEach(function(plane, i) {
          if(plane.grossWeightPounds && plane.emptyWeightPounds) {
            planes[i].usableWeight = plane.grossWeightPounds-plane.emptyWeightPounds;
          }
        });

        return callback(planes);
      }
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


    //plane._id's are added to/removed from this when toggled hidden or visible
    $scope.hiddenFilter = function(plane) {
      if($scope.showAllPlanes == false && plane.hidden == true) {
        return false;
      } else  {
        return true;
      }
    };





  }]);
