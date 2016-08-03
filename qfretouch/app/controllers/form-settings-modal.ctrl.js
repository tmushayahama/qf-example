
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

 vm.ok = function () {
  $uibModalInstance.close(vm.form);
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
