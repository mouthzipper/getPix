( function () {
	'use strict';

	/* @ngInject */
	function DetailController( $q, logger, FlickrService, $stateParams ) {
		var self = this;
		
		getPhoto( $stateParams.photoId );
		
		function getPhoto( photoId ) {
			FlickrService.getPhotoDetail( photoId )
				.then( function ( data ) {
					self.photoSrc = 'http://farm'+data.farm+'.static.flickr.com/'+data.server+'/'+data.id+'_'+data.secret+'_b.jpg';
					self.title = data.title._content;
					self.posted = data.dates.posted;
					self.owner = data.owner.username;
					self.nsid = data.owner.nsid;
					self.comments = data.comments._content;
					self.views = data.views;
				} )
		} 

	}


	angular
		.module( 'app.detail' )
		.controller( 'DetailController', DetailController );

} ) ();
