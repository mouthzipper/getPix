( function ( angular ) {
	'use strict';

	/* @ngInject */
	function exception(logger) {
		var service = {
			catcher: catcher
		};
		return service;

		function catcher(message) {
			return function(reason) {
				logger.error(message, reason);
			};
		}
	}

	angular
		.module( 'blocks.exception' )
		.factory( 'exception', exception );
} ) ( angular );
