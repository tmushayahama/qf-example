angular.module('qfretouch').directive('qfComponent', ['$window', '$timeout',
 function ($window, $timeout) {
  'use strict';

  return {
   restrict: 'EA',
   scope: {
    templateUrl: '@',
    index: '@',
    item: '=',
    removeComponent: '=',
    duplicateComponent: '='
   },
   template: '<ng-include src="templateUrl"></ng-include>',
   controller: [
    '$scope',
    function ($scope) {
     // $scope.remove = function () {
     // $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
     //  };

    }
   ],
   link: function (scope, element, attr, ctrl) {
    scope.component = scope.item.component;
    scope.getComponentWidth = function () {
     var width = element.width();
     var canvas = element.find('canvas.jSignature')
     canvas.css({
      width: width + 'px!important'
     });
     //canvas.attr('width', width)
     return width + 'px!important';
    };
   }
  };
 }
]);

