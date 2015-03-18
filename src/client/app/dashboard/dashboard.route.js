(function() {
	'use strict';

	function getStates() {
		return [
			{
				state: 'dashboard',
				config: {
					url: '/',
					templateUrl: 'app/dashboard/dashboard.html',
					controller: 'DashboardController',
					controllerAs: 'dashboard',
					title: 'dashboard'
				}
			}
		];
	}

	/* @ngInject */
	function appRun( routerHelper ) {
		routerHelper.configureStates( getStates() );
	}

	angular
		.module('app.dashboard')
		.run( appRun );
})();
