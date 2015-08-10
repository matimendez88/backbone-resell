// 'use strict';

SYI.module('Resell', function (Resell, SYI, Backbone, Marionette, $, _) {
    var controller,
        Router;

    SYI.Resell.Cache = {};
    SYI.Resell.Cache.Collections = {};

    Router = Marionette.AppRouter.extend({
        'appRoutes': {
            '': 'index'
        }
    });

    controller = {
        index: function() {
            var itemsCollection,
                listingsCollection,
                mainLayoutView;

            listingsCollection = new Resell.Collections.Listings();
            listingsCollection.fetch({
                'success': function(collection, response, options) {
                    collection.trigger('fetched');
                }
            });

            itemsCollection = new Resell.Collections.Items();				
            itemsCollection.fetch({
                'success': function(collection, response, options){
                    SYI.Resell.Cache.Collections.Items = _.extend({}, collection);

                    mainLayoutView = new Resell.Views.Main({
                        collection: collection,
                        listingsCollection: listingsCollection
                    });
                    SYI.mainRegion.show(mainLayoutView);
                }
            });
        }
    };

    SYI.onStart = function() {
        new Router({
            controller: controller
        });
    };
});