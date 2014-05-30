var app = app || {};

app.Team = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: '',
        person: '',
        active: true,
        position: '',
        img: ''
    }

});