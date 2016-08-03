angular.module('qfretouch')
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
           this.formControls = [];
           this.formName = "Untitled Form";
           this.description = "";
           this.formStyles = {};
           this.formTemplates = [];
           this.formItems = [];

           this.getFormStyle("qfretouch/qf-settings/qf-form-styles/default-form-styles.json");
           this.designGridSettings = {
            //floating: false,
            //floating: false,
            columns: 12,
            mobileBreakPoint: 600,
            margins: [20, 20],
            rowHeight: 20,
            minSizeX: 4,
            minSizeY: 2,
            defaultSizeX: 12,
            defaultSizeY: 10,
            resizable: {
             enabled: true,
            },
            draggable: {
             enabled: true,
             scroll: true,
             handle: '.qf-grab-me',
             start: function (event, $element, widget) {}, // optional callback fired when drag is started,
             drag: function (event, $element, widget) {},
             stop: function (event, $element, widget) {
              //sortComponents();
             }
            }
           };

           this.viewerGridSettings = {
            columns: 12,
            margins: [5, 5],
            mobileBreakPoint: 600,
            mobileModeEnabled: false,
            rowHeight: 20,
            defaultSizeX: 12,
            defaultSizeY: 10,
            resizable: {
             enabled: false,
            },
            draggable: {
             enabled: false,
            }
           };
           /*
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
            */
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

          FormSrv.prototype.getFormControls = function (url) {
           var self = this;
           var deferred = $q.defer();
           self.error = '';
           $http.get(url).success(function (data) {
            self.formControls = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          FormSrv.prototype.getFormStyle = function (url) {
           var self = this;
           var deferred = $q.defer();
           self.error = '';
           $http.get(url).success(function (data) {
            self.formStylesMap = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
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


          FormSrv.prototype.getGoogleForm = function (formUrl) {
           var self = this;
           var deferred = $q.defer();
           self.error = '';
           var url = "https://script.google.com/macros/s/AKfycbxK_tpdGUXB5pSxDDP5Zb_M3q3AViHn7laC-g4UN6rs/dev";
           var params = {
            callback: "JSON_CALLBACK",
            formurl: formUrl
           };
           $http.jsonp(url, {params: params}).success(function (data) {
            self.convertGoogleForm(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          FormSrv.prototype.getGoogleFormResponses = function (formUrl) {
           var self = this;
           var deferred = $q.defer();
           self.error = '';
           var url = "https://script.google.com/macros/s/AKfycbx9KMf-kJP862ju9jsglOf7GUI5xs7PG4TPRPNaxn1B89Eb49zd/exec";
           var params = {
            callback: "JSON_CALLBACK",
            formurl: formUrl
           };
           $http.jsonp(url, {params: params}).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          FormSrv.prototype.convertGoogleForm = function (form) {
           var self = this;
           //var deferred = $q.defer();
           //  self.error = '';
           //$http.get(url).success(function (data) {
           self.formItems = [];
           //var formJSON = JSON.parse(form);

           angular.forEach(form.formItems, function (formItem) {
            self.formItems.push({
             "templateUrl": "qfretouch/common/views/templates/" + formItem.template + ".tpl.html",
             "name": "Text",
             "component": {
              "label": formItem.component.label,
              "description": formItem.component.description,
              "placeholder": "Type your heading",
              "optionsText": "",
              "options": formItem.component.options,
              "rows": 2,
              "required": formItem.component.required,
              "componentStyles": {
               "component1": {
                "color": "#008040",
                "font-size": "30px",
                "text-align": "center"
               }
              }
             },
             "gridMap": {
              "sizeX": 12,
              //"sizeY": 5,
              // "row": 0,
              // "col": 0
             }
            }
            );
           });
           //self.deferredHandler(data, deferred);
           //}).error(function (data) {
           //  self.deferredHandler(data, deferred, 'Unknown error');
           //  });
           // return deferred.promise;
          };

          return FormSrv;
         }
        ]);
