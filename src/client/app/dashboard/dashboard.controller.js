( function () {
	'use strict';

	/* @ngInject */
	function DashboardController( $q, logger, FlickrService, $window ) {
		var self = this;
		
		var store = $window.localStorage; 
		var storedSearch = store.getItem( 'search' );
		var storedPage   = store.getItem( 'page' );

		self.searchText;
		self.pageNumber;
		self.photos = [];
	    self.pageNav = [];
	    self.text = '';
		self.title = 'Dashboard';
		self.searchFlickr = searchFlickr;
		self.paginator = paginator;
		self.loading = true;
		self.seeResults = false; // hide results count if no data
		
		if ( storedSearch !== "undefined" && storedSearch && storedPage !== "undefined" && storedPage ) {
			self.searchText = storedSearch;
			self.pageNumber = storedPage;
		}

		searchFlickr( self.searchText, self.pageNumber );

		function searchFlickr( searchText, pageNumber ) {
			self.searchText = searchText || 'recents';
			pageNumber = pageNumber || 1;
			// store to localstorage all the searches
			store.setItem( 'search', searchText );
			store.setItem( 'page', pageNumber );
			self.searchTextResult = searchText;

			FlickrService.searchFlickr( searchText, pageNumber )
				.then( function ( data ) {
					self.loading = false;
					self.seeResults = true;
					self.photos = data.photos.photo;
		            self.page   = data.photos.page;
		            self.pages  = data.photos.pages;
		            self.total  = data.photos.total;
		            paginator();
				})
				.catch( errorHandler );
		}
		 function updateSearchText( searchText ) {
		 	self.searchText = FlickrService.setSearchText( searchText );
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
