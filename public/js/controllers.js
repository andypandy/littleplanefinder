/* Controllers */

angular.module('myApp.controllers', []).

  controller('UserCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.showLoginForm = false;
    $scope.loginFormData = {};


    //Toggles show/hide login form/admin menu
    $scope.toggleShowLoginForm = function() {
      if($scope.showLoginForm == true) {
        $scope.showLoginForm = false;
      } else {
        $scope.showLoginForm = true;
      }
    };


    //Login form submit handler
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


    //Logout - redirects to /logout
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



    //Edit plane page form submit handler
    $scope.updatePlane = function() {
      var plane = $scope.plane;
      plane.$update(function(data) {
        $scope.plane = {};
        $location.path('#!/search');
      });
    };



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



    //Opens pdf in modal pdf previewer
    $scope.previewFile = function(url) {
      if(url != undefined) {
        console.log('Open preview: ' + url);
        
        var height = $(window).height()-40-100; //-40 for padding, -100 for ad
        var width = $(window).width();
        width = width-(width*.3);

        var html = '<div class="poh-ad-container">';
        html += '<div class="poh-ad" style="float: left;"><a href="http://www.amazon.com/gp/product/B0011Z9PM2/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0011Z9PM2&linkCode=as2&tag=woqu-20"><img src="img/ads/poh_ad_david_clark.png" /></a></div>';
        html += '<div class="poh-ad" style="float: right;"><a href="http://www.amazon.com/gp/product/B0052ULBLK/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0052ULBLK&linkCode=as2&tag=woqu-20"><img src="img/ads/poh_ad_lightspeed.png" /></a></div>';
        html+= '</div>';
        html += '<iframe src="http://docs.google.com/viewer?url=' + url + '&embedded=true" width="'+width+'" height="'+height+'" style="border: none;"></iframe>';
        modal.fill(html);
        modal.resize();
        modal.open();
        //<iframe src="http://docs.google.com/viewer?url=http%3A%2F%2Fmrwebman.com%2Faviation%2Fcessna%2Fmanuals%2F182_poh_66.pdf&embedded=true" width="600" height="780" style="border: none;"></iframe>
      }
    };



    //Stuff for showing/hiding "hidden" planes
    $scope.showAllPlanes = false;
    $scope.$watch('showAllPlanes', function() {
      $scope.showAllPlanesText = $scope.showAllPlanes ? 'Rehide hidden planes' : 'Show hidden planes';
    });



    //Default sort options
    $scope.sort = {
      column: ['make', 'model', 'modelNo'],
      descending: false
    };



    //Search page (find all planes)
    $scope.search = function() {
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
    };



    //Edit plane page init - gets one plane and prefills edit form
    $scope.editPlane = function() {
      //$scope.plane = {"make":"cessna"};
      console.log($routeParams);
      Planes.get({
        planeId: $routeParams.planeId
      }, function(plane) {
        $scope.plane = plane;
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
