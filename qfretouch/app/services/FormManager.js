angular.module('qfretouch')
        .service('FormManager', [
         'config',
         '$q',
         '$http',
         '$filter',
         function (config,
                 $q,
                 $http,
                 $filter) {

          $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

          var FormManager = function () {
           this.Contents = [];
           this.NonFertileFolders = [0, 2];
          };

          FormManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          FormManager.prototype.getForm = function (formData) {
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

          FormManager.prototype.submitForm = function (formData) {
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

          return FormManager;
         }
        ]);
