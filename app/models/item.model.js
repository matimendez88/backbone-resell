'use strict';

SYI.module('Resell.Models', function(Models, SYI, Backbone, Marionette, $, _) {
    
    Models.Item = Backbone.Model.extend({
        urlRoot: '/items',
        defaults: {
            'id': null,
            'title': null,
            'price': null,
            'picture': null,
            'quantity': null,
            'visits': null,
            'sells': null,
            'listingId': null,
            'listingType': null
        }
    });

});