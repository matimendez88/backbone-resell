// 'use strict';

SYI.module('Resell.Views', function (Views, SYI, Backbone, Marionette, $, _) {

    Views.Items = Marionette.CollectionView.extend({

        tagName: 'ul',

        childView: Views.Item,

        initialize: function() {
            var that = this;

            SYI.Events.on('Collection:filtered', function(filteredCollection) {
                that.collection.reset(filteredCollection);
            });
        },

        buildChildView: function(child, ChildViewClass, childViewOptions){
            var that = this;

            var view = new ChildViewClass({
                'model': child,
                'listingsCollection': this.options.listingsCollection
            });

            view.on('Items:modify', function() {
                that.refreshGrid();
            });

            view.on('Items:save', function() {
                that.refreshGrid();
            });

            view.on('InnerViews:load', function() {
                that.refreshGrid();
            });

            view.on('Item:delete', function(modelId) {
                that.refreshGrid();
                console.log("----> ", SYI.Resell.Cache.Collections.Items);
                SYI.Resell.Cache.Collections.Items.remove(modelId);
                console.log("----> ", SYI.Resell.Cache.Collections.Items);
            });

            return view;
        },

        refreshGrid: function() {
            var that = this;

            this.$el.masonry({
                itemSelector: '.grid-item'
            });

            this.$el.masonry('reloadItems');   
            this.$el.masonry('layout');
        },


    });

});