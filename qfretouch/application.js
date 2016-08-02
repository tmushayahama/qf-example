﻿/*global require*/
        'use strict';
define([
 'angular',
 'jquery-ui',
 'angular-ui-router',
 'angular-resource',
 'oc-lazy-load',
 'angular-animate',
 'angular-local-storage',
 'satellizer',
 'xeditable',
 'bootstrap',
 'angular-bootstrap',
 'angular-ui-sortable',
 'hammerjs',
 'angular-gestures',
 'angular-validator',
 'angular-validator-rules',
 'angular-aside',
 'angular-aria',
 'angular-material',
 'angular-gridster',
 'angular-base64-upload',
 'matchmedia',
 'matchmedia-ng',
 'angular-ui-grid',
 'jsignature',
 //'qf-builder',
 //'qf-components',
 'app/module',
 'common/module'
], function (angular) {

 var qfretouch = angular.module('qfretouch', [
  'ui.router',
  'ngResource',
  'ngAnimate',
  'LocalStorageModule',
  'ui.bootstrap',
  'ui.sortable',
  'satellizer',
  'oc.lazyLoad',
  'xeditable',
  'angular-gestures',
  'validator.rules',
  'ngAside',
  'ngMaterial',
  'gridster',
  'naif.base64',
  'matchmedia-ng',
  'ui.grid',
  'ui.grid.selection',
  'ui.grid.pagination',
  'ui.grid.pinning',
  'ui.grid.autoResize',
  'ui.grid.resizeColumns',
  'ui.grid.moveColumns',
  //'builder',
  //'builder.components',
  'qfretouch.app',
  'qfretouch.common'
 ]);
 // var app = angular.module('mainModule', ['ui.router', 'oc.lazyLoad']);
 qfretouch.config(['$ocLazyLoadProvider', 'localStorageServiceProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', '$locationProvider', '$provide', 'hammerDefaultOptsProvider',
  function ($ocLazyLoadProvider, localStorageServiceProvider, $stateProvider, $urlRouterProvider, $httpProvider, $authProvider, $locationProvider, $provide, hammerDefaultOptsProvider) {

   // $locationProvider.html5Mode(true);
   $ocLazyLoadProvider.config({
    debug: true,
    loadedModules: ['qfretouch'],
    asyncLoader: require
   });

   localStorageServiceProvider
           .setPrefix('qfretouch')
           .setStorageType('localStorage')
           .setNotify(true, true);

   hammerDefaultOptsProvider.set({
    recognizers: [
     [Hammer.Tap, {time: 250}],
     [Hammer.Swipe, {}]
    ]
   });

   // $urlRouterProvider.otherwise('/auth');
   function redirectWhenLoggedOut($q, $injector) {

    return {
     responseError: function (rejection) {

      // Need to use $injector.get to bring in $state or else we get
      // a circular dependency error
      var $state = $injector.get('$state');
      // Instead of checking for a status code of 400 which might be used
      // for other reasons in Laravel, we check for the specific rejection
      // reasons to tell us if we need to redirect to the login state
      var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
      // Loop through each rejection reason and redirect to the login
      // state if one is encountered
      angular.forEach(rejectionReasons, function (value, key) {

       if (rejection.data.error === value) {

        // If we get a rejection corresponding to one of the reasons
        // in our array, we know we need to authenticate the user so
        // we can remove the current user from local storage
        //localStorage.removeItem('user');
        // Send the user to the auth state so they can login
        // $state.go('auth');
       }
      });
      return $q.reject(rejection);
     }
    }
   }



   // Setup for the $httpInterceptor
   //$provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
   // Push the new factory onto the $http interceptor array
   // $httpProvider.interceptors.push('redirectWhenLoggedOut');
   // $httpProvider.interceptors.push('httpRequestInterceptor');
   $authProvider.loginUrl = '/api/authenticate';
   //$urlRouterProvider.otherwise('/auth');

  }
 ]);
 qfretouch.run(function ($stateParams, $animate, $http, $rootScope, $state, localStorageService) {
  $animate.enabled(false);
  //  $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'origin, content-type, accept';
  // $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  // $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PUT,HEAD,DELETE,OPTIONS';

  // //$http.defaults.headers.common['Auth-Token'] = 'login YmVlcDpi';
  //$http.defaults.headers.common["Accept"] = "application/json";
  //$http.defaults.headers.common["Content-Type"] = "application/json";
  //$http.defaults.headers.common["Access-Control-Allow-Origin"] = '*';

  $rootScope.$on('$stateChangeStart', function (event, toState) {

  });
  $animate.enabled(true);

 });

 var baseUrl = '';

 qfretouch.constant('_',
         window._
         );

 qfretouch.constant('config', {
  appName: "qfretouch",
  defaultLang: "en",
  apiModel: {
  },
 });

 return qfretouch;
});