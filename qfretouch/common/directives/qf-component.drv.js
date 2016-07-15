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

     var tmpList = [];

     for (var i = 1; i <= 6; i++) {
      tmpList.push({
       text: 'Item ' + i,
       value: i
      });
     }

     $scope.list = tmpList;


     $scope.sortingLog = [];

     $scope.sortableOptions = {
      handle: '.qf-sortable-drag-me',
      update: function (e, ui) {
       var logEntry = tmpList.map(function (i) {
        return i.value;
       }).join(', ');
       $scope.sortingLog.push('Update: ' + logEntry);
      },
      stop: function (e, ui) {
       // this callback has the changed model
       var logEntry = tmpList.map(function (i) {
        return i.value;
       }).join(', ');
       $scope.sortingLog.push('Stop: ' + logEntry);
      }
     };

     /*
      $scope.optionsText = formObject.options.join('\n');
      $scope.$watch('optionsText', function (text) {
      var x;
      $scope.options = (function () {
      var i, len, ref, results;
      ref = text.split('\n');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
      x = ref[i];
      if (x.length > 0) {
      results.push(x);
      }
      }
      return results;
      })();
      return $scope.inputText = $scope.options[0];
      });*/
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

