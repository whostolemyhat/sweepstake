/* global Backbone, _ */
var app = app || {};

app.GroupView = Backbone.View.extend({
    tagName: 'div',
    className: 'group-container clearfix',
    template: _.template($('#groupTemplate').html()),

    render: function() {
        this.$el.html( this.template(this.model.toJSON() ));

        return this;
    }
});