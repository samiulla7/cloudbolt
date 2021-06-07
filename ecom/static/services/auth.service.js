(function () {
    'use strict';

    angular
      .module('ecom')
      .service('AuthService', AuthService);

    function AuthService($http, $state, $window, $localStorage, $resource, LOGIN_URL, REGISTER_URL, ApiService) {
      var self = this;
      self.login = login;
      self.register = register;
      self.first_name = '';
      self.set_user_first_name = set_user_first_name;
      self.get_user_first_name = get_user_first_name;
      // Add JWT methods here
      self.parseJwt = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
      }

      self.saveToken = function(token, is_admin) {
        $localStorage.currentUser = { token: token, is_admin:is_admin };
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
      }

      self.getToken = function() {
        return $localStorage.currentUser;
      }

      self.getIsAdmin = function() {
        if(typeof($localStorage.currentUser) === 'object'){
            return $localStorage.currentUser.is_admin;
        }else{
            return $localStorage.currentUser;
        }
      }

      self.deleteToken = function(){
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
      }

      self.isAuthenticated = function() {
        var token = self.getToken();
        if(typeof(token) === 'object'){
          token = token.token;
        }
        if(token) {
          var params = self.parseJwt(token);
          return Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
          return false;
        }
      }

      function login(){
        return $resource(LOGIN_URL);
      }

      function register(){
        return $resource(REGISTER_URL);
      }

      function set_user_first_name(name){
        self.first_name = name;
      }

      function get_user_first_name(){
        return self.first_name;
      }

      // Logout User
      self.logout = function() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
        ApiService.clear_data();
        /*
        * Todo : We need to add feature which would initializse the service after logout
        * following line we need to remove once we found the proper fix.
        */
        $state.go('login');
      }
    }

})();
