
'use strict';
var previewFormCtrl = function (
        config,
        $uibModalInstance
        ) {
 var vm = this;

 vm.selectedDeviceIndex = 0;

 vm.portrait = true;

 vm.gridsterOpts = {
  columns: 12,
  mobileBreakPoint: 600,
  rowHeight: 30,
  defaultSizeX: 6,
  defaultSizeY: 7,
  resizable: {
   enabled: false,
  },
  draggable: {
   enabled: false,
  }
 };

 vm.devices = [
  {
   name: "Laptop 1024px",
   width: 1024,
   height: 900
  },
  {
   name: "Galaxy S5",
   width: 360,
   height: 640
  },
  {
   name: "Nexus 5X",
   width: 411,
   height: 731
  },
  {
   name: "Nexus 6P",
   width: 435,
   height: 773
  },
  {
   name: "iPhone 6",
   width: 375,
   height: 667
  },
  {
   name: "iPhone 5",
   width: 320,
   height: 568
  },
  {
   name: "iPhone 6 Plus",
   width: 414,
   height: 736
  },
  {
   name: "iPad",
   width: 768,
   height: 1024
  }
 ];

 vm.rotate = function () {
  vm.portrait = !vm.portrait;
 };

 vm.close = function () {
  $uibModalInstance.dismiss("cancel");
 };
};

previewFormCtrl.$inject = [
 'config',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('PreviewFormCtrl', previewFormCtrl);
