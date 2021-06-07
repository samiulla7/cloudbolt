(function () {
    'use strict';

    angular
        .module('ecom')
        .controller('eRegisterController',eRegisterController);

    eRegisterController.$inject = [
        "$mdDialog",
        "AuthService", 
        "$state",
        "$scope"
    ]

    function eRegisterController($mdDialog, AuthService, $state, $scope){
        var eRegisterCtrl = this;
        eRegisterCtrl.register = register;
        eRegisterCtrl.first_name = '';
        eRegisterCtrl.last_name = '';
        eRegisterCtrl.username = '';
        eRegisterCtrl.password = '';
        eRegisterCtrl.error = '';
        eRegisterCtrl.show_validation = false;
        var auth = AuthService;
        
        function register(is_valid){
            if(is_valid){
                var data = {
                    first_name : eRegisterCtrl.first_name,
                    last_name : eRegisterCtrl.last_name,
                    username : eRegisterCtrl.username,
                    password : eRegisterCtrl.password,
                    email : eRegisterCtrl.username
                }
                auth.register().save(data).$promise.then(function(response){
                    if(response.status == 305){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent(response.message)
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Ok!')
                        );
                    }else{
                        alert(response.message);
                        $state.go('login');
                    }
                    
                },function(error_res){
                    eRegisterCtrl.error = error_res.data.message;
                })
            }else{
                eRegisterCtrl.show_validation = true;
            }
        }
    }
 })();
