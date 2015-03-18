/* jshint -W079 */
var mockData = (function() {
	return {
		getMockPictures: getMockPictures,
		getMockStates: getMockStates
	};

	function getMockStates() {
		return [
			{
				state: 'dashboard',
				config: {
					url: '/',
					templateUrl: 'app/dashboard/dashboard.html',
					title: 'dashboard'
				}
			}
		];
	}

	function getMockPosts() {
		return [
			{photo_id: 1, src: 'this is an images'},
			{photo_id: 2, src: 'this is an images'},
			{photo_id: 3, src: 'this is an images'}
		];
	}
})();
