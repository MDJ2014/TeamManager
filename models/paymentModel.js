'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Fee = require('../models/feeModel').Fee;

var PaymentSchema = new mongoose.Schema({
    payerId: {type: Schema.Types.ObjectId, ref: 'User'},
    payerFirstName: String,
    payerLastName: String,
    payerAddress:{street: String, city: String, state: {type: String, uppercase: true, required: true}, zip: Number}, 
    feeType:[{type: Schema.Types.ObjectId, ref: 'Fee'}],
    paymentType: {type: String, enum:["Cash","Check","Credit"], required: true},
    paymentAmount: {type: Number, required: true},
    date:{type: Date}
});




var Payment = mongoose.model('Payment', PaymentSchema);

module.exports.Payment = Payment;