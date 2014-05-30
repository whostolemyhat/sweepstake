var app = app || {};

app.Team = Backbone.Model.extend({
    defaults: {
        name: 'test',
        person: 'testsetes',
        active: true,
        position: '',
        img: ''
    },

    parse: function(response) {
        response.id = response._id;
        return response;
    }

});