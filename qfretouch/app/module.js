define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";

 var module = angular.module('qfretouch.app', ['ui.router']);

 module.config(['$stateProvider',
  function ($stateProvider) {
   $stateProvider
           .state('designer', {
            url: '/designer',
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
           }).state('viewer', {
    url: '/{formId}',
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
  }
 ]);
 return module;
});
