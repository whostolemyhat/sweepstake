var app = app || {};

app.TeamCollection = Backbone.Collection.extend({
    model: app.Team,
    url: '/api/teams',

    initialize: function() {
        this.sortKey = 'name';
    },

    comparator: function(a, b) {
        a = a.get(this.sortKey);
        b = b.get(this.sortKey);

        if(this.sortOrder === 'desc') {
            return a > b ? -1 : a < b ? 1 : 0;
        }
        return a > b ? 1 : a < b ? -1 : 0;
    },

    sortBy: function(key, order) {
        this.sortKey = key;
        this.sortOrder = order;
        this.sort();
    }
});