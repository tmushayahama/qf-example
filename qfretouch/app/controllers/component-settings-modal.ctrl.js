
'use strict';
var componentSettingsCtrl = function (
        config,
        Item,
        $uibModalInstance
        ) {
 var vm = this;
 vm.item = Item;
 vm.ok = function () {
  $uibModalInstance.close(vm.component);
 };
 vm.close = function () {
  $uibModalInstance.dismiss("cancel");
 };
};

componentSettingsCtrl.$inject = [
 'config',
 'Item',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('ComponentSettingsCtrl', componentSettingsCtrl);
