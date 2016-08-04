
'use strict';
var componentRuleCtrl = function (
        config,
        Item,
        ComponentRule,
        $uibModalInstance
        ) {
 var vm = this;
 vm.item = Item;
 vm.componentRule = ComponentRule;

 vm.criterion = {
  description: ""
 }

 vm.booleanOperators = [
  {
   label: "Equal",
   operator: "="
  },
  {
   label: "NotEqual",
   operator: "="
  },
  {
   label: "Less Than",
   operator: "<"
  },
  {
   label: "Greater Than",
   operator: ">"
  }
 ];



 vm.close = function () {
  $uibModalInstance.dismiss("cancel");
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.componentRule);
 };

};

componentRuleCtrl.$inject = [
 'config',
 'Item',
 'ComponentRule',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('ComponentRuleCtrl', componentRuleCtrl);
