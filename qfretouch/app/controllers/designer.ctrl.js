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
        FormManager
        //qfretouchAuth,
        ) {
 var vm = this;
 vm.gridsterOpts = {
  rowHeight: 200,
  draggable: {
   enabled: true,
   handle: '.qf-grab-me',
   start: function (event, $element, widget) {}, // optional callback fired when drag is started,
   drag: function (event, $element, widget) {}, // optional callback fired when item is moved,
   stop: function (event, $element, widget) {} // optional callback fired when item is finished dragging
  }
 }

 vm.components = [
  {
   templateUrl: "qfretouch/common/views/templates/simple.tpl.html",
   component: {
    label: 'First Name',
    description: 'Enter your first name',
    placeholder: 'ex. Jamie Doe',
    required: false,
    validationOptions: [
     {
      label: 'none',
      rule: '/.*/'
     }, {
      label: 'number',
      rule: '[number]'
     }, {
      label: 'email',
      rule: '[email]'
     }, {
      label: 'url',
      rule: '[url]'
     }
    ]
   }
  },
  {
   templateUrl: "qfretouch/common/views/templates/jsignature.tpl.html",
   component: {
    label: 'Signature',
    description: 'please sign above',
    placeholder: '',
    required: false,
    validationOptions: [
     {
      label: 'none',
      rule: '/.*/'
     }, {
      label: 'number',
      rule: '[number]'
     }, {
      label: 'email',
      rule: '[email]'
     }, {
      label: 'url',
      rule: '[url]'
     }
    ]
   }
  },
  {
   templateUrl: "qfretouch/common/views/templates/checkbox.tpl.html",
   component: {
    label: 'Are you going?',
    description: 'Select answer below',
    placeholder: '',
    options: ['yes', 'no'],
    required: false,
    validationOptions: [
     {
      label: 'none',
      rule: '/.*/'
     }, {
      label: 'number',
      rule: '[number]'
     }, {
      label: 'email',
      rule: '[email]'
     }, {
      label: 'url',
      rule: '[url]'
     }
    ]
   }
  },
  {
   templateUrl: "qfretouch/common/views/templates/textarea.tpl.html",
   component: {
    label: 'Biography',
    description: 'Enter your first name',
    placeholder: 'ex. Ex tritani equidem argumentum pro, eam ea amet veniam. Alii noster oportere te his, consul fierent accusamus ea per, sed ferri aeq',
    required: false,
    validationOptions: [
     {
      label: 'none',
      rule: '/.*/'
     }, {
      label: 'number',
      rule: '[number]'
     }, {
      label: 'email',
      rule: '[email]'
     }, {
      label: 'url',
      rule: '[url]'
     }
    ]
   }
  },
  {
   templateUrl: "qfretouch/common/views/templates/radiobox.tpl.html",
   component: {
    label: 'Are you going?',
    description: 'Select answer below',
    placeholder: '',
    options: ['yes', 'no'],
    required: false,
    validationOptions: [
     {
      label: 'none',
      rule: '/.*/'
     }, {
      label: 'number',
      rule: '[number]'
     }, {
      label: 'email',
      rule: '[email]'
     }, {
      label: 'url',
      rule: '[url]'
     }
    ]
   }
  },
  {
   templateUrl: "qfretouch/common/views/templates/select.tpl.html",
   component: {
    label: 'Are you going?',
    description: 'Select answer below',
    placeholder: '',
    options: ['yes', 'no'],
    required: false,
    validationOptions: [
     {
      label: 'none',
      rule: '/.*/'
     }, {
      label: 'number',
      rule: '[number]'
     }, {
      label: 'email',
      rule: '[email]'
     }, {
      label: 'url',
      rule: '[url]'
     }
    ]
   }
  }
 ];
 vm.standardItems = [];
 for (var i = 0; i < vm.components.length; i++) {
  vm.standardItems.push(
          {
           gridMap: {
            sizeX: 3,
            sizeY: 1,
            row: i,
            col: (i % 2 === 0) ? 0 : 3,
           },
           templateUrl: vm.components[i].templateUrl,
           component: vm.components[i].component,
          });
 }

 vm.formName = "Untitled Form";
 vm.previewForm = function () {
  var modalInstance = $aside.open({
   templateUrl: 'preview-form-modal.html',
   controller: 'PreviewFormModalCtrl as previewFormCtrl',
   scope: $scope,
   size: 'preview-form',
   placement: 'right',
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
