( function () {
	'use strict';

	/* @ngInject */
	function toastrConfig( toastr ) {
		toastr.options.timeOut       = 4000;
		toastr.options.positionClass = 'toast-bottom-right';
	}

	/* @ngInject */
	function configure( $logProvider, routerHelperProvider, exceptionHandlerProvider ) {
		if ( $logProvider.debugEnabled ) {
			$logProvider.debugEnabled( true );
		}
		exceptionHandlerProvider.configure( config.appErrorPrefix );
		routerHelperProvider.configure( { docTitle: config.appTitle + ': ' } );
	}

	var core = angular.module( 'app.core' );

	core.config( toastrConfig );

	var config = {
		appErrorPrefix : '[client Error] ',
		appTitle       : 'getPix'
	};

	core.value('config', config);
	core.config( configure );

})();
