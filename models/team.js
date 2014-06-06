var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    person: String,
    active: Boolean,
    position: Number,
    img: String,
    goalsFor: Number,
    goalsAgainst: Number,
    redCards: Number,
    yellowCards: Number,
    group: String
});

module.exports = mongoose.model('Team', TeamSchema);