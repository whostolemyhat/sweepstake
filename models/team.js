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
    goalDifference: Number,
    redCards: Number,
    yellowCards: Number,
    totalCards: Number,
    group: String,
    points: Number
});

module.exports = mongoose.model('Team', TeamSchema);