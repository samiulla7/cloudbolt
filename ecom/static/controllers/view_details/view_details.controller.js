(function () {
    'use strict';

    angular
        .module('ecom')
        .controller('EViewDetailsController',EViewDetailsController);

    EViewDetailsController.$inject = [
        "$mdDialog",
        'AuthService',
        'ApiService',
        '$state',
        '$stateParams'
    ]

    function EViewDetailsController($mdDialog, AuthService, ApiService, $state, $stateParams){
        var auth = AuthService;
        var Evdctrl = this;
        Evdctrl.product_details = [];
        Evdctrl.is_admin = auth.getIsAdmin();
        Evdctrl.is_data_loaded = false;
        Evdctrl.back = back;
        Evdctrl.product_id = $stateParams.product_id;
        
        activate();
        
        /**
         *  Function : This is init function for this directive
         */
        function activate() {
            get_product_details();
        }

        /**
		 *  Function : To get products list using service/api
		 */
        function get_product_details() {
            ApiService.retrieve_product().save({'product_id':Evdctrl.product_id}).$promise.then(function(res){
                console.log(res)
                Evdctrl.product_details = res.product_details;
                Evdctrl.is_data_loaded = true;
            })
        }

        function back(){
            $state.go('home');
        }

    }
 })();

//  C:\Users\Admin\Desktop\myfiles\gyanmatrix\project\gnm\ecom