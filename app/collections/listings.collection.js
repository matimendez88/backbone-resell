'use strict';

SYI.module('Resell.Collections', function(Collections, SYI, Backbone, Marionette, $, _) {

	Collections.Listings = Backbone.Collection.extend({
		url: '/listings',
		model: SYI.Resell.Models.Listing
	});

});