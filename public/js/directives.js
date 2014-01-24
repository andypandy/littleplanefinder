    angular.module('myApp.directives', [])
      .directive('numericSearchField', function() {
        function template() {
          return '<label>{{label}}</label><br>' + 
            '<input ng-model="field.min" placeholder="Min" size="4">' + 
            '<input ng-model="field.max" placeholder="Max" size="4">';
        }

        return {
          restrict: 'E',
          scope: {
            label: '@',
            field: '='
          },
          template: template(),
          /*link: function(scope, element, attrs) {
            console.log(scope);
          }*/
        };
      })


      .directive('selectSearchField',function($parse) {
        function template() {
          //return '<div ng-repeat="option in options">{{option}}</div>';
          return '<label>{{label}}</label><br>' + 
            '<select ng-model="field">' + 
            '<option ng-repeat="option in options" value="{{option.value}}">{{option.label}}</option>'+
            '</select>';
        }

        return {
          restrict: 'E',
          scope: {
            label: '@',
            field: '=',
            options: '='
          },
          template: template(),
          link: function(scope, element, attrs) {
            //scope.$watch('field', function(o,n) {}, true);
          }
        };
      });

