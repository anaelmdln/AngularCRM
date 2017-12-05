(function(){
	'use strict';
	angular.module('NgApp').controller('UsersController', UsersController);

	UsersController.inject = ['UserFactory', '$routeParams'];

	function UsersController(UserFactory, $routeParams) {
		let vm = this;
		vm.showComics = showComics;
		vm.showGifs = showGifs;

		init();

		function init() {
			UserFactory.show($routeParams.id).then(user => vm.user = user);
		}

		function showComics() {
			document.getElementById("comics_view").classList.remove("hide");
			document.getElementById("gifs_view").classList.add("hide");
			document.getElementById("show_comics").classList.add("active");
			document.getElementById("show_gifs").classList.remove("active");
		}

		function showGifs() {
			document.getElementById("comics_view").classList.add("hide");
			document.getElementById("gifs_view").classList.remove("hide");
			document.getElementById("show_comics").classList.remove("active");
			document.getElementById("show_gifs").classList.add("active");
		}
	}
})();