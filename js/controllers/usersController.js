(function(){
	'use strict';
	angular.module('NgApp').controller('UsersController', UsersController);

	UsersController.inject = ['UserFactory', '$routeParams'];

	function UsersController(UserFactory, $routeParams) {
		let vm = this;
		vm.showComics = showComics;
		vm.showGifs = showGifs;
		vm.addFavoriteGif = addFavoriteGif;
		vm.removeFavoriteGif = removeFavoriteGif;
		vm.addFavoriteComic = addFavoriteComic;
		vm.removeFavoriteComic = removeFavoriteComic;

		init();

		function init() {
			UserFactory.show($routeParams.id).then(user => vm.user = user);
		}

		function addFavoriteGif($event, gif) {
			let user = JSON.parse(JSON.stringify(vm.user));
			if (!user.gifs) user.gifs = [];
			let index = user.gifs.findIndex(item => item.id == gif.id);
			if (index !== -1) return null;
			user.gifs.push({
				id: gif.id,
				url: gif.images.preview.mp4,
			});
			UserFactory.save(user).then(response => vm.user = user);
		}

		function removeFavoriteGif($event, gif) {
			let user = JSON.parse(JSON.stringify(vm.user));
			let index = user.gifs.findIndex(item => item.id == gif.id);
			user.gifs.splice(index, 1);
			UserFactory.save(user).then(response => vm.user = user);
		}

		function addFavoriteComic($event, comic) {
			let user = JSON.parse(JSON.stringify(vm.user));
			if (!user.comics) user.comics = [];
			let index = user.comics.findIndex(item => item.id == comic.id);
			if (index !== -1) return null;
			user.comics.push({
				id: comic.id,
				url: comic.images[0].path + '/portrait_xlarge.' + comic.images[0].extension,
			});
			UserFactory.save(user).then(response => vm.user = user);
		}

		function removeFavoriteComic($event, comic) {
			let user = JSON.parse(JSON.stringify(vm.user));
			let index = user.comics.findIndex(item => item.id == comic.id);
			user.comics.splice(index, 1);
			UserFactory.save(user).then(response => vm.user = user);
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