angular.module('qfretouch').directive('pictureBox', ['$window',
 function ($window) {
  'use strict';

  var signaturePad, canvas, element, EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
  return {
   restrict: 'EA',
   templateUrl: 'qfretouch/common/views/templates/picturebox-picker.tpl.html',
   replace: true,
   scope: {
    setfile: '=',
    clear: '=',
    dataurl: '=',
    height: '@',
    width: '@'
   },
   controller: [
    '$scope',
    function ($scope) {
     $scope.setFile = function (element) {
      $scope.currentFile = element.files[0];
      var reader = new FileReader();

      reader.onload = function (event) {
       $scope.image_source = event.target.result;
       $scope.$apply()

      }
      reader.readAsDataURL(element.files[0]);
     }
    }
   ],
   link: function (scope, element) {
    canvas = element.find('canvas')[0];
    scope.signaturePad = new SignaturePad(canvas);

    if (!scope.height)
     scope.height = 220;
    if (!scope.width)
     scope.width = 568;

    if (scope.signature && !scope.signature.$isEmpty && scope.signature.dataUrl) {
     scope.signaturePad.fromDataURL(scope.signature.dataUrl);
    }

    scope.onResize = function () {
     var canvas = element.find('canvas')[0];
     var ratio = Math.max($window.devicePixelRatio || 1, 1);
     canvas.width = canvas.offsetWidth * ratio;
     canvas.height = canvas.offsetHeight * ratio;
     canvas.getContext("2d").scale(ratio, ratio);
    }

    scope.onResize();

    angular.element($window).bind('resize', function () {
     scope.onResize();
    });
   }
  };
 }
]);

