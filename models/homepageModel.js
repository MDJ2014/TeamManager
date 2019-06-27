'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomePageSchema = new mongoose.Schema({
    header: String,
    welcome: String,
    mainAnnouncement: {title:{type: String}, body:{type: String}, link:{type:String}},
    announcements:[{title:{type: String}, body:{type: String}, link:{type:String}}],
    mainCallOut: {title:{type: String}, body:{type: String}, link:{type:String}},
    callsToAction:[{title:{type: String, default:"Empty"}, body:{type: String, default:"empty"}, link:{type:String, default:"empty"}}],
    notice: String,
    terms: String,
    license: String,
    privacy: String,
    about: String,
    contact:{phone: String, street: String, city: String, state: String,zip:String,email:String},
    datePosted:{type: Date, required:true},
    dateUpdated:{type: Date, default: Date.now}
});


var HomePage = mongoose.model('HomePage',HomePageSchema);

module.exports.HomePage = HomePage;