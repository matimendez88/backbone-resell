Resell.Models.Listing = Backbone.Model.extend({
    urlRoot: '/listings',
    defaults: {
        'id': null,
        'listingId': null,
        'name': null,
        'resellCost': null,
        'sellCost': null
    }
});