    angular.module('myApp.directives', [])
      
      //Numeric fields have a min and a max box
      .directive('numericSearchField', function() {
        function template() {
          return '<label>{{label}}</label><br>' + 
            '<input ng-model="field.min" placeholder="Min" size="8">' + 
            '<input ng-model="field.max" placeholder="Max" size="8">';
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

      /*
      //Text search field
      .directive('textSearchField', function() {
        function template() {
          return '<label>{{label}}</label><br>' + 
            '<input ng-model="field" placeholder="Enter text">';
        }

        return {
          restrict: 'E',
          scope: {
            label: '@',
            field: '='
          },
          template: template(),
          link: function(scope, element, attrs) {
            console.log(scope);
          }
        };
      })*/


      //Text search field
      .directive('textSearchField', function() {
        function template() {
          return '<label>make</label><br>' + 
            '<input ng-model="field" placeholder="Enter text">';
        }

        return {
          restrict: 'E',
          template: template(),
          /*link: function(scope, element, attrs) {
            console.log(scope);
          }*/
        };
      })

      //'<select ng-model="$parent[field]">'




      //Created <select> dropdown w/options
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

