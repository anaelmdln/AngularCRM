(function(){
	'use strict';
	angular.module('NgApp').component('giphyComponent', {
		templateUrl: '/js/components/giphyComponent/giphyComponent.html',
		controller: giphyComponent,
		controllerAs: 'giphyComponent',
		bindings: {
			user: '=',
			addFavoriteGif: '&',
			removeFavoriteGif: '&'
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
			vm.addFavoriteGif({'event': $event, 'gif': gif});
		}

		function removeFavorite($event, gif) {
			vm.removeFavoriteGif({'event': $event, 'gif': gif});
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