// 'use strict';

SYI.module('Resell.Views', function (Views, SYI, Backbone, Marionette, $, _) {

    Views.Main = Marionette.LayoutView.extend({

        template: __templates.resell.main,

        regions: {
            'actionsRegion': '[data-js="actions"]',
            'gridRegion': '[data-js="grid"]'
        },

        events: {},

        onShow: function(options) {
            var listingsCollection = this.options.listingsCollection,
                itemsCollectionView,
                actionsView;

            itemsCollectionView = new Views.Items({
                collection: this.collection,
                listingsCollection: listingsCollection
            });
            this.gridRegion.show(itemsCollectionView);

            actionsView = new Views.Actions();
            this.actionsRegion.show(actionsView);

            actionsView.on('Action:modifyAll', function() {
                console.log("actionsView");
            });
        }

    });

});