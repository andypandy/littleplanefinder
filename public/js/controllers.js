

/* Controllers */

angular.module('myApp.controllers', []).

  controller('UserCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.showLoginForm = false;
    $scope.loginFormData = {};

    $scope.toggleShowLoginForm = function() {
      if($scope.showLoginForm == true) {
        $scope.showLoginForm = false;
      } else {
        $scope.showLoginForm = true;
      }
    };


    $scope.login = function() {
      $http({
        method: 'POST',
        url: '/login',
        data: $scope.loginFormData,
      })
      .success(function(data) {
        if(data.success == 1) {
          window.location.reload();
        } else {
          $scope.loginErrorMessage = data.message;
        }
      });
    };


    $scope.logout = function() {
      window.location.href = '/logout';
    };
  }]).


  //Planes!
  controller('PlaneCtrl', ['$scope', '$routeParams', '$location', '$http', 'Planes', 'SearchFields', function($scope, $routeParams, $location, $http, Planes, SearchFields) {
    
    //Setup search fields and placeholder $scope vars for filtering
    $scope.searchFields = SearchFields;
    $scope.searchFields.forEach(function(item, index) {
      if(item.field != '' && item.type != '') {
        if(item.type == 'numeric') {
          $scope[item.field] = {};    
        }

        if(item.type == 'select' || item.type == 'string') {
          $scope[item.field] = '';
        }
      }
    });



    $scope.editPlane = function() {
      $scope.plane = {"make":"cessna"};
      //console.log($routeParams);
      /*Planes.get({
        planeId: $routeParams.planeId
      }, function(plane) {
        $scope.plane = plane;
      });*/
    };




    //Search page (find all planes)
    $scope.search = function() {
      
      //Stuff for showing/hiding "hidden" planes
      $scope.showAllPlanes = false;
      $scope.$watch('showAllPlanes', function() {
        $scope.showAllPlanesText = $scope.showAllPlanes ? 'Rehide hidden planes' : 'Show hidden planes';
      });


      //Default sort options
      $scope.sort = {
        column: ['make', 'model'],
        descending: false
      };


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


      //Change sort column/change sort direction
      $scope.changeSort = function(field) {
        if($scope.sort.column == field) {
          $scope.sort.descending = !$scope.sort.descending;
        } else {
          $scope.sort.column = field;
          $scope.sort.descending = false;
        }
      };


      $scope.previewFile = function(url) {
        if(url != undefined) {
          console.log('Open preview: ' + url);
        }
      };


      //Helpers that add 
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



    //Delete a plane
    $scope.removePlane = function(plane) {
      //Call $remove from (ngresourse)
      plane.$remove();
      
      //Remove from current $scope
      for (var i in $scope.planes) {
          if ($scope.planes[i] === plane) {
              $scope.planes.splice(i, 1);
          }
      }
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
      
      $scope.searchFields.forEach(function(searchField, index) {
        if(searchField.field) {
          
          //Text string searches
          if(searchField.type == 'string') {
            if(plane[searchField.field] != undefined) {
              if(plane[searchField.field].toLowerCase().indexOf($scope[searchField.field].toLowerCase()) == -1) {
                ret = false;
              }
            }

          //Select dropdowns
          } else if(searchField.type == 'select') {
            //
            if($scope[searchField.field] && $scope[searchField.field] != '') {
              if($scope[searchField.field] != plane[searchField.field]) {
                ret = false;
              }
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
