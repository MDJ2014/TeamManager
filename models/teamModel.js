'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ScheduleSchema = require('mongoose').model('Schedule').schema;
var TeamMessageSchema = require('mongoose').model('TeamMessage').schema;

var TeamSchema = new mongoose.Schema({
    teamName: {type: String, required: true},  
    ageGroup: {type: Number, required: true},  
    logo: {contentType: String, data: Buffer},
    photo: {contentType: String, data:Buffer},    
   messages: [{type: Schema.Types.ObjectId, ref: "TeamMessage"}],
   //messages:[TeamMessageSchema],
    practiceSchedule: {type: String},
    gameSchedule: [ScheduleSchema],
    players: [{type: Schema.Types.ObjectId, ref: "Player"}],
    dateAssigned: {type: Date, default: Date.now}
});



var Team = mongoose.model('Team',TeamSchema);

module.exports.Team = Team;