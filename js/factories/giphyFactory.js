(function() {
	'use strict';
	angular.module('NgApp').factory('GiphyFactory', GiphyFactory);

	GiphyFactory.inject = ['$http'];

	function GiphyFactory($http) {
		let api_url = 'https://api.giphy.com/v1/gifs/search?';
		let api_key = NgAppConfigs.giphy.apiKey;
		let limit = 8;
		let rating = 'G';
		let lang = 'en';
		let page = 1;

		let service = {
			getPage: getPage
		}
		return service;

		function getPage(page, search) {
			let offset = limit * (page - 1);
			let url = api_url + 'api_key=' + api_key + '&q=' + search + '&limit=' + limit + '&offset=' + offset + '&rating=' + rating + '&lang=' + lang + '$sort=trending';
			return $http.get(url).then(success, error);
		}

		function success(response) {
			return response.data;
		}

		function error(err) {
			console.error(err);
		}

	}

})();