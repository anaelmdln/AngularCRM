(function(){
	'use strict';
	angular.module('NgApp').controller('ComicsController', ComicsController);

	ComicsController.inject = ['MarvelFactory', '$routeParams'];

	function ComicsController(MarvelFactory, $routeParams) {
		let vm = this;
		vm.page = 1;
		vm.search = '';
		vm.next = next;
		vm.prev = prev;
		vm.update = update;

		init();

		function init() {
			vm.page = 1;
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