(function () {
    'use strict';
    
    angular
        .module('ecom')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        
        $stateProvider
            .state('root', {
                abstract: true,
                views: {
                    'root': {
                        templateUrl: '/static/controllers/main_abstract/main_abstract.html',
                        controller: 'EMainAbstractController',
                        controllerAs: 'EMainAbstractCtrl'
                    }
                }
            })
            .state('home', {
                parent: 'root',
                url: '/',
                authenticate: false,
                views: {
                    'eSidenav' : { template : '<e-sidenav></e-sidenav>'},
                    'eHeader' : { template : '<e-header></e-header>'},
                    'eBody': {
                        templateUrl: '/static/controllers/home/home.html',
                        controller: 'EHomeController',
                        controllerAs: 'EHomeCtrl'
                    }
                },
            })
            .state('404', {
                parent: 'root',
                url: '/page_not_found',
                authenticate: false,
                views: {
                    'eHeader' : '<e-header></e-header>',
                    'eBody': {
                        templateUrl: '/static/templates/error.html'
                    }
                }
            })
            .state('login', {
                parent: 'root',
                url: '/login',
                authenticate: false,
                views: {
                    'eBody': {
                        templateUrl: '/static/controllers/login/login.html',
                        controller: 'eLoginController',
                        controllerAs: 'eLoginCtrl'
                    }
                }
            })
            .state('register', {
                parent: 'root',
                url: '/register',
                authenticate: false,
                views: {
                    'eBody': {
                        templateUrl: '/static/controllers/register/register.html',
                        controller: 'eRegisterController',
                        controllerAs: 'eRegisterCtrl'
                    }
                }
            })
            .state('update-product', {
                parent: 'root',
                url: '/update-product/:product_id',
                authenticate: false,
                views: {
                    'eSidenav' : { template : '<e-sidenav></e-sidenav>'},
                    'eHeader' : { template : '<e-header></e-header>'},
                    'eBody': {
                        templateUrl: '/static/controllers/add_update_product/add_update_product.html',
                        controller: 'EAddEditProductController',
                        controllerAs: 'eAECtrl'
                    }
                }
            })
            .state('create-product', {
                parent: 'root',
                url: '/create-product/',
                authenticate: false,
                views: {
                    'eSidenav' : { template : '<e-sidenav></e-sidenav>'},
                    'eHeader' : { template : '<e-header></e-header>'},
                    'eBody': {
                        templateUrl: '/static/controllers/add_update_product/add_update_product.html',
                        controller: 'EAddEditProductController',
                        controllerAs: 'eAECtrl'
                    }
                }
            })
            .state('upload-picture', {
                parent: 'root',
                url: '/upload-product/:product_id',
                authenticate: false,
                views: {
                    'eSidenav' : { template : '<e-sidenav></e-sidenav>'},
                    'eHeader' : { template : '<e-header></e-header>'},
                    'eBody': {
                        templateUrl: '/static/controllers/upload_picture/upload_picture_form.html',
                        controller: 'EUploadPictureController',
                        controllerAs: 'Eupctrl'
                    }
                }
            })
            .state('product-details', {
                parent: 'root',
                url: '/product-details/:product_id',
                authenticate: false,
                views: {
                    'eSidenav' : { template : '<e-sidenav></e-sidenav>'},
                    'eHeader' : { template : '<e-header></e-header>'},
                    'eBody': {
                        templateUrl: '/static/controllers/view_details/view_details.html',
                        controller: 'EViewDetailsController',
                        controllerAs: 'Evdctrl'
                    }
                }
            })
            
        $urlRouterProvider
            .when('', '/')
            .otherwise(function ($injector, $location) {
                var state = $injector.get('$state');
                state.go('404');
                return $location.path();
            });
    }

})();
