'use strict';
var designerCtrl = function (
        config,
        //$builder,
        // $validator,
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
        matchmedia,
        FormSrv
        //qfretouchAuth,
        ) {
 var vm = this;
 vm.formSrv = new FormSrv();

 $rootScope.deSpacify = function (str) {
  if (str) {
   return str.replace(/\s/g, '').toLowerCase();
  }
  return str;
 }

 $rootScope.labs = {
  enableComponentRules: true,
 };

 //vm.formSrv.getFormTemplates("qfretouch/form-templates/contact-us-transparent.json");
 //vm.formSrv.getFormTemplates("https://script.google.com/macros/s/AKfycbxK_tpdGUXB5pSxDDP5Zb_M3q3AViHn7laC-g4UN6rs/dev?prefix=alert");
 vm.formSrv.getFormTemplates("qfretouch/form-templates/contact-us-simple.json");
 vm.formSrv.getFormTemplates("qfretouch/form-templates/contact-us.json");
 //vm.formSrv.getFormTemplates("qfretouch/form-templates/all-components.json");
 vm.formSrv.getFormTemplates("qfretouch/form-templates/registration.json");
 vm.formSrv.getFormTemplates("qfretouch/form-templates/feature-request.json");
 vm.formSrv.getFormTemplates("qfretouch/form-templates/background-check-authorization.json");
 vm.formSrv.getFormTemplates("qfretouch/form-templates/handbook-acknowledgement.json");
 vm.formSrv.getFormTemplates("qfretouch/form-templates/parking-permit.json");


 vm.formSrv.formItems = [];

 vm.adjustMedia = function (mediaType) {
  angular.forEach(vm.formSrv.formItems, function (formItem) {

   if (formItem.gridMap[mediaType]) {
    // formItem.gridMap.sizeX = formItem.gridMap[mediaType].sizeY;
    //formItem.gridMap.sizeY = formItem.gridMap[mediaType].sizeY;
   }
   // formItem.gridMap.row = null;
  });
 };

 vm.clearComponent = function () {
  vm.components = [];
 };

 vm.addComponent = function (component) {
  var formItem = angular.copy(component);
  formItem.gridMap = {
   sizeX: 12,
   sizeY: 10
  };
  formItem.component.id = $rootScope.deSpacify(formItem.name) + new Date().getTime();
  vm.formSrv.formItems.push(formItem);

  $timeout(function () {
   var scroller = document.getElementById("qf-builder");
   scroller.scrollTop = scroller.scrollHeight;
  }, 0, false);
 };

 vm.duplicateComponent = function (component) {
  var formItem = angular.copy(component);
  formItem.gridMap = {};//clear the gridData for row and col
  formItem.component.id = $rootScope.deSpacify(formItem.name) + new Date().getTime();


  vm.formSrv.formItems.push(formItem);
 };

 vm.removeComponent = function (component) {
  //console.log(index, ' - ', vm.formSrv.formItems.indexOf(component));
  vm.formSrv.formItems.splice(vm.formSrv.formItems.indexOf(vm.formSrv.formItems.indexOf(component), 1));
 };

//for testing
// for (var i = 0; i < 3; i++) { //vm.components.length
 // vm.formSrv.formItems.push(angular.copy(vm.components[i]));
 //}

 vm.formName = "Untitled Form";

 vm.openFormSettings = function () {
  var modalInstance = $aside.open({
   templateUrl: 'form-settings-modal.html',
   controller: 'FormSettingsCtrl as formSettingsCtrl',
   scope: $scope,
   size: 'form-settings',
   placement: 'right',
   //backdrop: 'static',
   resolve: {
    formSrv: function () {
     return vm.formSrv;
    }
   }
  });
  modalInstance.result.then(function (result) {
   vm.formSrv = result;
  }, function () {
   //('Modal dismissed at: ' + new Date());
  });
 };

 vm.previewForm = function () {
  // var formSrvCopy = angular.copy(vm.formSrv);
  //formSrvCopy.formTemplates = {};
  //$('body').html(JSON.stringify(formSrvCopy));
  var modalInstance = $uibModal.open({
   templateUrl: 'preview-form-modal.html',
   controller: 'PreviewFormCtrl as previewFormCtrl',
   scope: $scope,
   size: 'preview-form',
   // placement: 'right',
   //backdrop: 'static',
   resolve: {
    formSrv: function () {
     return vm.formSrv;
    }
   }
  });
  modalInstance.rendered.then(function () {
   $(window).trigger('resize');
  });

  modalInstance.result.then(function (searchCriteria) {

  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 vm.openQFLab = function () {
  var modalInstance = $aside.open({
   templateUrl: 'qf-lab-modal.html',
   controller: 'QFLabCtrl as qfLabCtrl',
   scope: $scope,
   size: 'qf-lab',
   placement: 'right',
   //backdrop: 'static',
   resolve: {
    formSrv: function () {
     return vm.formSrv;
    }
   }
  });
  modalInstance.result.then(function (result) {
   // $scope.item = result;
  }, function () {
   //('Modal dismissed at: ' + new Date());
  });
 };

 $scope.$watch(function () {
  return vm.formSrv.formStylesMap.formItems;
 }, function (styles) {
  angular.forEach(styles, function (style) {
   vm.formSrv.formStyles[style.name] =
           style.component.prepend +
           style.component.inputText +
           style.component.append;
  });
  // console.log(vm.formSrv.formStyles, "");
 }, true);

 vm.formSrv.getFormControls("qfretouch/qf-settings/form-controls/form-controls.json");


 $scope.submit = function () {
  return $validator.validate($scope, 'default').success(function () {
   return console.log('success');
  }).error(function () {
   return console.log('error');
  });
 };

 var unsub = {};
 unsub['print'] = matchmedia.onPrint(function (mediaQueryList) {
  $scope.isPrint = mediaQueryList.matches;
 }, $scope);
 unsub['screen'] = matchmedia.onScreen(function (mediaQueryList) {
  $scope.isScreen = mediaQueryList.matches;
 }, $scope);
 unsub['phone'] = matchmedia.onPhone(function (mediaQueryList) {
  $scope.isPhone = mediaQueryList.matches;
 });
 unsub['tablet'] = matchmedia.onTablet(function (mediaQueryList) {
  $scope.isTablet = mediaQueryList.matches;

 });
 unsub['desktop'] = matchmedia.onDesktop(function (mediaQueryList) {
  $scope.isDesktop = mediaQueryList.matches;
 });
 unsub['portrait'] = matchmedia.onPortrait(function (mediaQueryList) {
  $scope.isPortrait = mediaQueryList.matches;
 });
 unsub['landscape'] = matchmedia.onLandscape(function (mediaQueryList) {
  $scope.isLandscape = mediaQueryList.matches;
 });


 $scope.$on('$destroy', function iVeBeenDismissed() {
  // say goodbye to your listeners here
  unsub['print']();
  unsub['screen']();
  unsub['phone']();
  unsub['tablet']();
  unsub['desktop']();
  unsub['portrait']();
  unsub['landscape']();
 })

};
designerCtrl.$inject = [
 'config',
 //'$builder',
 //'$validator',
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
 'matchmedia',
 'FormSrv'
];
angular.module("qfretouch").controller('DesignerCtrl', designerCtrl);
