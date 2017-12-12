(function() {
	'use strict';
	angular.module('NgApp', ['ngRoute', 'firebase']).config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider
		.when('/', {
			controller: 'HomeController',
			templateUrl: '/views/home.html',
			controllerAs: 'homeController'
		})
		.when('/user/:id', {
			controller: 'UsersController',
			templateUrl: '/views/user.html',
			controllerAs: 'usersController'
		})
		.when('/user/:id/comic/:comic_id', {
			controller: 'ComicController',
			templateUrl: '/views/comic.html',
			controllerAs: 'comicController'
		});
	}

})();