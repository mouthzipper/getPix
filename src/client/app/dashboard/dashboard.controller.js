( function () {
	'use strict';

	/* @ngInject */
	function DashboardController( $q, logger, FlickrService ) {
		var self = this;

		self.photos = [];
	    self.currentPhoto = null;
	    self.pageNav = [];
	    self.text = '';
		self.title = 'Dashboard';
		self.searchFlickr = searchFlickr;
		self.paginator = paginator;
		searchFlickr();

		function searchFlickr( searchText, pageNumber ) {
			FlickrService.searchFlickr( searchText, pageNumber )
				.then( function ( data ) {
					self.photos = data.photos.photo;
		            self.page   = data.photos.page;
		            self.pages  = data.photos.pages;
		            self.total  = data.photos.total;
		            paginator();
				})
				.catch( errorHandler );
		}

		// paginator 
		function paginator (){
	       	var pageNav = [];
	        if( self.page > 1 ){
	            pageNav.push( { text: '<<', number: self.page - 1, current: false } );
	        }

	        for( var i = 1; i <= self.pages; i++ ) {
	            if( i === self.page ) {
	                if( self.page === 1) {
	                    pageNav.push({text: self.page, number: self.page, current: true});
	                }
	            }else {
	                if(i >= self.page - 4 && i < self.page + 4 ) {
	                    pageNav.push({text: i, number: i, current: true});
	                }
	            }
	        }
	        if(self.page < self.pages){
	            pageNav.push({text: '>>', number: (self.page + 1), current: false});
	        }
	       	self.pageNav = pageNav;
    	}

		function errorHandler( error ) {
			var msg = 'Error in fetching data';
			logger.error( msg) ;
			return $q.reject(msg);
		}

	}


	angular
		.module( 'app.dashboard' )
		.controller( 'DashboardController', DashboardController );

} ) ();
