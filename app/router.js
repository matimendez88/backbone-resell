// var Router = Backbone.Router.extend({
//     routes: {
//         "": "index"
//     },

//     initialize: function() {},

//     index: function() {
//         var itemsCollection = new Resell.Collections.Items();
//         itemsCollection.fetch({
//             'success': function(collection, response, options){
//                 collection.trigger('fetched');
//             }
//         });

//         var listingsCollection = new Resell.Collections.Listings();
//         listingsCollection.fetch({
//             'success': function(collection, response, options) {
//                 collection.trigger('fetched');
//             }
//         });

//         var itemsCollectionView = new Resell.Views.Items({
//             collection: itemsCollection,
//             listingsCollection: listingsCollection
//         });

//         $('#app').html(itemsCollectionView.el);
//     }
// });

// $(function(){
//     Resell.Router = new Router();
//     Backbone.history.start({pushState: true});
// });