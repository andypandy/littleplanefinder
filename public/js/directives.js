angular.module('myApp.directives', []).
  directive('lpfSearchField', function() {
    return {
      restrict: 'E',
      scope: {
        sf: '='
      },
      //template: 'Type: {{type}}, label: {{label}}, field: {{field}}'
      template: '<label for="form-{{sf.field}}">{{sf.label}}</label><br><input ng-model="sf.field.min" size="4" placeholder="Min" id="form-{{sf.field}}" /><input ng-model="sf.field.max" size="4" placeholder="max" />'
    };
  });


