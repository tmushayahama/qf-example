
'use strict';
var componentSettingsCtrl = function (
        config,
        $scope,
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
 $scope.$watch(function () {
  return vm.item.component.componentStylesMap;
 }, function (componentStyles) {
  angular.forEach(componentStyles, function (componentStyle) {
   vm.item.component.componentStyles[componentStyle.controlName] = {};
   angular.forEach(componentStyle.controlStyles, function (style) {
    vm.item.component.componentStyles[componentStyle.controlName][style.name] = style.prepend + style.value + style.append;
   });
  });
 }, true);
};

componentSettingsCtrl.$inject = [
 'config',
 '$scope',
 'Item',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('ComponentSettingsCtrl', componentSettingsCtrl);
