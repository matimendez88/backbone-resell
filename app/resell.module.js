'use strict';

SYI.module('Resell', function(Resell, SYI, Backbone, Marionette, $, _) {
	var controller,
		Router;

		Router = Marionette.AppRouter.extend({
			'appRoutes': {
				'': 'index'
			}
		});

		controller = {
			index: function() {
				console.log("Hello World");
			}
		};

		SYI.onStart = function() {
			new Router({
				controller: controller
			});
		};
});