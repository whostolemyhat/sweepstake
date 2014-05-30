var app = app || {};

app.Person = Backbone.Model.extend({
    defaults: {
        id: '',
        name: '',
        img: ''
    }
});