var app = app || {};

app.TeamCollectionView = Backbone.View.extend({
    el: '#teams',

    initialize: function() {
        this.collection = new app.TeamCollection();
        this.collection.fetch({ reset: true });
        this.render();
        this.addEvents();
    },

    tableView: function() {
        this.render();
        this.addEvents();
    },

    render: function() {
        this.$el.find('.team, .group-header, .group-container').remove();
        $('.row-header').show();

        // this.$el.append(_.template($('#tableHeader').html()));

        this.collection.each(function(item) {
            this.renderTeam(item);
        }, this);
    },

    renderTeam: function(item) {
        var teamView = new app.TeamView({
            model: item
        });

        this.$el.append(teamView.render().el);
    },

    renderGroups: function(e) {
        e.preventDefault();

        $('.row-header').hide();

        this.$el.find('.team').remove();
        this.stopListening(this.collection);
        this.collection.sortBy('group');

        // find all the groups in the collection
        var groups = _.uniq(this.collection.pluck('group'));

        // foreach group
        _.each(groups, function(group) {
            // render table header
            this.$el.append(_.template($('#groupHeader').html(), { group: group }));

            // get only items in a group
            var filtered = this.collection.where({ group: group });

            // chain sorts
            // sort by goal difference (neg so highest first)
            // then sort by number points, highest first
            // sort by points last so this has higher priority
            filtered = _(filtered).chain().sortBy(function(team) {
                return -team.attributes.goalDifference;
            }).sortBy(function(team) {
                return -team.attributes.points;
                // return value since it's chained
            }).value();

            // render everything in this group array
            _.each(filtered, this.renderGroup, this);
        }, this);

    },

    renderGroup: function(item) {
        var groupView = new app.GroupView({
            model: item
        });

        this.$el.append(groupView.render().el);
    },

    events: {
        'click #save': 'addTeam',
        'click .row-header .col': 'sortBy',
        'click .groups': 'renderGroups',
        'click .table': 'tableView'
    },

    addEvents: function() {
        this.listenTo( this.collection, 'add', this.renderTeam );
        this.listenTo( this.collection, 'sort reset', this.render );
    },

    addTeam: function(e) {
        e.preventDefault();

        var formData = {};
        $('#addTeam input').not('[type="submit"]').each(function(index, el) {
            if($(el).val() !== '') {
                formData[el.id] = $(el).val();
            }
        });

        this.collection.create(new app.Team(formData));
        $('#addTeam').find('[type="text"]').val('');
    },

    sortBy: function(e) {
        e.preventDefault();
        var target = $(e.target);
        var key = target.data('sort');

        if(target.hasClass('sort-active')) {
            // reverse sort order
            if(target.data('sort-order') === 'asc') {
                target.data('sort-order', 'desc');
            } else {
                target.data('sort-order', 'asc');
            }
        } else {
            $('.sort-active').removeClass('sort-active');
            target.addClass('sort-active');
        }
        var order = target.data('sort-order');

        if(key) {
            this.collection.sortBy(key, order);
        }
    }


});