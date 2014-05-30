var app = app || {};

app.TeamCollectionView = Backbone.View.extend({
    el: '#teams',

    initialize: function(teams) {
        console.log('init', teams);
        this.collection = new app.TeamCollection(teams);
        this.render();
    },

    render: function() {
        this.$el.find('.team').remove();

        this.collection.each(function(item) {
            this.renderTeam(item);
        }, this);
    },

    renderTeam: function(item) {
        var teamView = new app.TeamView({
            model: item
        });

        this.$el.append(teamView.render().el);
    }
});