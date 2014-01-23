

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', [function() {
    //
  }]).
  controller('PlaneCtrl', ['$scope', '$http', 'Planes', 'SearchFields', function($scope, $http, Planes, SearchFields) {
    $scope.searchFields = SearchFields;

    //Search page (find all planes)
    $scope.search = function() {
      $scope.showAllPlanes = false;
      $scope.$watch('showAllPlanes', function() {
        $scope.showAllPlanesText = $scope.showAllPlanes ? 'Rehide hidden planes' : 'Show hidden planes';
      });

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
        $scope.showAllPlanes = $scope.showAllPlanes ? false : true;
        //$scope.showAllPlanesText = $scope.showAllPlanes ? 'Rehide hidden planes' : 'Show hidden planes';
      };


      //Toggle an item hidden
      $scope.toggleHidden = function(plane) {
        plane.hidden = plane.hidden ? false : true;
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

    //If its numeric, show a max and min

    //If its text, show select

    //if($scope['min' + field] && $scope.['min' + field] > plane[field]) {}


    //Horsepower filter
    $scope.searchFieldFilter = function(plane) {
      var ret = true;

      
      $scope.searchFields.forEach(function(searchField, index) {
        if(searchField.field) {
          if(searchField.type == 'numeric') {
            if($scope['min'+searchField.field] && $scope['min'+searchField.field] > plane[searchField.field]) {
              ret = false;
            }

            if($scope['max'+searchField.field] && $scope['max'+searchField.field] < plane[searchField.field]) {
              ret = false;
            }
          }
        }

      });

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
