(function(){
	'use strict';
	angular.module('NgApp').component('marvelComponent', {
		templateUrl: '/js/components/marvelComponent/marvelComponent.html',
		controller: marvelComponent,
		controllerAs: 'marvelComponent',
		bindings: {
			user: '='
		}
	});

	marvelComponent.inject = ['MarvelFactory', 'UserFactory'];

	function marvelComponent(MarvelFactory, UserFactory) {
		let vm = this;
		vm.page = 1;
		vm.search = '';
		vm.next = next;
		vm.prev = prev;
		vm.update = update;
		vm.addFavoriteComic = addFavoriteComic;
		vm.removeFavoriteComic = removeFavoriteComic;

		init();

		function init() {
			vm.page = 1;
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