angular.module('qfretouch').directive('qfDatepicker', ['$window',
 function ($window) {
  'use strict';

  var signaturePad, canvas, element, EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
  return {
   restrict: 'EA',
   templateUrl: 'qfretouch/common/views/templates/datepicker.drv.tpl.html',
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
     $scope.today = function () {
      $scope.dt = new Date();
     };
     $scope.today();

     $scope.clear = function () {
      $scope.dt = null;
     };

     $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
     };

     $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
     };

     // Disable weekend selection
     function disabled(data) {
      var date = data.date,
              mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
     }

     $scope.toggleMin = function () {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
     };

     $scope.toggleMin();

     $scope.open1 = function () {
      $scope.popup1.opened = true;
     };

     $scope.open2 = function () {
      $scope.popup2.opened = true;
     };

     $scope.setDate = function (year, month, day) {
      $scope.dt = new Date(year, month, day);
     };

     $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
     $scope.format = $scope.formats[0];
     $scope.altInputFormats = ['M!/d!/yyyy'];

     $scope.popup1 = {
      opened: false
     };

     $scope.popup2 = {
      opened: false
     };

     var tomorrow = new Date();
     tomorrow.setDate(tomorrow.getDate() + 1);
     var afterTomorrow = new Date();
     afterTomorrow.setDate(tomorrow.getDate() + 1);
     $scope.events = [
      {
       date: tomorrow,
       status: 'full'
      },
      {
       date: afterTomorrow,
       status: 'partially'
      }
     ];

     function getDayClass(data) {
      var date = data.date,
              mode = data.mode;
      if (mode === 'day') {
       var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

       for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
         return $scope.events[i].status;
        }
       }
      }

      return '';
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

