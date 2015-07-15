Resell.Views.Item = Backbone.View.extend({
    tagName: 'li',
    className: 'item-container grid-item',

    initialize: function(options) {
        var that = this;

        this.itemFrontView = {};
        this.itemBackView = {};
        this.listingsCollection = options.listingsCollection;

        this.itemFrontView = new Resell.Views.ItemFront({
            model: this.model
        });
        this.$el.append(this.itemFrontView.el);

        that.itemBackView = new Resell.Views.ItemBack({
            model: that.model,
            listingsCollection: that.listingsCollection
        });
        this.$el.append(this.itemBackView.el);

        this.on('Item:modifyAll', function() {
            this.flipCard();
        });

        this.itemFrontView.on('Item:modify', function(data) {
            that.flipCard();
        });

        this.on('Item:resellAll', function() {
            this.itemBackView.saveItem();
        });

        this.itemBackView.on('Item:save', function(data) {
            that.itemFrontView.render();
            that.$el.removeClass('flip');
            that.trigger('change');
        });
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    flipCard: function() {
        this.$el.addClass('flip');
        this.trigger('change');
    }
});