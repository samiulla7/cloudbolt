(function () {
    'use strict';

    angular
        .module('ecom')
        .controller('eLoginController',eLoginController);

    eLoginController.$inject = [
        "$mdDialog",
        'AuthService',
        '$state'
    ]

    function eLoginController($mdDialog, AuthService, $state){
        var eLoginCtrl = this;
        eLoginCtrl.login = login;
        eLoginCtrl.username = '';
        eLoginCtrl.password = '';
        eLoginCtrl.error = '';
        var auth = AuthService;

        function login(isValid, form){
            eLoginCtrl.error='';
            if(isValid){
                auth.login().save({username : eLoginCtrl.username, password:eLoginCtrl.password})
                    .$promise.then(function(response){
                        if(response.token && typeof(response.token)=='object'){
                            auth.saveToken(response.token.access, response.is_admin);
                            auth.set_user_first_name(response.first_name);
                            $state.go('home');
                        }else{
                            eLoginCtrl.error = 'Authorization is failed.'; 
                            $mdDialog.show({
                                controller: function(){
                                    this.cancel = function(){
                                        $mdDialog.hide();
                                    };
                                    this.title = "Error occured.";
                                    this.message = "Authorization is failed."
                                },
                                controllerAs : 'mlaCtrl',
                                templateUrl: 'static/templates/common_dialog.html',
                                escapeToClose: false,
                                clickOutsideToClose:false
                            });
                        }
                    },
                    function(error_res){
                        eLoginCtrl.error = error_res.data.message;
                        $mdDialog.show({
                            controller: function(){
                                this.cancel = function(){
                                    $mdDialog.hide();
                                };
                                this.title = "Error occured.";
                                this.message = eLoginCtrl.error;
                            },
                            controllerAs : 'mlaCtrl',
                            templateUrl: 'static/templates/common_dialog.html',
                            escapeToClose: false,
                            clickOutsideToClose:false
                        });
                });
            }
            
        };
    }
 })();
