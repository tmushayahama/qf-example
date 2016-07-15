requirejs.config({
 waitSeconds: 0,
 paths: {
  'jquery': '../bower_components/jquery/dist/jquery.min',
  'jquery-ui': '../bower_components/jquery-ui/jquery-ui.min',
  'angular': '../bower_components/angular/angular.min',
  'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
  'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
  'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
  'angular-ui-sortable': '../bower_components/angular-ui-sortable/sortable',
  'angular-resource': '../bower_components/angular-resource/angular-resource',
  'satellizer': '../bower_components/satellizer/satellizer',
  'oc-lazy-load': '../bower_components/ocLazyLoad/dist/ocLazyLoad',
  'angular-animate': '../bower_components/angular-animate/angular-animate',
  //'angular-context-menu': '../bower_components/ng-context-menu/dist/ng-context-menu',

  'dom-ready': '../bower_components/domready/ready',
  //'modules-includes': 'includes'

  "angular-local-storage": '../bower_components/angular-local-storage/dist/angular-local-storage',
  'xeditable': '../bower_components/angular-xeditable/dist/js/xeditable',
  'hammerjs': '../bower_components/hammerjs/hammer',
  'angular-gestures': '../bower_components/angular-gestures/gestures',
  'angular-validator': '../bower_components/angular-validator/dist/angular-validator',
  'angular-validator-rules': '../bower_components/angular-validator/dist/angular-validator-rules',
  'angular-aside': '../bower_components/angular-aside/dist/js/angular-aside',
  'angular-aria': '../bower_components/angular-aria/angular-aria',
  'angular-material': '../bower_components/angular-material/angular-material',
  'angular-gridster': '../bower_components/angular-gridster/dist/angular-gridster.min',
  'angular-resizer': '../bower_components/javascript-detect-element-resize/jquery.resize',
  'jsignature': '../lib/js/jSignature.min',
  //Quickform
  //'qf-builder': '../qf-lib/qf-builder',
  //'qf-components': '../components/quickform-components',
 },
 shim: {
  'angular': {'exports': 'angular', deps: ['jquery']},
  'jquery': {'exports': 'jquery'},
  'jquery-ui': {deps: ['angular', 'jquery']},
  'angular-ui-router': {deps: ['angular']},
  'angular-resource': {deps: ['angular']},
  'angular-animate': {deps: ['angular']},
  'angular-local-storage': {deps: ['angular']},
  'angular-cookies': {deps: ['angular']},
  //'angular-context-menu': { deps: ['angular'] },
  'oc-lazy-load': {deps: ['angular']},
  'satellizer': {deps: ['angular']},
  'bootstrap': {'exports': 'bootstrap', deps: ['jquery']},
  'angular-bootstrap': {deps: ['angular']},
  'angular-ui-sortable': {deps: ['angular', 'jquery-ui']},
  'xeditable': {deps: ['angular']},
  //'moment': { exports: 'moment' },
  'hammerjs': {deps: ['angular']},
  'angular-gestures': {deps: ['angular', 'hammerjs']},
  'angular-validator': {deps: ['angular']},
  'angular-validator-rules': {deps: ['angular']},
  'angular-aside': {deps: ['angular', 'angular-animate']},
  'angular-aria': {deps: ['angular']},
  'angular-material': {deps: ['angular', 'angular-aria', 'angular-animate']},
  'angular-resizer': {deps: ['angular', 'jquery']},
  'angular-gridster': {deps: ['angular', 'angular-resizer']},
  'jsignature': {deps: ['angular', 'jquery']},
  // 'qf-builder': {deps: ['angular', 'angular-validator', 'angular-validator-rules']},
  //'qf-components': {deps: ['angular', ]},
 },
 priority: [
  'jquery',
  'bootstrap',
  'angular',
 ],
});
requirejs([
 'angular',
 'application'
], function (angular, app) {
 'use strict';
 console.log(app);
 var $html = angular.element(document.getElementsByTagName('html')[0]);
 angular.element().ready(function () {
  // bootstrap the app manually
  angular.bootstrap(document, ['qfretouch']);
  //resumeBootstrap();
 });
});

