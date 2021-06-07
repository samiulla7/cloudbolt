(function() {
    'use strict';
  
    angular
      .module('ecom')
      .run(runBlock);
  
    /** @ngInject */
    function runBlock($rootScope, $state, $http, $location, $localStorage, $mdDialog, AuthService) {
      // keep user logged in after page refresh
      if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer '+ $localStorage.currentUser.token;
      }
      
      // redirect to login page if not logged in
      // and trying to access a restricted page
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if(!$localStorage.currentUser) {
            if($location.path()=='/register'){
                $location.path('/register');    
            }else{
                $location.path('/login');
            }
        }
        //close any dialog on location change
         $mdDialog.cancel();
      });
  
      // ---------------------------------------------------------------
      //  Authenticate State and allow else redirect to login
      //  Ref: https://solidfoundationwebdev.com/blog/posts/require-authentication-for-certain-routes-with-ui-router-in-angularjs
      // ---------------------------------------------------------------
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !AuthService.isAuthenticated()){
          $state.go('login');
          event.preventDefault();
        }
      });
      //close any dialog on state change
      $mdDialog.cancel();
      // ---------------------------------------------------------------
  
    }
  
  })();
  