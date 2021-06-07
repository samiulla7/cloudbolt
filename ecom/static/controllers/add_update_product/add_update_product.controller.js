(function () {
    'use strict';

    angular
        .module('ecom')
        .controller('EAddEditProductController',EAddEditProductController);

    EAddEditProductController.$inject = [
        "$mdDialog",
        'AuthService',
        'ApiService',
        '$stateParams',
        '$state'
    ]

    function EAddEditProductController($mdDialog, AuthService, ApiService, $stateParams, $state){
        var auth = AuthService;
        var eAECtrl = this;
        eAECtrl.product_list = [];
        eAECtrl.is_admin = auth.getIsAdmin();
        eAECtrl.is_data_loaded = false;
        eAECtrl.is_add_form = true;
        eAECtrl.product_id = '';
        eAECtrl.error = '';
        eAECtrl.submit_data = submit_data;

        
        activate();
        
        /**
         *  Function : This is init function for this directive
         */
        function activate() {
            check_state_params()
        }

        /**
         *  Function : Check state params and get product id
         */
        function check_state_params(){
            if($stateParams.product_id != undefined && $stateParams.product_id != ''){
                eAECtrl.product_id = $stateParams.product_id;
                eAECtrl.is_add_form = false;
                retrieve_data();
            }
        }

        function retrieve_data(){
            ApiService.retrieve_product().save({'product_id':eAECtrl.product_id}).$promise.then(function(res){
                    eAECtrl.product_name = res.product_details.product_name;
                    eAECtrl.product_description = res.product_details.product_description;
                    eAECtrl.category = res.product_details.category;
                    eAECtrl.quantity_per_unit = res.product_details.quantity_per_unit;
                    eAECtrl.unit_price = res.product_details.unit_price;
                    eAECtrl.color = res.product_details.color;
                    eAECtrl.size = res.product_details.size;
            })
        }

        function submit_data(is_valid){
            if(is_valid){
                var data = {
                    product_name : eAECtrl.product_name,
                    product_description : eAECtrl.product_description,
                    category : eAECtrl.category,
                    quantity_per_unit : eAECtrl.quantity_per_unit,
                    unit_price : eAECtrl.unit_price,
                    color : eAECtrl.color,
                    size : eAECtrl.size
                }

                if(!eAECtrl.is_add_form){
                    data['product_id'] = eAECtrl.product_id;
                    ApiService.update_product().save(data).$promise.then(function(res){
                        alert(res.message);
                        ApiService.set_product_list_promise_obj('');
                        $state.go('home')
                    })
                }else{
                    ApiService.create_product().save(data).$promise.then(function(res){
                        alert(res.message);
                        ApiService.set_product_list_promise_obj('');
                        $state.go('home')
                    })
                }
                
            }
            
        }

    }
 })();
