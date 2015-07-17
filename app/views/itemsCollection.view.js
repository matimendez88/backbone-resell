Resell.Views.Items = Backbone.View.extend({

    template: __templates.actions,

    events: {
        'click [data-js="modifyAll"]': 'modifyAll',
        'click [data-js="resellAll"]': 'resellAll',
        'change select': 'listingFilter'
    },

    initialize: function(options){
        var that = this;

        Resell.Cache.ItemsCollection = this.collection;

        this.listingsCollection = options.listingsCollection;
        
        this.collection.on('fetched', function() {
            that.render();
        });
    },

    render: function(){
        var that = this;

        this.$el.append(this.template());

        this.iterateCollection();
    },

    refreshGrid: function() {
        var that = this;

        this.$el.masonry({
            itemSelector: '.grid-item'
        });

        this.$el.masonry('reloadItems');   
        this.$el.masonry('layout');
    },

    modifyAll: function() {
        this.trigger('Items:modifyAll');
        $('[data-js="modifyAll"]').addClass('ch-btn-disabled');
        $('[data-js="resellAll"]').removeClass('ch-btn-disabled');

    },

    resellAll: function() {
        this.trigger('Items:resellAll');
        $('[data-js="modifyAll"]').removeClass('ch-btn-disabled');
        $('[data-js="resellAll"]').addClass('ch-btn-disabled');
    },

    listingFilter: function(event) {
        var that = this,
            listingId = event.target.value,
            filteredListings = this.collection.filter(function(model) {
                return event.target.value === 'all' ? Resell.Cache.ItemsCollection : model.get("listingId") === listingId;
            });

        this.$("ul").empty();

        this.iterateCollection(filteredListings);
        this.listingsCollection.trigger('fetched');
    },

    iterateCollection: function(collection) {
        var that = this,
            filteredCollection = collection || Resell.Cache.ItemsCollection.models;

        _.each(filteredCollection, function(model, i){
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
    }
});