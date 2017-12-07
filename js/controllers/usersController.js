(function(){
	'use strict';
	angular.module('NgApp').controller('UsersController', UsersController);

	UsersController.inject = ['UserFactory', '$routeParams'];

	function UsersController(UserFactory, $routeParams) {
		let vm = this;
		vm.show = 'gifs';
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
				alt: gif.title
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
				url: (comic.images[0] !== undefined) ? comic.images[0].path + '/portrait_xlarge.' + comic.images[0].extension : '',
				alt: comic.title
			});
			UserFactory.save(user).then(response => vm.user = user);
		}

		function removeFavoriteComic($event, comic) {
			let user = JSON.parse(JSON.stringify(vm.user));
			let index = user.comics.findIndex(item => item.id == comic.id);
			user.comics.splice(index, 1);
			UserFactory.save(user).then(response => vm.user = user);
		}
	}
})();