
'use strict';
var formSettingsCtrl = function (
        config,
        $scope,
        $uibModal,
        formSrv,
        $uibModalInstance
        ) {
 var vm = this;
 vm.formSrv = formSrv;

 vm.openComponentRule = function (componentRule) {
  if (!componentRule) {
   componentRule = {
    summary: "",
    active: true,
    criteria: [],
    action: []
   };
  }
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
    },
    formSrv: function () {
     return vm.formSrv;
    },
    ComponentRule: function () {
     return componentRule;
    }
   }
  });
  modalInstance.result.then(function (componentRule) {
   vm.formSrv.rules.componentRules.push(componentRule);
  }, function () {
   //('Modal dismissed at: ' + new Date());
  });
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.formSrv);
 };
 vm.close = function () {
  $uibModalInstance.dismiss("cancel");
 };

};

formSettingsCtrl.$inject = [
 'config',
 '$scope',
 '$uibModal',
 'formSrv',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('FormSettingsCtrl', formSettingsCtrl);
