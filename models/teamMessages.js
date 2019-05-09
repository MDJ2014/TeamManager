'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamMessageSchema = new mongoose.Schema({
    //team:{type: Schema.Types.ObjectId, ref: 'Team'},
    author: {type: String},  
    title: {type: String},  
    body:{type: String},
    datePosted:{type: Date, default: Date.now}
});


var TeamMessage = mongoose.model('TeamMessage',TeamMessageSchema);

module.exports.TeamMessage = TeamMessage;