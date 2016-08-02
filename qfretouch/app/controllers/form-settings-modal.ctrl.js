
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

 vm.googleFormUrl = "https://docs.google.com/forms/u/0/d/1bypRIbC1w2w_VxCKZHldBOQAVv9Uw4yW6f9YOw3IrlA/edit"

 vm.previewData = function () {
  vm.formSrv.getGoogleFormResponses(vm.googleFormUrl).then(function (data) {
   var modalInstance = $uibModal.open({
    templateUrl: 'preview-data-modal.html',
    controller: 'PreviewDataCtrl as previewDataCtrl',
    scope: $scope,
    size: 'preview-form',
    // placement: 'right',
    //backdrop: 'static',
    resolve: {
     formResponses: function () {
      return data;
     }
    }
   });

   modalInstance.result.then(function (searchCriteria) {

   }, function () {
    //$log.info('Modal dismissed at: ' + new Date());
   });
  });
 };

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
