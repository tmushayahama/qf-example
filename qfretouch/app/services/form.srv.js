﻿angular.module('qfretouch')
        .service('FormSrv', [
         'config',
         '$q',
         '$http',
         '$filter',
         function (config,
                 $q,
                 $http,
                 $filter) {

          $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

          var FormSrv = function () {
           this.formName = "Untitled Form";
           this.description = "";
           this.formStyles = {};
           this.formTemplates = [];
           this.formItems = [];
           this.formStylesMap = [
            {
             label: "Width (px)",
             name: "width",
             value: "700",
             type: "number",
             prepend: "",
             append: "px",
            },
            {
             label: "Height (px)",
             name: "height",
             value: "800",
             type: "number",
             prepend: "",
             append: "px",
            },
            {
             label: "Background Color",
             name: "background-color",
             value: "#FFFFFF",
             type: "color",
             prepend: "",
             append: "",
            },
            {
             label: "Foreground Color",
             name: "color",
             value: "#111111",
             type: "color",
             prepend: "",
             append: "",
            },
            {
             "label": "Transparency",
             "name": "opacity",
             "value": "1",
             "type": "text",
             "prepend": "",
             "append": ""
            },
            {
             label: "Padding (px)",
             name: "padding",
             value: "5",
             type: "number",
             prepend: "",
             append: 'px',
            }
           ];
           this.Contents = [];
          };

          FormSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
           if (!data || typeof data !== 'object') {
            this.error = 'Error';
           }
           if (!this.error && data.result && data.result.error) {
            this.error = data.result.error;
           }
           if (!this.error && data.error) {
            this.error = data.error.message;
           }
           if (!this.error && defaultMsg) {
            this.error = defaultMsg;
           }
           if (this.error) {
            return deferred.reject(data);
           }
           return deferred.resolve(data);
          };

          FormSrv.prototype.getFormTemplates = function (url) {
           var self = this;
           var deferred = $q.defer();
           self.error = '';
           self.formTemplates = [];
           $http.get(url).success(function (data) {
            self.formTemplates.push(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          FormSrv.prototype.setFormTemplate = function (template) {
           var self = this;
           var deferred = $q.defer();
           self.error = '';
           self.formName = template.formName;
           self.description = template.description;
           self.formStylesMap = template.formStylesMap;
           self.formItems = template.formItems;
          };

          FormSrv.prototype.buildForm = function (formData) {
           var self = this;
           var deferred = $q.defer();
           self.error = '';
           $http.post(config.apiModel.form + "save", formData).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          FormSrv.prototype.getForm = function (formData) {
           var self = this;
           var deferred = $q.defer();
           self.error = '';
           $http.post(config.apiModel.form + "save", formData).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          FormSrv.prototype.submitForm = function (formData) {
           var self = this;
           var deferred = $q.defer();
           self.error = '';
           $http.post(config.apiModel.form + "submit", formData).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          return FormSrv;
         }
        ]);
