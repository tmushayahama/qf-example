angular.module('qfretouch').directive('qfComponent', ['$window', '$timeout',
 function ($window, $timeout) {
  'use strict';

  return {
   restrict: 'EA',
   scope: {
    templateUrl: '@',
    component: '='
   },
   template: '<ng-include src="templateUrl"></ng-include>',
   controller: [
    '$scope',
    function ($scope) {
     $scope.remove = function () {
      // $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
     };
    }
   ],
   link: function (scope, element, attr, ctrl) {
   }
  };
 }
]);

