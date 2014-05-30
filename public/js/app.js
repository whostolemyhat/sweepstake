var app = app || {};


$(function() {
    app.teams = [
        {
            name: 'Germany',
            person: 'Alex'
        },
        {
            name: 'England',
            person: 'James'
        },
        {
            name: 'USA',
            person: 'Matt'
        }
    ];

    // app.people = [
    //     {
    //         id: 0,
    //         name: 'Alex'
    //     },
    //     {
    //         id: 1,
    //         name: 'James'
    //     },
    //     {
    //         id: 2,
    //         name: 'Matt'
    //     }
    // ];
    new app.TeamCollectionView(app.teams);

});
