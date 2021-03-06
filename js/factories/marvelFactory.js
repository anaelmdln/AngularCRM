(function() {
	'use strict';
	angular.module('NgApp').factory('MarvelFactory', MarvelFactory);

	MarvelFactory.inject = ['$http'];

	function MarvelFactory($http) {
		let api_url = 'https://gateway.marvel.com:443/v1/public/comics';
		let api_key_public = NgAppConfigs.marvel.publicKey;
		let limit = 4;
		let page = 1;

		let service = {
			getPage: getPage,
			getComic: getComic
		}
		return service;

		function getPage(page, search) {
			let offset = limit * (page - 1);
			let url = api_url + '?apikey=' + api_key_public + '&title=' + search + '&limit=' + limit + '&offset=' + offset;
			return $http.get(url).then(success, error);
		}

		function getComic(id) {
			let url = api_url + '/' + id + '?apikey=' + api_key_public;
			return $http.get(url).then(success, error);
		}

		function success(response) {
			return response.data.data;
		}

		function error(err) {
			console.error(err);
		}

	}

})();