'use strict';


var mongoose = require('mongoose');


var ScoreSchema = new mongoose.Schema({
    game: {},
    homeTeamScore: { teamId: {}, score: Number },
    awayTeamScore: { teamId: {}, score: Number },
    date: { type: Date }
});


var Score = mongoose.model('Score', ScoreSchema);

module.exports.Score = Score;
