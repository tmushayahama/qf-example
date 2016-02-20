define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";

 var module = angular.module('qfretouch.app', ['ui.router']);

 module.config(['$stateProvider',
  function ($stateProvider) {
   $stateProvider
           .state('design', {
            url: '/design/{formId}',
            views: {
             "root": {
              templateUrl: 'qfretouch/app/views/designer.html',
              controller: 'DesignerCtrl as designerCtrl',
              resolve: {
               load: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 serie: true,
                 name: 'qfretouch.app',
                 files: [
                  'qfretouch/app/services/FormManager.js',
                  'qfretouch/app/controllers/modals/PreviewFormModalCtrl.js',
                  'qfretouch/app/controllers/DesignerCtrl.js',
                 ]
                });
               }
              }
             }
            }
           })
           .state('viewer', {
            url: '/{formId}',
            views: {
             "root": {
              templateUrl: 'qfretouch/app/views/viewer.html',
              controller: 'ViewerCtrl as viewerCtrl',
              resolve: {
               load: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 serie: true,
                 name: 'qfretouch.app',
                 files: [
                  'qfretouch/app/services/FormManager.js',
                  'qfretouch/app/controllers/modals/FormSummaryModalCtrl.js',
                  'qfretouch/app/controllers/ViewerCtrl.js',
                 ]
                });
               }
              }
             }
            }
           })
  }
 ]);
 return module;
});
