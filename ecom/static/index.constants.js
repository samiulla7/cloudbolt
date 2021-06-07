/* global malarkey:false, moment:false */
(function() {
    'use strict';
    angular
      .module('ecom')
      .constant('LOGIN_URL', '/login/')
      .constant('REGISTER_URL', '/register/')
      .constant('GET_PRODUCT_LIST', '/get_product_list/')
      .constant('CREATE_PRODUCT', '/create_product/')
      .constant('UPDATE_PRODUCT', '/update_product/')
      .constant('DELETE_PRODUCT', '/delete_product/')
      .constant('RETRIEVE_PRODUCT', '/retrieve_product/')
      .constant('UPLOAD_PRODUCT_IMAGE', '/upload_product_image/')
      
  })();
  