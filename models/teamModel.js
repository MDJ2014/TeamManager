'use strict';


var mongoose = require('mongoose');


var TeamSchema = new mongoose.Schema({
    teamName: {type: String, required: true},  
    ageGroup: {type: Number, required: true},  
    logo: {contentType: String, data: Buffer},
    photo: {contentType: String, data:Buffer},    
    practiceSchedule: {type: String},
    coaches:[{name: String, title: String}],
    //schedule: [GameSchema],
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    dateAssigned: {type: Date, default: Date.now}
});



var Team = mongoose.model('Team',TeamSchema);

module.exports.Team = Team;