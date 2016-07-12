
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


