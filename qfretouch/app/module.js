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
                                                    'qfretouch/modules/folder/services/FolderItem.js',
                                                    'qfretouch/modules/document/services/DocumentItem.js',
                                                    'qfretouch/common/services/ConfigContent.js',
                                                    'qfretouch/modules/folder/services/FolderManager.js',
                                                    'qfretouch/app/controllers/AppCtrl.js',
                                                    'qfretouch/modules/folder/controllers/modals/CreateFolderModalCtrl.js',
                                                    'qfretouch/modules/folder/controllers/modals/EditFolderModalCtrl.js',
                                                    'qfretouch/modules/folder/controllers/modals/MoveFolderModalCtrl.js',
                                                    'qfretouch/modules/folder/controllers/modals/DeleteFolderModalCtrl.js',
                                                    'qfretouch/modules/folder/controllers/modals/FolderLinkModalCtrl.js',
                                                    'qfretouch/modules/folder/controllers/modals/UploadDocumentModalCtrl.js',
                                                    'qfretouch/modules/folder/controllers/modals/FolderDetailsModalCtrl.js',
                                                    'qfretouch/modules/document/controllers/modals/DocumentSearchModalCtrl.js',
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
