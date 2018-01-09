(function() {
	'use strict';
	angular.module('NgApp').component('marvelComponent', {
		templateUrl: './js/components/marvelComponent/marvelComponent.html',
		controller: marvelComponent,
		controllerAs: 'marvelComponent',
		bindings: {
			user: '='
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
			if (!vm.user.comics) vm.user.comics = [];
			let index = vm.user.comics.findIndex(item => item.id == comic.id);
			if (index !== -1) return null;
			vm.user.comics.push({
				id: comic.id,
				url: (comic.images[0] !== undefined) ? comic.images[0].path + '/portrait_xlarge.' + comic.images[0].extension : '',
				alt: comic.title
			});
		}

		function removeFavorite($event, comic) {
			if (!vm.user.comics) vm.user.comics = [];
			let index = vm.user.comics.findIndex(item => item.id == comic.id);
			vm.user.comics.splice(index, 1);
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