Resell.Views.Items = Backbone.View.extend({
    el: '#app ul',

    events: {},

    initialize: function(){
        var that = this;

        this.collection.on('add', function() {
            that.render();
        });
    },

    render: function(){
        $('#app ul').empty();

        _.each(this.collection.models, function(model, i){
            var itemView = new Resell.Views.Item({
                model: model
            });

            $('#app ul').append(itemView.el);
        });
    }
});