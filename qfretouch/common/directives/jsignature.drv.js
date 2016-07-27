angular.module('qfretouch').directive('jSignatureDirective', ['$window', '$timeout',
 function ($window, $timeout) {
  return {
   restrict: 'EA',
   replace: true,
   scope: {
    model: '=jSignature',
    penColor: '@',
    lineColor: '@',
    readonly: '='
   },
   link: function (scope, element, attrs, controller) {
    // Style undoButton
    var undoButton = function () {
     var undoButtonStyle = 'position:absolute;display:none;margin:0 !important;top:auto';
     var $undoButton = $('<button type="button" class="btn btn-xs btn-default" style="' + undoButtonStyle +
             '">Undo Last Stroke</button>').appendTo(this.$controlbarLower);
     var buttonWidth = $undoButton.width();
     $undoButton.css('left', Math.round((this.canvas.width - buttonWidth) / 2));
     return $undoButton;
    };

    // Create Settings Object
    var settings = {
     // UndoButton: undoButton
    };
    if (scope.lineColor) {
     settings['decor-color'] = scope.lineColor;
    }
    if (scope.penColor) {
     settings.color = scope.penColor;
    }
    //settings['decor-color'] = "transparent";
    //settings.width = 400;

    // Build jSignature Element
    element.jSignature(settings);

    //var signatureWidth = $(element).width();

    // element.resize();
    // Watch Model
    scope.$watch('model', function (newValue, oldValue) {
     if (typeof newValue !== 'undefined') {
      var value = newValue.split(',');
      if (value[1] && value[1].length > 0) {
       try {
        element.jSignature("setData", "data:" + newValue);
       } catch (e) {
        console.log('Nim: jSignature - Bad format while trying to setData', e);
       }
      } else {
       element.jSignature('reset');
      }
     }
    });

    // Watch readOnly
    scope.$watch('readonly', function (newValue, oldValue) {
     if (newValue === true) {
      element.jSignature('disable');
      // Hide undo button
      element.find('button').css({'display': 'none'});
     } else {
      element.jSignature('enable');
      var currentModel = scope.model.split(',');
      // Show undo button only if there are actions to undo?
      if (currentModel[1] && currentModel[1].length > 0) {
       element.find('button').css({'display': 'block'});
      }
     }
    });

    // Bind to jSignature Event
    element.bind('change', function (e) {
     // $timeout, 100, true because event happens outside angular's digest cycle
     // and change is called on setData
     $timeout(function () {
      // getData returns an array of [mimetype, string of jSignature's custom Base30-compressed format]
      var dataPair = element.jSignature("getData", "base30");
      scope.model = dataPair.join(",");
     }, 100, true);
    });
   }
  };
 }
]);



/*


 angular.module('qfretouch').directive('jSignatureDirective', ['$window', '$timeout',
 function ($window, $timeout) {
 'use strict';

 //var signaturePad, canvas, element, EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
 return {
 restrict: 'E',
 template: '<div id="qf-0" class="qf-signature"></div>',
 //transclude: true,
 //replace: true,
 scope: {
 sig: '=',
 signatureId: '@',
 width: '@',
 height: '@',
 color: '@',
 bgColor: '@',
 lineWidth: '@',
 cssclass: '@',
 save: '=',
 reset: '=',
 getData: '='
 },
 link: function ($scope, $element) {

 console.log('jSignatureDirective: link');
 console.dir($scope, $element);

 $scope.initialized = false;

 var options = {
 'decor-color': null,
 //width: $scope.width,
 // height: $scope.height,
 // color: $scope.color,
 //'background-color': $scope.bgColor,
 //lineWidth: $scope.lineWidth,
 //cssclass: $scope.cssclass
 };

 $scope.initialize = function () {
 if (!$scope.initialized) {
 // var signatureDiv =
 //$compile(template)(scope)
 var signatureElement = //$('#' + $scope.signatureId);
 //'<div id="'+ scope.signatureId+'" class="qf-signature"></div>''
 $element[0].jSignature(options);
 $element[0].jSignature.resize();
 $scope.initialized = true;
 }
 };

 $scope.reset = function () {
 console.log('reset!!!');
 $element.jSignature('reset');
 };

 $scope.getData = function () {
 //console.log('getData!!!');
 //var datapair = $element.jSignature('getData', 'base30');
 //var svg = $element.jSignature('getData', 'svg');
 // console.dir(datapair);
 //alert(datapair);
 //              alert(svg);
 //$scope.save(svg);


 var data = $element.jSignature("getData", "svgbase64");
 // build the image...
 //var i = new Image();
 return data[0] + "," + data[1];
 };

 $scope.setData = function (sig) {
 console.log('setData!!!');
 if (sig) {
 datapair = sig;
 }
 console.log(datapair);
 $element.jSignature('setData', 'data:' + datapair.join(','));
 };


 $scope.initialize();
 //$element.find('#dr-signature').resize();
 //            $scope.setData();


 $scope.$watch('sig', function (sig) {
 if (sig) {
 console.log('watch if ' + sig);
 $scope.setData(sig);
 //alert('watch if ' + sig);

 return;
 }
 console.log('watch else');

 });


 }
 };
 }
 ]);
 */

