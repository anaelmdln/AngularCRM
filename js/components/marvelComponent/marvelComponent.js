(function(){
	'use strict';
	angular.module('NgApp').component('marvelComponent', {
		templateUrl: '/js/components/marvelComponent/marvelComponent.html',
		controller: marvelComponent,
		controllerAs: 'marvelComponent',
		bindings: {
			user: '=',
			addFavoriteComic: '&',
			removeFavoriteComic: '&'
		}
	});

	marvelComponent.inject = ['MarvelFactory'];

	function marvelComponent(MarvelFactory) {
		let vm = this;
		vm.page = 1;
		vm.search = '';
		vm.next = next;
		vm.prev = prev;
		vm.update = update;
		vm.addFavorite = addFavorite;
		vm.removeFavorite = removeFavorite;

		function addFavorite($event, comic) {
			vm.addFavoriteComic({'event': $event, 'comic': comic});
		}

		function removeFavorite($event, comic) {
			vm.removeFavoriteComic({'event': $event, 'comic': comic});
		}

		function next($event) {
			$event.preventDefault();
			if (vm.page >= 1) vm.page++;
			MarvelFactory.getPage(vm.page, vm.search).then(comics => vm.comics = comics);
		}

		function prev($event) {
			$event.preventDefault();
			if (vm.page > 1) vm.page--;
			MarvelFactory.getPage(vm.page, vm.search).then(comics => vm.comics = comics);
		}

		function update($event) {
			$event.preventDefault();
			vm.page = 1;
			MarvelFactory.getPage(vm.page, vm.search).then(comics => vm.comics = comics);
		}
	}
})();