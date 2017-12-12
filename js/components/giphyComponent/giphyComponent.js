(function() {
	'use strict';
	angular.module('NgApp').component('giphyComponent', {
		templateUrl: '/js/components/giphyComponent/giphyComponent.html',
		controller: giphyComponent,
		controllerAs: 'giphyComponent',
		bindings: {
			user: '='
		}
	});

	giphyComponent.inject = ['GiphyFactory'];

	function giphyComponent(GiphyFactory) {
		let vm = this;
		vm.page = 1;
		vm.search = '';
		vm.next = next;
		vm.prev = prev;
		vm.update = update;
		vm.addFavorite = addFavorite;
		vm.removeFavorite = removeFavorite;

		function addFavorite($event, gif) {
			if (!vm.user.gifs) vm.user.gifs = [];
			let index = vm.user.gifs.findIndex(item => item.id == gif.id);
			if (index !== -1) return null;
			vm.user.gifs.push({
				id: gif.id,
				url: gif.images.preview.mp4,
				alt: gif.title
			});
		}

		function removeFavorite($event, gif) {
			if (!vm.user.gifs) vm.user.gifs = [];
			let index = vm.user.gifs.findIndex(item => item.id == gif.id);
			vm.user.gifs.splice(index, 1);
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