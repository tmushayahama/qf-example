'use strict';
var designerCtrl = function (
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

 vm.formName = "Untitled Form";

 vm.previewForm = function () {
  var modalInstance = $aside.open({
   templateUrl: 'preview-form-modal.html',
   controller: 'PreviewFormModalCtrl as previewFormCtrl',
   scope: $scope,
   size: 'lg',
   placement: 'right',
   //backdrop: 'static',
  });

  modalInstance.result.then(function (searchCriteria) {

  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 var checkbox, textbox;
 textbox = $builder.addFormObject('default', {
  id: 'textbox',
  component: 'textInput',
  label: 'Name',
  description: 'Your name',
  placeholder: 'Your name',
  required: true,
  editable: false
 });
 checkbox = $builder.addFormObject('default', {
  id: 'checkbox',
  component: 'checkbox',
  label: 'Pets',
  description: 'Do you have any pets?',
  options: ['Dog', 'Cat']
 });
 $builder.addFormObject('default', {
  component: 'sampleInput'
 });
 $scope.form = $builder.forms['default'];
 $scope.input = [];
 $scope.defaultValue = {};
 $scope.defaultValue[textbox.id] = 'default value';
 $scope.defaultValue[checkbox.id] = [true, true];

 $scope.submit = function () {
  return $validator.validate($scope, 'default').success(function () {
   return console.log('success');
  }).error(function () {
   return console.log('error');
  });
 };
};


designerCtrl.$inject = [
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

angular.module("qfretouch").controller('DesignerCtrl', designerCtrl);
