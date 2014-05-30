/* global Backbone, _ */

var app = app || {};

app.TeamView = Backbone.View.extend({
    tagName: 'div',
    className: 'team',
    template: _.template( $('#teamTemplate').html() ),

    render: function() {
        this.$el.html( this.template(this.model.toJSON() ));

        return this;
    }
});