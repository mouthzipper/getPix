/* jshint -W117, -W030 */
describe( 'LayoutController', function () {
	var controller;

	beforeEach( function() {
		bard.appModule( 'app.layout' );
		bard.inject( '$controller', '$q', '$rootScope', '$timeout' );
	});

	beforeEach(function () {
		controller = $controller( 'LayoutController' );
		$rootScope.$apply();
	});

	bard.verifyNoOutstandingHttpRequests();

	describe('Layout controller', function() {
		it('should be created successfully', function () {
			expect(controller).to.be.defined;
		});
	});
});
