angular.module('qfretouch').directive('qfComponent', ['$window', '$timeout',
 function ($window, $timeout) {
  'use strict';

  return {
   restrict: 'EA',
   replace: true,
   scope: {
    templateUrl: '@',
    component: '='
   },
   template: '<ng-include src="templateUrl"></ng-include>',
   controller: [
    '$scope',
    function ($scope) {
    }
   ],
   link: function (scope, element, attr, ctrl) {
   }
  };
 }
]);

