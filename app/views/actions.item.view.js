// 'use strict';

SYI.module('Resell.Views', function (Views, SYI, Backbone, Marionette, $, _) {    
    
    Views.Actions = Marionette.ItemView.extend({

        onShow: function() {},

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
            SYI.Events.trigger('Action:modifyAll');
            $(this.ui.btnModifyAll).addClass('ch-btn-disabled');
            $(this.ui.btnResellAll).removeClass('ch-btn-disabled');
        },

        resellAll: function() {
            SYI.Events.trigger('Action:resellAll');
            $(this.ui.btnModifyAll).removeClass('ch-btn-disabled');
            $(this.ui.btnResellAll).addClass('ch-btn-disabled');
        },

        listingFilter: function(event) {

            var that = this,
                listingId = event.target.value,
                filtered;

            filtered = SYI.Resell.Cache.Collections.Items.filter(function(model) {
               return event.target.value === 'all' ? SYI.Resell.Cache.Collections.Items : model.get("listingId") === listingId;
            });

            SYI.Events.trigger('Collection:filtered', filtered);
        }

    });
});