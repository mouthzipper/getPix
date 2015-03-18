( function () {
	'use strict';

	angular
		.module( 'app.data', [ 'app.core' ] )
		.constant('API_CONFIG', {
			'URL' : 'https://api.flickr.com/services/rest/',
			'KEY' : '1ae573065e51e6cc93f8313699226a02'
			} );
})();