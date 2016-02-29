var formSummaryModalCtrl = function (
        $uibModalInstance,
        $scope
        ) {
 var vm = this;

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

formSummaryModalCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
];

angular.module("qfretouch").controller('FormSummaryModalCtrl', formSummaryModalCtrl);
