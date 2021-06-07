(function () {
    'use strict';

    angular
        .module('ecom')
        .controller('EHomeController',EHomeController);

    EHomeController.$inject = [
        "$mdDialog",
        'AuthService',
        'ApiService',
        '$state'
    ]

    function EHomeController($mdDialog, AuthService, ApiService, $state){
        var auth = AuthService;
        var EHomeCtrl = this;
        EHomeCtrl.product_list = [];
        EHomeCtrl.is_admin = auth.getIsAdmin();
        EHomeCtrl.is_data_loaded = false;
        EHomeCtrl.update_product = update_product;
        EHomeCtrl.create_product = create_product;
        EHomeCtrl.delete_product = delete_product;
        EHomeCtrl.upload_picture = upload_picture;
        EHomeCtrl.view_details = view_details;
        EHomeCtrl.is_admin = auth.getIsAdmin();
        console.log(EHomeCtrl.is_admin)
        
        activate();
        
        /**
         *  Function : This is init function for this directive
         */
        function activate() {
            get_products_list();
        }

        /**
		 *  Function : To get products list using service/api
		 */
        function get_products_list() {
            var list_p_obj = ApiService.get_product_list_promise_obj();
            if (list_p_obj != "") {
                list_p_obj.then(function (res) {
                    set_products_list(res);
                });
            } else {
                ApiService.api_get_products_list().then(function(res){
                    set_products_list(res);
                })
            }
        }

        /**
		 *  Function : To set product list data to UI
		 */
        function set_products_list(res) {
            EHomeCtrl.product_list = res;
            EHomeCtrl.is_data_loaded = true;
        }

        function update_product(id){
            $state.go('update-product',{'product_id' : id});
        }

        function create_product(){
            $state.go('create-product');
        }

        function delete_product(id){
            if (confirm("Do you really want to delete this record?")) {
                ApiService.delete_product().save({'product_id':id}).$promise.then(function(res){
                    ApiService.set_product_list_promise_obj('');
                    get_products_list()
                    alert(res.message)
                }, 
                function(e){
                    alert(e.data.message)
                })
            }
        }

        function upload_picture(id){
            $state.go('upload-picture',{'product_id' : id});
        }

        function view_details(id){
            $state.go('product-details',{'product_id' : id});
        }

    }
 })();

//  C:\Users\Admin\Desktop\myfiles\gyanmatrix\project\gnm\ecom