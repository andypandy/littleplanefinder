describe('controllers', function(){
  var scope, controller, routeParams, httpBackend, mockPlanes;

  beforeEach(module('myApp.controllers'));
  beforeEach(module('myApp.services'));
  
  beforeEach(inject(function($rootScope, $controller, $httpBackend) {
    scope = $rootScope.$new();
    controller = $controller;
    routeParams = {};
    httpBackend = $httpBackend;
    //mockPlanes = Planes;
  }));


  //UserCtrl
  describe('UserCtrl', function() {
    var UserCtrl;

    beforeEach(function() {
      UserCtrl = controller('UserCtrl', {$scope: scope });
    });

    it('should exist', function() {
      expect(UserCtrl).not.toBe(null);
    });
  });


  //PlaneCtrl
  describe('PlaneCtrl', function() {
    var PlaneCtrl;
    var mockPlanes = [{make:'cessna'}];
    var mockSearchFields = [{
      label: 'Make',
      field: 'make',
      type: 'string',
      visible: true
    }, {
      label: 'Cruise Speed (kts.)', //3
      field: 'cruiseSpeedKts',
      type: 'numeric',
      visible: true
    }];

/*
    beforeEach(function() {
      

      PlaneCtrl = controller('PlaneCtrl', {
        $scope: scope,
        $routeParams: routeParams,
        Planes: mockPlanes,
        SearchFields: mockSearchFields
      });

      
    });*/

    it('should exist', function() {
      PlaneCtrl = controller('PlaneCtrl', {$scope: scope, $routeParams: routeParams, Planes: mockPlanes, SearchFields: mockSearchFields});
      expect(PlaneCtrl).not.toBe(null);
    });


    it('should add filter placeholder to scope for all search fields', function() {
      PlaneCtrl = controller('PlaneCtrl', {$scope: scope, $routeParams: routeParams, Planes: mockPlanes, SearchFields: mockSearchFields});

      //if type=string, then it should be ''
      expect(scope.make).toBe('');

      //if type=numeric it should be {}
      expect(scope.cruiseSpeedKts).toEqual({});
    });


    it('should have a working search()', function() {
      httpBackend.expectGET('/api/v1/planes').respond(mockPlanes);
      
      PlaneCtrl = controller('PlaneCtrl', {$scope: scope, $routeParams: routeParams, Planes: mockPlanes, SearchFields: mockSearchFields});
      
      scope.$apply(function() {
        scope.search();
      });

      httpBackend.flush();
    });

  });

});