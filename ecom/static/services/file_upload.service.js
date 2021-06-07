(function () {
    'use strict';
    angular
      .module('ecom')
      .service('fileUploadService', fileUploadService);

    function fileUploadService($http, $q, UPLOAD_PRODUCT_IMAGE){

        this.uploadFileToUrl = function (file_obj,id) {
            //FormData, object of key/value pair for form fields and values
            var fileFormData = new FormData();
            fileFormData.append('picture', file_obj._file);
            fileFormData.append('product_id', id);
            
            var deffered = $q.defer();
            $http.post(UPLOAD_PRODUCT_IMAGE, fileFormData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            }).success(function (response) {
                deffered.resolve(response);

            }).error(function (response) {
                deffered.reject(response);
            });

            return deffered.promise;
        }
    }
})();