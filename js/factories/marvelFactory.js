(function() {
	'use strict';
	angular.module('NgApp').factory('MarvelFactory', MarvelFactory);

	MarvelFactory.inject = ['$http'];

	function MarvelFactory($http) {
		let api_url = 'https://gateway.marvel.com:443/v1/public/comics';
		let api_key_public = NgAppConfigs.marvel.publicKey;
		let api_key_private = NgAppConfigs.marvel.privateKey;
		let limit = 8;
		let page = 1;

		let service = {
			getPage: getPage
		}
		return service;

		function getPage(page, search) {
			let offset = limit * (page - 1);
			let url = api_url + 'api_key=' + api_key_public + '&title=' + search + '&limit=' + limit + '&offset=' + offset;
			return $http.get(url).then(success, error);
		}

		function success(response) {
			console.log(response);
			return response.data;
		}

		function error(err) {
			console.error(err);
		}

	}

})();