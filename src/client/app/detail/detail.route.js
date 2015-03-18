(function() {
	'use strict';

	function getStates() {
		return [
			{
				state: 'detail',
				config: {
					url: '/photo/:photoId',
					templateUrl: 'app/detail/detail.html',
					controller: 'DetailController',
					controllerAs: 'detail',
					title: 'detail'
				}
			}
		];
	}

	/* @ngInject */
	function appRun( routerHelper ) {
		routerHelper.configureStates( getStates() );
	}

	angular
		.module('app.detail')
		.run( appRun );
})();
