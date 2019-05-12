'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlayerSchema = require('mongoose').model('Player').schema


var UserSchema = new mongoose.Schema({
    userType: {type: String, default: 'Member'},
    name:{firstName: {type: String, trim: true, required: true}, lastName: {type: String, trim: true, required: true}},
    userName: {type: String, unique: true, required: [true, 'User name required']},
    userAddress:{street: String, city: String, state: {type: String, uppercase: true, required: true}, zip: Number},
    userPhone:{type: String, trim: true, required: [true, 'Phone number required']},
    userEmail:{type: String, trim: true, unique: true, required: [true, 'Email required']},
    passWord: {type: String, required: true},
   // payment: [{type: Schema.Types.ObjectId, ref: 'Payment'}],
    dateJoined:{type: Date, default: Date.now},
   // players:[{type: Schema.Types.ObjectId, ref: 'Player'}]
});




var User = mongoose.model('User',UserSchema);

module.exports.User = User;

