(function(){
	'use strict';
	angular.module('NgApp').controller('HomeController', HomeController);

	HomeController.inject = ['UserFactory', 'GiphyFactory'];

	function HomeController(UserFactory, GiphyFactory) {
		let vm = this;
		let createBtn = document.getElementById('createBtn');
		let saveBtn = document.getElementById('saveBtn');
		let cancelBtn = document.getElementById('cancelBtn');
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
			createBtn.setAttribute('disabled', 'disabled');
			saveBtn.removeAttribute('disabled');
			cancelBtn.removeAttribute('disabled');
		}

		function save($event, user) {
			$event.preventDefault();
			UserFactory.save(user).then(item => {
				let index = vm.users.findIndex(item => item.id == user.id);
				vm.users[index] = user;
			});
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
			createBtn.removeAttribute('disabled');
			saveBtn.setAttribute('disabled', 'disabled');
			cancelBtn.setAttribute('disabled', 'disabled');
		}
	}
})();