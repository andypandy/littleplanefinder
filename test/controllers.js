describe('controllers', function(){
  var scope, controller, routeParams, httpBackend, Planes;

  beforeEach(module('myApp.controllers'));
  beforeEach(module('myApp.services'));
  
  beforeEach(inject(function($rootScope, $controller, $httpBackend, _Planes_) {
    scope = $rootScope.$new();
    controller = $controller;
    routeParams = {};
    httpBackend = $httpBackend;
    Planes = _Planes_;
  }));


  //UserCtrl
  describe('UserCtrl', function() {
    var UserCtrl;

    it('should exist', function() {
      UserCtrl = controller('UserCtrl', {$scope: scope });
      expect(UserCtrl).not.toBe(null);
    });

    it('should toggle showing login form', function() {
      UserCtrl = controller('UserCtrl', {$scope: scope });
      scope.showLoginForm = true;
      scope.toggleShowLoginForm();
      expect(scope.showLoginForm).toBe(false);
    });

    it('should post login data on login()', function() {
      httpBackend.expectPOST('/login').respond({success:0, message:'Error'});

      UserCtrl = controller('UserCtrl', {$scope: scope });

      scope.login();

      httpBackend.flush();

      expect(scope.loginErrorMessage).toBe('Error');
    });


  });


  //PlaneCtrl
  describe('PlaneCtrl', function() {
    var PlaneCtrl;
    var mockPlanes = [{
      make:'cessna',
      grossWeightPounds: 1500,
      emptyWeightPounds: 1000,
      fuelCapacityGallons: 30
    }];
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


    //Working .search()
    //1. Gets planes, 2. add full fuel usable weight, 3. adds empty weight
    it('should have a working search()', function() {
      httpBackend.expectGET('api/v1/planes').respond(mockPlanes);
      
      PlaneCtrl = controller('PlaneCtrl', {$scope: scope, $routeParams: routeParams, Planes: Planes, SearchFields: mockSearchFields});

      scope.search();

      httpBackend.flush();

      expect(scope.planes[0].make).toBe('cessna');
      expect(scope.planes[0].fullFuelUsableWeight).toBe(320);
      expect(scope.planes[0].usableWeight).toBe(500);
    });


    describe('editPlane()', function() {
      it('should run a get req and return a plane to scope.plane', function() {
        routeParams = {planeId: 123};
        var mockPlane = {make: 'cessna'};

        httpBackend.expectGET('api/v1/planes/123').respond(mockPlane);
        
        PlaneCtrl = controller('PlaneCtrl', {$scope: scope, $routeParams: routeParams, Planes: Planes, SearchFields: mockSearchFields});

        scope.editPlane();

        httpBackend.flush();

        expect(scope.plane.make).toEqual(mockPlane.make);
      });
    });


    //create - form submit handler
    describe('create()', function() {
      it('should post to api and empty scope.plane', function() {

        httpBackend.expectPOST('/api/v1/planes').respond(200);
        
        PlaneCtrl = controller('PlaneCtrl', {$scope: scope, $routeParams: routeParams, Planes: Planes, SearchFields: mockSearchFields});

        scope.create();

        httpBackend.flush();

        expect(scope.plane).toEqual({});
      });
    });



    //remove
    xdescribe('removePlane()', function() {
      it('should del to api', function() {
        var plane = scope.plane;
        
        httpBackend.expectDELETE('/api/v1/planes').respond(200);
        
        PlaneCtrl = controller('PlaneCtrl', {$scope: scope, $routeParams: routeParams, Planes: Planes, SearchFields: mockSearchFields});

        scope.removePlane(plane);

        httpBackend.flush();
      });
    });

  });

});