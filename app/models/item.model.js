Resell.Models.Item = Backbone.Model.extend({
	urlRoot: '/items',
    defaults: {
        'title': null,
        'price': null,
        'picture': null,
        'quantity': null,
        'visits': null,
        'sells': null,
        'listingType': null
    }
});