var previewFormModalCtrl = function (
        $uibModalInstance,
        $scope
        ) {
 var vm = this;

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

previewFormModalCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
];

angular.module("qfretouch").controller('PreviewFormModalCtrl', previewFormModalCtrl);
