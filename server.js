var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// database
mongoose.connect('mongodb://localhost/worldcup');
var Team = require('./models/team');

app.use(bodyParser());
var port = process.env.PORT || 3000;

// Routes
var router = express.Router();

// middleware
router.use(function(req, res, next) {
    console.log('Something\'s happening');
    // next = continue to next route, otherwise this would consume it
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! API is working!' });
});

router.route('/teams')
    // create new
    .post(function(req, res) {
        var team = new Team();
        team.name = req.body.name;
        team.person = req.body.person;
        team.active = req.body.active;
        team.position = req.body.position;
        team.img = req.body.img;

        team.save(function(err) {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Team created!' });
        });
    }) // end post

    // get all
    .get(function(req, res) {
        Team.find(function(err, teams) {
            if(err) {
                res.send(err);
            }
            res.json(teams);
        });
    }); // end get

// get single
router.route('/teams/:team_id')
    .get(function(req, res) {
        Team.findById(req.params.team_id, function(err, team) {
            if(err) {
                res.send(err);
            }
            res.json(team);
        });
    })

    // update
    .put(function(req, res) {
        Team.findById(req.params.team_id, function(err, team) {
            if(err) {
                res.send(err);
            }

            team.name = req.body.name;
            team.person = req.body.person;
            team.active = req.body.active;
            team.position = req.body.position;
            team.img = req.body.img;

            team.save(function(err) {
                if(err) {
                    res.send(err);
                }

                res.json({ message: 'Team updated!' });
            });
        });
    }) // end put

    // delete
    .delete(function(req, res) {
        Team.remove({
            _id: req.params.team_id
        }, function(err, team) {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Deleted successfully' });
        });
    });

var frontendRouter = express.Router();
frontendRouter.get('/', function(req, res) {
    res.render('index');
});

// register routes
app.use('/api', router);
app.use('/', frontendRouter);

// Start server
app.listen(port);
console.log('listening on port ' + port);

// var routes = require('./routes');
// // var user = require('./routes/user');
// var http = require('http');
// var path = require('path');
// var mongoose = require('mongoose');


// // all environments
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// // development only
// if ('development' === app.get('env')) {
//     app.use(express.errorHandler());
// }

// app.get('/', routes.index);
// // app.get('/users', user.list);

// http.createServer(app).listen(app.get('port'), function(){
//     console.log('Express server listening on port ' + app.get('port'));
// });
