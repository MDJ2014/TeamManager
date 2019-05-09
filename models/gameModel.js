'use strict';


var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
    team: {type: String, ref: 'Team'},
    opponent: {type: String, ref: 'Team', required: [true, 'First name required']},  
    location: {type: String, required:[true, 'Last name required']},  
    teamScore: {type: Number},
    opponentScore: {type: Number},    
    date:{type: Date}
});




var Game = mongoose.model('Game', GameSchema);

module.exports.Game = Game;