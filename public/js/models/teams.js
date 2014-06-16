var app = app || {};

app.Team = Backbone.Model.extend({
    defaults: {
        name: '',
        person: '',
        active: true,
        position: 0,
        img: '',
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        yellowCards: 0,
        redCards: 0,
        totalCards: 0,
        group: '',
        points: 0
    },

    parse: function(response) {
        response.id = response._id;
        return response;
    }

});