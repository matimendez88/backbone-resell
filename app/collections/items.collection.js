// 'use strict';

SYI.module('Resell.Collections', function (Collections, SYI, Backbone, Marionette, $, _) {

    Collections.Items = Backbone.Collection.extend({
        url: '/items',
        model: SYI.Resell.Models.Item
    });

});