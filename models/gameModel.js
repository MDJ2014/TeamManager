'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new mongoose.Schema({
    homeTeam: {type: Schema.Types.ObjectId, ref: 'Team'},
    awayTeam:{type: Schema.Types.ObjectId, ref: 'Team'},  
    location: {type: String}, 
    homeTeamScore: {type: Number},
    awayTeamScore: {type: Number},    
    date:{type: Date}
});




var Game = mongoose.model('Game', GameSchema);

module.exports.Game = Game;