'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new mongoose.Schema({
    name: {
        firstName: { type: String, required: [true, 'First name required'] },
        lastName: { type: String, required: [true, 'Last name required'] }
    },
    nicName: String,
    playerNumber: String,
    playerAge: { type: Number, required: [true, 'Player age required'] },
    positionPref: { type: String, default: 'None' },
    assignedPosition: String,
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    parent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateJoined: { type: Date, default: Date.now }
});




var Player = mongoose.model('Player', PlayerSchema);

module.exports.Player = Player;