(function () {
    'use strict';

    angular
      .module('ecom')
      .service('ApiService', ApiService);

    function ApiService($http, $state, $window, $localStorage, $resource, 
        GET_PRODUCT_LIST, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, RETRIEVE_PRODUCT) {
        var self = this;
        self.products_list_promise_obj = "";

        self.create_product = function() {
            return $resource(CREATE_PRODUCT);
        }

        self.update_product = function() {
            return $resource(UPDATE_PRODUCT);
        }
        
        self.delete_product = function() {
            return $resource(DELETE_PRODUCT);
        }

        self.retrieve_product = function() {
            return $resource(RETRIEVE_PRODUCT);
        }

        self.get_product_list = function() {
            return $resource(GET_PRODUCT_LIST);
        }

        self.api_get_products_list = function() {
            self.products_list_promise_obj = self.get_product_list().query().$promise;
            return self.products_list_promise_obj;
        }

        self.get_product_list_promise_obj = function() {
            return self.products_list_promise_obj;
        }

        self.set_product_list_promise_obj = function(data) {
            self.products_list_promise_obj = data;
        }

        self.clear_data = function(){
            self.products_list_promise_obj = '';
        }
    }

})();
