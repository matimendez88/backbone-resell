// 'use strict';

SYI.module('Resell.Collections', function (Collections, SYI, Backbone, Marionette, $, _) {

    Collections.Items = Backbone.Collection.extend({
        model: SYI.Resell.Models.Item,
        url: '/items'
    });

});