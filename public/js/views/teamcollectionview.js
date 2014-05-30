var app = app || {};

app.TeamCollectionView = Backbone.View.extend({
    el: '#teams',

    initialize: function() {
        this.collection = new app.TeamCollection();
        this.collection.fetch({ reset: true });
        this.render();

        this.listenTo( this.collection, 'add', this.renderTeam );
        this.listenTo( this.collection, 'reset', this.render );
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
    },

    events: {
        'click #save': 'addTeam'
    },

    addTeam: function(e) {
        e.preventDefault();

        var formData = {};
        $('#addTeam input[type="text"]').each(function(index, el) {
            if($(el).val() !== '') {
                formData[el.id] = $(el).val();
            }
        });

        this.collection.create(new app.Team(formData));
    }
});