Resell.Views.ItemBack = Backbone.View.extend({
    tagName: 'div',
    className: 'item-container-back',

    events: {
        'click [data-js="resellBtn"]': 'saveItem'
    },

    template: __templates.itemBack,
    
    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    saveItem: function() {
        this.model.set({
            title: this.$('.item-title-container input').val(),
            price: this.$('.item-price-container input').val(),
            quantity: this.$('.item-quantity-container input').val()
        });
        this.model.save();
        this.trigger('Item:save');
    }
});