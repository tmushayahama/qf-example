
'use strict';
var componentRuleCtrl = function (
        config,
        formSrv,
        //Item,
        ComponentRule,
        $uibModalInstance
        ) {
 var vm = this;
 vm.formSrv = formSrv;
 //vm.item = Item;
 vm.componentRule = ComponentRule;
 vm.criterion = {};

 vm.resetCriterion = function () {
  vm.criterion = {
   description: "",
   control: {},
   operator: {},
  };
 };

 vm.booleanOperators = {
  // selected: {},
  options: [
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
  ]
 }

 vm.actionInstructions = {
  selected: {},
  options: [
   {
    label: "Required",
    operator: "required"
   },
   {
    label: "Not Required",
    operator: "notrequired"
   },
   {
    label: "Show",
    operator: "show"
   },
   {
    label: "Hide",
    operator: "hide"
   },
   {
    label: "Enable",
    operator: "enable"
   },
   {
    label: "Disable",
    operator: "disable"
   }
  ]
 };

 vm.addCriterion = function () {
  vm.componentRule.criteria.push(angular.copy(vm.criterion));
  vm.resetCriterion();
 };


 vm.close = function () {
  $uibModalInstance.dismiss("cancel");
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.componentRule);
 };

 vm.resetCriterion();

};

componentRuleCtrl.$inject = [
 'config',
 'formSrv',
 //'Item',
 'ComponentRule',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('ComponentRuleCtrl', componentRuleCtrl);
