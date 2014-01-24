

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', [function() {
    //
  }]).
  controller('PlaneCtrl', ['$scope', '$http', 'Planes', 'SearchFields', function($scope, $http, Planes, SearchFields) {
    $scope.searchFields = SearchFields;
    $scope.searchFields.forEach(function(item, index) {
      if(item.field != '' && item.type != '') {
        if(item.type == 'numeric') {
          $scope[item.field] = {};    
        }

        if(item.type == 'select') {
          $scope[item.field] = '';
        }
      }
    });
    //$scope.cruiseSpeedKts = {};

    //Search page (find all planes)
    $scope.search = function() {
      
      //Stuff for showing/hiding "hidden" planes
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


    //Filter: for search fields
    $scope.searchFieldFilter = function(plane) {
      var ret = true;
      //console.log($scope.gear);

      
      $scope.searchFields.forEach(function(searchField, index) {
        if(searchField.field) {
          
          //Dropdown (type will be set to 'select')
          if(searchField.type == 'select') {
            //
            if($scope[searchField.field] && $scope[searchField.field] != plane[searchField.field]) {
              ret = false;
            }

          //Min/max numeric inputs (type will be set to 'numeric')
          } else if(searchField.type == 'numeric') {
            if($scope[searchField.field]) { //Only set `.field` (in services/planes.js) if you want to filter on it
              //If the field isn't blank
              if($scope[searchField.field].min !== undefined && $scope[searchField.field].min != '') {
                if($scope[searchField.field].min > plane[searchField.field]) {
                  ret = false;
                }
              }

              if($scope[searchField.field].max !== undefined && $scope[searchField.field].max != '') {
                if($scope[searchField.field].max < plane[searchField.field]) {
                  ret = false;
                }
              }
            }
          }
        }

      });

      return ret;
    };


    //Filter: hides where plane.hidden=true
    $scope.hiddenFilter = function(plane) {
      if($scope.showAllPlanes == false && plane.hidden == true) {
        return false;
      } else  {
        return true;
      }
    };





  }]);
