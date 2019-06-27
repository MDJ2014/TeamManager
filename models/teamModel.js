'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new mongoose.Schema({
    teamName: {type: String, required: true,unique:true},  
    ageGroup: {type: Number, required: true},  
    logo: String,
    photo: {contentType: String, data:Buffer},    
    practiceSchedule: {type: String},
    coaches:[{type: Schema.Types.ObjectId, ref: 'User'}],
    roster:[{type: Schema.Types.ObjectId, ref: 'Player'}],
    //schedule: [GameSchema],
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    dateAssigned: {type: Date, default: Date.now}
});



var Team = mongoose.model('Team',TeamSchema);

module.exports.Team = Team;