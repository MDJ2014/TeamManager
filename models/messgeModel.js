'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    universal: { type: Boolean, default: false },
    author: { type: String },
    title: { type: String },
    body: { type: String },
    datePosted: { type: Date, default: Date.now }
});


var Message = mongoose.model('Message', MessageSchema);

module.exports.Message = Message;