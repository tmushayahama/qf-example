'use strict';
var viewerCtrl = function (
        config,
        $builder,
        $validator,
        $scope,
        $q,
        $rootScope,
        $state,
        $stateParams,
        $log,
        localStorageService,
        $timeout,
        $uibModal,
        $aside,
        FormSrv
        //qfretouchAuth,
        ) {
 var vm = this;

 vm.FormSrv = new FormSrv();
 vm.formId = $stateParams.formId;
 vm.formContent;

 //remove this part
 vm.formContent =
         {
          formName: "Untitled Form",
          formDescription: "A sample Form"
         };

 vm.FormSrv.getForm(vm.formId).then(function (data) {
  vm.formContent = data;
 });

 vm.viewFormSummary = function () {
  var modalInstance = $aside.open({
   templateUrl: 'form-summary-modal.html',
   controller: 'FormSummaryModalCtrl as formSummaryModalCtrl',
   size: 'lg',
   placement: 'right',
   //backdrop: 'static',
  });

  modalInstance.result.then(function (searchCriteria) {

  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };
}

viewerCtrl.$inject = [
 'config',
 '$builder',
 '$validator',
 '$scope',
 '$q',
 '$rootScope',
 '$state',
 '$stateParams',
 '$log',
 'localStorageService',
 '$timeout',
 '$uibModal',
 '$aside',
 'FormSrv'
];

angular.module("qfretouch").controller('ViewerCtrl', viewerCtrl);
