// 'use strict';

SYI.module('Resell.Views', function (Views, SYI, Backbone, Marionette, $, _) {    
    
    Views.Actions = Marionette.ItemView.extend({

        onShow: function() {
            console.log("actions view");
        },

        template: __templates.resell.actions,

        ui: {
            btnModifyAll: '[data-js="modifyAll"]',
            btnResellAll: '[data-js="resellAll"]',
            selectListing: 'select'
        },

        events: {
            'click @ui.btnModifyAll': 'modifyAll',
            'click @ui.btnResellAll': 'resellAll',
            'change @ui.selectListing': 'listingFilter'
        },

        modifyAll: function() {
            this.trigger('Action:modifyAll');
            $(this.ui.btnModifyAll).addClass('ch-btn-disabled');
            $(this.ui.btnResellAll).removeClass('ch-btn-disabled');
        },

        resellAll: function() {},

        listingFilter: function() {}

    });
});