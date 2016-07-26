
'use strict';
var previewFormCtrl = function (
        config,
        formSrv,
        $uibModalInstance
        ) {
 var vm = this;
 vm.formSrv = angular.copy(formSrv);

 //adjust the height to cater for the handle
 vm.adjust = function () {
  angular.forEach(vm.formSrv.formItems, function (formItem) {
   if (formItem.gridMap.sizeY) {
    formItem.gridMap.sizeY -= 2;
   }
   // formItem.gridMap.row = null;
  });
 };

 vm.adjust();

 vm.selectedDeviceIndex = 0;

 vm.portrait = true;

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
 //vm.adjust();
};

previewFormCtrl.$inject = [
 'config',
 'formSrv',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('PreviewFormCtrl', previewFormCtrl);
