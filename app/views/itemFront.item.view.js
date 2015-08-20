// 'use strict';

SYI.module('Resell.Views', function (Views, SYI, Backbone, Marionette, $, _) {    
    
    Views.ItemFront = Marionette.ItemView.extend({

        template: __templates.resell.itemFront,

        ui: {
            modifyButton: '[data-js="modifyBtn"]',
            deleteButton: '[data-js="deleteBtn"]'
        },

        events: {
            'click @ui.modifyButton': 'modifyItem',
            'click @ui.deleteButton': 'deleteItem'
        },

        modifyItem: function() {
            this.trigger('Item:modify');
        },

        deleteItem: function(event) {
            var modelId = this.model.get('id');

            event.preventDefault();
            this.trigger('Item:delete', modelId);
        },

        modelEvents: {
            'change': 'render'
        }

    });
});