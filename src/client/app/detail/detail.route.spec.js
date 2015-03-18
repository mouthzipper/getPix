/* jshint -W117, -W030 */
describe('detail routes', function () {
	describe('state', function () {
		var controller;
		var view = 'app/detail/detail.html';

		beforeEach(function() {
			module('app.detail', bard.fakeToastr);
			bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
		});

		beforeEach(function() {
			$templateCache.put(view, '');
		});

		bard.verifyNoOutstandingHttpRequests();

		it('should map state detail to url /photo ', function() {
			expect($state.href('detail', {})).to.equal('/photo/');
		});

		it('should map /photo/ route to detail View template', function () {
			expect($state.get('detail').templateUrl).to.equal(view);
		});

		it('of detail should work with $state.go', function () {
			$state.go('detail');
			$rootScope.$apply();
			expect($state.is('detail'));
		});
	});
});
