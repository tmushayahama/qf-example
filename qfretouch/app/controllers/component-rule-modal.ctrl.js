
'use strict';
var componentRuleCtrl = function (
        config,
        Item,
        $uibModalInstance
        ) {
 var vm = this;
 vm.item = Item;

 vm.close = function () {
  $uibModalInstance.dismiss("cancel");
 };

};

componentRuleCtrl.$inject = [
 'config',
 'Item',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('ComponentRuleCtrl', componentRuleCtrl);
