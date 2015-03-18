( function () {
	'use strict';

	/* @ngInject */
	function FlickrService( $http, $q, API_CONFIG, $state ) {
		var self = this;

		self.perPage  =  10;
		self.API_KEY  = API_CONFIG.KEY;
		self.API_URL = API_CONFIG.URL;

		function searchFlickr( search, page ){

			search = search || '';
			
			var deferred = $q.defer();

			var params = {
				api_key        : self.API_KEY,
				per_page       : self.perPage,
				format         : 'json',
				nojsoncallback : 1,
				page           : ( page !== null && page > 0 ) ? page : 1, // default to page 1
				method         : ( search !== null && search.length > 0) ? 'flickr.photos.search' : 'flickr.photos.getRecent'
			};

			if ( ( search !== null && search.length > 0 ) ) {
				params.text = search;
			}
			$http
				.get( self.API_URL, {
					params : params
				})
				.success(function( data ) {
					deferred.resolve(data);
				})
				.error(function( data ) {
					deferred.reject(status);
				});

			return deferred.promise;
		}
		function getPhotoDetail( photoId ){

			var deferred = $q.defer();

			var params = {
				api_key        : self.API_KEY,
				photo_id       : photoId,
				format         : 'json',
				nojsoncallback : 1,
				method         : 'flickr.photos.getInfo'
			};

			$http
				.get( self.API_URL, {
					params : params
				})
				.success(function( data ) {
					deferred.resolve(data.photo);
				})
				.error(function( data ) {
					deferred.reject(status);
				});

			return deferred.promise;
		}

		var service = {
			searchFlickr   : searchFlickr,
			getPhotoDetail : getPhotoDetail
		};

		return service;
	}

	angular
		.module( 'app.data' )
		.factory( 'FlickrService', FlickrService );

} ) ();
