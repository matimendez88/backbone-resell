Resell.Views.ItemFront = Backbone.View.extend({
    tagName: 'div',
    className: 'item-container-front',

    events: {
        'click [data-js="modifyBtn"]': 'modifyItem'
    },

    template: __templates.itemFront,
    
    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    modifyItem: function() {
        this.trigger('Item:modify');
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