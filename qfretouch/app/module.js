define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";

 var module = angular.module('qfretouch.app', ['ui.router']);

 module.config(['$stateProvider',
  function ($stateProvider) {
   $stateProvider
           .state('app', {
            url: '/app',
            views: {
             "root": {
              templateUrl: 'qfretouch/app/views/app.html',
              controller: 'AppCtrl as appCtrl',
              resolve: {
               load: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 serie: true,
                 name: 'qfretouch.app',
                 files: [
                  'qfretouch/app/services/FormManager.js',
                  'qfretouch/app/controllers/modals/PreviewFormModalCtrl.js',
                  'qfretouch/app/controllers/AppCtrl.js',
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
