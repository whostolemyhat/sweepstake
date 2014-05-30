var app = app || {};

app.TeamCollection = Backbone.Collection.extend({
    model: app.Team,
    url: '/api/teams'
});