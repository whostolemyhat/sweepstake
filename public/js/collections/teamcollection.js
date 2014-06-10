var app = app || {};

app.TeamCollection = Backbone.Collection.extend({
    model: app.Team,
    url: '/api/teams',

    initialize: function() {
        this.sortKey = 'id';
    },

    comparator: function(a, b) {
        a = a.get(this.sortKey);
        b = b.get(this.sortKey);

        return a > b ? 1 : a < b ? -1 : 0;
    },

    sortBy: function(key) {
        this.sortKey = key;
        this.sort();
    }
});