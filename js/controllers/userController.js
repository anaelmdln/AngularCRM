(function(){
	'use strict';
	angular.module('NgApp').controller('UserController', UserController);

	UserController.inject = ['UserFactory', 'GiphyFactory', 'MarvelFactory', '$routeParams'];

	function UserController(UserFactory, GiphyFactory, MarvelFactory, $routeParams) {
		let vm = this;
		vm.page = 1;
		vm.search = '';
		vm.next = next;
		vm.prev = prev;
		vm.update = update;
		vm.addFavorite = addFavorite;
		vm.removeFavorite = removeFavorite;

		init();

		function init() {
			vm.page = 1;
			UserFactory.show($routeParams.id).then(user => vm.user = user);
			GiphyFactory.getPage(vm.page, vm.search).then(gifs => vm.gifs = gifs);
			MarvelFactory.getPage(1, 'spiderman').then(comics => vm.comics = comics);
		}

		function addFavorite($event, gif) {
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

		function removeFavorite($event, gif) {
			let user = JSON.parse(JSON.stringify(vm.user));
			let index = user.gifs.findIndex(item => item.id == gif.id);
			user.gifs.splice(index, 1);
			UserFactory.save(user).then(response => vm.user = user);
		}

		function next($event) {
			$event.preventDefault();
			if (vm.page >= 1) vm.page++;
			GiphyFactory.getPage(vm.page, vm.search).then(gifs => vm.gifs = gifs);
		}

		function prev($event) {
			$event.preventDefault();
			if (vm.page > 1) vm.page--;
			GiphyFactory.getPage(vm.page, vm.search).then(gifs => vm.gifs = gifs);
		}

		function update($event) {
			$event.preventDefault();
			vm.page = 1;
			GiphyFactory.getPage(vm.page, vm.search).then(gifs => vm.gifs = gifs);
		}
	}
})();