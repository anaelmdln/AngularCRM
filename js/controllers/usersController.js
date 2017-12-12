(function() {
	'use strict';
	angular.module('NgApp').controller('UsersController', UsersController);

	UsersController.inject = ['FirebaseFactory', '$routeParams', '$scope'];

	function UsersController(FirebaseFactory, $routeParams, $scope) {
		let vm = this;

		init();

		function init() {
			FirebaseFactory.checkAuth(postInit);
		}

		function postInit(user) {
			FirebaseFactory.auth(user).then(user => {
				FirebaseFactory.show($routeParams.id, updateView);
			});
		}

		function updateView(data) {
			$scope.$applyAsync(() => {
				console.log(data);
				data.id = $routeParams.id;
				vm.user = data;
			});
		}
	}
})();