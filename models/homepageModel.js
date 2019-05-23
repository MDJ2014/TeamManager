'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomePageSchema = new mongoose.Schema({
    header: String,
    welcome: String,
    mainAnnouncement: {title:{type: String}, body:{type: String}, link:{type:String}},
    announcements:[{title:{type: String}, body:{type: String}, link:{type:String}}],
    mainCallOut: {title:{type: String}, body:{type: String}, link:{type:String}},
    callsToAction:[{title:{type: String}, body:{type: String}, link:{type:String}}],
    notice: String,
    datePosted:{type: Date, required:true},
    dateUpdated:{type: Date, default: Date.now}
});


var HomePage = mongoose.model('HomePage',HomePageSchema);

module.exports.HomePage = HomePage;