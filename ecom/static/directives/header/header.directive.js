(function() {
	'use strict';
	angular
		.module('ecom')
		.directive('eHeader', nfHeader);

	function nfHeader(){
		var directive = {
			restrict: 'E',
			templateUrl: '/static/directives/header/header.html',
			controller: eHeaderController,
			controllerAs: 'header',
			bindToController: true
		};
		return directive;

		/** @ngInject */
		function eHeaderController(AuthService){
			var header = this;
			header.logout = logout;
			header.auth = AuthService;
			header.is_admin = header.auth.getIsAdmin();
			header.first_name = header.auth.get_user_first_name();
			
			function logout(){
				header.auth.logout();
			}
		}
	}
})();
