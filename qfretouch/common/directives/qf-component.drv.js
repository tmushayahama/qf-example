angular.module('qfretouch').directive('qfComponent', ['$window', '$timeout',
 function ($window, $timeout) {
  'use strict';

  return {
   restrict: 'EA',
   scope: {
    templateUrl: '@',
    index: '@',
    item: '=',
    formSrv: '=',
    removeComponent: '=',
    duplicateComponent: '='
   },
   template: '<ng-include src="templateUrl"></ng-include>',
   controller: [
    '_',
    '$scope',
    '$aside',
    function (_, $scope, $aside) {
     // $scope.remove = function () {
     // $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
     //  };
     $scope.listData = {};
     $scope.listData.newListItem = "";


     // }

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
        },
        formSrv: function () {
         return $scope.formSrv;
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


     $scope.signature = {
      value: '',
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

     $scope.$watch('item.componentStylesMap', function (componentStyles) {
      angular.forEach(componentStyles, function (componentStyle) {
       $scope.item.componentStyles[componentStyle.controlName] = {};
       angular.forEach(componentStyle.controlStyles, function (style) {
        $scope.item.componentStyles[componentStyle.controlName][style.name] = style.prepend + style.value + style.append;
       });
      });
      // console.log(vm.formSrv.formStyles, "");
     }, true);

     $scope.onChange = function (e, fileList) {
      alert('this is on-change handler!');
     };

     $scope.pictureItem = {
      file: {},
      removeImage: function () {
       $scope.pictureItem.file = {};
       var mainControlStyles = _.find($scope.item.componentStylesMap, function (item) {
        return item.controlName === "main";
       });
       var background = _.find(mainControlStyles.controlStyles, function (item) {
        return item.name === "background-image";
       });
       background.value = "";
      },
      onLoad: function (e, reader, file, fileList, fileOjects, fileObj) {
       //alert('this is handler for file reader onload event!');
       console.log("file", $scope.pictureItem.file);
      }
     }

     $scope.$watch('pictureItem.file', function (file) {
      if (!file.base64) {
       return;
      }
      //var background = _.find($scope.item.componentStylesMap, function (item) {
      // return item.name === "background-image";
      //});
      var mainControlStyles = _.find($scope.item.componentStylesMap, function (item) {
       return item.controlName === "main";
      });

      var background = _.find(mainControlStyles.controlStyles, function (item) {
       return item.name === "background-image";
      });

      background.value = "url(data:" + file.filetype + ";base64," + file.base64 + ')';
      //console.log(background, "");]
      $scope.component.inputText = background.value;
     }, true);


     $scope.uploadImageItem = {
      file: {},
      removeImage: function () {
       $scope.component.inputText = '';
      }
     };

     $scope.$watch('uploadImageItem.file', function (file) {
      if (!file.base64) {
       return;
      }
      $scope.component.inputText = "url(data:" + file.filetype + ";base64," + file.base64 + ')';
     }, true);

    }
   ],
   link: function (scope, element, attr, ctrl) {
    scope.component = scope.item.component;

    scope.applyRule = function (action) {
     switch (action) {
      case "hide":
       element.parent().css('display', 'none');
       break;
      case "disable":
       element.parent().css("pointer-events", "none")
               .css("opacity", 0.3);
     }
    };
    //if($scope.item.rules.selectedInitialConditionOptions) {
    for (var i in scope.item.rules.selectedInitialConditionOptions) {
     scope.applyRule(scope.item.rules.selectedInitialConditionOptions[i].action);
    }

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

