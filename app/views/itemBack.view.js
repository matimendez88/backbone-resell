Resell.Views.ItemBack = Backbone.View.extend({
    tagName: 'div',
    className: 'item-container-back',

    events: {
        'click [data-js="resellBtn"]': 'saveItem'
    },

    template: __templates.itemBack,

    initialize: function(options) {
        var that = this;

        this.listingsCollection = options.listingsCollection;

        this.listingsCollection.on('fetched', function() {
            that.render();
        });
    },

    render: function() {
        var data = {
            listings: this.listingsCollection.toJSON(),
            model: this.model.toJSON()
        };

        this.$el.html(this.template(data));
        return this;
    },

    saveItem: function() {
        var listingIdAttr = this.$('input:checked').attr('id'),
            listingId = listingIdAttr.split("-")[0],
            listingType = this.$('input:checked').attr('value');

        this.model.set({
            title: this.$('.item-title-container input').val(),
            price: this.$('.item-price-container input').val(),
            quantity: this.$('.item-quantity-container input').val(),
            listingId: listingId,
            listingType: listingType
        });
        this.model.save();
        this.trigger('Item:save');
    },

    dispose: function() {
        // same as this.$el.remove();
        this.remove();
        // unbind events that are
        // set on this view
        this.off();
        // remove all models bindings
        // made by this view
        this.model.off( null, null, this );
    }
});