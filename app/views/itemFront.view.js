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
        console.log("modifyItem");
        this.trigger('Item:modify');
    }
});