
'use strict';
var previewDataCtrl = function (
        config,
        $rootScope,
        $scope,
        formResponses,
        $uibModalInstance
        ) {
 var vm = this;
 vm.formResponses = formResponses;

 vm.columnDefs = [
  /*{
   name: "Value",
   field: "value",
   width: 300,
   minWidth: 120,
   maxWidth: 400,
   //cellClass: 'dr-pinned-col',
   pinnedLeft: false,
   showColumnMenu: true,
   enableCellEdit: false,
   enableHiding: false,
   //cellTemplate: 'docrecord/modules/folder/views/templates/name-image-cell.tpl.html',
   // headerCellTemplate: 'docrecord/modules/folder/views/templates/grid-header.tpl.html',
   },*/
 ];

 vm.gridData = [];

 vm.gridOptions = {
  paginationPageSizes: [25, 50, 100],
  paginationPageSize: 25,
  useExternalPagination: true,
  useExternalSorting: false,
  showFooter: true,
  multiSelect: false,
  enableRowHeaderSelection: false,
  enableGridMenu: true,
  enableColumnMenus: false,
  rowSelection: true,
  noUnselect: true,
  columnDefs: vm.columnDefs,
  rowHeight: 30,
  //rowTemplate: 'docrecord/modules/folder/views/templates/row.tpl.html',
  data: vm.gridData
 };

 //vm.gridOptions.data = vm.formResponses.formData;

 angular.forEach(vm.formResponses.formData[0], function (formDatum) {
  vm.columnDefs.push({
   name: formDatum.title,
   field: $rootScope.deSpacify(formDatum.title),
   width: 300,
   minWidth: 120,
   maxWidth: 400,
   //cellClass: 'dr-pinned-col',
   pinnedLeft: false,
   showColumnMenu: false,
   enableCellEdit: true,
   enableHiding: false,
   // cellTemplate: 'docrecord/modules/folder/views/templates/name-image-cell.tpl.html',
   //  headerCellTemplate: 'docrecord/modules/folder/views/templates/grid-header.tpl.html',
  })
 });


 angular.forEach(vm.formResponses.formData, function (formDataRow, key) {
  var row = {};

  angular.forEach(formDataRow, function (formDataRowItem) {
   row[$rootScope.deSpacify(formDataRowItem.title)] = formDataRowItem.value;

   //vm.gridData[key] = [];
   // vm.gridData[key][$rootScope.deSpacify(multipopulateItem.title)] = multipopulateItem.value;
  });
  vm.gridData.push(row);
 });






 vm.gridOptions.onRegisterApi = function (gridApi) {
  vm.gridApi = gridApi;
  gridApi.selection.on.rowSelectionChanged($scope, function (row) {
   // vm.previewDocument(row.entity);
  });
 };

 vm.close = function () {
  $uibModalInstance.dismiss("cancel");
 };
};

previewDataCtrl.$inject = [
 'config',
 '$rootScope',
 '$scope',
 'formResponses',
 '$uibModalInstance'
];

angular.module("qfretouch").controller('PreviewDataCtrl', previewDataCtrl);
