'use strict';
var designerCtrl = function (
        config,
        //$builder,
        // $validator,
        components,
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
 vm.gridsterOpts = {
  columns: 12,
  mobileBreakPoint: 600,
  rowHeight: 30,
  defaultSizeX: 6,
  defaultSizeY: 7,
  draggable: {
   enabled: true,
   handle: '.qf-grab-me',
   start: function (event, $element, widget) {}, // optional callback fired when drag is started,
   drag: function (event, $element, widget) {},
   stop: function (event, $element, widget) {
    //sortComponents();
   }
  }
 };

 vm.components = components;
 vm.formItems = [];

 vm.clearComponent = function () {
  vm.components = [];
 };

 vm.addComponent = function (component) {
  var formItem = angular.copy(component);
  formItem.gridMap = {
   sizeX: 6,
   sizeY: 7
  };
  vm.formItems.push(formItem);
 };

 vm.duplicateComponent = function (component) {
  var formItem = angular.copy(component);
  formItem.gridMap = {};//clear the gridData for row and col

  vm.formItems.push(formItem);
 };

 vm.removeComponent = function (component) {
  //console.log(index, ' - ', vm.formItems.indexOf(component));
  vm.formItems.splice(vm.formItems.indexOf(vm.formItems.indexOf(component), 1));
 };

//for testing
 for (var i = 0; i < vm.components.length; i++) {
  vm.formItems.push(angular.copy(vm.components[i]));
 }

 vm.formName = "Untitled Form";
 vm.previewForm = function () {
  var modalInstance = $uibModal.open({
   templateUrl: 'preview-form-modal.html',
   controller: 'PreviewFormCtrl as previewFormCtrl',
   scope: $scope,
   size: 'preview-form',
   // placement: 'right',
   //backdrop: 'static',
  });
  modalInstance.result.then(function (searchCriteria) {

  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 /*

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
  component: 'textInput'
  });
  $scope.form = $builder.forms['default'];
  $scope.input = [];
  $scope.defaultValue = {};
  $scope.defaultValue[textbox.id] = 'default value';
  $scope.defaultValue[checkbox.id] = [true, true];

  */

 $scope.dynamicSize = {
  'width': 350,
  'height': 250
 }

 $scope.flexbox = true;
 $scope.size = {};
 $scope.msg = 'Resize me.';
 $scope.events = [];
 $scope.$on("angular-resizable.resizeEnd", function (event, args) {
  $scope.msg = 'Resize me again.';
  $scope.events.unshift(event);
  $scope.size = args;
  if (args.width)
   $scope.dynamicSize.width = args.width;
  if (args.height)
   $scope.dynamicSize.height = args.height;
 });
 $scope.$on("angular-resizable.resizeStart", function (event, args) {
  $scope.msg = 'Woooohoooo!';
  $scope.events.unshift(event);
 });
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
 //'$builder',
 //'$validator',
 'components',
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
