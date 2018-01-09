(function () {
	'use strict';
	angular.module('NgApp').factory('FirebaseFactory', FirebaseFactory);

	FirebaseFactory.inject = [];

	function FirebaseFactory() {

		let service = {
			getAll: getAll,
			create: create,
			save: save,
			show: show,
			remove: remove,
			auth: auth,
			checkAuth: checkAuth
		}

		let currentUser;


		return service;

		function auth(user) {
			if(user !== null) {
				currentUser = user.uid;
				return new Promise(resolve => resolve(currentUser));
			} else {
				return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
				.then(resolve => {
					let provider = new firebase.auth.GoogleAuthProvider();
					return firebase.auth().signInWithPopup(provider).then(firebaseUser => firebaseUser.uid);
				});
			}
		}

		function checkAuth(postInit) {
			firebase.auth().onAuthStateChanged(postInit);
		}

		function getAll(callback) {
			return firebase.database().ref('users/' + currentUser).child('users')
			.on('value', users => callback(format(users.val())));
		}

		function format(data) {
			if (data) {
				return Object.keys(data).map(key => {
					data[key]['id'] = key;
					return data[key];
				});
			} else {
				return data;
			}
		}

		function unformat(data) {
			if (data) {
				return data.map(value => {
					let obj = {};
					let key = value['id'];
					obj[key] = value;
					delete obj[key].id;
					delete obj[key].$$hashKey;
					return obj;
				});
			} else {
				return data;
			}
		}

		function create(user) {
			user = user ? user : {};
			return firebase.database().ref('users/' + currentUser).child('users').push(user);
		}

		function show(id, callback) {
			return firebase.database().ref('users/' + currentUser + '/users/' + id).once('value', data => callback(format([data.val()])[0]));
		}

		function save(user) {
			return firebase.database().ref('users/' + currentUser + '/users').update(unformat([user])[0]);
		}

		function remove(id) {
			return firebase.database().ref('users/' + currentUser + '/users/' + id).remove();
		}

		function success(response) {
			return response.data;
		}

		function error(err) {
			console.error(err);
		}

	}

})();