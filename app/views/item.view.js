Resell.Views.Item = Backbone.View.extend({
    tagName: 'li',
    className: 'item-container grid-item',

    events: {},

    template: function(model) {
        if (this.isEditing) {
            return __templates.itemBack(model);
        } else {
            return __templates.itemFront(model);
        }
    },
    
    initialize: function() {
        this.isEditing = false;
        this.render();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});