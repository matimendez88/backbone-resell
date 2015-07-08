Resell.Views.Items = Backbone.View.extend({
    tagName: 'ul',
    className: 'grid',

    events: {},

    initialize: function(){
        var that = this;
        
        this.collection.on('fetched', function() {
            that.render();
        });
    },

    render: function(){
        var that = this;

        _.each(this.collection.models, function(model, i){
            console.log(model);

            var itemView = new Resell.Views.Item({
                model: model
            });

            that.$el.append(itemView.el);

            itemView.on('change', function() {
                that.refreshGrid();
            });
        });

        this.refreshGrid();
    },

    refreshGrid: function() {
        this.$el.masonry({
            itemSelector: '.grid-item'
        });
    }
});