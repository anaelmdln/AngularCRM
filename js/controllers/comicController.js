(function() {
	'use strict';
	angular.module('NgApp').controller('ComicController', ComicController);

	ComicController.inject = ['MarvelFactory', '$routeParams'];

	function ComicController(MarvelFactory, $routeParams) {
		let vm = this;

		init();

		function init() {
			MarvelFactory.getComic($routeParams.comic_id).then(comic => {vm.comic = comic.results[0]; console.log(vm.comic);});
			vm.user_id = $routeParams.id;
		}
	}
})();