(function(){
	'use strict';
	angular.module('NgApp').controller('HomeController', HomeController);

	HomeController.inject = ['UserFactory'];

	function HomeController(UserFactory) {
		let vm = this;
		vm.state = 'creating';
		vm.create = create;
		vm.edit = edit;
		vm.save = save;
		vm.remove = remove;
		vm.cancel = cancel;

		init();

		function init() {
			UserFactory.getAll().then(users => vm.users = users);
		}

		function create($event, user) {
			$event.preventDefault();
			UserFactory.create(user).then(newUser => {
				vm.users.push(newUser)});
		}

		function edit($event, id) {
			$event.preventDefault();
			UserFactory.edit(id).then(user => vm.input_user = user);
			vm.state = 'editing';
		}

		function save($event, user) {
			$event.preventDefault();
			UserFactory.save(user).then(item => {
				let index = vm.users.findIndex(item => item.id == user.id);
				vm.users[index] = user;
			});
			vm.state = 'creating';
		}

		function remove($event, id) {
			$event.preventDefault();
			UserFactory.remove(id).then(response => {
				let index = vm.users.findIndex(item => item.id == id);
				vm.users.splice(index, 1);
			});
		}

		function cancel($event, id) {
			$event.preventDefault();
			vm.input_user = {};
			vm.state = 'creating';
		}
	}
})();