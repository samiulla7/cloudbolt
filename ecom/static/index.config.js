(function() {
    'use strict';
  
    angular
      .module('ecom')
      .config(config);
  
    /** @ngInject */
    function config($httpProvider, $resourceProvider) {
      // -------------------------------------------------------
      // Default Theme config For site
      // -------------------------------------------------------
      // $mdThemingProvider
      //   .theme('default')
      //   .primaryPalette('blue')
      //   // the below line is commented as we need all the color pattern in blue
      //   //except for warnings/ errors
      //   //.accentPalette('teal')
      //   .accentPalette('blue')
      //   .warnPalette('red')
      //   .backgroundPalette('grey');
      // -------------------------------------------------------
  
      // Enable log
      // $logProvider.debugEnabled(true);
      //
      // To enable CSRFToken -----------------------------------
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  
      $resourceProvider.defaults.stripTrailingSlashes = false;
      // -------------------------------------------------------
      // Auto-logout if any unAuthorized web api request is made
      // -------------------------------------------------------
      // unAuthorizedInterceptor
      // $provide.factory('unAuthorizedInterceptor', ['$q', function ($q) {
      //     return {
      //       'responseError': function (rejection) {
      //           if (rejection.status === 401) {
      //             window.location.href = '/#/login';
      //           }
      //           return $q.reject(rejection);
      //       }
      //     };
      // }]);
      // setting http provider
      // $httpProvider.interceptors.push('unAuthorizedInterceptor');
      // -------------------------------------------------------
    // vcRecaptchaServiceProvider.setDefaults({
    //   key: '6LdZbA8UAAAAAMJvEdkEghEYB6xB1nDYHRUIbjij',
    // });
    }
  
  
  })();
  