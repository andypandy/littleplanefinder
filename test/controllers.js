describe("Unit Testing Examples", function() {

  beforeEach(angular.mock.module('myApp'));

  it('should have a LoginCtrl controller', function() {
    
    expect(App.LoginCtrl).toBeDefined();
  });
});