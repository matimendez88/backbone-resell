Resell.Views.Item = Backbone.View.extend({
    tagName: 'li',
    className: 'item-container grid-item',
    
    initialize: function() {
        var that = this;
        
        this.itemFrontView = {};
        this.itemBackView = {};

        this.itemFrontView = new Resell.Views.ItemFront({
            model: this.model
        });
        this.$el.append(this.itemFrontView.el);

        that.itemBackView = new Resell.Views.ItemBack({
            model: that.model
        });
        this.$el.append(this.itemBackView.el);

        this.itemFrontView.on('Item:modify', function(data) {
            that.$el.addClass('flip');
            that.trigger('change');
        });

        this.itemBackView.on('Item:save', function(data) {
            that.itemFrontView.render();
            that.$el.removeClass('flip');
            that.trigger('change');
        });
    }
});