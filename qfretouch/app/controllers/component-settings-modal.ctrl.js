
'use strict';
var componentSettingsCtrl = function (
        config,
        formSrv,
        $scope,
        $uibModal,
        Item,
        $uibModalInstance
        ) {
 var vm = this;
 vm.formSrv = formSrv;
 vm.item = Item;

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
   vm.item.rules.componentRules.push(componentRule);
  }, function () {
   //('Modal dismissed at: ' + new Date());
  });
 };





 vm.componentsTemplates = [
  {
   "templateUrl": "qfretouch/common/views/templates/heading.tpl.html",
   "name": "Heading"
  },
  {
   "templateUrl": "qfretouch/common/views/templates/paragraph.tpl.html",
   "name": "Paragraph",
  },
  {
   "templateUrl": "qfretouch/common/views/templates/textbox.tpl.html",
   "name": "Textbox"
  },
  {
   "templateUrl": "qfretouch/common/views/templates/textarea.tpl.html",
   "name": "Textarea"
  },
  {
   "templateUrl": "qfretouch/common/views/templates/signature.tpl.html",
   "name": "Signature"
  },
  {
   "templateUrl": "qfretouch/common/views/templates/checkbox.tpl.html",
   "name": "Checkbox"
  },
  {
   "templateUrl": "qfretouch/common/views/templates/radiobox.tpl.html",
   "name": "Radiobox"
  },
  {
   "templateUrl": "qfretouch/common/views/templates/dropdown.tpl.html",
   "name": "Dropdown"
  },
  {
   "templateUrl": "qfretouch/common/views/templates/datepicker.tpl.html",
   "name": "Datepicker"
  },
  {
   "templateUrl": "qfretouch/common/views/templates/picturebox.tpl.html",
   "name": "Picture"
  },
  {
   "templateUrl": "qfretouch/common/views/templates/video.tpl.html",
   "name": "Video"
  }
 ];

 vm.updateTemplate = function (template) {
  vm.item.templateUrl = template.templateUrl;
 };



 vm.ok = function () {
  $uibModalInstance.close(vm.component);
 };

 vm.close = function () {
  $uibModalInstance.dismiss("cancel");
 };

 $scope.$watch(function () {
  return vm.item.component.componentStylesMap;
 }, function (componentStyles) {
  angular.forEach(componentStyles, function (componentStyle) {
   vm.item.component.componentStyles[componentStyle.controlName] = {};
   angular.forEach(componentStyle.controlStyles, function (style) {
    vm.item.component.componentStyles[componentStyle.controlName][style.name] = style.prepend + style.value + style.append;
   });
  });
 }, true);
};

componentSettingsCtrl.$inject = [
 'config',
 'formSrv',
 '$scope',
 '$uibModal',
 'Item',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('ComponentSettingsCtrl', componentSettingsCtrl);
