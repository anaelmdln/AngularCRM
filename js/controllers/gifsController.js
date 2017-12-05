(function(){
	'use strict';
	angular.module('NgApp').controller('GifsController', GifsController);

	GifsController.inject = ['GiphyFactory', '$routeParams'];

	function GifsController(GiphyFactory, $routeParams) {
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