// 'use strict';

SYI.module('Resell.Views', function (Views, SYI, Backbone, Marionette, $, _) {

    Views.Item = Marionette.LayoutView.extend({

        tagName: 'li',

        className: 'item-container grid-item',

        template: __templates.resell.item,

        regions: {
            'cardFrontRegion': '[data-js="card-front"]',
            'cardBackRegion': '[data-js="card-back"]'
        },

        events: {},

        onShow: function() {
            var that = this,
                listingsCollection = this.options.listingsCollection,
                itemFrontView,
                itemBackView;

            itemFrontView = new Views.ItemFront({
                model: this.model
            });
            this.cardFrontRegion.show(itemFrontView);

            itemBackView = new Views.ItemBack({
                model: this.model,
                listingsCollection: listingsCollection
            });

            this.cardBackRegion.show(itemBackView);

            this.trigger('InnerViews:load');

            itemFrontView.on('Item:modify', function() {
                that.flipCard();
                that.trigger('Items:modify');
            });

            itemFrontView.on('Item:delete', function(modelId) {
                that.dispose();
                that.trigger('Item:delete', modelId);
            });

            itemBackView.on('Item:save', function() {
                that.flipCard();
                that.$el.removeClass('flip');
                that.trigger('Items:save');
            });

            SYI.Events.on('Action:modifyAll', function() {
                itemFrontView.modifyItem();
            });

            SYI.Events.on('Action:resellAll', function() {
                itemBackView.saveItem();
            });
        },

        flipCard: function() {
            this.$el.addClass('flip');
        },

        dispose: function() {
            // same as this.$el.remove();
            this.destroy();
            // unbind events that are
            // set on this view
            // this.off();
            // remove all models bindings
            // made by this view
            // this.model.off( null, null, this );
        }
    });

});