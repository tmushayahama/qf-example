
'use strict';
var componentSettingsCtrl = function (
        config,
        $scope,
        $uibModal,
        Item,
        $uibModalInstance
        ) {
 var vm = this;
 vm.item = Item;

 vm.openComponentRule = function (item) {
  var modalInstance = $uibModal.open({
   templateUrl: 'component-rule-modal.html',
   controller: 'ComponentRuleCtrl as componentRuleCtrl',
   scope: $scope,
   size: 'component-rule',
   // placement: 'right',
   //backdrop: 'static',
   resolve: {
    Item: function () {
     return vm.item;
    }
   }
  });
  modalInstance.result.then(function (result) {
   // $scope.item = result;
  }, function () {
   //('Modal dismissed at: ' + new Date());
  });
 };

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
 '$uibModal',
 'Item',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('ComponentSettingsCtrl', componentSettingsCtrl);
