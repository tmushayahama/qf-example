
'use strict';
var qfLabCtrl = function (
        config,
        formSrv,
        $rootScope,
        $scope,
        $uibModal,
        $uibModalInstance
        ) {
 var vm = this;
 vm.formSrv = formSrv;

 vm.googleFormUrl = "https://docs.google.com/forms/u/0/d/1bypRIbC1w2w_VxCKZHldBOQAVv9Uw4yW6f9YOw3IrlA/edit";
 vm.googleFormUrl_Responses = "https://docs.google.com/forms/u/0/d/1bypRIbC1w2w_VxCKZHldBOQAVv9Uw4yW6f9YOw3IrlA/edit";
 vm.formScrapUrl = "https://www.konicaminolta.eu/en/business-solutions/support/printer-faq-support/contact-form.html";
 vm.previewData = function () {
  vm.formSrv.getGoogleFormResponses(vm.googleFormUrl_Responses).then(function (data) {
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

 vm.close = function () {
  $uibModalInstance.dismiss("cancel");
 };
};

qfLabCtrl.$inject = [
 'config',
 'formSrv',
 '$rootScope',
 '$scope',
 '$uibModal',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('QFLabCtrl', qfLabCtrl);
