// 'use strict';

SYI.module('Resell.Views', function (Views, SYI, Backbone, Marionette, $, _) {    
    
    Views.ItemBack = Marionette.ItemView.extend({

        template: __templates.resell.itemBack,

        ui: {
            button: '[data-js="resellBtn"]'
        },

        events: {
            'click @ui.button': 'saveItem'
        },

        templateHelpers: function(){
            return {
                'model': this.model.toJSON(),
                'listings': this.options.listingsCollection.toJSON()
            };
        },

        saveItem: function() {
            var listingIdAttr = this.$('input:checked').attr('id'),
                listingId = listingIdAttr.split("-")[0],
                listingType = this.$('input:checked').attr('value');

            this.model.set({
                title: this.$('.item-title-container input').val(),
                price: this.$('.item-price-container input').val(),
                quantity: this.$('.item-quantity-container input').val(),
                listingId: listingId,
                listingType: listingType
            });

            this.model.save();
            this.trigger('Item:save');
        },

        modelEvents: {
            'change': 'render'
        }

    });
});