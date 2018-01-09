(function() {
	'use strict';
	angular.module('NgApp').factory('UserFactory', UserFactory);

	UserFactory.inject = ['$http'];

	function UserFactory($http) {

		let service = {
			getAll: getAll,
			show: show,
			create: create,
			edit: edit,
			save: save,
			remove: remove
		}

		return service;

		function getAll() {
			return $http.get('http://localhost:3000/api/customers').then(success, error);
		}

		function show(id) {
			return $http.get('http://localhost:3000/api/customers/' + id).then(success, error);
		}

		function create(user) {
			return $http.post('http://localhost:3000/api/customers', user).then(success, error);
		}

		function edit(id) {
			return show(id);
		}

		function save(user) {
			return $http.put('http://localhost:3000/api/customers/' + user.id, user).then(success, error);
		}

		function remove(id) {
			return $http.delete('http://localhost:3000/api/customers/' + id).then(success, error);
		}

		function success(response) {
			return response.data;
		}

		function error(err) {
			console.error(err);
		}

	}

})();