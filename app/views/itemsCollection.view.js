Resell.Views.Items = Backbone.View.extend({

    template: __templates.actions,

    events: {
        'click [data-js="modifyAll"]': 'modifyAll',
        'click [data-js="resellAll"]': 'resellAll'
    },

    initialize: function(options){
        var that = this;
        
        this.listingsCollection = options.listingsCollection;
        
        this.collection.on('fetched', function() {
            that.render();
        });
    },

    render: function(){
        var that = this;

        that.$el.append(this.template());

        _.each(this.collection.models, function(model, i){
            var itemView = new Resell.Views.Item({
                model: model,
                listingsCollection: that.listingsCollection
            });

            that.$("ul").append(itemView.el);

            itemView.on('change', function() {
                that.refreshGrid();
            });

            that.on('Items:modifyAll', function() {
                itemView.trigger('Item:modifyAll');
            });

            that.on('Items:resellAll', function() {
                itemView.trigger('Item:resellAll');
            });
        });

        this.refreshGrid();
    },

    refreshGrid: function() {
        this.$el.masonry({
            itemSelector: '.grid-item'
        });
    },

    modifyAll: function() {
        this.trigger('Items:modifyAll');
    },

    resellAll: function() {
        this.trigger('Items:resellAll');
    }
});