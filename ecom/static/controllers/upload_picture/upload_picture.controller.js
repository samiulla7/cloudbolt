(function () {
    'use strict';

    angular
        .module('ecom')
        .controller('EUploadPictureController',EUploadPictureController);

    EUploadPictureController.$inject = [
        "$mdDialog",
        'AuthService',
        'ApiService',
        '$state',
        'fileUploadService',
        '$stateParams'
    ]

    function EUploadPictureController($mdDialog, AuthService, ApiService, $state, fileUploadService, $stateParams){
        var auth = AuthService;
        var Eupctrl = this;
        Eupctrl.product_id = $stateParams.product_id;
        Eupctrl.submit_data = submit_data;
        Eupctrl.picture = "";
        
        
        function submit_data(){
            var result = fileUploadService.uploadFileToUrl(Eupctrl.picture, Eupctrl.product_id);
            result.then(function (res, status) {
                alert(res.message);
                $state.go('home')
            });   
        }

        
    }
 })();

