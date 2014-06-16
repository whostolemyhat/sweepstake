/* global Backbone, _ */

var app = app || {};

app.TeamView = Backbone.View.extend({
    tagName: 'div',
    className: 'team',
    template: _.template( $('#teamTemplate').html() ),
    editTemplate: _.template( $('#editTemplate').html() ),

    render: function() {
        this.$el.html( this.template(this.model.toJSON()));

        return this;
    },

    events: {
        'click .remove': 'deleteTeam',
        'click .edit': 'editTeam',
        'click .save': 'saveEdit',
        'click .cancel': 'cancelEdit'
    },

    deleteTeam: function() {
        this.model.destroy();
        this.remove();
    },

    editTeam: function(e) {
        e.preventDefault();
        
        this.$el.html(this.editTemplate(this.model.toJSON()));
    },

    saveEdit: function(e) {
        e.preventDefault();

        var formData = {};

        $(e.target).closest('form').find('input, select').each(function() {
            var el = this;
            var elDom = $(el);

            if(elDom.attr('type') === 'number') {
                formData[el.id] = parseInt(elDom.val(), 10);
            } else {
                formData[el.id] = elDom.val();
            }
        });

        formData.goalDifference = formData.goalsFor - formData.goalsAgainst;
        formData.totalCards = formData.yellowCards - formData.redCards;

        this.model.set(formData);
        
        this.model.save();
        this.render();
    },

    cancelEdit: function(e) {
        e.preventDefault();

        this.render();
    }
});

