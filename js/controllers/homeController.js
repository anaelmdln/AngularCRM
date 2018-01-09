(function() {
	'use strict';
	angular.module('NgApp').controller('HomeController', HomeController);

	HomeController.inject = ['FirebaseFactory', '$scope'];

	function HomeController(FirebaseFactory, $scope) {
		let vm = this;
		vm.show = 'user_data';
		vm.state = 'creating';
		vm.create = create;
		vm.edit = edit;
		vm.save = save;
		vm.remove = remove;
		vm.cancel = cancel;

		init();

		function init() {
			FirebaseFactory.checkAuth(postInit);
		}

		function postInit(user) {
			FirebaseFactory.auth(user).then(user => {
				FirebaseFactory.getAll(updateView);
			});
		}

		function updateView(data) {
			// $scope.$applyAsync(() => {
				vm.users = JSON.parse(JSON.stringify(data));
			// });
			$scope.$applyAsync();
		}

		function create($event, user) {
			$event.preventDefault();
			FirebaseFactory.create(user).then(newUser => vm.users.push(newUser));
			vm.cancel($event);
		}

		function edit($event, id) {
			$event.preventDefault();
			vm.input_user = JSON.parse(JSON.stringify(vm.users.filter(user => user.id == id)[0]));
			vm.state = 'editing';
		}

		function save($event, user) {
			$event.preventDefault();
			FirebaseFactory.save(user, vm.users);
			vm.cancel($event);
		}

		function remove($event, id) {
			$event.preventDefault();
			FirebaseFactory.remove(id).then(response => {
				let index = vm.users.findIndex(item => item.id == id);
				vm.users.splice(index, 1);
			});
		}

		function cancel($event) {
			$event.preventDefault();
			vm.input_user = {};
			vm.state = 'creating';
		}
	}
})();