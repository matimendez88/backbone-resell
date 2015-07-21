// 'use strict';

SYI.module('Resell.Views', function (Views, SYI, Backbone, Marionette, $, _) {

    Views.Items = Marionette.CollectionView.extend({

        tagName: 'ul',

        childView: Views.Item,

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