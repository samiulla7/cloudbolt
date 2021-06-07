(function() {
	'use strict';
	angular
		.module('ecom')
		.directive('eSidenav', eSidenav);

	function eSidenav(){
		var directive = {
			restrict: 'E',
			templateUrl: '/static/directives/sidenavbar/sidenavbar.html',
			controller: eSideNavController,
			controllerAs: 'side_nav',
			bindToController: true
		};
		return directive;

		/** @ngInject */
		function eSideNavController(){
           
        }
	}
})();
