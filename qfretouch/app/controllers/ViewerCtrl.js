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
        FormManager
        //qfretouchAuth,
        ) {
 var vm = this;

 vm.formManager = new FormManager();
 vm.formId = $stateParams.formId;
 vm.formContent;

 vm.formManager.getForm(vm.formId).then(function (data) {
  vm.formContent = data;
 });

 vm.previewForm = function () {
  var modalInstance = $aside.open({
   templateUrl: 'form-summary-modal.html',
   controller: 'FormSummaryModalCtrl as previewFormCtrl',
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
 'FormManager'
];

angular.module("qfretouch").controller('ViewerCtrl', viewerCtrl);
