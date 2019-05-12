'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GameSchema = require('mongoose').model('Game').schema

var ScheduleSchema = new mongoose.Schema({
    team: {type: Schema.Types.ObjectId, ref: 'Team'},   
    //games: [{type: Schema.Types.ObjectId, ref: 'Game'}],
    games:[GameSchema],
    dateAssigned: {type: Date, default: Date.now}
});



var Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports.Schedule = Schedule;