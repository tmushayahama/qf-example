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
    '$aside',
    function ($scope, $aside) {
     // $scope.remove = function () {
     // $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
     //  };
     $scope.listData = {};
     $scope.listData.newListItem = "";

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

     $scope.openComponentSettings = function (item) {
      var modalInstance = $aside.open({
       templateUrl: 'component-settings-modal.html',
       controller: 'ComponentSettingsCtrl as componentSettingsCtrl',
       scope: $scope,
       size: 'component-settings',
       placement: 'right',
       //backdrop: 'static',
       resolve: {
        Item: function () {
         return item;
        }
       }
      });
      modalInstance.result.then(function (result) {
       // $scope.item = result;
      }, function () {
       //('Modal dismissed at: ' + new Date());
      });
     };

     $scope.addOption = function () {
      if ($scope.listData.newListItem.length > 0) {
       $scope.component.options.unshift($scope.listData.newListItem);
       $scope.listData.newListItem = "";
      }
     };

     $scope.removeOption = function (option) {
      //console.log(index, ' - ', vm.formSrv.formItems.indexOf(component));
      $scope.component.options.splice($scope.component.options.indexOf($scope.component.options.indexOf(option), 1));
     };

     $scope.$watch('component.optionsText', function (text) {
      var x;
      $scope.component.options = (function () {
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
     });
    }
   ],
   link: function (scope, element, attr, ctrl) {
    scope.component = scope.item.component;
    scope.component.optionsText = scope.component.options.join('\n');

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

