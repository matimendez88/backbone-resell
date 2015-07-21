// 'use strict';

SYI.module('Resell.Views', function (Views, SYI, Backbone, Marionette, $, _) {    
    
    Views.ItemFront = Marionette.ItemView.extend({

        template: __templates.resell.itemFront,

        ui: {
            button: '[data-js="modifyBtn"]'
        },

        events: {
            'click @ui.button': 'modifyItem'
        },

        modifyItem: function() {
            this.trigger('Item:modify');
        },

        modelEvents: {
            'change': 'render'
        }

    });
});