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
                  'qfretouch/common/directives/picturebox.drv.js',
                  'qfretouch/common/directives/signature.drv.js',
                  'qfretouch/app/services/form.srv.js',
                  'qfretouch/app/controllers/preview-form-modal.ctrl.js',
                  'qfretouch/app/controllers/designer.ctrl.js',
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
                  'qfretouch/common/directives/picturebox.drv.js',
                  'qfretouch/common/directives/signature.drv.js',
                  'qfretouch/app/services/form.srv.js',
                  'qfretouch/app/controllers/form-summary-modal.ctrl.js',
                  'qfretouch/app/controllers/viewer.ctrl.js',
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
