/* jshint -W117, -W030 */
describe( 'DashboardController', function() {
	var controller;
	var pics = mockData.getMockPictures;

	beforeEach(function() {
		bard.appModule('app.dashboard');
		bard.inject('$controller', '$log', '$q', '$rootScope', 'FlickrService');
	});

	beforeEach(function () {
		sinon.stub(FlickrService, 'searchFlickr').returns($q.when(pics));
		controller = $controller('DashboardController');
		$rootScope.$apply();
	});

	bard.verifyNoOutstandingHttpRequests();

	describe('Dashboard controller', function() {
		it('should be created successfully', function () {
			expect(controller).to.be.defined;
		});

		describe('after activate', function() {
			it('should have title of Dashboard', function () {
				expect(controller.title).to.equal('Dashboard');
			});

		});
	});
});
